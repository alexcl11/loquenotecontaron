// ===== Escenas: aceite en el agua de la pasta (2026-11-17) · kit en ill25.js (usa stockPot de ill7.js, TO_POT de ill_20261110.js, burner/steamPlume de ill18.js, potCut de ill21.js, waterJug de ill15.js, kScale de ill22.js, pourStream de ill4.js, scr de ill_20261029.js, qMarks de ill14.js) =====
const PA_W='#6fa8dc',PA_SY=1150-182*0.75; // superficie del agua en la olla TO_POT
function paP(o){return Object.assign({x:620,y:1200,shirt:'#3d7bff'},o);}
// olla con agua hirviendo en el fuego; oil = manchas de aceite en la superficie
function paStove(t,oil=0,st=0.6){stockPot(...TO_POT,t,{lid:0,steam:0,soup:PA_W});burner(TO_POT[0],1170,170,t,0.8);
 oilSpots(TO_POT[0],PA_SY,80,9,t,oil);steamPlume(TO_POT[0],1010,200,t,st,330);steam(TO_POT[0],1010,t,st*0.8);}
// gancho: echa un chorro de aceite a la olla «para que no se pegue»
ILL.pa_gancho=(c,t)=>{const s=c._s,M=c._m;const ec=M.ech?ease(E(t,M.ech-0.3,0.5)):0;const no=M.no?E(t,M.no-0.1,0.4):0;
 g.save();camLerp(t,s,5,[1.25,700,1000],[1.32,720,990]);kitchen(t);
 const tilt=ec*(1-no*0.85);const hx=lerp(760,790,ec),hy=lerp(1110,915,ec);
 const o=paP({rh:[hx,hy],lh:[520,1150],look:no>0.5?[0,0.1]:[0.8,0.25],mouth:no>0.5?'o':'smile',brow:no>0.5?1:0});
 const pour=cl((tilt-0.75)*5);const oil=cl(E(t,(M.ech||s)+0.3,1.4))*0.9;
 person(o,t);paStove(t,oil,0.5);counterFront();
 const sp=oilBottle(hx+6,hy-6,0.75,lerp(0,1.9,tilt),0.75);hands(o);
 pourStream(sp[0],sp[1],TO_POT[0]+10,PA_SY,t,OIL,pour);
 g.restore();
 labelTag('«ASÍ NO SE PEGA»',540,660,ec*(1-no),C.amber);};
// pregunta temprana: enseña la botella de aceite a cámara
ILL.pa_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.4,660,940);kitchen(t);
 const hx=lerp(760,790,up),hy=lerp(1120,870,up);
 const o=paP({rh:[hx,hy],lh:[520,1150],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);paStove(t,0.9,0.7);counterFront();oilBottle(hx+4,hy-10,0.8,-0.12*up,0.6);hands(o);g.restore();};
// fuente: olla en corte; el aceite se queda arriba y los espaguetis se pegan igual
ILL.pa_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const ap=E(t,s+0.1,0.5);const pg=M.peg?ease(E(t,M.peg-0.4,1.4)):0;
 g.save();g.globalAlpha=ap;const X=540,Y=1450,WW=600,HH=470;
 const wy=potCut(X,Y,WW,HH,t,{lvl:0.72,boil:0.5,veg:(x,wy)=>{}});
 pastaIn(X,wy,Y-12,WW-60,t,{clump:pg,st:0.3*(1-pg)});
 oilFilm(X-WW/2+14,X+WW/2-14,wy,t,1);g.restore();
 labelTag('🫒 ACEITE',X+170,wy-50,E(t,s+0.6,0.4),C.amber);
 labelTag('SE PEGA IGUAL',X,1530,pg>0.5?E(t,M.peg+0.3,0.4):0,C.red);};
// mecanismo: la salsa se agarra peor (sin aceite se queda arriba; con aceite resbala al fondo)
ILL.pa_salsa=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const ap=ease(E(t,s+0.1,0.6));const sl=M.sal?ease(E(t,M.sal-0.1,1.8)):0;
 g.save();g.globalAlpha=ap;pastaPlate(280,1180,1.25,t,{slip:0});pastaPlate(800,1180,1.25,t,{slip:sl});g.restore();
 labelTag('SIN ACEITE',280,1300,ap,C.green);labelTag('CON ACEITE',800,1300,ap,C.amber);
 if(M.pe){checkmarkMini(280,950,E(t,M.pe-0.2,0.4));}
 labelTag('SE AGARRA PEOR',800,1400,M.pe?E(t,M.pe-0.2,0.4):0,C.red);};
function checkmarkMini(x,y,p){if(p<=0)return;g.save();g.globalAlpha=cl(p*2);g.fillStyle=C.green;g.beginPath();g.arc(x,y,44*eob(p),0,7);g.fill();
 g.strokeStyle='#fff';g.lineWidth=11;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(x-20,y+2);g.lineTo(x-5,y+17);g.lineTo(x+22,y-14);g.stroke();g.restore();}
// dato: 1 litro de agua por cada 100 g de pasta
ILL.pa_dato=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const a1=M.lit?ease(E(t,M.lit-0.4,0.5)):0;const a2=M.gra?ease(E(t,M.gra-0.4,0.5)):0;
 g.save();g.globalAlpha=a1;waterJug(290,1330,1.35,0,0.85,t);g.restore();
 labelTag('1 LITRO DE AGUA',290,1400,a1,C.blue);
 txt('+',545,1200,110,C.amber,900,'center',a2);
 const py=kScale(790,1330,1.3,a2>0.4?'100 g':'0 g',a2);g.save();g.globalAlpha=a2;spaghettiBundle(790,py-22,1.0,-0.05);g.restore();
 labelTag('100 g DE PASTA',790,1400,a2,C.amber);};
// qué hacer: remover con la cuchara de palo cada pocos minutos
ILL.pa_remover=(c,t)=>{const s=c._s,M=c._m;const rm=M.rem?E(t,M.rem-0.5,0.5):0;const ag=M.agu?E(t,M.agu-0.2,0.4):0;const fo=M.fon?E(t,M.fon-0.2,0.4):0;
 g.save();camLerp(t,s,5,[1.3,740,990],[1.38,760,985]);kitchen(t);
 const ph=t*4.2,sx=TO_POT[0]+Math.cos(ph)*38*rm,sy=PA_SY-150+Math.sin(ph)*10*rm;
 const hx=lerp(760,sx,ease(rm)),hy=lerp(1120,sy,ease(rm));
 const o=paP({rh:[hx,hy],lh:[520,1150],look:[0.7,0.25],mouth:'smile'});
 person(o,t);if(rm>0.02)woodSpoon(hx,hy,0.75,Math.cos(ph)*-0.12*rm,240);
 paStove(t,0,0.6);
 counterFront();hands(o);g.restore();
 labelTag('NI SE PEGA ENTRE SÍ NI AL FONDO',540,660,fo,C.amber);
 labelTag('🥄 REMUEVE CADA POCOS MINUTOS',540,1440,rm>0.5?E(t,M.rem,0.4):0,C.green);};
