// ===== Escenas: un grado más de calefacción (2026-10-29) · kit en ill6.js =====
const CF_TH=[640,900],CF_RAD=[50,1105,200,150];
// salón con radiador bajo la ventana y termostato en la pared
function cfSalon(t,o={}){salon(t,{lamp:o.lamp??1,dark:o.dark||0});const vp=radiator(...CF_RAD,o.heat??0.6,t,{valve:o.valve,vk:o.vk});wallThermostat(CF_TH[0],CF_TH[1],0.9,o.temp??21,{glow:o.glow,off:o.off});return vp;}
function scr(x,y){const m=g.getTransform();return [m.a*x+m.c*y+m.e,m.b*x+m.d*y+m.f];}
function cfP(o){return Object.assign({x:470,y:1205,apron:false,shirt:'#3d7bff'},o);}
function coinsFrom(x,y,t,t0,n=7,tx=880,ty=620){for(let i=0;i<n;i++){const k=E(t,t0+i*0.13,1.1);if(k<=0||k>=1)continue;const [cx,cy]=arcPath(x,y,tx-60+i*25,ty,160,ease(k));coin(cx,cy,1.1,t*6+i);}}
// gancho: sube un grado "que no se nota"… y sí se nota
ILL.cf_subir=(c,t)=>{const s=c._s,M=c._m;const up=E(t,s+0.7,0.3);const pr=ease(E(t,s+0.2,0.5))*(1-ease(E(t,s+1.3,0.5)));const wo=M.pues?E(t,M.pues,0.3):0;
 g.save();camLerp(t,(M.pues||s+3)-0.3,1.2,[1.3,500,980],[1.55,470,1010]);
 const temp=up>0.5?22:21;cfSalon(t,{temp,heat:0.6+0.3*up,glow:pr});
 const o=cfP({rh:[lerp(560,CF_TH[0]-30,pr),lerp(1150,CF_TH[1]+10,pr)],lh:[400,1150],look:[0.8,-0.2*pr],mouth:wo>0.5?'o':'smile',brow:wo>0.5?1:0});person(o,t);hands(o);sofa(...SOFA);
 const [tx,ty]=scr(CF_TH[0],CF_TH[1]);g.restore();
 labelTag('+1 °C',Math.min(tx+150,990),ty,up,C.amber);
 if(M.pct){labelTag('+7 % DE ENERGÍA',250,1320,E(t,M.pct,0.4),C.red);coinsFrom(250,1300,t,M.pct+0.3,6,300,820);}};
// "llegas helado y lo pones a tope"
ILL.cf_tope=(c,t)=>{const s=c._s,M=c._m;const top=M.tope?E(t,M.tope-0.4,0.9):0;const reach=M.tope?ease(E(t,M.tope-0.9,0.5)):0;const cold=1-0.6*top;const jit=Math.sin(t*40)*4*cold;
 g.save();camLerp(t,s,5,[1.3,500,990],[1.42,520,990]);
 const temp=lerp(17,30,ease(top));cfSalon(t,{temp,heat:0.1+0.8*top,glow:top>0?1:0,lamp:0.7});
 const o=cfP({x:470+jit,shirt:'#5b6b8a',rh:reach>0?[lerp(560,CF_TH[0]-30,reach),lerp(1150,CF_TH[1]+10,reach)]:[540,1020],lh:[410+jit,1020],look:[reach>0.5?0.8:0,-0.2],mouth:top>0.6?'smile':'worry',brow:top>0.6?0:1});
 person(o,t);scarf(o,t,'#e5484d');hands(o);sofa(...SOFA);
 shiverFx(o.x,880,t,cold*(M.hel?E(t,M.hel,0.3):0.6));if(cold>0.4){g.save();g.globalAlpha=0.6*cold;for(let i=0;i<8;i++)flake(120+rnd(i)*840,640+((t*40+rnd(i+4)*500)%560),12,t+i);g.restore();}
 if(top>0.3){g.save();g.globalAlpha=cl((top-0.3)*3);g.strokeStyle=C.red;g.lineWidth=6;g.beginPath();g.arc(CF_TH[0],CF_TH[1],78+6*Math.sin(t*8),0,7);g.stroke();g.restore();}
 g.restore();};
