// ===== Kit de ilustración: escenas narrativas con personaje =====
// Coordenadas de mundo = lienzo (1080x1920). La escena ilustrada ocupa y≈500–1600.
const IL={skin:'#f1c29c',skinS:'#d9a37e',hair:'#3b2a20',shirt:'#3d7bff',apron:'#f4efe6',wall1:'#26365a',wall2:'#1a2742',
 cab:'#2e3f66',cabD:'#24335a',counter:'#e3cfa9',counterE:'#c9b28a',metal:'#c9d3e0',metalD:'#8592a6',raw:'#f3c3b0',rawS:'#e0a28d',cooked:'#c98432',cookedS:'#9c5f1e'};
const E=(t,t0,d)=>cl((t-t0)/d);
function mixc(a,b,k){const pa=parseInt(a.slice(1),16),pb=parseInt(b.slice(1),16);const r=Math.round(lerp(pa>>16,pb>>16,k)),gg=Math.round(lerp((pa>>8)&255,(pb>>8)&255,k)),bb=Math.round(lerp(pa&255,pb&255,k));return `rgb(${r},${gg},${bb})`;}
function rnd(i){const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x);}
// cámara: (cx,cy) del mundo se coloca en (540,1050) con zoom z
function cam(z,cx,cy){g.translate(540,1050);g.scale(z,z);g.translate(-cx,-cy);}
function camLerp(t,t0,d,a,b){const k=ease(E(t,t0,d));cam(lerp(a[0],b[0],k),lerp(a[1],b[1],k),lerp(a[2],b[2],k));}

// ---------- fondo cocina ----------
function kitchen(t,opt={}){
 const gr=g.createLinearGradient(0,400,0,1200);gr.addColorStop(0,IL.wall1);gr.addColorStop(1,IL.wall2);g.fillStyle=gr;g.fillRect(-600,300,2300,1400);
 // luz cálida
 const lg=g.createRadialGradient(470,760,40,470,760,620);lg.addColorStop(0,'rgba(255,200,130,0.16)');lg.addColorStop(1,'rgba(255,200,130,0)');g.fillStyle=lg;g.fillRect(-600,300,2300,1400);
 // ventana
 g.fillStyle='#4a3424';rr(70,600,270,300,10);g.fill();const sk=g.createLinearGradient(0,612,0,888);sk.addColorStop(0,'#0b1430');sk.addColorStop(1,'#1d2d5a');g.fillStyle=sk;rr(84,614,242,272,6);g.fill();
 g.save();g.beginPath();g.rect(84,614,242,272);g.clip();moonI(260,680,30);for(let i=0;i<9;i++){g.fillStyle=`rgba(255,255,255,${0.35+0.35*Math.sin(t*2+i)})`;g.beginPath();g.arc(100+rnd(i)*210,630+rnd(i+9)*200,2.2,0,7);g.fill();}g.restore();
 g.fillStyle='#4a3424';g.fillRect(200,614,10,272);g.fillRect(84,745,242,10);
 // armarios altos
 for(let i=0;i<3;i++){const x=440+i*200;g.fillStyle=IL.cab;rr(x,560,190,250,10);g.fill();g.fillStyle=IL.cabD;rr(x+12,572,166,226,8);g.fill();g.fillStyle='#c9b28a';rr(x+(i%2?24:150),760,14,30,6);g.fill();}
 // azulejos
 g.save();g.globalAlpha=0.07;g.strokeStyle='#fff';g.lineWidth=2;for(let x=0;x<1100;x+=64){g.beginPath();g.moveTo(x,930);g.lineTo(x,1178);g.stroke();}for(let y=930;y<1180;y+=64){g.beginPath();g.moveTo(-50,y);g.lineTo(1130,y);g.stroke();}g.restore();
 // fogón + sartén a la derecha (se dibujan detrás del personaje para profundidad)
 if(opt.stove!==false){g.fillStyle='#151b28';rr(760,1168,250,16,4);g.fill();}
}
function counterFront(){ // encimera y muebles bajos (delante del personaje)
 g.fillStyle=IL.counter;g.fillRect(-600,1178,2300,34);g.fillStyle='#f0e1c2';g.fillRect(-600,1178,2300,6);g.fillStyle=IL.counterE;g.fillRect(-600,1206,2300,6);
 g.fillStyle=IL.cab;g.fillRect(-600,1212,2300,500);for(let i=-3;i<9;i++){const x=i*180+20;g.fillStyle=IL.cabD;rr(x,1232,160,330,10);g.fill();g.fillStyle='#c9b28a';rr(x+70,1250,20,8,4);g.fill();}
}
function sink(){ // fregadero (borde metálico) y grifo
 g.fillStyle=IL.metalD;rr(420,1170,300,14,6);g.fill();g.fillStyle=IL.metal;rr(420,1166,300,8,4);g.fill();
}
function faucet(){g.save();g.strokeStyle=IL.metal;g.lineWidth=20;g.lineCap='round';g.beginPath();g.moveTo(690,1172);g.lineTo(690,990);g.quadraticCurveTo(690,935,640,935);g.quadraticCurveTo(605,935,605,975);g.stroke();
 g.strokeStyle='#e9eef5';g.lineWidth=6;g.beginPath();g.moveTo(684,1160);g.lineTo(684,995);g.stroke();g.fillStyle=IL.metalD;rr(675,1160,32,16,4);g.fill();g.fillStyle=IL.metal;g.beginPath();g.arc(720,1060,0,0,7);g.fill();rr(700,1080,40,12,6);g.fill();g.restore();}
