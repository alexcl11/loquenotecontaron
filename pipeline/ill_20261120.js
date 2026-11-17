// ===== Escenas: arroz cocido fuera hasta la cena (2026-11-20) · kit en ill28.js (usa stockPot/tupper de ill7.js, wallClock de ill5.js, fridge de ill2.js, heatWaves de ill6.js, qMarks de ill14.js, scr de ill_20261029.js) =====
function arP(o){return Object.assign({x:560,y:1200,shirt:'#3d7bff'},o);}
const AR_POT=[700,1182,0.62];
function arGerms(cx,cy,w,h,t,n,t0,seed=0){for(let i=0;i<n;i++){const x=cx-w/2+rnd(i+seed)*w,y=cy-h/2+rnd(i+seed+40)*h;germ(x,y,13+rnd(i+seed+7)*5,t,i,ease(E(t,t0+i*0.18,0.35)));}}
// gancho: deja la olla de arroz en la encimera «para la cena»; el reloj corre y salen bacterias
ILL.ar_gancho=(c,t)=>{const s=c._s,M=c._m;const dj=M.dej||s+0.2;const p=ease(E(t,dj-0.1,0.9));const rel=ease(E(t,dj+1.0,0.5));const ma=M.ma?E(t,M.ma-0.3,0.5):0;
 g.save();camLerp(t,s,4,[1.2,620,1000],[1.28,640,990]);kitchen(t);wallClock(860,690,56,t,0.15+ma*1.6);
 const [px,py,ps]=AR_POT;const potY=lerp(1080,py,p);const hdx=129*ps,hdy=141*ps;
 const lh=[lerp(px-hdx,430,rel),lerp(potY-hdy,1150,rel)],rh=[lerp(px+hdx,880,rel),lerp(potY-hdy,1150,rel)];
 const o=arP({lh,rh,look:[0.6,0.5],mouth:ma>0.5?'o':'smile',brow:ma>0.5?1:0});
 person(o,t);counterFront();ricePot(px,potY,ps,t,{steam:0.6*(1-ma)});hands(o);
 if(ma>0)arGerms(px,potY-150,180,70,t,7,M.ma);
 g.restore();
 labelTag('«PARA LA CENA»',540,660,E(t,dj+0.6,0.4)*(1-ma),C.amber);};
// pregunta temprana: enseña el cuenco de arroz a cámara
ILL.ar_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.4,640,950);kitchen(t);
 const hx=lerp(700,720,up),hy=lerp(1150,960,up);
 const o=arP({rh:[hx,hy],lh:[450,1150],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);counterFront();ricePot(860,1182,0.55,t,{});riceBowl(hx+10,hy+20,0.62,t);hands(o);g.restore();
 if(M.q)qMarks(540,700,t,E(t,M.q,0.4));};
// fuente: reloj de 2 horas que se llena
ILL.ar_fuente=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const ap=ease(E(t,s+0.1,0.5));const hr=M.hor||s+3;
 const h=2*ease(E(t,hr-1.4,1.6));
 g.save();g.globalAlpha=ap;limitClock(540,1170,200,h,t);g.restore();
 riceBowl(860,1400,0.75,t,{});
 labelTag('MÁX. 2 HORAS A TEMPERATURA AMBIENTE',540,1450,E(t,hr+0.1,0.4),C.green);};
// mecanismo: lupa sobre el arroz; las esporas aguantan la cocción y se despiertan al enfriarse
ILL.ar_esporas=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const ap=ease(E(t,s+0.1,0.6));const es=M.esp?E(t,M.esp-0.3,0.5):0;const co=M.coc?E(t,M.coc-0.6,0.5):0;const de=M.des?E(t,M.des-0.3,1.2):0;
 const heat=co*(1-cl(de*2));
 riceBowl(540,1420,1.15,t,{});if(heat>0)heatWaves(540,1240,260,t,heat);
 const SP=[[-120,-80],[60,-130],[130,40],[-60,90],[-160,60],[20,10]];
 lens(540,960,240,ap,(x,y,r)=>{riceField(x,y,r,3);if(heat>0){g.fillStyle=`rgba(255,120,60,${0.22*heat})`;g.fillRect(x-r,y-r,2*r,2*r);}
  SP.forEach((q,i)=>{const op=de>0?cl(de*1.6-i*0.12):0;spore(x+q[0],y+q[1],34,t,i,es>0?ease(cl(es*2-i*0.15)):0,op,heat);
   if(de>0.75){const k=cl((de-0.75)*4);germ(x+q[0]+40,y+q[1]+34,20,t,i+20,k);}});});
 labelTag('ESPORAS',540,660,es*(1-co),C.amber);
 labelTag('🔥 AGUANTAN LA COCCIÓN',540,660,co*(1-cl(de*3)),C.amber);
 labelTag('SE DESPIERTAN AL ENFRIARSE',540,660,de>0?E(t,M.des,0.4):0,C.red);};
// mecanismo (dato): la toxina aguanta hasta 121 °C; recalentar no la destruye
ILL.ar_toxina=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const tx=M.tox?E(t,M.tox-0.3,0.6):0;const gr=M.gra?ease(E(t,M.gra-1.2,1.4)):0;const rc=M.rec?E(t,M.rec-0.2,0.5):0;
 const val=lerp(20,121,gr);
 const yv=bigThermo(260,1360,560,val,{lo:0,hi:140,step:20,labels:[0,20,40,60,80,100,120,140],mark:121,markA:gr});
 const heat=Math.max(gr,rc);if(heat>0){heatWaves(740,1260,280,t,heat);}
 riceBowl(740,1430,1.25,t,{top:(x,y,w,h)=>{const P=[[-60,-30],[10,-58],[70,-24],[-20,-8]];P.forEach((q,i)=>toxin(x+q[0],y+q[1]+4,22,t,i,ease(cl(tx*2-i*0.2)),heat));}});
 if(rc>0)steam(740,1220,t,0.8*rc);
 labelTag('TOXINA',740,1110,tx*(1-gr),C.purple);
 labelTag('AGUANTA HASTA 121 °C',540,660,gr>0.9?E(t,M.gra-0.2,0.4):0,C.purple);
 labelTag('RECALENTAR NO LA DESTRUYE',600,1500,rc,C.red);};
// qué hacer: al táper y a la nevera, cuanto antes
ILL.ar_nevera=(c,t)=>{const s=c._s,M=c._m;const tp=M.tap?E(t,M.tap-0.3,0.6):0;const nv=M.nev||s+2;const mv=ease(E(t,nv-0.5,1.0));
 g.save();camLerp(t,s,5,[1.2,500,930],[1.26,480,940]);kitchen(t);
 const tpp=[lerp(560,320,mv),lerp(1170,1006,mv)-60*Math.sin(mv*Math.PI)];
 const rel=ease(E(t,nv+0.6,0.4));const o=arP({x:640,lh:[lerp(tpp[0]+10,520,rel),lerp(tpp[1]-25,1150,rel)],rh:[760,1150],look:[-0.9,0.2],mouth:'smile'});
 fridge(170,560,t,1);tupper(320,884,0.7,0.8,1,C.green,'#7fae4e');
 person(o,t);counterFront();ricePot(860,1182,0.5,t,{});
 tupper(tpp[0],tpp[1],0.7,0.85,tp,C.blue,RICE);hands(o);
 g.restore();
 labelTag('✓  AL TÁPER Y A LA NEVERA',540,1440,mv>0.3?E(t,nv,0.4):0,C.green);
 labelTag('CUANTO ANTES',540,660,M.ant?E(t,M.ant-0.2,0.4):0,C.amber);};
