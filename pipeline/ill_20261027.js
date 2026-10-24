// ===== Escenas: lejía (2026-10-27) =====
const LJP={x:470,y:1200,apron:false,shirt:'#3d7bff'};
function ljPerson(o){return Object.assign({},LJP,o);}
// mezcla lejía + amoniaco en el cubo; a la palabra "gas" sale la nube
ILL.lj_mezcla=(c,t)=>{const s=c._s,M=c._m;const gs=M.gas?E(t,M.gas-0.3,1.6):0;const pour=gs<0.5;g.save();camLerp(t,s,4,[1.3,560,1030],[1.45,580,1010]);
 bathroom(t);const sh=Math.sin(t*7)*4;
 const o=ljPerson({lh:pour?[530,985+sh]:[480,1060],rh:pour?[715,990-sh]:[640,1060],look:gs>0.25?[0.3,-0.2]:[0.6,0.8],mouth:gs>0.25?'o':'smile',brow:gs>0.25?1:0});person(o,t);
 const lr=pour?2.2:1.2,rr2=pour?-2.2:-1.2;const mL=cleanBottle(o.lh[0],o.lh[1],0.8,lr,'amoniaco'),mR=cleanBottle(o.rh[0],o.rh[1],0.8,rr2,'lejia');
 if(pour){pourStream(mL[0],mL[1],608,1060,t,'rgba(190,228,255,0.9)');pourStream(mR[0],mR[1],632,1060,t,'rgba(255,240,170,0.9)');}
 hands(o);vanityFront();basin(800);bucket(620,1178,0.9,0.7,'rgba(220,235,170,0.9)');
 gasCloud(620,1040-gs*170,60+gs*230,t,gs);g.restore();};
// el baño se llena de gas: tose, le lloran los ojos
ILL.lj_nube=(c,t)=>{const s=c._s;const k=E(t,s,1.5);g.save();cam(1.7,500,960);bathroom(t);hazeOverlay(0.1+0.1*k);
 const o=ljPerson({lh:[445,935],rh:[610+Math.sin(t*9)*40,860],look:[0,0.3],mouth:'worry',brow:1});person(o,t);
 gasCloud(560,960,260+40*k,t,0.85);hands(o);tears(470,890,t,1);coughFx(420,930,t,1);vanityFront();bucket(620,1178,0.9,0.7,'rgba(220,235,170,0.9)');gasCloud(620,1040,120,t+3,0.8);g.restore();};
// el teléfono del Servicio de Información Toxicológica no para de sonar
ILL.lj_llamadas=(c,t)=>{const s=c._s;g.save();cam(1,540,1050);
 const gr=g.createLinearGradient(0,400,0,1200);gr.addColorStop(0,'#26365a');gr.addColorStop(1,'#1a2742');g.fillStyle=gr;g.fillRect(-600,300,2300,1400);
 g.fillStyle='#5a3f30';g.fillRect(60,860,300,12);['#e5484d','#3d7bff','#f2a33a','#3ecf6e','#8b7cf6'].forEach((cc,i)=>{g.fillStyle=cc;rr(80+i*48,780,38,80,4);g.fill();});
 g.fillStyle='#1b1f2a';rr(700,960,280,180,12);g.fill();g.fillStyle='#2d4a78';rr(712,972,256,156,6);g.fill();g.fillStyle='#4fb3ff';for(let i=0;i<5;i++){g.fillRect(730,990+i*26,120+rnd(i)*90,10);}g.fillStyle='#1b1f2a';g.fillRect(830,1140,20,40);
 const o=ljPerson({x:450,y:1215,shirt:'#3ecf6e',lh:[390,1150],rh:[560,1060],look:[0.4,0.3],mouth:'flat'});person(o,t);headset(o);hands(o);
 g.fillStyle='#6b4a38';g.fillRect(-600,1180,2300,24);g.fillStyle='#5a3f30';g.fillRect(-600,1204,2300,500);
 g.restore();
 // avisos de llamada que aparecen cada vez más deprisa
 for(let i=0;i<60;i++){const t0=s+0.2+Math.sqrt(i)*1.2;if(t0>t)break;const p=E(t,t0,1.4);if(p>=1)continue;
  let x=140+rnd(i)*800,y=840+rnd(i+40)*360;if(Math.abs(x-450)<150&&y<1040)x+=330;g.save();g.globalAlpha=Math.min(1,(1-p)*2.5);const sc=eob(cl(p*4));g.translate(x,y);g.scale(sc,sc);g.fillStyle='#fff';rr(-48,-34,96,68,20);g.fill();emoji('📞',0,0,40);g.restore();}};
