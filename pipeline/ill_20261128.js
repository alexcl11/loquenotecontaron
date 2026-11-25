// ===== Escenas: el pollo/pavo no está hecho «cuando el jugo sale transparente» (2026-11-28) · kit en ill36.js (usa roastTray de ill29.js, chicken/germ de ill.js, qMarks de ill14.js, xBadge de ill26.js, checkmarkMini de ill_20261117.js, ovenBody/ovenDoor/wallClock de ill5.js) =====
function pjP(o){return Object.assign({x:470,y:1200,shirt:'#3d7bff'},o);}
const PJ_TR=[770,1178];              // bandeja con el asado sobre la encimera
const PJ_CH=[760,1081];              // centro del pollo (roastTray s=1.05)
const PJ_THIGH=[828,1098],PJ_BREAST=[738,1052];
ILL.pj_fondo=(c,t)=>{ILL.cocina_fondo(c,t);};
// gancho: pincha el pollo con el tenedor, sale jugo claro «¡ya está!»… y dentro siguen las bacterias
ILL.pj_gancho=(c,t)=>{const s=c._s,M=c._m;const pin=M.pin||s+1;const pk=ease(E(t,pin-0.5,0.5));const cla=M.cla?E(t,M.cla-0.2,0.4):0;const fal=M.fal?E(t,M.fal-0.2,0.5):0;const it=M.int?E(t,M.int-0.3,0.5):0;
 g.save();camLerp(t,s,4,[1.18,600,1000],[1.3,660,1010]);kitchen(t);
 const tip=[lerp(800,PJ_THIGH[0]-6,pk),lerp(980,PJ_THIGH[1]-14,pk)];const rot=0.42;const grip=[tip[0]-Math.cos(rot)*150,tip[1]-Math.sin(rot)*150];
 const o=pjP({rh:grip,lh:[400,1150],look:fal>0.5?[0,0.1]:[0.8,0.4],mouth:fal>0.5?'worry':(cla>0.3?'smile':'flat'),brow:fal>0.5?1:0});
 person(o,t);roastTray(PJ_TR[0],PJ_TR[1],1.05,t,{steam:0.8});counterFront();
 if(t>pin){for(let k=0;k<2;k++){const ph=((t-pin)*0.8+k*0.5)%1;juiceDrop(PJ_THIGH[0]+4,PJ_THIGH[1]-4,ph,true,1,60);}}
 carvingFork(grip[0],grip[1],rot,1);hands(o);
 if(fal>0){const SP=[[-40,-10],[20,-24],[60,6],[-10,18],[30,30],[-60,14]];SP.forEach((d,i)=>germ(PJ_CH[0]+d[0],PJ_CH[1]+d[1],13,t,i,ease(E(t,M.fal-0.2+i*0.12,0.3)),cl(1-E(t,M.fal+i*0.12,0.3))*0.4));}
 g.restore();
 labelTag('«JUGO TRANSPARENTE: ¡YA ESTÁ!»',540,660,cla*(1-fal),C.amber);
 labelTag('ESE TRUCO FALLA',540,660,fal*(1-it*0.0),C.red);};
// pregunta temprana: enseña el pollo con el tenedor, se encoge de hombros
ILL.pj_pregunta=(c,t)=>{const s=c._s,M=c._m;const sh=M.q?ease(E(t,M.q-0.2,0.5)):0;const pt=ease(E(t,s+0.1,0.6));
 g.save();cam(1.38,640,1000);kitchen(t);
 const tip=[lerp(790,800,pt),lerp(960,1000,pt)];const rot=0.42;const grip=[tip[0]-Math.cos(rot)*150,tip[1]-Math.sin(rot)*150];
 const o=pjP({rh:grip,lh:[lerp(400,380,sh),lerp(1150,1000,sh)],look:[0,0.1],mouth:'smile',brow:sh>0.5?1:0});
 person(o,t);roastTray(PJ_TR[0],PJ_TR[1],1.05,t,{steam:0.8});counterFront();
 {const ph=(t*0.8)%1;juiceDrop(PJ_THIGH[0]+4,PJ_THIGH[1]-4,ph,true,1,60);}
 carvingFork(grip[0],grip[1],rot,1);hands(o);g.restore();
 qMarks(560,780,t,sh);};
