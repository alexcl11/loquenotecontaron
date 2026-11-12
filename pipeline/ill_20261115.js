// ===== Escenas: el cargador enchufado sin móvil (2026-11-15) · kit en ill23.js (usa kitchen/person de ill.js, wallSocket/cable/calendarPad de ill8.js, qMarks de ill14.js, coin/salon/powerStrip de ill2.js, salonDevices de ill3.js, scr de ill_20261029.js) =====
function cgP(o){return Object.assign({x:520,y:1240,apron:false,shirt:'#2fa58f'},o);}
const CG_SK=[830,1035];
// cocina con un enchufe en el frente de azulejos. ch: {in:true} = cargador enchufado; {x,y,rot} = cargador en la mano
function cgKitchen(t,o,ch,extra){kitchen(t,{stove:false});wallSocket(CG_SK[0],CG_SK[1],0);
 if(extra)extra();
 let p=null;if(ch&&ch.in){p=chargerBrick(CG_SK[0],CG_SK[1]+4,0.95,0);chargerCable(p,960,1150,40);}
 if(o)person(o,t);
 if(ch&&!ch.in){p=chargerBrick(ch.x,ch.y,0.95,ch.rot||0,{pins:true});chargerCable(p,ch.cx??ch.x+90,ch.cy??1150,ch.sag??70);}
 if(o)hands(o);counterFront();}
// gancho: va a quitar el cargador del enchufe «porque gasta mucho» → FALSO
ILL.cg_gancho=(c,t)=>{const s=c._s,M=c._m;const q=M.qui||s;const r1=ease(E(t,q+0.2,0.6)),r2=ease(E(t,q+1.0,0.5));const no=M.no?E(t,M.no-0.15,0.4):0;
 g.save();camLerp(t,s,3,[1.15,620,1040],[1.25,650,1030]);
 const sk=[CG_SK[0]-4,CG_SK[1]+30];const hand=r2>0?[lerp(sk[0],700,r2),lerp(sk[1],1020,r2)]:[lerp(620,sk[0],r1),lerp(1170,sk[1],r1)];
 const o=cgP({lh:[400,1165],rh:hand,look:no>0.5?[0,0.1]:[1,0.3],mouth:no>0.5?'o':'flat',brow:no>0.5?1:0});
 const ch=r2>0.05?{x:hand[0],y:hand[1]-36,rot:lerp(0,-0.25,r2),cx:900,cy:1150}:{in:true};
 cgKitchen(t,o,ch);g.restore();
 labelTag('«EL CARGADOR ENCHUFADO GASTA MUCHO»',540,650,E(t,s+0.2,0.4)*(1-(M.no?E(t,M.no-0.1,0.3):0)),C.amber);};
// pregunta temprana: enseña el cargador (¿lo dejas o lo quitas?)
ILL.cg_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.3,600,990);
 const hand=[lerp(700,690,up),lerp(1020,960,up)];
 const o=cgP({rh:hand,lh:[400,1165],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 cgKitchen(t,o,{x:hand[0],y:hand[1]-36,rot:lerp(-0.25,-0.1,up),cx:880,cy:1160,sag:50});
 const [hx,hy]=scr(o.x,880);g.restore();
 qMarks(hx,hy-40,t,E(t,s+0.3,0.4));};
// fuente: la UE limita el consumo en vacío → medidor enchufado con el cargador sin móvil: 0,1 W
ILL.cg_ley=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const ap=eob(E(t,s+0.1,0.5));const sin=M.sin?E(t,M.sin-0.2,0.4):0;const v=M.val?E(t,M.val-0.3,0.4):0;
 g.save();g.globalAlpha=cl(ap*2);g.translate(540,1060);g.scale(ap,ap);g.translate(-540,-1060);
 g.fillStyle='#2c3557';rr(250,850,580,420,36);g.fill();
 g.save();g.globalAlpha*=0.08;g.strokeStyle='#fff';g.lineWidth=2;for(let x=250;x<830;x+=64){g.beginPath();g.moveTo(x,850);g.lineTo(x,1270);g.stroke();}for(let y=850;y<1270;y+=64){g.beginPath();g.moveTo(250,y);g.lineTo(830,y);g.stroke();}g.restore();
 g.save();g.translate(460,1000);g.scale(2.35,2.35);wallSocket(0,0,0);g.restore();
 const fs=plugMeter(460,1010,1.15,v>0.5?'0,1 W':'– – W',{glow:0.4+0.6*E(t,s+0.4,0.4)});
 const p=chargerBrick(fs[0],fs[1]+4,1.15,0);chargerCable(p,660,1180,90);
 g.restore();
 if(sin>0){g.save();g.globalAlpha=sin;g.translate(730,1000);g.scale(0.55,0.55);mobile(0,0,1,0.1,{off:true,pct:false});g.restore();xMark(730,1000,52,E(t,M.sin,0.5));}
 labelTag('SIN MÓVIL',730,1110,sin,C.red);
 if(v>0){g.save();g.globalAlpha=cl(v)*(0.5+0.5*Math.sin(t*5));g.strokeStyle='#7dffa8';g.lineWidth=5;rr(398,910,124,80,16);g.stroke();g.restore();}};
