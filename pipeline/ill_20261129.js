// ===== Escenas: purgar los radiadores sí sirve (2026-11-29) · kit en ill37.js (usa salon/sofa/coin de ill2.js, wallThermostat/heatWaves de ill6.js, wallBoiler de ill30.js, costMeter de ill5.js, stopwatch de ill13.js, calendarPad de ill8.js, glassCup de ill4.js, qMarks de ill14.js, strengthBar de ill16.js, scr/coinsFrom de ill_20261029.js) =====
const PG_RAD=[40,1085,240,170],PG_SOFA=[400,1160,380],PG_TH=[600,725];
function pgP(o){return Object.assign({x:590,y:1205,apron:false,shirt:'#2fa58f',lh:[500,1150],rh:[680,1150]},o);}
// salón con el radiador (con o sin aire) bajo la ventana y el termostato en la pared
function pgSalon(t,o={}){salon(t,{lamp:o.lamp??1});const r=airRad(...PG_RAD,o.heat??0.75,o.air??0,t,{bleed:true,bk:o.bk||0});wallThermostat(PG_TH[0],PG_TH[1],0.8,o.temp??21,{glow:o.glow});return r;}
function pgDark(a=1){const gr=g.createLinearGradient(0,470,0,1620);gr.addColorStop(0,'#17203a');gr.addColorStop(1,'#0b1020');g.save();g.globalAlpha=a;g.fillStyle=gr;g.fillRect(0,470,W,1150);g.restore();}
ILL.pg_fondo=(c,t)=>{g.save();cam(1,540,1050);pgSalon(t,{air:0});sofa(...PG_SOFA);g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);};
// gancho: toca el radiador, frío por arriba; «purgar no sirve» (se encoge de hombros); el aire lo pagas tú (monedas + gasto)
ILL.pg_gancho=(c,t)=>{const s=c._s,M=c._m;const fr=M.fri?E(t,M.fri-0.5,0.5)*(1-E(t,M.fri+0.9,0.5)):0;const fl=M.fri?E(t,M.fri-0.1,0.4):0;const pu=M.pur?E(t,M.pur-0.2,0.4):0;const pa=M.pag?E(t,M.pag-0.2,0.6):0;
 g.save();camLerp(t,s,5,[1.22,420,1010],[1.3,410,1015]);
 const r=pgSalon(t,{heat:0.8,air:0.42});
 const sh=pu>0?ease(pu)*(1-ease(pa)):0;
 const o=pgP({lh:fr>0?[lerp(500,200,ease(fr)),lerp(1150,1098,ease(fr))]:[lerp(500,450,sh),lerp(1150,1010,sh)],rh:[lerp(680,730,sh),lerp(1150,1010,sh)],
  look:fl>0&&pu<0.5?[-0.9,0.3]:[0,0.1],mouth:pa>0.3?'worry':(pu>0.3?'flat':(fl>0.3?'o':'smile')),brow:pa>0.3||fl>0.3?1:0});
 person(o,t);sofa(...PG_SOFA);hands(o);
 const [rx,ry]=scr(160,PG_RAD[1]),[hx,hy]=scr(590,880);g.restore();
 labelTag('❄ FRÍO POR ARRIBA',Math.max(rx+40,250),ry-70,fl*(1-pu),C.blue);
 labelTag('«PURGAR NO SIRVE»',hx,hy-150,pu*(1-pa),C.gray);
 if(pa>0){coinsFrom(rx,ry+60,t,M.pag,7,900,640);costMeter(990,1400,260,pa,C.red);}};
// pregunta temprana: enseña una moneda (con ella se abre el purgador) y señala el radiador
ILL.pg_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));const q=M.q?E(t,M.q,0.4):0;
 g.save();cam(1.3,470,1000);pgSalon(t,{heat:0.8,air:0.42});
 const o=pgP({rh:[lerp(680,700,up),lerp(1150,930,up)],lh:[lerp(500,330,up),lerp(1150,1080,up)],look:[0,0.15],mouth:'smile',brow:q>0.5?1:0});
 person(o,t);sofa(...PG_SOFA);coin(o.rh[0],o.rh[1]-30,1.6,Math.sin(t*3)*0.9);hands(o);
 const [hx,hy]=scr(590,860);g.restore();qMarks(hx,hy-40,t,q);};
