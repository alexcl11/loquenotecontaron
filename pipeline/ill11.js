// ===== Kit de ilustración (11): moho — pan, mermelada, yogur, quesos, fruta, hortalizas, embutido, cuchillo, cuchara, hifas, lupa =====
const MH={mold:'#7fbf6a',white:'#e4ecdc',soft:'#9fd08a',hy:'#8fe07a'};
// mancha de moho (pelusa de bolitas). p 0–1 crece; col = color base
function moldSpot(x,y,r,p,t=0,seed=0,col=MH.mold){if(p<=0)return;const R=r*ease(cl(p));if(R<0.5)return;g.save();
 for(let i=0;i<10;i++){const a=rnd(i+seed)*7,d=rnd(i+seed+3)*R*0.6;const q=R*(0.32+rnd(i+seed+6)*0.36);g.fillStyle=i%3?col:mixc(col,'#ffffff',0.4);g.beginPath();g.arc(x+Math.cos(a)*d,y+Math.sin(a)*d*0.8,q,0,7);g.fill();}
 g.fillStyle='rgba(255,255,255,0.55)';for(let i=0;i<10;i++){const a=rnd(i+seed+11)*7,d=rnd(i+seed+13)*R*0.8;g.beginPath();g.arc(x+Math.cos(a)*d,y+Math.sin(a)*d*0.8,Math.max(1,R*0.07),0,7);g.fill();}g.restore();}
// hifas ("raíces" del moho): hilos que bajan desde (x,y) hasta la profundidad d, abriéndose en un ancho ~w. p 0–1 = crecimiento
function hyphae(x,y,w,d,p,seed=0,col=MH.hy,lw=3){if(p<=0)return;g.save();g.strokeStyle=col;g.lineCap='round';g.lineJoin='round';g.lineWidth=lw;
 const N=11,S=16,k=cl(p)*S;
 for(let i=0;i<N;i++){let px=x+(rnd(i+seed)-0.5)*w*0.35,py=y,a=lerp(-0.85,0.85,i/(N-1))+(rnd(i+seed+9)-0.5)*0.4;const L=d*(0.55+0.45*rnd(i+seed+4))/S;const sp=w/Math.max(1,d)*0.9;
  g.beginPath();g.moveTo(px,py);
  for(let j=0;j<k;j++){a+=(rnd(i*37+j+seed)-0.5)*0.6;a=cl(a,-1.3,1.3);const f=Math.min(1,k-j);const nx=px+Math.sin(a)*L*f*sp,ny=py+Math.cos(a)*L*f;g.lineTo(nx,ny);
   if(j%5===3&&f===1){const ba=a+(rnd(i+j*3+seed)>0.5?1:-1);g.lineTo(nx+Math.sin(ba)*L*1.6*sp,ny+Math.cos(ba)*L*1.6);g.moveTo(nx,ny);}px=nx;py=ny;}
  g.stroke();}g.restore();}
// rebanada de pan de molde (centro x,y). o: mold 0–1, mx,my,mr (mancha, coords locales), clip+side ('L' conserva x<clip, 'R' conserva x>=clip), hyp 0–1 (hilos ocultos en la miga, con hx,hyY)
function breadPath(){g.beginPath();g.moveTo(-70,72);g.lineTo(-74,-18);g.quadraticCurveTo(-98,-84,-36,-86);g.quadraticCurveTo(0,-100,36,-86);g.quadraticCurveTo(98,-84,74,-18);g.lineTo(70,72);g.quadraticCurveTo(0,80,-70,72);g.closePath();}
function breadSlice(x,y,s,rot=0,o={}){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 if(o.clip!=null){g.beginPath();if(o.side==='R')g.rect(o.clip,-200,400,400);else g.rect(-400,-200,400+o.clip,400);g.clip();}
 g.fillStyle='#b8742e';breadPath();g.fill();g.save();g.translate(0,4);g.scale(0.84,0.84);g.fillStyle='#f1d9a6';breadPath();g.fill();g.restore();
 g.fillStyle='rgba(190,140,80,0.35)';for(let i=0;i<16;i++){g.beginPath();g.ellipse(-50+rnd(i+3)*100,-55+rnd(i+8)*110,3+rnd(i)*4,2+rnd(i+1)*3,0,0,7);g.fill();}
 if(o.mold)moldSpot(o.mx??44,o.my??-44,o.mr??22,o.mold,0,o.seed||0);
 if(o.hyp>0){g.save();g.translate(0,4);g.scale(0.84,0.84);breadPath();g.restore();g.clip();g.shadowColor='rgba(140,255,120,0.9)';g.shadowBlur=10;hyphae(o.hx??20,o.hyY??-50,140,130,o.hyp,3,MH.hy,3.5);}
 g.restore();}
