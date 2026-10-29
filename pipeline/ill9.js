// ===== Kit de ilustración (9): programas eco — lavavajillas cerrado con panel, corte interior, lavadora, hucha de monedas =====
const PROG_COL={ECO:'#3ecf6e',NORMAL:'#4f8bff','RÁPIDO':'#f2a33a',INTENSIVO:'#e5484d'};
// lavavajillas integrado y cerrado bajo la encimera. (x,y) = esquina sup. izq. del hueco (ancho 220, alto 330)
// o: prog (texto del display), p (0–1 barra de progreso), sel (0 eco · 1 normal · 2 rápido: botón encendido), run 0–1 (en marcha), press 0–1 (botón hundido)
// devuelve {btn:[[x,y]×3], disp:[x,y]}
function dwFront(x,y,t,o={}){const prog=o.prog||'ECO',col=PROG_COL[prog]||C.green,run=o.run??0;const sh=run>0?Math.sin(t*40)*0.8*run:0;
 g.save();g.translate(sh,0);
 g.fillStyle='#d5dce7';rr(x,y,220,330,10);g.fill();g.fillStyle='#c4ccd9';rr(x+8,y+70,204,250,8);g.fill();
 g.fillStyle='#e9eef5';rr(x+14,y+76,10,236,5);g.fill(); // brillo
 g.fillStyle='#9aa4b5';rr(x+70,y+84,80,12,6);g.fill(); // tirador
 g.fillStyle='#1b2232';rr(x+6,y+6,208,54,9);g.fill();
 const btn=[];for(let i=0;i<3;i++){const bx=x+26+i*24,by=y+33;btn.push([bx,by]);const on=o.sel===i;
  g.fillStyle=on?(i===0?C.green:i===1?C.blue:C.amber):'#3a4560';g.beginPath();g.arc(bx,by,8-(on&&o.press?2*o.press:0),0,7);g.fill();}
 g.fillStyle='#0c1220';rr(x+98,y+14,108,38,6);g.fill();
 g.fillStyle=col;g.font=`900 ${prog.length>5?17:22}px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(prog,x+152,y+28);
 g.fillStyle='#2a3550';rr(x+108,y+42,88,5,2.5);g.fill();if((o.p||0)>0){g.fillStyle=col;rr(x+108,y+42,88*cl(o.p),5,2.5);g.fill();}
 if(run>0){g.fillStyle=`rgba(80,230,120,${0.5+0.5*Math.sin(t*4)})`;g.beginPath();g.arc(x+202,y+18,4,0,7);g.fill();}
 g.restore();return {btn,disp:[x+152,y+28]};}
// corte interior del lavavajillas (para explicar el mecanismo). (x = centro, y = arriba, w×h)
// o: heat 0–1 (resistencia al rojo), wcol (color del agua: frío → caliente), jets 0–1, prog, load (platos), steam 0–1
function dwCut(x,y,w,h,t,o={}){const L=x-w/2,heat=o.heat??0,jets=o.jets??1;
 g.fillStyle='#d5dce7';rr(L-18,y-18,w+36,h+36,22);g.fill();
 const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'#2b3446');gr.addColorStop(1,'#1a2030');g.fillStyle=gr;rr(L,y,w,h,14);g.fill();
 g.save();g.beginPath();g.roundRect(L,y,w,h,14);g.clip();
 // vaho / calor del interior
 if(heat>0){const hg=g.createRadialGradient(x,y+h,10,x,y+h,h*0.9);hg.addColorStop(0,`rgba(255,110,60,${0.28*heat})`);hg.addColorStop(1,'rgba(255,110,60,0)');g.fillStyle=hg;g.fillRect(L,y,w,h);}
 // cestas
 const r1=y+h*0.36,r2=y+h*0.7;g.strokeStyle='#8592a6';g.lineWidth=5;[r1,r2].forEach(ry=>{g.beginPath();g.moveTo(L+20,ry);g.lineTo(L+w-20,ry);g.stroke();for(let i=0;i<=10;i++){g.beginPath();g.moveTo(L+20+i*(w-40)/10,ry);g.lineTo(L+20+i*(w-40)/10,ry-14);g.stroke();}});
 // vasos arriba, platos abajo
 for(let i=0;i<5;i++){g.fillStyle='rgba(225,238,255,0.8)';rr(L+40+i*(w-80)/5,r1-70,(w-80)/5-18,62,[6,6,14,14]);g.fill();}
 for(let i=0;i<8;i++){g.fillStyle='#f0f3f8';rr(L+36+i*(w-72)/8,r2-110,16,106,8);g.fill();g.fillStyle='#d5dbe5';rr(L+40+i*(w-72)/8,r2-96,8,78,4);g.fill();}
 // agua del fondo
 const wc=o.wcol||'#7fb8ff';g.fillStyle=wc;g.globalAlpha=0.55;g.beginPath();g.moveTo(L,y+h-30);for(let i=0;i<=20;i++)g.lineTo(L+i*w/20,y+h-30+Math.sin(i*0.9+t*5)*4);g.lineTo(L+w,y+h);g.lineTo(L,y+h);g.closePath();g.fill();g.globalAlpha=1;
 // resistencia
 const hc=mixc('#5c667a','#ff5a2a',heat);if(heat>0.2){g.shadowColor='#ff5a2a';g.shadowBlur=30*heat;}g.strokeStyle=hc;g.lineWidth=12;g.lineCap='round';g.beginPath();g.moveTo(L+50,y+h-14);g.lineTo(L+w-50,y+h-14);g.stroke();g.shadowBlur=0;
 // brazo aspersor y chorros
 const ay=r2+30,ang=t*3;{const aw=Math.max(30,w*0.38*Math.abs(Math.cos(ang)));g.fillStyle='#9aa4b5';rr(x-aw,ay-9,2*aw,18,9);g.fill();}g.fillStyle='#8592a6';g.beginPath();g.arc(x,ay,14,0,7);g.fill();
 if(jets>0){g.strokeStyle=wc;g.lineWidth=4;g.globalAlpha=0.7*jets;for(let i=0;i<9;i++){const jx=x+(i-4)*w*0.08+Math.cos(ang+i)*10;const ph=(t*2.5+rnd(i))%1;g.setLineDash([14,12]);g.lineDashOffset=-t*120;g.beginPath();g.moveTo(jx,ay-6);g.lineTo(jx+(i-4)*6,ay-6-(h*0.55)*(0.7+0.3*ph));g.stroke();}g.setLineDash([]);g.globalAlpha=1;}
 g.restore();
 if(o.steam>0)steam(x,y-10,t,o.steam);
 // panel superior
 g.fillStyle='#1b2232';rr(L-10,y-70,w+20,52,10);g.fill();const prog=o.prog||'ECO',col=PROG_COL[prog]||C.green;txt(prog,x,y-44,30,col,900);
 return {heater:[x,y+h-14],L,R:L+w};}
// lavadora de carga frontal bajo la encimera. (x,y) = esquina sup. izq. del hueco (ancho 220, alto 330)
// o: prog, spin (vueltas/s del tambor), p (progreso), water 0–1
function washer(x,y,t,o={}){const prog=o.prog||'ECO',col=PROG_COL[prog]||C.green,sp=o.spin??0.5;const sh=Math.sin(t*36)*0.8*Math.min(1,sp);
 g.save();g.translate(sh,0);g.fillStyle='#e6ebf2';rr(x,y,220,330,12);g.fill();
 g.fillStyle='#1b2232';rr(x+8,y+8,204,46,9);g.fill();g.fillStyle='#0c1220';rr(x+20,y+15,100,32,6);g.fill();
 g.fillStyle=col;g.font=`900 20px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(prog,x+70,y+27);g.fillStyle='#2a3550';rr(x+28,y+40,84,4,2);g.fill();if((o.p||0)>0){g.fillStyle=col;rr(x+28,y+40,84*cl(o.p),4,2);g.fill();}
 g.fillStyle='#c9d3e0';g.beginPath();g.arc(x+175,y+31,15,0,7);g.fill();g.strokeStyle='#5c667a';g.lineWidth=4;g.beginPath();g.moveTo(x+175,y+31);g.lineTo(x+175+Math.cos(-1.2)*11,y+31+Math.sin(-1.2)*11);g.stroke();
 const cx=x+110,cy=y+195,R=92;g.fillStyle='#b9c2d0';g.beginPath();g.arc(cx,cy,R,0,7);g.fill();g.fillStyle='#24304a';g.beginPath();g.arc(cx,cy,R-18,0,7);g.fill();
 g.save();g.beginPath();g.arc(cx,cy,R-18,0,7);g.clip();
 const wl=o.water??0.4;g.fillStyle='rgba(120,180,255,0.45)';g.beginPath();g.moveTo(cx-R,cy+R);for(let i=0;i<=12;i++)g.lineTo(cx-R+i*R/6,cy+(R-18)*(1-2*wl)+Math.sin(i+t*6)*5);g.lineTo(cx+R,cy+R);g.closePath();g.fill();
 const a=t*sp*Math.PI*2;['#e5484d','#f2a33a','#8b7cf6','#3ecf6e'].forEach((c,i)=>{const aa=a+i*1.6;const rr2=34+rnd(i)*14;g.fillStyle=c;g.beginPath();g.ellipse(cx+Math.cos(aa)*rr2,cy+Math.sin(aa)*rr2,26,16,aa,0,7);g.fill();});
 g.fillStyle='rgba(255,255,255,0.12)';g.beginPath();g.ellipse(cx-26,cy-30,26,14,-0.6,0,7);g.fill();g.restore();
 g.strokeStyle='#e9eef5';g.lineWidth=6;g.beginPath();g.arc(cx,cy,R-4,0,7);g.stroke();
 g.fillStyle='#c4ccd9';rr(x+16,y+300,188,18,6);g.fill();g.restore();return {porthole:[cx,cy]};}
