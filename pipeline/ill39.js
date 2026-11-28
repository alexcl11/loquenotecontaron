// ===== Kit de ilustración (39): marisco en la mesa — langostino cocido, fuente de marisco con o sin hielo, mesa con mantel, vela, copa, reloj de la cena, termómetro con franja =====
// langostino/gamba cocido de perfil (curvado en C). (x,y) = centro de la curva; s = escala (≈60 px de ancho a s=1); o.dull 0–1 = color apagado (templado)
function prawn(x,y,s,rot=0,o={}){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);const d=o.dull||0;
 const body=mixc('#f58a5c','#c98a6a',d),hl=mixc('#ffc6a6','#d9b39c',d),dk=mixc('#e86a40','#a9765c',d);
 // antenas
 g.strokeStyle=mixc(dk,'#ffffff',0.25);g.lineWidth=1.3;g.lineCap='round';g.beginPath();g.moveTo(-22,-6);g.quadraticCurveTo(-46,-34,-8,-40);g.moveTo(-22,-4);g.quadraticCurveTo(-52,-22,-30,-46);g.stroke();
 // patas
 g.lineWidth=2;for(let i=0;i<4;i++){const a=Math.PI*0.95-i*0.45;g.beginPath();g.moveTo(Math.cos(a)*14,Math.sin(a)*-14+8);g.lineTo(Math.cos(a)*6,Math.sin(a)*-6+16);g.stroke();}
 // cuerpo: segmentos a lo largo de un arco (cabeza a la izquierda, cola abajo a la derecha)
 const N=7;for(let i=0;i<N;i++){const k=i/(N-1);const a=Math.PI*1.02-k*Math.PI*1.25;const r=lerp(13,6,k);const px=Math.cos(a)*20,py=-Math.sin(a)*20;
  g.fillStyle=i%2?body:mixc(body,dk,0.5);g.beginPath();g.arc(px,py,r,0,7);g.fill();}
 g.strokeStyle=hl;g.lineWidth=3;g.beginPath();g.arc(0,0,26,-Math.PI*1.0,-Math.PI*0.1);g.stroke();
 // cabeza
 g.fillStyle=body;g.beginPath();g.ellipse(-20,2,15,11,0.4,0,7);g.fill();g.fillStyle='#3a2420';g.beginPath();g.arc(-27,-2,2,0,7);g.fill();
 // abanico de la cola
 const ta=-Math.PI*0.23;const tx=Math.cos(ta)*20,ty=-Math.sin(ta)*20;g.fillStyle=dk;g.beginPath();g.moveTo(tx,ty);g.lineTo(tx-10,ty+16);g.lineTo(tx+2,ty+13);g.lineTo(tx+12,ty+16);g.closePath();g.fill();
 g.restore();}
// hielo picado (trozos translúcidos) dentro de una elipse; a = opacidad
function crushedIce(cx,cy,rx,ry,t,a=1){if(a<=0)return;g.save();g.globalAlpha*=a;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.clip();
 g.fillStyle='rgba(210,235,255,0.85)';g.fillRect(cx-rx,cy-ry,rx*2,ry*2);
 for(let i=0;i<46;i++){const px=cx+(rnd(i)-0.5)*rx*2,py=cy+(rnd(i+50)-0.5)*ry*2;const r=8+rnd(i+9)*10;g.fillStyle=i%3?'rgba(255,255,255,0.9)':'rgba(170,215,250,0.9)';g.beginPath();for(let k=0;k<5;k++){const an=k/5*Math.PI*2+rnd(i+k);g.lineTo(px+Math.cos(an)*r,py+Math.sin(an)*r*0.7);}g.closePath();g.fill();}
 for(let i=0;i<5;i++){const ph=(t*0.7+i/5)%1;g.globalAlpha=a*Math.sin(ph*Math.PI);g.fillStyle='#fff';g.beginPath();g.arc(cx+(rnd(i+80)-0.5)*rx*1.6,cy+(rnd(i+90)-0.5)*ry*1.4,3,0,7);g.fill();}
 g.restore();}
