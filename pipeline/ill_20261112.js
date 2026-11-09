// ===== Escenas: bajar la potencia contratada (2026-11-12) · kit en ill20.js (usa kitchen/person de ill.js, houseFront y smartphone de ill4.js, qMarks de ill14.js, coinsFrom y scr de ill_20261029.js) =====
function ptP(o){return Object.assign({x:420,y:1240,apron:false,shirt:'#8b7cf6'},o);}
// cocina con la factura en la mano derecha del personaje
function ptScene(t,o,bill){kitchen(t,{stove:false});person(o,t);powerBill(bill.x,bill.y,bill.s,bill.rot,bill);hands(o);counterFront();}
// gancho: mira la factura, se encoge de hombros («total, no ahorra nada») → FALSO
ILL.pt_gancho=(c,t)=>{const s=c._s,M=c._m;const no=M.no?E(t,M.no-0.15,0.4):0;const sh=Math.sin(Math.min(1,E(t,s+0.6,0.8))*Math.PI);
 g.save();camLerp(t,s,4,[1.2,560,1030],[1.3,600,1010]);
 const o=ptP({lh:[lerp(330,300,sh),lerp(1165,1120,sh)],rh:[598,1090],look:no>0.5?[0,0.1]:[1,0.4],mouth:no>0.5?'o':'flat',brow:no>0.5?1:0});
 ptScene(t,o,{x:690,y:960,s:0.95,rot:0.05,p:E(t,s+0.2,1.2)});g.restore();
 labelTag('«BAJAR LA POTENCIA NO AHORRA NADA»',540,650,E(t,s+0.2,0.4)*(1-(M.no?E(t,M.no-0.1,0.3):0)),C.amber);};
// pregunta temprana: enseña la factura con la POTENCIA resaltada
ILL.pt_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));const hk=0.5+0.5*Math.sin((t-s)*5);
 g.save();cam(1.3,600,980);
 const bx=lerp(690,700,up),by=lerp(960,930,up),bs=lerp(0.95,1.08,up);
 const o=ptP({rh:[bx-118*bs,by+125*bs],lh:[330,1165],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 ptScene(t,o,{x:bx,y:by,s:bs,rot:lerp(0.05,0,up),hl:0,hk});
 const [hx,hy]=scr(o.x,860);g.restore();
 qMarks(hx,hy-30,t,E(t,s+0.3,0.4));};
// fuente: casi 10.000 facturas · 1 de cada 3 hogares con potencia de más · y le cuesta dinero cada año
ILL.pt_casas=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.2)';g.fillRect(0,470,W,1150);
 const un=M.uno?E(t,M.uno-0.1,0.5):0,pa=M.pag?M.pag:null;const X=[250,540,830],Y=1250,HW=210;
 X.forEach((x,i)=>{const a=ease(E(t,s+0.2+i*0.15,0.5));if(a<=0)return;g.save();g.globalAlpha=a;
  if(i===2&&un>0){const gl=g.createRadialGradient(x,Y-120,20,x,Y-120,200);gl.addColorStop(0,`rgba(229,72,77,${0.55*un})`);gl.addColorStop(1,'rgba(229,72,77,0)');g.fillStyle=gl;g.fillRect(x-220,Y-340,440,380);}
  houseFront(x,Y,HW,t,0,1);
  if(i===2&&un>0)emoji('⚡',x+70,Y-250-Math.sin(t*4)*6,64*eob(un));
  g.restore();});
 labelTag('≈ 10.000 FACTURAS',540,900,E(t,s+0.4,0.4)*(1-un),C.blue);
 labelTag('1 DE CADA 3: POTENCIA DE MÁS',540,900,un,C.red);
 if(pa){for(let r=0;r<3;r++)coinsFrom(830,1120,t,pa-0.3+r*1.1,5,990,940);}};
// mecanismo: la potencia va en la parte fija → se paga cada mes, gastes lo que gastes
ILL.pt_fijo=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.2)';g.fillRect(0,470,W,1150);
 const ap=eob(E(t,s,0.5));const fi=M.fij?E(t,M.fij-0.2,0.4):0,me=M.mes?E(t,M.mes-0.2,1.8):0,ga=M.gas?E(t,M.gas-0.2,0.6):0;
 g.save();g.translate(540,1170);g.scale(ap,ap);g.translate(-540,-1170);
 const G=powerGauge(540,1170,250,t,{used:0.45,cont:0.85,waste:ga,needle:0.28,wob:true});g.restore();
 labelTag('PARTE FIJA DE LA FACTURA',540,650,fi,C.amber);
 labelTag('✓ LO QUE USAS',240,880,E(t,s+0.3,0.4),C.green);
 labelTag('CONTRATADA',870,900,E(t,s+0.5,0.4),C.amber);
 labelTag('PAGAS TAMBIÉN LO QUE NO USAS',540,760,ga,C.red);
 monthCoins(540,1320,900,me,t);};
// qué hacer (1): mirar en la factura la potencia máxima del último año
ILL.pt_mirar=(c,t)=>{const s=c._s,M=c._m;const mx=M.max?E(t,M.max-0.2,0.5):0;
 g.save();camLerp(t,s,1.6,[1.2,560,1030],[1.5,640,1000]);
 const o=ptP({lh:[330,1165],rh:[598,1090],look:[1,0.4],mouth:'smile',brow:mx>0.5?1:0});
 ptScene(t,o,{x:690,y:960,s:0.95,rot:0.05,hl:mx>0?1:null,hk:mx});g.restore();
 labelTag('🔍 POTENCIA MÁXIMA · ÚLTIMO AÑO',540,650,mx,C.green);};
// qué hacer (2): si es menor que la contratada, llamar y pedir que la bajen → el medidor se ajusta
ILL.pt_bajar=(c,t)=>{const s=c._s,M=c._m;const me=M.men?E(t,M.men-0.2,0.5):0,ll=ease(E(t,M.pid?M.pid-0.6:s+1,0.6)),bj=M.baj?ease(E(t,M.baj-0.1,0.9)):0;
 g.save();cam(1.15,470,1060);kitchen(t,{stove:false});
 const hy=1240-310;const o=ptP({x:330,rh:[lerp(440,330+92,ll),lerp(1165,hy+40,ll)],lh:[240,1165],look:[0.8,0.2],mouth:bj>0.5?'smile':'flat',brow:0});
 person(o,t);if(ll>0.05)smartphone(o.rh[0]-6,o.rh[1]-30,0.85,-0.35,ll>0.9?1:0,t);hands(o);counterFront();g.restore();
 g.fillStyle='rgba(6,10,20,0.35)';rr(560,790,480,500,30);g.fill();
 powerGauge(800,1120,190,t,{used:0.45,cont:lerp(0.85,0.55,bj),waste:1-bj,needle:0.33,wob:true});
 labelTag('MÁXIMA < CONTRATADA',800,860,me*(1-bj),C.red);
 labelTag('📞 PIDE BAJARLA',540,650,ll>0.5?E(t,(M.pid||s+1),0.4):0,C.blue);
 check(800,1240,40,bj>0.95?E(t,M.baj+0.9,0.5):0);
 labelTag('✓ AJUSTADA A LO QUE USAS',800,860,bj>0.9?E(t,M.baj+0.8,0.4):0,C.green);};
