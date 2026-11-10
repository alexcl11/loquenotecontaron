// ===== Kit de ilustración (21): microondas y verdura — microondas grande con puerta, cuenco de cristal, brócoli, espinacas, olla en corte, vitaminas que se van al agua =====
// ramillete de brócoli; (x,y) = base del tallo; dull 0–1 = verde apagado (muy cocido)
function broccoli(x,y,s=1,rot=0,dull=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.fillStyle=mixc('#b9dc8c','#a3a768',dull);rr(-9,-34,18,38,8);g.fill();
 const c1=mixc('#3fa046','#7a8a40',dull),c2=mixc('#2f8a3a','#66753a',dull);
 [[-16,-40,17],[16,-40,17],[0,-56,20],[-10,-58,13],[12,-62,13]].forEach(([dx,dy,r],i)=>{g.fillStyle=i%2?c2:c1;g.beginPath();g.arc(dx,dy,r,0,7);g.fill();});
 g.fillStyle='rgba(255,255,255,0.18)';g.beginPath();g.arc(-6,-64,7,0,7);g.fill();g.restore();}
// hoja de espinaca; (x,y) = base; dull 0–1 = lacia/oscura
function spinach(x,y,s=1,rot=0,dull=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.fillStyle=mixc('#3a9a48','#5f6e33',dull);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(-34,-34,0,-74);g.quadraticCurveTo(34,-34,0,0);g.fill();
 g.strokeStyle=mixc('#9fd28a','#8a9358',dull);g.lineWidth=3;g.beginPath();g.moveTo(0,2);g.lineTo(0,-62);g.stroke();g.restore();}
// cuenco de cristal (base en y, 220×90 a escala 1). o: veg 'broc'/'spin', dull, water 0–1 (nivel), wcol, steam 0–1
function glassBowl(x,y,s,t,o={}){const w=o.water||0,d=o.dull||0;g.save();g.translate(x,y);g.scale(s,s);
 const P=()=>{g.beginPath();g.moveTo(-110,-90);g.quadraticCurveTo(-104,0,-50,0);g.lineTo(50,0);g.quadraticCurveTo(104,0,110,-90);g.closePath();};
 g.fillStyle='rgba(200,225,255,0.16)';P();g.fill();
 if(o.veg==='spin'){[[-50,-30,-0.5],[-20,-36,-0.2],[10,-34,0.15],[40,-30,0.5],[-34,-20,-0.9],[26,-18,0.9],[0,-22,0]].forEach(([dx,dy,r])=>spinach(dx,dy+20,0.9,r,d));}
 else if(o.veg!==false){[[-56,-14,-0.35],[56,-14,0.35],[-24,-6,-0.12],[24,-6,0.12],[0,-2,0]].forEach(([dx,dy,r])=>broccoli(dx,dy,0.95,r,d));}
 if(w>0){g.save();P();g.clip();g.fillStyle=o.wcol||'rgba(150,205,255,0.5)';const h=88*w;g.beginPath();g.moveTo(-120,-h);for(let i=0;i<=12;i++)g.lineTo(-120+i*20,-h+Math.sin(i*0.9+t*5)*2.5);g.lineTo(120,4);g.lineTo(-120,4);g.closePath();g.fill();g.restore();}
 g.strokeStyle='rgba(230,242,255,0.85)';g.lineWidth=5;P();g.stroke();g.fillStyle='rgba(230,242,255,0.85)';rr(-116,-95,232,9,4);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';rr(-92,-76,8,50,4);g.fill();g.restore();
 if(o.steam)steam(x,y-110*s,t,o.steam);}
