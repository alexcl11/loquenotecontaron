// ===== Kit: ventilar en invierno (ventanas que se abren, oscilobatiente, plano de la casa, frío y humedad) =====
const VW=[52,612,206,256]; // hueco de cristal de la ventana del salón (salon())
// exterior de invierno: cielo frío con tejados y copos (dentro del rectángulo)
function winterOut(x,y,w,h,t,snow=1){g.save();g.beginPath();g.rect(x,y,w,h);g.clip();
 const sk=g.createLinearGradient(0,y,0,y+h);sk.addColorStop(0,'#0e1a3a');sk.addColorStop(1,'#2a3f6e');g.fillStyle=sk;g.fillRect(x,y,w,h);
 g.fillStyle='#16213d';for(let i=0;i<4;i++){const bx=x+i*w/3-20,bh=h*(0.22+0.14*rnd(i+5));g.fillRect(bx,y+h-bh,w/3+6,bh);g.beginPath();g.moveTo(bx-6,y+h-bh);g.lineTo(bx+w/6+3,y+h-bh-26);g.lineTo(bx+w/3+12,y+h-bh);g.fill();}
 g.fillStyle='#f2c14a';for(let i=0;i<5;i++){if(rnd(i+20)>0.55)g.fillRect(x+12+rnd(i+30)*(w-30),y+h-30-rnd(i+40)*20,8,10);}
 if(snow>0){g.globalAlpha=snow;g.fillStyle='#e8f2ff';for(let i=0;i<14;i++){const px=x+rnd(i)*w+Math.sin(t*1.5+i)*6,py=y+((rnd(i+7)*h+t*40*(0.6+rnd(i+3)))%h);g.beginPath();g.arc(px,py,2.5+rnd(i+2)*2,0,7);g.fill();}}
 g.restore();}
// una hoja de ventana (marco + cristal). hx = bisagra, dir = +1 abre hacia la derecha / −1 hacia la izquierda.
// open 0–1: gira hacia dentro (se estrecha y su borde libre crece por perspectiva). tilt 0–1: abatida arriba (oscilobatiente)
function winLeaf(hx,y,w,h,dir,open,tilt,t){const ow=w*(1-0.82*open),grow=34*open;const fx=hx+dir*ow;
 g.save();
 if(tilt>0){ // hueco arriba: la parte de arriba de la hoja se acerca y deja una rendija
  const gp=26*tilt,tw=12*tilt;
  g.fillStyle='#4a372f';g.beginPath();g.moveTo(hx,y+gp);g.lineTo(fx+dir*tw,y+gp);g.lineTo(fx,y+h);g.lineTo(hx,y+h);g.closePath();g.fill();
  g.fillStyle='rgba(190,215,240,0.22)';g.beginPath();g.moveTo(hx+dir*9,y+gp+9);g.lineTo(fx-dir*9+dir*tw,y+gp+9);g.lineTo(fx-dir*9,y+h-9);g.lineTo(hx+dir*9,y+h-9);g.closePath();g.fill();
  g.fillStyle='rgba(255,255,255,0.12)';g.beginPath();g.moveTo(hx+dir*20,y+gp+14);g.lineTo(hx+dir*40,y+gp+14);g.lineTo(hx+dir*20,y+gp+70);g.closePath();g.fill();
  const hxp=fx-dir*16,hyp=y+h*0.5;g.fillStyle='#d9dde6';rr(hxp-7,hyp-7,14,14,4);g.fill();rr(hxp-7,hyp-36,14,36,6);g.fill(); // manilla hacia arriba = abatible
  g.restore();return [fx-dir*15,y+h*0.5];}
 g.fillStyle='#4a372f';g.beginPath();g.moveTo(hx,y);g.lineTo(fx,y-grow*0.5);g.lineTo(fx,y+h+grow*0.5);g.lineTo(hx,y+h);g.closePath();g.fill();
 const i=9;g.fillStyle=`rgba(190,215,240,${0.22+0.15*open})`;g.beginPath();g.moveTo(hx+dir*i,y+i);g.lineTo(fx-dir*i,y+i-grow*0.5);g.lineTo(fx-dir*i,y+h-i+grow*0.5);g.lineTo(hx+dir*i,y+h-i);g.closePath();g.fill();
 if(open<0.6){g.fillStyle='rgba(255,255,255,0.12)';g.beginPath();g.moveTo(hx+dir*20,y+16);g.lineTo(hx+dir*42,y+16);g.lineTo(hx+dir*20,y+80);g.closePath();g.fill();}
 const hxp=fx-dir*16,hyp=y+h*0.5;g.fillStyle='#d9dde6';rr(hxp-7,hyp-7,14,14,4);g.fill();rr(hxp-7,hyp,14,36,6);g.fill();
 g.restore();return [hxp,hyp];}