// una de cada cuatro casas: la ventana se llena de gas
ILL.lj_casas=(c,t)=>{const M=c._m;const gr=g.createLinearGradient(0,470,0,1600);gr.addColorStop(0,'#0b1430');gr.addColorStop(1,'#1d2d5a');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 for(let i=0;i<24;i++){g.fillStyle=`rgba(255,255,255,${0.3+0.3*Math.sin(t*2+i)})`;g.beginPath();g.arc(rnd(i)*W,520+rnd(i+30)*300,2.2,0,7);g.fill();}moonI(900,600,36);
 g.fillStyle='#141d30';g.fillRect(0,1250,W,400);
 const gs=M.m?E(t,M.m-0.2,0.9):0;[195,425,655,885].forEach((x,i)=>houseFront(x,1250,190,t,i===2?gs:0,1));
 labelTag('MÁS DE 1 DE CADA 4',540,700,M.m?E(t,M.m,0.4):0,C.red);};
// con qué se mezcló la lejía
ILL.lj_botellas=(c,t)=>{const M=c._m;g.save();cam(1,540,1050);bathroom(t);vanityFront();g.restore();g.fillStyle='rgba(6,10,20,0.35)';g.fillRect(0,470,W,1150);
 const it=[['amoniaco',250,'53,6 %',M.a,C.red],['salfuman',540,'11,2 %',M.s,C.amber],['vinagre',830,'3,5 %',M.v,C.amber]];
 it.forEach(([k,x,pct,tm,col])=>{const p=tm?E(t,tm,0.4):0;const sc=1.7*(1+0.12*eob(p)*(1-cl((t-tm-0.6)/0.4)));g.save();g.globalAlpha=0.35+0.65*cl(p*2);cleanBottle(x,1178-70*sc,sc,0,k);g.restore();
  if(p>0){txt(pct,x,1300,64,'#fff',900,'center',cl(p*3));}});
 labelTag('¿CON QUÉ SE MEZCLÓ LA LEJÍA?',540,760,1,C.amber);};
// cloramina: el gas sube a la cara y se vuelve ácido en nariz, garganta y ojos
ILL.lj_cloramina=(c,t)=>{const s=c._s,M=c._m;const nz=M.n?E(t,M.n,0.6):0;const ac=M.a?E(t,M.a,0.5):0;g.save();cam(2.0,480,960);bathroom(t);hazeOverlay(0.08);
 const o=ljPerson({lh:[400,1150],rh:[560,1150],look:[0.5,0.6],mouth:nz>0.3?'worry':'flat',brow:nz>0.3?1:0});person(o,t);
 if(ac>0){const rg=g.createRadialGradient(470,900,5,470,900,80);rg.addColorStop(0,`rgba(229,72,77,${0.45*ac})`);rg.addColorStop(1,'rgba(229,72,77,0)');g.fillStyle=rg;g.beginPath();g.arc(470,900,80,0,7);g.fill();
  for(let i=0;i<8;i++){const ph=(t*2+rnd(i))%1;const a=rnd(i+5)*Math.PI*2;g.fillStyle=`rgba(255,120,110,${(1-ph)*ac})`;g.beginPath();g.arc(470+Math.cos(a)*(30+ph*50),905+Math.sin(a)*(30+ph*50),4,0,7);g.fill();}}
 for(let i=0;i<5;i++){const ph=(t*0.45+i/5)%1;gasCloud(lerp(620,485,ph),lerp(1070,905,ph),30+ph*45,t+i,Math.sin(ph*Math.PI)*0.9);}
 tears(470,890,t,nz);hands(o);vanityFront();bucket(620,1178,0.9,0.7,'rgba(220,235,170,0.9)');g.restore();
 labelTag('SE CONVIERTE EN ÁCIDO CLORHÍDRICO',540,1330,ac,C.red);};
// salfumán y vinagre en el cubo con lejía: gas cloro
ILL.lj_cloro=(c,t)=>{const s=c._s,M=c._m;const ps=M.s&&t>M.s-0.3,pv=M.v&&t>M.v-0.3;const gs=M.c?E(t,M.c-0.2,1.4):0;g.save();cam(1.4,570,1010);bathroom(t);
 const o=ljPerson({lh:pv?[530,985]:[420,1160],rh:ps?[715,990]:[650,1160],look:gs>0.25?[0.3,-0.2]:[0.6,0.8],mouth:gs>0.25?'o':'flat',brow:gs>0.25?1:0});person(o,t);
 if(ps){const m=cleanBottle(715,990,0.8,-2.2,'salfuman');if(gs<0.6)pourStream(m[0],m[1],632,1060,t,'rgba(255,200,200,0.85)');}
 if(pv){const m=cleanBottle(530,985,0.8,2.2,'vinagre');if(gs<0.6)pourStream(m[0],m[1],608,1060,t,'rgba(236,226,190,0.9)');}
 hands(o);vanityFront();cleanBottle(860,1178-70*0.85,0.85,0,'lejia');bucket(620,1178,0.9,0.7,'rgba(255,240,170,0.9)');
 gasCloud(620,1040-gs*170,60+gs*240,t,gs,'226,232,106');g.restore();};
