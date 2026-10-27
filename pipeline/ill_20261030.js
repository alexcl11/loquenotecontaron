// ===== Escenas: comida caliente en la nevera (2026-10-30) · kit en ill7.js =====
function sbP(o){return Object.assign({x:560,y:1200,shirt:'#3d7bff'},o);}
const SB_POT=[885,1168,0.75];
function sbFire(x,y,w,t,a){if(a<=0)return;for(let i=0;i<9;i++){const fx=x-w/2+i*w/8;const h=(22+12*Math.sin(t*14+i*1.7))*a;g.fillStyle='rgba(80,140,255,0.9)';g.beginPath();g.moveTo(fx-8,y);g.quadraticCurveTo(fx,y-h*1.3,fx+8,y);g.fill();g.fillStyle='rgba(255,170,60,0.85)';g.beginPath();g.moveTo(fx-4,y);g.quadraticCurveTo(fx,y-h*0.8,fx+4,y);g.fill();}}
function sbGerms(cx,cy,w,h,t,n,t0,seed=0){for(let i=0;i<n;i++){const x=cx-w/2+rnd(i+seed)*w,y=cy-h/2+rnd(i+seed+40)*h;germ(x,y,12+rnd(i+seed+7)*6,t,i,ease(E(t,t0+i*0.15,0.35)));}}
// gancho: la olla se queda en el fuego "para no estropear la nevera"
ILL.sb_olla=(c,t)=>{const s=c._s,M=c._m;const nv=M.nev?ease(E(t,M.nev-0.2,0.4)):0;const wag=Math.sin(t*12)*28*nv;
 g.save();camLerp(t,s,5,[1.12,560,1000],[1.2,600,1000]);kitchen(t);wallClock(640,690,56,t,0.5);
 const o=sbP({rh:[790,1066],lh:nv>0?[lerp(470,330,nv)+wag,lerp(1150,930,nv)]:[470,1150],look:nv>0.5?[-0.9,-0.3]:[0.8,0.3],mouth:nv>0.5?'flat':'smile',brow:nv>0.5?1:0});
 person(o,t);stockPot(...SB_POT,t,{steam:1});counterFront();fridge(-20,540,t,0);hands(o);
 if(M.com)sbGerms(885,990,240,90,t,6,M.com);
 g.restore();};
// "haces cocido para tres días, apagas el fuego, que se enfríe… y te acuerdas por la noche"
ILL.sb_tarde=(c,t)=>{const s=c._s,M=c._m;const ap=M.apa?E(t,M.apa,0.4):0;const en=M.enf||s+3;const nc=M.noc||s+6;
 const out=ease(E(t,en+0.1,0.8)),back=ease(E(t,nc-0.5,0.7));const dark=0.45*E(t,en,Math.max(0.5,nc-en));
 g.save();camLerp(t,s,4,[1.2,600,1000],[1.25,620,1000]);kitchen(t);wallClock(640,690,56,t,t>en?1.6:0.15);
 const px=back>0?lerp(-260,470,back):lerp(560,-260,out);const tw=ap>0&&ap<1?ap:0;
 const o=sbP({x:px,rh:(ap>0&&out<0.1)?[lerp(700,780,tw),1150]:[px+110,1150],lh:[px-90,1150],look:back>0?[1,0.3]:[0.8,0.2],mouth:back>0.5?'o':'smile',brow:back>0.5?1:0});
 if(px>-200)person(o,t);sbFire(885,1168,190,t,1-ap);stockPot(...SB_POT,t,{steam:1-0.7*E(t,en,2.5)});counterFront();if(px>-200)hands(o);
 if(t>en+0.4){const n=Math.min(10,Math.floor((t-en-0.4)*3.5)+1);sbGerms(885,990,260,110,t,n,en+0.4,3);}
 g.restore();if(dark>0){g.fillStyle=`rgba(6,10,30,${dark})`;g.fillRect(0,470,W,1150);}};
