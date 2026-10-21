# usage: python3 build.py <video_id> tts|timeline
# Voz por trozos: cada frase se parte por su puntuación, se sintetiza trozo a trozo (entonación propia),
# se eliminan silencios largos internos y se une con pausas controladas según la puntuación.
# En 'say' se puede forzar una pausa con " | " (corta) o " || " (larga); no aparecen en subtítulos.
import sys,json,subprocess,wave,re,os
import numpy as np
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from specs import V
vid=sys.argv[1];step=sys.argv[2]
ROOT=os.path.dirname(os.path.abspath(__file__))
D=f'{ROOT}/out/{vid}';os.makedirs(D+'/tts',exist_ok=True)
segs=V[vid]
SH='/tmp/claude-0/sherpa';S=SH+'/sherpa-onnx-v1.12.15-linux-x64-shared';K=SH+'/kokoro-multi-lang-v1_0'
SR=44100
PAUSE={',':0.11,':':0.18,';':0.2,'.':0.27,'?':0.3,'!':0.28,'…':0.42,'|':0.2,'||':0.4}

# ---- Pronunciación de siglas: como palabra o deletreadas en español ----
# Al añadir siglas nuevas, decide cómo se dicen en España y añádelas aquí.
PRON={
 'LED':'led','LEDs':'leds','IDAE':'idáe','OCU':'ocu','AESAN':'aesán','EFSA':'efsa','IVA':'iva','OMS':'o eme ese',
 'CNMC':'ce ene eme ce','REE':'erre e e','USDA':'u ese de a','CDC':'ce de ce','UE':'u e','PVPC':'pe uve pe ce',
 'DGT':'de ge te','SINAC':'sinac','INTCF':'i ene te ce efe','kWh':'kilovatios hora','TV':'tele','wifi':'güifi','Wi-Fi':'güifi','USB':'u ese be',
}
def speakable(text):
    for k in sorted(PRON,key=len,reverse=True):
        text=re.sub(r'(?<![\wÁÉÍÓÚÑáéíóúñ])'+re.escape(k)+r'(?![\wÁÉÍÓÚÑáéíóúñ])',PRON[k],text)
    unk=[w for w in re.findall(r'\b[A-ZÁÉÍÓÚÑ]{2,}\b',text)]
    if unk:
        print('ERROR siglas sin pronunciación definida:',sorted(set(unk)),'-> añádelas a PRON en build.py');sys.exit(2)
    return text
def norm(w):return re.sub(r'[¿?¡!.,…:;"“”\'()«»|]','',w.lower())
def chunks(text):
    text=text.replace('...','…');text=re.sub(r'(\d),(\d)',lambda m:m.group(1)+'\u201a'+m.group(2),text)
    parts=re.findall(r'[^,.;:?!…|]+(?:[,.;:?!…]+|\|\||\|)?',text)
    out=[]
    for p in parts:
        p=p.strip()
        if not p:continue
        m=re.search(r'(\|\||\||[,.;:?!…]+)$',p)
        end=m.group(1) if m else '.'
        body=p[:-len(end)].strip() if m else p
        if not norm(body).strip():
            if out:out[-1]['pause']=max(out[-1]['pause'],PAUSE.get(end[-1] if end not in('|','||') else end,0.2))
            continue
        key=end if end in('|','||') else end[-1]
        spoken=body+(end if end not in('|','||') else ',')
        out.append(dict(text=spoken.replace('\u201a',','),shown=body.replace('\u201a',','),pause=PAUSE.get(key,0.2)))
    return out
def load(p):
    w=wave.open(p);sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768;return a,sr
