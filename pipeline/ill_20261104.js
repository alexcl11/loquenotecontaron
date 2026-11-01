// ===== Escenas: cerrar las apps no ahorra batería (2026-11-04) · kit en ill12.js =====
function apP(o){return Object.assign({x:330,y:1262,apron:false,shirt:'#2fa58f'},o);}
// cascos sencillos sobre person (después de person)
function earphones(o,t){const s=o.s||1,x=o.x,hy=o.y-310*s+Math.sin(t*2.2)*3*s;g.save();g.strokeStyle='#2b2f3a';g.lineWidth=12*s;g.lineCap='round';g.beginPath();g.arc(x,hy-4*s,76*s,Math.PI*1.08,Math.PI*1.92);g.stroke();
 g.fillStyle='#8b7cf6';[-1,1].forEach(sd=>{rr(x+sd*72*s-14*s,hy-18*s,28*s,46*s,12*s);g.fill();});g.restore();}
// pantalla de inicio con iconos
function homeGrid(a=1){const ks=['chat','photo','music','map','mail','video','weather','game','chat','music','photo','mail'];ks.forEach((k,i)=>{appIcon(-75+(i%3)*75,-150+Math.floor(i/3)*88,52,k,a);});}
// pulsos de una flick del pulgar: devuelve 0–1 (sube) durante cada instante de rm
function flickUp(t,rm){let u=0;rm.forEach(r=>{if(r==null)return;const q=E(t,r-0.15,0.45);if(q>0&&q<1)u=Math.max(u,Math.sin(q*Math.PI));});return u;}
// sofá con el personaje y el móvil en la mano
function apSofa(t,o,ph){person(o,t);if(o._ear)earphones(o,t);mobile(o.x,1100,0.5,0,Object.assign({lvl:0.4,t},ph||{}));hands(o);sofa(...SOFA);}

// gancho: en el sofá, cerrando apps una tras otra
ILL.ap_gancho=(c,t)=>{const s=c._s,M=c._m;const c0=M.cie||s+0.3;const rm=[c0+2.3,c0+1.75,c0+1.2,c0+0.65,c0+0.1];
 g.save();camLerp(t,s,4,[1.15,520,1040],[1.25,470,1050]);salon(t,{lamp:0.7});salonDevices(t);
 const u=flickUp(t,rm);const no=M.no?E(t,M.no,0.4):0;
 const o=apP({bend:[1,-1],rh:[372,1128-u*34],lh:[278,1125],look:[0.2,1],mouth:no>0.5?'o':'smile',brow:no>0.5?1:0});apSofa(t,o);g.restore();
 const pp=E(t,s+0.2,0.5);g.save();g.globalAlpha=pp;bigPhone(800,1000,0.95,0.04,()=>{switcher(t,['video','chat','map','photo','game'],rm,{});},{lvl:0.4});g.restore();
 if(M.aho)labelTag('🔋  ¿PARA AHORRAR BATERÍA?',540,640,E(t,M.aho,0.4),C.amber);};

// "deslizas, una, otra…": primer plano del móvil con el pulgar
ILL.ap_limpiar=(c,t)=>{const s=c._s,M=c._m;const rm=[M.mas,M.otr,M.una,M.des].map(v=>v!=null?v+0.05:null);const lim=M.lim?E(t,M.lim,0.5):0;
 g.save();cam(1.3,520,1000);salon(t,{lamp:0.6,dark:0.45});g.restore();
 const S=1.4,X=540,Y=1000;
 bigPhone(X,Y,S,0,()=>{const rem=switcher(t,['game','photo','chat','video'],rm,{});if(lim>0){homeGrid(lim);sparkle(60,-60,40*lim,lim);sparkle(-70,80,30*lim,lim);}},{lvl:0.4});
 const u=flickUp(t,rm);const fq=rm.map(r=>r!=null?E(t,r-0.15,0.45):0).find(q=>q>0&&q<1);const ty=fq!=null?lerp(1170,820,ease(fq)):1190;
 thumbHand(X+40,ty,0.85);
 if(lim>0)labelTag('✨  TODO LIMPIO…',540,1450,lim,C.blue);};