// fuente ovalada de marisco (base en y). o.ice 0–1 = cuenco grande de hielo picado debajo; o.warm 0–1 = langostinos apagados + vaho de calor; o.n = langostinos (≤14); o.left 0–1 = lo que queda
// devuelve {l,r} = asas (para las manos) y {top} = y de la superficie
function seafoodPlatter(x,y,s,t,o={}){const ice=o.ice||0,warm=o.warm||0;const n=Math.round((o.n??10)*(o.left??1));g.save();g.translate(x,y);g.scale(s,s);
 if(ice>0){g.save();g.globalAlpha*=cl(ice*2);g.fillStyle='rgba(0,0,0,0.22)';g.beginPath();g.ellipse(0,6,230,22,0,0,7);g.fill();
  g.fillStyle='rgba(190,220,245,0.55)';g.beginPath();g.moveTo(-226,-50);g.quadraticCurveTo(-210,4,-150,4);g.lineTo(150,4);g.quadraticCurveTo(210,4,226,-50);g.closePath();g.fill();
  g.strokeStyle='rgba(255,255,255,0.7)';g.lineWidth=4;g.beginPath();g.ellipse(0,-50,226,40,0,0,7);g.stroke();g.restore();
  crushedIce(0,-50,222*ease(ice),38,t,cl(ice*2));g.translate(0,-36);}
 g.fillStyle='rgba(0,0,0,0.22)';g.beginPath();g.ellipse(0,4,180,16,0,0,7);g.fill();
 g.fillStyle='#8592a6';g.beginPath();g.ellipse(0,-6,182,30,0,0,7);g.fill();g.fillStyle='#c9d3e0';g.beginPath();g.ellipse(0,-12,176,28,0,0,7);g.fill();
 g.fillStyle='#e9eef5';g.beginPath();g.ellipse(0,-14,150,20,0,0,7);g.fill();
 // limones y perejil
 lemon(-128,-24,0.55);lemon(132,-22,0.5);g.fillStyle='#3e8f4e';[[-100,-34],[108,-36],[0,-40]].forEach((p,i)=>{g.beginPath();g.arc(p[0],p[1],8,0,7);g.arc(p[0]+8,p[1]-4,7,0,7);g.fill();});
 // langostinos en dos filas
 const P=[];for(let i=0;i<5;i++)P.push([-70+i*36,-50,-0.05+rnd(i+7)*0.15]);for(let i=0;i<5;i++)P.push([-84+i*40,-24,0.05+rnd(i)*0.15]);
 P.slice(0,n).forEach((p,i)=>prawn(p[0],p[1],0.92,p[2],{dull:warm*0.7}));
 if(ice>0){g.save();g.globalAlpha*=cl(ice*2);for(let i=0;i<22;i++){const px=-215+i*20.5,py=26+Math.sin(i*1.7)*5;const r=10+rnd(i+40)*7;g.fillStyle=i%3?'rgba(255,255,255,0.95)':'rgba(175,218,250,0.95)';g.beginPath();for(let k=0;k<5;k++){const an=k/5*Math.PI*2+rnd(i+k);g.lineTo(px+Math.cos(an)*r,py+Math.sin(an)*r*0.7);}g.closePath();g.fill();}g.restore();}
 g.restore();
 if(warm>0)heatWaves(x,y-60*s,240*s,t,warm*0.8);
 const yy=y-(ice>0?36*s:0);return {l:[x-176*s,yy-12*s],r:[x+176*s,yy-12*s],top:yy-40*s};}
// mesa de comedor con mantel navideño, vista de frente: tablero en y (≈1150) y faldón hasta el suelo. Se dibuja DESPUÉS del personaje. o.col = color del mantel
const MR_TOP=1150;
function dinTable(t,o={}){const y=o.y??MR_TOP;const col=o.col||'#b8343a',col2=mixc(col,'#000000',0.22);
 g.fillStyle=mixc(col,'#ffffff',0.12);g.beginPath();g.moveTo(-600,y-40);g.lineTo(1700,y-40);g.lineTo(1700,y+22);g.lineTo(-600,y+22);g.closePath();g.fill(); // tablero
 g.fillStyle='rgba(255,255,255,0.06)';g.fillRect(-600,y-40,2300,6);
 g.fillStyle=col2;g.fillRect(-600,y+22,2300,700);
 g.fillStyle='rgba(0,0,0,0.12)';for(let i=-6;i<20;i++){g.fillRect(i*110+40,y+30,20,700);} // pliegues
 g.fillStyle='#e9c46a';g.fillRect(-600,y+70,2300,8);g.fillRect(-600,y+88,2300,3); // ribete dorado
 g.fillStyle='rgba(255,255,255,0.85)';for(let i=-6;i<22;i++){const cx=i*100+20;g.beginPath();g.arc(cx,y+150,6,0,7);g.fill();}}
// vela encendida (base en y)
function candle(x,y,s,t){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#c9b28a';g.beginPath();g.ellipse(0,0,30,8,0,0,7);g.fill();g.fillStyle='#f4efe6';rr(-14,-90,28,90,6);g.fill();g.fillStyle='rgba(0,0,0,0.08)';g.fillRect(6,-90,8,90);
 g.strokeStyle='#2a1d17';g.lineWidth=3;g.beginPath();g.moveTo(0,-90);g.lineTo(0,-98);g.stroke();
 const f=1+0.1*Math.sin(t*13)+0.05*Math.sin(t*7);const gr=g.createRadialGradient(0,-112,2,0,-112,60);gr.addColorStop(0,'rgba(255,210,120,0.45)');gr.addColorStop(1,'rgba(255,210,120,0)');g.fillStyle=gr;g.beginPath();g.arc(0,-112,60,0,7);g.fill();
 g.fillStyle='#ffb347';g.beginPath();g.ellipse(Math.sin(t*5)*1.5,-112,7,16*f,0,0,7);g.fill();g.fillStyle='#fff3c4';g.beginPath();g.ellipse(0,-108,3.5,8*f,0,0,7);g.fill();g.restore();}
