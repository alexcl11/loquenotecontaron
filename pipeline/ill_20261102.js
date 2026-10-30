// ===== Escenas: ¿poner la lavadora de noche siempre es más barato? (2026-11-02) · kit en ill10.js =====
const LN_WM=[660,1212];
// precio horario esquemático de un laborable de octubre de 2026 con PVPC (sin cifras): madrugada > el doble que 14–16 h
const LN_PV=[0.80,0.78,0.76,0.75,0.76,0.80,0.86,0.92,0.95,0.80,0.60,0.46,0.40,0.36,0.34,0.34,0.40,0.55,0.78,0.97,1.00,0.98,0.92,0.85];
function lnP(o){return Object.assign({x:500,y:1240,apron:false,shirt:'#6f86d6'},o);}
// cocina con lavadora bajo la encimera a la derecha. day 0–1 = ventana de día; night = oscuridad
function lnScene(t,o,wm,opt={}){kitchen(t,{stove:false});kitchenDay(opt.day||0,t);if(o)person(o,t);if(opt.held)opt.held(o);counterFront();const G=washer(LN_WM[0],LN_WM[1],t,wm);
 if(o){if(o.reach)armFront(o,1,t);hands(o);}
 if(opt.night){g.fillStyle=`rgba(4,8,22,${opt.night})`;g.fillRect(-600,300,2300,1500);const lg=g.createRadialGradient(560,1000,40,560,1000,520);lg.addColorStop(0,`rgba(255,210,140,${0.6*opt.night*0.35})`);lg.addColorStop(1,'rgba(255,210,140,0)');g.fillStyle=lg;g.fillRect(-600,300,2300,1500);}
 return G;}
const LN_BTN=[LN_WM[0]+175,LN_WM[1]+31];
// gancho: de madrugada, bostezando, pone la lavadora
ILL.ln_gancho=(c,t)=>{const s=c._s,M=c._m;const pr=ease(E(t,s+0.5,0.5))*(1-ease(E(t,s+1.5,0.5)));const on=t>s+1.1;
 const dp=M.dep?E(t,M.dep-0.1,0.4):0,ta=M.tar?E(t,M.tar-0.2,0.4):0;
 g.save();camLerp(t,s,4,[1.3,620,1130],[1.15,600,1100]);
 const o=lnP({reach:pr>0.02,rh:[lerp(610,LN_BTN[0],pr),lerp(1165,LN_BTN[1],pr)],lh:[420,1165],look:dp>0.5?[0.6,-0.6]:[0.7,0.8],mouth:dp>0.5?'worry':(on?'o':'flat'),brow:dp>0.5?1:0});
 lnScene(t,o,{prog:on?'ECO':'——',spin:on?0.6:0,p:on?0.05:0,water:on?0.35:0},{night:0.35});
 const [hx,hy]=scr(o.x,930);g.restore();
 labelTag('🌙 01:30',820,660,E(t,s+0.2,0.4),C.blue);
 if(M.mad&&!(dp>0)){const k=E(t,M.mad,0.4);zzz(hx+60,hy-70,t,k);}
 thinkBubble(hx-150,hy-170,74,dp,[hx-50,hy-70],(x,y)=>{txt('?',x,y,90,'#1a1f2b',900);});
 labelTag('☀️ ¿LA TARDE?',820,760,ta,C.amber);};
// la factura: tres tipos de contrato
ILL.ln_factura=(c,t)=>{const s=c._s,M=c._m;const tr=M.tre||s+1.5;const rows=cl((t-tr)/0.45,0,3);const hk=M.cad?((t-M.cad)/0.5)%3:-1;
 g.save();camLerp(t,s,4,[1.15,560,1030],[1.3,600,1010]);kitchen(t,{stove:false});
 const o=lnP({x:420,lh:[330,1165],rh:[598,1090],look:[1,0.4],mouth:'flat',brow:0});person(o,t);
 billSheet(690,960,0.95,0.05,{rows,hl:hk>=0?Math.floor(hk):null,hk:hk>=0?1:0});hands(o);counterFront();g.restore();
 labelTag('MIRA TU FACTURA',540,640,M.fac?E(t,M.fac-0.2,0.4):E(t,s+0.3,0.4),C.amber);};
