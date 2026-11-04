// ===== Escenas: agua del grifo (2026-11-07) · kit en ill15.js (usa fridgeLow de ill14.js y stopwatch de ill13.js) =====
function agP(o){return Object.assign({x:450,y:1200,shirt:'#3d7bff'},o);}
function agCut(t,ks){const fl=Math.max(0,...ks.map(k=>1-cl(Math.abs(t-k)/0.12)));if(fl>0){g.fillStyle=`rgba(8,12,22,${fl*0.9})`;g.fillRect(0,470,W,1150);}}
// gancho: deja el pack de botellas en la encimera y mira el grifo con desconfianza
ILL.ag_gancho=(c,t)=>{const s=c._s,M=c._m;const dn=ease(E(t,s+0.1,0.8));const lk=M.gri?ease(E(t,M.gri-0.2,0.5)):0;const mt=M.mit?E(t,M.mit-0.2,0.3):0;
 const PX=270,py=lerp(1100,1180,dn);
 g.save();camLerp(t,s,4,[1.1,500,1000],[1.2,480,990]);kitchen(t);
 const o=agP({x:470,lh:[PX-70,py-60],rh:[PX+80,py-60],look:lk>0.5?[0.9,-0.1]:[-0.5,0.5],mouth:mt>0.5?'o':(lk>0.5?'flat':'smile'),brow:lk>0.5?1:0});
 person(o,t);bottlePack(PX,py,0.9,0);sink();faucet();tapDrip(605,990,t,lk);hands(o);counterFront();
 g.restore();};
// pregunta temprana: llena un vaso en el grifo y lo levanta mirando a cámara
ILL.ag_pregunta=(c,t)=>{const s=c._s,M=c._m;const f=ease(E(t,s+0.1,1.0));const up=M.q?ease(E(t,M.q-0.1,0.6)):0;
 g.save();cam(1.4,520,1000);kitchen(t);
 const gx=lerp(605,560,up),gy=lerp(1110,1010,up);
 const o=agP({x:450,rh:[gx+30,gy-40],lh:[340,1150],look:up>0.5?[0,0.1]:[0.8,0.7],mouth:'smile',brow:up>0.5?1:0});
 person(o,t);if(up<0.15)waterStream(t,605,985,gy-80*f,1-up/0.15);glassCup(gx,gy,0.9,0,0.85*f,WCOL);sink();faucet();hands(o);counterFront();
 g.restore();};
// el sabor "raro" es cloro: desinfecta (las bacterias desaparecen) en dosis que no hacen daño
ILL.ag_cloro=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);const GX=540,GY=1340;
 g.save();g.globalAlpha=ease(E(t,s,0.4));glassCup(GX,GY,4.4,0,0.92,WCOL);g.restore();
 const ca=M.clo?ease(E(t,M.clo-0.2,0.5)):0;const kd=M.des?E(t,M.des,0.9):0;
 const GS=[[-90,-300],[60,-240],[-30,-150],[100,-110],[-110,-70]];
 GS.forEach(([dx,dy],i)=>{const kill=kd>0?cl((kd-i*0.12)*2.2):0;germ(GX+dx,GY+dy,20,t,i,ease(E(t,s+0.2+i*0.1,0.3))*(1-kill),kill);burst(GX+dx,GY+dy,kill>0&&kill<1?kill:0);});
 const CS=[[-40,-340],[120,-300],[0,-220],[-120,-200],[50,-170],[150,-60],[-60,-100],[90,-380],[-140,-330]];
 CS.forEach(([dx,dy],i)=>{const tg=GS[i%5];const mv=kd>0?ease(cl((kd-i*0.05)*1.6))*0.6:0;clDot(GX+lerp(dx,tg[0],mv)+Math.sin(t*2+i)*6,GY+lerp(dy,tg[1],mv)+Math.cos(t*2.3+i)*6,15,ca*(1-0.4*cl(kd*2)));});
 if(!M.des||t<M.des-0.2)labelTag('¿ESE SABOR? ES EL CLORO',540,640,ca,C.blue);else labelTag('SE AÑADE PARA DESINFECTARLA',540,640,1,C.green);
 labelTag('EN DOSIS QUE NO HACEN DAÑO ✓',540,1450,M.dos?E(t,M.dos-0.1,0.4):0,C.green);};
// qué hacer: llenar una jarra → media hora de reposo (el cloro se evapora) → a la nevera
ILL.ag_jarra=(c,t)=>{const s=c._s,M=c._m;const k1=(M.rep||s+3)-0.25,k2=(M.nev||s+6)-0.25;const stg=t<k1?1:(t<k2?2:3);
 g.save();
 if(stg===1){camLerp(t,s,k1-s,[1.3,560,1020],[1.4,570,1030]);kitchen(t);
  const f=ease(E(t,(M.jar||s+0.5)-0.3,Math.max(0.8,k1-(M.jar||s+0.5))));
  const o=agP({x:450,rh:[650,1080],lh:[330,1150],look:[0.8,0.7],mouth:'smile'});
  person(o,t);waterJug(605,1168,0.72,0,0.85*f,t);waterStream(t,605,985,1168-0.72*190*0.85*f,1);sink();faucet();hands(o);counterFront();}
 else if(stg===2){cam(1.9,540,1060);kitchen(t);counterFront();
  waterJug(540,1180,1,0,0.85,t);const p=E(t,k1+0.1,Math.max(0.8,k2-k1-0.3));clVapor(540,990,110,t,1-0.7*p,10,110);}
 else{cam(1.2,210,1060);kitchen(t);counterFront();fridgeLow(60,640,t,1,0);
  const ip=ease(E(t,k2,0.7));waterJug(lerp(520,200,ip),lerp(1180,1262,ip),0.78,0,0.85,t,WCOLD,'#8fb4e0');
  const fd=M.clo?E(t,M.clo-0.2,0.8):0;clVapor(200,1100,70,t,0.5*(1-fd),5,90);for(let i=0;i<5;i++)flake(110+rnd(i+4)*170,1130+rnd(i+9)*90,9,t+i);}
 g.restore();
 if(stg===2)stopwatch(860,900,80,E(t,k1+0.1,Math.max(0.8,k2-k1-0.3)),'30 MIN',C.blue,E(t,k1,0.3));
 const lab=stg===1?['1 · LLÉNALA EN UNA JARRA',C.blue,E(t,s+0.2,0.4)]:stg===2?['2 · MEDIA HORA EN REPOSO',C.amber,E(t,k1+0.1,0.4)]:['3 · Y LUEGO, A LA NEVERA ❄️',C.blue,E(t,k2+0.1,0.4)];
 labelTag(lab[0],540,640,lab[2],lab[1]);
 if(stg===3)labelTag('EL SABOR A CLORO CASI DESAPARECE ✓',540,1450,M.clo?E(t,M.clo-0.2,0.4):0,C.green);
 agCut(t,[k1,k2]);};