// un año entero enchufado: el calendario pasa días… y no llega a 15 céntimos
ILL.cg_anio=(c,t)=>{const s=c._s,M=c._m;const a0=s+0.2,a1=(M.ano||s+2)+0.8;const u=cl((t-a0)/(a1-a0));const day=Math.max(1,Math.round(ease(u)*365)),fl=u<1?(u*40)%1:0;
 const qi=M.qui?E(t,M.qui-0.2,0.5):0;
 g.save();cam(1.15,600,1040);
 const o=cgP({x:360,rh:[lerp(470,520,qi),lerp(1165,1080,qi)],lh:[260,1165],look:qi>0.5?[0.2,0.1]:[1,0.1],mouth:qi>0.5?'smile':'flat',brow:qi>0.5?1:0});
 cgKitchen(t,o,{in:true},()=>{calendarPad(640,1050,0.72,day,fl);});
 if(qi>0){coin(o._hands[1][0],o._hands[1][1]-34,0.85*eob(qi),t*3);}
 g.restore();
 labelTag('🔌  ENCHUFADO TODO EL AÑO',540,650,M.ano?E(t,M.ano-0.1,0.4):0,C.amber);
 labelTag('MENOS DE 15 CÉNTIMOS AL AÑO',540,1390,qi,C.green);
 labelTag('SEGÚN ENDESA',540,1460,M.end?E(t,M.end-0.1,0.4):0,C.gray);};
// qué hacer: para ahorrar de verdad, apagar con una regleta los aparatos que se quedan en espera
ILL.cg_regleta=(c,t)=>{const s=c._s,M=c._m;const pr=M.reg?E(t,M.reg-0.5,0.5):0;const off=M.reg?E(t,M.reg+0.05,0.2)>0.5:false;const back=M.reg?E(t,M.reg+0.5,0.6):0;
 g.save();cam(1.2,780,1150);salon(t,{lamp:0.35,dark:0.15});
 router(770,1150,t,1);decoder(905,1150,t,off?0:1);speaker(1010,1150,t,off?0:1);tvLed(1015,978,t,off?0:1,1.3);sofa(...SOFA);
 g.strokeStyle='#e0e3ea';g.lineWidth=5;[[905,1160],[1010,1160]].forEach(([x,y])=>{g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x,1300,x-80+(x>950?40:0),1345);g.stroke();});
 g.beginPath();g.moveTo(1030,990);g.quadraticCurveTo(1060,1200,900,1340);g.stroke();
 g.strokeStyle='#cfd6e2';g.beginPath();g.moveTo(770,1160);g.quadraticCurveTo(700,1280,640,1400);g.stroke();
 powerStrip(880,1360,t,off?0:1);
 // brazo que entra por abajo a la derecha y pulsa el interruptor
 const k=cl(pr)-cl(back);const hx=lerp(1180,972,ease(k)),hy=lerp(1560,1372,ease(k));
 if(k>0){g.lineCap='round';g.strokeStyle='#2fa58f';g.lineWidth=46;g.beginPath();g.moveTo(1260,1700);g.lineTo(lerp(1260,hx+60,0.6),lerp(1700,hy+80,0.6));g.stroke();g.strokeStyle=IL.skin;g.lineWidth=34;g.beginPath();g.moveTo(lerp(1260,hx+60,0.6),lerp(1700,hy+80,0.6));g.lineTo(hx,hy);g.stroke();g.fillStyle=IL.skin;g.beginPath();g.arc(hx,hy,23,0,7);g.fill();}
 g.restore();
 labelTag('¿QUITARLO? POR ORDEN, VALE 👍',540,650,E(t,s+0.2,0.4)*(1-(M.per?E(t,M.per-0.1,0.3):0)),C.gray);
 labelTag('PARA AHORRAR: APARATOS EN ESPERA',540,650,M.per?E(t,M.per,0.4):0,C.amber);
 labelTag(off?'✓  REGLETA APAGADA':'REGLETA CON INTERRUPTOR',540,1450,M.reg?E(t,M.reg-0.4,0.4):0,off?C.green:C.blue);};