// tarro de mermelada genérico (base en y). o: lid (true = tapa puesta), mold 0–1 (mancha en la superficie), mcol; devuelve la superficie [x,y] en mundo
function jamJar(x,y,s,o={}){g.save();g.translate(x,y);g.scale(s,s);
 g.fillStyle='rgba(225,235,250,0.35)';rr(-58,-150,116,150,20);g.fill();
 g.fillStyle='#b8323f';rr(-50,-120,100,112,14);g.fill();g.fillStyle='#d24a55';g.beginPath();g.ellipse(0,-120,50,10,0,0,7);g.fill();
 g.fillStyle='#f4efe6';rr(-52,-88,104,46,6);g.fill();emoji('🍓',0,-65,30);
 g.fillStyle='rgba(255,255,255,0.35)';rr(-48,-140,12,120,6);g.fill();
 g.fillStyle='rgba(225,235,250,0.55)';rr(-46,-162,92,16,6);g.fill();
 if(o.mold)moldSpot(10,-120,o.mr||16,o.mold,0,5,o.mcol||MH.white);
 if(o.lid)jarLid(0,-170,1,0,true);
 g.restore();return [x+10*s,y-120*s];}
// tapa de cuadros del tarro (centro x,y)
function jarLid(x,y,s,rot=0,local=false){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.fillStyle='#e5484d';rr(-54,-14,108,28,8);g.fill();
 g.fillStyle='rgba(255,255,255,0.55)';for(let i=0;i<5;i++){g.fillRect(-46+i*20,-14,9,28);}g.fillStyle='rgba(0,0,0,0.12)';g.fillRect(-54,8,108,6);g.restore();}
// yogur (base en y), abierto; mold 0–1
function yogurtCup(x,y,s,mold=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#f6f3ee';g.beginPath();g.moveTo(-46,-110);g.lineTo(46,-110);g.lineTo(36,0);g.lineTo(-36,0);g.closePath();g.fill();
 g.fillStyle='#3d7bff';g.beginPath();g.moveTo(-43,-80);g.lineTo(43,-80);g.lineTo(40,-50);g.lineTo(-40,-50);g.closePath();g.fill();
 g.fillStyle='#ffffff';g.beginPath();g.ellipse(0,-110,48,10,0,0,7);g.fill();g.fillStyle='#e9e4da';g.beginPath();g.ellipse(0,-108,40,6,0,0,7);g.fill();
 if(mold)moldSpot(8,-110,14,mold,0,7,MH.soft);g.restore();}
// queso blando/fresco (base en y); mold 0–1
function softCheese(x,y,s,mold=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#fbf8f1';rr(-62,-56,124,56,16);g.fill();g.fillStyle='#ffffff';g.beginPath();g.ellipse(0,-56,62,14,0,0,7);g.fill();
 g.strokeStyle='rgba(180,170,150,0.35)';g.lineWidth=2;for(let i=0;i<6;i++){g.beginPath();g.moveTo(-50+i*20,-44);g.lineTo(-46+i*20,-6);g.stroke();}
 if(mold)moldSpot(14,-58,15,mold,0,8,MH.soft);g.restore();}
// melocotón (base en y); mold 0–1
function peach(x,y,s,mold=0){g.save();g.translate(x,y);g.scale(s,s);const gr=g.createRadialGradient(-14,-54,6,0,-42,48);gr.addColorStop(0,'#ffc38a');gr.addColorStop(1,'#f07a4a');g.fillStyle=gr;g.beginPath();g.arc(0,-42,42,0,7);g.fill();
 g.strokeStyle='rgba(180,70,40,0.5)';g.lineWidth=3;g.beginPath();g.moveTo(0,-82);g.quadraticCurveTo(-14,-42,0,-2);g.stroke();g.fillStyle='#5aa14a';g.beginPath();g.ellipse(14,-88,16,7,-0.5,0,7);g.fill();
 if(mold)moldSpot(18,-34,14,mold,0,9,MH.soft);g.restore();}
