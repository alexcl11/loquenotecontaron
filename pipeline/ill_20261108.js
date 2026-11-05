// ===== Escenas: lejía con agua caliente (2026-11-08) · kit en ill16.js (usa bathroom/bucket/cleanBottle de ill4.js y clDot/clVapor de ill15.js) =====
function lcP(o){return Object.assign({x:470,y:1200,shirt:'#3d7bff'},o);}
const HOTW='rgba(235,240,250,0.85)',BLEACHW='rgba(255,240,170,0.9)';
function lcCut(t,ks){const fl=Math.max(0,...ks.map(k=>1-cl(Math.abs(t-k)/0.12)));if(fl>0){g.fillStyle=`rgba(8,12,22,${fl*0.9})`;g.fillRect(0,470,W,1150);}}
// gancho: vierte agua hirviendo del hervidor en el cubo, al lado la lejía; a "revés" se queda parado
ILL.lc_gancho=(c,t)=>{const s=c._s,M=c._m;const rv=M.rev?E(t,M.rev-0.25,0.4):0;const pour=rv<0.5;
 g.save();camLerp(t,s,4,[1.3,560,1030],[1.42,575,1020]);bathroom(t);
 const sh=Math.sin(t*6)*3;const rh=pour?[720,960+sh]:[760,1080];
 const o=lcP({lh:[380,1150],rh,look:rv>0.5?[0,0.1]:[0.6,0.8],mouth:rv>0.5?'o':'smile',brow:rv>0.5?1:0});person(o,t);
 const sp=kettle(rh[0],rh[1],0.8,pour?-0.65:0,t,1);if(pour)pourStream(sp[0],sp[1],605,1062,t,HOTW);
 hands(o);vanityFront();cleanBottle(300,1178-70*0.85,0.85,0,'lejia');bucket(620,1178,0.9,0.75,'rgba(225,235,245,0.9)');
 const st=ease(E(t,s+0.4,1.2));steam(620,1050,t,st*1.4);steam(640,1010,t+1.3,st);g.restore();};
// pregunta temprana: lejía en la mano junto al cubo humeante, mira a cámara
ILL.lc_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=M.q?ease(E(t,M.q-0.2,0.6)):0;
 g.save();cam(1.45,540,1010);bathroom(t);
 const o=lcP({lh:[380,1150],rh:[lerp(640,610,up),lerp(1100,960,up)],look:up>0.5?[0,0.1]:[0.6,0.8],mouth:'smile',brow:up>0.5?1:0});person(o,t);
 cleanBottle(o.rh[0],o.rh[1]+10,0.8,up*0.15,'lejia');hands(o);vanityFront();bucket(700,1178,0.9,0.75,'rgba(225,235,245,0.9)');steam(700,1050,t,1.3);steam(720,1010,t+1.3,1);
 g.restore();};
// mecanismo: el cloro sale del cubo con el vapor y la mezcla pierde fuerza
ILL.lc_evapora=(c,t)=>{const s=c._s,M=c._m;ILL.bano_fondo(c,t);
 const BX=540,BY=1420,S=2.6;const hot=M.cal?E(t,M.cal-0.3,0.6):0;const ev=M.eva?E(t,M.eva-0.2,2.2):0;const fz=M.fue?E(t,M.fue-0.3,0.8):0;
 g.save();g.globalAlpha=ease(E(t,s,0.4));bucket(BX,BY,S,0.75,'rgba(255,240,170,0.92)');g.restore();
 const top=BY-118*S;steam(BX,top-10,t,hot*1.6);steam(BX+60,top-50,t+1.1,hot*1.3);steam(BX-70,top-30,t+2.2,hot*1.2);
 // cloro en el agua: 9 bolitas en la superficie; con el calor se van levantando y salen con el vapor
 const N=9;for(let i=0;i<N;i++){const gone=i<6;const lift=gone?cl((ev-i*0.1)*1.6):0;const bx=BX+(rnd(i+3)-0.5)*300,by=top+(rnd(i+11)-0.5)*20;
  const ph=(t*0.4+rnd(i))%1;const y=lift>0?lerp(by,by-260-ph*120,ease(lift)):by+Math.sin(t*3+i)*3;const x=bx+Math.sin(t*2+i)*8*lift;
  clDot(x,y,lift>0?18:15,(lift>0?1-lift*0.85:1)*E(t,s+0.2,0.4));}
 if(ev>0.2)clVapor(BX,top-120,300,t,0.6*ev,6,260);
 if(t<(M.eva||s+9)-0.2)labelTag('🔥 CON EL CALOR…',540,640,hot,C.amber);else labelTag('PARTE DEL CLORO SE EVAPORA',540,640,1,C.red);
 strengthBar(540,1500,600,1-0.6*ease(cl(ev*1.2)),fz,'FUERZA');};
// qué hacer: 20 ml de lejía → 1 litro de agua fría → el mismo día
ILL.lc_receta=(c,t)=>{const s=c._s,M=c._m;const k1=(M.lit||s+3)-0.25,k2=(M.mis||s+6)-0.25;const stg=t<k1?1:(t<k2?2:3);
 const BX=600;g.save();
 if(stg===1){cam(1.5,560,1010);bathroom(t);
  const pr=ease(E(t,s+0.3,0.8));const fl=1-E(t,s+1.1,Math.max(0.8,k1-s-1.4));
  const rh=[lerp(700,BX+55,pr),lerp(1100,960,pr)];const o=lcP({x:430,lh:[330,1150],rh,look:[0.7,0.8],mouth:'smile'});person(o,t);
  const lip=doseCup(rh[0]+10,rh[1]+40,1,-1.3*pr,fl);if(pr>0.9&&fl>0.03)pourStream(lip[0],lip[1],BX,1178-200*0.06-20,t,BLEACHW);
  hands(o);vanityFront();sprayBottle(BX,1178,0.9,0.06*(1-fl),BLEACHW,'',0);cleanBottle(250,1178-70*0.8,0.8,0,'lejia');}
 else if(stg===2){cam(1.6,560,1000);bathroom(t);vanityFront();
  const f=E(t,k1+0.2,Math.max(0.8,k2-k1-0.6));const by=1178;const top=by-0.9*200*(0.06+0.9*f);
  waterStream(t,BX,700,top,f<1?1:0);sprayBottle(BX,by,0.9,0.06+0.9*f,'rgba(160,215,255,0.65)','',0);
  for(let i=0;i<6;i++){const ph=(t*0.5+rnd(i))%1;flake(BX-150+rnd(i+2)*300,760+ph*380,10,t+i);} }
 else{cam(1.5,560,1000);bathroom(t);vanityFront();
  const cp=ease(E(t,k2+0.1,0.5));sprayBottle(BX-70,1178,0.9,0.96,'rgba(170,215,255,0.65)','LEJÍA',1);
  g.save();g.globalAlpha=cp;calendarPad(BX+150,1090,0.9,'HOY');g.restore();}
 g.restore();
 const lab=stg===1?['1 · 20 ML DE LEJÍA',C.amber,E(t,s+0.2,0.4)]:stg===2?['2 · HASTA 1 LITRO DE AGUA FRÍA ❄️',C.blue,E(t,k1+0.1,0.4)]:['3 · PREPÁRALA EL MISMO DÍA',C.green,E(t,k2+0.1,0.4)];
 labelTag(lab[0],540,640,lab[2],lab[1]);
 if(stg===3){check(780,830,46,E(t,k2+0.4,0.5));labelTag('NO LA GUARDES PARA MAÑANA',540,1450,M.gua?E(t,M.gua-0.2,0.4):0,C.red);}
 lcCut(t,[k1,k2]);};
