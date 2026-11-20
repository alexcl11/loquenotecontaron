// ===== Escenas: la tarifa regulada no es siempre la más cara (2026-11-23) · kit en ill31.js (usa kitchen/person de ill.js, billSheet de ill10.js, bigPhone de ill12.js, houseFront/smartphone de ill4.js, qMarks de ill14.js, coinsFrom/scr de ill_20261029.js, costMeter de ill5.js) =====
function trP(o){return Object.assign({x:420,y:1240,apron:false,shirt:'#8b7cf6'},o);}
// mano que sujeta una tarjeta por la esquina inferior (lado 'L' = esquina izquierda, 'R' = derecha)
function trGrip(x,y,s,side){return [x+(side==='R'?92:-92)*s,y+128*s];}
// gancho: suelta la tarjeta de la regulada «porque es la más cara» y coge la del libre… que cuesta más (monedas que salen)
ILL.tr_gancho=(c,t)=>{const s=c._s,M=c._m;const ps=M.pas?ease(E(t,M.pas-0.1,0.6)):ease(E(t,s+0.3,0.6));const cr=M.car?E(t,M.car-0.1,0.4):0;const pc=M.pc?E(t,M.pc-0.15,0.4):0;
 g.save();camLerp(t,s,5,[1.15,540,1040],[1.25,540,1020]);kitchen(t,{stove:false});
 const rx=lerp(700,860,ps),ry=lerp(960,1120,ps),rrot=lerp(0.04,0.5,ps);const lx=lerp(150,230,ps),ly=lerp(1120,950,ps);
 const o=trP({rh:trGrip(rx,ry,0.95,'L'),lh:trGrip(lx,ly,0.95,'R'),look:pc>0?[0,0.1]:[ps>0.5?-0.8:0.8,0.3],mouth:pc>0.5?'o':'smile',brow:pc>0.5?1:0});
 person(o,t);
 tariffCard(rx,ry,0.95,rrot,{kind:'reg',dim:ps});tariffCard(lx,ly,0.95,lerp(-0.3,-0.04,ps),{kind:'libre',hl:pc,t});
 hands(o);counterFront();const [cx,cy]=scr(lx,ly-60);g.restore();
 labelTag('«LA REGULADA ES LA MÁS CARA»',540,650,E(t,s+0.2,0.4)*(1-pc),C.amber);
 labelTag('PUEDE QUE PAGUES MÁS',540,650,pc,C.red);
 if(M.pc){coinsFrom(cx,cy,t,M.pc-0.1,8,930,1180);costMeter(985,1330,300,E(t,M.pc-0.2,1.2),C.red);}};
