// ===== Kit: agua del grifo y botellas (2026-11-07) =====
const WCOL='rgba(150,205,255,0.55)',WCOLD='rgba(110,175,245,0.7)';
// botella de agua de 1,5 L genérica (PET azulado, etiqueta lisa sin marca); base en (x,y)
function waterBottle(x,y,s=1,rot=0,fill=1){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 const P=()=>{g.beginPath();g.moveTo(-34,0);g.lineTo(34,0);g.quadraticCurveTo(40,0,40,-10);g.lineTo(40,-150);g.quadraticCurveTo(40,-180,14,-200);g.lineTo(12,-214);g.lineTo(-12,-214);g.lineTo(-14,-200);g.quadraticCurveTo(-40,-180,-40,-150);g.lineTo(-40,-10);g.quadraticCurveTo(-40,0,-34,0);g.closePath();};
 g.fillStyle='rgba(200,225,255,0.28)';P();g.fill();
 if(fill>0){g.save();P();g.clip();g.fillStyle=WCOL;g.fillRect(-44,-200*fill,88,200*fill);g.restore();}
 g.strokeStyle='rgba(225,240,255,0.85)';g.lineWidth=3;P();g.stroke();
 g.strokeStyle='rgba(225,240,255,0.45)';g.lineWidth=3;[-40,-118,-132].forEach(yy=>{g.beginPath();g.moveTo(-38,yy);g.lineTo(38,yy);g.stroke();});
 g.fillStyle='#6fb6ff';rr(-40,-100,80,46,4);g.fill();g.fillStyle='rgba(255,255,255,0.6)';rr(-24,-84,48,8,4);g.fill();rr(-16,-70,32,6,3);g.fill();
 g.fillStyle='#3d7bff';rr(-15,-232,30,20,5);g.fill();g.fillStyle='rgba(255,255,255,0.4)';g.fillRect(-15,-226,30,3);
 g.fillStyle='rgba(255,255,255,0.35)';rr(-30,-170,8,110,4);g.fill();g.restore();}
// pack de 6 botellas con plástico retráctil y asa; base en (x,y)
function bottlePack(x,y,s=1,rot=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 [-56,0,56].forEach(dx=>waterBottle(dx+26,-8,0.82,0,1));
 [-56,0,56].forEach(dx=>waterBottle(dx,0,0.86,0,1));
 g.fillStyle='rgba(235,245,255,0.18)';rr(-96,-130,192,130,16);g.fill();g.strokeStyle='rgba(235,245,255,0.5)';g.lineWidth=3;rr(-96,-130,192,130,16);g.stroke();
 g.strokeStyle='#f4f1ea';g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(-30,-186);g.quadraticCurveTo(0,-226,30,-186);g.stroke();
 g.restore();}
// jarra de cristal con asa a la derecha; base en (x,y); fill 0–1; devuelve la boca (para el chorro)
function waterJug(x,y,s=1,rot=0,fill=0,t=0,col=WCOL,edge='rgba(230,242,255,0.9)'){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 const P=()=>{g.beginPath();g.moveTo(-52,0);g.lineTo(52,0);g.quadraticCurveTo(62,0,62,-12);g.lineTo(54,-170);g.quadraticCurveTo(52,-196,40,-206);g.lineTo(-56,-206);g.lineTo(-70,-222);g.lineTo(-48,-196);g.lineTo(-54,-170);g.lineTo(-62,-12);g.quadraticCurveTo(-62,0,-52,0);g.closePath();};
 g.fillStyle='rgba(200,225,255,0.22)';P();g.fill();
 if(fill>0){g.save();P();g.clip();const h=190*fill;g.fillStyle=col;g.beginPath();g.moveTo(-70,-h);for(let i=0;i<=14;i++)g.lineTo(-70+i*10,-h+Math.sin(i*0.9+t*6)*3);g.lineTo(70,4);g.lineTo(-70,4);g.closePath();g.fill();g.restore();}
 g.strokeStyle=edge;g.lineWidth=5;P();g.stroke();
 g.strokeStyle=edge;g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(54,-176);g.quadraticCurveTo(108,-170,100,-110);g.quadraticCurveTo(94,-60,58,-50);g.stroke();
 g.fillStyle='rgba(255,255,255,0.4)';rr(-44,-170,9,130,4);g.fill();g.restore();
 return [x-50*s,y-206*s];}
// burbujita de cloro ("Cl") que sube y se desvanece; a = intensidad
function clDot(x,y,r,a,col='#f5c542'){if(a<=0)return;g.save();g.globalAlpha*=cl(a);g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#3a2a06';g.font=`800 ${Math.round(r*1.05)}px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText('Cl',x,y+1);g.restore();}
function clVapor(x,y,w,t,a=1,n=9,rise=260){if(a<=0)return;for(let i=0;i<n;i++){const ph=(t*0.35+rnd(i+20))%1;const bx=x+(rnd(i+7)-0.5)*w+Math.sin(t*2+i)*10;const by=y-ph*rise;clDot(bx,by,16+rnd(i)*6,a*(ph<0.15?ph/0.15:1-(ph-0.15)/0.85));}}
// gotas que caen del grifo
function tapDrip(x,y,t,a=1){if(a<=0)return;const ph=(t*1.4)%1;g.save();g.globalAlpha*=a;g.fillStyle='rgba(150,205,255,0.9)';const yy=y+ph*ph*160;const r=7+3*Math.min(1,ph*5);g.beginPath();g.moveTo(x,yy-r*1.8);g.quadraticCurveTo(x+r,yy-r*0.2,x,yy+r);g.quadraticCurveTo(x-r,yy-r*0.2,x,yy-r*1.8);g.fill();g.restore();}