// hucha de cristal con monedas (base en y). fill 0–1
function coinJar(x,y,s,fill,t){g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(210,230,255,0.16)';rr(-70,-170,140,170,26);g.fill();
 const lv=150*cl(fill);if(lv>0){g.save();g.beginPath();g.roundRect(-64,-164,128,160,22);g.clip();for(let i=0;i<Math.ceil(lv/12);i++){const yy=-14-i*12;for(let k=0;k<4;k++){g.fillStyle=(i+k)%2?'#f2c14a':'#e0a92e';g.beginPath();g.ellipse(-44+k*30+(i%2)*10,yy,18,7,0,0,7);g.fill();}}g.restore();}
 g.strokeStyle='rgba(230,240,255,0.7)';g.lineWidth=5;rr(-70,-170,140,170,26);g.stroke();
 g.fillStyle='#c9b28a';rr(-56,-196,112,30,8);g.fill();g.fillStyle='#4a3424';rr(-26,-190,52,7,3);g.fill(); // tapa con ranura
 g.fillStyle='rgba(255,255,255,0.3)';rr(-56,-150,12,110,6);g.fill();g.restore();}
// termómetro sencillo sin cifras (base del bulbo en y). lvl 0–1, col
function miniThermo(x,y,h,lvl,col){g.fillStyle='#f4f6fb';rr(x-26,y-h-20,52,h+20,26);g.fill();g.beginPath();g.arc(x,y+30,46,0,7);g.fill();
 g.fillStyle='#d9dfe8';rr(x-13,y-h-8,26,h+18,13);g.fill();g.fillStyle=col;g.beginPath();g.arc(x,y+30,34,0,7);g.fill();const yy=y-(h-10)*cl(lvl);rr(x-13,yy,26,y+20-yy,13);g.fill();
 g.fillStyle='rgba(255,255,255,0.35)';rr(x-6,y-h,6,h-10,3);g.fill();}