// ventana de dos hojas. o.open 0–1 (de par en par), o.tilt 0–1 (oscilobatiente, hoja derecha), o.fog 0–1 (condensación), o.snow
// devuelve {l,r} = posición de las manillas
function winTwo(x,y,w,h,t,o={}){const op=ease(o.open||0),ti=ease(o.tilt||0);
 g.fillStyle='#3c2c26';rr(x-12,y-12,w+24,h+24,10);g.fill();
 winterOut(x,y,w,h,t,o.snow??1);
 const hw=w/2;const l=winLeaf(x,y,hw,h,1,op,0,t);const r=winLeaf(x+w,y,hw,h,-1,op,ti,t);
 if(o.fog>0)fogGlass(x,y,w,h,o.fog,t);
 g.fillStyle='#3c2c26';g.fillRect(x-12,y+h+6,w+24,14); // alféizar
 return {l,r};}
// sobre la ventana del salón
function salonWin(t,o={}){return winTwo(VW[0],VW[1],VW[2],VW[3],t,o);}
// condensación en el cristal: vaho + gotas que bajan
function fogGlass(x,y,w,h,k,t){if(k<=0)return;g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle=`rgba(220,232,245,${0.45*k})`;g.fillRect(x,y,w,h);
 for(let i=0;i<22;i++){const dx=x+8+rnd(i)*(w-16),dy0=y+10+rnd(i+50)*(h*0.6);const run=rnd(i+9)>0.6?((t*18*(0.5+rnd(i+3)))%(h*0.5))*k:0;const dy=dy0+run;
  g.fillStyle=`rgba(240,248,255,${0.8*k})`;g.beginPath();g.ellipse(dx,dy,3.5+rnd(i+4)*3,4.5+rnd(i+4)*3.5,0,0,7);g.fill();
  if(run>0){g.strokeStyle=`rgba(120,150,190,${0.35*k})`;g.lineWidth=3;g.beginPath();g.moveTo(dx,dy0);g.lineTo(dx,dy-4);g.stroke();}}
 g.restore();}
// frío que se mete en la pared alrededor de la ventana (k 0–1)
function wallChill(cx,cy,k,t,R=420){if(k<=0)return;g.save();const gr=g.createRadialGradient(cx,cy,40,cx,cy,R*(0.5+0.5*k));gr.addColorStop(0,`rgba(120,190,255,${0.5*k})`);gr.addColorStop(1,'rgba(120,190,255,0)');g.fillStyle=gr;g.fillRect(cx-R,cy-R,2*R,2*R);
 g.strokeStyle=`rgba(200,235,255,${0.6*k})`;g.lineWidth=3;for(let i=0;i<9;i++){const a=rnd(i+3)*6.28,d=R*0.35+rnd(i+8)*R*0.4*k;const px=cx+Math.cos(a)*d,py=cy+Math.sin(a)*d;g.beginPath();g.moveTo(px-8,py);g.lineTo(px+8,py);g.moveTo(px,py-8);g.lineTo(px,py+8);g.stroke();}g.restore();}
