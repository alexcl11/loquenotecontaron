// ===== Escenas: tender la ropa dentro de casa (2026-11-18) · kit en ill26.js (usa salon de ill2.js, cfSalon/scr de ill_20261029.js, salonWin/fogGlass/cornerMold de ill13.js, waterJug de ill15.js) =====
const TD_R=[600,1060,440]; // tendedero: centro x, varilla y, ancho
const TD_ITEMS=[{k:'shirt',dx:-140,col:'#e5484d',s:0.85},{k:'shirt',dx:140,col:'#3ecf6e',s:0.85},{k:'towel',dx:0,col:'#3d7bff',s:1.12},{k:'sock',dx:-205,col:'#f2a33a',dy:4},{k:'sock',dx:205,col:'#e6ebf2',dy:4}];
function tdP(o){return Object.assign({x:TD_R[0],y:1190,apron:false,shirt:'#8b7cf6',bend:[-1,1]},o);}
// salón con radiador bajo la ventana; fog = vaho en el cristal; win = opciones de la ventana
function tdSalon(t,o={}){salon(t,{lamp:1});radiator(...CF_RAD,o.heat??0.5,t);return salonWin(t,Object.assign({snow:0.6,fog:o.fog||0},o.win||{}));}
function tdRack(t,o={}){return dryRack(TD_R[0],TD_R[1],TD_R[2],t,Object.assign({items:o.items||TD_ITEMS,wet:1,drip:o.drip??0.7},o));}
// gancho: cuelga la última camiseta en el tendedero del salón «total, no pasa nada»
ILL.td_gancho=(c,t)=>{const s=c._s,M=c._m;const hg=ease(E(t,s+0.3,1.1));const pu=M.pu?E(t,M.pu-0.1,0.4):0;
 g.save();camLerp(t,s,5,[1.22,540,1000],[1.3,560,990]);tdSalon(t,{fog:0.15});
 const hx=lerp(860,TD_R[0]+150,hg),hy=lerp(900,TD_R[1],hg);
 const o=tdP({rh:[hx,hy],lh:[TD_R[0]-150,TD_R[1]],look:pu>0.5?[0,0.1]:[0.6,0.2],mouth:pu>0.5?'o':'smile',brow:pu>0.5?1:0});
 person(o,t);tdRack(t,{items:TD_ITEMS.filter((_,i)=>i!==1),drip:0.6});
 hangItem('shirt',hx-10,hy,0.85,'#3ecf6e',1,t,(1-hg)*0.15);hands(o);
 vaporTo(TD_R[0]-200,TD_R[0]+200,1180,TD_R[0]-60,760,t,0.35*pu);
 g.restore();
 labelTag('«TOTAL, NO PASA NADA»',540,640,ease(E(t,s+0.8,0.4))*(1-pu),C.amber);};
// pregunta temprana: enseña la camiseta mojada a cámara
ILL.td_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.38,620,960);tdSalon(t,{fog:0.2});
 const hx=lerp(TD_R[0]+150,800,up),hy=lerp(TD_R[1],860,up);
 const o=tdP({rh:[hx,hy],lh:[TD_R[0]-150,TD_R[1]],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);tdRack(t,{items:TD_ITEMS.filter((_,i)=>i!==1)});hangItem('shirt',hx-10,hy,0.85,'#3ecf6e',1,t,-0.05*up);
 for(let j=0;j<3;j++){const ph=(t*1.1+j/3)%1;g.save();g.globalAlpha=up*(1-ph);g.fillStyle='#9fd3ff';const dx=hx-40+j*30,yy=hy+180+ph*ph*220;g.beginPath();g.moveTo(dx,yy-12);g.quadraticCurveTo(dx+7,yy,dx,yy+6);g.quadraticCurveTo(dx-7,yy,dx,yy-12);g.fill();g.restore();}
 hands(o);g.restore();};
// fuente + dato: la colada mojada suelta su agua al aire… casi 2 litros
ILL.td_fuente=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);tdSalon(t,{fog:0.2});g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);
 const ap=ease(E(t,s+0.1,0.5));const co=M.col?E(t,M.col-0.3,0.5):0;const li=M.lit?E(t,M.lit-1.6,2.0):0;
 g.save();g.globalAlpha=ap;g.translate(300,1000);g.scale(0.82,0.82);g.translate(-TD_R[0],-TD_R[1]);tdRack(t,{drip:0.9});g.restore();
 vaporTo(140,460,1080,800,1180,t,co*0.9,14);
 const f1=cl(li*2),f2=cl(li*2-1)*0.88;
 g.save();g.globalAlpha=co;waterJug(720,1340,0.95,0,f1,t);waterJug(900,1340,0.95,0,f2,t);g.restore();
 txt('1 L',720,1250,40,'#fff',900,'center',co);txt('1 L',900,1250,40,'#fff',900,'center',co);
 labelTag('💧 CASI 2 LITROS POR COLADA',540,1440,M.lit?E(t,M.lit-0.2,0.4):0,C.blue);};
