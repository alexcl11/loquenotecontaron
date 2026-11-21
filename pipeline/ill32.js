// ===== Kit: descongelar fuera o dentro de la nevera (2026-11-24) =====
// corte transversal de un filete congelado, centrado en (x,y), w×h. th 0–1 = cuánto se ha descongelado desde fuera
// (la parte rosada avanza hacia dentro; el núcleo helado azul se encoge). o.wet 0–1 = película de agua brillante con gotas; o.t anima
function meatSection(x,y,w,h,th,o={}){const t=o.t||0,wet=o.wet??0;g.save();g.translate(x,y);
 const sh=g.createRadialGradient(0,h*0.35,10,0,h*0.35,w*0.6);sh.addColorStop(0,'rgba(0,0,0,0.35)');sh.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=sh;g.beginPath();g.ellipse(0,h*0.48,w*0.55,h*0.16,0,0,7);g.fill();
 // carne cruda (descongelada)
 g.fillStyle='#d9534f';g.beginPath();g.ellipse(0,0,w/2,h/2,0,0,7);g.fill();
 g.fillStyle='#c4433f';g.beginPath();g.ellipse(0,h*0.06,w*0.46,h*0.4,0,0,7);g.fill();
 // vetas de grasa
 g.strokeStyle='rgba(255,230,215,0.7)';g.lineWidth=Math.max(3,w*0.008);g.lineCap='round';
 [[-0.3,-0.15,0.1,-0.25],[0.05,0.2,0.35,0.05],[-0.38,0.18,-0.12,0.3]].forEach(([a,b,c2,d])=>{g.beginPath();g.moveTo(a*w,b*h);g.quadraticCurveTo((a+c2)/2*w,(b+d)/2*h-h*0.08,c2*w,d*h);g.stroke();});
 // núcleo congelado que se encoge
 const k=cl(1-th*0.62);if(k>0){g.save();g.beginPath();g.ellipse(0,h*0.02,w/2*k*0.96,h/2*k*0.92,0,0,7);g.clip();
  g.fillStyle=mixc('#b9a3b6','#9fc4ec',0.55);g.fillRect(-w/2,-h/2,w,h);
  g.fillStyle='rgba(235,245,255,0.55)';for(let i=0;i<30;i++){g.beginPath();g.arc((rnd(i+11)-0.5)*w*k,(rnd(i+29)-0.5)*h*k,2+rnd(i+3)*4,0,7);g.fill();}
  g.strokeStyle='rgba(255,255,255,0.75)';g.lineWidth=4;g.beginPath();g.moveTo(-w*0.18*k,-h*0.2*k);g.lineTo(-w*0.05*k,-h*0.28*k);g.moveTo(w*0.1*k,h*0.18*k);g.lineTo(w*0.22*k,h*0.1*k);g.stroke();g.restore();
  g.strokeStyle='rgba(200,230,255,0.85)';g.lineWidth=4;g.setLineDash([10,8]);g.beginPath();g.ellipse(0,h*0.02,w/2*k*0.96,h/2*k*0.92,0,0,7);g.stroke();g.setLineDash([]);}
 // película de agua
 if(wet>0){g.save();g.globalAlpha*=wet;g.strokeStyle='rgba(170,215,255,0.85)';g.lineWidth=Math.max(6,w*0.02);g.beginPath();g.ellipse(0,0,w/2+4,h/2+4,0,0,7);g.stroke();
  g.fillStyle='rgba(255,255,255,0.55)';g.beginPath();g.ellipse(-w*0.22,-h*0.42,w*0.12,h*0.035,-0.2,0,7);g.fill();
  for(let i=0;i<5;i++){const ph=(t*0.7+i/5)%1;const dx=(-0.3+i*0.15)*w;const dy=h*0.46+ph*h*0.25;g.globalAlpha=wet*(1-ph);g.fillStyle='rgba(170,215,255,0.9)';g.beginPath();g.ellipse(dx,dy,w*0.012+3,w*0.018+4,0,0,7);g.fill();}
  g.restore();}
 g.restore();}
// franja de temperatura (lo–hi) sobre un bigThermo de ill28.js: yv = la función que devuelve bigThermo; p 0–1 = la franja crece desde abajo
function tempBand(x,yv,lo,hi,p,col=C.red,o={}){if(p<=0)return;const y0=yv(lo),y1=yv(lo+(hi-lo)*ease(p));const w=o.w||150;g.save();
 g.fillStyle=col==C.red?'rgba(229,72,77,0.28)':'rgba(242,163,58,0.28)';rr(x-w/2,y1,w,y0-y1,12);g.fill();
 g.strokeStyle=col;g.lineWidth=5;g.setLineDash([12,9]);[y0,y1].forEach(yy=>{g.beginPath();g.moveTo(x-w/2-20,yy);g.lineTo(x+w/2+20,yy);g.stroke();});g.setLineDash([]);
 g.globalAlpha*=cl(p*3);if(o.loT)txt(o.loT,x-w/2-80,y0,40,col,900);if(o.hiT&&p>0.95)txt(o.hiT,x-w/2-80,yv(hi),40,col,900);g.restore();}
// filete crudo en la sartén que se dora (cook 0–1); base de la sartén pan(x,y,s)
function steakInPan(x,y,s,cook){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle=mixc('#d9534f','#8a4a22',cook);g.beginPath();g.ellipse(-6,-40,86,22,0,0,7);g.fill();
 g.fillStyle=mixc('#f3d6c8','#d9a26a',cook);g.beginPath();g.ellipse(20,-44,22,6,0.2,0,7);g.fill();g.restore();}
