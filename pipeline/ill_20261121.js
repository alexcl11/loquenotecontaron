// ===== Escenas: sobras de Navidad (2026-11-21) · kit en ill29.js (usa tupper de ill7.js, fridge de ill2.js, fridgeLow/frostTupper/qMarks de ill14.js, calendarPad de ill8.js, lens de ill28.js, bin de ill2.js) =====
function snP(o){return Object.assign({x:640,y:1200,shirt:'#c0392b'},o);}
const SN_FR=[170,560]; // nevera abierta a la izquierda: baldas en y 890 y 1010, interior x 184–456
const SN_FX=60,SN_FY=640; // nevera baja (congelador en x 74–346, y 654–830)
function snGerms(cx,cy,w,h,t,n,t0,seed=0,step=0.15){for(let i=0;i<n;i++){const x=cx-w/2+rnd(i+seed)*w,y=cy-h/2+rnd(i+seed+40)*h;germ(x,y,11+rnd(i+seed+7)*6,t,i,ease(E(t,t0+i*step,0.35)));}}
// gancho: mete la bandeja del asado en la nevera; el calendario pasa una semana y salen bacterias
ILL.sn_gancho=(c,t)=>{const s=c._s,M=c._m;const mv=ease(E(t,(M.sob||s)+0.1,1.1));const se=M.sem||s+1.5;const ju=M.jue?E(t,M.jue-0.2,0.5):0;
 const day=1+Math.min(6,Math.floor(Math.max(0,t-se+0.2)/0.22));const fl=t>se-0.2&&day<7?((t-se+0.2)/0.22)%1:0;
 g.save();camLerp(t,s,4,[1.15,520,980],[1.22,500,990]);kitchen(t);fridge(...SN_FR,t,1);
 const tx=lerp(700,320,mv),ty=lerp(1150,1002,mv)-50*Math.sin(mv*Math.PI);
 const rel=ease(E(t,(M.sob||s)+1.3,0.4));
 const o=snP({lh:[lerp(tx-130*0.7,520,rel),lerp(ty-40,1150,rel)],rh:[lerp(tx+120*0.7,820,rel),lerp(ty-40,1150,rel)],look:ju>0.4?[0,0.1]:[-0.8,0.3],mouth:ju>0.4?'o':'smile',brow:ju>0.4?1:0});
 person(o,t);roastTray(tx,ty,0.7,t,{left:0.85});counterFront();hands(o);
 calendarPad(790,720,0.85,day,fl);
 if(ju>0)snGerms(320,940,190,60,t,7,M.jue,3,0.1);
 g.restore();
 labelTag('📅 UNA SEMANA',540,650,t>se-0.1?E(t,se,0.4)*(1-ju):0,C.amber);};
// pregunta temprana: enseña el táper de sobras a cámara
ILL.sn_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,(M.cu||s)-0.3,0.6));
 g.save();cam(1.4,620,960);kitchen(t);fridge(...SN_FR,t,0);
 const hx=lerp(720,740,up),hy=lerp(1150,960,up);
 const o=snP({x:580,rh:[hx,hy],lh:[480,1150],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);counterFront();tupper(hx+10,hy+28,0.85,0.85,1,C.blue,SN_FOOD);hands(o);g.restore();
 if(M.q)qMarks(540,760,t,E(t,M.q,0.4));};
// fuente: semana de 7 días; 3 o 4 en verde, del 5 al 7 en rojo
ILL.sn_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const ap=E(t,s+0.6,0.5);const tr=M.tre||s+4,cu=M.cua||s+5,nv=M.nev||s+6;
 const D=[1,2,3,4,5,6,7].map(n=>({n,sub:'DÍA'}));
 dayCells(110,930,190,170,4,D,i=>{const a=ap>0?E(t,s+0.6+i*0.08,0.4):0;
  if(i<3)return {a,fill:E(t,tr-0.2+i*0.12,0.3),col:C.green};
  if(i===3)return {a,fill:E(t,cu-0.2,0.3),col:C.green};
  return {a,fill:E(t,nv-0.1+(i-4)*0.12,0.3),col:C.red,x:E(t,nv+0.2+(i-4)*0.12,0.4)};});
 tupper(915,1300,1.0,0.8,1,C.blue,SN_FOOD);flake(915,1180,16,t);
 labelTag('3–4 DÍAS EN LA NEVERA',540,1440,E(t,cu+0.1,0.4),C.green);};