// fuente: el color del jugo no es fiable (gota tachada) → lo seguro: termómetro a 74 °C por dentro
ILL.pj_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const sg=M.seg||s+4;const st2=E(t,sg-0.25,0.5);
 const a1=ease(E(t,s+0.1,0.5))*(1-st2);const co=M.col?E(t,M.col-0.1,0.5):0;const px=M.pre?E(t,M.pre-0.2,0.5):0;
 if(a1>0){g.save();g.globalAlpha=a1;g.translate(540,1040);const k=lerp(0.7,1,ease(E(t,s+0.1,0.5)));g.scale(k,k);bigDrop(-40,0,2.1,true);g.restore();
  g.save();g.globalAlpha=a1;xBadge(620,950,px,52);g.restore();
  g.save();g.globalAlpha=a1;labelTag('COLOR DEL JUGO',540,1230,co,C.amber);g.restore();
  g.save();g.globalAlpha=a1;labelTag('✕ NO ES PRECISO',540,1230,px,C.red);g.restore();}
 if(st2>0){const ap=ease(st2);const v=M.set?lerp(20,74,ease(E(t,M.set-0.3,1.0))):20;
  g.save();g.globalAlpha=ap;chicken(540,1225,1.15,0,1,t);probeThermo(565,1198,-0.18,v,{s:1.05,ins:0.25,t});g.restore();}};
// mecanismo: pollo en corte — fuera jugo claro, dentro lo más gordo aún no ha llegado
ILL.pj_corte=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const ap=ease(E(t,s,0.5));const cla=M.cla?E(t,M.cla-0.2,0.5):0;const go=M.gor?E(t,M.gor-0.2,0.6):0;const tm=M.tem?E(t,M.tem-0.2,0.5):0;
 g.save();g.globalAlpha=ap;const sc=lerp(0.85,1,ap);g.translate(540,1060);g.scale(sc,sc);const R=chickenCut(0,0,760,go,{t,pulse:tm>0});g.restore();
 if(cla>0){for(let k=0;k<3;k++){const ph=((t-M.cla)*0.7+k/3)%1;if(t>M.cla-0.2)juiceDrop(540+(k-1)*200,1060-228+40,ph,true,1.2,300);}}
 if(go>0){const SP=[[-90,-30],[-20,-50],[50,-10],[-60,30],[10,25],[80,30],[-120,5]];SP.forEach((d,i)=>germ(540+R.c[0]*0+(-61)+d[0],1060+27+d[1],17,t,i,ease(E(t,M.gor+0.2+i*0.12,0.3)),cl(1-E(t,M.gor+0.2+i*0.12,0.3))*0.4));}
 labelTag('FUERA: JUGO CLARO',540,700,cla,C.amber);
 labelTag('DENTRO: AÚN NO HA LLEGADO',540,1430,Math.max(go>0?E(t,M.gor,0.4):0,tm),C.red);};
// qué hacer: termómetro de cocina en lo más gordo del muslo y de la pechuga, sin tocar el hueso
function pjProbeStep(t,M,s){// devuelve {tip,v,ins}
 const mu=M.mus||s+1.5,pe=M.pec||s+3;const a=ease(E(t,mu-0.6,0.6));const b=ease(E(t,pe-0.6,0.6));
 const hover=[PJ_THIGH[0]-10,PJ_THIGH[1]-120];
 let tip,ins=0,v='--';
 if(t<pe-0.6){tip=[lerp(hover[0],PJ_THIGH[0],a),lerp(hover[1],PJ_THIGH[1],a)];ins=0.32*a;if(a>=1)v=lerp(20,74,ease(E(t,mu,1.0)));}
 else{const up=Math.sin(b*Math.PI)*60;tip=[lerp(PJ_THIGH[0],PJ_BREAST[0],b),lerp(PJ_THIGH[1],PJ_BREAST[1],b)-up];ins=b<1?0.32*(1-Math.sin(b*Math.PI)):0.32;v=b>=1?lerp(20,74,ease(E(t,pe,1.0))):74;}
 return {tip,ins,v};}