// las apps de la multitarea están quietas; solo gastan si están activas
ILL.ap_pausa=(c,t)=>{const s=c._s,M=c._m;const qu=M.qui?E(t,M.qui-0.2,0.5):0;const ac=M.act?E(t,M.act-0.2,0.5):0;
 g.save();cam(1.3,520,1000);salon(t,{lamp:0.6,dark:0.5});g.restore();
 bigPhone(540,1000,1.4,0,()=>{switcher(t,['game','photo','chat','video'],null,{pause:qu,glow:{3:ac}});
  if(ac>0)drainFx(84,-226,0,-60,t,ac);},{lvl:0.4});
 if(qu>0)zzz(800,700,t,qu*(1-ac));
 if(M.qui)labelTag('⏸  QUIETAS: NO TRABAJAN',540,1450,qu*(1-ac),C.gray);
 if(M.act)labelTag('⚡  SOLO GASTAN SI ESTÁN ACTIVAS',540,1450,ac,C.amber);};

// segundo plano: música y ubicación sí gastan
ILL.ap_fondo=(c,t)=>{const s=c._s,M=c._m;const mu=M.mus?E(t,M.mus-0.3,0.5):0;const ub=M.ubi?E(t,M.ubi-0.3,0.5):0;
 g.save();cam(1.2,480,1050);salon(t,{lamp:0.7});salonDevices(t,{});
 const o=apP({_ear:mu>0.5,rh:[372,1128],lh:[278,1125],look:[0.6,-0.2],mouth:'smile'});apSofa(t,o,{off:true});musicNotes(450,900,t,mu);g.restore();
 bigPhone(800,1000,0.95,0.04,()=>{g.fillStyle='rgba(0,0,0,0.35)';g.fillRect(-120,-250,240,500);txt('18:00',0,-150,54,'#fff',300);
  if(mu>0){g.save();g.globalAlpha=mu;g.fillStyle='rgba(255,255,255,0.16)';rr(-100,-80,200,90,18);g.fill();appIcon(-62,-35,52,'music');txt('Música',-26,-50,18,'#fff',800,'left');
   for(let i=0;i<5;i++){const h=10+12*Math.abs(Math.sin(t*6+i));g.fillStyle='#c9b8ff';rr(-24+i*14,-18-h/2,8,h,4);g.fill();}g.restore();drainFx(84,-226,-62,-35,t,mu);}
  if(ub>0){g.save();g.globalAlpha=ub;g.fillStyle='rgba(255,255,255,0.16)';rr(-100,30,200,90,18);g.fill();appIcon(-62,75,52,'map');txt('Mapas',-26,60,18,'#fff',800,'left');
   const pr=8+6*Math.sin(t*5);g.strokeStyle='rgba(47,191,113,0.8)';g.lineWidth=4;g.beginPath();g.arc(40,88,pr,0,7);g.stroke();g.fillStyle='#2fbf71';g.beginPath();g.arc(40,88,6,0,7);g.fill();g.restore();drainFx(84,-226,-62,75,t,ub,'#f2a33a',5);}
 },{lvl:lerp(0.4,0.32,E(t,M.mus||s+99,6))});
 if(M.seg)labelTag('SEGUNDO PLANO: AHÍ SÍ GASTAN',540,640,E(t,M.seg,0.4),C.amber);
 if(M.mus)labelTag('🎵  MÚSICA',800,1300,mu,C.purple);if(M.ubi)labelTag('📍  UBICACIÓN',800,1380,ub,C.green);};

