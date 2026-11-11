// ===== Escenas: la sal y el agua que hierve (2026-11-14) · kit en ill22.js (usa stockPot/toStove de ill7.js/ill_20261110.js, potCut de ill21.js, waterJug de ill15.js, potLid/burner/trappedHeat de ill18.js, scr de ill_20261029.js, qMarks de ill14.js, wallClock de ill5.js) =====
function slP(o){return Object.assign({x:620,y:1200,shirt:'#3d7bff'},o);}
// gancho: echa sal a la olla y espera mirando el reloj, impaciente
ILL.sl_gancho=(c,t)=>{const s=c._s,M=c._m;const ec=M.ech?E(t,M.ech-0.3,0.4):0;const no=M.no?E(t,M.no-0.1,0.4):0;const pe=M.pel?E(t,M.pel-0.1,0.4):0;
 g.save();camLerp(t,s,5,[1.25,700,1000],[1.32,720,990]);kitchen(t);
 const tilt=ec*(1-no*0.8);const hx=lerp(760,810,ec),hy=lerp(1100,930,ec);
 const o=slP({rh:[hx,hy],lh:[520,1150],look:no>0.5?[0,0.1]:[0.8,0.2],mouth:pe>0.3?'worry':(no>0.5?'o':'smile'),brow:no>0.5?1:0});
 person(o,t);toStove(t,{st:0.5});counterFront();
 const sp=saltBox(hx+20,hy-10,0.75,lerp(0,-2.1,tilt));hands(o);
 if(tilt>0.6)saltFall(sp[0],sp[1],990,t,cl((tilt-0.6)*3),20,20);
 const [px,py]=scr(TO_POT[0],980);g.restore();
 labelTag('«ASÍ HIERVE ANTES»',540,660,ec*(1-no),C.amber);
 labelTag('⏱️ TARDA UN PELÍN MÁS',540,660,pe,C.red);};
// pregunta temprana: enseña el paquete de sal a cámara
ILL.sl_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.4,660,940);kitchen(t);
 const hx=lerp(760,790,up),hy=lerp(1120,880,up);
 const o=slP({rh:[hx,hy],lh:[520,1150],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);toStove(t,{st:0.8});counterFront();saltBox(hx+8,hy-20,0.8,-0.15*up);hands(o);g.restore();};
// fuente: olla en corte con sal y el termómetro que sube un poco por encima de 100
ILL.sl_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const su=M.sub?ease(E(t,M.sub-0.2,1.2)):0;const no=M.no?E(t,M.no-0.2,0.4):0;
 const wy=potCut(400,1440,420,330,t,{lvl:0.72,boil:0.25+0.75*su});
 saltFall(400,960,wy,t,1-0.6*su,24,60);
 const yv=boilThermo(820,1380,440,lerp(99.6,100.5,su),{lo:98,hi:101,labels:[100],mark:100});
 labelTag('NO HIERVE ANTES',400,1520,no,C.red);
 labelTag('SUBE ⬆',700,yv(100.5)-60,su>0.6?E(t,M.sub+0.6,0.4):0,C.amber);};
// dato: 29 g de sal en un litro → +0,5 °C
ILL.sl_dato=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const a1=ease(E(t,s+0.1,0.5));const sa=M.sal?E(t,M.sal-0.3,0.6):0;const hi=M.hie?ease(E(t,M.hie-0.2,1.0)):0;
 g.save();g.globalAlpha=a1;waterJug(250,1300,1.05,0,0.85,t);g.restore();
 labelTag('1 LITRO',250,1360,a1,C.blue);
 const py=kScale(560,1300,0.9,sa>0.3?'29 g':'0 g',a1);saltPile(560,py,0.9*Math.max(0.05,sa),sa);
 labelTag('29 g DE SAL',560,1360,sa,C.amber);
 const yv=boilThermo(880,1250,430,lerp(100,100.5,hi),{lo:99,hi:101,labels:[99,100,101],mark:100,col:C.red});
 labelTag('100,5 °C',880,yv(100.5)-80,hi>0.7?E(t,M.hie+0.8,0.3):0,C.red);};
// burbujas al echarla: no es que hierva, los granos ayudan a que se formen
ILL.sl_burbujas=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const ec=ease(E(t,s+0.2,0.8));const gr=M.gra?E(t,M.gra-0.2,0.6):0;
 g.save();g.globalAlpha=1;const wy=potCut(540,1430,620,420,t,{lvl:0.7,boil:0.15});
 const sp=saltBox(700,890,0.9,-2.1);saltFall(sp[0],sp[1],wy,t,ec*(1-E(t,(M.gra||s+3)+0.8,0.5)),26,30);
 grainBubbles(540-280,540+280,wy,1410,t,cl(ec*1.2),1);g.restore();
 labelTag('¿HIERVE YA? ✕',540,660,M.no?E(t,M.no-0.2,0.4)*(1-gr):0,C.red);
 labelTag('LOS GRANOS FORMAN BURBUJAS',540,660,gr,C.amber);};
// qué hacer: sal por el sabor y tapa para que hierva antes
ILL.sl_tapa=(c,t)=>{const s=c._s,M=c._m;const kt=(M.tap||s+2.5);const t0=kt-0.6,land=kt+0.3;
 const mv=ease(E(t,t0,land-t0));const on=t>=land;const back=ease(E(t,land+0.6,0.5));const sab=M.sab?E(t,M.sab-0.2,0.4):0;
 g.save();camLerp(t,s,5,[1.35,760,980],[1.42,790,980]);kitchen(t);
 const hold=[lerp(790,TO_KNOB[0],mv),lerp(870,TO_KNOB[1],mv)];
 const rh=on?[lerp(TO_KNOB[0],760,back),lerp(TO_KNOB[1],1130,back)]:hold;
 const o=slP({rh,lh:[520,1150],look:on?[0.6,0.1]:[0.8,-0.2],mouth:'smile'});
 person(o,t);stockPot(...TO_POT,t,{lid:on?1:0});burner(TO_POT[0],1170,170,t,0.8);
 if(!on){steamPlume(TO_POT[0],1010,200,t,0.6,300);steam(TO_POT[0],1010,t,0.6*(1-mv));}
 counterFront();saltBox(430,1135,0.6,0);if(!on)potLid(hold[0],hold[1],0.75,lerp(-0.25,0,mv));
 trappedHeat(TO_POT[0],1085,190,110,t,on?0.8*E(t,land,0.5):0);hands(o);
 g.restore();
 labelTag('🧂 LA SAL, POR EL SABOR',540,660,sab,C.amber);
 labelTag('🍲 TAPA = HIERVE ANTES',540,1440,on?E(t,land,0.4):0,C.green);};
