// ===== Kit: calefacción de noche (2026-11-22) · usa radiator/heatWaves/wallThermostat de ill6.js, moonI de ill.js, sunDisk de ill10.js =====
// caldera de pared genérica (sin marca): caja blanca con piloto y ventanilla de llama. (x,y) = centro. fire 0–1
function wallBoiler(x,y,s,t,fire=0){g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-86,-120,180,250,22);g.fill();
 g.fillStyle='#f4f1ea';rr(-90,-128,180,250,22);g.fill();g.fillStyle='#e2ddd1';rr(-90,70,180,52,[0,0,22,22]);g.fill();
 // pantalla y mandos
 g.fillStyle='#10141c';rr(-56,-100,112,40,10);g.fill();g.fillStyle=fire>0.3?C.amber:'#5c667a';g.font=`900 24px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(fire>0.3?'ON':'—',0,-79);
 [-40,40].forEach(dx=>{g.fillStyle='#c9c2b3';g.beginPath();g.arc(dx,92,14,0,7);g.fill();});
 // ventanilla de llama
 g.fillStyle='#1d1b2a';rr(-44,-36,88,80,14);g.fill();
 if(fire>0){for(let i=0;i<5;i++){const fx=-30+i*15,fh=(26+12*Math.sin(t*14+i*1.7))*fire;g.fillStyle=i%2?'#ffb35a':'#3d7bff';g.beginPath();g.moveTo(fx-7,34);g.quadraticCurveTo(fx,34-fh*1.4,fx+7,34);g.closePath();g.fill();}
  const gl=g.createRadialGradient(0,10,4,0,10,90);gl.addColorStop(0,`rgba(255,170,80,${0.35*fire})`);gl.addColorStop(1,'rgba(255,170,80,0)');g.fillStyle=gl;g.fillRect(-100,-80,200,180);}
 // tubos
 g.fillStyle='#8592a6';[-50,-18,18,50].forEach(dx=>g.fillRect(dx-5,122,10,40));
 g.restore();}
// barra de programación de una noche (izquierda = al acostarse, derecha = de día). Sin horas.
// o.p revela de izq. a der.; o.off 0–1 = el tramo de noche pasa a APAGADA (azul); o.pre = ancho (0–1 del tramo de noche) del encendido antes de levantarse; o.cur = cursor 0–1; o.a = opacidad
const SB_NA=0.16,SB_NB=0.74; // inicio y fin del tramo de noche (fracción del ancho)
function schedBar(x,y,w,h,t,o={}){const a=o.a??1;if(a<=0)return;const p=o.p??1,off=o.off||0,pre=o.pre||0;g.save();g.globalAlpha*=a;
 g.fillStyle='rgba(20,29,48,0.9)';rr(x-10,y-10,w+20,h+20,h/2+10);g.fill();
 g.save();rr(x,y,w,h,h/2);g.clip();
 const nA=x+w*SB_NA,nB=x+w*SB_NB,preX=nB-(nB-nA)*pre;
 const seg=(x0,x1,col)=>{const xe=Math.min(x1,x+w*p);if(xe>x0){g.fillStyle=col;g.fillRect(x0,y,xe-x0,h);}};
 seg(x,nA,C.amber);seg(nA,nB,mixc('#f2a33a','#2a4fa8',off));if(pre>0)seg(preX,nB,C.amber);seg(nB,x+w,C.amber);
 g.fillStyle='rgba(255,255,255,0.12)';g.fillRect(x,y,w,h*0.35);g.restore();
 if(off>0.5){txt('APAGADA',(nA+(pre>0?preX:nB))/2,y+h/2+2,Math.min(30,h*0.5),'#fff',900,'center',cl((off-0.5)*2)*cl(p*3));}
 moonI(x+w*0.42,y-46,24);sunDisk(x+w*0.88,y-46,18,t,1);
 if(o.cur!=null){const cx=x+w*o.cur;g.fillStyle='#fff';rr(cx-4,y-18,8,h+36,4);g.fill();g.beginPath();g.moveTo(cx-14,y-30);g.lineTo(cx+14,y-30);g.lineTo(cx,y-14);g.closePath();g.fill();}
 g.restore();}
// gráfica de temperatura de la casa durante una noche (sin cifras). Izq. = al acostarse (luna), der. = al levantarse (sol).
// o.on = trazado 0–1 de «ENCENDIDA» (línea ámbar plana); o.off = trazado 0–1 de «APAGADA» (azul: baja poco a poco y sube por la mañana);
// o.loss 0–1 = sombrea el calor que se pierde (entre cada línea y el frío de fuera); o.rise 0–1 = recuperación de la mañana; o.sun 0–1
function nightCurve(x,y,w,h,t,o={}){const yHi=y+h*0.18,yLo=y+h*0.62,yOut=y+h*0.9,xw=x+w*0.8;
 g.fillStyle='rgba(20,29,48,0.97)';rr(x-30,y-40,w+60,h+80,26);g.fill();
 // frío de fuera
 g.save();g.setLineDash([12,12]);g.strokeStyle='rgba(160,210,255,0.6)';g.lineWidth=4;g.beginPath();g.moveTo(x,yOut);g.lineTo(x+w,yOut);g.stroke();g.restore();
 txt('❄ FRÍO DE FUERA',x+w-10,yOut+30,24,'rgba(160,210,255,0.85)',800,'right');
 moonI(x+30,y-2,22);if(o.sun!=null)sunDisk(x+w-30,y-2,18,t,o.sun??1);
 const rise=o.rise||0;
 const dec=f=>yHi+(yLo-yHi)*(1-Math.exp(-2.4*f/0.8))/(1-Math.exp(-2.4));
 const blueY=f=>f<0.8?dec(f):lerp(yLo,yHi,ease(cl((f-0.8)/0.12))*rise);
 const path=(fy,p)=>{g.beginPath();const N=60;for(let i=0;i<=N*p;i++){const f=i/N;const px=x+f*w,py=fy(f);i?g.lineTo(px,py):g.moveTo(px,py);}};
 const shade=(fy,a,col)=>{if(a<=0)return;g.save();g.globalAlpha*=a;g.beginPath();g.moveTo(x,yOut);const N=60;for(let i=0;i<=N;i++){const f=i/N;g.lineTo(x+f*w,fy(f));}g.lineTo(x+w,yOut);g.closePath();g.fillStyle=col;g.fill();
  g.globalAlpha*=0.9;g.strokeStyle='rgba(255,255,255,0.22)';g.lineWidth=3;for(let k=0;k<7;k++){const xx=x+w*(k+0.5)/7,yy=fy((k+0.5)/7);const ph=(t*0.8+k*0.37)%1;g.beginPath();g.moveTo(xx,lerp(yy+10,yOut-6,ph));g.lineTo(xx,lerp(yy+10,yOut-6,ph)+18);g.stroke();}g.restore();};
 const on=o.on||0,off=o.off||0,loss=o.loss||0;
 shade(()=>yHi,loss*cl(on*3),'rgba(242,163,58,0.55)');
 shade(blueY,loss*cl(off*3),'rgba(34,62,140,0.97)');
 g.lineCap='round';g.lineJoin='round';
 if(on>0){path(()=>yHi,on);g.strokeStyle=C.amber;g.lineWidth=12;g.stroke();}
 if(off>0){path(blueY,off);g.strokeStyle='#6fa0ff';g.lineWidth=12;g.stroke();}
 return {yHi,yLo,yOut,xw,blueY};}