// abiertas o cerradas: el mismo rendimiento
ILL.ap_rendimiento=(c,t)=>{const s=c._s,M=c._m;const gr=g.createLinearGradient(0,470,0,1600);gr.addColorStop(0,'#141c30');gr.addColorStop(1,'#0a0f1c');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 const cr=M.cer?E(t,M.cer,0.5):E(t,s,0.5);const rn=M.ren?E(t,M.ren-0.3,1):0;
 g.save();g.globalAlpha=cr;g.fillStyle=C.card;rr(50,690,470,820,30);g.fill();rr(560,690,470,820,30);g.fill();g.restore();
 bigPhone(285,960,0.82,-0.03,()=>{switcher(t,['video','chat','map','photo','game'],null,{gap:46});},{lvl:0.6});
 bigPhone(795,960,0.82,0.03,()=>{homeGrid(1);},{lvl:0.6});
 const v=lerp(0.1,0.72,ease(rn))+0.02*Math.sin(t*3);speedGauge(285,1340,95,v,C.green);speedGauge(795,1340,95,v,C.green);
 txt('TODAS ABIERTAS',285,1440,30,'#c9d1e0',900,'center',cr);txt('TODAS CERRADAS',795,1440,30,'#c9d1e0',900,'center',cr);
 if(rn>0)txt('=',540,1310,110,C.green,900,'center',E(t,M.ren,0.4));
 if(M.ren)labelTag('MISMO RENDIMIENTO',540,640,E(t,M.ren,0.4)*(1-(M.goo?E(t,M.goo,0.3):0)),C.green);
 if(M.goo)labelTag('GOOGLE (ANDROID): TAMPOCO LO RECOMIENDA',540,640,E(t,M.goo,0.4),C.blue);};

// el brillo alto: deslumbra y gasta
ILL.ap_brillo=(c,t)=>{const s=c._s,M=c._m;const br=M.bri?E(t,M.bri-0.2,0.6):0;const mc=M.muc?E(t,M.muc,0.4):0;
 g.save();cam(1.2,480,1050);salon(t,{lamp:0.2,dark:0.35});
 const o=apP({rh:[372,1128],lh:[278,1125],look:[0.2,0.6],mouth:br>0.5?'flat':'smile',brow:br>0.5?1:0});person(o,t);mobile(330,1100,0.5,0,{lvl:0.5,t});
 g.save();g.globalAlpha=br;g.fillStyle='#fffbe6';rr(304,1047,52,106,8);g.fill();g.restore();hands(o);sofa(...SOFA);glareRays(330,1080,200,t,br);g.restore();
 const lv=lerp(0.8,0.3,ease(E(t,M.muc||s+99,2.5)));
 g.fillStyle='rgba(10,15,28,0.82)';rr(680,740,240,680,34);g.fill();brightSlider(800,980,380,lerp(0.35,1,ease(br)));battIcon(800,1320,150,lv,{});
 if(mc>0)drainFx(800,1250,800,1290,t,mc,'#e5484d',4);
 if(M.ver)labelTag('¿QUÉ GASTA DE VERDAD?',540,640,E(t,M.ver,0.4),C.amber);
 if(M.muc)labelTag('☀️  BRILLO ALTO = MUCHA ENERGÍA',540,1490,mc,C.red);};

// datos móviles con mala señal vs wifi
ILL.ap_wifi=(c,t)=>{const s=c._s,M=c._m;const da=M.dat?E(t,M.dat-0.2,0.5):E(t,s,0.5);const wf=M.wif?E(t,M.wif-0.2,0.5):0;const sn=M.sen?E(t,M.sen-0.2,0.5):0;
 g.save();cam(1.2,520,1050);salon(t,{lamp:0.7});salonDevices(t);g.restore();g.fillStyle='rgba(6,10,20,0.6)';g.fillRect(0,470,W,1150);
 const lvA=lerp(0.85,0.35,ease(E(t,M.dat||s,6))),lvB=lerp(0.85,0.7,ease(E(t,M.wif||s,6)));
 g.save();g.globalAlpha=da;g.fillStyle=C.card;rr(60,640,450,800,30);g.fill();g.strokeStyle=C.red;g.lineWidth=4;g.stroke();g.restore();
 if(wf>0){g.save();g.globalAlpha=wf;g.fillStyle=C.card;rr(570,640,450,800,30);g.fill();g.strokeStyle=C.green;g.lineWidth=4;g.stroke();g.restore();}
 g.save();g.globalAlpha=da;txt('DATOS MÓVILES',285,700,34,'#fff',900);bigPhone(285,980,0.62,-0.04,()=>{sigBars(0,-20,1.4,1,'#ff8a8a');txt('Señal débil',0,40,22,'#ff8a8a',800);},{lvl:lvA});battIcon(285,1330,130,lvA,{});drainFx(285,1190,285,1290,t,da,'#e5484d',4);g.restore();
 if(wf>0){g.save();g.globalAlpha=wf;txt('WIFI',795,700,34,'#fff',900);bigPhone(795,980,0.62,0.04,()=>{wifiSym(0,10,1.3,3,'#7be3a0');if(sn>0)txt('Buena señal',0,60,22,'#7be3a0',800,'center',sn);},{lvl:lvB});battIcon(795,1330,130,lvB,{});g.restore();
  check(980,680,32,E(t,M.wif+0.3,0.5));}};

