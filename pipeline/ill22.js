// ===== Kit de ilustración (22): sal y punto de ebullición — paquete de sal genérico, granos que caen, montoncito pesado, burbujas que nacen en los granos, termómetro de ebullición =====
// paquete de sal de cocina genérico (cartón con boquilla), sin marca. (x,y) = centro del paquete (para la mano); rot en radianes. Devuelve la boquilla [x,y] para saltFall
function saltBox(x,y,s=1,rot=0,o={}){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.fillStyle='#e9eef5';rr(-48,-80,96,160,14);g.fill();
 g.fillStyle='#3d7bff';rr(-48,-20,96,64,6);g.fill();
 g.fillStyle='#fff';g.font=`900 34px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText('SAL',0,13);
 g.fillStyle='#c9d3e0';rr(-48,-80,96,16,[14,14,0,0]);g.fill();
 g.fillStyle='#8592a6';g.beginPath();g.moveTo(14,-80);g.lineTo(44,-80);g.lineTo(52,-100-10*(o.open??1));g.lineTo(22,-96);g.closePath();g.fill(); // boquilla
 g.fillStyle='rgba(255,255,255,0.5)';rr(-40,-60,8,110,4);g.fill();
 g.restore();const c=Math.cos(rot),sn=Math.sin(rot);const lx=38*s,ly=-98*s;return [x+lx*c-ly*sn,y+lx*sn+ly*c];}
// granos de sal que caen de (x0,y0) a la altura y1 (con algo de dispersión); a = intensidad 0–1
function saltFall(x0,y0,y1,t,a=1,n=26,spread=24){if(a<=0)return;g.save();g.fillStyle='#ffffff';for(let i=0;i<n;i++){const ph=(t*1.6+rnd(i+40))%1;const yy=lerp(y0,y1,ph);const xx=x0+(rnd(i+7)-0.5)*spread*(0.4+ph*1.6);g.globalAlpha=a*(ph<0.92?0.95:(1-ph)*12);const r=2.5+rnd(i+3)*2.5;g.fillRect(xx-r,yy-r,2*r,2*r);}g.restore();}
// montoncito de sal (base en y), s = escala; label opcional debajo
function saltPile(x,y,s=1,a=1){if(a<=0)return;g.save();g.globalAlpha*=cl(a);g.translate(x,y);g.scale(s,s);
 g.fillStyle='#f4f6fb';g.beginPath();g.moveTo(-90,0);g.quadraticCurveTo(-40,-20,-10,-74);g.quadraticCurveTo(0,-84,10,-74);g.quadraticCurveTo(40,-20,90,0);g.closePath();g.fill();
 g.fillStyle='#d9dfe8';g.beginPath();g.moveTo(10,-74);g.quadraticCurveTo(40,-20,90,0);g.lineTo(30,0);g.quadraticCurveTo(26,-30,10,-74);g.fill();
 g.fillStyle='#fff';for(let i=0;i<10;i++){g.fillRect(-60+rnd(i+11)*120,-6-rnd(i+2)*30*(1-Math.abs(rnd(i+11)-0.5)*2),4,4);}
 g.restore();}
// báscula de cocina genérica con pantalla (base en y); txtS = lo que marca; devuelve la y del plato
function kScale(x,y,s=1,txtS='',a=1){if(a<=0)return y;g.save();g.globalAlpha*=cl(a);g.translate(x,y);g.scale(s,s);
 g.fillStyle='#2a3550';rr(-130,-50,260,50,16);g.fill();
 g.fillStyle='#c9d3e0';rr(-150,-64,300,16,8);g.fill();
 g.fillStyle='#0d1424';rr(-60,-38,120,30,8);g.fill();
 if(txtS){g.fillStyle='#3ecf6e';g.font=`800 24px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(txtS,0,-22);}
 g.restore();return y-64*s;}
// burbujas que nacen en los granos de sal hundidos (nucleación). Pensado para dibujarse sobre potCut: x0..x1 = ancho útil, yW = superficie, yB = fondo. k = cuántos granos han caído 0–1
function grainBubbles(x0,x1,yW,yB,t,k=1,a=1){if(a<=0)return;g.save();const n=14;for(let i=0;i<n;i++){if(rnd(i+21)>k)continue;
  const gx=lerp(x0+20,x1-20,rnd(i+30));const gy=lerp(yW+40,yB-10,rnd(i+50));
  g.globalAlpha=a;g.fillStyle='#ffffff';g.fillRect(gx-4,gy-4,8,8);
  for(let j=0;j<3;j++){const ph=(t*1.8+rnd(i*3+j))%1;const by=lerp(gy-8,yW+4,ph);const bx=gx+Math.sin(t*5+i+j)*5;
   g.globalAlpha=a*(ph<0.88?0.9:(1-ph)*8);g.strokeStyle='#fff';g.lineWidth=3;g.fillStyle='rgba(220,240,255,0.45)';g.beginPath();g.arc(bx,by,4+ph*7,0,7);g.fill();g.stroke();}}
 g.restore();}
// termómetro de ebullición: escala lo..hi en °C con rayas cada grado y cifras en las marcas de `labels`; val con decimales; línea discontinua en 100 °C. Devuelve f(grados)→y
function boilThermo(x,y,h,val,o={}){const lo=o.lo??97,hi=o.hi??102;const top=y-h,yv=v=>y-(cl((v-lo)/(hi-lo)))*h;const col=o.col||C.red;
 g.fillStyle='#f4f6fb';rr(x-34,top-30,68,h+40,34);g.fill();g.beginPath();g.arc(x,y+40,62,0,7);g.fill();
 g.fillStyle='#d9dfe8';rr(x-18,top-14,36,h+20,18);g.fill();
 g.fillStyle=col;g.beginPath();g.arc(x,y+40,46,0,7);g.fill();rr(x-18,yv(val),36,y+30-yv(val),18);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';rr(x-10,top-4,8,h,4);g.fill();
 g.strokeStyle='#8e98ad';g.lineWidth=4;for(let v=lo;v<=hi;v+=0.5){const yy=yv(v);const big=Number.isInteger(v);g.beginPath();g.moveTo(x+38,yy);g.lineTo(x+(big?66:52),yy);g.stroke();if(big&&(o.labels||[100]).includes(v))txt(v+'°',x+116,yy,32,'#dfe5f0',800);}
 if(o.mark!=null){const yy=yv(o.mark);g.save();g.setLineDash([12,10]);g.strokeStyle=o.markCol||C.blue;g.lineWidth=5;g.beginPath();g.moveTo(x-100,yy);g.lineTo(x+40,yy);g.stroke();g.restore();}
 return yv;}
