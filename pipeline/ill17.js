// ===== Kit: persianas, cortinas y sol de invierno (ventana del salón VW de ill13.js) =====
// cajón de persiana sobre el marco de la ventana
function blindBox(x,y,w){g.fillStyle='#d8cdb5';rr(x-16,y-52,w+32,40,8);g.fill();g.fillStyle='rgba(0,0,0,0.12)';g.fillRect(x-16,y-22,w+32,6);}
// cinta de la persiana con su recogedor en la pared. pull 0–1 mueve el punto de agarre; devuelve [x,y] del agarre para la mano
function blindStrap(x,y0,y1,grip){g.save();g.strokeStyle='#b9a98a';g.lineWidth=10;g.lineCap='butt';g.beginPath();g.moveTo(x,y0);g.lineTo(x,y1);g.stroke();
 g.fillStyle='#e8e2d4';rr(x-18,y1-6,36,70,10);g.fill();g.fillStyle='#b9a98a';rr(x-6,y1+4,12,30,4);g.fill();g.restore();return [x,lerp(y0+40,y1-20,grip)];}
// persiana completa sobre una ventana: cajón + lamas que bajan (down 0–1). Usa blind() de ill6.js
function winBlind(x,y,w,h,down){blind(x,y,w,h,down);blindBox(x,y,w);}
// cortina de dos paños sobre una barra. close 0–1 (0 = recogida a los lados, 1 = cerrada en el centro)
function curtain(x,y,w,h,close,t,col='#b4473f'){const k=ease(cl(close));const pw=lerp(w*0.16,(w+40)*0.53,k);const sw=Math.sin(t*1.3)*4*(1-k*0.5);
 g.save();g.strokeStyle='#8a6a4a';g.lineWidth=10;g.lineCap='round';g.beginPath();g.moveTo(x-30,y);g.lineTo(x+w+30,y);g.stroke();
 const dark=mixc(col,'#000000',0.28);
 [[x-20,1],[x+w+20,-1]].forEach(([ax,d])=>{const ex=ax+d*pw;g.fillStyle=col;g.beginPath();g.moveTo(ax,y);g.lineTo(ex,y);
  g.quadraticCurveTo(ex+sw*d,y+h*0.5,ex+d*(10-14*k)+sw,y+h);g.lineTo(ax,y+h);g.closePath();g.fill();
  g.save();g.clip();g.fillStyle=dark;const n=Math.max(3,Math.round(pw/34));for(let i=0;i<n;i++){const fx=ax+d*(pw*(i+0.5)/n);g.globalAlpha=0.55;g.fillRect(fx-5,y,10,h);}g.restore();
  g.fillStyle='#e0c58a';for(let i=0;i<=4;i++){g.beginPath();g.arc(ax+d*pw*i/4,y,6,0,7);g.fill();}});
 g.restore();}
// exterior de invierno de día: cielo claro, sol bajo y tejados
function dayOut(x,y,w,h,t,sun=1){g.save();g.beginPath();g.rect(x,y,w,h);g.clip();
 const sk=g.createLinearGradient(0,y,0,y+h);sk.addColorStop(0,'#5fa8ff');sk.addColorStop(1,'#cfe6ff');g.fillStyle=sk;g.fillRect(x,y,w,h);
 if(sun>0)sunDisk(x+w*0.7,y+h*0.32,26,t,sun);
 g.fillStyle='#8aa2c8';for(let i=0;i<4;i++){const bx=x+i*w/3-20,bh=h*(0.2+0.14*rnd(i+5));g.fillRect(bx,y+h-bh,w/3+6,bh);g.beginPath();g.moveTo(bx-6,y+h-bh);g.lineTo(bx+w/6+3,y+h-bh-26);g.lineTo(bx+w/3+12,y+h-bh);g.fill();}
 g.restore();}
