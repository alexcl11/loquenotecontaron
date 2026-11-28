// ===== Escenas: el marisco no aguanta en la mesa toda la cena (2026-12-01) · kit en ill39.js (usa salon de ill2.js, xmasTree de ill33.js, radiator/heatWaves de ill6.js, fridge/flake de ill2.js, kitchen/germ/labelTag de ill.js, limitClock/bigThermo de ill28.js, tempBand de ill32.js, qMarks de ill14.js, wallClock de ill5.js, sunDisk de ill10.js) =====
function mrP(o){return Object.assign({x:400,y:1200,apron:false,shirt:'#3d7bff'},o);}
const MR_PL=[740,1140];               // fuente de marisco sobre la mesa
const MR_HOLD=[420,1040];             // fuente en las manos del personaje
function mrRoom(t,o={}){salon(t,{lamp:o.lamp??0.6,dark:o.dark??0});xmasTree(930,1290,0.85,t,{on:1,kind:'led'});
 if(o.rad){radiator(60,960,200,130,o.rad,t);heatWaves(160,930,200,t,o.rad);}}
function mrSet(t){dinPlate(330,1128,0.9);wineGlass(190,1132,0.9,0.5);candle(500,1134,0.75,t);}
// gérmenes que se multiplican sobre la fuente (k 0–1 = cuántos)
function mrGerms(x,y,t,k,t0){if(k<=0)return;const N=12;for(let i=0;i<Math.round(N*k);i++){const px=x+(rnd(i+3)-0.5)*300,py=y-30-rnd(i+17)*60;germ(px,py,12,t,i,1,cl(1-E(t,t0+i*0.15,0.3))*0.5);}}
// fondo atenuado: comedor con la fuente en la mesa
ILL.mr_fondo=(c,t)=>{g.save();cam(1,540,1050);mrRoom(t);const o=mrP({lh:[330,1120],rh:[480,1120],look:[0.5,0.2],mouth:'smile'});person(o,t);dinTable(t);mrSet(t);seafoodPlatter(...MR_PL,1,t);hands(o);g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);};
// gancho: deja la fuente en la mesa «aguanta», el reloj corre toda la cena y aparecen las bacterias
ILL.mr_gancho=(c,t)=>{const s=c._s,M=c._m;const t0=(M.mes||s+0.6)-0.5;const mv=ease(E(t,t0,0.9));const back=ease(E(t,t0+0.9,0.5));
 const ag=M.agu?E(t,M.agu-0.2,0.4):0;const bc=M.bac?E(t,M.bac-0.2,1.6):0;const ce=M.cen?E(t,M.cen-0.2,0.4):0;
 g.save();camLerp(t,s,5,[1.12,560,1000],[1.22,620,1010]);mrRoom(t);
 const pp=[lerp(MR_HOLD[0]+120,MR_PL[0],mv),lerp(MR_HOLD[1],MR_PL[1],mv)-40*Math.sin(mv*Math.PI)];
 const held=mv<1;const sc=lerp(0.8,1,mv);
 const lh=held?[pp[0]-170*sc,pp[1]-12]:[lerp(MR_PL[0]-176,330,back),lerp(MR_PL[1]-12,1120,back)];
 const rh=held?[pp[0]+40,pp[1]+6]:[lerp(MR_PL[0]-60,480,back),lerp(MR_PL[1],1120,back)];
 const o=mrP({lh,rh,look:bc>0.3?[0.8,0.3]:(ag>0?[0,0.1]:[0.7,0.3]),mouth:bc>0.3?'worry':'smile',brow:bc>0.3?1:0});
 person(o,t);dinTable(t);mrSet(t);seafoodPlatter(pp[0],pp[1],sc,t,{warm:bc*0.6});hands(o);
 mrGerms(MR_PL[0],MR_PL[1],t,bc,M.bac||s+3);
 wallClock(560,730,52,t,ce>0?(t-M.cen)*3:0);g.restore();
 labelTag('«AGUANTA TODA LA CENA»',540,660,ag*(1-(M.bac?E(t,M.bac,0.3):0)),C.amber);
 labelTag('🦠 LAS BACTERIAS CRECEN',540,660,M.bac?E(t,M.bac,0.4):0,C.red);};
