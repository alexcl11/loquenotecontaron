// ===== Escenas: el hielo del congelador (2026-11-16) · kit en ill24.js (usa kitchen/person de ill.js, fridgeLow/frozenPack/qMarks de ill14.js, wallSocket de ill8.js, lens de ill11.js, coin de ill2.js, costMeter de ill5.js, cloth de ill4.js, scr de ill_20261029.js) =====
const ES_FX=60,ES_FY=740; // nevera baja: congelador en x 74–346, y 754–930; frigorífico debajo (y 954–1366)
const ES_SK=[455,1075];   // enchufe en los azulejos, entre la nevera y el personaje
function esP(o){return Object.assign({x:620,y:1200,shirt:'#8b7cf6'},o);}
// nevera con el congelador lleno de hielo (grosor th) y comida dentro; open = frigorífico abierto; packIn=false si el paquete está fuera
function esFrzIn(){const gr=g.createLinearGradient(0,ES_FY+14,0,ES_FY+190);gr.addColorStop(0,'#3a6496');gr.addColorStop(1,'#25466e');g.fillStyle=gr;rr(ES_FX+14,ES_FY+14,272,176,10);g.fill();}
function esFridge(t,th,o={}){fridgeLow(ES_FX,ES_FY,t,o.open||0,0);esFrzIn();
 if(o.packIn!==false)frozenPack(ES_FX+150,ES_FY+140,0.6,0.03,{ice:0.9,t});
 if(o.tup!==false)frozenPack(ES_FX+95,ES_FY+92,0.45,-0.05,{ice:0.9,t});
 iceLayer(ES_FX+14,ES_FY+14,272,176,th,t,{hl:o.hl||0});}
// cable de la nevera al enchufe (plug 1 = enchufado; si no, el enchufe macho va en (px,py))
function esCable(plug,px,py){g.strokeStyle='#e0e3ea';g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(ES_FX+300,1150);
 if(plug)g.quadraticCurveTo(410,1170,ES_SK[0],ES_SK[1]+6);else g.quadraticCurveTo(400,1175,px,py+14);g.stroke();
 const q=plug?[ES_SK[0],ES_SK[1]]:[px,py];g.fillStyle='#f4f6fb';rr(q[0]-17,q[1]-20,34,40,10);g.fill();g.fillStyle='#d6dce6';rr(q[0]-17,q[1]+8,34,12,[0,0,10,10]);g.fill();}
function esKitchen(t,o,th,fo={},plug=1,pp){kitchen(t,{stove:false});wallSocket(ES_SK[0],ES_SK[1],0);counterFront();esFridge(t,th,fo);esCable(plug,pp&&pp[0],pp&&pp[1]);if(o)person(o,t);}
// gancho: enseña orgulloso el congelador lleno de hielo («así enfría más») → error: gasta más
ILL.es_gancho=(c,t)=>{const s=c._s,M=c._m;const pt=ease(E(t,s+0.3,0.6));const er=M.err?E(t,M.err-0.15,0.4):0;
 g.save();camLerp(t,s,4,[1.12,470,1010],[1.3,410,1000]);
 const o=esP({x:600,lh:[lerp(560,380,pt),lerp(1150,860,pt)],rh:[760,1150],look:er>0.5?[0,0.1]:[-0.8,-0.3],mouth:er>0.5?'o':'smile',brow:er>0.5?1:0});
 esKitchen(t,o,30,{hl:er});hands(o);
 g.restore();
 labelTag('«ASÍ ENFRÍA MÁS» 🧊',540,650,E(t,(M.asi||s+1)-0.2,0.4)*(1-er),C.amber);};
