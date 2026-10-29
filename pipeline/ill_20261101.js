// ===== Escenas: el programa eco tarda más, ¿gasta más? (2026-11-01) · kit en ill9.js =====
const LV_DW=[660,1212];
function lvP(o){return Object.assign({x:540,y:1240,apron:false,shirt:'#d9644a'},o);}
// cocina con lavavajillas cerrado a la derecha del personaje; si o.reach, el brazo derecho pasa por delante de la encimera
function lvScene(t,o,dw,opt={}){kitchen(t,{stove:false});if(opt.clock)wallClock(...opt.clock,t,opt.spin||0);if(o)person(o,t);counterFront();const G=dwFront(LV_DW[0],LV_DW[1],t,dw);if(o){if(o.reach)armFront(o,1,t);hands(o);}return G;}
function lvCoins(x,y,t,t0,n=7,tx=880,ty=620){for(let i=0;i<n;i++){const k=E(t,t0+i*0.13,1.1);if(k<=0||k>=1)continue;const [cx,cy]=arcPath(x,y,tx-60+i*25,ty,160,ease(k));coin(cx,cy,1.1,t*6+i);}}
// gancho: cambia el lavavajillas de eco a rápido
ILL.lv_gancho=(c,t)=>{const s=c._s,M=c._m;const tr=M.rap||s+1.5;const pr=ease(E(t,tr-0.7,0.5))*(1-ease(E(t,tr+0.4,0.5)));const sel=t<tr?0:2;
 const rv=M.rev?E(t,M.rev,0.3):0;
 g.save();camLerp(t,s,4,[1.25,640,1120],[1.35,660,1130]);
 const G0=[[LV_DW[0]+26,LV_DW[1]+33],[LV_DW[0]+50,LV_DW[1]+33],[LV_DW[0]+74,LV_DW[1]+33]];const b=G0[t<tr?2:2];
 const o=lvP({reach:pr>0.02,rh:[lerp(620,b[0],pr),lerp(1160,b[1],pr)],lh:[460,1165],look:[0.7,0.8],mouth:rv>0.5?'o':'smile',brow:rv>0.5?1:0});
 lvScene(t,o,{prog:sel===0?'ECO':'RÁPIDO',sel,p:0.05,run:sel===2?1:0,press:pr},{clock:[900,690,56],spin:M.ete&&t>M.ete?1.2:0.2});
 g.restore();};
// "esto me va a salir carísimo": mira el panel en eco y piensa en el dinero
ILL.lv_pantalla=(c,t)=>{const s=c._s,M=c._m;const ca=M.car?E(t,M.car-0.3,0.5):0;const mas=M.mas?E(t,M.mas-0.2,0.4):0;
 g.save();camLerp(t,s,5,[1.2,640,1110],[1.3,650,1120]);
 const o=lvP({lh:[460,1165],rh:[640,1168],look:[0.8,0.9-1.6*ca],mouth:ca>0.5?'worry':'flat',brow:ca>0.5?1:0});
 lvScene(t,o,{prog:'ECO',sel:0,p:lerp(0.02,0.08,E(t,s,5)),run:1},{clock:[900,690,56],spin:0.6});
 const [hx,hy]=scr(540,870);const [dx,dy]=scr(LV_DW[0]+152,LV_DW[1]-20);g.restore();
 labelTag('MÁS LARGO',dx,dy-30,mas,C.amber);
 thinkBubble(hx-170,hy-150,80,ca,[hx-60,hy-40],(x,y)=>{emoji('💸',x,y,92);});
 if(M.car){for(let i=0;i<5;i++){const k=E(t,M.car+0.2+i*0.15,0.9);if(k<=0||k>=1)continue;coin(hx-170+(i-2)*40,hy-110-k*170,1,t*6+i);}}};