// riesgo: los días pasan en la nevera, las bacterias siguen creciendo y la barra de riesgo sube
ILL.sn_riesgo=(c,t)=>{const s=c._s,M=c._m;const pa=M.pas||s+0.3,ri=M.rie||s+1.5,su=M.sub||s+3,fr=M.fri||s+4.5;
 const dp=E(t,pa,Math.max(1,su+0.6-pa));const day=1+Math.floor(dp*6.99);const fl=dp>0&&dp<1?(dp*6.99)%1:0;
 g.save();cam(1.75,320,820);kitchen(t);fridge(...SN_FR,t,1,E(t,fr-0.2,0.5));
 tupper(320,890,1.0,0.85,1,C.blue,SN_FOOD);roastTray(320,1010,0.62,t,{left:0.85});
 calendarPad(400,690,0.7,day,fl);
 const ng=day<=4?0:day-4;for(let i=0;i<2+ng*3;i++){const gx=230+rnd(i+11)*180,gy=850+rnd(i+31)*120;germ(gx,gy,9+rnd(i)*4,t,i,ease(E(t,pa+0.3+i*0.12,0.3)));}
 g.restore();
 riskBar(540,1480,620,lerp(0.15,0.95,ease(E(t,ri,Math.max(0.8,su+0.6-ri)))),E(t,ri-0.2,0.4));
 labelTag('RIESGO',540,1405,E(t,ri-0.2,0.4),C.red);
 labelTag('DÍA '+day+(day>4?' · MÁS RIESGO':''),540,650,E(t,pa,0.3)*(1-E(t,fr-0.1,0.3)),day>4?C.red:C.green);
 labelTag('❄️ AUNQUE ESTÉ BIEN FRÍA',540,650,E(t,fr-0.1,0.4),C.blue);};
// olor: la huele, «huele bien»… pero las bacterias no cambian olor, sabor ni aspecto
ILL.sn_oler=(c,t)=>{const s=c._s,M=c._m;const ol=M.ol||s+1;const up=ease(E(t,ol-0.6,0.6));const ba=M.bac?E(t,M.bac-0.3,0.6):0;
 g.save();cam(1.45,640,940);kitchen(t);fridge(...SN_FR,t,0);
 const hx=lerp(760,690,up),hy=lerp(1150,935,up);
 const o=snP({rh:[hx+70,hy+5],lh:[hx-70,hy+5],look:[0,0.3],mouth:'smile',brow:0});
 person(o,t);counterFront();tupper(hx,hy+40,0.95,0.85,0,C.blue,SN_FOOD);hands(o);
 smellWaves(hx,hy-10,640,850,t,up*(1-ba*0.6));
 g.restore();
 labelTag('👃 «HUELE BIEN»',540,650,E(t,ol,0.4)*(1-ba),C.amber);
 lens(820,1200,150,ba,(x,y,r)=>{g.fillStyle=SN_FOOD;g.fillRect(x-r,y-r,2*r,2*r);g.fillStyle='rgba(255,255,255,0.12)';for(let i=0;i<10;i++){g.beginPath();g.arc(x-r+rnd(i+5)*2*r,y-r+rnd(i+15)*2*r,14,0,7);g.fill();}
  for(let i=0;i<6;i++)germ(x-90+rnd(i+2)*180,y-80+rnd(i+8)*160,22,t,i,ease(E(t,M.bac+i*0.12,0.3)));});
 const L=[['NI OLOR',M.ol2],['NI SABOR',M.sab],['NI ASPECTO',M.asp]];
 L.forEach((q,i)=>{if(q[1])labelTag(q[0],[230,540,850][i],1440,E(t,q[1]-0.1,0.4),C.red);});};