function waterStream(t,x,y0,y1,on=1){if(on<=0)return;g.save();g.globalAlpha=0.75*on;const w=13;g.fillStyle='rgba(150,205,255,0.85)';g.beginPath();for(let y=y0;y<=y1;y+=8){g.lineTo(x-w/2+Math.sin(y*0.08-t*30)*2.2,y);}for(let y=y1;y>=y0;y-=8){g.lineTo(x+w/2+Math.sin(y*0.08-t*30+1)*2.2,y);}g.closePath();g.fill();
 g.fillStyle='rgba(220,240,255,0.9)';for(let i=0;i<7;i++){const ph=(t*3+i/7)%1;const a=-Math.PI/2+(rnd(i)-0.5)*2.6;const r=ph*55;g.globalAlpha=0.8*(1-ph)*on;g.beginPath();g.arc(x+Math.cos(a)*r,y1+Math.sin(a)*r*0.6+ph*ph*40,4,0,7);g.fill();}g.restore();}
function moonI(x,y,r){g.save();g.beginPath();g.arc(x,y,r,0,7);g.clip();g.beginPath();g.rect(x-r-2,y-r-2,2*r+4,2*r+4);g.moveTo(x+r*0.45+r*0.85,y-r*0.3);g.arc(x+r*0.45,y-r*0.3,r*0.85,0,7,true);g.fillStyle='#ffe9a8';g.fill('evenodd');g.restore();}

// ---------- personaje (de cintura para arriba, detrás de la encimera) ----------
function ik(sx,sy,tx,ty,l1,l2,bend){let dx=tx-sx,dy=ty-sy;let d=Math.hypot(dx,dy);const md=l1+l2-1;if(d>md){dx*=md/d;dy*=md/d;d=md;tx=sx+dx;ty=sy+dy;}
 const a=Math.atan2(dy,dx);const c=cl((l1*l1+d*d-l2*l2)/(2*l1*d),-1,1);const b=Math.acos(c)*bend;return [sx+Math.cos(a+b)*l1,sy+Math.sin(a+b)*l1,tx,ty];}