// fuente: medida barata del Ministerio → el radiador pierde el aire y se calienta entero
ILL.pg_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.pg_fondo(c,t);const ba=M.bar?E(t,M.bar-0.2,0.4):0;const pu=M.pur?E(t,M.pur-0.1,1.0):0;
 const r=airRad(340,900,400,230,0.85,lerp(0.45,0,ease(pu)),t,{bleed:true,bk:Math.sin(pu*Math.PI)});
 if(pu>0.05&&pu<0.95)airPuff(r.bleed[0]+10,r.bleed[1],t,1);
 labelTag('✓ BARATA (O GRATIS)',540,1175,ba,C.green);
 check(790,890,40,E(t,(M.pur||s)+0.9,0.5));};
// mecanismo 1: con el agua entra aire; pesa menos, sube y se queda arriba
ILL.pg_aire=(c,t)=>{const s=c._s,M=c._m;pgDark();const en=M.ent?E(t,M.ent-0.3,0.6):0;const su=M.sub?E(t,M.sub-0.2,0.5):0;const ar=M.arr?E(t,M.arr-0.2,0.5):0;
 const air=0.3*ease(E(t,(M.sub||s+1)-0.2,((M.arr||s+3)+0.8)-((M.sub||s+1)-0.2)));
 const yw=radCut(390,760,300,600,t,{air,bub:en});
 labelTag('💨 ENTRA AIRE',540,1450,en,C.blue);
 labelTag('PESA MENOS ↑',870,1060,su,C.amber);
 labelTag('SE QUEDA ARRIBA',540,670,ar,C.blue);};
// mecanismo 2: la bolsa no deja pasar el agua caliente → frío arriba, rinde menos
ILL.pg_bolsa=(c,t)=>{const s=c._s,M=c._m;pgDark();const bo=M.bol?E(t,M.bol-0.2,0.4):0;const ca=M.cal?E(t,M.cal-0.3,0.6):0;const ar=M.arr?E(t,M.arr-0.2,0.5):0;const ri=M.rin?E(t,M.rin-0.2,1.0):0;
 const yw=radCut(390,760,300,600,t,{air:0.3,bub:0.3,flow:ca,cold:ar});
 labelTag('BOLSA DE AIRE',870,(760+yw)/2,bo,C.blue);
 if(ca>0)xBadge(540,yw+34,E(t,(M.cal||s)+0.5,0.4),30);
 labelTag('❄ FRÍO POR ARRIBA',540,670,ar,C.blue);
 strengthBar(540,1450,560,lerp(1,0.3,ease(ri)),cl(ri*3),'RINDE');};
// la caldera trabaja más para la misma temperatura (Repsol) → factura
ILL.pg_caldera=(c,t)=>{const s=c._s,M=c._m;pgDark();const ca=M.cal?E(t,M.cal-0.3,0.5):0;const tr=M.tra?E(t,M.tra-0.2,0.6):0;const mi=M.mis?E(t,M.mis-0.2,0.4):0;const fa=M.fac?E(t,M.fac-0.3,0.6):0;
 const sh=tr>0?Math.sin(t*40)*4*tr:0;
 g.save();g.globalAlpha=cl(ca*2);wallBoiler(540+sh,950,1.5,t,lerp(0.35,1,tr));g.restore();
 if(tr>0)workFx(540,950,290,380,t,tr);
 airRad(70,1250,250,150,0.8,0.42,t,{bleed:true});
 g.save();g.globalAlpha=cl(mi*2+0.25);wallThermostat(890,830,1.15,21,{glow:mi});g.restore();
 labelTag('MISMA TEMPERATURA',890,965,mi,C.green);
 labelTag('TRABAJA MÁS',540,690,tr,C.red);
 if(fa>0){coinsFrom(540,880,t,M.fac,7,900,640);costMeter(950,1430,240,fa,C.red);}
 labelTag('SEGÚN REPSOL',540,1460,E(t,s+0.3,0.4),C.gray);};
