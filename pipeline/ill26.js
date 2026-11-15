// ===== Kit: tender la ropa dentro de casa (tendedero, ropa mojada, vapor, puerta de habitación) =====
// prenda colgada de una varilla en (x,y) (borde de arriba). kind: 'shirt' | 'towel' | 'sock' | 'pants'. wet 0–1 = tono oscuro de mojado
function hangItem(kind,x,y,s,col,wet=0,t=0,sw=0){const c=wet>0?mixc(col,'#0c1630',0.28*wet):col;g.save();g.translate(x,y);g.rotate(Math.sin(t*1.3+x*0.01)*0.015+sw);g.scale(s,s);
 if(kind==='towel'){g.fillStyle=c;rr(-100,-8,200,250,14);g.fill();g.fillStyle='rgba(255,255,255,0.22)';g.fillRect(-100,190,200,14);g.fillRect(-100,212,200,6);
  g.fillStyle='rgba(0,0,0,0.12)';g.fillRect(-100,-8,200,22);}
 else if(kind==='shirt'){g.fillStyle=c;g.beginPath();g.moveTo(-58,-6);g.quadraticCurveTo(0,10,58,-6);g.lineTo(96,6);g.lineTo(106,70);g.lineTo(72,74);g.lineTo(70,40);g.lineTo(70,200);g.quadraticCurveTo(0,210,-70,200);g.lineTo(-70,40);g.lineTo(-72,74);g.lineTo(-106,70);g.lineTo(-96,6);g.closePath();g.fill();
  g.fillStyle='rgba(0,0,0,0.13)';g.beginPath();g.moveTo(-30,-2);g.quadraticCurveTo(0,26,30,-2);g.quadraticCurveTo(0,10,-30,-2);g.fill();}
 else if(kind==='sock'){g.fillStyle=c;rr(-18,-6,36,110,12);g.fill();g.beginPath();g.ellipse(6,104,30,18,0.2,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.3)';g.fillRect(-18,8,36,8);}
 else if(kind==='pants'){g.fillStyle=c;g.beginPath();g.moveTo(-70,-6);g.lineTo(70,-6);g.lineTo(76,230);g.lineTo(12,230);g.lineTo(0,60);g.lineTo(-12,230);g.lineTo(-76,230);g.closePath();g.fill();
  g.strokeStyle='rgba(0,0,0,0.15)';g.lineWidth=4;g.beginPath();g.moveTo(0,0);g.lineTo(0,58);g.stroke();}
 g.fillStyle='rgba(0,0,0,0.18)';rr(kind==='sock'?-20:-60,-10,kind==='sock'?40:120,10,5);g.fill(); // pliegue sobre la varilla
 g.restore();}
// largo de cada prenda (para saber dónde gotea)
const HANG_L={towel:242,shirt:205,sock:122,pants:230};
// tendedero de pie visto de frente: varilla de arriba a la altura y, patas en X hasta el suelo (y+330).
// items: [{k:'shirt',dx:-150,col:'#…',s?:1}] colgados de la varilla; wet 0–1; drip 0–1 = gotas que caen
function dryRack(x,y,w,t,o={}){const items=o.items||[],wet=o.wet??1,drip=o.drip??0,legH=o.legH??330;const hw=w/2;
 g.save();g.strokeStyle='#c9d3e0';g.lineCap='round';
 // alas traseras (varillas más finas y algo más altas)
 g.lineWidth=5;g.strokeStyle='#9aa6b8';for(let i=1;i<=3;i++){g.beginPath();g.moveTo(x-hw+10,y-14*i);g.lineTo(x+hw-10,y-14*i);g.stroke();}
 // patas en X
 g.lineWidth=11;g.strokeStyle='#aeb9ca';g.beginPath();g.moveTo(x-hw,y);g.lineTo(x+hw-40,y+legH);g.moveTo(x+hw,y);g.lineTo(x-hw+40,y+legH);g.stroke();
 g.lineWidth=12;g.strokeStyle='#d6dde8';g.beginPath();g.moveTo(x-hw,y);g.lineTo(x-hw+30,y+legH);g.moveTo(x+hw,y);g.lineTo(x+hw-30,y+legH);g.stroke();
 g.fillStyle='#6b7486';[[x-hw+30,y+legH],[x+hw-30,y+legH],[x+hw-40,y+legH],[x-hw+40,y+legH]].forEach(([a,b])=>{rr(a-14,b-4,28,10,4);g.fill();});
 g.restore();
 // prendas
 items.forEach((it,i)=>{const s=it.s||1;hangItem(it.k,x+it.dx,y+(it.dy||0),s,it.col,wet*(it.wet??1),t);
  if(drip>0){const L=(HANG_L[it.k]||200)*s;for(let j=0;j<2;j++){const ph=(t*0.9+rnd(i*7+j))%1;const dx=x+it.dx+(rnd(i*3+j+1)-0.5)*60*s;const y0=y+(it.dy||0)+L;const yy=y0+ph*ph*(y+legH-y0);
   g.save();g.globalAlpha=drip*(1-ph*0.6);g.fillStyle='#9fd3ff';g.beginPath();g.moveTo(dx,yy-12);g.quadraticCurveTo(dx+7,yy,dx,yy+6);g.quadraticCurveTo(dx-7,yy,dx,yy-12);g.fill();g.restore();}}});
 // varilla delantera (encima de las prendas)
 g.save();g.strokeStyle='#e8edf4';g.lineWidth=9;g.lineCap='round';g.beginPath();g.moveTo(x-hw,y);g.lineTo(x+hw,y);g.stroke();g.restore();
 if(drip>0&&o.puddle!==false){g.save();g.globalAlpha=0.45*drip;g.fillStyle='#7fb6ec';g.beginPath();g.ellipse(x,y+legH+6,hw*0.6,14,0,0,7);g.fill();g.restore();}
 return {rod:[x-hw,x+hw,y],floor:y+legH};}
// vapor de agua que sale de la ropa (franja x0–x1 a la altura y) y se va hacia (tx,ty). a = intensidad
function vaporTo(x0,x1,y,tx,ty,t,a=1,n=12){if(a<=0)return;g.save();for(let i=0;i<n;i++){const ph=(t*0.32+rnd(i+40))%1;const sx=lerp(x0,x1,rnd(i+11));
  const k=ease(ph);const px=lerp(sx,tx+(rnd(i+5)-0.5)*120,k)+Math.sin(t*2+i)*14,py=lerp(y,ty+(rnd(i+6)-0.5)*120,k)-Math.sin(k*Math.PI)*90;
  const r=(16+rnd(i+2)*16)*(0.7+0.8*ph);g.globalAlpha=a*0.5*Math.sin(ph*Math.PI);g.fillStyle='#cfe6ff';g.beginPath();g.arc(px,py,r,0,7);g.fill();
  g.globalAlpha=a*0.85*Math.sin(ph*Math.PI);g.fillStyle='#9fd3ff';g.beginPath();g.arc(px+r*0.3,py-r*0.2,4,0,7);g.fill();}
 g.restore();}
// puerta de una habitación en la pared (tapa lo que haya detrás). close 0 = abierta (pasillo oscuro), 1 = cerrada. Bisagra a la izquierda
function roomDoor(x,y,w,h,close,t,o={}){const k=ease(cl(close));
 if(o.wall!==false){const gr=g.createLinearGradient(0,400,0,1300);gr.addColorStop(0,'#2a2f55');gr.addColorStop(1,'#1c2140');g.fillStyle=gr;g.fillRect(x-60,y-80,w+120,h+80);}
 g.fillStyle='#e8e2d4';rr(x-18,y-18,w+36,h+18,8);g.fill(); // marco
 g.fillStyle='#10152a';g.fillRect(x,y,w,h); // pasillo
 g.fillStyle='rgba(255,226,150,0.10)';g.fillRect(x,y+h-60,w,60);
 const lw=w*(0.18+0.82*k);const grow=26*(1-k); // la hoja se abre hacia dentro: se estrecha y el borde libre crece
 g.fillStyle='#b98a5e';g.beginPath();g.moveTo(x,y);g.lineTo(x+lw,y-grow*0.5);g.lineTo(x+lw,y+h+grow*0.3);g.lineTo(x,y+h);g.closePath();g.fill();
 if(k>0.4){g.globalAlpha=cl((k-0.4)*2);g.fillStyle='rgba(0,0,0,0.12)';rr(x+lw*0.14,y+40,lw*0.72,h*0.36,8);g.fill();rr(x+lw*0.14,y+h*0.5,lw*0.72,h*0.42,8);g.fill();g.globalAlpha=1;}
 g.fillStyle='#e6c78f';g.beginPath();g.arc(x+lw-24,y+h*0.52,11,0,7);g.fill();
 g.fillStyle='#3a2a22';g.fillRect(x-30,y+h,w+60,10);
 return [x+lw-24,y+h*0.52];}
// aspa roja grande (p 0–1) para tachar algo
function xBadge(x,y,p,r=44){if(p<=0)return;g.save();g.globalAlpha=cl(p*2);g.fillStyle=C.red;g.beginPath();g.arc(x,y,r*eob(p),0,7);g.fill();
 g.strokeStyle='#fff';g.lineWidth=r*0.24;g.lineCap='round';const d=r*0.4;g.beginPath();g.moveTo(x-d,y-d);g.lineTo(x+d,y+d);g.moveTo(x+d,y-d);g.lineTo(x-d,y+d);g.stroke();g.restore();}
