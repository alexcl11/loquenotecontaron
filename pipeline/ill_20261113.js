// ===== Escenas: el microondas y las vitaminas (2026-11-13) · kit en ill21.js (usa steam/burner de ill.js/ill18.js, scr de ill_20261029.js, glassCup/pourStream de ill4.js) =====
const MW=[840,1178,1];
function mwP(o){return Object.assign({x:450,y:1200,shirt:'#3d7bff'},o);}
const mwFood=(veg,d=0)=>(cx,cy)=>glassBowl(cx,cy,0.62,0,{veg,dull:d});
ILL.mw_fondo=(c,t)=>{ILL.cocina_fondo(c,t);};
// gancho: va a meter el brócoli en el micro y duda «¿y las vitaminas?»
ILL.mw_gancho=(c,t)=>{const s=c._s,M=c._m;const vi=M.vit?E(t,M.vit-0.2,0.5):0;const no=M.no?E(t,M.no-0.1,0.4):0;const ma=M.mas?E(t,M.mas-0.1,0.4):0;
 g.save();camLerp(t,s,5,[1.15,620,1010],[1.22,640,1000]);kitchen(t,{stove:false});
 const hb=[lerp(640,610,vi),lerp(1080,1040,vi)];
 const o=mwP({rh:hb,lh:[330,1150],look:vi>0.3&&no<0.5?[0.7,0.2]:[0,0.1],mouth:no>0.5?'smile':(vi>0.3?'worry':'smile'),brow:vi>0.3&&no<0.5?1:0});
 person(o,t);const r=mwOven(...MW,t,{open:1});counterFront();glassBowl(hb[0]+20,hb[1]+40,0.7,t,{veg:'broc'});hands(o);
 vitSwarm(hb[0]+20,hb[1]-10,110,50,t,vi*(1-0.4*no),{n:6,r:18});
 const [bx,by]=scr(hb[0]+20,hb[1]-90);g.restore();
 labelTag('¿Y LAS VITAMINAS?',Math.min(Math.max(bx,300),780),Math.max(by-60,650),vi*(1-no),C.amber);
 labelTag('HAY ALGO QUE LAS QUITA MÁS…',540,660,ma,C.red);};
// pregunta temprana: enseña el cuenco con brócoli a cámara
ILL.mw_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.4,600,950);kitchen(t,{stove:false});
 const hx=lerp(640,690,up),hy=lerp(1080,930,up);
 const o=mwP({x:520,rh:[hx,hy],lh:[400,1150],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);mwOven(900,1178,1,t,{open:1});counterFront();glassBowl(hx+10,hy+45,0.7,t,{veg:'broc'});hands(o);g.restore();};
// FDA: el micro en marcha y las vitaminas se quedan en la verdura
ILL.mw_fda=(c,t)=>{const s=c._s,M=c._m;const cn=M.con?E(t,M.con-0.2,0.5):0;
 g.save();camLerp(t,s,6,[1.5,700,1000],[1.6,720,1000]);kitchen(t,{stove:false});
 const o=mwP({x:470,rh:[610,1150],lh:[350,1150],look:[0.9,0.3],mouth:'smile',brow:0});
 person(o,t);const sec=Math.max(0,90-Math.floor((t-s)*3));const r=mwOven(...MW,t,{on:1,time:`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`,food:mwFood('broc')});counterFront();hands(o);
 vitSwarm(r.floor[0],r.floor[1]-45,70,26,t,1,{n:6,r:11,col:cn>0.5?'#3ecf6e':'#ff9f2e'});
 g.restore();};
// por qué: el micro va rápido y con poca agua · al hervir, la vitamina C se va al agua
ILL.mw_agua=(c,t)=>{const s=c._s,M=c._m;const ke=(M.esc||s+3)-0.5;const ph=E(t,ke,0.5);const rp=M.rap?E(t,M.rap-0.1,0.4):0,po=M.poc?E(t,M.poc-0.1,0.4):0;
 if(t<ke+0.25){g.save();camLerp(t,s,4,[1.6,760,1050],[1.75,780,1050]);kitchen(t,{stove:false});
  const sec=Math.max(0,90-Math.floor((t-s)*12));const r=mwOven(...MW,t,{on:1,time:`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`,food:(cx,cy)=>glassBowl(cx,cy,0.62,t,{veg:'broc',water:0.15})});counterFront();
  vitSwarm(r.floor[0],r.floor[1]-45,70,26,t,1,{n:6,r:11});g.restore();
  labelTag('⚡ RÁPIDO',540,660,rp*(1-ph),C.green);labelTag('💧 POCA AGUA',540,1440,po*(1-ph),C.blue);
  if(t<ke)return;}
 ILL.cocina_fondo(c,t);g.save();g.globalAlpha=ph;
 const lv=M.esc?E(t,M.esc-0.1,2.2):0;const wcol=`rgba(${Math.round(lerp(120,215,lv))},${Math.round(lerp(190,200,lv))},${Math.round(lerp(255,120,lv))},0.62)`;
 let wy=0;wy=potCut(540,1330,520,420,t,{lvl:0.8,boil:1,wcol,veg:(xc,yw)=>{[[-150,0.3],[-75,-0.2],[0,0.1],[75,-0.3],[150,0.2]].forEach(([dx,r],i)=>broccoli(xc+dx,1300-(i%2)*20,1.3,r,0.5*lv));}});
 burner(540,1345,420,t,1);
 vitSwarm(540,1235,170,36,t,1,{n:8,r:24,leave:lv,lost:1,tx:330,ty:wy+25,tw:420,th:110});
 g.globalAlpha=1;g.restore();
 labelTag('LA VITAMINA C SE VA AL AGUA',540,700,M.esc?E(t,M.esc,0.4):0,C.red);
 labelTag('🔥 AL HERVIR',540,1440,M.her?E(t,M.her-0.1,0.4):0,C.amber);};