// arreglarlo es gratis y rápido: 5–10 minutos por radiador (Repsol)
ILL.pg_tiempo=(c,t)=>{const s=c._s,M=c._m;ILL.pg_fondo(c,t);const gr=M.gra?E(t,M.gra-0.2,0.4):0;const mi=M.min?E(t,M.min-0.4,1.4):0;const ra=M.rad||s+99;
 labelTag('💶 GRATIS',540,680,gr,C.green);
 stopwatch(540,950,170,ease(mi),'5–10 MIN',C.green,cl(mi*4));
 for(let i=0;i<3;i++){const k=E(t,ra-0.3+i*0.35,0.5);if(k<=0)continue;g.save();g.globalAlpha=cl(k*3);const x=110+i*310;
  const r=airRad(x,1250,200,140,0.85,0.42*(1-ease(E(t,ra+0.2+i*0.35,0.6))),t,{bleed:true,frost:true});g.restore();}
 labelTag('POR RADIADOR · SEGÚN REPSOL',540,1460,E(t,ra-0.2,0.4),C.gray);};
// cómo se purga: apagada y fría → moneda en el purgador, vaso debajo → sale aire… y luego agua → cerrar
ILL.pg_purgar=(c,t)=>{const s=c._s,M=c._m;const mo=M.mon||s+1,va=M.vas||s+2,ai=M.aire||s+3,ag=M.agu||s+4,ci=M.cie||s+5;
 const open=E(t,mo,0.6)*(1-E(t,ci-0.1,0.5));const gl=E(t,va-0.3,0.5);const puff=E(t,ai-0.3,0.3)*(1-E(t,ag-0.2,0.3));const wat=E(t,ag-0.2,0.3)*(1-E(t,ci,0.3));
 g.save();camLerp(t,s,1.2,[1.35,380,1050],[1.75,300,1110]);
 const r=pgSalon(t,{heat:0,air:0.42,bk:open});const [bx,by]=r.bleed;
 const reach=ease(E(t,mo-0.8,0.6));
 const o=pgP({lh:[lerp(500,bx+34,reach),lerp(1150,by+26,reach)],rh:[680,1150],look:reach>0.3?[-0.9,0.5]:[-0.3,0.2],mouth:wat>0.5?'smile':'flat',bend:[-1,1]});
 person(o,t);sofa(...PG_SOFA);
 // vaso en el suelo bajo el purgador, se llena con el agua
 const fill=0.08+0.5*E(t,ag,ci-ag);if(gl>0){g.save();g.globalAlpha=gl;g.fillStyle='rgba(200,225,255,0.22)';g.beginPath();g.moveTo(bx-36,1188);g.lineTo(bx-26,1288);g.lineTo(bx+34,1288);g.lineTo(bx+44,1188);g.closePath();g.fill();glassCup(bx+4,1288,0.9,0,fill*E(t,ag,0.2),'rgba(150,200,255,0.85)');g.restore();}
 if(wat>0){g.save();g.globalAlpha=wat;g.fillStyle='#9cc7ff';for(let i=0;i<3;i++){const ph=(t*1.8+i/3)%1;g.beginPath();g.arc(bx+4,lerp(by+12,1200,ph*ph),7,0,7);g.fill();}g.restore();}
 airPuff(bx+10,by,t,puff,1);
 hands(o);if(reach>0.6){g.save();g.translate(bx+2,by);g.rotate(open*1.4);coin(0,0,0.75,1.2);g.restore();}const [sx,sy]=scr(bx,by);g.restore();
 const steps=[[s,'1 · CALEFACCIÓN APAGADA Y FRÍA',C.blue],[mo-0.2,'2 · MONEDA Y VASO DEBAJO',C.amber],[ai-0.2,'3 · SALE AIRE…',C.gray],[ag-0.2,'4 · …SALE AGUA: CIERRA',C.green]];
 let cur=0;steps.forEach((x,i)=>{if(t>=x[0])cur=i;});labelTag(steps[cur][1],540,670,E(t,steps[cur][0],0.3),steps[cur][2]);
 check(Math.min(sx+90,980),sy-90,36,E(t,ci+0.3,0.5));};
