// ===== Escenas: dejar la calefacción encendida toda la noche (2026-11-22) · kit en ill30.js (usa bedroom/duvet/zzz/radiator/wallThermostat de ill6.js, coinsFrom/scr de ill_20261029.js, qMarks de ill14.js, costMeter de ill5.js) =====
const CN_RAD=[96,1112,176,136];
function cnP(o){return Object.assign({x:590,y:1300,apron:false,shirt:'#8b7cf6'},o);}
// dormitorio con radiador bajo la ventana; o.dark = noche, o.heat = radiador, o.temp/o.off = termostato
function cnRoom(t,o={}){bedroom(t,{temp:o.temp??21,off:o.off,lamp:o.lamp??1,blind:o.blind??0.5});radiator(...CN_RAD,o.heat??0.7,t);
 if(o.glow){g.save();g.globalAlpha=0.5*o.glow;g.strokeStyle=C.amber;g.lineWidth=6;g.beginPath();g.arc(960,760,74+5*Math.sin(t*7),0,7);g.stroke();g.restore();}}
function cnDark(a){if(a>0){g.fillStyle=`rgba(4,6,14,${a})`;g.fillRect(-600,300,2300,1500);}}
// fondo atenuado del dormitorio de noche
ILL.cn_fondo=(c,t)=>{g.save();cam(1,540,1050);cnRoom(t,{lamp:0.3,heat:0.6});const o=cnP({lh:[470,1290],rh:[710,1290],look:[0,0.4],mouth:'flat'});person(o,t);duvet(t);g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);};
// gancho: se va a dormir con la calefacción puesta toda la noche; el radiador sigue y salen monedas
ILL.cn_gancho=(c,t)=>{const s=c._s,M=c._m;const nc=M.noc?E(t,M.noc-0.3,0.6):0;const ca=M.car?E(t,M.car-0.2,0.5):0;
 g.save();camLerp(t,s,5,[1.04,560,1010],[1.12,560,1015]);
 cnRoom(t,{temp:21,lamp:1-nc,heat:0.75+0.2*Math.sin(t*3)*nc,glow:ca});cnDark(0.35*nc);radiator(...CN_RAD,0.85,t);
 const yawn=M.dej?E(t,M.dej,0.3)*(1-E(t,M.dej+1.1,0.3)):0;
 const o=cnP({lh:[470,1290],rh:[710,1290],look:[ca>0?0.9:0,ca>0?-0.5:0.4],mouth:ca>0?'o':(yawn>0.3?'o':'smile'),brow:ca>0?1:0});
 person(o,t);duvet(t);zzz(690,930,t,nc*(1-ca));
 const [rx,ry]=scr(CN_RAD[0]+CN_RAD[2]/2,CN_RAD[1]);const [tx,ty]=scr(960,760);g.restore();
 labelTag('🔥 TODA LA NOCHE',Math.min(tx,880),ty+110,nc,C.amber);
 if(M.cal)labelTag('«ASÍ GASTO MENOS»',540,660,E(t,M.cal-0.1,0.4),C.blue);
 if(M.car){coinsFrom(rx,ry,t,M.car-0.1,8,880,640);costMeter(980,1330,300,E(t,M.car-0.2,1.2),C.red);}};