// flujo de calor (ondas naranjas) que va de (x0,y0) a (x1,y1): el calor que se escapa
function heatFlow(x0,y0,x1,y1,t,a=1,n=5){if(a<=0)return;g.save();g.lineCap='round';for(let k=0;k<n;k++){const ph=(t*0.55+k/n)%1;const px=lerp(x0,x1,ph),py=lerp(y0,y1,ph)+Math.sin(ph*9+k)*10;
  g.globalAlpha=a*Math.sin(ph*Math.PI)*0.9;g.strokeStyle=k%2?'#ff8a3a':'#ffb35a';g.lineWidth=10;g.beginPath();for(let j=0;j<8;j++){const q=j/7;const xx=px-(x1-x0)*0.08*q,yy=py-(y1-y0)*0.08*q+Math.sin(q*6+t*6+k)*7;j?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}g.restore();}
// cronómetro: anillo que se llena (p 0–1) con texto en el centro
function stopwatch(x,y,r,p,label,col=C.blue,a=1){if(a<=0)return;g.save();g.globalAlpha*=cl(a);g.fillStyle='#f4f1ea';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#c9b28a';rr(x-r*0.18,y-r-r*0.3,r*0.36,r*0.24,4);g.fill();
 g.strokeStyle='#ddd6c6';g.lineWidth=r*0.16;g.beginPath();g.arc(x,y,r*0.78,0,7);g.stroke();if(p>0){g.strokeStyle=col;g.lineCap='round';g.beginPath();g.arc(x,y,r*0.78,-Math.PI/2,-Math.PI/2+Math.PI*2*cl(p));g.stroke();}
 if(label)txt(label,x,y+2,r*0.42,'#1b1e26',900,'center',1,r*1.3);g.restore();}
// icono pequeño de ventana: mode 'open' (de par en par) | 'tilt' (oscilobatiente) | 'closed'
function miniWin(x,y,s,mode,t){g.save();g.translate(x,y);g.scale(s,s);g.translate(-100,-120);winTwo(0,0,200,240,t,{open:mode==='open'?1:0,tilt:mode==='tilt'?1:0,snow:0.6});g.restore();}
// plano de un piso visto desde arriba: salón (izq.), pasillo, dormitorio (der.). Ventanas en paredes opuestas.
// o.wl / o.wr 0–1 = ventanas abiertas, o.doors 0–1 = puertas abiertas, o.flow 0–1 = corriente de aire
function floorPlan(x,y,w,h,t,o={}){g.save();g.translate(x,y);const wt=16;
 g.fillStyle='#22305a';rr(0,0,w,h,10);g.fill();
 g.fillStyle='#2c3c6b';g.fillRect(wt,wt,w*0.42-wt,h-2*wt);g.fillRect(w*0.58,wt,w*0.42-wt,h-2*wt);g.fillStyle='#283763';g.fillRect(w*0.42,wt,w*0.16,h-2*wt);
 // muebles sencillos
 g.fillStyle='#7b5cc9';rr(w*0.07,h*0.62,w*0.24,h*0.16,10);g.fill();g.fillStyle='#3a2a22';rr(w*0.1,h*0.3,w*0.16,h*0.16,8);g.fill();
 g.fillStyle='#d8cdb5';rr(w*0.68,h*0.18,w*0.22,h*0.42,10);g.fill();g.fillStyle='#8b7cf6';rr(w*0.68,h*0.38,w*0.22,h*0.22,6);g.fill();
 // tabiques con huecos de puerta
 g.fillStyle='#e8e2d4';const dh=h*0.26,dy=h*0.37;[w*0.42,w*0.58].forEach(px=>{g.fillRect(px-5,0,10,dy);g.fillRect(px-5,dy+dh,10,h-dy-dh);});
 // puertas (hojas que giran)
 const dr=ease(o.doors||0);g.strokeStyle='#c99a6b';g.lineWidth=9;g.lineCap='round';[w*0.42,w*0.58].forEach((px,i)=>{const a=(i?-1:1)*Math.PI/2*dr;g.beginPath();g.moveTo(px,dy);g.lineTo(px+Math.sin(a)*dh*(i?1:1)*(i?1:1),dy+Math.cos(a)*dh);g.stroke();});
 // muros exteriores
 g.strokeStyle='#e8e2d4';g.lineWidth=wt;g.strokeRect(wt/2,wt/2,w-wt,h-wt);
 // ventanas en paredes opuestas
 const wy=h*0.32,wh=h*0.36;[[0,o.wl||0],[w,o.wr||0]].forEach(([px,k],i)=>{g.fillStyle='#9fd3ff';g.fillRect(px-wt/2-1,wy,wt+2,wh);
  const ke=ease(k);g.strokeStyle='#5a3f30';g.lineWidth=7;const sd=i?-1:1;g.beginPath();g.moveTo(px,wy);g.lineTo(px+sd*Math.sin(ke*1.2)*wh*0.5,wy+Math.cos(ke*1.2)*wh*0.5);g.moveTo(px,wy+wh);g.lineTo(px+sd*Math.sin(ke*1.2)*wh*0.5,wy+wh-Math.cos(ke*1.2)*wh*0.5);g.stroke();});
 txt('SALÓN',w*0.21,h*0.12,30,'#c9d1e0',900);txt('DORMITORIO',w*0.79,h*0.88,30,'#c9d1e0',900);
 // corriente de aire de lado a lado
 const fl=o.flow||0;if(fl>0){g.lineCap='round';for(let k=0;k<4;k++){const yy=h*(0.4+k*0.07);for(let j=0;j<5;j++){const ph=(t*0.7+j/5+k*0.13)%1;const px=-30+ph*(w+60);const wob=Math.sin(ph*12+k)*8;g.globalAlpha=fl*Math.sin(ph*Math.PI);g.strokeStyle='#8fd0ff';g.lineWidth=8;
   g.beginPath();g.moveTo(px-50,yy+wob);g.lineTo(px,yy+wob);g.stroke();g.fillStyle='#8fd0ff';g.beginPath();g.moveTo(px+14,yy+wob);g.lineTo(px-4,yy+wob-12);g.lineTo(px-4,yy+wob+12);g.closePath();g.fill();}}g.globalAlpha=1;}
 g.restore();}
// moho en una esquina de la pared (k 0–1)
function cornerMold(x,y,k,t){if(k<=0)return;[[0,0,46],[40,18,30],[14,44,34],[70,4,22],[4,86,20],[96,26,16]].forEach(([dx,dy,r],i)=>moldSpot(x+dx,y+dy,r,cl(k*1.6-i*0.15),t,i*7,'#3d4a33'));}