// la comida, o caliente (+60 °C) o fría (5 °C máx.); en medio, las bacterias crecen
ILL.sb_zona=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);kitchen(t);counterFront();g.restore();g.fillStyle='rgba(6,10,20,0.66)';g.fillRect(0,470,W,1150);
 const zh=M.enc?E(t,M.enc,0.4):0,zc=M.cin?E(t,M.cin,0.4):0,zm=M.med?E(t,M.med,0.4):0;
 const val=lerp(75,30,ease(E(t,s+0.5,Math.max(1,(M.med||s+6)+1-s))));
 const yv=zoneThermo(300,1330,560,val,{zh:Math.max(zh,0.25),zc:Math.max(zc,0.25),zm:Math.max(zm,0.25)});
 labelTag('+60 °C · CALIENTE',700,yv(70),zh,C.red);labelTag('5 °C MÁX. · FRÍA',700,yv(2.5),zc,C.blue);
 if(zh>0)check(940,yv(70)-70,30,E(t,M.enc+0.3,0.4));if(zc>0)check(940,yv(2.5)-70,30,E(t,M.cin+0.3,0.4));
 if(M.med){labelTag('LAS BACTERIAS CRECEN',700,yv(32),zm,C.amber);const n=Math.min(9,Math.floor((t-M.med)*4)+1);
  for(let i=0;i<n;i++){const gx=520+rnd(i+11)*420,gy=i%2?lerp(yv(55),yv(40),rnd(i+3)):lerp(yv(24),yv(10),rnd(i+5));germ(gx,gy,14,t,i,ease(E(t,M.med+0.2+i*0.25,0.35)));}}};
// la nevera trabaja más y templa lo de al lado
ILL.sb_nevera=(c,t)=>{const s=c._s,M=c._m;const tr=M.tra?E(t,M.tra,0.4):0,tm=M.tem?E(t,M.tem,0.6):0;
 g.save();camLerp(t,s,5,[1.3,540,900],[1.4,540,930]);kitchen(t);counterFront();const jx=tr>0?Math.sin(t*35)*2*tr:0;g.translate(jx,0);fridge(390,560,t,1);
 tupper(540,884,0.7,0.8,1,C.green,'#7fae4e');meatTray(540,980,0.85);
 warmHalo(600,1130,lerp(60,260,ease(tm)),tm);tupper(460,1182,0.55,0.8,1,C.blue,'#c94f3a');stockPot(605,1182,0.47,t,{steam:1});heatWaves(605,1080,120,t,1);
 if(tm>0){g.save();g.globalAlpha=0.5*tm;g.fillStyle='#ff8a5a';rr(422,1140,77,30,8);g.fill();g.restore();}
 g.translate(-jx,0);workFx(540,880,300,520,t,tr);const [lx,ly]=scr(460,1120);g.restore();
 labelTag('TRABAJA MÁS PARA ENFRIAR',540,640,tr,C.amber);labelTag('TEMPLA LO QUE TIENE AL LADO',540,1440,tm,C.red);};
// repartir la olla en tápers pequeños y poco hondos
ILL.sb_tapers=(c,t)=>{const s=c._s,M=c._m;const t0=(M.rep||s+1)-0.2,P=1.05;const u=(t-t0)/P;const k=Math.floor(u),ph=u-k;const TX=[470,580,690];
 const fills=TX.map((_,i)=>u<0?0:(k>i?1:(k===i&&ph>0.7?ease((ph-0.7)/0.3):0)));
 let hand=[850,1010],rot=0,full=0;
 if(u>=0&&k<3){const tx=TX[k];if(ph<0.3){hand=[850,lerp(1010,1040,Math.sin(ph/0.3*Math.PI))];full=ph>0.15?1:0;}
  else if(ph<0.7){const q=ease((ph-0.3)/0.4);hand=[lerp(850,tx,q),lerp(1010,995,q)+25*Math.sin(q*Math.PI)];full=1;}
  else{hand=[tx,995];rot=0.6*Math.sin((ph-0.7)/0.3*Math.PI);full=1-(ph-0.7)/0.3;}}
 else if(k>=3){const q=ease(cl((u-3)*2));hand=[lerp(690,850,q),lerp(995,1010,q)];}
 g.save();camLerp(t,s,5,[1.3,650,1040],[1.38,640,1050]);kitchen(t);
 const o=sbP({rh:hand,lh:[450,1150],bend:[1,hand[0]<700?-1:1],look:[hand[0]>760?0.8:0.1,0.5],mouth:'smile'});person(o,t);ladle(hand[0],hand[1],rot,full);stockPot(870,1168,0.7,t,{steam:1});counterFront();
 TX.forEach((x,i)=>{tupper(x,1180,0.75,fills[i]);if(fills[i]>0.5)steam(x,1130,t,0.35);});hands(o);g.restore();
 labelTag('OLLA GRANDE: TARDA EN ENFRIARSE',540,640,E(t,s+0.3,0.4),C.red);
 if(M.hon)labelTag('✓  PEQUEÑOS Y POCO HONDOS',540,1440,E(t,M.hon,0.4),C.green);};