ILL.pj_termo=(c,t)=>{const s=c._s,M=c._m;const te=M.ter?E(t,M.ter-0.3,0.5):0;const P=pjProbeStep(t,M,s);const rot=-0.4;
 g.save();camLerp(t,s,5,[1.35,690,1010],[1.45,720,1020]);kitchen(t);
 const by=[P.tip[0]+Math.sin(rot)*(-230)*1,P.tip[1]-Math.cos(rot)*230];
 const o=pjP({rh:[lerp(620,by[0],te),lerp(1150,by[1],te)],lh:[400,1150],look:[0.8,0.3],mouth:'smile'});
 person(o,t);roastTray(PJ_TR[0],PJ_TR[1],1.05,t,{steam:0.6});counterFront();
 if(te>0)probeThermo(lerp(640,P.tip[0],te),lerp(1260,P.tip[1],te),rot,P.v,{ins:P.ins,t});hands(o);g.restore();
 labelTag('🌡️ TERMÓMETRO DE COCINA',540,660,te*(M.mus?1-E(t,M.mus,0.3):1),C.blue);
 labelTag('✓ LO MÁS GORDO: MUSLO',540,660,M.mus?E(t,M.mus,0.4)*(M.pec?1-E(t,M.pec,0.3):1):0,C.green);
 labelTag('✓ Y PECHUGA',540,660,M.pec?E(t,M.pec,0.4):0,C.green);
 labelTag('✕ SIN TOCAR EL HUESO',540,1440,M.hue?E(t,M.hue-0.1,0.4):0,C.red);};
// si no llega: al horno unos minutos más (reloj) y volver a medir → 74 °C ✓
ILL.pj_horno=(c,t)=>{const s=c._s,M=c._m;const md=M.med||s+3;const stg=t<md-0.3?1:2;
 g.save();
 if(stg===1){const mi=M.min?E(t,M.min-0.3,0.5):0;camLerp(t,s,Math.max(1,md-s),[1.15,700,1000],[1.22,720,1000]);kitchen(t);
  const o=pjP({x:500,rh:[700,lerp(1150,1100,mi)],lh:[430,1150],look:[0.9,0],mouth:'smile'});person(o,t);
  ovenBody(t,{heat:0.8,glow:0.6,light:0.6,food:(fx,fy)=>{chicken(fx,fy-40,0.72,0,0.95,t);}});counterFront();ovenDoor(t,{},0,0.6);hands(o);
  wallClock(600,690,56,t,mi>0?(t-M.min+0.3)*2.5:0);g.restore();
  labelTag('🔥 UNOS MINUTOS MÁS',540,1440,mi,C.amber);}
 else{camLerp(t,md-0.3,2.5,[1.35,690,1010],[1.4,700,1010]);kitchen(t);const rot=-0.4;const tip=PJ_THIGH;const by=[tip[0]+Math.sin(rot)*(-230),tip[1]-Math.cos(rot)*230];
  const o=pjP({rh:by,lh:[400,1150],look:[0.8,0.3],mouth:'smile'});person(o,t);roastTray(PJ_TR[0],PJ_TR[1],1.05,t,{steam:0.8});counterFront();
  const v=lerp(40,74,ease(E(t,md,0.9)));probeThermo(tip[0],tip[1],rot,v,{ins:0.32,t});hands(o);g.restore();
  labelTag('✓ VUELVE A MEDIR',540,1440,E(t,md,0.4),C.green);}};