// precio único: de día o de noche, cuesta lo mismo
ILL.ln_unico=(c,t)=>{const s=c._s,M=c._m;const tr=M.tre||s+3;const ph=(t-s)/2.6;const day=t<tr?0.5+0.5*Math.sin(ph*Math.PI*2):0;
 const mi=M.mis?E(t,M.mis-0.2,0.4):0,ce=M.cen?E(t,M.cen-0.2,0.4):0,tk=E(t,tr-0.2,0.4);
 g.save();cam(1.15,600,1110);
 const o=lnP({lh:[420,1165],rh:[610,1165],look:[0.7,0.6],mouth:ce>0.5?'flat':'smile'});
 lnScene(t,o,{prog:'ECO',spin:0.6,p:0.3,water:0.35},{day,night:(1-day)*0.3});
 const [wx,wy]=scr(LN_WM[0]+110,LN_WM[1]-40);g.restore();
 dayDial(840,700,120,'flat',t,{col:C.blue,hand:t<tr?((t-s)*24/2.6)%24:3,p:E(t,s+0.1,0.8)});
 labelTag('MISMO PRECIO A TODAS HORAS',420,660,mi,C.blue);
 coin(wx,wy-20-Math.sin(((t-s)%1.3)/1.3*Math.PI)*30,1.4,t*4);
 labelTag('🌙 03:00',420,760,tk,C.blue);
 labelTag('AHORRO: 0 €',wx,wy-110,ce,C.red);};
// tres periodos: reloj de 24 h por colores + fin de semana y festivos
ILL.ln_tramos=(c,t)=>{const s=c._s,M=c._m;ILL.salon_fondo(c,t);
 const dp=E(t,s+0.1,1.2),va=M.val?E(t,M.val-0.2,0.4):0;const d0=M.doc||s+2,d1=M.och||s+3;const hand=t<d0?null:lerp(0,8,ease(E(t,d0,Math.max(0.4,d1-d0))));
 const sa=M.sab?E(t,M.sab-0.3,0.8):0,fe=M.fes?E(t,M.fes-0.2,0.4):0,en=M.ent?E(t,M.ent-0.2,0.4):0;
 const fin=sa>0.3;
 dayDial(540,850,220,fin?'finde':'tramos',t,{p:dp,hand,hl:[0,8],hk:va*0.8*(1-sa)});
 [['PUNTA',PER.punta,250],['LLANO',PER.llano,540],['VALLE',PER.valle,830]].forEach(([l,col,x],i)=>{const k=E(t,s+0.8+i*0.2,0.4);labelTag(l,x,1120,k*(fin?0.5:1),col===PER.punta?C.red:(col===PER.llano?C.amber:C.green));});
 if(va>0&&!fin)labelTag('🌙 DE 0 A 8 H',540,580,va,C.green);
 weekStrip(130,1270,820,sa,M.ent?ease(E(t,M.sab,1)):sa);
 labelTag('🎉 + FESTIVOS NACIONALES',540,1390,fe,C.green);
 if(en>0)labelTag('VALLE TODO EL DÍA',540,580,en,C.green);};
