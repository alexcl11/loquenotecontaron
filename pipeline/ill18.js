// ===== Kit de ilustración (18): tapa de olla y fuegos — tapa suelta en la mano, llama de anchura variable, calor atrapado, vapor que se lleva el calor =====
// tapa suelta: (x,y) = pomo (para la mano); rot en radianes; s = escala (0.75 = la tapa de stockPot de SB_POT)
function potLid(x,y,s=0.75,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.fillStyle='#aeb9c9';g.beginPath();g.ellipse(0,29,128,22,0,Math.PI,0);g.fill();
 g.fillStyle='#8592a6';rr(-130,26,260,8,4);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';g.beginPath();g.ellipse(-50,20,36,6,-0.15,0,7);g.fill();
 g.fillStyle='#1e2128';rr(-22,-9,44,18,9);g.fill();g.fillRect(-6,6,12,10);g.restore();}
// tapa tumbada sobre la encimera (vista de lado): (x,y) = apoyo
function lidRest(x,y,s=0.75){potLid(x,y-29*s,s,0);}
// llama de gas de anchura w (base en y). Si w es mayor que la olla, las llamas asoman por los lados
function burner(x,y,w,t,a=1){if(a<=0)return;const n=Math.max(5,Math.round(w/22));g.fillStyle='#151b28';rr(x-w/2-14,y-4,w+28,10,4);g.fill();
 for(let i=0;i<n;i++){const fx=x-w/2+i*w/(n-1);const h=(24+12*Math.sin(t*14+i*1.7))*a;g.fillStyle='rgba(80,140,255,0.9)';g.beginPath();g.moveTo(fx-8,y);g.quadraticCurveTo(fx,y-h*1.3,fx+8,y);g.fill();g.fillStyle='rgba(255,170,60,0.85)';g.beginPath();g.moveTo(fx-4,y);g.quadraticCurveTo(fx,y-h*0.8,fx+4,y);g.fill();}}
// llamas que suben por fuera de una olla estrecha (calor que se pierde por los lados): x0/x1 = bordes de la olla, y = base, h = altura de la olla
function sideLick(x0,x1,y,h,t,a=1){if(a<=0)return;g.save();g.lineCap='round';[[x0,-1],[x1,1]].forEach(([xx,sd])=>{for(let k=0;k<3;k++){const ph=(t*1.3+k/3)%1;g.globalAlpha=a*Math.sin(ph*Math.PI)*0.9;g.strokeStyle=k%2?'#ff8a3a':'#ffb35a';g.lineWidth=9;g.beginPath();
  for(let j=0;j<=10;j++){const yy=y-6-ph*h*0.5-j*h/18;const sx=xx+sd*(8+k*10)+Math.sin(j*0.8+t*6+k)*6;j?g.lineTo(sx,yy):g.moveTo(sx,yy);}g.stroke();}});g.restore();}
// calor atrapado dentro de una olla tapada: brillo cálido + flechas que giran en círculo (cx,cy) = centro de la olla, w×h = tamaño
function trappedHeat(cx,cy,w,h,t,a=1){if(a<=0)return;g.save();const gl=g.createRadialGradient(cx,cy,6,cx,cy,w*0.6);gl.addColorStop(0,`rgba(255,150,70,${0.45*a})`);gl.addColorStop(1,'rgba(255,150,70,0)');g.fillStyle=gl;g.fillRect(cx-w,cy-h,2*w,2*h);
 g.globalAlpha=a;g.strokeStyle='#ffcf5a';g.lineWidth=7;g.lineCap='round';for(let k=0;k<2;k++){const a0=t*2.2+k*Math.PI;g.beginPath();g.ellipse(cx,cy,w*0.32,h*0.28,0,a0,a0+2.0);g.stroke();
  const ex=cx+Math.cos(a0+2.0)*w*0.32,ey=cy+Math.sin(a0+2.0)*h*0.28,ang=a0+2.0+Math.PI/2;g.fillStyle='#ffcf5a';g.beginPath();g.moveTo(ex+Math.cos(ang)*14,ey+Math.sin(ang)*14*0.9);g.lineTo(ex+Math.cos(ang+2.4)*12,ey+Math.sin(ang+2.4)*12);g.lineTo(ex+Math.cos(ang-2.4)*12,ey+Math.sin(ang-2.4)*12);g.closePath();g.fill();}g.restore();}
// vapor espeso que se lleva el calor hacia arriba (columna desde (x,y), anchura w); a = intensidad
function steamPlume(x,y,w,t,a=1,len=320){if(a<=0)return;g.save();for(let i=0;i<10;i++){const ph=(t*0.55+rnd(i))%1;const r=(18+rnd(i+4)*20)*(0.6+ph);const bx=x+(rnd(i+8)-0.5)*w*0.8+Math.sin(t*2+i)*14*ph,by=y-ph*len;
  g.globalAlpha=a*0.38*Math.sin(ph*Math.PI);g.fillStyle='#eef3fb';g.beginPath();g.arc(bx,by,r,0,7);g.fill();}g.restore();}
