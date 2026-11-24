// ===== Escenas: la olla exprés sí ahorra luz (2026-11-27) · kit en ill35.js (usa stockPot de ill7.js, potLid de ill18.js, costMeter/wallClock de ill5.js, timeBar de ill9.js, coinJar de ill9.js, calendarPad de ill8.js, qMarks de ill14.js, scr de ill_20261029.js) =====
const OP_POT=[885,1150,0.75];
function opP(o){return Object.assign({x:600,y:1200,shirt:'#2fb36b'},o);}
function opDark(){const gr=g.createLinearGradient(0,470,0,1620);gr.addColorStop(0,'#17203a');gr.addColorStop(1,'#0b1020');g.fillStyle=gr;g.fillRect(0,470,W,1150);}
// cazuela de garbanzos destapada en la placa (vitro encendida)
function opCazuela(t,o={}){stockPot(...OP_POT,t,{lid:o.lid||0,soup:'#d9b36a'});
 if(!(o.lid>=1)){for(let i=0;i<12;i++){const px=OP_POT[0]-80+rnd(i+40)*160,py=OP_POT[1]-136+rnd(i+60)*8;g.fillStyle='#e8c98a';g.beginPath();g.arc(px,py,6,0,7);g.fill();}
  steamPlume(OP_POT[0],1000,190,t,o.st??1,320);steam(OP_POT[0],1000,t,(o.st??1)*0.8);}
 hobGlow(OP_POT[0],1168,180,o.fire??1,t);}
ILL.op_fondo=(c,t)=>{ILL.cocina_fondo(c,t);};
// gancho: garbanzos hora y media en la cazuela, el reloj corre; la olla exprés, guardada en la encimera; el gasto sube
ILL.op_gancho=(c,t)=>{const s=c._s,M=c._m;const ga=M.gar?E(t,M.gar-0.2,0.4):0;const ho=M.hor?E(t,M.hor-0.2,0.4):0;const re=M.res?E(t,M.res-0.2,0.5):0;const fa=M.fac?E(t,M.fac-0.3,0.8):0;
 g.save();camLerp(t,s,5,[1.1,620,1010],[1.18,640,1000]);kitchen(t);
 wallClock(1040,870,50,t,ho>0?1.4:0.05);
 const o=opP({rh:[760,1130],lh:re>0?[lerp(500,315,ease(re)),lerp(1150,1110,ease(re))]:[500,1150],look:re>0.3?[-0.8,0.3]:[0.7,-0.2],mouth:fa>0.4?'worry':(re>0.3?'flat':'smile'),brow:re>0.3?1:0});
 person(o,t);opCazuela(t,{fire:1});counterFront();
 g.save();g.globalAlpha=0.6+0.4*re;expressPot(230,1180,0.55,t,{lid:1});g.restore();hands(o);
 const [px,py]=scr(OP_POT[0],960),[ex,ey]=scr(230,1060),[cx,cy]=scr(1040,870);g.restore();
 labelTag('🫘 GARBANZOS',Math.min(px,860),Math.max(py-120,650),ga,C.amber);
 labelTag('⏱ 1 H 30 MIN',Math.min(cx-60,900),cy-95,ho,C.red);
 labelTag('LA OLLA EXPRÉS, GUARDADA',Math.max(ex+60,280),1330,re,C.blue);
 costMeter(1010,1360,220,fa,C.red);};
// pregunta temprana: saca la olla exprés y la enseña a cámara
ILL.op_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.7));
 g.save();cam(1.3,640,980);kitchen(t);
 const px=lerp(230,690,up),py=lerp(1180,1100,up);
 const o=opP({rh:[760,1130],lh:[500,1150],look:[0,0.15],mouth:'smile',brow:M.q&&t>M.q?1:0});
 const pos={handle:[px-0.6*270,py-0.6*163],side:[px+0.6*148,py-0.6*123]};o.lh=pos.handle;o.rh=pos.side;
 person(o,t);opCazuela(t,{fire:0.6,st:0.6});counterFront();expressPot(px,py,0.6,t,{lid:1});hands(o);
 const [hx,hy]=scr(600,880);g.restore();if(M.q)qMarks(hx,hy-30,t,E(t,M.q,0.4));};
// fuente OCU: 50–70 % más rápido → barras de tiempo cazuela vs olla
ILL.op_ocu=(c,t)=>{const s=c._s,M=c._m;ILL.op_fondo(c,t);const a=M.cz?E(t,M.cz-0.4,1.0):0;const b=M.ol?E(t,M.ol-0.2,0.8):0;const me=M.me?E(t,M.me-0.2,0.4):0;
 if(a>0){timeBar(150,960,780,a,C.red,'🍲 CAZUELA');}
 if(b>0){timeBar(150,1100,780,0.4*b,C.green,'⚡ OLLA A PRESIÓN');}
 labelTag('🔥 MENOS GAS O LUZ',540,1450,me,C.green);};
