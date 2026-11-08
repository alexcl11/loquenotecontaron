// ===== Escenas: lavar a 60 °C (2026-11-11) · kit en ill19.js (usa washer de ill9.js, costMeter de ill5.js, scr de ill_20261029.js, armFront) =====
const L6_W=[660,1212];
function l6P(o){return Object.assign({x:480,y:1240,apron:false,shirt:'#3ecf6e'},o);}
// cocina con la lavadora a la derecha del personaje; si o.reach, el brazo derecho pasa por delante de la encimera
function l6Scene(t,o,wo){kitchen(t,{stove:false});person(o,t);counterFront();const G=washerT(L6_W[0],L6_W[1],t,wo);if(o.reach)armFront(o,1,t);hands(o);return G;}
const L6_DIAL=[L6_W[0]+175,L6_W[1]+31];
// gancho: gira el mando a 60° «porque si no, no queda limpia»
ILL.l6_gancho=(c,t)=>{const s=c._s,M=c._m;const tr=s+0.9;const pr=ease(E(t,s+0.2,0.6))*(1-ease(E(t,(M.no||s+3)-0.3,0.5)));const no=M.no?E(t,M.no-0.2,0.4):0;
 g.save();camLerp(t,s,4,[1.25,640,1120],[1.32,660,1130]);
 const o=l6P({reach:pr>0.02,rh:[lerp(600,L6_DIAL[0],pr),lerp(1160,L6_DIAL[1],pr)],lh:[400,1165],look:no>0.5?[0,0.1]:[0.7,0.8],mouth:no>0.5?'o':'smile',brow:no>0.5?1:0});
 const G=l6Scene(t,o,{temp:t<tr?'40°':'60°',spin:0.2,p:0.05,water:0.3});
 const [dx,dy]=scr(G.disp[0],G.disp[1]-10);g.restore();
 labelTag('🔥 TODO A 60°',dx,dy-90,E(t,tr,0.3),C.red);
 labelTag('«ASÍ QUEDA MÁS LIMPIO»',540,650,M.lim?E(t,M.lim-0.2,0.4)*(1-E(t,(M.no||s+99)-0.2,0.3)):0,C.amber);};
// pregunta temprana: enseña una camiseta a cámara, la lavadora con «¿?»
ILL.l6_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.3,600,980);
 const hx=lerp(600,650,up),hy=lerp(1160,1060,up);
 const o=l6P({rh:[hx,hy],lh:[lerp(400,410,up),lerp(1165,1060,up)],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 kitchen(t,{stove:false});person(o,t);counterFront();washerT(L6_W[0],L6_W[1],t,{temp:'¿?',spin:0,water:0.1});tshirt((hx+o.lh[0])/2,hy+75,0.95,0,'#4f8bff');hands(o);g.restore();};
// mecanismo: cuanto más caliente, más trabaja la resistencia y más pagas
ILL.l6_calentar=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const ca=M.cal?ease(E(t,M.cal-0.3,1.0)):0,re=M.res?E(t,M.res-0.2,0.5):0,pa=M.pag?E(t,M.pag-0.2,0.6):0;const ht=Math.max(0.15,Math.min(1,0.25+0.75*ca));
 washerCut(400,1050,230,t,{heat:ht,spin:0.35,water:0.42});
 txt(ca>0.5?'60°':'30°',400,1050-230-62,40,ca>0.5?C.red:C.green,900);
 miniThermo(830,1000,260,lerp(0.3,0.95,ca),mixc('#3ecf6e','#e5484d',ca));
 costMeter(830,1420,240,pa>0?0.3+0.7*pa:0,C.red);
 labelTag('🔥 LA RESISTENCIA CALIENTA EL AGUA',540,650,re,C.red);
 labelTag('MÁS GRADOS = MÁS GASTO',540,1470,pa,C.red);};
// qué hacer: bajar la temperatura y dejar trabajar al detergente
ILL.l6_baja=(c,t)=>{const s=c._s,M=c._m;const kb=M.baj||s+0.8;const pr=ease(E(t,kb-0.6,0.5))*(1-ease(E(t,kb+0.5,0.5)));const de=M.det?E(t,M.det-0.2,0.5):0;
 g.save();camLerp(t,s,5,[1.25,640,1120],[1.3,650,1125]);
 const o=l6P({reach:pr>0.02,rh:[lerp(600,L6_DIAL[0],pr),lerp(1160,L6_DIAL[1],pr)],lh:[400,1165],look:[0.7,0.8],mouth:'smile'});
 const G=l6Scene(t,o,{temp:t<kb?'60°':'30°',spin:0.45,p:lerp(0.05,0.4,E(t,kb,4)),water:0.4});
 const [px,py]=scr(G.porthole[0],G.porthole[1]);const [dx,dy]=scr(G.disp[0],G.disp[1]);g.restore();
 labelTag('✓ BAJA TEMPERATURA',540,650,E(t,kb,0.4),C.green);
 if(de>0){for(let i=0;i<10;i++){const ph=(t*0.7+rnd(i))%1;g.fillStyle=`rgba(230,245,255,${0.6*de*(1-ph)})`;g.beginPath();g.arc(px-70+rnd(i+5)*140,py+40-ph*120,8+8*rnd(i+2),0,7);g.fill();}check(px,py,46,E(t,M.det+0.3,0.5));}
 labelTag('🧴 EL DETERGENTE HACE EL TRABAJO',540,1440,de,C.blue);};
// el calor, solo para la ropa muy sucia · y siempre a carga completa
ILL.l6_sucia=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.2)';g.fillRect(0,470,W,1150);
 const su=M.suc?E(t,M.suc-0.4,0.9):0,ca=M.car?ease(E(t,M.car-0.3,0.6)):0;
 const a1=ease(E(t,s+0.1,0.4));if(a1>0){g.save();g.globalAlpha=a1;tshirt(290,1000,1.7,-0.08,'#e6ebf2',su);g.restore();}
 labelTag('🔥 MUY SUCIA → MÁS GRADOS',300,1250,su>0.6?E(t,M.suc+0.2,0.4):0,C.red);
 if(ca>0){g.save();g.globalAlpha=ca;laundryBasket(790,1230,1.4,1);g.restore();}
 labelTag('✓ CARGA COMPLETA',790,1330,ca>0.9?E(t,M.car+0.3,0.4):0,C.green);
 labelTag('IDAE: BAJA TEMPERATURA, SALVO…',540,700,E(t,s+0.3,0.4),C.amber);};
