// ===== Escenas: descargar la batería del todo (2026-10-31) · kit en ill8.js =====
function btP(o){return Object.assign({x:510,y:1262,apron:false,shirt:'#2fa58f'},o);}
// gancho: en el sofá, esperando a que el móvil se apague
ILL.bt_gancho=(c,t)=>{const s=c._s,M=c._m;const ap=M.apa?E(t,M.apa,0.3):0;
 g.save();camLerp(t,s,4,[1.15,540,1040],[1.45,520,1060]);salon(t,{lamp:0.6});salonDevices(t);
 const lv=lerp(0.04,0.01,E(t,s,2));const o=btP({x:520,rh:[580,1100],lh:[460,1105],look:[0.2,1],mouth:ap>0.5?'o':'flat',brow:ap>0.5?1:0});
 person(o,t);mobile(520,1078,0.6,0,{lvl:lv,off:ap>0.5,t});hands(o);sofa(...SOFA);g.restore();};
// el consejo de toda la vida: "gástala hasta el final"
ILL.bt_consejo=(c,t)=>{const s=c._s,M=c._m;const ac=M.aco?E(t,M.aco-0.2,0.4):0;const talk=M.dur?1-E(t,M.dur+0.4,0.3):1;
 g.save();cam(1.12,560,1040);salon(t,{lamp:1});salonDevices(t);
 const gO={x:400,y:1262,s:0.95,shirt:'#8b7cf6',hair:'#c9ccd6',apron:false,rh:[500+Math.sin(t*9)*14*talk,900],lh:[330,1190],look:[1,0],mouth:Math.sin(t*10)>0&&talk>0.5?'o':'smile'};
 bun(gO,t);person(gO,t);glasses(gO,t);hands(gO);const h=gO._hands[1];g.fillStyle=IL.skin;rr(h[0]-6,h[1]-46,12,36,6);g.fill();
 const hO=btP({x:690,rh:[745,1100],lh:[635,1105],look:ac>0.5?[0.2,1]:[-1,-0.1],mouth:ac>0.5?'worry':'smile',brow:ac>0.5?1:0});
 person(hO,t);mobile(690,1078,0.55,0,{lvl:0.35,t});hands(hO);sofa(260,1160,560);g.restore();};
// efecto memoria: níquel-cadmio (antes) vs iones de litio (ahora)
ILL.bt_memoria=(c,t)=>{const s=c._s,M=c._m;const gr=g.createLinearGradient(0,470,0,1600);gr.addColorStop(0,'#141c30');gr.addColorStop(1,'#0a0f1c');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 const pl=E(t,s,0.5),pr=M.mov?E(t,M.mov-0.3,0.5):0;
 g.save();g.globalAlpha=pl;g.fillStyle='#2a2418';rr(50,580,470,900,30);g.fill();txt('ANTES',285,640,32,'#e8d9b0',900);
 const mem=M.mem?ease(E(t,M.mem,1.2)):0;brickPhone(285,960,1.15,-0.06);battIcon(285,1215,170,1,{col:'#d9a54a',lost:0.45*mem});g.restore();
 labelTag('NÍQUEL-CADMIO',285,1330,M.ni?E(t,M.ni,0.4):0,C.amber);labelTag('EFECTO MEMORIA',285,1410,M.mem?E(t,M.mem,0.4):0,C.red);
 if(pr>0){g.save();g.globalAlpha=pr;g.fillStyle=C.card;rr(560,580,470,900,30);g.fill();g.strokeStyle=C.line;g.lineWidth=3;g.stroke();txt('AHORA',795,640,32,'#c9d1e0',900);
  const lv=lerp(0.3,1,ease(E(t,M.mov,3)));mobile(795,955,1.2,0.05,{lvl:lv,chg:lv<0.99,t});g.restore();
  labelTag('IONES DE LITIO',795,1250,M.li?E(t,M.li,0.4):0,C.blue);labelTag('SIN EFECTO MEMORIA',795,1330,M.tie?E(t,M.tie,0.4):0,C.green);if(M.tie)check(795,1415,32,E(t,M.tie+0.2,0.5));}};
// mucho tiempo completamente descargada: pasan los días, polvo, telaraña
ILL.bt_vacia=(c,t)=>{const s=c._s,M=c._m;const t0=s+0.4,te=M.des||s+5;const u=cl((t-t0)/(te-t0));const day=1+Math.floor(u*20),fl=(u*20)%1;
 g.save();camLerp(t,s,5,[1.25,720,1030],[1.4,760,1040]);salon(t,{lamp:0.3,dark:0.2});
 calendarPad(585,770,0.9,day,u<1?fl:0);mobile(860,1080,0.5,-0.12,{lvl:0,t});dust(860,1110,260,90,M.muc?E(t,M.muc,2):0);cobweb(1040,1150,110,M.muc?E(t,M.muc+0.8,1):0,-1);
 const [lx,ly]=scr(860,1020);g.restore();
 if(M.des)labelTag('EVITA DEJARLA MUCHO TIEMPO A 0 %',540,1440,E(t,M.des,0.4),C.red);if(M.muc)labelTag('⏳  DÍAS Y DÍAS…',540,640,E(t,M.muc,0.4),C.amber);};