// mecanismo: cerrada, el vapor no sale, sube la presión y el agua hierve hasta a 120 °C (OCU)
ILL.op_presion=(c,t)=>{const s=c._s,M=c._m;opDark();const ce=M.cer?E(t,M.cer-0.3,0.6):0;const va=M.vap?E(t,M.vap-0.2,0.6):0;const pr=M.pre?E(t,M.pre-0.2,0.8):0;const tc=M.t120?E(t,M.t120-0.4,0.9):0;const an=M.ant?E(t,M.ant-0.2,0.4):0;
 hobGlow(470,1380,330,0.8,t);cutPot(470,1380,1.35,t,{fill:0.55,lid:ce,press:Math.max(va*0.6,pr),ring:pr});
 if(va>0&&ce>=1){}
 barThermo(880,1300,380,lerp(0.35,1,ease(tc)),mixc('#ffb35a','#e5484d',tc));
 labelTag('🔒 TAPA CERRADA',470,700,ce*(1-va),C.blue);
 labelTag('EL VAPOR NO SE ESCAPA',470,700,va,C.amber);
 labelTag('SUBE LA PRESIÓN',470,790,pr,C.red);
 if(tc>0)txt('120 °C',880,840,72,'#fff',900,'center',tc);
 labelTag('⏱ COCINA ANTES',540,1470,an,C.green);};
// mecanismo 2 (IDAE): para mantener el hervor, 150 W en la olla a presión vs 850 W en la cazuela destapada
ILL.op_vatios=(c,t)=>{const s=c._s,M=c._m;opDark();const mi=M.min?E(t,M.min-0.3,0.6):0;const he=M.her?E(t,M.her-0.2,0.4):0;const w1=M.w150?E(t,M.w150-0.2,0.5):0;const w8=M.w850?E(t,M.w850-0.2,0.5):0;
 g.fillStyle='#e3cfa9';g.fillRect(0,1240,W,26);g.fillStyle='#2e3f66';g.fillRect(0,1266,W,360);g.fillStyle='#151b28';rr(120,1228,320,14,4);g.fill();rr(640,1228,320,14,4);g.fill();
 // izquierda: cazuela destapada (aparece con el 850)
 const lA=Math.max(w8,0.35);g.save();g.globalAlpha=lA;stockPot(280,1226,0.8,t,{lid:0,soup:'#d9b36a'});hobGlow(280,1232,200,1,t);steamPlume(280,1060,200,t,1,300);g.restore();
 // derecha: olla a presión con el fuego que baja al mínimo
 hobGlow(800,1232,200,lerp(1,0.28,ease(mi)),t);expressPot(800,1226,0.72,t,{lid:1,ring:1,hiss:0.5+0.3*mi});
 labelTag('PARA MANTENER EL HERVOR',540,660,he,C.amber);
 labelTag('FUEGO AL MÍNIMO',800,760,mi*(1-w1),C.blue);
 labelTag('CAZUELA DESTAPADA',280,1330,w8,C.gray);labelTag('OLLA A PRESIÓN',800,1330,w1,C.gray);
 if(w1>0)txt('150 W',800,1440,96,C.green,900,'center',w1);
 if(w8>0)txt('850 W',280,1440,96,C.red,900,'center',w8);};
// un guiso de garbanzos a la semana → ≈ 16 € al año (Selectra): semanas que pasan y monedas a la hucha
ILL.op_ano=(c,t)=>{const s=c._s,M=c._m;const se=M.sem||s+0.4;const e16=M.e16?E(t,M.e16-0.2,0.5):0;
 g.save();cam(1.2,620,1110);kitchen(t,{stove:false});calendarPad(900,700,0.75,String((Math.floor(cl((t-se)/3)*6)*7)%31+1),(t>se?((t-se)/0.6)%1:0));
 const drop=(t-s)%0.9/0.9;const hy=950-Math.sin(drop*Math.PI)*25;
 const o=opP({x:500,lh:[420,1165],rh:[700,hy],look:[0.9,0.5],mouth:'smile'});person(o,t);
 const fill=lerp(0.05,0.9,ease(E(t,s+0.3,(c._e||s+5)-s-0.3)));coinJar(720,1178,0.9,fill,t);
 const k=drop;if(k>0.15&&k<0.85){coin(720,lerp(hy+20,1010,(k-0.15)/0.7),0.9,t*6);}hands(o);counterFront();expressPot(300,1180,0.5,t,{lid:1});
 const [jx,jy]=scr(720,1178);g.restore();
 labelTag('🫘 UN GUISO A LA SEMANA',540,650,E(t,se-0.2,0.4),C.amber);
 if(e16>0)txt('≈ 16 € al año',540,1440,84,C.green,900,'center',e16);};
