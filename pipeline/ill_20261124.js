// ===== Escenas: descongelar la carne en la encimera (2026-11-24) · kit en ill32.js (usa frozenPack/juicePuddle/qMarks de ill14.js, fridge de ill2.js, bigThermo/lens de ill28.js, wallClock/microwave de ill5.js) =====
function dcP(o){return Object.assign({x:520,y:1200,shirt:'#3d7bff'},o);}
const DC_PL=[740,1176]; // plato sobre la encimera
function dcGerms(cx,cy,w,h,t,n,t0,seed=0,r=14){for(let i=0;i<n;i++){const x=cx-w/2+rnd(i+seed)*w,y=cy-h/2+rnd(i+seed+40)*h;germ(x,y,r+rnd(i+seed+7)*5,t,i,ease(E(t,t0+i*0.15,0.35)));}}
// gancho: saca la carne del congelador y la deja en la encimera «para que esté lista antes»; reloj corriendo; aparecen bacterias
ILL.dc_gancho=(c,t)=>{const s=c._s,M=c._m;const dj=(M.dej||s+0.2)-0.1;const mv=ease(E(t,dj,1.0));const placed=t>dj+1.0;const rel=ease(E(t,dj+1.05,0.5));
 const an=M.ant?E(t,M.ant-0.3,0.5):0;const ar=M.arr?E(t,M.arr-0.3,0.5):0;
 g.save();camLerp(t,s,4,[1.15,520,1000],[1.24,560,990]);kitchen(t);fridge(70,560,t,0,1);if(an>0)wallClock(880,690,58,t,0.2+an*1.8);
 const pk=[lerp(260,DC_PL[0],mv),lerp(760,DC_PL[1]-40,mv)-90*Math.sin(mv*Math.PI)];
 const hand=placed?[lerp(DC_PL[0]-40,430,rel),lerp(DC_PL[1]-50,1150,rel)]:[pk[0]-50,pk[1]+10];
 const o=dcP({lh:[430,1150],rh:hand,look:placed?(ar>0.5?[0,0.1]:[0.7,0.5]):[-0.6,-0.3],mouth:ar>0.5?'worry':'smile',brow:ar>0.5?1:0});
 person(o,t);counterFront();plate(DC_PL[0],DC_PL[1]-4,1.5);
 frozenPack(pk[0],pk[1],0.8,0.04,{ice:placed?1-0.6*E(t,dj+1.2,3):1,drip:placed?E(t,dj+1.6,1.5):0,t});
 if(placed)juicePuddle(DC_PL[0],DC_PL[1]-2,140,0.7*E(t,dj+2,1.5));
 hands(o);
 if(ar>0)dcGerms(DC_PL[0],DC_PL[1]-60,220,90,t,8,M.arr-0.2);
 g.restore();
 labelTag('«ASÍ ESTÁ ANTES»',540,660,an*(1-ar),C.amber);};
// pregunta temprana: señala la carne en la encimera
ILL.dc_pregunta=(c,t)=>{const s=c._s,M=c._m;const sh=M.q?ease(E(t,M.q-0.2,0.5)):0;const pt=ease(E(t,s+0.2,0.6));
 g.save();cam(1.4,620,980);kitchen(t);fridge(70,560,t,0,1);
 const o=dcP({rh:[lerp(700,700,pt),lerp(1150,1090,pt)],lh:[lerp(430,420,sh),lerp(1150,1000,sh)],look:[0,0.1],mouth:'smile',brow:sh>0.5?1:0});
 person(o,t);counterFront();plate(DC_PL[0],DC_PL[1]-4,1.5);frozenPack(DC_PL[0],DC_PL[1]-40,0.8,0.04,{ice:0.45,drip:1,t});juicePuddle(DC_PL[0],DC_PL[1]-2,140,0.7);hands(o);g.restore();
 qMarks(560,760,t,sh);};
// fuente: termómetro con la franja de 5 a 65 °C; las bacterias se multiplican dentro de la franja
ILL.dc_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const ap=ease(E(t,s+0.1,0.5));
 const en=M.ent?E(t,M.ent-0.1,1.2):0;const rp=M.rep?M.rep:s+5;
 g.save();g.globalAlpha=ap;const yv=bigThermo(330,1390,470,lerp(-10,25,ease(E(t,s+0.3,1.5))),{lo:-20,hi:80,step:10,labels:[]});
 tempBand(330,yv,5,65,en,C.red,{w:150,loT:'5 °C',hiT:'65 °C'});g.restore();
 // filete y bacterias a la derecha
 frozenPack(740,1150,1.15,0,{ice:0.3,drip:0.8,t});
 const n=t>rp-0.3?4+Math.min(12,Math.floor((t-rp+0.3)*7)):(en>0.9?4:0);
 const SP=[[-90,-120],[60,-170],[120,-90],[-40,-210],[-130,-40],[20,-60],[150,-200],[-100,-170],[90,-30],[-10,-140],[170,-130],[-150,-110],[40,-240],[-60,-80],[130,-250],[0,-190]];
 for(let i=0;i<n;i++){const [dx,dy]=SP[i];const tl=i<4?(M.ent||s)+1+i*0.1:rp-0.3+(i-4)/7;germ(740+dx,1120+dy,20,t,i,ease(E(t,tl,0.3)),i<4?0:cl(1-E(t,tl,0.3))*0.4);}
 labelTag('SE REPRODUCEN MÁS RÁPIDO',540,1470,M.rep?E(t,M.rep-0.1,0.4):0,C.red);};