// pregunta temprana: una tarjeta en cada mano; sube la que nombra la voz
ILL.tr_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.5));const rg=M.reg?E(t,M.reg-0.15,0.3):0,lb=M.lib?E(t,M.lib-0.15,0.3):0;
 const kr=rg*(1-lb),kl=lb;
 g.save();cam(1.22,540,1000);kitchen(t,{stove:false});
 const rx=720,ry=lerp(1000,930,up)-50*kl,lx=360-200,ly=lerp(1000,930,up)-50*kr;
 const o=trP({rh:trGrip(rx,ry,0.9,'L'),lh:trGrip(lx+40,ly,0.9,'R'),look:[kl>0.5?0.8:(kr>0.5?-0.8:0),0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);tariffCard(lx+40,ly,0.9,-0.06,{kind:'reg',hl:kr,t});tariffCard(rx,ry,0.9,0.06,{kind:'libre',hl:kl,t});hands(o);counterFront();
 const [hx,hy]=scr(o.x,860);g.restore();
 if(M.q)qMarks(hx,hy-40,t,E(t,M.q,0.4));};
// columnas de monedas (OCU, mayo 2026, 4,6 kW y 3.500 kWh/año). c.stage: 1 = PVPC · 2 = + mediana · 3 = + la más cara · 4 = + la mejor fija
const TR_COLS=[{x:205,v:659,val:'659 €',lab:'MEJOR FIJA\nDEL LIBRE',col:'#3ecf6e',tag:'−7 %',tc:C.green,st:4},
 {x:425,v:708,val:'708 €',lab:'REGULADA\nPVPC',col:'#b3a8ff',st:1},
 {x:645,v:813,val:'813 €',lab:'MEDIANA\nDEL LIBRE',col:'#8fb3ff',tag:'+15 %',tc:C.red,st:2},
 {x:865,v:1027,val:'1.027 €',lab:'LA MÁS CARA\nANALIZADA',col:'#ff9a9d',tag:'+45 %',tc:C.red,st:3}];
ILL.tr_cols=(c,t)=>{const s=c._s,M=c._m;const st=c.stage||1;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const YB=1370,HM=440;
 TR_COLS.forEach(k=>{if(k.st>st)return;const now=k.st===st;const g0=now?(M.g?M.g-0.3:s+0.4):-99;const p=now?E(t,g0,1.0):1;
  const tk=k.tag?(now?(M.pc?E(t,M.pc-0.15,0.4):0):1):0;const dk=st===4?(M.bar?E(t,M.bar-0.1,0.5):1):0;const dim=k.st!==4&&k.st!==1?1-0.45*dk:1;
  coinCol(k.x,YB,120,HM*k.v/1027,p,t,{val:k.val,lab:k.lab,col:k.col,tag:k.tag,tagCol:k.tc,tk,a:now?cl(p*4+0.2):dim,crown:k.st===4&&M.cr?E(t,M.cr-0.1,0.5):0});});
 if(st===1){const hg=M.hog?E(t,M.hog-0.2,0.5):0;labelTag('🏠 4,6 kW · 3.500 kWh AL AÑO',540,905,hg,C.blue);}
 else labelTag('OCU · MAYO 2026 · COSTE AL AÑO',540,650,E(t,s,0.3),C.blue);
 if(st===4){const rb=M.reg?E(t,M.reg-0.1,0.4):0;labelTag('LA REGULADA TAMPOCO ES LA MÁS BARATA',540,740,rb,C.amber);}};
// la cuenta: factura en la mano, 813 − 708 = 105 € más al año (salen monedas)
ILL.tr_cuenta=(c,t)=>{const s=c._s,M=c._m;const a1=M.a?E(t,M.a-0.1,0.4):0,b1=M.b?E(t,M.b-0.1,0.4):0,r1=M.r?E(t,M.r-0.1,0.4):0;
 g.save();camLerp(t,s,4,[1.2,560,1030],[1.3,600,1010]);kitchen(t,{stove:false});
 const o=trP({lh:[330,1165],rh:[598,1090],look:r1>0.5?[0,0.1]:[1,0.4],mouth:r1>0.5?'worry':'flat',brow:r1>0.5?1:0});
 person(o,t);billSheet(690,960,0.95,0.05,{rows:3,hl:r1>0?2:null,hk:r1});hands(o);counterFront();const [bx,by]=scr(690,900);g.restore();
 if(a1>0){g.save();g.globalAlpha=cl(a1*2);g.fillStyle='rgba(6,10,20,0.7)';rr(150,600,780,150,30);g.fill();g.restore();}
 txt('813 €',330,675,64,'#8fb3ff',900,'center',a1);txt('−',450,675,64,'#fff',900,'center',b1);txt('708 €',580,675,64,'#b3a8ff',900,'center',b1);
 txt('=',705,675,64,'#fff',900,'center',r1);txt('105 €',830,675,64,C.red,900,'center',r1);
 labelTag('MÁS AL AÑO, POR NO COMPARAR',540,1440,r1>0?E(t,M.r+0.4,0.4):0,C.red);
 if(M.r){coinsFrom(bx,by,t,M.r,8,880,1400);costMeter(985,1330,300,E(t,M.r-0.1,1.2),C.red);}};
// qué hacer: mirar el consumo en la factura y compararlo en el móvil (las ofertas se ordenan y se marca la más barata)
ILL.tr_comparar=(c,t)=>{const s=c._s,M=c._m;const fa=M.fac?E(t,M.fac-0.2,0.4):0;const ph=M.cmp?E(t,M.cmp-0.9,0.9):0;const so=M.cmp?E(t,M.cmp,1.2):0;const hl=M.cn?E(t,M.cn+0.3,0.5):0;
 g.save();camLerp(t,s,1.6,[1.2,560,1030],[1.32,600,1000]);kitchen(t,{stove:false});
 const bo=cl(ph*2),pu=cl(ph*2-1);const bxx=lerp(690,700,bo),byy=lerp(960,1350,bo);const pxx=775,pyy=lerp(1400,960,ease(pu));
 const rh=bo<1?[bxx-118*0.95,byy+125*0.95]:[pxx-70,pyy+160];
 const o=trP({lh:[330,1165],rh,look:[1,0.4],mouth:hl>0.5?'smile':'flat',brow:fa>0.5&&ph<0.5?1:0});
 person(o,t);if(bo<1)billSheet(bxx,byy,0.95,0.05,{rows:3,hl:fa>0?2:null,hk:fa});
 if(pu>0)bigPhone(pxx,pyy,0.72,0.04,()=>offerList(t,{p:E(t,M.cmp-0.2,0.8),sort:so,hl}));
 hands(o);counterFront();g.restore();
 labelTag('🔍 TU CONSUMO: kWh AL AÑO',540,650,fa*(1-ph),C.amber);
 labelTag('COMPARADOR DE LA CNMC',540,650,ph,C.blue);};
// matiz: el bono social va unido a la regulada (las dos tarjetas se juntan con un eslabón)
ILL.tr_bono=(c,t)=>{const s=c._s,M=c._m;const bo=M.bon?ease(E(t,M.bon-0.3,0.5)):ease(E(t,s+0.2,0.5));const rg=M.reg?ease(E(t,M.reg-0.2,0.5)):0;const un=M.uni?E(t,M.uni-0.1,0.6):0;
 g.save();cam(1.22,540,1000);kitchen(t,{stove:false});
 const lx=lerp(180,250,un),rx=lerp(760,690,un);const ly=lerp(1080,950,bo),ry=lerp(1120,950,rg);
 const o=trP({lh:trGrip(lx,ly,0.85,'R'),rh:trGrip(rx,ry,0.85,'L'),look:[0,0.1],mouth:un>0.5?'smile':'flat',brow:0});
 person(o,t);tariffCard(lx,ly,0.85,-0.05,{kind:'bono',hl:bo*(1-un),t});if(rg>0)tariffCard(rx,ry,0.85,0.05,{kind:'reg',hl:rg*(1-un),t});
 linkChain(lx+95,ly+95,rx-95,ry+95,un,C.green);hands(o);counterFront();g.restore();
 labelTag('BONO SOCIAL = SOLO CON PVPC',540,650,un,C.green);
 check(540,1440,40,un>0.9?E(t,M.uni+0.6,0.5):0);};
