// ===== Escenas: el radiador del cuarto que no usas (2026-11-30) · kit en ill38.js (usa radiator/heatWaves de ill6.js, salon/sofa/coin de ill2.js, roomDoor de ill26.js, cornerMold/heatFlow de ill13.js, costMeter de ill5.js, qMarks de ill14.js, scr/coinsFrom de ill_20261029.js) =====
function rvP(o){return Object.assign({x:640,y:1300,apron:false,shirt:'#d9825b',lh:[560,1250],rh:[720,1250]},o);}
function rvDark(a=1){const gr=g.createLinearGradient(0,470,0,1620);gr.addColorStop(0,'#17203a');gr.addColorStop(1,'#0b1020');g.save();g.globalAlpha=a;g.fillStyle=gr;g.fillRect(0,470,W,1150);g.restore();}
// fondo atenuado: el cuarto con el radiador bajo y la puerta cerrada
ILL.rv_fondo=(c,t)=>{g.save();cam(1,540,1050);spareRoom(t,{heat:0.3,vk:0.5,door:1});g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);};
// gancho: radiador a tope en un cuarto lleno de cajas; «cerrarlo no sirve» (se encoge de hombros); ese calor lo pagas tú
ILL.rv_gancho=(c,t)=>{const s=c._s,M=c._m;const cu=M.cua?E(t,M.cua-0.3,0.5):0;const va=M.vac?E(t,M.vac-0.2,0.5):0;const ce=M.cer?E(t,M.cer-0.3,0.4):0;const ns=M.nos?E(t,M.nos-0.2,0.4):0;const pa=M.pag?E(t,M.pag-0.2,0.6):0;
 g.save();camLerp(t,s,6,[1.12,500,1000],[1.2,480,1010]);
 spareRoom(t,{heat:0.9,door:0.05,bulb:1});
 const sh=ease(ns)*(1-ease(pa)*0.6);const pt=ease(ce)*(1-ease(ns));
 const o=rvP({lh:pt>0?[lerp(560,330,pt),lerp(1250,1150,pt)]:[lerp(560,500,sh),lerp(1250,1100,sh)],rh:[lerp(720,790,sh),lerp(1250,1100,sh)],
  look:pt>0.3?[-0.9,0.3]:[0,0.1],mouth:pa>0.3?'worry':(ns>0.3?'flat':'smile'),brow:pa>0.3?1:0});
 person(o,t);hands(o);
 const [rx,ry]=scr(RV_RAD[0]+RV_RAD[2]/2,RV_RAD[1]),[hx,hy]=scr(640,960),[bx,by]=scr(570,1040);g.restore();
 labelTag('🔥 A TOPE',rx,ry-60,cu*(1-pa),C.amber);
 labelTag('📦 NADIE LO USA',760,690,va*(1-ns),C.blue);
 labelTag('«CERRARLO NO SIRVE»',hx,hy-180,ns*(1-pa),C.gray);
 if(pa>0){coinsFrom(rx,ry+40,t,M.pag,7,900,660);costMeter(980,1380,260,pa,C.red);}};
// pregunta temprana: la mano en la válvula, la cierra… y la vuelve a abrir
ILL.rv_pregunta=(c,t)=>{const s=c._s,M=c._m;const ci=M.cie?E(t,M.cie-0.2,0.5):0;const pu=M.pue?E(t,M.pue-0.2,0.5):0;const q=M.q?E(t,M.q,0.4):0;const re=ease(E(t,s,0.6));
 const vk=ease(ci)*(1-ease(pu));
 g.save();cam(1.35,330,1060);const vp=spareRoom(t,{heat:lerp(0.85,0.25,vk),vk,door:0.05});
 const o=rvP({x:420,lh:[lerp(340,vp[0]+20,re),lerp(1250,vp[1]-6,re)],rh:[500,1270],look:[-0.6,0.3+0.3*q],mouth:'smile',brow:q>0.5?1:0});
 person(o,t);hands(o);const [hx,hy]=scr(420,960);g.restore();
 qMarks(hx+40,hy-60,t,q);};
// fuente: el Ministerio · el piso en sección; cada estancia, su temperatura
ILL.rv_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.rv_fondo(c,t);const ap=ease(E(t,s+0.2,0.6));const aj=M.aju?ease(E(t,M.aju-0.1,1.2)):0;const hb=M.hab?E(t,M.hab-0.2,1.5):0;const pc=M.pct?E(t,M.pct,0.4):0;
 const hl=hb>0&&hb<1?Math.min(2,Math.floor(hb*3)):null;
 flatCut(120,950,840,250,t,{a:ap,heat:[0.85,lerp(0.85,0.5,aj),lerp(0.85,0.15,aj)],hl});
 if(pc>0)check(905,935,34,pc);};