// Ajustes > Batería: las 3 apps que más han gastado hoy
ILL.ap_ajustes=(c,t)=>{const s=c._s,M=c._m;const aj=M.aju?E(t,M.aju+0.1,0.4):0;const tr=M.tre||s+99;
 g.save();cam(1.3,520,1000);salon(t,{lamp:0.6,dark:0.45});g.restore();
 const rows=[{kind:'video',v:1,p:E(t,tr-0.1,0.4)},{kind:'map',v:0.6,p:E(t,tr+0.3,0.4)},{kind:'music',v:0.38,p:E(t,tr+0.7,0.4)}];
 bigPhone(540,1000,1.4,0,()=>{homeGrid(1-aj);if(aj>0){g.save();g.globalAlpha=aj;g.translate(lerp(120,0,ease(aj)),0);battScreen(t,rows,{lvl:0.4});g.restore();}},{lvl:0.4});
 const tap=M.aju?E(t,M.aju-0.35,0.45):0;const ty=tap>0&&tap<1?lerp(1330,1000-150*1.4+88*1.4,Math.sin(tap*Math.PI)):1330;thumbHand(tap>0&&tap<1?lerp(640,530,Math.sin(tap*Math.PI)):640,ty,0.85);
 if(M.bat)labelTag('AJUSTES  ›  BATERÍA',540,1450,E(t,M.bat,0.4)*(1-E(t,tr,0.3)),C.blue);
 if(M.tre)labelTag('LAS 3 APPS QUE MÁS GASTAN HOY',540,1450,E(t,tr,0.4),C.amber);};

// consejos: brillo automático, wifi, modo ahorro
ILL.ap_consejos=(c,t)=>{const s=c._s,M=c._m;const b=M.bri?E(t,M.bri,0.5):0,w=M.wif?E(t,M.wif,0.5):0,a=M.aho?E(t,M.aho,0.5):0;
 g.save();cam(1.3,520,1000);salon(t,{lamp:0.7,dark:0.4});g.restore();
 bigPhone(540,990,1.35,0,()=>{g.fillStyle='rgba(8,12,24,0.55)';g.fillRect(-120,-250,240,500);
  g.fillStyle='rgba(255,255,255,0.12)';rr(-104,-190,98,300,24);g.fill();brightSlider(-55,-40,250,lerp(0.95,0.55,ease(b)),{auto:b});
  g.fillStyle='rgba(255,255,255,0.12)';rr(6,-190,98,140,24);g.fill();wifiSym(55,-110,0.62,w>0.5?3:1,w>0.5?'#7be3a0':'#fff');toggleSw(55,-75,0.7,w);
  g.fillStyle='rgba(255,255,255,0.12)';rr(6,-30,98,140,24);g.fill();battIcon(55,10,62,0.35,{col:a>0.5?C.amber:null});toggleSw(55,75,0.7,a);
  txt('Ajustes rápidos',0,170,18,'#c9d1e0',800);},{lvl:0.35});
 const k=M.jus?0:0;labelTag('✓  BRILLO AUTOMÁTICO',540,1450,b*(1-w),C.green);labelTag('✓  WIFI CUANDO PUEDAS',540,1450,w*(1-a),C.green);labelTag('✓  MODO AHORRO SI VAS JUSTO',540,1450,a,C.green);};