// el termostato no es un acelerador: misma velocidad, pero a 30 te pasas
ILL.cf_meta=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);salon(t,{lamp:0.5});sofa(...SOFA);g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);
 const t0=s+0.6,t21=Math.max(t0+1.5,(M.rap||s+4)),rate=7/(t21-t0);const v=Math.max(14,14+(t-t0)*rate);
 const vL=Math.min(21,v),vR=Math.min(30,v);const yL=bigThermo(330,1330,470,vL,{goal:21,col:vL>=21?C.green:C.amber});const yR=bigThermo(760,1330,470,vR,{goal:21,col:tempCol(vR)});
 wallThermostat(330,700,0.9,21,{});wallThermostat(760,700,0.9,30,{glow:0.6});
 if(M.has)labelTag('LÍMITE, NO VELOCIDAD',540,1505,E(t,M.has,0.4),C.amber);
 if(M.rap){const p=E(t,M.rap,0.4);g.save();g.globalAlpha=cl(p*3);g.setLineDash([10,10]);g.strokeStyle='#fff';g.lineWidth=4;g.beginPath();g.moveTo(370,yL(21));g.lineTo(720,yR(21));g.stroke();g.restore();labelTag('= MISMA VELOCIDAD',545,yL(21)-50,p,C.blue);}
 if(M.tope&&vR>21.5)labelTag('TE PASAS',630,yR(vR)-10,E(t,M.tope,0.4),C.red);
 if(M.pag)coinsFrom(760,yR(vR),t,M.pag,8,560,620);};
// cada grado se suma: 21, 22, 23… y la factura sube
ILL.cf_grados=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);salon(t,{lamp:0.5});sofa(...SOFA);g.restore();g.fillStyle='rgba(6,10,20,0.6)';g.fillRect(0,470,W,1150);
 const st=[M.a,M.b,M.c].map(m=>m?E(t,m-0.1,0.4):0);const v=20+st[0]+st[1]+st[2];
 const yv=bigThermo(260,1330,470,Math.max(20,v),{lo:16,hi:26});
 // monedas: una columna por grado de más
 [[22,1],[23,2]].forEach(([deg,i])=>{const p=st[i];if(p<=0)return;const x=420+i*180;const n=Math.round(3+i*2);for(let k=0;k<n;k++){const kp=cl(p*n-k);if(kp<=0)continue;coin(x,1330-k*30-(1-ease(kp))*80,1.25,0.3);}
  labelTag('+7 %',x,1330-n*30-60,p,C.red);txt(deg+'°',x,1400,40,'#fff',900,'center',cl(p*3));});
 coin(420,1330,1.25,0.3);coin(420,1300,1.25,0.3);txt('21°',420,1400,40,'#fff',900,'center',st[0]);
 if(M.f){const p=E(t,M.f,0.5);const y=lerp(1250,820,ease(p));g.save();g.globalAlpha=cl(p*3);g.fillStyle='#f4f6fb';rr(820,y-110,200,220,14);g.fill();g.fillStyle=C.red;rr(820,y-110,200,44,[14,14,0,0]);g.fill();
  g.fillStyle='#c9ced8';for(let k=0;k<5;k++)g.fillRect(840,y-40+k*28,160-(k%2)*50,10);txt('FACTURA',920,y-88,22,'#fff',900);g.restore();
  g.strokeStyle=C.red;g.lineWidth=10;g.lineCap='round';g.globalAlpha=cl(p*3);g.beginPath();g.moveTo(920,y+150);g.lineTo(920,y+250);g.moveTo(890,y+180);g.lineTo(920,y+150);g.lineTo(950,y+180);g.stroke();g.globalAlpha=1;}};
// casi la mitad de la energía de casa es calefacción
ILL.cf_mitad=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);cfSalon(t,{temp:21,heat:0.7});sofa(...SOFA);g.restore();g.fillStyle='rgba(6,10,20,0.62)';g.fillRect(0,470,W,1150);
 const p=M.mit?ease(E(t,M.mit-0.3,1.4)):0;energyHouse(540,1340,470,0.46*p+0.02,t);
 heatWaves(540,1300,300,t,p);if(p>0.6){emoji('🔥',540,1210,70,cl((p-0.6)*3));}
 labelTag('CALEFACCIÓN',540,1340-538*0.46*p-40,M.cal?E(t,M.cal,0.4):0,C.amber);};