function person(o,t){const x=o.x,y=o.y,s=o.s||1;const shirt=o.shirt||IL.shirt;
 const bob=Math.sin(t*2.2)*3*s;const hy=y-310*s+bob;
 // torso
 g.fillStyle=shirt;g.beginPath();g.moveTo(x-112*s,y-200*s+bob);g.quadraticCurveTo(x-118*s,y-232*s+bob,x-80*s,y-238*s+bob);g.lineTo(x+80*s,y-238*s+bob);g.quadraticCurveTo(x+118*s,y-232*s+bob,x+112*s,y-200*s+bob);g.lineTo(x+92*s,y+40*s);g.lineTo(x-92*s,y+40*s);g.closePath();g.fill();
 // delantal
 if(o.apron!==false){g.fillStyle=IL.apron;g.beginPath();g.moveTo(x-62*s,y-170*s+bob);g.lineTo(x+62*s,y-170*s+bob);g.lineTo(x+78*s,y+40*s);g.lineTo(x-78*s,y+40*s);g.closePath();g.fill();g.strokeStyle=IL.apron;g.lineWidth=7*s;g.beginPath();g.moveTo(x-52*s,y-170*s+bob);g.lineTo(x-24*s,y-236*s+bob);g.moveTo(x+52*s,y-170*s+bob);g.lineTo(x+24*s,y-236*s+bob);g.stroke();
  g.fillStyle='#e5ddcf';rr(x-38*s,y-110*s+bob,76*s,40*s,6*s);g.fill();}
 // cuello y cabeza
 g.fillStyle=IL.skinS;g.fillRect(x-22*s,hy+40*s,44*s,40*s);
 g.fillStyle=IL.skin;g.beginPath();g.arc(x-66*s,hy+4*s,13*s,0,7);g.arc(x+66*s,hy+4*s,13*s,0,7);g.fill();
 g.beginPath();g.ellipse(x,hy,66*s,72*s,0,0,7);g.fill();
 // pelo
 g.fillStyle=o.hair||IL.hair;g.beginPath();g.ellipse(x,hy-26*s,70*s,52*s,0,Math.PI,0);g.quadraticCurveTo(x+72*s,hy+4*s,x+60*s,hy-6*s);g.quadraticCurveTo(x+10*s,hy-30*s,x-30*s,hy-18*s);g.quadraticCurveTo(x-60*s,hy-10*s,x-68*s,hy+10*s);g.closePath();g.fill();
 // cara
 const lk=o.look||[0,0];const bl=(Math.sin(t*1.7+x)>0.985)?0.15:1;
 g.fillStyle='#2a1d17';[-24,24].forEach(dx=>{g.beginPath();g.ellipse(x+dx*s+lk[0]*6*s,hy+4*s+lk[1]*5*s,6.5*s,8.5*s*bl,0,0,7);g.fill();});
 g.strokeStyle='#2a1d17';g.lineWidth=4*s;g.lineCap='round';const br=o.brow||0;[-1,1].forEach(sd=>{g.beginPath();g.moveTo(x+sd*14*s,hy-16*s-br*4*s*(sd<0?1:1));g.lineTo(x+sd*34*s,hy-14*s+br*3*s);g.stroke();});
 g.strokeStyle=IL.skinS;g.lineWidth=4*s;g.beginPath();g.moveTo(x+2*s,hy+12*s);g.quadraticCurveTo(x+8*s,hy+26*s,x-2*s,hy+28*s);g.stroke();
 g.strokeStyle='#8a3b2e';g.lineWidth=5*s;g.beginPath();const m=o.mouth||'smile';if(m==='smile'){g.arc(x,hy+30*s,16*s,0.2,Math.PI-0.2);}else if(m==='o'){g.fillStyle='#5a221a';g.ellipse(x,hy+44*s,9*s,11*s,0,0,7);g.fill();}else if(m==='worry'){g.arc(x,hy+56*s,14*s,Math.PI+0.4,-0.4);}else{g.moveTo(x-12*s,hy+44*s);g.lineTo(x+12*s,hy+44*s);}g.stroke();
 g.fillStyle='rgba(240,120,110,0.25)';g.beginPath();g.arc(x-40*s,hy+24*s,10*s,0,7);g.arc(x+40*s,hy+24*s,10*s,0,7);g.fill();
 // brazos (después de dibujar objetos sostenidos se pinta la mano encima)
 const arms=[[-1,o.lh],[1,o.rh]];o._hands=[];
 arms.forEach(([sd,tg])=>{const sx=x+sd*98*s,sy=y-205*s+bob;const T=tg||[x+sd*120*s,y+20*s];const j=ik(sx,sy,T[0],T[1],120*s,112*s,1);
  g.strokeStyle=shirt;g.lineCap='round';g.lineWidth=46*s;g.beginPath();g.moveTo(sx,sy);g.lineTo(j[0],j[1]);g.stroke();
  g.strokeStyle=IL.skin;g.lineWidth=34*s;g.beginPath();g.moveTo(j[0],j[1]);g.lineTo(j[2],j[3]);g.stroke();o._hands.push([j[2],j[3]]);});
}
function hands(o,s=1,tint){o._hands.forEach(h=>{g.fillStyle=IL.skin;g.beginPath();g.arc(h[0],h[1],23*s,0,7);g.fill();});}