// limpiar solo con lejía diluida: brilla
ILL.lj_sola=(c,t)=>{const s=c._s,M=c._m;const ok=M.sola?E(t,M.sola,0.5):0;g.save();cam(1.35,560,1040);bathroom(t);
 const wx=620+Math.sin(t*5)*80;const o=ljPerson({lh:[400,1160],rh:[wx,1160],look:[0.5,0.9],mouth:'smile'});person(o,t);cloth(wx,1170);hands(o);vanityFront();
 cleanBottle(260,1178-70*0.85,0.85,0,'lejia');bucket(860,1178,0.85,0.75,'rgba(190,225,255,0.85)');
 for(let i=0;i<7;i++){const ph=(t*0.9+rnd(i))%1;sparkle(440+rnd(i+2)*360,1150+rnd(i+7)*24,10+12*Math.sin(ph*Math.PI),Math.sin(ph*Math.PI)*(0.4+0.6*ok));}
 if(ok>0)check(260,960,40,ok);g.restore();};
// la receta segura
ILL.lj_receta=(c,t)=>{const s=c._s,M=c._m;const hv=M.vaso&&t>M.vaso-0.3;const pe=M.ech?E(t,M.ech-0.2,0.6):0;const fill=1-(M.ech?E(t,M.ech+0.3,1.6):0);
 g.save();cam(1.25,560,960);bathroom(t,{open:M.ven?E(t,M.ven-0.2,0.8):0});
 const o=ljPerson({lh:[420,1160],rh:hv?[lerp(750,705,pe),lerp(960,945,pe)]:[650,1160],look:[0.6,0.8],mouth:'smile'});person(o,t);
 if(hv){const rot=lerp(0,-1.6,ease(pe));glassCup(o.rh[0],o.rh[1]+40,0.8,rot,fill);if(pe>0.6&&fill>0.05)pourStream(o.rh[0]+Math.sin(rot)*80,o.rh[1]+40-Math.cos(rot)*80,640,1068,t,'rgba(255,236,150,0.9)');}
 hands(o);vanityFront();bucket(640,1178,0.9,0.8,'rgba(170,215,255,0.88)');cleanBottle(880,1178-70*0.8,0.8,0,'lejia');
 const nd=M.nada?E(t,M.nada,0.6):0;g.save();g.globalAlpha=0.35+0.65*cl(nd*3);cleanBottle(250,1178-70*0.8,0.8,0,'amoniaco');g.restore();if(nd>0)xMark(250,1100,60,nd);
 g.restore();
 labelTag('1 · UN VASO EN 10 L DE AGUA',540,590,M.vaso?E(t,M.vaso,0.4):0,C.green);labelTag('2 · LEJÍA SOBRE EL AGUA, NO AL REVÉS',540,660,M.ech?E(t,M.ech,0.4):0,C.green);
 labelTag('3 · VENTILA',540,730,M.ven?E(t,M.ven,0.4):0,C.green);labelTag('4 · NUNCA LA MEZCLES',540,800,M.nada?E(t,M.nada,0.4):0,C.red);};
// si respiras el gas: aire y teléfono
ILL.lj_ventana=(c,t)=>{const s=c._s,M=c._m;const op=M.aire?E(t,M.aire-0.3,0.8):0;const tl=M.tel?E(t,M.tel-0.2,0.6):0;g.save();cam(1.4,420,950);bathroom(t,{open:op});hazeOverlay(0.14*(1-op));
 const o=ljPerson({x:500,lh:[430,1160],rh:tl>0?[lerp(640,590,ease(tl)),lerp(1160,900,ease(tl))]:[640,1160],look:[-0.8,-0.1],mouth:op>0.5&&tl<0.5?'o':(tl>0.5?'flat':'worry')});person(o,t);
 if(tl>0.3)smartphone(o.rh[0]+4,o.rh[1]-10,0.75,0.25,tl>0.9?1:0,t);hands(o);vanityFront();g.restore();};