// baño de agua fría con hielo en el fregadero y tapa
ILL.sb_hielo=(c,t)=>{const s=c._s,M=c._m;const pf=M.fri||s+1.5;const pl=ease(E(t,s+0.2,Math.max(0.5,pf-0.4-s)));const wa=E(t,pf-0.2,1.4);const ic=M.hie?E(t,M.hie-0.2,0.5):0;
 const tp=M.tap?E(t,M.tap-0.3,0.8):0;const lvl=lerp(0.25,0.7,ease(wa));const BX=625,BY=1176;
 g.save();camLerp(t,s,5,[1.55,560,1060],[1.62,570,1060]);kitchen(t,{stove:false});faucet();
 let tpos=[lerp(470,BX,pl),lerp(1010,0,0)];
 const o=sbP({x:400,lh:[330,1150],look:[0.9,0.5],mouth:'smile'});
 const wy0=BY-300*0.42*lvl;const ty=lerp(1040,wy0+28,pl);tpos=[lerp(470,BX,pl),ty];
 const lidY=tpos[1]+lerp(-150,-58,ease(tp))*0.8;
 o.rh=tp>0&&tp<1?[BX+30,lidY]:(pl<1?[tpos[0]+60,tpos[1]-30]:[465,1165]);
 person(o,t);counterFront();sink();
 waterStream(t,605,980,wy0,wa>0&&wa<1?1:0);
 iceBath(BX,BY,300,t,lvl,ic,(x,wy)=>{tupper(tpos[0],tpos[1],0.8,1,tp);});
 if(tp<1)steam(tpos[0],tpos[1]-50,t,0.6*(1-tp));
 hands(o);g.restore();
 if(M.esc){const p=E(t,M.esc-0.3,0.5);labelTag('SIN TAPA, EL VAPOR HACE ESCARCHA',540,640,p,C.blue);if(p>0){g.save();g.globalAlpha=p;flake(150,760,20,t);flake(930,760,20,t+1);g.restore();}}};
// a la nevera, a 5 °C como máximo: 3–4 días
ILL.sb_guardar=(c,t)=>{const s=c._s,M=c._m;const mv=ease(E(t,s+0.2,1));const ci=M.cin?E(t,M.cin,0.4):0,di=M.dia?E(t,M.dia,0.4):0;
 g.save();camLerp(t,s,5,[1.2,500,930],[1.26,480,940]);kitchen(t);
 const tp=[lerp(560,320,mv),lerp(1020,1006,mv)-60*Math.sin(mv*Math.PI)];
 const o=sbP({x:640,lh:mv<1?[tp[0],tp[1]-20]:[560,1150],rh:[740,1150],look:[-0.9,0.2],mouth:'smile'});person(o,t);counterFront();fridge(170,560,t,1);
 tupper(320,884,0.7,0.8,1,C.green,'#7fae4e');tupper(tp[0],tp[1],0.7,0.8,1,C.blue);meatTray(320,1150,0.8);hands(o);
 const [fx,fy]=scr(320,650);g.restore();
 labelTag('5 °C COMO MÁXIMO',fx,fy,ci,C.blue);labelTag('AGUANTAN 3–4 DÍAS',540,1440,di,C.green);};
// recalentar: 70 °C durante 2 minutos
ILL.sb_recalentar=(c,t)=>{const s=c._s,M=c._m;const on=M.rec?E(t,M.rec,0.2):0;const sv=M.set||s+2.5;const out=t>=sv-0.3;const th=E(t,sv-0.3,0.9);
 g.save();camLerp(t,s,5,[1.35,650,1040],[1.45,640,1040]);kitchen(t,{stove:false});
 const press=on>0&&!out?ease(E(t,M.rec-0.4,0.4))*(1-ease(E(t,M.rec+0.3,0.4))):0;
 const rh=out?[650,1020-10*Math.sin(Math.min(1,th)*Math.PI)]:[lerp(700,850,press),lerp(1150,1095,press)];
 const o=sbP({x:out?430:560,rh,lh:[out?330:450,1150],look:out?[0.9,0.6]:[0.9,0.3],mouth:'smile'});person(o,t);counterFront();
 microwave(780,1178,1.15,t,(on>0&&!out)?1:0);
 if(out){tupper(610,1180,0.8,1,0);steam(610,1120,t,0.8);thermo(650,1160,0.7,lerp(20,70,ease(th)));}
 hands(o);g.restore();
 if(M.min)labelTag('⏱  2 MINUTOS',540,1440,E(t,M.min,0.4),C.green);};
