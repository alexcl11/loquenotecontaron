# usage: python3 build.py <video_id> tts|timeline
import sys,json,subprocess,wave,re,os
import numpy as np
sys.path.insert(0,os.path.dirname(__file__))
from specs import V
vid=sys.argv[1];step=sys.argv[2]
ROOT=os.path.dirname(os.path.abspath(__file__))
D=f'{ROOT}/out/{vid}';os.makedirs(D+'/tts',exist_ok=True)
segs=V[vid]
SH='/tmp/claude-0/sherpa';S=SH+'/sherpa-onnx-v1.12.15-linux-x64-shared';K=SH+'/kokoro-multi-lang-v1_0'
SR=44100
def norm(w):return re.sub(r'[¿?¡!.,…:;"“”\'()«»]','',w.lower())
if step=='tts':
    env=dict(os.environ,LD_LIBRARY_PATH=S+'/lib')
    for i,s in enumerate(segs):
        out=f'{D}/tts/{i:02d}.wav'
        subprocess.run([S+'/bin/sherpa-onnx-offline-tts',f'--kokoro-model={K}/model.onnx',f'--kokoro-voices={K}/voices.bin',f'--kokoro-tokens={K}/tokens.txt',f'--kokoro-data-dir={K}/espeak-ng-data','--kokoro-lang=es','--kokoro-length-scale=0.93','--sid=53','--num-threads=2',f'--output-filename={out}',s['say']],env=env,check=True,capture_output=True)
    print('tts ok',vid)
if step=='timeline':
    def load(p):
        w=wave.open(p);sr=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),dtype=np.int16).astype(np.float32)/32768;return a,sr
    t=0.3;tl=[];voice=[]
    for i,s in enumerate(segs):
        a,sr=load(f'{D}/tts/{i:02d}.wav')
        idx=np.where(np.abs(a)>0.012)[0];a=a[max(0,idx[0]-200):idx[-1]+1200]
        n=int(len(a)*SR/sr);a=np.interp(np.linspace(0,len(a)-1,n),np.arange(len(a)),a)
        d=len(a)/SR;words=s.get('show',s['say']).split()
        wts=[len(norm(w))+(3 if w[-1] in '.,?…:' else 0)+2 for w in words]
        cum=np.cumsum([0]+wts)/sum(wts)
        tl.append(dict(start=t,end=t+d,words=words,wt=[t+d*c for c in cum[:-1]],kw=s.get('kw',[])))
        voice.append((t,a));t+=d+s.get('pause',0)+0.22
    T=t+1.3
    # scenes
    scenes=[];
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
            c['_t']=res(c.get('at'),st+0.15+ci*0.12)
            if 'xAt' in c:c['xAt']=res(c['xAt'],c['_t'])
            if 'winAt' in c:c['_win']=res(c['winAt'],c['_t']+0.5)
            for ii,it in enumerate(c.get('items',[])):
                it['_t']=res(it.get('at'),c['_t']+ii*0.25)
                if 'xAt' in it:it['_x']=res(it['xAt'],it['_t'])
    json.dump(dict(T=T,segs=tl,scenes=scenes),open(f'{D}/timeline.json','w'),ensure_ascii=False)
    N=int(T*SR);out=np.zeros(N)
    for st,a in voice:k=int(st*SR);out[k:k+len(a)]+=a
    out=out/np.abs(out).max()*0.9
    # music
    tt=np.arange(N)/SR
    def mtof(m):return 440*2**((m-69)/12)
    chords=[[57,60,64,67],[53,57,60,64],[48,52,55,59],[55,59,62,64]]
    mus=np.zeros(N);cd=2.4
    for ci in range(int(T/cd)+1):
        s0=int(ci*cd*SR);ln=int(cd*SR*1.15);sg=np.arange(ln)/SR
        env=np.minimum(1,sg/0.4)*np.exp(-sg*0.5);ch=chords[ci%4]
        x=sum(np.sin(2*np.pi*mtof(m)*sg)*0.5+0.15*np.sin(2*np.pi*2*mtof(m)*sg) for m in ch)/4+np.sin(2*np.pi*mtof(ch[0]-12)*sg)*np.exp(-sg*1.2)*0.6
        e=min(N,s0+ln);mus[s0:e]+=(x*env)[:e-s0]
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
    print('timeline ok',vid,round(T,1),'s')