// PVPC: el precio cambia cada hora (lo mira en el móvil)
ILL.ln_pvpc=(c,t)=>{const s=c._s,M=c._m;const ca=M.cam?E(t,M.cam-0.2,0.6):0;const vv=LN_PV.map((v,i)=>cl(v+0.06*Math.sin(t*2+i)*ca));
 g.save();camLerp(t,s,4,[1.15,580,1050],[1.25,600,1030]);
 const o=lnP({x:440,lh:[560,1020],rh:[610,1165],look:[1,0.5],mouth:ca>0.5?'o':'flat',brow:ca>0.5?1:0});
 lnScene(t,o,{prog:'——',spin:0,p:0,water:0},{day:0.6,held:(o)=>pricePhone(o.lh[0]+20,o.lh[1]-80,0.9,0.12,vv,E(t,s+0.3,1.2))});
 g.restore();
 if(ca>0){g.save();g.globalAlpha=ca;g.fillStyle='rgba(20,29,48,0.92)';rr(110,520,860,330,30);g.fill();g.restore();hourChart(160,790,760,220,vv,ca,{});txt('PRECIO DE LA LUZ, HORA A HORA',540,560,30,'#c9d1e0',800,'center',ca);}
 labelTag('TARIFA REGULADA · PVPC',540,M.cam?1450:640,M.reg?E(t,M.reg-0.2,0.4):0,C.purple);};
// sorpresa: en octubre (laborables), la madrugada costó más del doble que de 14 a 16 h
ILL.ln_sorpresa=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);
 const gp=E(t,s+0.1,1.2),ma=M.mad?E(t,M.mad-0.2,0.4):0,ta=M.dos?E(t,M.dos-0.2,0.4):0,db=M.dob?E(t,M.dob-0.1,0.4):0;
 g.fillStyle='rgba(20,29,48,0.92)';rr(70,560,940,820,36);g.fill();
 txt('LABORABLES · 1–14 OCTUBRE 2026',540,615,32,'#c9d1e0',900);
 const hl=[];if(ma>0)hl.push([0,8,mixc('#8e98ad','#e5484d',ma)]);if(ta>0)hl.push([14,16,mixc('#8e98ad','#3ecf6e',ta)]);
 const X=hourChart(120,1250,840,520,LN_PV,gp,{col:'#5c667a',hl,dim:0});
 if(ma>0){emoji('🌙',X(3.5),700,64,ma);labelTag('MADRUGADA',X(3.5),1320,ma,C.red);}
 if(ta>0){emoji('☀️',X(14.5),700,64,ta);labelTag('14–16 H',X(14.5),1320,ta,C.green);}
 if(db>0){const y1=1250-0.78*520,y2=1250-0.34*520;g.save();g.globalAlpha=db;g.strokeStyle=C.amber;g.lineWidth=5;g.setLineDash([12,10]);g.beginPath();g.moveTo(X(7.5),y1);g.lineTo(X(15),y1);g.moveTo(X(15),y1);g.lineTo(X(15),y2);g.stroke();g.restore();labelTag('MÁS DEL DOBLE',X(15)+10,(y1+y2)/2-120,db,C.amber);}
 txt('Esquema del precio PVPC por horas · datos: Selectra con Red Eléctrica (e·sios)',540,1420,24,'#c9d1e0',700,'center',gp,960);};
// el motivo: la energía solar hunde el precio a mediodía
ILL.ln_solar=(c,t)=>{const s=c._s,M=c._m;const so=M.sol||s+1;const sk=ease(E(t,so-0.6,2));
 skyBand(0,470,W,1150,sk);
 const a=Math.PI*(1-0.5*sk);const sx=540+Math.cos(a)*420,sy=1300-Math.sin(a)*480;sunDisk(sx,sy,60,t,cl(sk*2));
 if(sk<0.6){g.save();g.globalAlpha=1-sk/0.6;moonI(840,640,40);g.restore();}
 solarRoof(380,1500,320,t,sk);
 const pr=M.pro?E(t,M.pro-0.2,0.5):0,hu=M.hun?ease(E(t,M.hun-0.2,1)):0;
 const val=lerp(0.9,0.3,hu);g.fillStyle='rgba(20,29,48,0.85)';rr(740,960,200,520,30);g.fill();txt('PRECIO',840,1000,28,'#c9d1e0',900);
 g.fillStyle='#2a3550';rr(800,1040,80,400,20);g.fill();g.fillStyle=priceCol(val);rr(800,1440-400*val,80,400*val,20);g.fill();
 labelTag('☀️ MÁS PRODUCCIÓN SOLAR',540,620,pr,C.amber);labelTag('📉 EL PRECIO SE HUNDE',540,720,hu>0?E(t,M.hun-0.2,0.4):0,C.green);};