// ciclo de carga: 100 % aunque sea en varios días; 75 % hoy + 25 % mañana = 1 ciclo
ILL.bt_ciclo=(c,t)=>{const s=c._s,M=c._m;const hoy=M.hoy||s+99,noc=M.noc||s+99,man=M.man||s+99,sol=M.sol||s+99;
 const night=cl(E(t,noc-0.2,0.5)-E(t,man-0.3,0.5));
 let a=0,b=0,lv=0.8,chg=false,txtR='',sub='';
 if(t<hoy-0.2){const f=M.cien?ease(E(t,M.cien-0.3,1.2)):0;a=f;txtR=Math.round(f*100)+' %';sub='= 1 CICLO';lv=1-0.6*f;}
 else{a=0.75*ease(E(t,hoy,1.4));b=0.25*ease(E(t,man,1.2));txtR=Math.round((a+b)*100)+' %';sub='GASTADO';
  if(t<noc-0.2)lv=1-a;else if(t<man)
  {lv=lerp(0.25,1,ease(E(t,noc,Math.max(0.8,man-noc-0.4))));chg=true;}else lv=1-b;}
 const done=t>sol-0.1?E(t,sol-0.1,0.4):0;if(done>0){txtR='1 CICLO';sub='';}
 g.save();cam(1.15,520,1040);salon(t,{lamp:1-night,dark:0.45*night});
 const o=btP({x:420,rh:[475,1100],lh:[365,1105],look:[0.2,1],mouth:'smile'});person(o,t);if(chg)cable(420,1135,150,1290,40);mobile(420,1078,0.55,0,{lvl:lv,chg,t});hands(o);sofa(...SOFA);
 if(night>0.5)zzz(480,880,t,night);g.restore();
 const rp=E(t,s,0.5);g.save();g.globalAlpha=rp;g.fillStyle='rgba(10,15,28,0.82)';g.beginPath();g.arc(800,830,175,0,7);g.fill();cycleRing(800,830,128,a,b,{done,txt:txtR,sub});g.restore();
 if(M.dia&&t<hoy-0.2)labelTag('AUNQUE SEA EN VARIOS DÍAS',540,1440,E(t,M.dia,0.4),C.amber);
 if(t>=hoy-0.2){labelTag('HOY · 75 %',800,1060,E(t,hoy,0.4),C.amber);if(M.noc)labelTag('🌙  CARGA',800,1130,E(t,noc,0.4)*(1-E(t,man-0.2,0.3)),C.gray);labelTag('MAÑANA · 25 %',800,1130,E(t,man,0.4),C.blue);}
 if(M.rat)labelTag('✓  CARGAR A RATOS NO GASTA CICLOS DE MÁS',540,1440,E(t,M.rat,0.4),C.green);};
// por la noche: el móvil en la mesilla, cargando con carga optimizada
ILL.bt_noche=(c,t)=>{const s=c._s,M=c._m;const op=M.opt||s+3;
 g.save();camLerp(t,op-1.0,1.2,[1.2,640,1010],[2.1,930,1030]);bedroom(t,{lamp:0.3,blind:0.6,dark:0.25});
 const o=btP({x:590,y:1300,shirt:'#2fa58f',lh:[470,1290],rh:[710,1290],look:[0,0.7],mouth:'flat'});person(o,t);duvet(t);zzz(680,930,t,1);
 const sk=wallSocket(1075,1150);const lv=t<op?lerp(0.35,0.8,ease(E(t,s+0.3,op-s-0.3))):(M.pro&&t>M.pro+1.4?lerp(0.8,1,E(t,M.pro+1.4,1.2)):0.8);
 cable(905,1088,sk[0],sk[1],50);mobile(905,1050,0.32,-0.06,{lvl:lv,chg:lv<0.995,t});g.restore();
 if(M.noc)labelTag('🌙  CARGARLO CADA NOCHE: SIN PROBLEMA',540,640,E(t,M.noc,0.4),C.green);
 if(M.opt)labelTag('CARGA OPTIMIZADA',540,1380,E(t,M.opt,0.4),C.blue);if(M.pro)labelTag('O PROTECCIÓN DE BATERÍA',540,1450,E(t,M.pro,0.4),C.blue);};