// pregunta temprana: enseña la fuente con las dos manos, ¿mesa o nevera?
ILL.mr_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s+0.1,0.6));const sh=M.q?ease(E(t,M.q-0.2,0.5)):0;
 g.save();cam(1.3,520,1000);mrRoom(t);
 const pp=[lerp(MR_HOLD[0],MR_HOLD[0]+10,up),lerp(MR_HOLD[1]+40,MR_HOLD[1]-10,up)];const sc=0.8;
 const o=mrP({lh:[pp[0]-170*sc,pp[1]-12],rh:[pp[0]+170*sc,pp[1]-12],look:[0,0.1],mouth:'smile',brow:sh>0.5?1:0});
 person(o,t);dinTable(t);mrSet(t);seafoodPlatter(pp[0],pp[1],sc,t);hands(o);g.restore();
 // a un lado la mesa, al otro la nevera
 const a1=M.mes?E(t,M.mes-0.1,0.4):0,a2=M.gua?E(t,M.gua-0.1,0.4):0;
 if(a1>0){g.save();g.globalAlpha=cl(a1*2);tileDraw('🍽️',170,1000,150,a1,t,{border:C.amber});g.restore();}
 if(a2>0){g.save();g.globalAlpha=cl(a2*2);tileDraw('❄️',910,1000,150,a2,t,{border:C.blue});g.restore();}
 qMarks(540,800,t,sh);};
// fuente: FDA → como mucho 2 horas fuera de la nevera (reloj que se llena hasta 2 h)
ILL.mr_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.mr_fondo(c,t);const ap=M.cla?ease(E(t,M.cla-0.2,0.5)):0;const ck=M.clk?ease(E(t,M.clk-0.2,0.5)):0;const pu=M.nun?Math.sin(Math.PI*E(t,M.nun-0.1,0.5)):0;const h=M.dos?2*ease(E(t,M.dos-0.1,1.2)):0;
 if(ap>0){g.save();g.globalAlpha=ap;seafoodPlatter(330,1170,0.95*lerp(0.8,1,ap),t);g.restore();}
 if(ck>0){g.save();g.globalAlpha=ck;limitClock(780,1050,125*eob(ck)*(1+0.12*pu),h,t,{max:2});g.restore();}
 if(M.nev){const k=E(t,M.nev-0.1,0.4);if(k>0){g.save();g.globalAlpha=cl(k*2);tileDraw('❄️',560,960,96,k,t,{border:C.blue,x:k});g.restore();}}};
// mecanismo 1: termómetro con la franja 4–60 °C y bacterias que se multiplican
ILL.mr_franja=(c,t)=>{const s=c._s,M=c._m;ILL.mr_fondo(c,t);const ap=ease(E(t,s,0.5));const b1=M.cua?E(t,M.cua-0.2,1.0):0;const b2=M.ses?E(t,M.ses-0.2,0.8):0;
 const bc=M.bac?E(t,M.bac-0.2,0.5):0;const mu=M.mul?E(t,M.mul-0.3,1.8):0;
 g.save();g.globalAlpha=ap;const yv=bigThermo(300,1330,560,lerp(0,30,b1),{lo:-10,hi:80,step:10,col:b1>0.5?C.red:C.blue});
 tempBand(300,yv,4,60,b2>0?0.15+0.85*b2:(b1>0?0.15*b1:0),C.red,{loT:'4°',hiT:'60°',w:120});
 if(b2>0.95){txt('60°',300-60-80,yv(60),40,C.red,900,'center',1);}
 g.restore();
 if(bc>0){g.save();g.globalAlpha=cl(bc*2);g.fillStyle='rgba(229,72,77,0.16)';rr(500,800,460,500,40);g.fill();g.strokeStyle=C.red;g.lineWidth=4;g.setLineDash([14,10]);rr(500,800,460,500,40);g.stroke();g.restore();
  const n=Math.round(lerp(2,22,mu));for(let i=0;i<n;i++){const px=560+rnd(i+1)*340,py=860+rnd(i+31)*380;germ(px,py,20,t,i,1,cl(1-E(t,(M.mul||s)-0.3+i*0.08,0.3))*0.6);}}
 labelTag('ZONA DE PELIGRO',730,1440,bc,C.red);};
