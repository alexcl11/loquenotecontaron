// ===== Kit: humedad y condensación (ventanas empañadas, 2026-11-26) =====
// color por humedad relativa: azul < 30, verde 30–50, ámbar 50–60, rojo > 60
function humCol(v){return v>60?C.red:(v>50?C.amber:(v>=30?C.green:C.blue));}
// higrómetro digital genérico (sin marca) centrado en (x,y), 300×230 a escala 1.
// val = % que marca; o.band 0–1 = dibuja la franja verde 30–50 en la escala; o.hl = pulso del borde; o.lab = texto bajo la pantalla
function hygro(x,y,s,val,o={}){const t=o.t||0;g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-146,-104,300,230,34);g.fill();
 g.fillStyle='#f4f1ea';rr(-150,-115,300,230,34);g.fill();
 if(o.hl>0){g.save();g.globalAlpha=cl(o.hl)*(0.6+0.4*Math.sin(t*6));g.strokeStyle=humCol(val);g.lineWidth=8;rr(-156,-121,312,242,38);g.stroke();g.restore();}
 // pantalla LCD
 g.fillStyle='#b9d8c2';rr(-124,-92,248,118,16);g.fill();g.fillStyle='rgba(255,255,255,0.25)';rr(-118,-86,236,20,8);g.fill();
 // gota
 g.fillStyle='#1f3a5a';g.beginPath();g.moveTo(-88,-58);g.quadraticCurveTo(-64,-26,-88,-14);g.quadraticCurveTo(-112,-26,-88,-58);g.fill();
 g.fillStyle='#1f2a22';g.font=`900 72px ${F}`;g.textAlign='right';g.textBaseline='middle';g.fillText(`${Math.round(val)}`,58,-32);
 g.font=`900 40px ${F}`;g.textAlign='left';g.fillText('%',64,-24);
 // escala 0–100
 const X0=-120,X1=120,Y=62,xv=v=>lerp(X0,X1,cl(v/100));
 g.fillStyle='#d9dde6';rr(X0,Y-9,X1-X0,18,9);g.fill();
 if(o.band>0){const b=ease(cl(o.band));g.fillStyle=C.green;rr(xv(30),Y-9,(xv(50)-xv(30))*b,18,6);g.fill();
  g.globalAlpha=b;g.fillStyle='#3a4256';g.font=`800 20px ${F}`;g.textAlign='center';g.fillText('30',xv(30),Y+30);g.fillText('50',xv(50),Y+30);g.globalAlpha=1;}
 // marcador
 const mx=xv(val);g.fillStyle=humCol(val);g.beginPath();g.moveTo(mx,Y-12);g.lineTo(mx-12,Y-30);g.lineTo(mx+12,Y-30);g.closePath();g.fill();
 g.beginPath();g.arc(mx,Y,12,0,7);g.fill();g.strokeStyle='#fff';g.lineWidth=4;g.stroke();
 g.restore();}
// vaho en un cristal que se seca con un paño: igual que fogGlass (ill13.js) pero solo a la izquierda de wx (lo de la derecha ya está seco)
function fogWiped(x,y,w,h,k,t,wx){if(k<=0)return;const xr=wx==null?x+w:cl((wx-x)/w)*w+x;if(xr<=x)return;g.save();g.beginPath();g.rect(x,y,xr-x,h);g.clip();fogGlass(x,y,w,h,k,t);g.restore();
 if(wx!=null&&xr<x+w){g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle='rgba(255,255,255,0.10)';g.fillRect(xr,y,x+w-xr,h);g.fillStyle=`rgba(240,248,255,${0.7*k})`;for(let i=0;i<6;i++){g.beginPath();g.ellipse(xr+2,y+20+i*(h-40)/5,4,6,0,0,7);g.fill();}g.restore();}}
// agua que se acumula en el alféizar y gotea por el borde (a 0–1)
function sillWater(x,y,w,a,t){if(a<=0)return;g.save();g.globalAlpha=cl(a);g.fillStyle='rgba(150,205,255,0.75)';g.beginPath();g.ellipse(x+w/2,y,w*0.42*cl(a*1.4),9,0,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,0.6)';g.beginPath();g.ellipse(x+w/2-w*0.15,y-3,w*0.12*cl(a*1.4),3,0,0,7);g.fill();
 for(let j=0;j<3;j++){const ph=(t*0.9+j/3)%1;const dx=x+w*(0.25+0.25*j),yy=y+12+ph*ph*90;g.globalAlpha=cl(a)*(1-ph);g.fillStyle='#9fd3ff';g.beginPath();g.moveTo(dx,yy-11);g.quadraticCurveTo(dx+7,yy,dx,yy+6);g.quadraticCurveTo(dx-7,yy,dx,yy-11);g.fill();}
 g.restore();}
// rejilla de ventilación de pared (x,y = esquina sup. izq.). o.cover 0–1 = toalla que la tapa (1 tapada, 0 retirada hacia abajo); o.flow = aire que entra/sale
function ventGrille(x,y,w,h,t,o={}){g.fillStyle='#c9d3e0';rr(x,y,w,h,10);g.fill();g.fillStyle='#6d7a8e';rr(x+10,y+10,w-20,h-20,6);g.fill();
 g.fillStyle='#e6ebf2';const n=Math.max(3,Math.round((h-20)/16));for(let i=0;i<n;i++){rr(x+14,y+14+i*(h-28)/n,w-28,(h-28)/n*0.55,3);g.fill();}
 const fl=o.flow||0;if(fl>0){g.save();g.strokeStyle=`rgba(190,230,255,${0.7*fl})`;g.lineWidth=5;g.lineCap='round';for(let k=0;k<3;k++){const ph=(t*0.8+k/3)%1;g.globalAlpha=fl*Math.sin(ph*Math.PI);g.beginPath();for(let j=0;j<=10;j++){const xx=x+w*0.2+k*w*0.3+Math.sin(j*0.7+t*4)*8,yy=y+h+10+j*8+ph*40;j?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}g.restore();}
 const cv=o.cover||0;if(cv>0){const dy=(1-cv)*220,a=cl(cv*2);g.save();g.globalAlpha=a;g.fillStyle='#e5484d';g.beginPath();g.moveTo(x-24,y-14+dy);g.lineTo(x+w+24,y-14+dy);g.quadraticCurveTo(x+w+34,y+h*0.7+dy,x+w+12,y+h+50+dy);g.lineTo(x-12,y+h+50+dy);g.quadraticCurveTo(x-34,y+h*0.7+dy,x-24,y-14+dy);g.fill();
  g.fillStyle='rgba(255,255,255,0.35)';g.fillRect(x-14,y+h+26+dy,w+28,8);g.restore();}}