// cómo usarla: llenar como mucho ⅔, fuego fuerte hasta que sube la válvula, luego al mínimo; no abrir hasta que baje
ILL.op_uso=(c,t)=>{const s=c._s,M=c._m;const ll=M.lle?E(t,M.lle-0.2,0.5):0;const fu=M.fue||s+99,mi=M.min||s+99,ab=M.abr||s+99;
 const lidOn=E(t,fu-0.9,0.6);const ring=E(t,fu+0.2,1.0)*(1-E(t,ab+0.3,1.2));const fire=t<mi-0.2?(t>fu-0.3?1:0.6):lerp(1,0.28,E(t,mi-0.2,0.5));const wa=E(t,ab-0.2,0.4);
 g.save();camLerp(t,s,6,[1.35,780,1000],[1.45,800,990]);kitchen(t);
 const o=opP({rh:[760,1130],lh:[500,1150],look:[0.8,0.1],mouth:'smile',brow:wa>0.5?1:0});
 hobGlow(OP_POT[0],1168,180,fire,t);
 const r=expressPot(OP_POT[0],OP_POT[1]+6,0.62,t,{lid:lidOn,ring,hiss:ring>0.8?(t<mi?1:0.4):0});
 if(wa>0){o.rh=r.handle;o.look=[0.6,-0.4];}
 person(o,t);counterFront();hands(o);
 const [vx,vy]=scr(r.valve[0],r.valve[1]);g.restore();
 // panel de pasos (abajo) + aviso del paso actual (arriba)
 const st=[[ll,'🫘 MÁX. ⅔ DE LLENO'],[E(t,fu-0.2,0.4),'🔥 FUERTE HASTA QUE SUBA'],[E(t,mi-0.2,0.4),'↓ LUEGO, AL MÍNIMO'],[wa,'✋ NO ABRIR HASTA QUE BAJE']];
 labelTag('✓ ÚSALA BIEN',540,660,E(t,s+0.1,0.4),C.green);
 if(ring>0.5&&t<ab)labelTag('VÁLVULA ARRIBA',Math.min(vx,880),vy-60,E(t,fu+0.6,0.4),C.red);
 const cols=[C.amber,C.red,C.blue,C.red];st.forEach((x,i)=>labelTag(x[1],i%2?790:290,1390+(i>1?90:0),x[0],cols[i]));};
// matiz: sin olla exprés, al menos tapa la cazuela (hasta −25 %)… pero la olla sigue ganando
ILL.op_tapa=(c,t)=>{const s=c._s,M=c._m;const kt=(M.tap||s+0.8);const t0=kt-0.6,land=kt+0.3;const mv=ease(E(t,t0,land-t0));const on=t>=land;const back=ease(E(t,land+0.6,0.5));const p2=M.p25?E(t,M.p25-0.2,0.5):0;const ga=M.gan?E(t,M.gan-0.3,0.6):0;
 g.save();camLerp(t,s,5,[1.3,740,990],[1.36,760,990]);kitchen(t);
 const TK=[OP_POT[0],OP_POT[1]+(-190-29)*0.75];
 const hold=[lerp(790,TK[0],mv),lerp(880,TK[1],mv)];const rh=on?[lerp(TK[0],760,back),lerp(TK[1],1130,back)]:hold;
 const o=opP({rh,lh:[500,1150],look:on?[0.6,0.1]:[0.8,-0.2],mouth:'smile'});person(o,t);
 opCazuela(t,{lid:on?1:0,st:on?0:1-0.5*mv,fire:1});counterFront();if(!on)potLid(hold[0],hold[1],0.75,lerp(-0.25,0,mv));
 hands(o);g.restore();
 if(ga>0){g.save();g.globalAlpha=cl(ga*2);expressPot(250,1500,0.55*eob(ga)+0.001,t,{lid:1,ring:1,hiss:0.5});g.restore();}
 labelTag('🍲 CON TAPA',540,650,on?E(t,land,0.4):0,C.amber);
 labelTag('HASTA −25 %',540,740,p2,C.green);
 labelTag('✓ PERO LA OLLA GANA',650,1440,ga,C.green);};