// espinacas: al fuego pierden cerca del 77 % del ácido fólico; en el micro conservan la mayoría
ILL.mw_espinacas=(c,t)=>{const s=c._s,M=c._m;const a1=ease(E(t,s+0.1,0.5));const fu=M.fue?E(t,M.fue-0.2,0.5):0;const pe=M.per?E(t,M.per,1.6):0;const mi=M.mic?E(t,M.mic-0.2,0.5):0;const ma=M.may?E(t,M.may-0.4,0.4):0;
 ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 if(a1>0){g.save();g.globalAlpha=a1;const wy=potCut(270,1340,400,320,t,{lvl:0.75,boil:1,wcol:`rgba(${Math.round(lerp(120,190,pe))},${Math.round(lerp(190,200,pe))},${Math.round(lerp(255,130,pe))},0.62)`,
  veg:(xc,yw)=>{[[-100,-0.4],[-50,0.2],[0,-0.1],[50,0.3],[100,-0.2]].forEach(([dx,r],i)=>spinach(xc+dx,1320-(i%2)*14,1.25,r,0.7*pe));}});burner(270,1355,320,t,1);
  vitSwarm(270,1260,120,30,t,fu,{n:9,r:20,txt:'B9',col:'#ffcf5a',leave:pe,lost:0.78,tx:110,ty:wy+20,tw:320,th:70});g.restore();}
 if(mi>0){g.save();g.globalAlpha=mi;const r=mwOven(805,1340,1.15,t,{on:1,time:'1:30',food:(cx,cy)=>glassBowl(cx,cy,0.62,t,{veg:'spin',water:0.15})});
  vitSwarm(r.floor[0],r.floor[1]-45,70,24,t,1,{n:9,r:16,txt:'B9',col:'#ffcf5a'});g.restore();}
 labelTag('ESPINACAS · ÁCIDO FÓLICO',540,650,a1,C.amber);
 labelTag('🔥 AL FUEGO',270,780,fu,C.red);labelTag('📡 MICRO',800,780,mi,C.blue);
 labelTag('−77 % ÁCIDO FÓLICO',280,1440,pe>0.5?E(t,M.per+0.8,0.4):0,C.red);
 labelTag('✓ LA MAYORÍA',800,1440,ma,C.green);};
// truco: un chorrito de agua y el tiempo justo
ILL.mw_truco=(c,t)=>{const s=c._s,M=c._m;const ch=M.cho||s+0.8,ti=M.tie||s+2.5;const pr=ease(E(t,ch-0.6,0.5))*(1-ease(E(t,ch+0.9,0.4)));const pour=E(t,ch-0.2,0.3)*(1-E(t,ch+0.8,0.2));
 const X=780,B=[X+101,1178-39];const inMw=t>=ti-0.5;const wl=0.15*E(t,ch-0.1,0.9);const ps=inMw?ease(E(t,ti-0.1,0.3))*(1-ease(E(t,ti+0.4,0.3))):0;
 g.save();camLerp(t,s,5,[1.3,600,1010],[1.38,610,1000]);kitchen(t,{stove:false});
 const ang=-1.1*pr;const cupB=[lerp(470,440,pr),lerp(1150,1010,pr)];
 const mvb=ease(E(t,ti-0.5,0.4));const rh=inMw?[lerp(590,B[0],mvb),lerp(1150,B[1],mvb)]:[590,1150];
 const o=mwP({x:620,rh,lh:inMw?[470,1150]:[cupB[0]+4,cupB[1]-40],look:inMw?[0.9,0.2]:[-0.7,0.4],mouth:'smile'});person(o,t);
 const sec=inMw&&t>ti?Math.max(0,90-Math.floor((t-ti)*6)):0;
 mwOven(X,1178,1,t,{open:inMw?0:1,on:inMw&&t>ti?1:0,time:inMw?`${Math.floor(sec/60)}:${String(sec%60).padStart(2,'0')}`:'',press:ps,food:inMw?(cx,cy)=>glassBowl(cx,cy,0.62,t,{veg:'broc',water:0.15}):null});
 counterFront();
 if(!inMw){glassBowl(330,1178,0.75,t,{veg:'broc',water:wl});glassCup(cupB[0],cupB[1],0.7,ang,0.6*(1-0.6*E(t,ch-0.2,1)),'rgba(150,205,255,0.7)');
  const lx=cupB[0]+(-40*Math.cos(ang)+100*Math.sin(ang))*0.7,ly=cupB[1]+(-40*Math.sin(ang)-100*Math.cos(ang))*0.7;pourStream(lx,ly,330,1150,t,'rgba(150,205,255,0.85)',pour);}
 hands(o);g.restore();
 labelTag('💧 UN CHORRITO DE AGUA',540,660,M.cho?E(t,M.cho,0.4):0,C.blue);
 labelTag('⏱ EL TIEMPO JUSTO',540,1440,M.tie?E(t,M.tie,0.4):0,C.green);};
