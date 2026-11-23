// ===== Escenas: ventanas empañadas por la mañana (2026-11-26) · kit en ill34.js (usa bedroom/duvet/zzz/radiator de ill6.js, winTwo/fogGlass/cornerMold/wallChill de ill13.js, vaporTo de ill26.js, bathroom de ill4.js, cloth de ill4.js, qMarks de ill14.js, scr de ill_20261029.js, checkmarkMini de ill_20261117.js) =====
const VE_W=[102,612,226,266]; // cristal de la ventana del dormitorio (bedroom())
const VE_RAD=[96,1112,176,136];
function veP(o){return Object.assign({x:590,y:1268,apron:false,shirt:'#3ecf6e'},o);}
// dormitorio de mañana de invierno (aún de noche fuera): ventana de dos hojas con vaho; o.fog 0–1, o.wipe = x del paño (seca lo de la derecha), o.open, o.mold, o.sill
function veRoom(t,o={}){bedroom(t,{lamp:o.lamp??1,blind:0});radiator(...VE_RAD,o.heat??0.5,t);
 winTwo(VE_W[0],VE_W[1],VE_W[2],VE_W[3],t,{open:o.open||0,snow:0.5});
 if(!(o.open>0.05))fogWiped(VE_W[0],VE_W[1],VE_W[2],VE_W[3],o.fog??1,t,o.wipe);
 sillWater(VE_W[0],VE_W[1]+VE_W[3]+12,VE_W[2],o.sill??0,t);
 const m=o.mold||0;if(m>0){cornerMold(VE_W[0]+VE_W[2]+18,VE_W[1]-8,m,t);cornerMold(VE_W[0]+VE_W[2]+14,VE_W[1]+VE_W[3]-40,m*0.85,t);cornerMold(VE_W[0]-80,VE_W[1]+VE_W[3]-30,m*0.7,t);}
 const m2=o.mold2||0;if(m2>0){cornerMold(VE_W[0]+VE_W[2]+110,VE_W[1]-60,m2,t);cornerMold(-20,VE_W[1]+40,m2*0.9,t);cornerMold(VE_W[0]+40,VE_W[1]-90,m2*0.8,t);}}
function veHands(o){o._hands.forEach(h=>{if(h[1]<1140){g.fillStyle=IL.skin;g.beginPath();g.arc(h[0],h[1],23,0,7);g.fill();}});}
function veDark(a){if(a>0){g.fillStyle=`rgba(4,6,14,${a})`;g.fillRect(-600,300,2300,1500);}}
// fondo atenuado
ILL.ve_fondo=(c,t)=>{g.save();cam(1,540,1050);veRoom(t,{fog:1,sill:0.6});const o=veP({lh:[470,1300],rh:[710,1300],look:[-0.6,0],mouth:'flat'});person(o,t);duvet(t,'#8b7cf6');g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);};
// gancho: se despierta, ve los cristales chorreando y se encoge de hombros («es normal»)… y aparece el moho
ILL.ve_gancho=(c,t)=>{const s=c._s,M=c._m;const st=ease(E(t,s,0.7))*(1-ease(E(t,s+0.9,0.5)));const lk=M.cri?E(t,M.cri-0.4,0.4):0;const nr=M.nor?E(t,M.nor-0.3,0.4):0;const mo=M.mo?E(t,M.mo-0.5,1.4):0;
 g.save();camLerp(t,s,4.5,[1.08,500,1000],[1.18,420,960]);veRoom(t,{fog:1,sill:0.4+0.6*lk,mold:mo});
 const sh=nr*(1-mo*0.6);
 const o=veP({lh:[lerp(lerp(470,420,sh),430,st),lerp(lerp(1290,1150,sh),870,st)],rh:[lerp(lerp(710,760,sh),750,st),lerp(lerp(1290,1150,sh),870,st)],look:lk>0.5?[-0.9,-0.3]:[0,0.2],mouth:mo>0.5?'worry':(st>0.3?'o':'smile'),brow:mo>0.5?1:0});
 person(o,t);duvet(t,'#8b7cf6');veHands(o);
 const [wx,wy]=scr(VE_W[0]+VE_W[2]/2,VE_W[1]+VE_W[3]+40);const [mx,my]=scr(VE_W[0]+VE_W[2]+60,VE_W[1]-30);g.restore();
 labelTag('💧 CRISTALES CHORREANDO',Math.max(wx+60,330),Math.min(wy+40,1350),lk*(1-nr),C.blue);
 labelTag('«ES NORMAL»',600,660,nr*(1-mo),C.amber);
 labelTag('⚠ MOHO',Math.max(mx,200),Math.max(my,640),M.mo?E(t,M.mo,0.4):0,C.red);};
// pregunta temprana: señala la ventana empañada y mira a cámara
ILL.ve_pregunta=(c,t)=>{const s=c._s,M=c._m;const pt=ease(E(t,s+0.1,0.5));
 g.save();cam(1.22,440,960);veRoom(t,{fog:1,sill:1});
 const o=veP({lh:[lerp(470,380,pt),lerp(1290,960,pt)],rh:[710,1290],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);duvet(t,'#8b7cf6');veHands(o);g.restore();
 if(M.q)qMarks(640,800,t,E(t,M.q,0.4));};
// fuente + dato: higrómetro con la franja recomendada 30–50 %
ILL.ve_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.ve_fondo(c,t);const ap=ease(E(t,(M.rec||s+1)-0.2,0.5));const hu=M.hum?E(t,M.hum-0.2,0.5):0;
 const bd=M.tre?E(t,M.tre-0.2,1.2):0;const v=lerp(72,42,ease(M.cin?E(t,M.cin-0.6,1.4):0));
 g.save();g.globalAlpha=ap;hygro(540,1040,1.15*lerp(0.8,1,ap),v,{t,band:bd,hl:Math.max(M.cin?E(t,M.cin,0.4):0,hu*(1-bd))});g.restore();
 labelTag('💧 HUMEDAD RELATIVA',540,1440,hu*(1-(M.cin?E(t,M.cin-0.3,0.3):0)),C.blue);};