// reloj de arco: el tramo coloreado crece con p (0–1) — "más tiempo" sin cifras
function arcClock(x,y,r,p,col,t){g.fillStyle='#f4f1ea';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#c9b28a';g.lineWidth=r*0.1;g.stroke();
 if(p>0){g.fillStyle=col;g.globalAlpha=0.55;g.beginPath();g.moveTo(x,y);g.arc(x,y,r*0.86,-Math.PI/2,-Math.PI/2+Math.PI*2*cl(p));g.closePath();g.fill();g.globalAlpha=1;}
 const a=-Math.PI/2+Math.PI*2*cl(p);g.strokeStyle='#1b1e26';g.lineCap='round';g.lineWidth=r*0.07;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*r*0.75,y+Math.sin(a)*r*0.75);g.stroke();g.fillStyle='#e5484d';g.beginPath();g.arc(x,y,r*0.08,0,7);g.fill();}
// barra de duración horizontal (sin cifras): label a la izquierda, se llena de 0 a w*p
function timeBar(x,y,w,p,col,label){g.fillStyle='rgba(20,29,48,0.9)';rr(x,y-26,w,52,26);g.fill();if(p>0){g.fillStyle=col;rr(x+6,y-20,Math.max(40,(w-12)*cl(p)),40,20);g.fill();}
 if(label)txt(label,x,y-58,32,'#fff',900,'left');}
