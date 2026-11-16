// ===== Escenas: etiqueta energética nueva (2026-11-19) · kit en ill27.js (usa kitchen/person de ill.js, washer de ill9.js, L6_W/l6P de ill_20261111.js, smartphone de ill4.js, qMarks de ill14.js, scr de ill_20261029.js) =====
function etP(o){return Object.assign({x:480,y:1240,apron:false,shirt:'#3d7bff'},o);}
// cocina con la lavadora nueva a la derecha y lo que lleva en las manos (draw) entre el personaje y sus manos
function etScene(t,o,draw){kitchen(t,{stove:false});person(o,t);counterFront();washer(L6_W[0],L6_W[1],t,{prog:'ECO',spin:0,water:0.1});if(draw)draw();hands(o);}
// gancho: mira la etiqueta con la C y pone mala cara → «no tan rápido»
ILL.et_gancho=(c,t)=>{const s=c._s,M=c._m;const no=M.no?E(t,M.no-0.15,0.4):0;const up=ease(E(t,s+0.1,0.7));
 g.save();camLerp(t,s,4,[1.22,600,1020],[1.3,620,1000]);
 const lx=lerp(760,700,up),ly=lerp(1080,960,up);
 const o=etP({rh:[lx-100,ly+128],lh:[330,1165],look:no>0.5?[0,0.1]:[1,0.2],mouth:no>0.5?'o':'worry',brow:no>0.5?1:-1});
 etScene(t,o,()=>energyLabel(lx,ly,0.85,0.05*(1-no),{mode:'new',cls:2,hl:Math.sin(t*6)}));
 g.restore();
 labelTag('«UNA C… QUÉ MALA»',540,650,E(t,s+0.6,0.4)*(1-no),C.amber);};
// pregunta temprana: acerca la etiqueta a cámara
ILL.et_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.3,600,980);
 const lx=lerp(700,690,up),ly=lerp(960,920,up),ls=lerp(0.85,0.98,up);
 const o=etP({rh:[lx-100*ls,ly+128*ls],lh:[330,1165],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 etScene(t,o,()=>energyLabel(lx,ly,ls,0,{mode:'new',cls:2,hl:0.5+0.5*Math.sin((t-s)*5)}));
 const [hx,hy]=scr(o.x,860);g.restore();
 qMarks(hx,hy-30,t,E(t,s+0.3,0.4));};
// fuente: etiqueta vieja (A+++…D) → desde marzo de 2021, nueva de la A a la G sin «+»
const ET_O=[285,1150],ET_N=[795,1150];
ILL.et_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);
 const a0=eob(E(t,s+0.1,0.5)),mr=M.mar?E(t,M.mar-0.2,0.5):0,pl=M.plus?E(t,M.plus-0.3,0.6):0;
 g.save();g.globalAlpha=cl(a0*2);energyLabel(ET_O[0],ET_O[1],0.95*a0,-0.03,{mode:'old',p:E(t,s+0.2,0.9),plusX:pl});g.restore();
 if(mr>0){g.save();g.globalAlpha=cl(mr*2);energyLabel(ET_N[0],ET_N[1],0.95*eob(mr),0.03,{mode:'new',p:E(t,M.mar,0.9)});g.restore();
  g.save();g.globalAlpha=cl(mr*2);g.fillStyle=C.amber;g.beginPath();g.moveTo(505,1150-22);g.lineTo(560,1150);g.lineTo(505,1150+22);g.closePath();g.fill();g.restore();}
 labelTag('ANTES',ET_O[0],900,E(t,s+0.3,0.4),C.blue);
 labelTag('DESDE MARZO 2021',ET_N[0],900,mr,C.green);
 labelTag('DE LA A A LA G · SIN «+»',540,1440,pl,C.amber);};