// la cuenta: Nochebuena (24) → como mucho el 27 o el 28; Nochevieja, tachada
ILL.sn_cuenta=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.3)';g.fillRect(0,470,W,1150);
 const ap=E(t,(M.cue||s)-0.1,0.5);const nb=M.noc||s+1.5,v7=M.v27||s+4,v8=M.v28||s+5,nv=M.nv||s+6;
 txt('DICIEMBRE',540,770,52,'#fff',900,'center',ap);
 const D=[24,25,26,27,28,29,30,31].map(n=>({n,sub:n===24?'NOCHEBUENA':(n===31?'NOCHEVIEJA':'')}));
 dayCells(110,830,190,180,4,D,i=>{const a=ap>0?E(t,(M.cue||s)+i*0.06,0.4):0;
  if(i===0)return {a,star:E(t,nb-0.1,0.4),fill:E(t,nb-0.1,0.4)*0.85,col:C.amber};
  if(i<=3)return {a,fill:E(t,v7-0.9+(i-1)*0.3,0.3),col:C.green};
  if(i===4)return {a,fill:E(t,v8-0.2,0.3),col:C.green};
  return {a,fill:E(t,nv-0.2+(i-5)*0.12,0.3),col:C.red,x:E(t,nv+0.1+(i-5)*0.12,0.4)};});
 labelTag('🍗 SOBRA EL 24',540,650,E(t,nb,0.4)*(1-E(t,v8,0.3)),C.amber);
 labelTag('✓ HASTA EL 27 O EL 28',540,650,E(t,v8,0.4),C.green);
 labelTag('✕ NOCHEVIEJA, NO',540,1440,E(t,nv+0.1,0.4),C.red);};
// congelar: duda con el táper → al congelador, con escarcha y fecha
ILL.sn_congelar=(c,t)=>{const s=c._s,M=c._m;const k1=(M.con||s+2)-0.25;
 g.save();
 if(t<k1){camLerp(t,s,k1-s,[1.3,560,960],[1.36,560,960]);kitchen(t);fridgeLow(SN_FX,SN_FY,t,0,1);
  const o=snP({x:600,rh:[760,1110],lh:[640,1110],look:[-0.8,0.2],mouth:'flat',brow:M.tie&&t>M.tie?1:0});person(o,t);counterFront();tupper(700,1170,0.9,0.85,1,C.blue,SN_FOOD);hands(o);
  if(M.tie)qMarks(600,770,t,E(t,M.tie-0.2,0.4));}
 else{cam(1.7,210,770);kitchen(t);counterFront();fridgeLow(SN_FX,SN_FY,t,1,1);
  const ip=ease(E(t,k1,0.6));tupper(210,lerp(900,808,ip),1.05,0.85,1,C.blue,SN_FOOD);
  const fr=E(t,k1+0.8,1.0);frostTupper(210,808,1.05,fr*ip,'SOBRAS 24/12');for(let i=0;i<6;i++)flake(110+rnd(i+4)*200,690+rnd(i+9)*50,10,t+i);}
 g.restore();
 labelTag('❄️ AL CONGELADOR',540,650,t>=k1?E(t,k1+0.2,0.4):0,C.blue);
 labelTag('3–4 MESES EN BUEN ESTADO',540,1440,M.mes?E(t,M.mes-0.3,0.4):0,C.green);};
