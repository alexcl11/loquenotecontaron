// ===== Mascota: gato (prueba, 2026-11-17) · kit propio, sin personajes ni marcas conocidos =====
// gato(x,y,s,t,o): gato sentado de frente; (x,y) = base (la encimera). Pelaje gris azulado, ojos ámbar.
// o.mood: 'calma' (por defecto) | 'curioso' (orejas arriba, pupilas grandes, mira a un lado con o.look) | 'susto' (pelo erizado, ojos muy abiertos) | 'feliz' (ojos cerrados en arco)
// o.tail: fase extra de la cola (0..1). Cola y parpadeo se animan solos con t.
function gato(x,y,s,t,o){o=o||{};const mood=o.mood||'calma';const lk=o.look||[0,0];
 const fur='#59678a',furD='#46537a',furL='#7686ab',belly='#c9d1e6',pink='#e8909b',amber='#f4b13c';
 g.save();g.translate(x,y);g.scale(s,s);
 const sway=Math.sin(t*1.8+(o.tail||0)*6.28)*0.5,bob=Math.sin(t*1.3)*2;
 // cola (detrás del cuerpo), curvada a la derecha
 g.strokeStyle=furD;g.lineCap='round';g.lineWidth=26;g.beginPath();g.moveTo(52,-18);g.bezierCurveTo(120,-10,150+sway*20,-60,128+sway*30,-120-(mood==='susto'?30:0));g.stroke();
 g.strokeStyle=furL;g.lineWidth=8;g.beginPath();g.moveTo(66,-22);g.bezierCurveTo(124,-14,150+sway*20,-60,128+sway*30,-120-(mood==='susto'?30:0));g.stroke();
 // cuerpo
 g.fillStyle=fur;g.beginPath();g.moveTo(-62,0);g.quadraticCurveTo(-78,-96,-30,-128+bob);g.lineTo(30,-128+bob);g.quadraticCurveTo(78,-96,62,0);g.closePath();g.fill();
 g.fillStyle=belly;g.beginPath();g.ellipse(0,-50,30,50,0,0,7);g.fill();
 // patas delanteras
 g.fillStyle=furL;[-26,26].forEach(px=>{g.beginPath();g.ellipse(px,-8,17,26,0,0,7);g.fill();});
 g.fillStyle=belly;[-26,26].forEach(px=>{g.beginPath();g.ellipse(px,2,17,9,0,0,7);g.fill();});
 // cabeza
 const hy=-150+bob;
 const earUp=mood==='curioso'?-14:mood==='susto'?-6:0;
 g.fillStyle=fur;[-1,1].forEach(sd=>{g.beginPath();g.moveTo(sd*18,hy-34);g.lineTo(sd*50,hy-72+earUp);g.quadraticCurveTo(sd*66,hy-40,sd*62,hy-16);g.closePath();g.fill();});
 g.fillStyle=pink;[-1,1].forEach(sd=>{g.beginPath();g.moveTo(sd*30,hy-36);g.lineTo(sd*49,hy-62+earUp);g.quadraticCurveTo(sd*56,hy-42,sd*54,hy-28);g.closePath();g.fill();});
 g.fillStyle=fur;g.beginPath();g.ellipse(0,hy,66,56,0,0,7);g.fill();
 if(mood==='susto'){g.fillStyle=fur;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(k*18-8,hy-50);g.lineTo(k*18,hy-66-(k%2?6:0));g.lineTo(k*18+8,hy-50);g.fill();}}
 // mejillas y hocico
 g.fillStyle=furL;g.beginPath();g.ellipse(-22,hy+22,26,19,0,0,7);g.ellipse(22,hy+22,26,19,0,0,7);g.fill();
 // ojos
 const bl=(Math.sin(t*1.1+x)>0.975)?0.12:1;const ey=hy-4;
 [-1,1].forEach(sd=>{const ex=sd*26;
  if(mood==='feliz'){g.strokeStyle='#1d2238';g.lineWidth=5;g.lineCap='round';g.beginPath();g.arc(ex,ey+6,11,Math.PI+0.3,-0.3);g.stroke();return;}
  const R=mood==='susto'?17:mood==='curioso'?15:13;
  g.fillStyle=amber;g.beginPath();g.ellipse(ex,ey,R,R*1.15*bl,0,0,7);g.fill();
  g.fillStyle='#1d2238';const pw=mood==='susto'?4:mood==='curioso'?9:5;g.beginPath();g.ellipse(ex+lk[0]*5,ey+lk[1]*4,pw,R*1.05*bl,0,0,7);g.fill();
  g.fillStyle='rgba(255,255,255,0.85)';g.beginPath();g.arc(ex-4,ey-5,3.2,0,7);g.fill();});
 // nariz, boca, bigotes
 g.fillStyle=pink;g.beginPath();g.moveTo(-7,hy+14);g.lineTo(7,hy+14);g.lineTo(0,hy+23);g.closePath();g.fill();
 g.strokeStyle='#1d2238';g.lineWidth=3;g.lineCap='round';g.beginPath();
 if(mood==='susto'){g.ellipse(0,hy+36,7,9,0,0,7);}else if(mood==='feliz'||mood==='curioso'){g.moveTo(0,hy+23);g.lineTo(0,hy+28);g.arc(-9,hy+28,9,0,Math.PI*0.8);g.moveTo(0,hy+28);g.arc(9,hy+28,9,Math.PI*0.2,Math.PI);}else{g.moveTo(0,hy+23);g.lineTo(0,hy+30);g.moveTo(0,hy+30);g.quadraticCurveTo(-8,hy+36,-14,hy+30);g.moveTo(0,hy+30);g.quadraticCurveTo(8,hy+36,14,hy+30);}
 g.stroke();
 g.strokeStyle='rgba(235,240,255,0.7)';g.lineWidth=2.5;[-1,1].forEach(sd=>{[-6,4].forEach(dy=>{g.beginPath();g.moveTo(sd*40,hy+18+dy);g.lineTo(sd*90,hy+14+dy*2.4);g.stroke();});});
 g.restore();}
