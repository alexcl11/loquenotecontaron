// ===== Kit de ilustración (19): temperatura de lavado — display de grados, corte del tambor con resistencia, camiseta (sucia), cesto de ropa =====
// grados en el display de `washer` (ill9.js): azul/verde frío, ámbar 40, rojo 60–90
Object.assign(PROG_COL,{'30°':'#3ecf6e','40°':'#f2a33a','60°':'#e5484d','90°':'#e5484d','¿?':'#8e98ad'});
// lavadora con temperatura en el display. Devuelve {porthole, dial:[x,y] (mando), disp}
function washerT(x,y,t,o={}){const r=washer(x,y,t,Object.assign({prog:o.temp||'40°'},o));
 if(o.turn){g.save();g.strokeStyle='#e5484d';g.lineWidth=4;g.beginPath();g.arc(x+175,y+31,20,-1.2,-1.2+o.turn*2);g.stroke();g.restore();}
 return Object.assign(r,{dial:[x+175,y+31],disp:[x+70,y+27]});}
// corte del tambor de la lavadora (centro x,y; radio R). o: heat 0–1 (resistencia al rojo y agua que se calienta), spin, water 0–1
// devuelve {heater:[x,y]}
function washerCut(x,y,R,t,o={}){const heat=o.heat??0,sp=o.spin??0.4,wl=o.water??0.45;
 g.fillStyle='#e6ebf2';rr(x-R-40,y-R-110,2*R+80,2*R+190,30);g.fill();
 g.fillStyle='#1b2232';rr(x-R-24,y-R-94,2*R+48,64,14);g.fill();
 g.fillStyle='#b9c2d0';g.beginPath();g.arc(x,y,R,0,7);g.fill();
 const gr=g.createRadialGradient(x,y,10,x,y,R);gr.addColorStop(0,'#2b3446');gr.addColorStop(1,'#1a2030');g.fillStyle=gr;g.beginPath();g.arc(x,y,R-16,0,7);g.fill();
 g.save();g.beginPath();g.arc(x,y,R-16,0,7);g.clip();
 if(heat>0){const hg=g.createRadialGradient(x,y+R,10,x,y+R,R*1.4);hg.addColorStop(0,`rgba(255,110,60,${0.35*heat})`);hg.addColorStop(1,'rgba(255,110,60,0)');g.fillStyle=hg;g.fillRect(x-R,y-R,2*R,2*R);}
 // ropa que gira
 const a=t*sp*Math.PI*2;['#e5484d','#f2a33a','#8b7cf6','#3ecf6e','#4f8bff'].forEach((c,i)=>{const aa=a+i*1.25;const r2=R*(0.3+rnd(i)*0.25);g.fillStyle=c;g.beginPath();g.ellipse(x+Math.cos(aa)*r2,y+Math.sin(aa)*r2,R*0.26,R*0.15,aa,0,7);g.fill();});
 // agua: azul → anaranjada al calentarse
 const wc=mixc('#7fb8ff','#ff8a5c',heat);g.fillStyle=wc;g.globalAlpha=0.5;g.beginPath();const wy=y+(R-16)*(1-2*wl);g.moveTo(x-R,y+R);for(let i=0;i<=16;i++)g.lineTo(x-R+i*R/8,wy+Math.sin(i*0.9+t*5)*6);g.lineTo(x+R,y+R);g.closePath();g.fill();g.globalAlpha=1;
 // resistencia en el fondo
 const hc=mixc('#5c667a','#ff5a2a',heat);const hy=y+R-42;if(heat>0.2){g.shadowColor='#ff5a2a';g.shadowBlur=36*heat;}g.strokeStyle=hc;g.lineWidth=14;g.lineCap='round';g.beginPath();g.moveTo(x-R*0.55,hy);for(let i=0;i<=6;i++)g.lineTo(x-R*0.55+i*R*0.183,hy+(i%2?-14:0));g.stroke();g.shadowBlur=0;
 // burbujas cuando calienta
 if(heat>0.3){for(let i=0;i<9;i++){const ph=(t*0.8+rnd(i+3))%1;g.fillStyle=`rgba(255,255,255,${0.45*heat*(1-ph)})`;g.beginPath();g.arc(x-R*0.5+rnd(i)*R,hy-ph*R*0.8,5+4*rnd(i+9),0,7);g.fill();}}
 g.restore();g.strokeStyle='#e9eef5';g.lineWidth=8;g.beginPath();g.arc(x,y,R-4,0,7);g.stroke();
 return {heater:[x,y+R-42]};}
// camiseta (centro x,y; escala s, rot). col = color; dirt 0–1 = manchas de barro que aparecen
function tshirt(x,y,s,rot,col,dirt=0){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 g.fillStyle=col;g.beginPath();g.moveTo(-40,-95);g.quadraticCurveTo(0,-70,40,-95);g.lineTo(95,-70);g.lineTo(125,-15);g.lineTo(80,5);g.lineTo(70,-25);g.lineTo(72,95);g.quadraticCurveTo(0,108,-72,95);g.lineTo(-70,-25);g.lineTo(-80,5);g.lineTo(-125,-15);g.lineTo(-95,-70);g.closePath();g.fill();
 g.fillStyle='rgba(0,0,0,0.12)';g.beginPath();g.moveTo(-40,-95);g.quadraticCurveTo(0,-60,40,-95);g.quadraticCurveTo(0,-78,-40,-95);g.fill();
 if(dirt>0){g.globalAlpha=cl(dirt);g.fillStyle='#6b4a2e';[[-30,10,34,22],[28,50,26,16],[40,-30,18,12],[-45,60,16,11],[5,75,20,9]].forEach(([a,b,c,d],i)=>{const k=cl(dirt*1.6-i*0.15);if(k<=0)return;g.beginPath();g.ellipse(a,b,c*k,d*k,0.4*i,0,7);g.fill();});g.globalAlpha=1;}
 g.restore();}
// cesto de ropa (base en y). fill 0–1 = montón de ropa que asoma
function laundryBasket(x,y,s,fill=1){g.save();g.translate(x,y);g.scale(s,s);
 if(fill>0){const cols=['#4f8bff','#e5484d','#f2a33a','#3ecf6e','#8b7cf6','#e6ebf2'];for(let i=0;i<6;i++){g.fillStyle=cols[i];g.beginPath();g.ellipse(-80+i*32,-150-40*fill+Math.sin(i*2)*14,48,30*fill+8,0.5*(i%2?1:-1),0,7);g.fill();}}
 g.fillStyle='#c9b28a';g.beginPath();g.moveTo(-130,-160);g.lineTo(130,-160);g.lineTo(110,0);g.lineTo(-110,0);g.closePath();g.fill();
 g.strokeStyle='#a8916a';g.lineWidth=6;for(let i=1;i<5;i++){g.beginPath();g.moveTo(-130+i*4,-160+i*32);g.lineTo(130-i*4,-160+i*32);g.stroke();}
 g.fillStyle='#b39d74';rr(-140,-172,280,22,10);g.fill();g.restore();}