// copa (base en y); fill 0–1 de vino
function wineGlass(x,y,s,fill=0.5){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='rgba(230,240,255,0.45)';g.beginPath();g.ellipse(0,0,24,6,0,0,7);g.fill();g.fillRect(-3,-54,6,54);
 g.beginPath();g.moveTo(-28,-120);g.quadraticCurveTo(-30,-56,0,-54);g.quadraticCurveTo(30,-56,28,-120);g.closePath();g.fill();
 if(fill>0){g.fillStyle='rgba(140,30,50,0.85)';const fy=lerp(-60,-112,fill);g.beginPath();g.moveTo(-27,fy);g.lineTo(27,fy);g.quadraticCurveTo(28,-58,0,-56);g.quadraticCurveTo(-28,-58,-27,fy);g.closePath();g.fill();}
 g.fillStyle='rgba(255,255,255,0.5)';g.fillRect(-18,-112,4,40);g.restore();}
// plato llano visto desde la mesa (centro en y)
function dinPlate(x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='rgba(0,0,0,0.18)';g.beginPath();g.ellipse(0,6,92,18,0,0,7);g.fill();g.fillStyle='#f4f6fa';g.beginPath();g.ellipse(0,0,92,20,0,0,7);g.fill();g.fillStyle='#e3e8f0';g.beginPath();g.ellipse(0,-2,62,12,0,0,7);g.fill();g.restore();}
// reloj de la cena: esfera de 12 h; sector desde la hora `from` durante `h` horas, verde hasta `max` y rojo a partir de ahí; agujas a from+h
function dinnerClock(x,y,r,t,o={}){const from=o.from??9,h=o.h??0,mx=o.max??2;const a0=-Math.PI/2,ah=v=>a0+v/12*Math.PI*2;g.save();g.globalAlpha*=o.a??1;
 g.fillStyle='rgba(0,0,0,0.25)';g.beginPath();g.arc(x+6,y+10,r,0,7);g.fill();
 g.fillStyle='#f4f1ea';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#c9b28a';g.lineWidth=r*0.07;g.stroke();
 const hg=Math.min(h,mx);if(hg>0){g.fillStyle='rgba(62,207,110,0.65)';g.beginPath();g.moveTo(x,y);g.arc(x,y,r*0.9,ah(from),ah(from+hg));g.closePath();g.fill();}
 if(h>mx){g.fillStyle='rgba(229,72,77,0.7)';g.beginPath();g.moveTo(x,y);g.arc(x,y,r*0.9,ah(from+mx),ah(from+h));g.closePath();g.fill();}
 for(let k=1;k<=12;k++){const an=ah(k);txt(String(k),x+Math.cos(an)*r*0.76,y+Math.sin(an)*r*0.76,r*0.15,'#3a4255',800);}
 const v=from+h;const ahh=ah(v),am=a0+((v%1)*Math.PI*2);g.strokeStyle='#1b1e26';g.lineCap='round';g.lineWidth=r*0.07;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(ahh)*r*0.45,y+Math.sin(ahh)*r*0.45);g.stroke();
 g.lineWidth=r*0.04;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(am)*r*0.66,y+Math.sin(am)*r*0.66);g.stroke();g.fillStyle=C.red;g.beginPath();g.arc(x,y,r*0.06,0,7);g.fill();
 g.restore();return {at:v=>[x+Math.cos(ah(v))*r*1.12,y+Math.sin(ah(v))*r*1.12]};}
// termómetro pequeño junto a la comida, con la franja de peligro sombreada (sin cifras); v en grados, lo–hi de escala, band=[4,60]
function foodThermo(x,y,h,v,o={}){const lo=o.lo??-10,hi=o.hi??70;const yv=q=>y-cl((q-lo)/(hi-lo))*h;const ba=o.bandA??1;g.save();g.globalAlpha*=o.a??1;
 g.fillStyle='#f4f6fb';rr(x-16,y-h-16,32,h+24,16);g.fill();g.beginPath();g.arc(x,y+18,28,0,7);g.fill();
 if(ba>0){const b=o.band||[4,60];g.fillStyle=`rgba(229,72,77,${0.35*ba})`;rr(x-30,yv(b[1]),60,yv(b[0])-yv(b[1]),8);g.fill();}
 const col=v>=(o.band||[4,60])[0]?C.red:C.blue;g.fillStyle='#d9dfe8';rr(x-8,y-h-6,16,h+10,8);g.fill();g.fillStyle=col;g.beginPath();g.arc(x,y+18,20,0,7);g.fill();rr(x-8,yv(v),16,y+10-yv(v),8);g.fill();
 g.restore();return yv;}