// duración: normal vs eco, el eco acaba ~63 min después
ILL.lv_tiempos=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);kitchen(t,{stove:false});counterFront();g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);
 const t0=s+0.3,pn=ease(E(t,t0,2.2)),pe=ease(E(t,t0,3.6));
 g.save();g.translate(150,640);g.scale(1.05,1.05);dwFront(0,0,t,{prog:'NORMAL',sel:1,p:pn,run:pn<1?1:0});g.restore();
 g.save();g.translate(700,640);g.scale(1.05,1.05);dwFront(0,0,t,{prog:'ECO',sel:0,p:pe,run:pe<1?1:0});g.restore();
 const X=120,WN=560,WE=840;timeBar(X,1170,WN,pn,C.blue,'NORMAL');timeBar(X,1330,WE,pe,C.green,'ECO');
 const k=M.ses?E(t,M.ses-0.2,0.5):0;if(k>0){g.save();g.globalAlpha=k;g.strokeStyle=C.amber;g.lineWidth=5;g.setLineDash([12,10]);g.beginPath();g.moveTo(X+WN,1130);g.lineTo(X+WN,1370);g.moveTo(X+WE,1130);g.lineTo(X+WE,1370);g.stroke();g.setLineDash([]);g.restore();
  labelTag('+63 MIN',X+(WN+WE)/2,1250,k,C.amber);}
 if(pn>=1)check(X+WN-34,1170,22,E(t,t0+2.2,0.4));if(pe>=1)check(X+WE-34,1330,22,E(t,t0+3.6,0.4));};
// el truco está en el agua: calentarla es lo que más gasta
ILL.lv_agua=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);kitchen(t,{stove:false});counterFront();g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);
 const ag=M.agu?E(t,M.agu-0.2,0.5):0,ca=M.cal?ease(E(t,M.cal-0.2,0.8)):0,en=M.ene?E(t,M.ene-0.2,0.4):0;
 const G=dwCut(540,700,560,620,t,{heat:ca,wcol:mixc('#7fb8ff','#ff8a5c',ca),jets:1,prog:'NORMAL',steam:ca*0.8});
 labelTag('💧 AGUA',540,1250,ag*(1-ca),C.blue);
 if(ca>0)labelTag('🔥 CALENTAR EL AGUA',540,1395,ca,C.red);
 if(M.ene)lvCoins(G.heater[0],G.heater[1],t,M.ene,8,880,560);
 if(en>0)labelTag('LO QUE MÁS ENERGÍA GASTA',540,1480,en,C.amber);};
// menos temperatura, ciclo más largo
ILL.lv_templado=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);kitchen(t,{stove:false});counterFront();g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);
 const tm=M.men?ease(E(t,M.men-0.2,1.2)):0,co=M.com?ease(E(t,M.com,2.2)):0;
 dwCut(360,720,460,560,t,{heat:lerp(0.9,0.35,tm),wcol:mixc('#ff8a5c','#f2c38a',tm),jets:1,prog:'ECO',steam:lerp(0.7,0.15,tm)});
 miniThermo(830,960,250,lerp(0.9,0.45,tm),mixc('#e5484d','#f2a33a',tm));
 if(tm>0){g.save();g.globalAlpha=cl(tm*3);g.fillStyle=C.blue;g.beginPath();g.moveTo(920,800);g.lineTo(950,800);g.lineTo(950,880);g.lineTo(970,880);g.lineTo(935,925);g.lineTo(900,880);g.lineTo(920,880);g.closePath();g.fill();g.restore();}
 arcClock(830,1250,105,lerp(0.4,0.9,co),C.green,t);
 labelTag('MENOS CALOR',830,640,M.men?E(t,M.men,0.4):0,C.amber);
 labelTag('MÁS RATO',830,1420,M.com?E(t,M.com,0.4):0,C.green);};
// la lavadora: el eco se alarga ~90 min pero gasta menos energía y agua
ILL.lv_lavadora=(c,t)=>{const s=c._s,M=c._m;const no=M.nov?E(t,M.nov-0.2,0.4):0,en=M.ene?E(t,M.ene-0.2,0.4):0;
 g.save();camLerp(t,s,5,[1.15,640,1180],[1.25,660,1200]);kitchen(t,{stove:false});
 const o=lvP({x:500,lh:[420,1165],rh:[600,1165],look:[0.9,0.7],mouth:en>0.5?'smile':'flat'});person(o,t);counterFront();
 const Wg=washer(700,1212,t,{prog:'ECO',spin:0.45,p:lerp(0.1,0.35,E(t,s,6)),water:0.35});hands(o);
 const [lx,ly]=scr(810,1180);const [px,py]=scr(Wg.porthole[0],Wg.porthole[1]);g.restore();
 labelTag('⏳ +90 MIN',lx,ly-70,no*(1-en*0.0),C.amber);
 if(en>0){labelTag('MENOS ENERGÍA Y AGUA',540,640,en,C.green);check(px,py,40,E(t,M.ene+0.2,0.5));}};