// mecanismo: corte del filete en la encimera — fuera se descongela y suelta agua con bacterias; dentro sigue helado
ILL.dc_capas=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.2)';g.fillRect(0,470,W,1150);
 const ap=ease(E(t,s,0.5));const su=M.sup?ease(E(t,M.sup-0.2,1.6)):0;const ag=M.agu?E(t,M.agu-0.3,0.6):0;const bc=M.bac||s+99;const ce=M.cen?E(t,M.cen-0.2,0.5):0;
 g.save();g.globalAlpha=ap;g.translate(540,1060);g.scale(lerp(0.8,1,ap),lerp(0.8,1,ap));meatSection(0,0,720,380,su,{wet:ag,t});g.restore();
 // bacterias en el borde (zona descongelada)
 if(t>bc-0.3){const n=Math.min(14,3+Math.floor((t-bc+0.3)*6));for(let i=0;i<n;i++){const a=-2.6+i*(2.2/13)+(i%2?0.08:-0.08);const R=1+0.04*(i%3);const x=540+Math.cos(a)*360*R*0.97,y=1060+Math.sin(a)*190*R*0.97;const tl=bc-0.3+i/6;germ(x,y,18,t,i,ease(E(t,tl,0.3)),cl(1-E(t,tl,0.3))*0.4);}}
 if(ce>0){g.save();g.strokeStyle=C.blue;g.lineWidth=6;g.globalAlpha=cl(ce*3)*(0.7+0.3*Math.sin(t*6));const k=cl(1-su*0.62);g.beginPath();g.ellipse(540,1068,360*k+16,190*k+14,0,0,7);g.stroke();g.restore();}
 labelTag(ag>0?'💧 CAPA DE AGUA: LES ENCANTA':'FUERA: SE DESCONGELA PRIMERO',540,700,Math.max(su>0?E(t,M.sup,0.4):0,ag),ag>0?C.red:C.amber);
 labelTag('❄ DENTRO: AÚN HELADA',540,1420,ce,C.blue);};
// qué hacer: a la nevera la noche antes, en un plato
ILL.dc_nevera=(c,t)=>{const s=c._s,M=c._m;const nv=(M.nev||s+0.3);const op=ease(E(t,nv-0.4,0.6));const t0=(M.pla||s+2.5)-0.6;const mv=ease(E(t,t0,1.0));const placed=t>t0+1.0;const back=ease(E(t,t0+1.05,0.5));
 const FX=70,FY=560;const SH=[220,FY+450];
 g.save();camLerp(t,s,5,[1.25,360,960],[1.32,330,980]);kitchen(t);fridge(FX,FY,t,op,1);
 const pk=[lerp(560,SH[0],mv),lerp(1100,SH[1]-30,mv)-50*Math.sin(mv*Math.PI)];
 const hand=placed?[lerp(SH[0]+70,560,back),lerp(SH[1]-40,1150,back)]:[pk[0]+60,pk[1]+4];
 const o=dcP({x:560,lh:hand,rh:[700,1150],look:[-0.9,0.1],mouth:'smile'});
 person(o,t);counterFront();
 plate(pk[0],pk[1]+26,1.45);frozenPack(pk[0],pk[1],0.72,0,{ice:0.9,t});hands(o);
 if(M.fri&&t>M.fri-0.2){for(let i=0;i<5;i++)flake(110+i*50,SH[1]-90+(i%2)*20,11,t+i);}
 g.restore();
 labelTag('🌙 LA NOCHE ANTES',540,660,M.noc?E(t,M.noc-0.1,0.4):0,C.blue);
 labelTag('✓  EN LA NEVERA, EN UN PLATO',540,1440,M.pla?E(t,M.pla,0.4):0,C.green);};
// con prisa: microondas (descongelar) y a la sartén enseguida
ILL.dc_prisa=(c,t)=>{const s=c._s,M=c._m;const k2=(M.coc||s+3)-0.3;const stg=t<k2?1:2;const mi=M.mic?E(t,M.mic-0.2,0.4):0;
 g.save();
 if(stg===1){camLerp(t,s,Math.max(1,k2-s),[1.35,700,980],[1.42,720,990]);kitchen(t,{stove:false});
  const o=dcP({x:470,rh:[lerp(600,560,mi),lerp(1150,1060,mi)],lh:[400,1150],look:[0.8,0.3],mouth:'o',brow:1});person(o,t);counterFront();
  microwave(800,1178,1.5,t,mi>0.5?1:0);if(mi>0.5){g.save();g.beginPath();g.rect(656,1004,210,153);g.clip();frozenPack(758,1118,0.48,0,{ice:lerp(0.9,0.2,E(t,M.mic,2)),t});g.restore();}hands(o);}
 else{camLerp(t,k2,2.5,[1.3,760,1010],[1.36,770,1010]);kitchen(t);
  const st=Math.sin(t*5);const o=dcP({x:560,rh:[820+st*30,1060+Math.cos(t*5)*8],lh:[450,1150],look:[0.8,0.5],mouth:'smile'});person(o,t);
  pan(830,1150,1,t,1);steakInPan(830,1150,1,ease(E(t,k2+0.2,2)));steam(830,1080,t,ease(E(t,k2+0.6,0.8)));counterFront();hands(o);}
 g.restore();
 labelTag('¿CON PRISA? MICROONDAS',540,660,mi*(stg===1?1:0),C.amber);
 labelTag('🔥 Y A COCINARLA ENSEGUIDA',540,660,stg===2?E(t,k2,0.4):0,C.green);};
