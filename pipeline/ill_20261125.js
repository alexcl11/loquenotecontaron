// ===== Escenas: las luces LED de Navidad no disparan la factura (2026-11-25) · kit en ill33.js (usa salon/sofa/coin/powerStrip de ill2.js, SOFA de ill3.js, billSheet de ill10.js, plugMeter de ill23.js, calendarPad de ill8.js, qMarks de ill14.js, coinsFrom/scr de ill_20261029.js, heatWaves de ill6.js, costMeter de ill5.js) =====
const LZ_TREE=[860,1300,1];
function lzP(o){return Object.assign({x:500,y:1262,apron:false,shirt:'#e5484d'},o);}
// salón de noche con el árbol: o.on = luces, o.kind, o.p = guirnaldas puestas, o.lamp
function lzRoom(t,o={}){salon(t,{lamp:o.lamp??0.35,dark:o.dark??0.15});xmasTree(...LZ_TREE,t,{on:o.on??1,kind:o.kind||'led',p:o.p??1,heat:o.heat||0,star:o.star??(o.on??1)});
 if((o.on??1)>0.1){g.save();g.globalAlpha=0.18*(o.on??1);const gr=g.createRadialGradient(860,1000,40,860,1000,520);gr.addColorStop(0,'rgba(255,210,140,1)');gr.addColorStop(1,'rgba(255,210,140,0)');g.fillStyle=gr;g.fillRect(300,500,900,900);g.restore();}}
// fondo atenuado: salón con el árbol encendido
ILL.lz_fondo=(c,t)=>{g.save();cam(1,540,1050);lzRoom(t,{lamp:0.5});const o=lzP({lh:[420,1150],rh:[600,1150],look:[0.6,0.2],mouth:'smile'});person(o,t);hands(o);sofa(...SOFA);g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);};
// gancho: en el sofá, con la clavija de las luces en la mano, no las enchufa «por la factura»… y con LED cuestan céntimos
ILL.lz_gancho=(c,t)=>{const s=c._s,M=c._m;const fa=M.fac?E(t,M.fac-0.3,0.5):0;const on=M.led?ease(E(t,M.led-0.1,0.5)):0;const ce=M.cen?E(t,M.cen-0.2,0.5):0;
 g.save();camLerp(t,s,5,[1.12,600,1030],[1.2,640,1020]);lzRoom(t,{on,lamp:0.3,dark:0.3*(1-on)});
 const plugIn=on;const hx=lerp(640,700,plugIn),hy=lerp(1080,1250,plugIn);
 const o=lzP({lh:[420,1150],rh:[hx,hy],look:[fa>0&&on<0.5?-0.3:0.8,fa>0&&on<0.5?-0.6:0.1],mouth:on>0.5?'smile':(fa>0?'worry':'flat'),brow:fa>0&&on<0.5?1:0});
 person(o,t);
 // cable de la guirnalda: del árbol a la mano
 g.strokeStyle='#1f3a2a';g.lineWidth=5;g.beginPath();g.moveTo(720,1240);g.quadraticCurveTo(720,1300,hx,hy+10);g.stroke();g.fillStyle='#f4f6fb';rr(hx-12,hy-22,24,30,6);g.fill();
 hands(o);sofa(...SOFA);const [bx,by]=scr(400,820);g.restore();
 if(fa>0&&on<1){g.save();g.globalAlpha=cl(fa*2)*(1-on);billSheet(bx-40,by+40,0.55,-0.1,{rows:0});g.restore();}
 labelTag('«¿Y LA FACTURA?»',540,650,fa*(1-on),C.blue);
 labelTag('✨ CON LED',540,650,on,C.amber);
 if(ce>0){coin(830,1430-40*eob(ce),1.6,t*3);labelTag('CÉNTIMOS',830,1340-40*eob(ce),ce,C.green);}};