// ahorro al año: monedas a la hucha
ILL.lv_ahorro=(c,t)=>{const s=c._s,M=c._m;const cu=M.cua||s+0.5;
 g.save();cam(1.2,620,1110);kitchen(t,{stove:false});calendarPad(900,700,0.75,1+Math.floor(cl((t-cu)/3)*4)*7,(t>cu?((t-cu)/0.75)%1:0));
 const drop=(t-s)%0.9/0.9;const hy=950-Math.sin(drop*Math.PI)*25;
 const o=lvP({x:500,lh:[420,1165],rh:[700,hy],look:[0.9,0.5],mouth:'smile'});person(o,t);
 const fill=lerp(0.05,0.9,ease(E(t,s+0.3,(c._e||s+5)-s-0.3)));coinJar(720,1178,0.9,fill,t);
 const k=drop;if(k>0.15&&k<0.85){coin(720,lerp(hy+20,1010,(k-0.15)/0.7),0.9,t*6);}hands(o);counterFront();dwFront(LV_DW[0]+180,LV_DW[1],t,{prog:'ECO',sel:0,p:0.5,run:0});
 g.restore();};
// llénalo, sin aclarar, en eco
ILL.lv_cargar=(c,t)=>{const s=c._s,M=c._m;const lle=M.lle?E(t,M.lle-0.2,0.4):0,ac=M.acl?E(t,M.acl-0.2,0.4):0,ec=M.eco?E(t,M.eco-0.2,0.4):0;
 const cyc=((t-s)%1.4)/1.4;const dn=Math.sin(cyc*Math.PI);const hx=760,hy=lerp(1130,1225,dn);
 g.save();cam(1.2,640,1150);kitchen(t,{stove:false});
 const o=lvP({x:500,lh:[420,1165],rh:[hx,hy],reach:true,look:[0.8,0.9],mouth:'smile'});person(o,t);counterFront();
 if(ec<0.5)dishwasher(LV_DW[0],LV_DW[1],t,1,lerp(0.2,1,ease(E(t,s+0.2,(M.eco||s+4)-s))));else dwFront(LV_DW[0],LV_DW[1],t,{prog:'ECO',sel:0,p:0.05,run:1});
 if(ec<0.5)plate(hx,hy+40,0.8,0.8);armFront(o,1,t);hands(o);g.restore();
 labelTag('✓ LLÉNALO',800,640,lle,C.green);labelTag('✓ SIN ACLARAR',800,720,ac,C.green);labelTag('✓ EN ECO',800,800,ec,C.green);};
// excepciones: ollas muy sucias o prisa
ILL.lv_ollas=(c,t)=>{const s=c._s,M=c._m;const ol=M.oll?E(t,M.oll-0.3,0.5):0,pr=M.pri?E(t,M.pri-0.2,0.4):0,ot=M.otr?E(t,M.otr-0.2,0.4):0;
 g.save();cam(1.2,640,1120);kitchen(t,{stove:false});wallClock(900,690,56,t,pr>0?1.5:0.2);
 const o=lvP({x:480,lh:[lerp(420,370,ol),lerp(1165,1070,ol)],rh:[620,1165],look:[0.5*ol,0.6*ol],mouth:ol>0.5&&pr<0.5?'worry':'smile',brow:ol>0.5&&pr<0.5?1:0});person(o,t);
 if(ol>0){g.save();g.globalAlpha=cl(ol*3);dirtyPot(o._hands[0][0],o._hands[0][1],0.9,-0.12);g.restore();}hands(o);counterFront();
 dwFront(LV_DW[0],LV_DW[1],t,{prog:ot>0.5?'NORMAL':'ECO',sel:ot>0.5?1:0,p:0.05,run:0});const [dx,dy]=scr(LV_DW[0]+152,LV_DW[1]-20);g.restore();
 labelTag('OLLAS MUY SUCIAS',330,640,ol,C.red);labelTag('🔔 ¡PRISA!',800,820,pr,C.amber);labelTag('OTRO PROGRAMA',dx,dy-40,ot,C.blue);};
