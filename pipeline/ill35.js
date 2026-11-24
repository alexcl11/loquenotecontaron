// ===== Kit de ilustración (35): olla exprés — olla a presión con válvula de anillos, zona de vitro que brilla, olla en corte con nivel ⅔ y vapor atrapado, termómetro de barra =====
// olla a presión genérica (sin marca), base en y. o: lid 0–1 (tapa bajando), ring 0–1 (sube el indicador de la válvula),
// hiss 0–1 (chorrito de vapor por la válvula), hd = -1 mango largo a la izquierda / 1 a la derecha, soup = color del guiso, peas = garbanzos en la superficie
// devuelve {handle:[x,y], valve:[x,y], side:[x,y]} en coordenadas de mundo (las mismas que x,y; para las manos)
function expressPot(x,y,s,t,o={}){const lid=o.lid??1,ring=o.ring??0,hd=o.hd??-1,soup=o.soup||'#d9b36a';
 g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='#1e2128';rr(hd<0?126:-170,-132,44,18,9);g.fill(); // asa corta (lado contrario al mango)
 g.fillStyle='#c9d3e0';rr(-130,-150,260,150,24);g.fill();g.fillStyle='#b3bfcf';rr(-130,-52,260,52,22);g.fill();
 g.fillStyle='#e9eef5';rr(-112,-138,16,110,8);g.fill();
 g.fillStyle='#8592a6';rr(-136,-12,272,14,6);g.fill(); // fondo grueso difusor
 if(lid<1){g.fillStyle=soup;g.beginPath();g.ellipse(0,-152,122,16,0,0,7);g.fill();
  if(o.peas!==false){for(let i=0;i<16;i++){const px=-100+rnd(i+40)*200,py=-156+rnd(i+60)*10;g.fillStyle='#e8c98a';g.beginPath();g.arc(px,py,8,0,7);g.fill();g.fillStyle='rgba(120,80,30,0.25)';g.beginPath();g.arc(px+2,py+2,3,0,7);g.fill();}}}
 if(lid>0){const ly=lerp(-120,0,ease(lid));g.save();g.translate(0,ly);g.globalAlpha=cl(lid*3);
  g.fillStyle='#aeb9c9';g.beginPath();g.ellipse(0,-152,140,36,0,Math.PI,0);g.fill();
  g.fillStyle='#8592a6';rr(-142,-160,284,14,7);g.fill();
  g.fillStyle='rgba(255,255,255,0.35)';g.beginPath();g.ellipse(-50,-172,40,8,-0.15,0,7);g.fill();
  g.fillStyle='#1e2128';if(hd<0)rr(-300,-176,200,26,13);else rr(100,-176,200,26,13);g.fill(); // mango largo
  g.fillStyle='#8592a6';rr(-18,-206,36,22,6);g.fill(); // base de la válvula
  const rh=34*cl(ring);if(rh>1){g.fillStyle='#e9eef5';rr(-8,-206-rh,16,rh+4,4);g.fill();g.fillStyle='#e5484d';g.fillRect(-8,-206-rh+6,16,6);if(ring>0.6){g.fillRect(-8,-206-rh+18,16,6);}}
  g.fillStyle='#e5484d';g.beginPath();g.arc(-60,-178,6,0,7);g.fill(); // piloto de seguridad
  g.restore();}
const P=(px,py)=>[x+px*s,y+py*s];
 const ly=lerp(-120,0,ease(lid));const res={handle:P(hd<0?-270:270,-163+ly),valve:P(0,-210-34*cl(ring)+ly),side:P(hd<0?148:-148,-123)};
 g.restore();
 if((o.hiss||0)>0&&lid>=1){g.save();g.globalAlpha=0.55*o.hiss;g.strokeStyle='#fff';g.lineCap='round';g.lineWidth=6*s;
  for(let k=0;k<3;k++){const ph=(t*2.2+k/3)%1;g.globalAlpha=0.6*o.hiss*(1-ph);g.beginPath();g.moveTo(x,y-(212+34*ring)*s);g.quadraticCurveTo(x+(k-1)*20*s,y-(240+120*ph)*s,x+(k-1)*45*s*ph+Math.sin(t*6+k)*8,y-(260+200*ph)*s);g.stroke();}g.restore();}
 return res;}
// zona de vitrocerámica/inducción encendida bajo una olla (placa eléctrica; base en y, anchura w). a 0–1 = potencia (mínimo ≈ 0,25)
function hobGlow(x,y,w,a,t){if(a<=0)return;g.save();const k=a*(0.85+0.15*Math.sin(t*5));
 const gr=g.createRadialGradient(x,y,6,x,y,w*0.75);gr.addColorStop(0,`rgba(255,90,40,${0.55*k})`);gr.addColorStop(1,'rgba(255,90,40,0)');g.fillStyle=gr;g.fillRect(x-w,y-w*0.5,2*w,w*0.8);
 g.strokeStyle=`rgba(255,110,60,${0.9*k})`;g.lineWidth=6;g.beginPath();g.ellipse(x,y+2,w/2+18,9,0,0,7);g.stroke();
 g.strokeStyle=`rgba(255,170,90,${0.7*k})`;g.lineWidth=3;g.beginPath();g.ellipse(x,y+2,w/2+30,13,0,0,7);g.stroke();g.restore();}
