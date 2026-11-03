// ===== Escenas: volver a congelar lo descongelado (2026-11-06) · kit en ill14.js (usa sbFire de ill_20261030.js) =====
const RC_FX=60,RC_FY=640; // nevera baja: congelador en x 74–346, y 654–830
function rcP(o){return Object.assign({x:540,y:1200,shirt:'#3d7bff'},o);}
// gancho: con la carne descongelada en la mano, duda si volver a meterla en el congelador
ILL.rc_gancho=(c,t)=>{const s=c._s,M=c._m;const mv=M.vol?ease(E(t,M.vol-0.2,0.9)):0;const st=M.dep?ease(E(t,M.dep-0.3,0.5)):0;const k=mv*(1-0.55*st);
 const px=lerp(450,280,k),py=lerp(1080,840,k);
 g.save();camLerp(t,s,4,[1.12,470,990],[1.2,460,980]);kitchen(t);counterFront();fridgeLow(RC_FX,RC_FY,t,0,1);
 const o=rcP({lh:[px,py+12],rh:[700,1150],look:st>0.5?[0,0.1]:(mv>0.2?[-0.9,-0.4]:[-0.4,0.6]),mouth:st>0.5?'o':'smile',brow:st>0.5?1:0});
 person(o,t);frozenPack(px,py,0.85,-0.08,{ice:0,drip:1,t});hands(o);
 juicePuddle(470,1180,120,1-mv);
 g.restore();qMarks(560,700,t,st);};
// pregunta temprana: primer plano, se encoge de hombros
ILL.rc_pregunta=(c,t)=>{const s=c._s,M=c._m;const sh=M.q?ease(E(t,M.q-0.2,0.5)):0;
 g.save();cam(1.45,470,1000);kitchen(t);counterFront();fridgeLow(RC_FX,RC_FY,t,0,1);
 const o=rcP({lh:[400,1060-30*sh],rh:[lerp(700,690,sh),lerp(1150,1000,sh)],look:[0,0.1],mouth:'smile',brow:sh>0.5?1:0});
 person(o,t);frozenPack(400,1050-30*sh,0.85,-0.08,{ice:0,drip:1,t});hands(o);g.restore();qMarks(560,760,t,sh);};
// el frío no mata las bacterias: las duerme; al descongelar se despiertan y se multiplican
ILL.rc_dormidas=(c,t)=>{const s=c._s,M=c._m;const th=M.des?ease(E(t,M.des-0.3,1.0)):0;const PX=540,PY=1060;
 g.save();cam(1,540,1050);kitchen(t);counterFront();g.restore();g.fillStyle='rgba(6,10,20,0.35)';g.fillRect(0,470,W,1150);
 freezerBG(t,1-th);juicePuddle(PX,1180,420,th);
 frozenPack(PX,PY,2.5,0,{ice:1-th,drip:th,t});iceBlock(PX,PY,560,330,1-th,t);
 const SP=[[-150,-40],[90,-60],[-20,40],[160,30],[-90,70],[40,-10],[-170,20],[130,-30],[-60,-60],[190,-70],[-120,10],[70,60],[0,-75],[-200,-60],[210,60],[100,10]];
 const n=M.mul&&t>M.mul?5+Math.min(11,Math.floor((t-M.mul)*9)):5;
 for(let i=0;i<n;i++){const [dx,dy]=SP[i];const ap=i<5?ease(E(t,s+0.2+i*0.12,0.35)):ease(E(t,M.mul+(i-5)/9,0.3));const pop=i<5?0:cl(1-E(t,M.mul+(i-5)/9,0.3));
  napGerm(PX+dx,PY+dy,i<5?24:20,t,i,ap,1-th,pop*0.4);}
 const pm=M.mat?E(t,M.mat,0.4):0,pd=M.due?E(t,M.due,0.4):0;
 if(!M.des||t<M.des-0.2)labelTag(pd>0?'NO LAS MATA: SOLO LAS DUERME 💤':'EL FRÍO NO MATA LAS BACTERIAS',540,640,Math.max(pm,pd),C.blue);
 if(M.des&&t>M.des-0.2)labelTag(M.mul&&t>M.mul?'¡Y SE MULTIPLICAN!':'AL DESCONGELAR, SE DESPIERTAN',540,M.mul&&t>M.mul?1440:640,M.mul&&t>M.mul?E(t,M.mul,0.4):E(t,M.des-0.2,0.4),M.mul&&t>M.mul?C.red:C.amber);
 if(M.mul&&t>M.mul)labelTag('AL DESCONGELAR, SE DESPIERTAN',540,640,1,C.amber);};