// pregunta temprana: se encoge de hombros junto al congelador
ILL.es_pregunta=(c,t)=>{const s=c._s,M=c._m;const sh=ease(E(t,s+0.1,0.5));
 g.save();cam(1.4,450,1000);
 const o=esP({x:600,lh:[lerp(560,470,sh),lerp(1150,1010,sh)],rh:[lerp(760,770,sh),lerp(1150,1010,sh)],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 esKitchen(t,o,30);hands(o);const [hx,hy]=scr(600,840);g.restore();qMarks(hx,hy-30,t,sh);};
// fuente: lupa sobre la pared del congelador; el hielo crece hasta 3 mm (regla) → hasta un 30 % de ahorro
ILL.es_regla=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const ap=E(t,s+0.15,0.5);
 const gr=M.mm?ease(E(t,M.mm-1.2,1.3)):ease(E(t,s+0.5,1.5));const PX=36; // 36 px = 1 mm
 const LX=540,LY=1065,R=205;
 lens(LX,LY,R,ap,(Rr)=>{g.fillStyle='#1a3456';g.fillRect(LX-Rr,LY-Rr,2*Rr,2*Rr);
  // pared del congelador arriba y el hielo que cuelga
  const wy=LY-130;g.fillStyle='#aab4c4';g.fillRect(LX-Rr,LY-Rr,2*Rr,wy-(LY-Rr));g.fillStyle='#8592a6';g.fillRect(LX-Rr,wy-10,2*Rr,10);txt('PARED',LX-40,wy-26,24,'#2a3040',900,'center',1,200);
  const th=3*PX*gr;if(th>1){g.fillStyle='rgba(222,239,255,0.96)';g.beginPath();g.moveTo(LX-Rr,wy);
   for(let i=0;i<=24;i++){const xx=LX-Rr+i*(2*Rr/24);g.lineTo(xx,wy+th*(0.92+0.08*Math.sin(i*1.7)));}g.lineTo(LX+Rr,wy);g.closePath();g.fill();
   g.strokeStyle='rgba(255,255,255,0.9)';g.lineWidth=4;g.lineCap='round';for(let i=0;i<5;i++){const xx=LX-150+i*60;g.beginPath();g.moveTo(xx,wy+th*0.3);g.lineTo(xx+26,wy+th*0.3);g.stroke();}}
  mmRuler(LX+90,wy,PX,6,gr>0.98?3:0,1);
  for(let i=0;i<4;i++)flake(LX-160+i*65,LY+90+(i%2)*40,12,t+i);});
 const v=M.mm?E(t,M.mm-0.1,0.4):0;
 if(v>0){g.save();g.globalAlpha=cl(v*2);g.strokeStyle=C.red;g.lineWidth=5;const y0=LY-130,y1=y0+3*PX;g.beginPath();g.moveTo(LX-30,y0);g.lineTo(LX-50,y0);g.lineTo(LX-50,y1);g.lineTo(LX-30,y1);g.stroke();g.restore();
  pillDraw('3 mm',LX-150,LY-130+1.5*PX,C.red,'#fff',34,cl(v*3),eob(v));}};
// mecanismo: el hielo es aislante, hace de abrigo y el frío llega peor a la comida
ILL.es_aislante=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const ap=ease(E(t,s,0.5));const ic=M.hie?ease(E(t,M.hie-0.3,1.2)):0;const ai=M.ais?E(t,M.ais-0.1,0.4):0;const ab=M.abr?E(t,M.abr-0.15,0.4):0;const ll=M.lle?E(t,M.lle-0.3,0.6):0;
 g.save();g.globalAlpha=cl(ap*2);g.translate(540,1050);g.scale(lerp(0.9,1,ap),lerp(0.9,1,ap));g.translate(-540,-1050);
 freezerCut(200,720,680,640,t,{ice:46*ic,block:Math.max(ic*0.6,ll),cold:1,knit:ab*(1-ll*0.7),hl:ai*(1-ab),warm:ll*0.6});g.restore();
 labelTag(ab>0?'COMO UN ABRIGO 🧥':'EL HIELO ES AISLANTE',540,650,Math.max(ai,ab)*(1-ll),ab>0?C.amber:C.blue);
 labelTag('EL FRÍO LLEGA PEOR A LA COMIDA',540,650,ll,C.red);};
// le cuesta más enfriar → el motor trabaja más y se nota en la factura
ILL.es_factura=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const cu=M.cue?E(t,M.cue-0.2,0.5):E(t,s+0.3,0.5);const fa=M.fac?E(t,M.fac-0.3,0.5):0;
 g.save();g.translate(430,1010);g.scale(0.78,0.78);g.translate(-430,-1010);
 freezerCut(90,640,680,640,t,{ice:46,block:1,cold:1,warm:0.3});g.restore();
 compressor(430,1470,1.4,t,cu);
 costMeter(860,1300,520,0.25+0.75*cu,mixc('#f2a33a','#e5484d',cu));
 if(fa>0){for(let i=0;i<5;i++){const ph=(t*0.7+i/5)%1;g.save();g.globalAlpha=fa*Math.sin(ph*Math.PI);coin(820+((i%2)?50:-30),760+ph*480,1,t*3+i);g.restore();}}
 labelTag('LE CUESTA MÁS ENFRIAR',540,650,cu*(1-fa),C.amber);
 labelTag('…Y LO PAGAS EN LA FACTURA 💸',540,650,fa,C.red);};