// coste de un lavado en eco: madrugada vs 13–17 h
ILL.ln_coste=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);
 const k1=M.onc?E(t,M.onc-0.3,0.4):0,k2=M.sei?E(t,M.sei-0.3,0.4):0,mi=M.mit?E(t,M.mit-0.2,0.4):0;
 [[270,0,k1,11,'≈ 11 CÉNT.','🌙 MADRUGADA',C.red,M.onc],[810,1,k2,6,'≈ 6 CÉNT.','☀️ 13–17 H',C.green,M.sei]].forEach(([x,d,k,n,lab,tit,col,t0])=>{
  g.save();g.globalAlpha=E(t,s+0.1+d*0.3,0.4);g.translate(x,0);
  skyBand(-200,560,400,300,d);g.save();g.beginPath();g.rect(-200,560,400,300);g.clip();if(d)sunDisk(110,640,40,t,1);else moonI(110,640,34);g.restore();
  g.fillStyle='rgba(20,29,48,0.4)';g.fillRect(-200,860,400,580);g.translate(-110,930);washer(0,0,t,{prog:'ECO',spin:0.6,p:0.4,water:0.35});g.restore();
  txt(tit,x,1300,34,'#fff',900,'center',E(t,s+0.1+d*0.3,0.4));
  for(let i=0;i<n;i++){const q=t0?E(t,t0-0.3+i*0.06,0.35):0;if(q<=0)continue;coin(x,lerp(560,840-i*14,ease(q)),0.75,0.2);}
  labelTag(lab,x,1380,k,col);});
 if(mi>0){labelTag('CASI LA MITAD',540,1480,mi,C.amber);}
 txt('Lavadora 8 kg, programa eco · laborables 1–14 oct 2026 · Selectra',540,1550,26,'#c9d1e0',700,'center',E(t,s+0.5,0.4),960);};
// qué hacer: mirar el contrato, mirar los precios de mañana y programar la lavadora
ILL.ln_consejos=(c,t)=>{const s=c._s,M=c._m;const pr=M.pro?ease(E(t,M.pro-0.3,0.5)):0;
 const k1=M.con?E(t,M.con-0.2,0.4):0,k2=M.per?E(t,M.per-0.2,0.4):0,k3=M.pv?E(t,M.pv-0.2,0.4):0;
 g.save();cam(1.15,600,1100);
 const o=lnP({x:460,reach:pr>0.02,rh:[lerp(610,LN_BTN[0],pr),lerp(1165,LN_BTN[1],pr)],lh:[k3>0?560:420,k3>0?1030:1165],look:pr>0.5?[0.8,0.9]:[1,0.4],mouth:'smile'});
 lnScene(t,o,{prog:pr>0.5?'DIFERIDO':'——',spin:0,p:0,water:0},{day:0.6,held:k3>0?(o)=>pricePhone(o.lh[0]+20,o.lh[1]-80,0.9,0.12,LN_PV,k3):null});
 g.restore();
 labelTag('① MIRA TU CONTRATO',540,600,k1,C.amber);labelTag('② PERIODOS: NOCHE O FINDE',540,680,k2,C.green);labelTag('③ PVPC: MIRA LOS PRECIOS DE MAÑANA',540,760,k3,C.purple);
 if(pr>0.5)labelTag('⏲ PROGRAMA LA HORA',780,1460,E(t,M.pro,0.4),C.blue);};