// mecanismo: de noche, al respirar sale vapor; al tocar el cristal frío, se convierte en gotas
ILL.ve_vapor=(c,t)=>{const s=c._s,M=c._m;const re=M.res?E(t,M.res-0.3,0.6):0;const cr=M.cri?ease(E(t,M.cri-0.5,1.6)):0;const go=M.got?E(t,M.got-0.3,0.6):0;
 g.save();camLerp(t,s,6,[1.06,520,1010],[1.16,420,960]);veRoom(t,{fog:0.15+0.85*cr,sill:go,lamp:0});veDark(0.35);
 if(cr>0)wallChill(VE_W[0]+VE_W[2]/2,VE_W[1]+VE_W[3]/2,cr*0.6*(1-go*0.5),t,260);
 const o=veP({y:1268,lh:[470,1290],rh:[710,1290],look:[0,0.6],mouth:'flat'});person(o,t);duvet(t,'#8b7cf6');zzz(680,940,t,0.9);
 vaporTo(560,620,1060,VE_W[0]+VE_W[2]/2,VE_W[1]+VE_W[3]/2,t,re,14);
 const [wx,wy]=scr(VE_W[0]+VE_W[2]/2,VE_W[1]-20);g.restore();
 labelTag('💨 VAPOR DE AGUA AL RESPIRAR',540,1440,re*(1-cr),C.blue);
 labelTag('❄ CRISTAL FRÍO',Math.max(wx+40,280),Math.max(wy-10,640),cr*(1-go),C.blue);
 labelTag('→ SE CONVIERTE EN GOTAS',540,1440,go,C.blue);};
// si pasa cada día: hongos y moho en el marco y en las paredes (zoom a la ventana)
ILL.ve_moho=(c,t)=>{const s=c._s,M=c._m;const ho=M.hon?E(t,M.hon-0.6,1.6):0;const pa=M.par?E(t,M.par-0.5,1.4):0;const dd=M.dia?E(t,M.dia-0.2,0.5):0;
 g.save();camLerp(t,s,5,[1.35,260,820],[1.55,240,800]);veRoom(t,{fog:1,sill:1,mold:ho,mold2:pa});
 const [mx,my]=scr(VE_W[0]+VE_W[2]+40,VE_W[1]-40);g.restore();
 labelTag('📅 CADA MAÑANA',540,660,dd*(1-ho),C.amber);
 labelTag('⚠ HONGOS Y MOHO',Math.min(Math.max(mx,240),840),Math.max(my,660),ho*(1-pa),C.red);
 labelTag('⚠ EN EL MARCO Y EN LAS PAREDES',540,1440,pa,C.red);};
// qué hacer: secar el cristal con un paño → ventilar en las horas menos frías → no tapar las rejillas (baño)
ILL.ve_solucion=(c,t)=>{const s=c._s,M=c._m;const k2=(M.ven||s+2.5)-0.3,k3=(M.rej||s+5)-0.4;const stg=t<k2?1:(t<k3?2:3);
 g.save();
 if(stg<3){camLerp(t,s,Math.max(1,k3-s),[1.3,330,900],[1.36,320,890]);
  const wp=ease(E(t,(M.pan||s+0.6)-0.5,Math.max(0.8,k2-(M.pan||s+0.6)+0.1)));const op=stg===2?ease(E(t,k2,0.8)):0;
  const hx=lerp(VE_W[0]+VE_W[2]-20,VE_W[0]+30,wp),hy=VE_W[1]+VE_W[3]*0.55+Math.sin(t*9)*22*(stg===1?1:0);
  veRoom(t,{fog:1,wipe:stg===1?hx:VE_W[0],open:op*0.85,sill:stg===1?1-wp*0.8:0.1});
  const o=veP({x:390,y:1150,lh:stg===1?[hx,hy]:[lerp(VE_W[0]+40,300,op),lerp(hy,1080,op)],rh:[560,1160],look:[-0.9,-0.3],mouth:'smile',bend:[1,1]});
  person(o,t);duvet(t,'#8b7cf6');if(stg===1){const h=o._hands[0];cloth(h[0],h[1],'#f2a33a');}hands(o);}
 else{cam(1.25,500,840);bathroom(t);const cv=1-ease(E(t,k3+0.1,0.7));ventGrille(420,640,170,110,t,{cover:cv,flow:cv<0.2?E(t,k3+0.7,0.5):0});
  checkmarkMini(505,830,M.rej?E(t,M.rej+0.5,0.4):0);}
 g.restore();
 labelTag('🧽 SÉCALO CON UN PAÑO',540,1440,stg===1?E(t,(M.pan||s)-0.2,0.4):0,C.green);
 labelTag('🪟 VENTILA EN LAS HORAS MENOS FRÍAS',540,1440,stg===2?E(t,k2,0.4):0,C.green);
 labelTag('✓ NO TAPES LAS REJILLAS',540,1440,stg===3?E(t,k3,0.4):0,C.green);};