// olla a presión en corte (base en y): fill 0–1 (nivel del agua, en fracción de la altura útil), max = muestra la línea de ⅔,
// press 0–1 = vapor atrapado (puntos que rebotan dentro y flechas hacia dentro), lid 0–1, ring 0–1
function cutPot(x,y,s,t,o={}){const fill=o.fill??0.6,press=o.press??0;g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='#8592a6';rr(-136,-12,272,14,6);g.fill();
 g.fillStyle='#1b2236';rr(-124,-150,248,140,16);g.fill(); // interior
 const wl=-12-128*cl(fill);g.save();g.beginPath();g.roundRect(-124,-150,248,140,16);g.clip();
 const wg=g.createLinearGradient(0,wl,0,-12);wg.addColorStop(0,`rgba(120,190,255,${0.75})`);wg.addColorStop(1,'rgba(60,120,220,0.85)');g.fillStyle=wg;g.fillRect(-124,wl,248,-12-wl);
 for(let i=0;i<12;i++){const px=-100+rnd(i+7)*200,py=-24-rnd(i+13)*Math.max(10,(-12-wl)-24);g.fillStyle='#e8c98a';g.beginPath();g.arc(px,py,9,0,7);g.fill();}
 if(press>0){for(let i=0;i<22;i++){const ph=(t*(0.8+rnd(i)*0.9)+rnd(i+3))%1;const px=-110+((rnd(i+5)*220+ph*300)%220),py=wl-8-Math.abs(Math.sin(ph*Math.PI*2+i))*(wl+140);g.globalAlpha=press*0.8;g.fillStyle='#fff';g.beginPath();g.arc(px,py,4+rnd(i)*4,0,7);g.fill();}g.globalAlpha=1;}
 g.restore();
 g.strokeStyle='#c9d3e0';g.lineWidth=14;g.beginPath();g.moveTo(-130,-150);g.lineTo(-130,-6);g.moveTo(130,-150);g.lineTo(130,-6);g.stroke(); // paredes
 if(o.max){g.setLineDash([14,10]);g.strokeStyle='#ffcf5a';g.lineWidth=4;const my=-12-128*2/3;g.beginPath();g.moveTo(-118,my);g.lineTo(118,my);g.stroke();g.setLineDash([]);}
 const lid=o.lid??1;if(lid>0){const ly=lerp(-80,0,ease(lid));g.save();g.translate(0,ly);g.globalAlpha=cl(lid*3);g.fillStyle='#aeb9c9';g.beginPath();g.ellipse(0,-152,140,36,0,Math.PI,0);g.fill();g.fillStyle='#8592a6';rr(-142,-160,284,14,7);g.fill();
  g.fillStyle='#8592a6';rr(-18,-206,36,22,6);g.fill();const rh=34*cl(o.ring||0);if(rh>1){g.fillStyle='#e9eef5';rr(-8,-206-rh,16,rh+4,4);g.fill();g.fillStyle='#e5484d';g.fillRect(-8,-206-rh+6,16,6);}g.restore();}
 if(press>0&&lid>=1){g.save();g.globalAlpha=press;g.fillStyle='#ffcf5a';[[-110,-120,0],[110,-120,Math.PI],[0,-140,Math.PI/2]].forEach(([ax,ay,a],i)=>{const d=10*Math.sin(t*6+i);g.save();g.translate(ax+Math.cos(a)*d,ay+Math.sin(a)*d);g.rotate(a);g.beginPath();g.moveTo(26,0);g.lineTo(-6,-16);g.lineTo(-6,16);g.closePath();g.fill();g.fillRect(-30,-6,26,12);g.restore();});g.restore();}
 g.restore();}
// termómetro de barra (sin escala): (x,y) = bulbo, h = altura, p 0–1 = nivel, col
function barThermo(x,y,h,p,col='#e5484d'){g.fillStyle='#f4f6fb';rr(x-30,y-h-20,60,h+30,30);g.fill();g.beginPath();g.arc(x,y+30,52,0,7);g.fill();
 g.fillStyle='#d9dfe8';rr(x-15,y-h-6,30,h+10,15);g.fill();g.fillStyle=col;g.beginPath();g.arc(x,y+30,38,0,7);g.fill();const hh=h*cl(p);rr(x-15,y-hh,30,hh+30,15);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';rr(x-8,y-h,7,h,4);g.fill();}
