// ===== Kit: lejía y diluciones (2026-11-08) =====
// hervidor eléctrico genérico; (x,y) = punto donde se agarra el asa; rot<0 inclina el pico (izquierda) hacia abajo. Devuelve la punta del pico.
function kettle(x,y,s=1,rot=0,t=0,hot=1){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.strokeStyle='#2b3b5c';g.lineWidth=16;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(-44,-42);g.lineTo(6,-42);g.lineTo(6,52);g.lineTo(-44,52);g.stroke();
 g.fillStyle='#e9edf3';g.beginPath();g.moveTo(-150,-30);g.lineTo(-150,-20);g.lineTo(-200,-62);g.lineTo(-188,-70);g.lineTo(-140,-46);g.closePath();g.fill();
 g.fillStyle='#e9edf3';g.beginPath();g.moveTo(-140,-58);g.lineTo(-56,-58);g.quadraticCurveTo(-38,-58,-36,-40);g.lineTo(-30,72);g.lineTo(-166,72);g.lineTo(-158,-40);g.quadraticCurveTo(-156,-58,-140,-58);g.closePath();g.fill();
 g.fillStyle='#2b3b5c';rr(-132,-72,70,18,8);g.fill();rr(-170,66,144,20,8);g.fill();
 g.fillStyle=hot>0.5?'#ff7a3d':'#6fb6ff';g.beginPath();g.arc(-48,58,5,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,0.5)';rr(-148,-40,10,90,5);g.fill();g.fillStyle='rgba(43,59,92,0.18)';rr(-90,-20,40,70,8);g.fill();
 g.restore();const a=rot,px=-196*s,py=-68*s;return [x+px*Math.cos(a)-py*Math.sin(a),y+px*Math.sin(a)+py*Math.cos(a)];}
// vaso medidor (dosificador) con marcas; (x,y) = base; fill 0–1; label = texto de la marca (p. ej. '20 ml'). Devuelve el borde para verter (izquierda)
function doseCup(x,y,s=1,rot=0,fill=0,col='rgba(255,236,150,0.95)',label='20 ml'){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 const P=()=>{g.beginPath();g.moveTo(-34,0);g.lineTo(34,0);g.lineTo(42,-96);g.lineTo(-42,-96);g.lineTo(-50,-104);g.closePath();};
 g.fillStyle='rgba(230,240,255,0.25)';P();g.fill();
 if(fill>0){g.save();P();g.clip();g.fillStyle=col;g.fillRect(-60,-90*fill,120,90*fill+4);g.restore();}
 g.strokeStyle='rgba(235,244,255,0.95)';g.lineWidth=5;g.lineJoin='round';P();g.stroke();
 g.strokeStyle='#f2a33a';g.lineWidth=4;[-30,-50,-70].forEach((yy,i)=>{g.beginPath();g.moveTo(14,yy);g.lineTo(i===1?36:28,yy);g.stroke();});
 if(label){g.fillStyle='#f2a33a';g.font=`900 18px ${F}`;g.textAlign='right';g.textBaseline='middle';g.fillText(label,10,-50);}
 g.restore();const a=rot,px=-50*s,py=-104*s;return [x+px*Math.cos(a)-py*Math.sin(a),y+px*Math.sin(a)+py*Math.cos(a)];}
// botella pulverizadora de 1 litro genérica (sin marca); (x,y) = base; fill 0–1 con color col; mark = texto de la etiqueta
function sprayBottle(x,y,s=1,fill=0,col='rgba(150,205,255,0.6)',mark='1 L',cap=1){g.save();g.translate(x,y);g.scale(s,s);
 const P=()=>{g.beginPath();g.moveTo(-50,0);g.lineTo(50,0);g.quadraticCurveTo(60,0,60,-12);g.lineTo(60,-170);g.quadraticCurveTo(60,-206,24,-214);g.lineTo(24,-236);g.lineTo(-24,-236);g.lineTo(-24,-214);g.quadraticCurveTo(-60,-206,-60,-170);g.lineTo(-60,-12);g.quadraticCurveTo(-60,0,-50,0);g.closePath();};
 g.fillStyle='rgba(225,238,255,0.22)';P();g.fill();
 if(fill>0){g.save();P();g.clip();g.fillStyle=col;g.fillRect(-64,-200*fill,128,200*fill+2);g.restore();}
 g.strokeStyle='rgba(235,244,255,0.9)';g.lineWidth=4;P();g.stroke();
 g.strokeStyle='rgba(235,244,255,0.6)';g.lineWidth=3;g.beginPath();g.moveTo(40,-200);g.lineTo(58,-200);g.stroke();g.fillStyle='rgba(235,244,255,0.8)';g.font=`800 16px ${F}`;g.textAlign='left';g.textBaseline='middle';g.fillText('1 L',64,-200);
 if(mark){g.fillStyle='#f4f1ea';rr(-44,-120,88,54,8);g.fill();g.fillStyle='#1a2742';g.font=`900 22px ${F}`;g.textAlign='center';g.fillText(mark,0,-93,80);}
 if(cap){g.fillStyle='#3d7bff';rr(-30,-262,60,30,8);g.fill();g.beginPath();g.moveTo(-30,-262);g.lineTo(-72,-262);g.lineTo(-72,-246);g.lineTo(-30,-240);g.closePath();g.fill();
  g.fillStyle='#2b5fd0';rr(10,-246,16,52,8);g.fill();}
 g.fillStyle='rgba(255,255,255,0.35)';rr(-48,-170,9,140,4);g.fill();g.restore();}
// barra de "fuerza" de la mezcla (sin cifras): p 0–1, col según nivel
function strengthBar(x,y,w,p,a=1,label='FUERZA'){if(a<=0)return;g.save();g.globalAlpha*=cl(a);g.fillStyle='rgba(8,12,22,0.75)';rr(x-w/2-16,y-30,w+32,60,30);g.fill();
 g.fillStyle='rgba(255,255,255,0.12)';rr(x-w/2+110,y-12,w-126,24,12);g.fill();const col=p>0.6?C.green:(p>0.35?C.amber:C.red);g.fillStyle=col;rr(x-w/2+110,y-12,Math.max(24,(w-126)*p),24,12);g.fill();
 txt(label,x-w/2+52,y,24,'#fff',900);g.restore();}