// token de vitamina (círculo con letra); txt 'C' por defecto
function vitTok(x,y,r,a,col='#ff9f2e',txt='C'){if(a<=0)return;g.save();g.globalAlpha*=cl(a);g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';g.beginPath();g.arc(x-r*0.3,y-r*0.35,r*0.3,0,7);g.fill();
 g.fillStyle='#3a2006';g.font=`900 ${Math.round(r*(txt.length>1?0.85:1.15))}px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(txt,x,y+1);g.restore();}
// enjambre de vitaminas alrededor de (cx,cy) en elipse rx×ry. o: n, leave 0–1 (fracción que se va), tx,ty,tw,th (zona destino: el agua), lost (cuántas se van como máximo, 0–1), txt, col, r
function vitSwarm(cx,cy,rx,ry,t,a,o={}){if(a<=0)return;const n=o.n||8,lv=o.leave||0,lost=o.lost??1,r=o.r||20;
 for(let i=0;i<n;i++){const ang=i/n*Math.PI*2+t*0.8;let x=cx+Math.cos(ang)*rx,y=cy+Math.sin(ang)*ry+Math.sin(t*3+i)*5;let al=a;
  const goes=(i+0.5)/n<=lost;if(goes&&lv>0){const k=ease(cl(lv*1.6-i/n*0.6));const tx=(o.tx??cx)+rnd(i+3)*(o.tw||0)+Math.sin(t*1.5+i)*10,ty=(o.ty??cy+200)+rnd(i+7)*(o.th||0)+Math.cos(t*1.3+i)*8;
   x=lerp(x,tx,k);y=lerp(y,ty,k);al=a*(1-0.45*k);}
  vitTok(x,y,r,al,goes&&lv>0.05?mixc(o.col||'#ff9f2e','#c9b48a',cl(lv)):(o.col||'#ff9f2e'),o.txt||'C');}}
// microondas grande (base en y; 300×180 a escala 1). o: on 0–1, open 0–1 (puerta abierta hacia la izquierda), time (texto del display), press 0–1 (botón), food(cx,cy) dibuja dentro (cy = suelo del plato)
// devuelve {btn:[x,y], floor:[x,y]} en coordenadas de mundo
function mwOven(x,y,s,t,o={}){const on=o.on||0,op=o.open||0;g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(0,0,0,0.25)';rr(-146,-6,292,10,5);g.fill();
 g.fillStyle='#e3e8ef';rr(-150,-180,300,180,16);g.fill();g.fillStyle='#cfd6e0';rr(-150,-24,300,24,10);g.fill();
 // cavidad
 g.save();rr(-136,-166,192,152,10);g.clip();g.fillStyle=on?mixc('#2a2f3a','#f6c96a',0.55*on):'#2a2f3a';g.fillRect(-136,-166,192,152);
 g.fillStyle='rgba(255,255,255,0.12)';g.beginPath();g.ellipse(-40,-30,80,12,0,0,7);g.fill();
 if(o.food)o.food(-40+Math.sin(t*1.6)*6,-32);
 if(on){g.fillStyle=`rgba(255,230,150,${0.18*on})`;g.fillRect(-136,-166,192,152);}g.restore();
 // puerta: cristal con rejilla; al abrir gira sobre la bisagra izquierda
 if(op<1){const dw=206*(1-ease(op));g.save();g.translate(-143,0);g.fillStyle='#d5dbe4';g.beginPath();g.roundRect(0,-173,dw,166,12);if(dw>40)g.roundRect(10+dw-20,-161,-(dw-20),142,8);g.fill('evenodd');
  if(dw>40){g.fillStyle=on?'rgba(255,215,130,0.10)':'rgba(40,46,60,0.35)';rr(10,-161,dw-20,142,8);g.fill();g.globalAlpha=on?0.07:0.14;g.fillStyle='#10141c';for(let i=0;i<Math.floor((dw-30)/10);i++)for(let j=0;j<13;j++){g.beginPath();g.arc(18+i*10,-152+j*10,2,0,7);g.fill();}g.globalAlpha=1;}
  g.fillStyle='#aab3c2';rr(dw-14,-150,8,110,4);g.fill();g.restore();}
 else{g.fillStyle='#d5dbe4';rr(-176,-173,30,166,10);g.fill();}
 // panel
 g.fillStyle='#c9ced8';rr(64,-166,74,152,8);g.fill();g.fillStyle='#10141c';rr(72,-156,58,28,5);g.fill();
 if(o.time){g.fillStyle='#3ecf6e';g.font=`800 19px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(o.time,101,-141);}
 g.fillStyle='#8592a6';for(let i=0;i<2;i++){g.beginPath();g.arc(101,-100+i*30,10,0,7);g.fill();}
 const pr=o.press||0;g.fillStyle=pr>0?mixc('#3ecf6e','#7dffa8',pr):'#3ecf6e';rr(80,-50,42,22,8);g.fill();
 g.restore();return {btn:[x+101*s,y-39*s],floor:[x-40*s,y-32*s]};}
// olla en corte (se ve el agua por dentro); base en y, w×h. o: lvl 0–1, boil 0–1 (burbujas), wcol, veg(xc,yAgua) dibuja lo de dentro. Devuelve la y del agua
function potCut(x,y,w,h,t,o={}){const lv=o.lvl??0.75,b=o.boil??1;const x0=x-w/2,wy=y-14-(h-14)*lv;
 g.fillStyle='#1e2128';rr(x0-44,y-h+20,48,18,9);g.fill();rr(x+w/2-4,y-h+20,48,18,9);g.fill();
 g.fillStyle='#2a3550';rr(x0,y-h,w,h,20);g.fill();
 if(o.veg)o.veg(x,wy);
 g.fillStyle=o.wcol||'rgba(120,190,255,0.6)';g.beginPath();g.moveTo(x0+12,wy);for(let i=0;i<=16;i++)g.lineTo(x0+12+i*(w-24)/16,wy+Math.sin(i*1.1+t*8)*4*b);g.lineTo(x+w/2-12,y-24);g.quadraticCurveTo(x+w/2-12,y-12,x+w/2-24,y-12);g.lineTo(x0+24,y-12);g.quadraticCurveTo(x0+12,y-12,x0+12,y-24);g.closePath();g.fill();
 if(b>0){g.fillStyle='rgba(235,245,255,0.75)';for(let i=0;i<14;i++){const ph=(t*1.2+rnd(i))%1;const bx=x0+30+rnd(i+5)*(w-60)+Math.sin(t*4+i)*5;const by=lerp(y-20,wy+6,ph);g.globalAlpha=b*(ph<0.9?1:(1-ph)*10);g.beginPath();g.arc(bx,by,4+rnd(i+9)*6,0,7);g.fill();}g.globalAlpha=1;}
 g.strokeStyle='#c9d3e0';g.lineWidth=14;g.beginPath();g.moveTo(x0+7,y-h);g.lineTo(x0+7,y-20);g.quadraticCurveTo(x0+7,y-7,x0+20,y-7);g.lineTo(x+w/2-20,y-7);g.quadraticCurveTo(x+w/2-7,y-7,x+w/2-7,y-20);g.lineTo(x+w/2-7,y-h);g.stroke();
 g.fillStyle='#8592a6';rr(x0-8,y-h-8,w+16,16,8);g.fill();return wy;}