// qué hacer: desenchufar, pasar la comida a la nevera y dejar que el hielo se derrita solo
ILL.es_descongelar=(c,t)=>{const s=c._s,M=c._m;const d0=(M.des||s+0.6);const pu=ease(E(t,d0-0.5,0.6));const unp=t>d0-0.05;const back=ease(E(t,d0+0.3,0.5));
 const c0=M.com||d0+1.5;const op=ease(E(t,c0-0.4,0.4));const mv=ease(E(t,c0-0.1,0.9));const back2=ease(E(t,c0+0.9,0.5));
 const r0=M.der||c0+1.5;const mel=ease(E(t,r0-0.3,2.6));
 g.save();camLerp(t,s,3,[1.2,430,990],[1.22,420,1000]);
 // mano izquierda: enchufe → vuelve → paquete del congelador a la nevera → vuelve
 const PK0=[ES_FX+150,ES_FY+140],PK1=[ES_FX+150,ES_FY+390];
 let lh,pkPos=null;
 if(t<c0-0.4){const sk=[ES_SK[0]+4,ES_SK[1]+6];lh=unp?[lerp(sk[0],560,back),lerp(sk[1]+30*cl(back*3),1150,back)]:[lerp(560,sk[0],pu),lerp(1150,sk[1],pu)];}
 else if(back2<=0){const k=ease(E(t,c0-0.4,0.3));const from=[560,1150];lh=mv<=0?[lerp(from[0],PK0[0]+40,k),lerp(from[1],PK0[1],k)]:[lerp(PK0[0]+40,PK1[0]+40,mv),lerp(PK0[1],PK1[1],mv)];if(mv>0)pkPos=[lh[0]-40,lh[1]];}
 else{lh=[lerp(PK1[0]+40,560,back2),lerp(PK1[1],1150,back2)];pkPos=PK1;}
 const o=esP({x:600,lh,rh:[760,1150],look:t<c0-0.4?[-0.6,0.3]:[-0.8,-0.2],mouth:'smile'});
 kitchen(t,{stove:false});wallSocket(ES_SK[0],ES_SK[1],0);counterFront();
 fridgeLow(ES_FX,ES_FY,t,op,0);esFrzIn();
 if(op>0.3){g.fillStyle='#e5484d';rr(ES_FX+190,ES_FY+300,70,44,10);g.fill();g.fillStyle='#f4c95d';rr(ES_FX+40,ES_FY+460,90,50,10);g.fill();}
 frozenPack(ES_FX+95,ES_FY+92,0.45,-0.05,{ice:0.9*(1-mel),t});
 if(!pkPos)frozenPack(PK0[0],PK0[1],0.6,0.03,{ice:0.9,t});
 iceLayer(ES_FX+14,ES_FY+14,272,176,30*(1-mel),t);
 // gotas y paño en el suelo del congelador
 if(mel>0&&mel<1){for(let i=0;i<6;i++){const ph=(t*1.3+i/6)%1;const dx=ES_FX+40+i*44;g.save();g.globalAlpha=Math.sin(ph*Math.PI)*cl(mel*4)*(1-mel*0.6);g.fillStyle='#8fd0ff';g.beginPath();g.ellipse(dx,ES_FY+40+ph*130,5,8,0,0,7);g.fill();g.restore();}}
 if(mel>0){g.save();g.globalAlpha=cl(mel*3);cloth(ES_FX+150,ES_FY+178,'#5bb0ff');g.restore();}
 person(o,t);
 if(unp){const hp=(t<c0-0.4&&back<1)?[o._hands[0][0],o._hands[0][1]+6]:[560,1160];esCable(0,hp[0],hp[1]);}else esCable(1);
 if(pkPos)frozenPack(pkPos[0],pkPos[1],0.6,0.03,{ice:0.9,t});
 hands(o);
 g.restore();
 const st=t<c0-0.3?1:(t<r0-0.3?2:3);const txtS=['','1 · DESENCHÚFALO 🔌','2 · LA COMIDA, A LA NEVERA','3 · QUE EL HIELO SE DERRITA SOLO 💧'][st];
 labelTag(txtS,540,650,st===1?E(t,d0-0.6,0.4):1,st===3?C.green:C.amber);};