// zanahoria (centro x,y), punta a la derecha; mold 0–1
function carrot(x,y,s,rot=0,mold=0){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.fillStyle='#4fae4a';[-0.5,0,0.5].forEach(a=>{g.save();g.translate(-80,0);g.rotate(Math.PI+a);g.beginPath();g.ellipse(26,0,28,7,0,0,7);g.fill();g.restore();});
 g.fillStyle='#f28a2e';g.beginPath();g.moveTo(-82,-18);g.quadraticCurveTo(-88,0,-82,18);g.lineTo(74,4);g.quadraticCurveTo(84,0,74,-4);g.closePath();g.fill();
 g.strokeStyle='rgba(170,80,20,0.45)';g.lineWidth=3;[-50,-10,30].forEach(px=>{g.beginPath();g.moveTo(px,-12+px*0.05);g.lineTo(px+10,-12+px*0.05);g.stroke();});
 if(mold)moldSpot(-20,-6,10,mold,0,10,MH.white);g.restore();}
// pimiento rojo (base en y); mold 0–1
function bellPepper(x,y,s,mold=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#d8343a';g.beginPath();g.ellipse(-24,-44,32,44,0.1,0,7);g.ellipse(24,-44,32,44,-0.1,0,7);g.ellipse(0,-40,30,42,0,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,0.3)';g.beginPath();g.ellipse(-30,-58,7,18,0.2,0,7);g.fill();g.fillStyle='#3f8f3a';rr(-8,-104,16,22,6);g.fill();g.fillStyle='#5aa14a';g.beginPath();g.ellipse(0,-84,24,8,0,0,7);g.fill();
 if(mold)moldSpot(22,-30,10,mold,0,11,MH.white);g.restore();}
// cuña de queso curado (base en y); mold 0–1
function cheeseWedge(x,y,s,mold=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#f4c95d';g.beginPath();g.moveTo(-95,0);g.lineTo(95,0);g.lineTo(95,-84);g.lineTo(-95,-30);g.closePath();g.fill();
 g.strokeStyle='#a8742e';g.lineWidth=10;g.lineJoin='round';g.beginPath();g.moveTo(-95,-30);g.lineTo(95,-84);g.lineTo(95,0);g.stroke();
 g.fillStyle='#e0b347';[[-40,-14,6],[10,-30,8],[50,-20,5],[66,-56,6]].forEach(([a,b,r])=>{g.beginPath();g.arc(a,b,r,0,7);g.fill();});
 if(mold)moldSpot(40,-62,11,mold,0,12,MH.mold);g.restore();}
// taco de queso curado en 3D (base en y). o: mold 0–1, part 'all'|'main'|'piece' (pieza = esquina x>=cx, y<=cy), cx, cy. Mancha en (60,-95) r 22
function cheeseBlock(x,y,s,o={}){g.save();g.translate(x,y);g.scale(s,s);const cx=o.cx??2,cy=o.cy??-37;
 if(o.part==='main'){g.beginPath();g.rect(-300,-300,600,600);g.rect(cx,-300,300,300+cy);g.clip('evenodd');}
 else if(o.part==='piece'){g.beginPath();g.rect(cx,-300,300,300+cy);g.clip();}
 g.fillStyle='#d9ab3e';g.beginPath();g.moveTo(110,-130);g.lineTo(140,-160);g.lineTo(140,-30);g.lineTo(110,0);g.closePath();g.fill();
 g.fillStyle='#f8d978';g.beginPath();g.moveTo(-110,-130);g.lineTo(-80,-160);g.lineTo(140,-160);g.lineTo(110,-130);g.closePath();g.fill();
 g.fillStyle='#f4c95d';g.fillRect(-110,-130,220,130);
 g.fillStyle='#a8742e';g.fillRect(-110,-136,220,8);g.fillRect(-116,-130,8,130);
 g.fillStyle='#e0b347';[[-70,-40,8],[-30,-90,6],[-60,-100,5],[30,-20,7],[80,-30,5],[-10,-55,5]].forEach(([a,b,r])=>{g.beginPath();g.arc(a,b,r,0,7);g.fill();});
 if(o.mold)moldSpot(60,-95,22,o.mold,0,14,MH.mold);
 if(o.hyp>0)hyphae(60,-90,40,36,o.hyp,4,MH.hy,2.5);
 g.restore();}