// sartén/olla con restos pegados (en la mano: x,y = asa)
function dirtyPot(x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);g.fillStyle='#1e2128';rr(-8,-10,90,20,10);g.fill();
 g.fillStyle='#8592a6';g.beginPath();g.ellipse(170,0,96,30,0,0,7);g.fill();g.fillStyle='#3a4256';g.beginPath();g.ellipse(170,-4,82,22,0,0,7);g.fill();
 g.fillStyle='#7a4b2a';[[140,-6,24,9],[190,0,30,10],[168,-12,16,6],[210,-10,12,5]].forEach(([a,b,c,d])=>{g.beginPath();g.ellipse(a,b,c,d,0.3,0,7);g.fill();});g.restore();}
// burbuja de pensamiento: (x,y) centro; p 0–1; draw(x,y) dibuja el contenido
function thinkBubble(x,y,r,p,from,draw){if(p<=0)return;g.save();g.globalAlpha*=cl(p*3);const sc=eob(p);
 if(from){[[0.25,10],[0.55,16]].forEach(([k,rad])=>{g.fillStyle='#fff';g.beginPath();g.arc(lerp(from[0],x,k),lerp(from[1],y,k),rad,0,7);g.fill();});}
 g.translate(x,y);g.scale(sc,sc);g.fillStyle='#fff';[[0,0,r],[-r*0.7,r*0.15,r*0.7],[r*0.7,r*0.15,r*0.7],[-r*0.35,-r*0.45,r*0.65],[r*0.4,-r*0.4,r*0.65]].forEach(([a,b,c])=>{g.beginPath();g.arc(a,b,c,0,7);g.fill();});
 if(draw)draw(0,0);g.restore();}
// vuelve a pintar un brazo de `person` por delante de la encimera (para pulsar el panel del lavavajillas o meter algo bajo la encimera). sd: 1 derecho, −1 izquierdo
function armFront(o,sd,t){const x=o.x,y=o.y,s=o.s||1,shirt=o.shirt||IL.shirt;const bob=Math.sin(t*2.2)*3*s;const sx=x+sd*98*s,sy=y-205*s+bob;const T=sd>0?o.rh:o.lh;if(!T)return;
 const j=ik(sx,sy,T[0],T[1],120*s,112*s,o.bend?o.bend[sd<0?0:1]:1);g.lineCap='round';
 g.strokeStyle=shirt;g.lineWidth=46*s;g.beginPath();g.moveTo(sx,sy);g.lineTo(j[0],j[1]);g.stroke();g.strokeStyle=IL.skin;g.lineWidth=34*s;g.beginPath();g.moveTo(j[0],j[1]);g.lineTo(j[2],j[3]);g.stroke();
 g.fillStyle=IL.skin;g.beginPath();g.arc(j[2],j[3],23*s,0,7);g.fill();}