// presión de la caldera: OCU 1–1,5 bar; si ha bajado, rellenar
ILL.pg_presion=(c,t)=>{const s=c._s,M=c._m;pgDark();const pr=M.pre?E(t,M.pre-0.3,0.5):0;const oc=M.ocu?E(t,M.ocu-0.2,0.5):0;const ba=M.bar?E(t,M.bar-0.2,0.4):0;const bj=M.baj?E(t,M.baj-0.2,0.4):0;const re=M.rel?E(t,M.rel-0.1,1.0):0;
 wallBoiler(540,870,1.25,t,0);
 g.strokeStyle='#8592a6';g.lineWidth=10;g.beginPath();g.moveTo(540,1030);g.lineTo(540,1080);g.stroke();
 const val=bj>0?lerp(1.25,0.6,ease(bj))+lerp(0,0.65,ease(re)):1.25;
 pressGauge(540,1250,165,val,{band:[1,1.5],bandA:oc,hl:pr*(1-oc),t});
 labelTag('SEGÚN LA OCU',540,670,oc,C.gray);
 labelTag('ENTRE 1 Y 1,5 BAR',540,1490,ba,C.green);
 labelTag('BAJA',800,1130,bj*(1-re),C.red);
 labelTag('↑ RELLENAR',800,1130,re,C.blue);};
// matiz: una vez al año al empezar el frío; si ya calienta igual de arriba abajo, no tiene aire
ILL.pg_matiz=(c,t)=>{const s=c._s,M=c._m;const an=M.ano?E(t,M.ano-0.3,0.5):0;const fr=M.fri?E(t,M.fri-0.2,0.4):0;const ig=M.igu||s+99;const sw=E(t,ig-0.6,0.5);const ai=M.aire?E(t,M.aire-0.2,0.5):0;const na=M.nad?E(t,M.nad-0.2,0.4):0;
 if(sw<1){g.save();g.globalAlpha=1-sw;ILL.pg_fondo(c,t);calendarPad(540,1000,1.5,'1',0);
  if(fr>0){g.save();g.globalAlpha*=fr;for(let i=0;i<10;i++)flake(120+rnd(i)*840,700+((t*50+rnd(i+4)*600)%700),14,t+i);g.restore();}
  labelTag('📅 UNA VEZ AL AÑO',540,700,an,C.amber);labelTag('❄ AL EMPEZAR EL FRÍO',540,1300,fr,C.blue);g.restore();}
 if(sw>0){g.save();g.globalAlpha=sw;g.save();cam(1.25,420,1020);pgSalon(t,{heat:0.9,air:0});
  const tch=E(t,ig-0.2,0.5);const yy=lerp(1098,1230,0.5-0.5*Math.cos(cl((t-ig)/1.6)*Math.PI*2));
  const o=pgP({lh:[lerp(500,170,ease(tch)),tch>0.9?yy:lerp(1150,1098,ease(tch))],look:[-0.9,0.3],mouth:'smile'});person(o,t);sofa(...PG_SOFA);hands(o);
  const [rx,ry]=scr(160,PG_RAD[1]);g.restore();
  labelTag('IGUAL DE ARRIBA ABAJO',Math.max(rx+60,300),ry-80,E(t,ig-0.1,0.4),C.amber);
  check(Math.min(rx+260,900),ry+40,42,ai);
  labelTag('SIN AIRE: PURGAR NO CAMBIA NADA',540,1450,na,C.green);g.restore();}};
