// ===== Kit de ilustración (28): arroz cocido y Bacillus cereus — cuenco y cazo de arroz, esporas, toxina, lupa, reloj de 2 h, termómetro alto =====
const RICE='#f4eee0',RICE_S='#d8ccb0';
// un grano de arroz (gs = escala)
function riceGrain(x,y,rot,gs=1,i=0){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=i%4===0?RICE_S:(i%2?'#fffaf0':RICE);g.beginPath();g.ellipse(0,0,9*gs,4*gs,0,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,0.6)';g.beginPath();g.ellipse(-2*gs,-1.2*gs,4*gs,1.3*gs,0,0,7);g.fill();g.restore();}
// cúpula de arroz cocido: (x,y) = centro de la base, w = semiancho, h = alto
function riceDome(x,y,w,h,t,o={}){const gs=o.gs||1;const n=o.n||Math.round(w*h/(55*gs*gs));g.save();
 g.fillStyle=RICE;g.beginPath();g.ellipse(x,y,w,h,0,Math.PI,0);g.closePath();g.fill();
 g.beginPath();g.ellipse(x,y,w,h,0,Math.PI,0);g.closePath();g.clip();
 for(let i=0;i<n;i++){const u=rnd(i*3+1)*2-1,v=rnd(i*3+2);const gy=y-v*h*Math.sqrt(1-u*u);riceGrain(x+u*w*0.98,gy,rnd(i*3+3)*Math.PI,gs,i);}
 g.restore();}
// arroz visto de cerca (relleno de un círculo), para la lupa
function riceField(cx,cy,r,gs=3){g.fillStyle='#efe6d2';g.fillRect(cx-r,cy-r,2*r,2*r);const st=15*gs;let i=0;
 for(let y=cy-r-st;y<cy+r+st;y+=st*0.55)for(let x=cx-r-st;x<cx+r+st;x+=st*0.9){i++;riceGrain(x+(rnd(i)-0.5)*st*0.5+(Math.floor((y-cy)/st)%2)*st*0.45,y+(rnd(i+50)-0.5)*st*0.3,rnd(i+90)*Math.PI,gs,i);}}
// cuenco de cerámica con arroz (base en y). o.top(x,yBase,w,h) dibuja encima de la cúpula (esporas, toxina…)
function riceBowl(x,y,s,t,o={}){g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.22)';g.beginPath();g.ellipse(0,2,92,10,0,0,7);g.fill();
 g.fillStyle='#cfd6e0';rr(-42,-16,84,16,6);g.fill();
 g.beginPath();g.moveTo(-114,-92);g.quadraticCurveTo(-110,-12,0,-12);g.quadraticCurveTo(110,-12,114,-92);g.closePath();g.fillStyle='#f4f6fb';g.fill();
 g.save();g.clip();g.fillStyle=C.blue;g.fillRect(-130,-66,260,11);g.fillStyle='rgba(0,0,0,0.07)';g.fillRect(40,-100,90,100);g.restore();
 g.restore();
 if(o.rice!==false)riceDome(x,y-92*s,104*s,(o.h||50)*s,t,{gs:s});
 g.strokeStyle='#dfe5f0';g.lineWidth=7*s;g.lineCap='round';g.beginPath();g.moveTo(x-114*s,y-92*s);g.lineTo(x+114*s,y-92*s);g.stroke();
 if(o.top)o.top(x,y-92*s,104*s,(o.h||50)*s);}
// cazo/olla con arroz cocido (usa stockPot de ill7.js; base en y)
function ricePot(x,y,s,t,o={}){stockPot(x,y,s,t,{lid:o.lid||0,steam:0,soup:RICE});
 if((o.lid||0)<1)riceDome(x,y-184*s,112*s,(o.h||34)*s,t,{gs:s*0.9});
 if(o.steam)steam(x,y-230*s,t,o.steam);}