// embutido curado (centro x,y). o: bloom 0–1 (moho blanco de la superficie), bx (x local desde la que queda moho: raspado de izq. a der.)
function curedSausage(x,y,s,rot=0,o={}){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);
 g.strokeStyle='#e9dcc0';g.lineWidth=4;g.beginPath();g.moveTo(-150,0);g.lineTo(-172,-14);g.moveTo(150,0);g.lineTo(172,14);g.stroke();
 g.fillStyle='#7a2e2a';rr(-152,-30,304,60,30);g.fill();g.fillStyle='#e9c7b5';for(let i=0;i<22;i++){g.beginPath();g.arc(-130+rnd(i+2)*260,-18+rnd(i+5)*36,2.5+rnd(i)*2.5,0,7);g.fill();}
 g.fillStyle='rgba(255,255,255,0.18)';rr(-140,-24,280,8,4);g.fill();
 const b=o.bloom??1,bx=o.bx??-160;if(b>0&&bx<150){g.save();g.beginPath();g.rect(bx,-40,320,80);g.clip();g.globalAlpha=0.88*b;g.fillStyle='#ecefe6';rr(-152,-30,304,60,30);g.fill();
  g.fillStyle='rgba(200,210,195,0.9)';for(let i=0;i<30;i++){g.beginPath();g.arc(-140+rnd(i+30)*280,-24+rnd(i+33)*48,2+rnd(i+36)*3,0,7);g.fill();}g.restore();}
 g.restore();}
// cuchillo: (x,y) = mango en la mano; la hoja apunta en la dirección rot. Devuelve la punta en mundo
function knife(x,y,rot=0,s=1){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.fillStyle='#4a3424';rr(-44,-11,84,22,9);g.fill();g.fillStyle='#c9b28a';g.beginPath();g.arc(-26,0,3,0,7);g.arc(14,0,3,0,7);g.fill();
 g.fillStyle='#d9e0ea';g.beginPath();g.moveTo(38,-13);g.lineTo(182,-13);g.quadraticCurveTo(198,-6,190,4);g.lineTo(38,13);g.closePath();g.fill();g.fillStyle='rgba(255,255,255,0.7)';g.fillRect(44,-9,120,3);g.restore();
 return [x+Math.cos(rot)*190*s,y+Math.sin(rot)*190*s];}
// cuchara: (x,y) = mano; la cuchara cuelga hacia rot+90°. load: dibuja algo en el cazo (fn(x,y)). Devuelve el cazo en mundo
function spoon(x,y,rot=0,s=1,load){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.strokeStyle='#c9d3e0';g.lineWidth=10;g.lineCap='round';g.beginPath();g.moveTo(0,-30);g.lineTo(0,96);g.stroke();
 g.fillStyle='#c9d3e0';g.beginPath();g.ellipse(0,118,20,26,0,0,7);g.fill();g.fillStyle='#e9eef5';g.beginPath();g.ellipse(-5,112,6,12,0,0,7);g.fill();if(load)load(0,108);g.restore();
 return [x-Math.sin(rot)*118*s,y+Math.cos(rot)*118*s];}
// corte de un alimento visto con lupa: material bajo la superficie yS. kind 'pan' | 'yogur' | 'queso'
function foodSection(x,y,R,kind,yS){g.fillStyle='#16213a';g.fillRect(x-R,y-R,2*R,2*R);
 const K={pan:['#f1d9a6','#b8742e'],yogur:['#f6f3ee','#dcd6cb'],queso:['#f4c95d','#a8742e']}[kind];
 g.fillStyle=K[0];g.fillRect(x-R,yS,2*R,y+R-yS);g.fillStyle=K[1];g.fillRect(x-R,yS,2*R,kind==='pan'?20:kind==='queso'?14:4);
 if(kind==='pan'){g.fillStyle='rgba(190,140,80,0.4)';for(let i=0;i<40;i++){g.beginPath();g.ellipse(x-R+rnd(i+50)*2*R,yS+30+rnd(i+60)*(y+R-yS),5+rnd(i+70)*10,3+rnd(i+80)*7,0,0,7);g.fill();}}
 if(kind==='queso'){g.fillStyle='#e0b347';for(let i=0;i<7;i++){g.beginPath();g.arc(x-R+rnd(i+90)*2*R,yS+50+rnd(i+95)*(y+R-yS-60),8+rnd(i+99)*10,0,7);g.fill();}}}
// lupa: aro + mango; draw(R) pinta el interior (ya recortado al círculo)
function lens(x,y,r,p,draw){if(p<=0)return;const R=r*eob(cl(p));if(R<2)return;g.save();g.beginPath();g.arc(x,y,R,0,7);g.clip();draw(R);g.restore();
 g.strokeStyle='#e9eef5';g.lineWidth=14;g.beginPath();g.arc(x,y,R,0,7);g.stroke();g.strokeStyle='#8592a6';g.lineWidth=24;g.lineCap='round';const hx=x+Math.cos(0.8)*(R+12),hy=y+Math.sin(0.8)*(R+12);g.beginPath();g.moveTo(hx,hy);g.lineTo(hx+90*cl(p),hy+90*cl(p));g.stroke();}