// mecanismo: no todas necesitan el mismo calor · se ajustan una a una · la media baja sin pasar frío
ILL.rv_estancias=(c,t)=>{const s=c._s,M=c._m;rvDark();const ap=ease(E(t,s,0.5));const ms=M.mis?E(t,M.mis-0.2,0.4):0;
 const a1=M.aju?ease(E(t,M.aju-0.1,0.7)):0;const a2=M.una?ease(E(t,M.una,0.7)):0;const md=M.med?E(t,M.med-0.3,0.5):0;const fr=M.fri?E(t,M.fri-0.3,0.4):0;
 const cs=flatCut(70,820,940,380,t,{a:ap,heat:[0.85,lerp(0.85,0.5,a1),lerp(0.85,0.12,a2)],hl:a2>0.05&&a2<0.95?2:(a1>0.05&&a1<0.95?1:null)});
 labelTag('¿TODAS CON EL MISMO CALOR?',540,660,ms*(1-a1),C.amber);
 labelTag('✓ CADA UNA, LO SUYO',540,660,a1,C.green);
 const lvl=lerp(0.78,0.6,ease(E(t,(M.med||s+99)-0.1,1.0)));
 avgBar(240,1390,600,lvl,md,0.78);
 if(md>0)txt('MEDIA DE LA CASA ↓',540,1320,32,'#dfe5f0',900,'center',cl(md));
 if(fr>0){labelTag('✓ SIN PASAR FRÍO',540,1470,fr,C.green);check(cs[0][0]+110,cs[0][1]-120,30,fr);}};
// matiz: cerrarlo del todo · pared helada · condensación · moho
ILL.rv_moho=(c,t)=>{const s=c._s,M=c._m;const ci=M.cie?ease(E(t,M.cie-0.3,0.6)):0;const he=M.hel?ease(E(t,M.hel-0.3,0.9)):0;const co=M.con?E(t,M.con-0.4,1.2):0;const mo=M.moh?E(t,M.moh-0.3,1.0):0;
 g.save();camLerp(t,s,6,[1.18,330,980],[1.28,300,940]);
 const vp=spareRoom(t,{heat:lerp(0.6,0,ci),vk:ci,cold:he,dew:co,mold:mo,door:1});
 const back=ease(E(t,(M.cie||s)+0.9,0.5));
 const o=rvP({x:560,lh:[lerp(340,480,back),lerp(1120,1260,back)],rh:[720,1250],look:[-0.7,he>0.3?-0.4:0.3],mouth:mo>0.3?'worry':(he>0.3?'o':'flat'),brow:he>0.3?1:0});
 person(o,t);hands(o);if(he>0.3)shiverFx(560,1000,t,he*(1-mo*0.5));
 const [vx,vy]=scr(vp[0],vp[1]),[wx,wy]=scr(RV_WIN[0]+RV_WIN[2]/2,RV_WIN[1]);g.restore();
 labelTag('✕ CERRADO DEL TODO',vx+170,vy+90,ci*(1-he),C.red);
 labelTag('❄ PARED HELADA',470,1450,he*(1-cl(co*3)),C.blue);
 labelTag('💧 LA HUMEDAD SE CONDENSA',470,1450,co*(1-cl(mo*3)),C.blue);
 labelTag('⚠ Y SALE MOHO',470,1450,mo,C.red);};
// qué hacer: bajarlo (no cerrarlo) y cerrar la puerta para que el calor del salón no se escape
ILL.rv_bajar=(c,t)=>{const s=c._s,M=c._m;const bj=M.baj?ease(E(t,M.baj-0.2,0.7)):0;const pu=M.pue?ease(E(t,M.pue-0.2,0.9)):0;const sl=M.sal?E(t,M.sal-0.2,0.5):0;const es=M.esc?E(t,M.esc-0.2,0.5):0;
 g.save();cam(1,540,1050);salon(t,{lamp:1});radiator(50,1105,200,150,0.8,t);
 const kn=roomDoor(780,850,220,440,pu,t,{wall:true});
 const o=rvP({x:560,rh:pu>0&&pu<1?[kn[0]-10,kn[1]]:(pu>=1?[720,1250]:[lerp(720,kn[0]-10,ease(E(t,(M.pue||99)-0.9,0.6))),lerp(1250,kn[1],ease(E(t,(M.pue||99)-0.9,0.6)))]),lh:[480,1260],look:[0.7,0],mouth:sl>0.3?'smile':'flat'});
 person(o,t);hands(o);
 // el calor del salón entra al cuarto mientras la puerta está abierta; cerrada, se queda
 heatFlow(300,820,880,880,t,0.9*(1-pu),6);
 if(pu>0.6)heatFlow(300,820,600,780,t,0.7*pu,4);
 g.restore();
 // inserto: la válvula en posición baja
 const ia=bj*(1-ease(E(t,(M.pue||99)-0.3,0.5)));
 if(ia>0){g.save();g.globalAlpha=cl(ia*2);g.fillStyle='rgba(20,29,48,0.94)';g.beginPath();g.arc(780,800,190,0,7);g.fill();g.strokeStyle=C.green;g.lineWidth=6;g.stroke();
  g.beginPath();g.arc(780,800,184,0,7);g.clip();g.translate(780,800);g.scale(1.6,1.6);g.translate(-300,-1190);
  radiator(260,1110,160,150,lerp(0,0.35,bj),t,{valve:true,vk:lerp(1,0.5,bj)});g.restore();
  labelTag('✓ BAJO, NO CERRADO',780,1030,ia,C.green);}
 labelTag('🚪 PUERTA CERRADA',540,660,pu,C.blue);
 labelTag('✓ EL CALOR SE QUEDA EN EL SALÓN',540,1450,Math.max(sl,es),C.green);};