// ventana de dos hojas cerradas con el exterior de día (mismas medidas que winTwo)
function winDay(x,y,w,h,t,sun=1){g.fillStyle='#3c2c26';rr(x-12,y-12,w+24,h+24,10);g.fill();dayOut(x,y,w,h,t,sun);
 const hw=w/2;winLeaf(x,y,hw,h,1,0,0,t);winLeaf(x+w,y,hw,h,-1,0,0,t);winPanes(x,y,w,h,t,(a,b,c,d)=>dayOut(a,b,c,d,t,sun));g.fillStyle='#3c2c26';g.fillRect(x-12,y+h+6,w+24,14);}
// haz de sol que entra por la ventana y calienta el suelo (a 0–1)
function sunBeam(x0,y0,x1,y1,x2,y2,x3,y3,a,t){if(a<=0)return;g.save();g.globalAlpha=a;
 const gr=g.createLinearGradient(x0,y0,x2,y2);gr.addColorStop(0,'rgba(255,224,130,0.55)');gr.addColorStop(1,'rgba(255,200,90,0.3)');g.fillStyle=gr;
 g.beginPath();g.moveTo(x0,y0);g.lineTo(x1,y1);g.lineTo(x2,y2);g.lineTo(x3,y3);g.closePath();g.fill();
 g.fillStyle='rgba(255,236,170,0.8)';for(let i=0;i<10;i++){const ph=(t*0.15+rnd(i))%1;const px=lerp(x0,x3,rnd(i+4))+ph*(x2-x1)*0.9,py=lerp(y0,y1,rnd(i+8))+ph*(y2-y1)*0.9;g.globalAlpha=a*0.7*Math.sin(ph*Math.PI);g.beginPath();g.arc(px,py,3,0,7);g.fill();}
 g.restore();}
// mancha cálida en el suelo donde da el sol
function sunPatch(x,y,w,h,a,t){if(a<=0)return;g.save();g.globalAlpha=a*(0.85+0.15*Math.sin(t*2));const gr=g.createRadialGradient(x,y,10,x,y,w*0.6);gr.addColorStop(0,'rgba(255,214,110,0.75)');gr.addColorStop(1,'rgba(255,190,80,0)');g.fillStyle=gr;g.beginPath();g.ellipse(x,y,w/2,h/2,0,0,7);g.fill();g.restore();}
// calor que rebota en la persiana cerrada y vuelve hacia dentro (flechas ámbar en U). x = cara interior de la ventana, dir = hacia dentro (+1 derecha)
function heatBack(x,y,h,t,a,dir=1){if(a<=0)return;g.save();g.lineCap='round';g.lineWidth=8;for(let k=0;k<3;k++){const yy=y+h*(0.2+0.3*k);const ph=(t*0.6+k*0.33)%1;g.globalAlpha=a*Math.sin(ph*Math.PI);g.strokeStyle=k%2?'#ff8a3a':'#ffb35a';
 const r=34;const cx=x+dir*(46+20*ph);g.beginPath();g.arc(cx,yy,r,-Math.PI/2,Math.PI/2,dir>0);g.stroke();
 const hx=cx+dir*6,hy=yy+r;g.fillStyle=g.strokeStyle;g.beginPath();g.moveTo(hx+dir*18,hy);g.lineTo(hx,hy-12);g.lineTo(hx,hy+12);g.closePath();g.fill();}g.restore();}
// cristales de una ventana cerrada de dos hojas (winTwo/winDay) que dejan ver el exterior: view(x,y,w,h) dibuja lo de fuera
function winPanes(x,y,w,h,t,view){const hw=w/2,i=9;[[x+i,y+i],[x+hw+i,y+i]].forEach(([px,py])=>{g.save();g.beginPath();g.rect(px,py,hw-2*i,h-2*i);g.clip();view(x,y,w,h);
 g.fillStyle='rgba(190,215,240,0.16)';g.fillRect(px,py,hw,h);g.fillStyle='rgba(255,255,255,0.12)';g.beginPath();g.moveTo(px+11,py+7);g.lineTo(px+33,py+7);g.lineTo(px+11,py+71);g.closePath();g.fill();g.restore();});
 g.fillStyle='#d9dde6';[[x+hw-16,1],[x+hw+16,-1]].forEach(([hx])=>{rr(hx-7,y+h/2-7,14,14,4);g.fill();rr(hx-7,y+h/2,14,36,6);g.fill();});}