// pregunta temprana: sentada en la cama, señala el termostato (OFF → encendido)
ILL.cn_pregunta=(c,t)=>{const s=c._s,M=c._m;const pt=ease(E(t,s+0.1,0.5));const pu=M.pue?E(t,M.pue-0.2,0.3):0;const ap=M.apa?E(t,M.apa-0.2,0.3)*(1-pu):0;
 g.save();cam(1.25,640,980);cnRoom(t,{temp:21,off:ap>0.5,lamp:1,heat:ap>0.5?0.1:0.7,glow:pu});
 const o=cnP({lh:[470,1290],rh:[lerp(710,830,pt),lerp(1290,1000,pt)],look:[pt>0.5?0.5:0,-0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);duvet(t);const h=o._hands[1];g.fillStyle=IL.skin;g.beginPath();g.arc(h[0],h[1],23,0,7);g.fill();g.restore();
 if(M.q)qMarks(380,800,t,E(t,M.q,0.4));};
// fuente: la OCU · encendida toda la noche vs apagada (monedas, sin cifras)
ILL.cn_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.cn_fondo(c,t);
 const ap=ease(E(t,s+0.2,0.6));const ah=M.aho?E(t,M.aho-0.4,0.9):0;const pc=M.pct?E(t,M.pct,0.4):0;
 const cols=[[300,'🔥  TODA LA NOCHE',C.amber,9],[780,'🌙  APAGADA',C.blue,9]];
 cols.forEach(([x,lb,col,n],j)=>{const keep=j?Math.round(lerp(9,3,ease(ah))):9;
  for(let k=0;k<n;k++){const kp=cl(ap*n-k*0.6);if(kp<=0)continue;const gone=j&&k>=keep;const yy=1250-k*30-(1-ease(kp))*60;
   if(gone){const f=cl(ah*2-(k-3)*0.12);g.save();g.globalAlpha=1-f;coin(x+f*120,yy-f*90,1.35,0.3);g.restore();}else coin(x,yy,1.35,0.3);}
  labelTag(lb,x,920,ap,col);});
 if(pc>0)check(780+90,1100,36,pc);};
// mecanismo 1: encendida toda la noche, el calor se escapa sin parar y la caldera lo repone
ILL.cn_fuga=(c,t)=>{const s=c._s,M=c._m;const es=M.esc?E(t,M.esc-0.3,0.6):0.15;const pa=M.par?E(t,M.par-0.3,0.6):0;const cd=M.cdr?ease(E(t,M.cdr-0.3,0.6)):0;const rp=M.rep?E(t,M.rep-0.2,0.5):0;
 g.save();camLerp(t,s,6,[1.0,540,1000],[1.06,520,1000]);
 cnRoom(t,{temp:21,lamp:0,heat:0.85,blind:0.5});cnDark(0.3);
 const o=cnP({lh:[470,1290],rh:[710,1290],look:[0,0.5],mouth:'flat'});person(o,t);duvet(t);zzz(690,930,t,0.8);
 heatFlow(220,780,-60,700,t,es,6);heatFlow(560,820,560,500,t,es*0.9,5);
 heatFlow(780,880,1140,820,t,pa,6);heatFlow(300,1000,-60,1060,t,pa,5);
 g.restore();
 labelTag('EL CALOR SE ESCAPA SIN PARAR',540,660,es>0.2?E(t,M.esc||s,0.4):0,C.red);
 if(cd>0){g.save();g.globalAlpha=cl(cd*2);g.fillStyle='rgba(20,29,48,0.92)';g.beginPath();g.arc(830,1240,170,0,7);g.fill();g.strokeStyle=C.amber;g.lineWidth=6;g.stroke();
  g.beginPath();g.arc(830,1240,164,0,7);g.clip();wallBoiler(830,1230,0.95*eob(cd),t,0.9);g.restore();
  labelTag('LA CALDERA, A REPONERLO',540,1450,cd,C.amber);}
 if(rp>0){coinsFrom(830,1120,t,M.rep,7,240,1080);costMeter(150,1400,280,rp,C.red);}};
// mecanismo 2: gráfica de la noche · apagada se enfría poco a poco, pierde menos y por la mañana recupera
ILL.cn_curva=(c,t)=>{const s=c._s,M=c._m;ILL.cn_fondo(c,t);
 const on=ease(E(t,s+0.1,1.2));const off=M.apa?ease(E(t,M.apa,M.enf?Math.max(1,M.enf+1.2-M.apa):2.5)):0;const ls=M.men?E(t,M.men-0.3,0.7):0;
 const sun=M.man?E(t,M.man-0.2,0.5):0;const ri=M.rec?ease(E(t,M.rec,1.0)):0;const bb=M.bar?E(t,M.bar-0.2,0.4):0;
 const offP=Math.min(off*0.8+ (ri>0?0.2*ri:0),1);
 const r=nightCurve(130,780,820,470,t,{on,off:offP,loss:ls,rise:ri,sun});
 labelTag('ENCENDIDA',300,r.yHi-44,on,C.amber);
 labelTag('APAGADA',560,r.blueY(0.45)+56,off,C.blue);
 labelTag('PIERDE MENOS CALOR',540,660,ls,C.blue);
 if(sun>0)labelTag('☀ RECUPERA',r.xw+10,r.yHi-44,ri,C.amber);
 if(bb>0){labelTag('✓  Y AUN ASÍ, MÁS BARATO',540,1440,bb,C.green);}};
// qué hacer: programarla · apagada al acostarse, encendida un rato antes de levantarse; mayores o niños: 1 hora antes
ILL.cn_programa=(c,t)=>{const s=c._s,M=c._m;ILL.cn_fondo(c,t);
 const pr=ease(E(t,(M.pro||s)-0.1,0.6));const ac=M.aco?E(t,M.aco-0.3,0.6):0;const en=M.enc?E(t,M.enc-0.1,0.6):0;const lv=M.lev?E(t,M.lev-0.1,0.4):0;const my=M.may?E(t,M.may-0.2,0.4):0;const hr=M.hor?ease(E(t,M.hor-0.4,0.7)):0;
 // termostato programable grande: pantalla según el tramo del cursor
 const cur=lerp(0.05,0.95,ease(E(t,s+0.6,7.2)));const night=cur>SB_NA&&cur<SB_NB-0.12*(1+hr)&&ac>0.5;
 g.save();g.globalAlpha=pr;g.translate(540,960);g.scale(lerp(0.8,1,eob(pr)),lerp(0.8,1,eob(pr)));
 g.fillStyle='#f4f1ea';rr(-200,-150,400,300,40);g.fill();g.fillStyle='#10141c';rr(-170,-120,340,180,22);g.fill();
 if(night){moonI(-100,-30,34);txt('OFF',50,-28,74,'#8e98ad',900);}else{sunDisk(-100,-30,26,t,1);txt('21°',50,-28,80,C.amber,900);}
 txt('PROGRAMA',0,100,30,'#5c667a',900);g.fillStyle=C.amber;g.beginPath();g.arc(150,100,16+3*Math.sin(t*6)*(1-ac),0,7);g.fill();
 g.restore();
 schedBar(130,1210,820,64,t,{p:pr,off:ac,pre:0.14*en*(1+hr),cur,a:pr});
 labelTag('🌙 AL ACOSTARTE: APAGADA',540,660,ac*(1-my),C.blue);
 labelTag('☀ UN RATO ANTES DE LEVANTARTE',540,1360,en,C.amber);
 if(lv>0)check(910,1100,34,lv);
 labelTag('MAYORES O NIÑOS PEQUEÑOS',540,660,my,C.purple);
 labelTag('⏰ UNA HORA ANTES',540,1450,hr,C.amber);};