// pregunta temprana: señala el árbol, las luces parpadean
ILL.lz_pregunta=(c,t)=>{const s=c._s,M=c._m;const pt=ease(E(t,s+0.1,0.5));const pu=M.pue?E(t,M.pue-0.2,0.4):0;
 g.save();cam(1.18,640,1010);lzRoom(t,{on:1,lamp:0.4});
 const o=lzP({lh:[420,1150],rh:[lerp(600,760,pt),lerp(1150,960,pt)],look:[0.6,-0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});person(o,t);hands(o);sofa(...SOFA);
 if(pu>0){g.save();g.globalAlpha=pu*(0.5+0.5*Math.sin(t*8));g.strokeStyle=C.amber;g.lineWidth=6;g.beginPath();g.arc(860,1010,250,0,7);g.stroke();g.restore();}
 const [hx,hy]=scr(500,860);g.restore();if(M.q)qMarks(hx,hy-30,t,E(t,M.q,0.4));};
// fuente: un mes de luces LED → menos de un euro (calendario que pasa los días + una moneda)
ILL.lz_mes=(c,t)=>{const s=c._s,M=c._m;ILL.lz_fondo(c,t);const ms=M.mes?E(t,M.mes-0.3,1.6):0;const eu=M.eur?E(t,M.eur-0.2,0.5):0;
 const day=Math.max(1,Math.round(lerp(1,31,ms)));if(M.mes&&t>M.mes-0.4){calendarPad(290,1040,1.25,String(day),(t*4)%1*(ms<1?1:0));labelTag('TODO EL MES',290,870,E(t,M.mes-0.3,0.4),C.blue);}
 if(M.hor){const hk=E(t,M.hor-0.2,0.4);labelTag('🕕 VARIAS HORAS AL DÍA',540,1450,hk,C.amber);}
 if(eu>0){coin(790,1040,2.4*eob(eu),t*2);}};
// mecanismo: 100 luces LED ≈ 5 W vs 100 de bombillas antiguas ≈ 60 W (medidores de enchufe)
ILL.lz_vatios=(c,t)=>{const s=c._s,M=c._m;const gr=g.createLinearGradient(0,470,0,1620);gr.addColorStop(0,'#17203a');gr.addColorStop(1,'#0b1020');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 const a=M.led?E(t,M.led-0.3,0.6):0;const w5=M.w5?E(t,M.w5-0.2,0.5):0;const b=M.ant?E(t,M.ant-0.3,0.6):0;const w60=M.w60?E(t,M.w60-0.2,0.5):0;
 [[280,'led',a,w5,'5 W','100 LUCES LED',C.green],[800,'old',b,w60,'60 W','100 BOMBILLAS ANTIGUAS',C.red]].forEach(([x,k,p,w,val,lab,col])=>{if(p<=0)return;g.save();g.globalAlpha=cl(p*2);
  g.fillStyle='#e9e4d8';rr(x-60,700,120,120,16);g.fill();plugMeter(x,830,1.1*eob(p),w>0?val:'',{glow:w});
  garland(x-230,1020,x+230,1060,t,{kind:k,on:p,n:k==='led'?9:6,sag:120,s:k==='led'?1.6:1.4,seed:k==='led'?0:5});
  g.strokeStyle='#1f3a2a';g.lineWidth=5;g.beginPath();g.moveTo(x,920);g.quadraticCurveTo(x-200,960,x-230,1020);g.stroke();
  if(k==='old')heatWaves(x,1180,300,t,p*0.8);g.restore();labelTag(lab,x,1330,p,col);
  if(w>0)txt(val,x,1430,96,col,900,'center',cl(w*2));});
 if(w60>0)txt('×12',540,1000,64,'#fff',900,'center',E(t,M.w60+0.3,0.4));};
// por qué son más seguras: dos bombillas de cerca; la antigua se calienta, la LED no; reloj de vida útil
ILL.lz_calor=(c,t)=>{const s=c._s,M=c._m;const gr=g.createLinearGradient(0,470,0,1620);gr.addColorStop(0,'#17203a');gr.addColorStop(1,'#0b1020');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 const ap=ease(E(t,s,0.5));const du=M.dur?E(t,M.dur-0.2,0.5):0;const ca=M.cal?E(t,M.cal-0.3,0.6):0;const se=M.seg?E(t,M.seg-0.2,0.5):0;
 g.save();g.globalAlpha=ap;bigXLight(300,1010,8,'led',1,t,{i:2});bigXLight(780,990,7,'old',1,t,{heat:ca});g.restore();
 labelTag('LED',300,780,ap,C.green);labelTag('ANTIGUA',780,780,ap,C.gray);
 labelTag('⏳ DURA MÁS',300,1270,du,C.green);
 labelTag('🌡 MENOS CALOR',300,1380,ca,C.green);labelTag('🔥 SE CALIENTA',780,1300,ca,C.red);
 labelTag('✓ MÁS SEGURAS',540,1470,se,C.green);if(se>0)check(420,900,36,se);};
// la cuenta (Selectra): 5 W × 6 h × 33 noches = 0,99 kWh ≈ 10 céntimos
ILL.lz_cuenta=(c,t)=>{const s=c._s,M=c._m;ILL.lz_fondo(c,t);const a1=M.a?E(t,M.a-0.1,0.4):0,b1=M.b?E(t,M.b-0.1,0.4):0,c1=M.c?E(t,M.c-0.1,0.4):0,r1=M.r?E(t,M.r-0.1,0.4):0,e1=M.e?E(t,M.e-0.1,0.4):0;
 if(a1>0){g.save();g.globalAlpha=cl(a1*2);g.fillStyle='rgba(20,29,48,0.92)';rr(110,700,860,560,40);g.fill();g.restore();}
 txt('5 W',200,820,72,C.green,900,'center',a1);txt('×',305,820,56,'#fff',900,'center',b1);txt('6 h',410,820,72,C.amber,900,'center',b1);
 txt('×',515,820,56,'#fff',900,'center',c1);txt('33 noches',740,820,66,C.blue,900,'center',c1);
 if(c1>0){calendarPad(540,990,0.9,'6',0);txt('6 DIC → 7 ENE',540,1110,34,'#cfd6e2',800,'center',c1);}
 txt('= 0,99 kWh',540,1190,72,'#fff',900,'center',r1);
 if(e1>0){coin(330,1400,1.8*eob(e1),t*3);txt('≈ 10 céntimos',610,1400,72,C.green,900,'center',e1);}};
// qué hacer: guarda las antiguas en la caja y pone la guirnalda LED en el árbol
ILL.lz_cambiar=(c,t)=>{const s=c._s,M=c._m;const ca=M.cam?ease(E(t,M.cam-0.2,1.0)):0;const ah=M.aho?E(t,M.aho-0.2,0.5):0;
 g.save();camLerp(t,s,4,[1.12,600,1030],[1.18,640,1020]);
 lzRoom(t,{on:1,kind:ca>0.55?'led':'old',heat:ca>0.55?0:0.6,lamp:0.35});
 const old=1-cl(ca*2);const hx=lerp(560,330,ease(cl(ca*2))),hy=lerp(1080,1200,ease(cl(ca*2)));
 const o=lzP({x:520,lh:[hx,hy],rh:[lerp(640,760,ca),lerp(1100,1040,ca)],look:[ca<0.5?-0.6:0.8,0.2],mouth:'smile'});person(o,t);
 if(old>0)garland(hx-90,hy-10,hx+20,hy+10,t,{kind:'old',on:0,n:4,sag:50,s:1.2});
 hands(o);sofa(...SOFA);xBox(260,1300,0.9,1);g.restore();
 labelTag('AÚN TIENES LAS ANTIGUAS',540,650,E(t,s+0.1,0.4)*(1-ah),C.amber);
 labelTag('CÁMBIALAS POR LED',540,650,ah,C.green);
 labelTag('HASTA ~99 % DE AHORRO',540,1440,ah,C.green);};
// matiz de seguridad (OCU): no todo en el mismo enchufe, cables sin cortes, marcado CE, IP44 si van fuera
ILL.lz_seguro=(c,t)=>{const s=c._s,M=c._m;const gr=g.createLinearGradient(0,470,0,1620);gr.addColorStop(0,'#26365a');gr.addColorStop(1,'#1a2742');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 const en=M.enc?E(t,M.enc-0.3,0.6):0;const no=M.mis?E(t,M.mis+0.3,0.4):0;const cb=M.cab?E(t,M.cab-0.2,0.5):0;const ce=M.ce?E(t,M.ce-0.2,0.5):0;const ex=M.ext?E(t,M.ext-0.2,0.5):0;
 overloadSocket(300,860,1.15,t,{heat:en*(1-no*0.6),n:3});if(no>0)xmarkDraw(300,880,90,no);
 labelTag('TODO EN EL MISMO ENCHUFE',300,700,en,C.red);
 // cable con un corte
 if(cb>0){g.save();g.globalAlpha=cl(cb*2);g.strokeStyle='#e0e3ea';g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(600,780);g.lineTo(760,780);g.moveTo(800,780);g.lineTo(980,780);g.stroke();
  g.strokeStyle='#c46a2a';g.lineWidth=4;g.beginPath();g.moveTo(760,780);g.lineTo(780,770);g.moveTo(760,782);g.lineTo(784,790);g.stroke();
  g.strokeStyle=C.amber;g.lineWidth=5;g.beginPath();g.arc(780,780,46+4*Math.sin(t*8),0,7);g.stroke();g.restore();labelTag('CABLES SIN CORTES',790,700,cb,C.amber);}
 if(ce>0){garland(560,1080,1000,1080,t,{kind:'led',on:1,n:7,sag:70,s:1.4});cableTag(640,1170,1.2,'CE',ce);labelTag('MARCADO CE',640,1330,ce,C.green);}
 if(ex>0){cableTag(900,1170,1.2,'IP44',ex,'#cfe8ff');labelTag('FUERA: IP44',900,1420,ex,C.blue);}};
function xmarkDraw(x,y,r,p){if(p<=0)return;g.save();g.translate(x,y);g.globalAlpha=cl(p*3);g.fillStyle=C.red;g.beginPath();g.arc(0,0,r*eob(p)*0.55,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=r*0.14;g.lineCap='round';const q=r*0.22;g.beginPath();g.moveTo(-q,-q);g.lineTo(q,q);g.moveTo(q,-q);g.lineTo(-q,q);g.stroke();g.restore();}