// espora: cápsula dormida con cáscara gruesa. open 0–1 = se abre y sale la bacteria (germ). shield 0–1 = brillo de «aguanta el calor»
function spore(x,y,r,t,i=0,a=1,open=0,shield=0){if(a<=0)return;g.save();g.translate(x,y+Math.sin(t*3+i)*r*0.06);g.globalAlpha*=a;
 if(shield>0){g.strokeStyle=`rgba(255,207,90,${0.85*shield})`;g.lineWidth=r*0.16;g.beginPath();g.ellipse(0,0,r*1.35,r*0.95,0,0,7);g.stroke();}
 const op=ease(cl(open*1.4)),gr=ease(cl((open-0.25)/0.75));
 if(gr>0)germ(0,0,r*0.82*gr,t,i,1);
 const halves=op>0?[-1,1]:[0];
 halves.forEach(sd=>{g.save();g.translate(sd*op*r*0.95,op*r*0.25);g.rotate(sd*op*0.6);g.globalAlpha*=1-cl((open-0.6)/0.4);
  g.beginPath();if(sd===0)g.ellipse(0,0,r,r*0.62,0,0,7);else if(sd<0)g.ellipse(0,0,r,r*0.62,0,Math.PI/2,Math.PI*1.5);else g.ellipse(0,0,r,r*0.62,0,-Math.PI/2,Math.PI/2);g.closePath();
  g.fillStyle='#c98a3a';g.fill();g.strokeStyle='#7a4c1c';g.lineWidth=r*0.16;g.stroke();
  if(sd===0){g.fillStyle='#8a5a22';g.beginPath();g.ellipse(0,0,r*0.45,r*0.25,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.35)';g.beginPath();g.ellipse(-r*0.4,-r*0.28,r*0.3,r*0.1,-0.3,0,7);g.fill();
   // ojos cerrados (dormida)
   g.strokeStyle='#3a2410';g.lineWidth=r*0.09;g.lineCap='round';[-1,1].forEach(e=>{g.beginPath();g.arc(e*r*0.22,-r*0.02,r*0.1,0.2,Math.PI-0.2);g.stroke();});}
  g.restore();});
 g.restore();}
// toxina: molécula morada hexagonal con cara enfadada. shake = tiembla (calor)
function toxin(x,y,r,t,i=0,a=1,shake=0){if(a<=0)return;g.save();g.translate(x+Math.sin(t*40+i)*r*0.08*shake,y+Math.sin(t*3+i)*r*0.08);g.rotate(Math.sin(t*1.1+i)*0.2);g.globalAlpha*=a;const sc=eob(cl(a*1.2));g.scale(sc,sc);
 g.beginPath();for(let k=0;k<6;k++){const an=k/6*Math.PI*2;g[k?'lineTo':'moveTo'](Math.cos(an)*r,Math.sin(an)*r);}g.closePath();g.fillStyle=C.purple;g.fill();g.strokeStyle='#4b3bb0';g.lineWidth=r*0.16;g.lineJoin='round';g.stroke();
 g.fillStyle='#4b3bb0';for(let k=0;k<6;k++){const an=k/6*Math.PI*2+Math.PI/6;g.beginPath();g.arc(Math.cos(an)*r*1.18,Math.sin(an)*r*1.18,r*0.17,0,7);g.fill();}
 g.fillStyle='#fff';g.beginPath();g.arc(-r*0.3,-r*0.08,r*0.2,0,7);g.arc(r*0.3,-r*0.08,r*0.2,0,7);g.fill();g.fillStyle='#1c1440';g.beginPath();g.arc(-r*0.27,-r*0.03,r*0.1,0,7);g.arc(r*0.33,-r*0.03,r*0.1,0,7);g.fill();
 g.strokeStyle='#1c1440';g.lineWidth=r*0.09;g.lineCap='round';g.beginPath();g.moveTo(-r*0.5,-r*0.38);g.lineTo(-r*0.15,-r*0.26);g.moveTo(r*0.5,-r*0.38);g.lineTo(r*0.15,-r*0.26);g.moveTo(-r*0.2,r*0.38);g.quadraticCurveTo(0,r*0.24,r*0.2,r*0.38);g.stroke();
 g.restore();}