def tidy(a,sr):
    env=np.convolve(np.abs(a),np.ones(int(sr*0.01))/int(sr*0.01),'same');on=env>0.006
    idx=np.where(on)[0]
    if len(idx)==0:return a
    a=a[max(0,idx[0]-int(sr*0.02)):idx[-1]+int(sr*0.06)];on=on[max(0,idx[0]-int(sr*0.02)):idx[-1]+int(sr*0.06)]
    # comprimir silencios internos > 0.2 s a 0.09 s
    out=[];i=0;n=len(a);maxs=int(sr*0.2);keep=int(sr*0.09)
    while i<n:
        if not on[i]:
            j=i
            while j<n and not on[j]:j+=1
            out.append(a[i:j] if j-i<=maxs else np.concatenate([a[i:i+keep//2],a[j-keep//2:j]]));i=j
        else:
            j=i
            while j<n and on[j]:j+=1
            out.append(a[i:j]);i=j
    return np.concatenate(out)
if step=='tts':
    env=dict(os.environ,LD_LIBRARY_PATH=S+'/lib')
    meta=[]
    for i,s in enumerate(segs):
        cs=chunks(speakable(s['say']));seg=[]
        for k,c in enumerate(cs):
            out=f'{D}/tts/{i:02d}_{k:02d}.wav'
            subprocess.run([S+'/bin/sherpa-onnx-offline-tts',f'--kokoro-model={K}/model.onnx',f'--kokoro-voices={K}/voices.bin',f'--kokoro-tokens={K}/tokens.txt',f'--kokoro-data-dir={K}/espeak-ng-data','--kokoro-lang=es','--kokoro-length-scale=0.89','--sid=53','--num-threads=2',f'--output-filename={out}',c['text']],env=env,check=True,capture_output=True)
            seg.append(dict(file=out,**c))
        meta.append(seg)
    json.dump(meta,open(f'{D}/tts/chunks.json','w'),ensure_ascii=False)
    print('tts ok',vid)
if step=='timeline':
    meta=json.load(open(f'{D}/tts/chunks.json'))
    t=0.3;tl=[];voice=[]
    for i,s in enumerate(segs):
        show=s.get('show',s['say']).replace(' || ',' ').replace(' | ',' ')
        words=show.split();sc=[c for c in chunks(show)]
        cm=meta[i];seg_start=t;wt=[]
        same=len(sc)==len(cm)
        if same:
            # palabras de subtítulo por trozo
            per=[len(c['shown'].split()) for c in sc]
            if sum(per)!=len(words):same=False
        pieces=[]
        for k,c in enumerate(cm):
            a,sr=load(c['file']);a=tidy(a,sr)
            n=int(len(a)*SR/sr);a=np.interp(np.linspace(0,len(a)-1,n),np.arange(len(a)),a)
            pieces.append((t,a));d=len(a)/SR
            if same:
                ws=words[sum(per[:k]):sum(per[:k+1])]
                wts=[len(norm(w))+2 for w in ws];cum=np.cumsum([0]+wts)/max(1,sum(wts))
                wt+=[t+d*x*0.97 for x in cum[:-1]]
            t+=d+(c['pause'] if k<len(cm)-1 else 0)
        seg_end=t
        if not same:
            wts=[len(norm(w))+(3 if w[-1] in '.,?…:' else 0)+2 for w in words];cum=np.cumsum([0]+wts)/sum(wts)
            wt=[seg_start+(seg_end-seg_start)*x for x in cum[:-1]]
        tl.append(dict(start=seg_start,end=seg_end,words=words,wt=wt,kw=s.get('kw',[])))
        voice+=pieces
        last=cm[-1]['pause'] if cm else 0.3
        t+=max(0.26,last)+s.get('pause',0)
    T=t+1.3
    scenes=[]
    for i,s in enumerate(segs):
        if s.get('scene'):scenes.append(dict(seg=i,comps=json.loads(json.dumps(s['scene']))))
    for k,sc in enumerate(scenes):
        a=sc['seg'];b=scenes[k+1]['seg'] if k+1<len(scenes) else len(segs)
        st=0 if k==0 else tl[a]['start']-0.12;sc['start']=st
        span=[(w,tm) for j in range(a,b) for w,tm in zip(tl[j]['words'],tl[j]['wt'])]
        def res(at,default):
            if at is None:return default
            if isinstance(at,(int,float)):return st+at
            for w,tm in span:
                if norm(w).startswith(norm(at)):return tm
            print('WARN not found',vid,a,at);return default
        for ci,c in enumerate(sc['comps']):
            c['_t']=res(c.get('at'),st+0.15+ci*0.12);c['_s']=st
            if 'marks' in c:c['_m']={kk:res(v,None) for kk,v in c['marks'].items()}
            if 'xAt' in c:c['xAt']=res(c['xAt'],c['_t'])
            if 'winAt' in c:c['_win']=res(c['winAt'],c['_t']+0.5)
            for ii,it in enumerate(c.get('items',[])):
                it['_t']=res(it.get('at'),c['_t']+ii*0.25)
                if 'xAt' in it:it['_x']=res(it['xAt'],it['_t'])
    json.dump(dict(T=T,segs=tl,scenes=scenes),open(f'{D}/timeline.json','w'),ensure_ascii=False)
    N=int(T*SR);out=np.zeros(N)
    for st,a in voice:
        k=int(st*SR);e=min(N,k+len(a));out[k:e]+=a[:e-k]
    out=out/np.abs(out).max()*0.9
    tt=np.arange(N)/SR
    def mtof(m):return 440*2**((m-69)/12)
    chords=[[57,60,64,67],[53,57,60,64],[48,52,55,59],[55,59,62,64]]
    mus=np.zeros(N);cd=2.4
    for ci in range(int(T/cd)+1):
        s0=int(ci*cd*SR);ln=int(cd*SR*1.15);sg=np.arange(ln)/SR
        env=np.minimum(1,sg/0.4)*np.exp(-sg*0.5);ch=chords[ci%4]
        x=sum(np.sin(2*np.pi*mtof(m)*sg)*0.5+0.15*np.sin(2*np.pi*2*mtof(m)*sg) for m in ch)/4+np.sin(2*np.pi*mtof(ch[0]-12)*sg)*np.exp(-sg*1.2)*0.6
        e=min(N,s0+ln)
        if s0<N:mus[s0:e]+=(x*env)[:e-s0]
    np.random.seed(1)
    for b in np.arange(0,T,0.6):
        i=int(b*SR);ln=int(0.25*SR);sg=np.arange(ln)/SR;kk=np.sin(2*np.pi*(50+80*np.exp(-sg*30))*sg)*np.exp(-sg*14)*0.8;e=min(N,i+ln)
        if i<N:mus[i:e]+=kk[:e-i]
        j=int((b+0.3)*SR);ln=int(0.05*SR);h=np.random.randn(ln)*np.exp(-np.arange(ln)/SR*80)*0.10;e=min(N,j+ln)
        if j<N:mus[j:e]+=h[:e-j]
    mus=np.convolve(mus,np.ones(6)/6,'same');mus/=np.abs(mus).max()
    venv=np.convolve(np.abs(out),np.ones(4410)/4410,'same');mus*=0.17*(1-0.55*np.clip(venv/0.03,0,1))
    mus*=np.clip(tt/0.5,0,1)*np.clip((T-tt)/1.5,0,1)
    mix=out+mus;mix/=max(1,np.abs(mix).max()/0.97)
    w=wave.open(f'{D}/mix.wav','w');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((mix*32767).astype(np.int16).tobytes());w.close()
    w=wave.open(f'{D}/voice.wav','w');w.setnchannels(1);w.setsampwidth(2);w.setframerate(SR);w.writeframes((out*32767).astype(np.int16).tobytes());w.close()
    print('timeline ok',vid,round(T,1),'s')