// qué hacer: repartir la bandeja en tápers poco hondos, ponerles la fecha y a la nevera
ILL.sn_tapers=(c,t)=>{const s=c._s,M=c._m;const rp=M.rep||s+0.3,fc=M.fec||s+3,nv=M.nev||s+5;
 const TX=[540,690,840];const fillK=i=>ease(E(t,rp+0.2+i*0.45,0.4));const wr=i=>E(t,fc-0.2+i*0.35,0.35);
 const go=i=>ease(E(t,nv-0.2+i*0.2,0.7));const DST=[[320,890],[250,1010],[390,1010]];
 g.save();camLerp(t,s,6,[1.12,540,990],[1.18,560,990]);kitchen(t);fridge(...SN_FR,t,1);
 const left=1-0.25*(fillK(0)+fillK(1)+fillK(2));
 // mano derecha: sirve en el táper que toca, luego escribe la fecha
 let rh=[900,1150];const cur=Math.min(2,Math.floor(Math.max(0,t-rp-0.2)/0.45));
 if(t>rp&&t<rp+1.6)rh=[TX[cur]+30+Math.sin(t*14)*8,1080];
 const wi=Math.min(2,Math.floor(Math.max(0,t-fc+0.2)/0.35));const writing=t>fc-0.3&&t<fc+0.9;
 if(writing)rh=[TX[wi]+lerp(-30,30,(t*3)%1),1140];
 const o=snP({x:700,rh,lh:[840,1140],look:writing||t<rp+1.6?[0,0.8]:[-0.8,0.3],mouth:'smile'});
 person(o,t);counterFront();roastTray(870,1180,0.55,t,{left});
 TX.forEach((x,i)=>{const gk=go(i);const[dx,dy]=DST[i];const [px,py]=gk>0?arcPath(x,1180,dx,dy,90,gk):[x,1180];
  tupper(px,py,0.85,fillK(i),E(t,fc-0.5,0.3),[C.blue,C.green,C.amber][i],SN_FOOD);dateSticker(px,py,0.85,'24/12',wr(i));});
 if(writing)markerPen(o.rh[0],o.rh[1]-6,-0.5);
 hands(o);
 g.restore();
 labelTag('POCO HONDOS: SE ENFRÍAN ANTES',540,650,M.hon?E(t,M.hon-0.2,0.4)*(1-E(t,fc-0.2,0.3)):0,C.amber);
 labelTag('✍️ CON LA FECHA',540,650,E(t,fc-0.1,0.4)*(1-E(t,nv-0.2,0.3)),C.amber);
 labelTag('✓ A LA NEVERA',540,1440,E(t,nv+0.1,0.4),C.green);};
// la duda: táper sin fecha → a la basura
ILL.sn_duda=(c,t)=>{const s=c._s,M=c._m;const sb=M.sab||s+0.6,du=M.dud||s+2,ba=M.bas||s+3;const dr=ease(E(t,ba-0.4,0.7));
 g.save();cam(1.25,640,980);kitchen(t);fridge(...SN_FR,t,0);
 const hold=[lerp(700,830,ease(E(t,du-0.2,0.5))),lerp(1000,1040,ease(E(t,du-0.2,0.5)))];
 const tp=dr>0?arcPath(hold[0],hold[1]+30,860,1290,60,dr):[hold[0],hold[1]+30];
 const o=snP({rh:dr>0.2?[860,1120]:[hold[0]+60,hold[1]],lh:dr>0.2?[520,1150]:[hold[0]-60,hold[1]],look:[0.4,0.6],mouth:t>sb?'worry':'flat',brow:t>sb?1:0});
 person(o,t);counterFront();
 bin(860,1390,1.1,ease(E(t,ba-0.6,0.4)));
 if(dr<0.97)tupper(tp[0],tp[1],0.85,0.8,1,'#8592a6','#8a7a52');
 hands(o);
 g.restore();
 if(t>sb)qMarks(600,760,t,E(t,sb-0.2,0.4)*(1-E(t,du,0.3)));
 labelTag('¿SIN FECHA?',540,650,E(t,sb-0.1,0.4)*(1-E(t,du,0.3)),C.amber);
 labelTag('ANTE LA DUDA, A LA BASURA',540,650,E(t,du,0.4),C.red);};