// mecanismo 2: en el comedor caldeado el marisco se templa y entra en la franja
ILL.mr_comedor=(c,t)=>{const s=c._s,M=c._m;const ca=M.cal?ease(E(t,M.cal-0.3,0.8)):0;const fr=M.fra?E(t,M.fra-0.3,0.6):0;const ma=M.mar?E(t,M.mar-0.3,1.4):0;
 g.save();camLerp(t,s,5,[1.15,520,1010],[1.25,600,1020]);mrRoom(t,{rad:ca});
 const o=mrP({lh:[330,1120],rh:[480,1120],look:[0.8,0.25],mouth:fr>0.3?'worry':'smile',brow:fr>0.3?1:0});person(o,t);dinTable(t);mrSet(t);
 seafoodPlatter(...MR_PL,1,t,{warm:ma*0.8});hands(o);
 foodThermo(960,1120,190,lerp(2,24,ma),{bandA:cl(fr*1.5+0.4)});
 mrGerms(MR_PL[0],MR_PL[1],t,fr,M.fra||s+3);g.restore();
 labelTag('🔥 CALEFACCIÓN PUESTA',540,660,ca*(1-fr),C.amber);
 labelTag('⚠️ JUSTO EN LA FRANJA',540,660,fr,C.red);};
// la nevera: 4 °C o menos, fuera de la franja; se guarda ahí hasta servir
ILL.mr_nevera=(c,t)=>{const s=c._s,M=c._m;const FX=70,FY=560;const op=ease(E(t,(M.nev||s+0.3)-0.4,0.6));const t0=(M.gua||s+3)-0.6;const mv=ease(E(t,t0,1.0));const placed=t>t0+1.0;const back=ease(E(t,t0+1.05,0.5));
 const SH=[220,FY+450];
 g.save();camLerp(t,s,6,[1.25,360,960],[1.32,340,975]);kitchen(t);fridge(FX,FY,t,op,1);
 const pk=[lerp(440,SH[0],mv),lerp(1090,SH[1]-6,mv)-50*Math.sin(mv*Math.PI)];const sc=0.62;
 const hand=placed?[lerp(SH[0]+110,470,back),lerp(SH[1]-20,1150,back)]:[pk[0]+70,pk[1]-4];
 const o=mrP({x:600,lh:hand,rh:[720,1150],look:[-0.9,0.1],mouth:'smile'});person(o,t);counterFront();
 seafoodPlatter(pk[0],pk[1],sc,t);hands(o);
 const th=M.cua?E(t,M.cua-0.3,0.8):0;if(th>0){foodThermo(250,FY+300,110,lerp(14,2,th),{a:cl(th*2),bandA:0.6});for(let i=0;i<4;i++)flake(130+i*45,FY+250+(i%2)*30,10,t+i);}
 g.restore();
 labelTag('❄️ NEVERA: 4 °C O MENOS',540,660,M.cua?E(t,M.cua,0.4)*(M.ser?1-E(t,M.ser-0.2,0.3):1):0,C.blue);
 labelTag('✓ FUERA DE LA FRANJA',540,1440,M.fue?E(t,M.fue,0.4):0,C.green);
 labelTag('✓ HASTA EL MOMENTO DE SERVIR',540,660,M.ser?E(t,M.ser-0.2,0.4):0,C.green);};
// la cuenta: de las 9 a las 12 → 3 horas, una de más
ILL.mr_cuenta=(c,t)=>{const s=c._s,M=c._m;ILL.mr_fondo(c,t);const ap=ease(E(t,s+0.1,0.5));const h=M.doc?3*E(t,M.doc-0.5,1.6):0;const tr=M.tre?E(t,M.tre-0.2,0.4):0;const ms=M.mas?E(t,M.mas-0.3,0.4):0;
 const R=230;const D=dinnerClock(540,1040,R*lerp(0.85,1,ap),t,{from:9,h,max:2,a:ap});
 if(M.nue){const k=E(t,M.nue-0.1,0.4);labelTag('🍤 LO SACAS · 21:00',540,700,k,C.amber);}
 if(h>=2){const k=E(t,(M.doc-0.5)+1.6*2/3,0.3);const p=D.at(11);txt('2 h',p[0]-30,p[1]-30,52,C.green,900,'center',k);}
 if(tr>0){txt('3 h',540,1040+R+90,80,C.red,900,'center',tr);}
 labelTag('✕ UNA HORA DE MÁS',540,1440,ms,C.red);};