// ---------- objetos ----------
function chicken(x,y,s,rot,cook=0,t=0){g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);const c1=mixc(IL.raw,IL.cooked,cook),c2=mixc(IL.rawS,IL.cookedS,cook);
 [[-58,30,-0.6],[58,30,0.6]].forEach(([dx,dy,a])=>{g.save();g.translate(dx,dy);g.rotate(a);g.fillStyle=c2;g.beginPath();g.ellipse(0,0,26,42,0,0,7);g.fill();g.fillStyle='#f6ead7';g.beginPath();g.arc(0,40,11,0,7);g.arc(-7,48,8,0,7);g.arc(7,48,8,0,7);g.fill();g.restore();});
 g.fillStyle=c1;g.beginPath();g.ellipse(0,0,92,62,0,0,7);g.fill();g.fillStyle=c2;g.beginPath();g.ellipse(-74,-6,20,34,-0.4,0,7);g.ellipse(74,-6,20,34,0.4,0,7);g.fill();
 g.fillStyle='rgba(255,255,255,0.28)';g.beginPath();g.ellipse(-22,-26,40,14,-0.2,0,7);g.fill();
 g.fillStyle='rgba(120,60,40,0.18)';for(let i=0;i<14;i++){g.beginPath();g.arc(-60+rnd(i)*120,-30+rnd(i+20)*60,2.5,0,7);g.fill();}g.restore();}
function germ(x,y,r,t,i=0,alpha=1,pop=0){if(alpha<=0)return;g.save();g.translate(x,y+Math.sin(t*6+i)*r*0.12);g.globalAlpha*=alpha;const sc=1+pop*0.8;g.scale(sc,sc);
 g.strokeStyle='#3c9d32';g.lineWidth=r*0.18;g.lineCap='round';for(let k=0;k<7;k++){const a=k/7*Math.PI*2+Math.sin(t*5+i+k)*0.15;g.beginPath();g.moveTo(Math.cos(a)*r*0.8,Math.sin(a)*r*0.8);g.lineTo(Math.cos(a)*r*1.35,Math.sin(a)*r*1.35);g.stroke();}
 g.fillStyle='#7be36b';g.beginPath();g.arc(0,0,r,0,7);g.fill();g.fillStyle='#5cc94d';g.beginPath();g.arc(r*0.3,r*0.35,r*0.35,0,7);g.fill();
 g.fillStyle='#fff';g.beginPath();g.arc(-r*0.32,-r*0.15,r*0.28,0,7);g.arc(r*0.32,-r*0.15,r*0.28,0,7);g.fill();g.fillStyle='#173d12';g.beginPath();g.arc(-r*0.28,-r*0.1,r*0.13,0,7);g.arc(r*0.36,-r*0.1,r*0.13,0,7);g.fill();
 g.strokeStyle='#173d12';g.lineWidth=r*0.1;g.beginPath();g.arc(0,r*0.2,r*0.3,0.3,Math.PI-0.3);g.stroke();g.restore();}