// recongelar en crudo: las bacterias vuelven al congelador con la carne; y pierde jugo
ILL.rc_recongelar=(c,t)=>{const s=c._s,M=c._m;const t0=(M.vue||s+0.5)-0.1;const mv=ease(E(t,t0,1.0));const placed=t>t0+1.05;const back=ease(E(t,t0+1.15,0.6));
 const FX=215,FY=770;const px=lerp(420,FX,mv),py=lerp(1080,FY,mv);
 g.save();cam(1.22,390,960);kitchen(t);counterFront();fridgeLow(RC_FX,RC_FY,t,0,1);
 const hand=placed?[lerp(FX+30,440,back),lerp(FY+10,1120,back)]:[px+20,py+12];
 const o=rcP({x:500,lh:hand,rh:[700,1150],look:mv>0.2&&!placed?[-0.9,-0.6]:[-0.6,-0.2],mouth:'flat'});
 person(o,t);juicePuddle(430,1180,130,1);
 frozenPack(placed?FX:px,placed?FY:py,lerp(0.85,0.7,mv),-0.08,{ice:placed?0.6*E(t,t0+1.2,1.5):0,drip:placed?0:1,t});
 const sl=placed?ease(E(t,t0+1.3,0.8)):0;const sc=lerp(0.85,0.7,mv);const cx=placed?FX:px,cy=placed?FY:py;
 [[-50,-10],[30,-20],[-10,18],[55,12],[-60,20]].forEach(([dx,dy],i)=>napGerm(cx+dx*sc,cy+dy*sc,13,t,i,ease(E(t,s+0.1+i*0.08,0.3)),sl));
 hands(o);
 if(M.sig&&t>M.sig){g.strokeStyle=C.red;g.lineWidth=5;g.globalAlpha=cl(E(t,M.sig,0.3)*3);g.beginPath();g.arc(FX,FY,92+6*Math.sin(t*7),0,7);g.stroke();g.globalAlpha=1;}
 if(M.jug&&t>M.jug-0.1){const dp=E(t,M.jug-0.1,0.4);g.strokeStyle=C.amber;g.lineWidth=5;g.globalAlpha=cl(dp*3);g.beginPath();g.ellipse(430,1180,95,26,0,0,7);g.stroke();g.globalAlpha=1;}
 g.restore();
 labelTag('EN CRUDO, NO LAS ELIMINA: SIGUEN AHÍ',540,640,M.sig?E(t,M.sig-0.3,0.4):0,C.red);
 labelTag('Y LA CARNE PIERDE JUGO 💧',540,1440,M.jug?E(t,M.jug-0.1,0.4):0,C.amber);};
// el truco: descongelar en la nevera → cocinar (+70 °C) → congelar el plato cocinado
ILL.rc_truco=(c,t)=>{const s=c._s,M=c._m;const k1=(M.coc||s+3)-0.25,k2=(M.pla||s+6)-0.25;const stg=t<k1?1:(t<k2?2:3);
 g.save();
 if(stg===1){camLerp(t,s,k1-s,[1.45,210,1010],[1.55,210,1020]);kitchen(t);counterFront();fridgeLow(RC_FX,RC_FY,t,1,1);
  const th=ease(E(t,s+0.3,Math.max(0.6,k1-s-0.5)));frozenPack(210,1050,0.9,0,{ice:1-th,t});juicePuddle(210,1086,150,th*0.6);}
 else if(stg===2){camLerp(t,k1,k2-k1,[1.3,700,1010],[1.38,720,1010]);kitchen(t);
  const st=Math.sin(t*5);const o=rcP({x:560,rh:[810+st*35,1000+Math.cos(t*5)*10],lh:[450,1150],look:[0.8,0.5],mouth:'smile'});person(o,t);
  sbFire(820,1168,190,t,1);stockPot(820,1168,0.75,t,{steam:1,soup:'#a45a2a'});meatballs(820,1168,0.75,6);ladle(o.rh[0],o.rh[1]-60,0.1,0,'#a45a2a');
  const tv=lerp(20,74,ease(E(t,k1+0.3,Math.max(0.8,k2-k1-1.0))));thermo(905,1040,0.62,tv);counterFront();hands(o);
  for(let i=0;i<5;i++){const gx=750+i*30,gy=1022+(i%2)*6;const kill=tv>=70?E(t,k2-0.9+i*0.06,0.25):0;germ(gx,gy,10,t,i,1-kill,kill);burst(gx,gy,kill>0?E(t,k2-0.75+i*0.06,0.4):0);}}
 else{cam(1.7,210,770);kitchen(t);counterFront();fridgeLow(RC_FX,RC_FY,t,0,0);
  const ip=ease(E(t,k2,0.6));const lid=ease(E(t,k2+0.4,0.5));tupper(210,lerp(900,808,ip),1.05,1,lid,C.blue,'#a45a2a');
  const fr=E(t,(M.con||k2+1.5)-0.2,0.8);frostTupper(210,808,1.05,fr*ip,'GUISO');for(let i=0;i<6;i++)flake(110+rnd(i+4)*200,680+rnd(i+9)*60,10,t+i);
  }
 g.restore();
 const lab=stg===1?['1 · DESCONGELAR EN LA NEVERA',C.blue,E(t,s+0.2,0.4)]:stg===2?['2 · COCINAR A MÁS DE 70 °C',C.red,E(t,k1+0.1,0.4)]:['3 · ESE PLATO, SÍ, AL CONGELADOR',C.green,E(t,k2+0.1,0.4)];
 labelTag(lab[0],540,640,lab[2],lab[1]);if(stg===3&&M.con)check(540,1430,40,E(t,M.con,0.5));
 const fl=Math.max(1-cl(Math.abs(t-k1)/0.12),1-cl(Math.abs(t-k2)/0.12));if(fl>0){g.fillStyle=`rgba(8,12,22,${fl*0.9})`;g.fillRect(0,470,W,1150);}};