// qué hacer: sacarlo justo antes de servir, sobre hielo si va a estar más rato, y las sobras a la nevera antes de 2 h
ILL.mr_hielo=(c,t)=>{const s=c._s,M=c._m;const t0=(M.ser||s+1.5)-0.9;const mv=ease(E(t,t0,0.9));const back=ease(E(t,t0+0.9,0.5));const ic=M.hie?E(t,M.hie-0.3,0.8):0;const nv=M.nev?E(t,M.nev-0.3,0.5):0;
 g.save();camLerp(t,s,7,[1.12,560,1000],[1.2,620,1000]);mrRoom(t);
 const pp=[lerp(MR_HOLD[0]+120,MR_PL[0],mv),lerp(MR_HOLD[1],MR_PL[1],mv)-40*Math.sin(mv*Math.PI)];const held=mv<1;const sc=lerp(0.8,0.9,mv);
 const lh=held?[pp[0]-170*sc,pp[1]-12]:[lerp(MR_PL[0]-160,330,back),lerp(MR_PL[1]-12,1120,back)];
 const rh=held?[pp[0]+40,pp[1]+6]:[lerp(MR_PL[0]-60,480,back),lerp(MR_PL[1],1120,back)];
 const o=mrP({lh,rh,look:[0.7,0.3],mouth:'smile'});person(o,t);dinTable(t);mrSet(t);
 seafoodPlatter(pp[0],pp[1],sc,t,{ice:held?0:ic});hands(o);
 if(ic>0.3){for(let i=0;i<4;i++)flake(MR_PL[0]-150+i*100,MR_PL[1]-170-(i%2)*30,12,t+i);}
 g.restore();
 if(nv>0){dinnerClock(890,800,80,t,{from:9,h:lerp(0,1.8,E(t,M.nev,1.2)),max:2,a:cl(nv*2)});}
 labelTag('✓ JUSTO ANTES DE SERVIR',540,660,M.sac?E(t,M.sac,0.4)*(M.hie?1-E(t,M.hie-0.3,0.3):1):0,C.green);
 labelTag('🧊 MÁS RATO: SOBRE HIELO',540,660,M.hie?E(t,M.hie-0.3,0.4)*(nv>0?1-nv:1):0,C.blue);
 labelTag('✓ SOBRAS A LA NEVERA ANTES DE 2 H',540,1440,nv,C.green);};
// matiz: con mucho calor (> 32 °C) el límite baja a 1 hora
ILL.mr_calor=(c,t)=>{const s=c._s,M=c._m;const ca=M.cal?ease(E(t,M.cal-0.3,0.8)):0;const tr=M.tre?E(t,M.tre-0.3,1.0):0;const bj=M.baj?ease(E(t,M.baj-0.2,1.0)):0;const un=M.una?E(t,M.una-0.2,0.4):0;
 g.save();cam(1,540,1050);const gr=g.createLinearGradient(0,470,0,1300);gr.addColorStop(0,mixc('#2a3f6e','#ff9a4a',ca*0.7));gr.addColorStop(1,mixc('#1a2742','#e0703a',ca*0.6));g.fillStyle=gr;g.fillRect(-100,400,1300,1300);
 if(ca>0)sunDisk(880,700,80,t,ca);
 dinTable(t,{col:'#3d7bff'});seafoodPlatter(560,1140,1,t,{warm:ca});g.restore();
 g.save();g.globalAlpha=ease(E(t,s,0.4));const yv=bigThermo(170,1300,460,lerp(15,36,tr),{lo:0,hi:45,step:5,col:C.red,mark:32,markA:tr,markCol:C.amber});if(tr>0.5)txt('32°',300,yv(32)-40,44,C.amber,900,'center',cl((tr-0.5)*2));g.restore();
 limitClock(800,1000,120,2,t,{max:lerp(2,1,bj)});
 labelTag('☀️ MÁS DE 32 °C',540,660,tr,C.amber);
 labelTag('⏱️ SOLO 1 HORA',800,1440,un,C.red);};