function burst(x,y,p,col='#7be36b'){if(p<=0||p>=1)return;g.save();g.globalAlpha=1-p;g.strokeStyle=col;g.lineWidth=5;for(let k=0;k<8;k++){const a=k/8*Math.PI*2;g.beginPath();g.moveTo(x+Math.cos(a)*20*p,y+Math.sin(a)*20*p);g.lineTo(x+Math.cos(a)*(20+40*p),y+Math.sin(a)*(20+40*p));g.stroke();}g.restore();}
function board(x,y,w,col){g.fillStyle=col;rr(x,y,w,26,8);g.fill();g.fillStyle='rgba(0,0,0,0.15)';rr(x,y+18,w,8,4);g.fill();g.fillStyle=col;rr(x+w-6,y+6,34,14,7);g.fill();}
function bowl(x,y,s){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#5fbf5a';for(let i=0;i<7;i++){g.beginPath();g.ellipse(-50+i*17,-26-Math.abs(3-i)*-4,22,30,(i-3)*0.3,0,7);g.fill();}g.fillStyle='#e66a5a';g.beginPath();g.arc(-20,-34,11,0,7);g.arc(26,-30,9,0,7);g.fill();
 g.fillStyle='#f0f3f8';g.beginPath();g.moveTo(-80,-12);g.lineTo(80,-12);g.quadraticCurveTo(70,40,0,42);g.quadraticCurveTo(-70,40,-80,-12);g.fill();g.fillStyle='#d5dbe5';g.fillRect(-80,-14,160,8);g.restore();}
