// ===== Kit de ilustración (20): potencia contratada — factura con el apartado POTENCIA, medidor de potencia, cuota fija mes a mes =====
// factura genérica (sin marca) con el apartado POTENCIA: dos barras sin cifras, CONTRATADA (ámbar, entera) y MÁXIMA USADA · 12 MESES (verde, ancho used 0–1).
// (x,y) centro, 260×330 a escala 1. o: p (0–1, crecen las barras), hl (0 contratada / 1 máxima / null), hk (0–1), used (0.55)
function powerBill(x,y,s,rot,o={}){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-122,-155,256,328,14);g.fill();
 g.fillStyle='#f7f4ec';rr(-130,-165,260,330,14);g.fill();g.fillStyle=C.amber;rr(-130,-165,260,54,[14,14,0,0]);g.fill();
 txt('⚡ FACTURA DE LA LUZ',0,-137,19,'#1a1206',900);
 g.fillStyle='#d9d3c4';[200,140,180].forEach((w,i)=>{rr(-106,-96+i*15,w,7,3);g.fill();});
 txt('POTENCIA',-106,-32,22,'#2a3040',900,'left');
 const p=o.p??1,u=o.used??0.55;const rows=[['CONTRATADA',C.amber,1],['MÁXIMA USADA · 12 MESES',C.green,u]];
 rows.forEach(([lb,col,w],i)=>{const yy=10+i*62;const h=o.hl===i?(o.hk??1):0;
  if(h>0){g.save();g.globalAlpha*=h;g.fillStyle=col+'33';rr(-118,yy-24,236,58,10);g.fill();g.strokeStyle=col;g.lineWidth=5;rr(-118,yy-24,236,58,10);g.stroke();g.restore();}
  txt(lb,-106,yy-7,14,'#5c667a',900,'left');
  g.fillStyle='#e3ddd0';rr(-106,yy+7,212,18,9);g.fill();
  const k=ease(cl(p*1.5-i*0.5));if(k>0){g.fillStyle=col;rr(-106,yy+7,Math.max(18,212*w*k),18,9);g.fill();}});
 g.fillStyle='#d9d3c4';[190,120].forEach((w,i)=>{rr(-106,112+i*14,w,7,3);g.fill();});
 g.fillStyle='#2a3040';for(let i=0;i<22;i++){const w=rnd(i+40)>0.5?4:2;g.fillRect(-100+i*9,140,w,16);}
 g.restore();}
// medidor de potencia (semicírculo, sin cifras). Escala 0–1: verde hasta used (el máximo que de verdad usas), marca ámbar en cont (lo contratado);
// waste (0–1) pinta el tramo used→cont en rojo rayado = potencia que pagas y no usas. needle = valor de la aguja; o.wob la hace oscilar.
// (x,y) centro de la base, radio r. Devuelve puntos {cont, used, mid} justo fuera del arco para colocar etiquetas.
function powerGauge(x,y,r,t,o={}){const cont=o.cont??0.85,used=o.used??0.5,waste=o.waste||0;const A=v=>Math.PI+v*Math.PI;const P=(v,k)=>[x+Math.cos(A(v))*r*k,y+Math.sin(A(v))*r*k];g.save();
 g.fillStyle='rgba(20,29,48,0.92)';g.beginPath();g.arc(x,y,r+24,Math.PI,0);g.lineTo(x+r+24,y+30);g.quadraticCurveTo(x+r+24,y+50,x+r+4,y+50);g.lineTo(x-r-4,y+50);g.quadraticCurveTo(x-r-24,y+50,x-r-24,y+30);g.closePath();g.fill();
 g.lineCap='butt';g.lineWidth=r*0.22;
 g.strokeStyle='#2a3550';g.beginPath();g.arc(x,y,r*0.8,A(0),A(1));g.stroke();
 g.strokeStyle=C.green;g.beginPath();g.arc(x,y,r*0.8,A(0),A(used));g.stroke();
 if(waste>0){g.save();g.globalAlpha*=cl(waste);g.strokeStyle=C.red;g.lineWidth=r*0.22;g.beginPath();g.arc(x,y,r*0.8,A(used),A(cont));g.stroke();
  g.strokeStyle='rgba(255,255,255,0.4)';g.lineWidth=4;for(let v=used+0.025;v<cont-0.01;v+=0.04){const a=A(v);g.beginPath();g.moveTo(x+Math.cos(a)*r*0.7,y+Math.sin(a)*r*0.7);g.lineTo(x+Math.cos(a+0.06)*r*0.9,y+Math.sin(a+0.06)*r*0.9);g.stroke();}g.restore();}
 const c0=P(cont,0.6),c1=P(cont,1.06);g.strokeStyle=C.amber;g.lineWidth=10;g.lineCap='round';g.beginPath();g.moveTo(c0[0],c0[1]);g.lineTo(c1[0],c1[1]);g.stroke();
 emoji('⚡',x,y-r*0.36,r*0.24);
 let nv=o.needle??used*0.8;if(o.wob)nv+=Math.sin(t*2.3)*0.07+Math.sin(t*5.1)*0.035;nv=cl(nv,0,1);const n1=P(nv,0.74);
 g.strokeStyle='#fff';g.lineWidth=Math.max(5,r*0.045);g.beginPath();g.moveTo(x,y);g.lineTo(n1[0],n1[1]);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(x,y,r*0.08,0,7);g.fill();
 g.restore();return {cont:P(cont,1.14),used:P(used,1.14),mid:P((used+cont)/2,0.8)};}
// 12 meses (E F M A M J J A S O N D) en fila: con p (0–1) cae una moneda en cada mes, de izquierda a derecha = «se paga todos los meses».
// (x,y) centro de la fila, ancho w
function monthCoins(x,y,w,p,t){const L='EFMAMJJASOND';const bw=w/12;g.save();
 for(let i=0;i<12;i++){const cx=x-w/2+bw*(i+0.5);g.fillStyle='#2e3f66';rr(cx-bw*0.43,y-bw*0.43,bw*0.86,bw*0.86,12);g.fill();txt(L[i],cx,y+bw*0.72,bw*0.34,'#c9d1e0',900);
  const k=cl(p*12-i);if(k>0){const yy=lerp(y-170,y,ease(cl(k*1.6)));g.save();g.globalAlpha*=cl(k*4);coin(cx,yy,bw/58,(1-cl(k*1.6))*(t*3+i));g.restore();}}
 g.restore();}
