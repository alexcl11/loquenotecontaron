// ===== Escenas: persianas y cortinas por la noche (2026-11-09) · kit en ill17.js (usa cfSalon/cfP/scr de ill_20261029.js, salonWin/heatFlow/wallChill/fogGlass de ill13.js, blind de ill6.js) =====
const PR_STRAP=[300,612,1080];
// salón de noche con radiador, ventana, persiana (down), cortina (cl) y cinta. Devuelve el agarre de la cinta
function prSalon(t,o={}){cfSalon(t,{temp:21,heat:o.heat??0.7,lamp:o.lamp??1});
 if(o.day){winDay(VW[0],VW[1],VW[2],VW[3],t,o.sun??1);}else{salonWin(t,{snow:0.5});winPanes(VW[0],VW[1],VW[2],VW[3],t,(a,b,c,d)=>winterOut(a,b,c,d,t,0.6));if(o.fog)fogGlass(VW[0],VW[1],VW[2],VW[3],o.fog,t);}
 if(o.chill)wallChill(155,740,o.chill,t,170);
 winBlind(VW[0],VW[1],VW[2],VW[3],o.down||0);
 const gp=blindStrap(PR_STRAP[0],PR_STRAP[1],PR_STRAP[2],o.grip??0.6);
 curtain(40,575,230,340,o.cl||0,t,'#b4473f');return gp;}
function prStand(o){return Object.assign({x:430,y:1160,apron:false,shirt:'#3d7bff'},o);}
function prDim(a=0.66){g.fillStyle=`rgba(6,10,20,${a})`;g.fillRect(0,470,W,1150);}
ILL.pr_fondo=(c,t)=>{g.save();cam(1.05,420,1000);prSalon(t,{heat:0.6});sofa(...SOFA);g.restore();prDim();};
// gancho: de noche, persiana subida y calor saliendo por el cristal; en el sofá, «total, no cambia nada»
ILL.pr_gancho=(c,t)=>{const s=c._s,M=c._m;const ca=M.cam?E(t,M.cam-0.2,0.5):0;
 g.save();camLerp(t,s,5,[1.25,360,960],[1.4,330,950]);
 prSalon(t,{heat:0.8,chill:0.4+0.4*ca});
 heatFlow(430,960,160,740,t,0.55+0.45*ca,6);
 const shrug=M.tot?Math.sin(Math.PI*E(t,M.tot-0.1,1.0)):0;
 const o=cfP({x:520,y:1262,shirt:'#c0504d',lh:[440,1160-60*shrug],rh:[610,1160-60*shrug],look:ca>0.5?[-0.7,-0.2]:[0,0.1],mouth:ca>0.5?'o':'smile',brow:ca>0.5?1:0});
 person(o,t);scarf(o,t,'#3d7bff');hands(o);sofa(...SOFA);
 const [wx,wy]=scr(VW[0]+VW[2],VW[1]+30);g.restore();
 labelTag('PERSIANA SUBIDA',Math.min(wx+170,850),wy,E(t,s+0.4,0.4),C.blue);
 labelTag('«TOTAL, NO CAMBIA NADA»',700,1370,M.tot?E(t,M.tot,0.4)*(1-E(t,(M.cam||s+99)-0.3,0.3)):0,C.amber);};
// pregunta temprana: de pie junto a la ventana, con la cinta en la mano, mira a cámara
ILL.pr_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s+0.1,0.6));
 g.save();cam(1.45,320,930);
 const gp=prSalon(t,{heat:0.7,grip:0.9});
 const o=prStand({x:440,lh:[lerp(360,gp[0]+6,up),lerp(1090,gp[1],up)],rh:[560,1100],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);hands(o);sofa(...SOFA);g.restore();};