function lemon(x,y,s,squeeze=0){g.save();g.translate(x,y);g.scale(s*(1+squeeze*0.15),s*(1-squeeze*0.2));g.fillStyle='#f7d23e';g.beginPath();g.ellipse(0,0,34,26,0,0,7);g.fill();g.beginPath();g.ellipse(36,0,8,6,0,0,7);g.ellipse(-36,0,8,6,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.35)';g.beginPath();g.ellipse(-8,-10,14,6,-0.3,0,7);g.fill();g.restore();}
function bottle(x,y,s,rot){g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.fillStyle='rgba(230,240,255,0.85)';rr(-26,-60,52,120,14);g.fill();g.fillStyle='#e8e0c8';rr(-22,-20,44,76,10);g.fill();g.fillStyle='#b9c4d4';rr(-10,-86,20,30,6);g.fill();g.fillStyle='#5a4a3a';g.font=`800 13px ${F}`;g.textAlign='center';g.fillText('VINAGRE',0,20);g.restore();}
function pan(x,y,s,t,fire){g.save();g.translate(x,y);g.scale(s,s);
 if(fire>0){for(let i=0;i<9;i++){const fx=-90+i*22;const h=(26+14*Math.sin(t*14+i*1.7))*fire;g.fillStyle='rgba(80,140,255,0.9)';g.beginPath();g.moveTo(fx-9,22);g.quadraticCurveTo(fx,22-h*1.3,fx+9,22);g.fill();g.fillStyle='rgba(255,170,60,0.85)';g.beginPath();g.moveTo(fx-5,22);g.quadraticCurveTo(fx,22-h*0.8,fx+5,22);g.fill();}}
 g.fillStyle='#2b2f38';g.beginPath();g.moveTo(-120,-30);g.lineTo(120,-30);g.lineTo(104,10);g.lineTo(-104,10);g.closePath();g.fill();g.fillStyle='#3c424f';g.fillRect(-122,-36,244,10);g.fillStyle='#1e2128';rr(118,-34,130,16,8);g.fill();g.restore();}
function thermo(x,y,s,val){g.save();g.translate(x,y);g.scale(s,s);g.strokeStyle='#c9d3e0';g.lineWidth=7;g.beginPath();g.moveTo(0,0);g.lineTo(0,-150);g.stroke();g.fillStyle='#e5484d';rr(-58,-250,116,100,20);g.fill();g.fillStyle='#10141c';rr(-46,-236,92,60,10);g.fill();
 g.fillStyle=val>=70?'#3ecf6e':'#ffcf5a';g.font=`900 38px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(Math.round(val)+'°',0,-205);g.restore();}
function steam(x,y,t,a=1){g.save();g.globalAlpha=0.35*a;g.strokeStyle='#fff';g.lineWidth=8;g.lineCap='round';for(let k=0;k<3;k++){g.beginPath();for(let j=0;j<=16;j++){const yy=y-j*9;const xx=x+(k-1)*40+Math.sin(j*0.45+t*3+k*2)*12;j?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();}g.restore();}
function bubbles(x,y,t,n=12,a=1){g.save();for(let i=0;i<n;i++){const ph=(t*0.6+rnd(i))%1;const bx=x+(rnd(i+3)-0.5)*130,by=y-ph*120;g.globalAlpha=a*(1-ph)*0.9;g.strokeStyle='#fff';g.lineWidth=3;g.fillStyle='rgba(200,230,255,0.35)';g.beginPath();g.arc(bx,by,6+rnd(i+5)*12,0,7);g.fill();g.stroke();}g.restore();}
function labelTag(txtS,x,y,p,col=C.amber){if(p<=0)return;pillDraw(txtS,x,y,col,col===C.amber?'#1a1206':'#fff',30,cl(p*3),eob(p));}
function arcPath(x0,y0,x1,y1,h,k){const x=lerp(x0,x1,k);const y=lerp(y0,y1,k)-4*h*k*(1-k);return [x,y];}
function fadeEdges(){const top=g.createLinearGradient(0,470,0,600);top.addColorStop(0,'rgba(9,14,26,1)');top.addColorStop(1,'rgba(9,14,26,0)');g.fillStyle=top;g.fillRect(0,470,W,130);
 const bot=g.createLinearGradient(0,1480,0,1620);bot.addColorStop(0,'rgba(8,12,22,0)');bot.addColorStop(1,'rgba(8,12,22,1)');g.fillStyle=bot;g.fillRect(0,1480,W,140);}
function vignette(){const v=g.createRadialGradient(540,1050,300,540,1050,900);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,0.45)');g.fillStyle=v;g.fillRect(0,470,W,1150);}

// ---------- escenas del vídeo del pollo ----------
const SPL=[[230,1150],[300,1120],[160,1000],[380,980],[760,1005],[820,1150],[470,1150],[900,1120],[600,960],[250,1060]];
function splashes(t,ts,n=10,slow=1){const out=[];for(let i=0;i<n;i++){const t0=ts+i*0.05*slow;const k=E(t,t0,0.55*slow);const tg=SPL[i%SPL.length];if(k<=0)continue;const [x,y]=arcPath(600,1080,tg[0],tg[1],120+rnd(i)*80,ease(k));
  if(k<1){g.fillStyle='rgba(170,215,255,0.9)';g.beginPath();g.arc(x,y,7,0,7);g.fill();}else out.push([tg[0],tg[1],i,t0+0.55*slow]);}return out;}
function baseKitchenPerson(t,o){kitchen(t);person(o,t);}
const ILL={};
ILL.pollo_lavar=(c,t)=>{const s=c._s,M=c._m;g.save();camLerp(t,s,6,[1.38,540,1010],[1.5,560,1020]);
 kitchen(t);board(170,1150,170,'#c98b4e');
 const shake=Math.sin(t*9)*6;const o={x:470,y:1200,lh:[555,1095+shake],rh:[650,1100-shake],look:[0.6,0.8],mouth:'smile'};person(o,t);
 chicken(600,1095+shake*0.5,0.62,0.15,0,t);waterStream(t,605,980,1060,1);sink();faucet();hands(o);counterFront();
 const sp=splashes(t,M.rep||s+1.5);sp.forEach(([x,y,i,tl])=>germ(x,y-14,14,t,i,ease(E(t,tl,0.3))));
 if(M.rep&&t>M.rep)germ(600,1080,12,t,99,ease(E(t,M.rep,0.4)));
 g.restore();};
ILL.pollo_fuego=(c,t)=>{const s=c._s;g.save();camLerp(t,s-0.1,0.9,[1.5,560,1020],[2.4,880,1110]);kitchen(t);counterFront();pan(880,1150,1,t,1);chicken(880,1110,0.45,0,0,t);g.restore();};
ILL.pollo_micro=(c,t)=>{const s=c._s;g.save();cam(2.4,880,1110);kitchen(t);counterFront();pan(880,1150,1,t,0);chicken(880,1110,0.45,0,0,t);g.restore();
 g.fillStyle='rgba(6,10,20,0.55)';g.fillRect(0,470,W,1150);const p=eob(E(t,s,0.6));const R=280*p;if(R<=1)return;
 g.save();g.beginPath();g.arc(540,1010,R,0,7);g.clip();g.fillStyle='#f0bba6';g.fillRect(200,700,700,700);g.fillStyle='rgba(200,120,100,0.25)';for(let i=0;i<60;i++){g.beginPath();g.arc(260+rnd(i)*560,730+rnd(i+70)*560,6+rnd(i+9)*14,0,7);g.fill();}
 for(let i=0;i<9;i++){const bx=300+rnd(i+1)*480+Math.sin(t*0.8+i)*30,by=790+rnd(i+30)*440+Math.cos(t*0.7+i)*20;const a=t*0.8+i;g.save();g.translate(bx,by);g.rotate(a);g.strokeStyle='#5cc94d';g.lineWidth=13;g.lineCap='round';g.beginPath();for(let j=0;j<=20;j++){const xx=-45+j*4.5;const yy=Math.sin(j*0.6+t*8+i)*10;j?g.lineTo(xx,yy):g.moveTo(xx,yy);}g.stroke();g.strokeStyle='#3c9d32';g.lineWidth=3;g.beginPath();g.moveTo(45,0);g.lineTo(62,Math.sin(t*20+i)*8);g.stroke();g.restore();}
 g.restore();g.strokeStyle='#e9eef5';g.lineWidth=18;g.beginPath();g.arc(540,1010,R,0,7);g.stroke();g.strokeStyle='#8592a6';g.lineWidth=26;g.lineCap='round';const hx=540+Math.cos(0.8)*(R+10),hy=1010+Math.sin(0.8)*(R+10);g.beginPath();g.moveTo(hx,hy);g.lineTo(hx+120*p,hy+120*p);g.stroke();};
ILL.pollo_salpica=(c,t)=>{const s=c._s,M=c._m;g.save();camLerp(t,s,0.8,[1.9,600,1080],[1.22,560,1030]);kitchen(t);board(170,1150,170,'#c98b4e');
 const o={x:470,y:1200,lh:[555,1095],rh:[650,1100],look:[0.6,0.8],mouth:'o',brow:1};person(o,t);chicken(600,1095,0.62,0.15,0,t);waterStream(t*0.25,605,980,1060,1);sink();faucet();hands(o);counterFront();
 // trayectorias a cámara lenta hacia 3 destinos
 const tg=[['fregadero',[700,1165],M.fre],['encimera',[930,1165],M.enc],['tabla',[250,1140],M.tab]];
 tg.forEach(([nm,[x,y],tm],i)=>{if(!tm)return;const k=E(t,tm-0.5,0.5);g.save();g.setLineDash([10,12]);g.strokeStyle='rgba(150,205,255,0.8)';g.lineWidth=5;g.beginPath();for(let j=0;j<=30*k;j++){const [px,py]=arcPath(600,1060,x,y,160,j/30);j?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();g.restore();
  if(k>=1){germ(x,y-16,15,t,i+3,1);germ(x+30,y-12,10,t,i+7,1);labelTag(nm.toUpperCase(),x,y-(i==0?150:85),E(t,tm,0.4),C.red);}});
 g.restore();txt('CÁMARA LENTA',540,560,26,'rgba(255,255,255,0.6)',800);};
ILL.pollo_limon=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1.7,590,1020);kitchen(t);
 const sq=(M.lim&&t>M.lim)?(0.5+0.5*Math.sin(t*8)):0;const showL=M.lim&&t>M.lim-0.3;const showV=M.vin&&t>M.vin-0.2&&(!M.lim||t<M.lim-0.3);
 const o={x:470,y:1200,lh:[540,1100],rh:showL?[640,960]:(showV?[660,940]:[650,1110]),look:[0.5,0.6],mouth:'flat'};person(o,t);chicken(600,1110,0.62,0,0,t);sink();counterFront();
 if(showV){bottle(670,930,0.9,2.2);if(t>M.vin+0.1){g.fillStyle='rgba(240,230,200,0.7)';for(let i=0;i<6;i++){const ph=(t*2+i/6)%1;g.beginPath();g.arc(630,960+ph*120,6,0,7);g.fill();}}}
 if(showL){lemon(640,945,1.2,sq);g.fillStyle='rgba(250,230,90,0.9)';for(let i=0;i<5;i++){const ph=(t*2.4+i/5)%1;g.beginPath();g.arc(625+i*6,970+ph*110,5,0,7);g.fill();}}
 hands(o);for(let i=0;i<5;i++)germ(560+i*22,1080+Math.sin(i)*12,11,t,i,1);g.restore();};
ILL.pollo_cocinar=(c,t)=>{const s=c._s,M=c._m;g.save();cam(2.5,890,1080);kitchen(t);counterFront();pan(880,1150,1,t,1);
 const ck=ease(E(t,s+0.3,(M.r||s+5)-s));chicken(880,1110,0.45,0,ck,t);steam(880,1060,t,ck);
 const tv=M.t70?lerp(20,70,ease(E(t,s+0.6,M.t70-s-0.6))):20;thermo(930,1100,0.75,tv);
 for(let i=0;i<5;i++){const gx=840+i*20,gy=1090+Math.sin(i*2)*8;const kill=M.t70?E(t,M.t70-0.4+i*0.08,0.25):0;germ(gx,gy,8,t,i,1-kill,kill);burst(gx,gy,E(t,M.t70-0.15+i*0.08,0.4));}
 g.restore();};
ILL.pollo_manos=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1.45,440,1020);kitchen(t);
 const toSalad=M.ens?ease(E(t,M.ens-0.6,0.7)):0;const o={x:470,y:1200,lh:[400,1110],rh:[lerp(600,270,toSalad),lerp(1100,1095,toSalad)],look:[lerp(0.5,-0.7,toSalad),0.6],mouth:'flat'};
 person(o,t);chicken(600,1120,0.55,0,0,t);bowl(260,1160,0.95);counterFront();hands(o);
 const h=o._hands[1];for(let i=0;i<4;i++)germ(h[0]-18+i*12,h[1]-6+(i%2)*10,7,t,i,ease(E(t,s+0.4,0.4)));
 if(M.ens)for(let i=0;i<4;i++)germ(220+i*26,1120-(i%2)*14,9,t,i+10,ease(E(t,M.ens,0.4)));
 if(M.man){const p=E(t,M.man,0.5);g.strokeStyle=C.red;g.lineWidth=6;g.globalAlpha=cl(p*3);g.beginPath();g.arc(h[0],h[1],46+8*Math.sin(t*8),0,7);g.stroke();g.globalAlpha=1;}
 g.restore();};
ILL.pollo_solucion=(c,t)=>{const s=c._s,M=c._m;const sw=M.tab?ease(E(t,M.tab-0.4,0.7)):0;g.save();camLerp(t,(M.tab||s+99)-0.4,0.7,[1.8,600,1030],[2.0,320,1110]);kitchen(t);
 const rub=Math.sin(t*10)*14;const o={x:470,y:1200,lh:[575+rub,1060],rh:[625-rub,1065],look:[0.4,0.7],mouth:'smile'};
 if(sw<0.5){person(o,t);waterStream(t,605,980,1050,1);sink();faucet();hands(o);bubbles(600,1060,t,14,1);counterFront();}
 else{counterFront();board(110,1150,190,'#e5484d');chicken(200,1130,0.32,0,0,t);board(330,1150,190,'#3ecf6e');bowl(420,1150,0.6);
  labelTag('POLLO',205,1235,E(t,M.tab,0.4),C.red);labelTag('ENSALADA',425,1235,E(t,M.ens||M.tab,0.4),C.green);}
 g.restore();};
ILL.cocina_fondo=(c,t)=>{g.save();cam(1,540,1050);kitchen(t);counterFront();g.restore();g.fillStyle='rgba(6,10,20,0.6)';g.fillRect(0,470,W,1150);};

CMP.illus=(c,t,p)=>{g.save();g.beginPath();g.rect(0,470,W,1150);g.clip();ILL[c.name](c,t);vignette();g.restore();fadeEdges();};