// mecanismo: el agua pasa al aire y acaba como vaho en los cristales fríos
ILL.td_vaho=(c,t)=>{const s=c._s,M=c._m;const ai=M.ai?E(t,M.ai-0.4,0.6):0;const cr=M.cr?ease(E(t,M.cr-0.6,1.6)):0;
 g.save();camLerp(t,s,5,[1.12,450,980],[1.3,360,930]);tdSalon(t,{fog:0.2+0.8*cr});
 const o=tdP({rh:[TD_R[0]+150,TD_R[1]],lh:[TD_R[0]-150,TD_R[1]],look:[-0.8,-0.3],mouth:cr>0.5?'worry':'flat',brow:cr>0.5?1:0});
 person(o,t);tdRack(t,{drip:0.5});hands(o);
 vaporTo(TD_R[0]-200,TD_R[0]+200,1120,VW[0]+VW[2]/2,VW[1]+VW[3]/2,t,ai,16);
 const [wx,wy]=scr(VW[0]+VW[2]/2,VW[1]-30);g.restore();
 labelTag('💨 AL AIRE DE TU CASA',540,1440,ai*(1-cr),C.blue);
 labelTag('VAHO EN LOS CRISTALES',Math.max(wx+40,330),Math.max(wy-10,620),M.cr?E(t,M.cr,0.4):0,C.blue);};
// con la humedad, aparece el moho en la pared junto a la ventana
ILL.td_moho=(c,t)=>{const s=c._s,M=c._m;const mo=M.mo?E(t,M.mo-0.7,1.8):0;
 g.save();camLerp(t,s,4,[1.3,240,880],[1.45,220,870]);tdSalon(t,{fog:1});
 cornerMold(274,600,mo,t);cornerMold(262,884,mo*0.9,t);cornerMold(30,884,mo*0.7,t);
 const [mx,my]=scr(155,560);g.restore();
 labelTag('⚠ MOHO',Math.max(mx,200),Math.max(my,620),M.mo?E(t,M.mo,0.4):0,C.red);};
// qué hacer: fuera si se puede; si no, cuarto con puerta cerrada y ventana abierta; no en el radiador
const TD_D=[790,700,220,590];
// tapa un trozo de pared del salón (tele, mueble) con la misma pared y la luz de la lámpara
function tdPatch(x,y,w,h){const gr=g.createLinearGradient(0,400,0,1300);gr.addColorStop(0,'#2a2f55');gr.addColorStop(1,'#1c2140');g.fillStyle=gr;g.fillRect(x,y,w,h);
 const lg=g.createRadialGradient(470,660,20,470,900,620);lg.addColorStop(0,'rgba(255,226,150,0.35)');lg.addColorStop(1,'rgba(255,226,150,0)');g.fillStyle=lg;g.fillRect(x,y,w,h);}
ILL.td_solucion=(c,t)=>{const s=c._s,M=c._m;const fu=M.fu?E(t,M.fu-0.2,0.4):0;const pu=M.pu?E(t,M.pu-0.2,0.8):0;const ve=M.ve?E(t,M.ve-0.3,0.8):0;const ra=M.ra?E(t,M.ra-0.3,0.4):0;
 const X=470;g.save();cam(1.02,520,1010);tdSalon(t,{fog:0.3*(1-ve),win:{open:0.85*ve}});
 tdPatch(TD_D[0]-60,TD_D[1]-80,TD_D[2]+120,TD_D[3]+80);roomDoor(...TD_D,pu,t,{wall:false});
 const o=tdP({x:X,rh:pu>0&&ve<0.05?[lerp(X+150,700,ease(cl(pu*2))*(1-ease(cl(pu*2-1)))),lerp(TD_R[1],980,ease(cl(pu*2))*(1-ease(cl(pu*2-1))))]:[X+150,TD_R[1]],
  lh:ve>0?[lerp(X-150,330,ease(cl(ve*2))*(1-ease(cl(ve*2-1)))),lerp(TD_R[1],900,ease(cl(ve*2))*(1-ease(cl(ve*2-1))))]:[X-150,TD_R[1]],look:ve>0.05?[-0.8,-0.2]:pu>0.05?[0.8,-0.1]:[0,0.1],mouth:'smile'});
 person(o,t);dryRack(X,TD_R[1],TD_R[2],t,{items:TD_ITEMS,wet:1,drip:0.5});hands(o);
 if(ra>0){g.save();g.globalAlpha=cl(ra*2);hangItem('shirt',150,1100,0.7,'#f2a33a',1,t);g.restore();xBadge(150,1190,ra,46);}
 g.restore();
 labelTag('☀️ SI PUEDES, FUERA',540,1440,fu*(1-pu),C.amber);
 labelTag('🚪 PUERTA CERRADA + 🪟 VENTANA ABIERTA',540,1440,pu*(1-ra),C.green);
 labelTag('✕ NO ENCIMA DEL RADIADOR',540,1440,ra,C.red);};