// lo recomendado: 19–21 °C, con jersey en el sofá
ILL.cf_bien=(c,t)=>{const s=c._s,M=c._m;const dn=M.ent?ease(E(t,M.ent-0.2,1)):0;g.save();camLerp(t,s,5,[1.15,500,1010],[1.25,520,1010]);
 const temp=Math.round(lerp(25,20,dn));cfSalon(t,{temp,heat:0.5,lamp:1,glow:dn>0&&dn<1?1:0});
 const o=cfP({x:510,y:1262,shirt:'#c0504d',rh:[600,1150],lh:[430,1170],look:[0.6,-0.3],mouth:'smile'});person(o,t);jerseyCollar(o,t);hands(o);sofa(...SOFA);
 if(M.ent)check(CF_TH[0]+95,CF_TH[1]-60,34,E(t,M.ent+0.8,0.4));
 g.restore();};
// por la noche: 15–17 °C en el dormitorio… o apagarla
ILL.cf_noche=(c,t)=>{const s=c._s,M=c._m;const q=M.qui?ease(E(t,M.qui-0.2,0.9)):0;const off=M.apa?E(t,M.apa,0.4):0;
 g.save();camLerp(t,s,6,[1.2,600,1010],[1.32,620,1010]);
 bedroom(t,{temp:lerp(21,16,q),off:off>0.5,lamp:1-off,blind:0.6,dark:0.25*off});
 const o=cfP({x:590,y:1300,shirt:'#8b7cf6',lh:[470,1290],rh:[710,1290],look:[off>0.5?0:0.8,off>0.5?0.6:-0.4],mouth:off>0.5?'flat':'smile'});person(o,t);duvet(t);
 zzz(680,930,t,off);const [tx,ty]=scr(960,760);g.restore();if(M.qui)labelTag('🌙  15–17 °C',Math.min(tx,900),ty-110,E(t,M.qui,0.4),C.blue);};
// trucos: ventilar 10 minutos, bajar persianas, válvulas termostáticas
ILL.cf_trucos=(c,t)=>{const s=c._s,M=c._m;const ve=M.ven?E(t,M.ven-0.2,0.5)*(1-E(t,M.ven+2.2,0.5)):0;const pe=M.per?ease(E(t,M.per,1)):0;const va=M.val?ease(E(t,M.val-0.4,0.9)):0;
 g.save();camLerp(t,(M.val||s+99)-0.4,0.9,[1.25,200,940],[1.7,260,1100]);
 const vp=cfSalon(t,{temp:20,heat:0.65,valve:1,vk:M.aho?Math.sin(E(t,M.aho-0.3,0.6)*Math.PI):0});
 if(ve>0){g.fillStyle=`rgba(150,200,255,${0.25*ve})`;rr(52,612,206,256,6);g.fill();g.fillStyle='#3c2c26';g.save();g.globalAlpha=ve;g.beginPath();g.moveTo(52,612);g.lineTo(52+98*(1-0.6*ve),612+30*ve);g.lineTo(52+98*(1-0.6*ve),868-30*ve);g.lineTo(52,868);g.closePath();g.fill();g.restore();
  coldIn(330,700,t,ve,1,160);}
 blind(52,612,206,256,pe);
 if(vp&&M.val){const p=E(t,M.val,0.5);g.save();g.globalAlpha=cl(p*3);g.strokeStyle=C.amber;g.lineWidth=5;g.beginPath();g.arc(vp[0],vp[1]-4,46+4*Math.sin(t*6),0,7);g.stroke();g.restore();}
 g.restore();
 labelTag('⏱  VENTILA 10 MIN',810,1000,M.ven?E(t,M.ven,0.4):0,C.blue);labelTag('PERSIANAS ABAJO',810,1090,M.per?E(t,M.per,0.4):0,C.amber);labelTag('VÁLVULAS: −8 a 13 %',780,1180,M.aho?E(t,M.aho,0.4):0,C.green);};