// lupa: draw(x,y,r) pinta lo que se ve dentro (recortado al círculo)
function lens(x,y,r,a,draw){if(a<=0)return;g.save();g.globalAlpha*=a;
 g.strokeStyle='#4a3424';g.lineCap='round';g.lineWidth=r*0.17;g.beginPath();g.moveTo(x+r*0.78,y+r*0.78);g.lineTo(x+r*1.22,y+r*1.22);g.stroke();
 g.save();g.beginPath();g.arc(x,y,r,0,7);g.clip();draw(x,y,r);g.restore();
 g.strokeStyle='#2a3550';g.lineWidth=r*0.09;g.beginPath();g.arc(x,y,r,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,0.35)';g.lineWidth=r*0.03;g.beginPath();g.arc(x,y,r*0.9,3.6,4.4);g.stroke();
 g.restore();}
// reloj de límite: sector verde hasta `max` horas (2 por defecto) y rojo a partir de ahí; h = horas transcurridas
function limitClock(x,y,r,h,t,o={}){const mx=o.max??2;const a0=-Math.PI/2,ah=v=>a0+v/12*Math.PI*2;g.save();
 g.fillStyle='rgba(0,0,0,0.25)';g.beginPath();g.arc(x+6,y+10,r,0,7);g.fill();
 g.fillStyle='#f4f1ea';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#c9b28a';g.lineWidth=r*0.08;g.stroke();
 const hg=Math.min(h,mx);if(hg>0){g.fillStyle='rgba(62,207,110,0.6)';g.beginPath();g.moveTo(x,y);g.arc(x,y,r*0.9,a0,ah(hg));g.closePath();g.fill();}
 if(h>mx){g.fillStyle='rgba(229,72,77,0.65)';g.beginPath();g.moveTo(x,y);g.arc(x,y,r*0.9,ah(mx),ah(h));g.closePath();g.fill();}
 for(let k=1;k<=12;k++){const an=ah(k);txt(String(k),x+Math.cos(an)*r*0.76,y+Math.sin(an)*r*0.76,r*0.15,'#3a4255',800);}
 const am=ah(h*12),ahh=ah(h);g.strokeStyle='#1b1e26';g.lineCap='round';g.lineWidth=r*0.07;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(ahh)*r*0.45,y+Math.sin(ahh)*r*0.45);g.stroke();
 g.lineWidth=r*0.04;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(am)*r*0.66,y+Math.sin(am)*r*0.66);g.stroke();g.fillStyle=C.red;g.beginPath();g.arc(x,y,r*0.06,0,7);g.fill();
 g.restore();}
// termómetro alto (escala lo–hi con marcas cada `step`); mark = línea discontinua con su texto
function bigThermo(x,y,h,val,o={}){const lo=o.lo??0,hi=o.hi??140,step=o.step??20;const top=y-h,yv=v=>y-cl((v-lo)/(hi-lo))*h;const col=o.col||C.red;
 g.fillStyle='#f4f6fb';rr(x-34,top-30,68,h+40,34);g.fill();g.beginPath();g.arc(x,y+40,62,0,7);g.fill();
 g.fillStyle='#d9dfe8';rr(x-18,top-14,36,h+20,18);g.fill();
 g.fillStyle=col;g.beginPath();g.arc(x,y+40,46,0,7);g.fill();rr(x-18,yv(val),36,y+30-yv(val),18);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';rr(x-10,top-4,8,h,4);g.fill();
 g.strokeStyle='#8e98ad';g.lineWidth=4;for(let v=lo;v<=hi;v+=step){const yy=yv(v);g.beginPath();g.moveTo(x+38,yy);g.lineTo(x+60,yy);g.stroke();if((o.labels||[]).includes(v))txt(v+'°',x+104,yy,30,'#dfe5f0',800);}
 if(o.mark!=null&&(o.markA??1)>0){const yy=yv(o.mark);g.save();g.globalAlpha*=o.markA??1;g.setLineDash([12,10]);g.strokeStyle=o.markCol||C.purple;g.lineWidth=5;g.beginPath();g.moveTo(x-90,yy);g.lineTo(x+40,yy);g.stroke();g.restore();}
 return yv;}