// dato clave: la misma lavadora A+++ puede ser ahora B, C… o menos
ILL.et_dato=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);
 const tb=M.b||s+2.5,ti=M.inc||tb+1.6;const k1=E(t,tb-0.1,0.4),k2=E(t,(tb+ti)/2,0.4),k3=E(t,ti,0.6);
 const cls=1+ease(k1)*0+ease(k2)*1+ease(k3)*1.1+0.06*Math.sin(t*5)*k3-(1-k1)*0;const ap=k1>0?1:0.35;
 energyLabel(ET_O[0],ET_O[1],0.95,-0.03,{mode:'old',cls:0,hl:Math.sin(t*6)});
 g.save();g.globalAlpha=ap;energyLabel(ET_N[0],ET_N[1],0.95,0.03,{mode:'new',cls:k1>0?cls:null,hl:Math.sin(t*6)});g.restore();
 // flecha curva de la clase vieja a la nueva
 const ar=E(t,s+0.6,0.8);if(ar>0){const ox=ET_O[0]+130,oy=ET_O[1]-0.95*95,nx=ET_N[0]-0.95*130-22,ny=ET_N[1]+0.95*(-97+cls*36);
  g.save();g.strokeStyle=C.amber;g.lineWidth=7;g.lineCap='round';g.setLineDash([16,12]);g.beginPath();g.moveTo(ox,oy);
  const mx=(ox+nx)/2,my=Math.min(oy,ny)-90;const N=24;for(let i=1;i<=Math.round(N*ar);i++){const u=i/N;const x=(1-u)*(1-u)*ox+2*(1-u)*u*mx+u*u*nx,y=(1-u)*(1-u)*oy+2*(1-u)*u*my+u*u*ny;g.lineTo(x,y);}g.stroke();if(ar>=1){g.setLineDash([]);g.fillStyle=C.amber;g.beginPath();g.moveTo(nx+16,ny);g.lineTo(nx-10,ny-16);g.lineTo(nx-10,ny+16);g.closePath();g.fill();}g.restore();}
 labelTag('MISMA LAVADORA, PRUEBAS NUEVAS',540,760,E(t,s+0.3,0.4),C.blue);
 labelTag('UN A+++ PUEDE SER AHORA B, C O MENOS',540,1440,k2,C.amber);};
// qué hacer (1): no comparar la letra de la etiqueta vieja con la nueva
ILL.et_comparar=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));const cm=M.com?E(t,M.com-0.2,0.5):0;
 g.save();cam(1.12,500,1010);
 const o=etP({lh:[lerp(330,262,up),lerp(1165,1090,up)],rh:[lerp(620,718,up),lerp(1165,1090,up)],look:[0,0.1],mouth:cm>0.3?'flat':'smile',brow:cm>0.3?1:0});
 etScene(t,o,()=>{energyLabel(lerp(330,250,up),lerp(1100,960,up),0.68*up+0.01,-0.08,{mode:'old',cls:0});energyLabel(lerp(620,730,up),lerp(1100,960,up),0.68*up+0.01,0.08,{mode:'new',cls:2});});
 const [nx,ny]=scr(490,720);const [ax,ay]=scr(250,1240);const [bx,by]=scr(730,1240);g.restore();
 neqSign(nx,ny,56,cm);
 labelTag('VIEJA',ax,Math.min(ay,1440),E(t,s+0.4,0.4),C.blue);labelTag('NUEVA',bx,Math.min(by,1440),E(t,s+0.5,0.4),C.green);
 labelTag('✕ NO SE COMPARAN',540,650,M.nue?E(t,M.nue-0.1,0.4):0,C.red);};
// qué hacer (2): escanear el QR de la etiqueta nueva → datos del modelo
ILL.et_qr=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));const es=M.esc?E(t,M.esc-0.1,0.5):0;const da=M.dat?E(t,M.dat-0.2,0.5):0;
 g.save();cam(1.2,520,1000);
 const LX=330,LY=lerp(1080,940,up),LS=0.82,px=lerp(640,700,up),py=lerp(1150,930,up);
 const o=etP({lh:[LX+20,LY+150*LS],rh:[px+6,py+62],look:es>0.3?[-0.5,0]:[0,0.1],mouth:da>0.3?'smile':'flat'});
 const qx=LX+91*LS,qy=LY-159*LS;
 etScene(t,o,()=>{energyLabel(LX,LY,LS,0,{mode:'new',cls:2});if(es>0){g.save();g.strokeStyle='#9fd3ff';g.lineWidth=5;g.globalAlpha=es*(0.6+0.4*Math.sin(t*8));rr(qx-30,qy-30,60,60,8);g.stroke();g.restore();}
  smartphone(px,py,1.5,-0.25,0,t);scanBeam(px-14,py-40,qx,qy,58,t,es*(1-da*0.6));});
 const [sx,sy]=scr(px,py-120);const [qsx,qsy]=scr(qx,qy-60);g.restore();
 labelTag('📱 ESCANEA EL QR',qsx+40,Math.max(qsy-20,640),es*(1-da),C.blue);
 if(da>0){g.save();g.globalAlpha=cl(da*2);const bx=Math.min(sx+30,800),by=Math.max(sy-40,700);g.fillStyle='#f7f8fb';rr(bx-150,by-70,300,140,18);g.fill();
  txt('DATOS DEL MODELO',bx,by-38,24,'#1b2a52',900);g.fillStyle=C.green;rr(bx-120,by-10,170*eob(da),16,6);g.fill();g.fillStyle=C.amber;rr(bx-120,by+18,120*eob(da),16,6);g.fill();g.fillStyle='#d6dbe6';rr(bx-120,by+46,200,8,4);g.fill();g.restore();}
 labelTag('✓ MIRA LA NUEVA, LA DEL QR',540,1440,da,C.green);};