// mecanismo: el cristal se queda frío y el calor del salón se escapa por ahí
ILL.pr_escapa=(c,t)=>{const s=c._s,M=c._m;const fr=M.cri?ease(E(t,M.cri-0.3,1.2)):0.15;const es=M.esc?E(t,M.esc-0.3,0.6):0;
 g.save();camLerp(t,s,6,[1.35,260,900],[1.6,190,860]);
 prSalon(t,{heat:0.85,chill:fr,fog:0.25*fr});
 heatWaves(150,1090,180,t,0.8);
 heatFlow(150,1080,150,700,t,0.25+0.75*es,6);heatFlow(420,880,170,760,t,es*0.9,5);
 for(let i=0;i<6;i++){const ph=(t*0.5+rnd(i))%1;flake(VW[0]+20+rnd(i+3)*170,VW[1]+ph*240,7,t+i);}
 const [gx,gy]=scr(VW[0]+VW[2]/2,VW[1]),[rx,ry]=scr(150,1100);g.restore();
 labelTag('❄  CRISTAL FRÍO',Math.max(gx+60,330),Math.max(gy-40,620),M.cri?E(t,M.cri,0.4):0,C.blue);
 labelTag('🔥 EL CALOR SE ESCAPA',Math.min(rx+300,760),Math.min(ry+150,1450),es,C.red);};
// qué hacer: al anochecer, baja la persiana y corre la cortina; el calor se queda dentro
ILL.pr_bajar=(c,t)=>{const s=c._s,M=c._m;const kb=(M.baj||s+0.5)-0.2,kc=(M.cor||s+2.5)-0.3;
 const dn=ease(E(t,kb,1.2)),cl0=E(t,kc+0.2,1.0);const hold=t<kc+0.1;
 g.save();camLerp(t,s,6,[1.3,330,930],[1.25,360,950]);
 const gp=prSalon(t,{heat:0.8,down:dn,cl:cl0,grip:lerp(0.75,0.15,dn)});
 const out=(1-dn)*0.9;heatFlow(430,960,160,740,t,out,6);
 heatBack(270,640,260,t,dn*(M.evi?E(t,M.evi-0.6,0.5):dn>0.95?0.6:0),1);
 const reach=hold?ease(E(t,s,0.4)):ease(E(t,kc,0.4));
 const lh=hold?[lerp(360,gp[0]+6,reach),lerp(1090,gp[1],reach)]:[lerp(gp[0]+6,lerp(150,250,1-cl0),reach),lerp(gp[1],960,reach)];
 const o=prStand({x:440,lh,rh:[560,1100],look:[-0.7,-0.2],mouth:'smile'});
 person(o,t);hands(o);sofa(...SOFA);
 const [wx,wy]=scr(VW[0]+VW[2],VW[1]+20);g.restore();
 labelTag('1 · BAJA LA PERSIANA',760,650,E(t,kb,0.4),C.amber);
 labelTag('2 · CORRE LA CORTINA',760,735,E(t,kc,0.4),C.amber);
 if(M.evi){labelTag('IDAE: «EVITARÁ IMPORTANTES',540,1365,E(t,M.evi-0.1,0.4),C.green);labelTag('PÉRDIDAS DE CALOR»',540,1440,E(t,M.evi,0.4),C.green);}};
// y de día, si da el sol, súbela: ese calor entra gratis
ILL.pr_sol=(c,t)=>{const s=c._s,M=c._m;const up=M.sub?ease(E(t,M.sub-0.2,1.0)):0;const sun=M.sol?E(t,M.sol-0.3,0.6):0.3;const gr=M.gra?E(t,M.gra-0.2,0.6):0;
 g.save();camLerp(t,s,5,[1.15,380,980],[1.22,360,990]);
 prSalon(t,{heat:0.2,lamp:0,day:1,sun,down:1-up,cl:0,grip:lerp(0.15,0.75,up)});
 g.fillStyle=`rgba(255,230,170,${0.10*up})`;g.fillRect(-600,300,2300,1500);
 sunBeam(258,612,258,868,330,1420,40,1340,up*sun,t);sunPatch(190,1380,360,70,up*sun,t);
 heatWaves(190,1330,260,t,gr*0.9);
 const o=cfP({x:520,y:1262,shirt:'#2fa58f',lh:[440,1160],rh:[610,1160],look:[-0.6,-0.2],mouth:'smile'});person(o,t);hands(o);sofa(...SOFA);
 g.restore();
 labelTag('☀  DE DÍA, SÚBELA',760,650,M.sub?E(t,M.sub-0.3,0.4):0,C.amber);
 labelTag('CALOR GRATIS',540,1450,gr,C.green);};