// el calor: 16–22 °C ideal; evitar más de 35 °C
ILL.bt_calor=(c,t)=>{const s=c._s,M=c._m;const ca=M.cal?E(t,M.cal-0.2,0.8):0;const id=M.die?E(t,M.die-0.2,0.9):0;
 const val=lerp(lerp(24,38,ease(ca)),19,ease(id));const hot=cl(ca-id);
 g.save();cam(1.15,560,1040);salon(t,{lamp:0.8});
 const o=btP({x:330,rh:[385,1100],lh:[275,1105],look:[0.2,1],mouth:hot>0.5?'worry':'smile',brow:hot>0.5?1:0});person(o,t);cable(330,1135,120,1290,40);
 warmHalo(330,1070,lerp(40,170,hot),hot);mobile(330,1078,0.55,0,{lvl:0.6,chg:true,t});heatWaves(330,960,110,t,hot);hands(o);sofa(...SOFA);g.restore();
 const X=830,Y=1330,H=560,lo=10,hi=40,yv=v=>Y-cl((v-lo)/(hi-lo))*H;
 g.fillStyle='rgba(10,15,28,0.8)';rr(650,640,380,860,34);g.fill();
 if(id>0){g.save();g.globalAlpha=id;g.fillStyle='rgba(62,207,110,0.28)';rr(X-120,yv(22),240,yv(16)-yv(22),10);g.fill();g.restore();}
 bigThermo(X,Y,H,val,{lo,hi,col:hot>0.5?C.red:(id>0.5?C.green:C.amber)});
 if(M.tre){const p=E(t,M.tre,0.4);g.save();g.globalAlpha=p;g.setLineDash([12,10]);g.strokeStyle=C.red;g.lineWidth=5;g.beginPath();g.moveTo(X-130,yv(35));g.lineTo(X+40,yv(35));g.stroke();g.restore();labelTag('✕  MÁS DE 35 °C',530,yv(35),p,C.red);}
 if(M.die)labelTag('16–22 °C  ✓',530,yv(19),E(t,M.vei||M.die,0.4),C.green);
 if(M.cal)labelTag('LO QUE LA DESGASTA: EL CALOR',540,1450,E(t,M.cal,0.4),C.amber);};
// nada de cargarlo bajo la almohada: a una superficie firme y ventilada
ILL.bt_almohada=(c,t)=>{const s=c._s,M=c._m;const mj=M.mej||s+99;const k=E(t,mj-0.5,1.4);const hot=1-E(t,mj+0.2,0.8);
 g.save();cam(1.25,720,1040);bedroom(t,{lamp:1,blind:0.6});const sk=wallSocket(1075,1150);
 warmHalo(765,1050,170,hot);g.save();g.globalAlpha=hot;g.fillStyle='rgba(255,110,80,0.35)';rr(700,1020,80,90,30);g.fill();g.restore();heatWaves(760,990,110,t,hot);
 let ph=null,hand=[700,1250];if(k>0&&k<0.3){hand=[lerp(700,775,ease(k/0.3)),lerp(1250,1070,ease(k/0.3))];}
 else if(k>=0.3&&k<1){const q=ease((k-0.3)/0.7);hand=[lerp(775,915,q),lerp(1070,1040,q)-50*Math.sin(q*Math.PI)];ph=[hand[0],hand[1]-10];}
 else if(k>=1){hand=[700,1250];}
 const o=btP({x:620,y:1300,shirt:'#2fa58f',lh:[500,1290],rh:hand,look:k>0&&k<1?[1,0.2]:[0.9,0.3],mouth:hot>0.5&&M.alm&&t>M.alm?'worry':'smile',brow:hot>0.5&&M.alm&&t>M.alm?1:0});
 person(o,t);duvet(t);
 if(k<0.3)cable(780,1085,sk[0],sk[1],60);else if(ph){cable(ph[0],ph[1]+30,sk[0],sk[1],60);mobile(ph[0],ph[1],0.3,0.2,{lvl:0.7,chg:true,t});}
 else{cable(905,1088,sk[0],sk[1],50);mobile(905,1050,0.32,-0.06,{lvl:0.7,chg:true,t});}
 hands(o);g.restore();
 if(M.alm)labelTag('✕  BAJO LA ALMOHADA',540,640,E(t,M.alm,0.4)*(1-E(t,mj,0.3)),C.red);if(M.sof)labelTag('✕  NI EN EL SOFÁ',540,720,E(t,M.sof,0.4)*(1-E(t,mj,0.3)),C.red);
 if(M.ven)labelTag('✓  SUPERFICIE FIRME Y VENTILADA',540,1440,E(t,M.ven,0.4),C.green);};
