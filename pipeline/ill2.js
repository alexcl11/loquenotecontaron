// ===== Kit de ilustración (2): salón, interruptor, fluorescente, lavavajillas, nevera, despensa =====
// ---------- salón ----------
function salon(t,o={}){const dark=o.dark||0;
 const gr=g.createLinearGradient(0,400,0,1300);gr.addColorStop(0,'#2a2f55');gr.addColorStop(1,'#1c2140');g.fillStyle=gr;g.fillRect(-600,300,2300,1100);
 g.fillStyle='#3a2a22';g.fillRect(-600,1290,2300,500);g.fillStyle='#46332a';for(let i=-6;i<20;i++){g.fillRect(i*120,1290,4,500);}
 // ventana
 g.fillStyle='#3c2c26';rr(40,600,230,280,10);g.fill();const sk=g.createLinearGradient(0,612,0,868);sk.addColorStop(0,'#0b1430');sk.addColorStop(1,'#1d2d5a');g.fillStyle=sk;rr(52,612,206,256,6);g.fill();
 g.save();g.beginPath();g.rect(52,612,206,256);g.clip();moonI(200,670,26);for(let i=0;i<7;i++){g.fillStyle=`rgba(255,255,255,${0.35+0.35*Math.sin(t*2+i)})`;g.beginPath();g.arc(70+rnd(i)*170,630+rnd(i+9)*200,2,0,7);g.fill();}g.restore();g.fillStyle='#3c2c26';g.fillRect(150,612,8,256);
 // cuadro
 g.fillStyle='#c9b28a';rr(330,650,160,110,6);g.fill();g.fillStyle='#4a6fa5';rr(340,660,140,90,4);g.fill();g.fillStyle='#e9d9a8';g.beginPath();g.arc(440,690,14,0,7);g.fill();g.fillStyle='#2d4a78';g.beginPath();g.moveTo(340,750);g.lineTo(400,700);g.lineTo(450,750);g.fill();
 // tele en la pared
 g.fillStyle='#0e1118';rr(690,780,350,210,12);g.fill();g.fillStyle=o.tvOn?'#3b6fd8':'#0a0d14';rr(702,792,326,186,6);g.fill();
 if(!o.tvOn){g.fillStyle='rgba(255,255,255,0.05)';g.beginPath();g.moveTo(702,792);g.lineTo(820,792);g.lineTo(702,900);g.fill();}
 // mueble bajo con aparatos
 g.fillStyle='#5a3f30';rr(680,1150,370,120,8);g.fill();g.fillStyle='#4a3326';rr(692,1180,170,80,6);g.fill();rr(870,1180,168,80,6);g.fill();
 const lamp=o.lamp??1;
 // lámpara de techo
 g.strokeStyle='#888';g.lineWidth=4;g.beginPath();g.moveTo(470,470);g.lineTo(470,600);g.stroke();g.fillStyle='#d8c08c';g.beginPath();g.moveTo(420,640);g.lineTo(520,640);g.lineTo(495,600);g.lineTo(445,600);g.closePath();g.fill();
 g.fillStyle=lamp>0.5?'#fff3c4':'#8a8470';g.beginPath();g.arc(470,648,14,0,7);g.fill();
 if(lamp>0){const lg=g.createRadialGradient(470,660,20,470,900,620);lg.addColorStop(0,`rgba(255,226,150,${0.35*lamp})`);lg.addColorStop(1,'rgba(255,226,150,0)');g.fillStyle=lg;g.fillRect(-600,600,2300,900);}
 if(dark>0){g.fillStyle=`rgba(4,6,14,${dark})`;g.fillRect(-600,300,2300,1500);}
}
function tvLed(x,y,t,on=1,glow=1){if(on<=0)return;const a=0.7+0.3*Math.sin(t*5);g.save();g.globalAlpha=on;const gr=g.createRadialGradient(x,y,1,x,y,40*glow);gr.addColorStop(0,`rgba(255,60,60,${a})`);gr.addColorStop(1,'rgba(255,60,60,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,40*glow,0,7);g.fill();g.fillStyle='#ff4040';g.beginPath();g.arc(x,y,5,0,7);g.fill();g.restore();}
function router(x,y,t,on=1,s=1){g.save();g.translate(x,y);g.scale(s,s);g.strokeStyle='#cfd6e2';g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(-34,-20);g.lineTo(-44,-70);g.moveTo(34,-20);g.lineTo(44,-70);g.stroke();g.fillStyle='#e8ecf2';rr(-56,-22,112,30,8);g.fill();
 for(let i=0;i<5;i++){const blink=on*(0.4+0.6*(Math.sin(t*(6+i*2)+i)>0?1:0.2));g.fillStyle=`rgba(80,230,120,${blink})`;g.beginPath();g.arc(-36+i*18,-6,4,0,7);g.fill();}
 if(on>0){g.strokeStyle=`rgba(120,200,255,${0.5*on})`;g.lineWidth=4;for(let k=1;k<=3;k++){const r=k*22+((t*30)%22);g.globalAlpha=on*(1-r/90);g.beginPath();g.arc(0,-40,r,-2.4,-0.7);g.stroke();}}g.restore();}
function decoder(x,y,t,on=1){g.fillStyle='#2b2f3a';rr(x-60,y-24,120,28,6);g.fill();g.fillStyle=on?'#7be36b':'#334';g.fillRect(x+36,y-14,14,6);g.fillStyle=on?`rgba(255,80,80,${0.6+0.4*Math.sin(t*4)})`:'#334';g.beginPath();g.arc(x-40,y-10,3,0,7);g.fill();}
function speaker(x,y,t,on=1){g.fillStyle='#d9dce4';rr(x-26,y-70,52,74,22);g.fill();g.fillStyle='#b9bfcc';for(let i=0;i<5;i++)g.fillRect(x-20,y-56+i*10,40,3);if(on){g.fillStyle=`rgba(80,170,255,${0.5+0.5*Math.sin(t*2)})`;rr(x-18,y-72,36,6,3);g.fill();}}
function printer(x,y,t,on=1){g.fillStyle='#e8ecf2';rr(x-70,y-50,140,56,10);g.fill();g.fillStyle='#c9ced8';rr(x-60,y-64,120,16,4);g.fill();g.fillStyle='#fff';g.fillRect(x-40,y-80,80,20);g.fillStyle=on?`rgba(80,230,120,${0.5+0.5*Math.sin(t*3)})`:'#999';g.beginPath();g.arc(x+50,y-30,5,0,7);g.fill();}
function stereo(x,y,t,on=1){g.fillStyle='#3a3f4b';rr(x-80,y-50,160,56,8);g.fill();g.fillStyle='#22252d';g.beginPath();g.arc(x-50,y-22,18,0,7);g.arc(x+50,y-22,18,0,7);g.fill();g.fillStyle=on?'#4ff0ff':'#223';g.fillRect(x-20,y-34,40,12);}
function shelf(x,y,w){g.fillStyle='#5a3f30';g.fillRect(x,y,w,14);}
function sofa(x,y,w,col='#7b5cc9'){const c2=mixc('#7b5cc9','#000000',0.25);g.fillStyle=col;rr(x,y,w,120,30);g.fill();g.fillStyle=c2;rr(x-40,y+40,60,140,22);g.fill();rr(x+w-20,y+40,60,140,22);g.fill();g.fillStyle=col;rr(x-10,y+90,w+20,90,20);g.fill();g.fillStyle='rgba(255,255,255,0.08)';rr(x+20,y+10,w-40,16,8);g.fill();}
function powerStrip(x,y,t,on=1){g.fillStyle='#f0f2f6';rr(x-110,y-20,220,40,12);g.fill();for(let i=0;i<4;i++){g.fillStyle='#c9ced8';g.beginPath();g.arc(x-70+i*40,y,10,0,7);g.fill();}g.fillStyle=on?'#ff5a4a':'#555';rr(x+82,y-12,20,24,5);g.fill();if(on){g.save();g.globalAlpha=0.5+0.5*Math.sin(t*4);g.fillStyle='#ff8a7a';g.beginPath();g.arc(x+92,y,14,0,7);g.fill();g.restore();}
 g.strokeStyle='#e0e3ea';g.lineWidth=6;g.beginPath();g.moveTo(x-110,y);g.quadraticCurveTo(x-180,y+40,x-240,y+20);g.stroke();}
function coin(x,y,s,rot){g.save();g.translate(x,y);g.scale(Math.cos(rot)*s,s);g.fillStyle='#f2c14a';g.beginPath();g.arc(0,0,22,0,7);g.fill();g.fillStyle='#d9a52c';g.beginPath();g.arc(0,0,16,0,7);g.fill();g.fillStyle='#fff3c4';g.font=`900 20px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText('€',0,1);g.restore();}
function wallSwitch(x,y,on){g.fillStyle='#f4f1ea';rr(x-60,y-90,120,180,16);g.fill();g.fillStyle='#ddd8cc';rr(x-34,y-60,68,120,10);g.fill();g.fillStyle='#fff';rr(x-30,on?y-56:y-6,60,62,8);g.fill();g.fillStyle='rgba(0,0,0,0.08)';rr(x-30,on?y+6:y-56,60,50,8);g.fill();}
function tube(x,y,w,t,lvl,flick=0,ends=0){g.fillStyle='#b9bfcc';rr(x-w/2-20,y-26,w+40,20,6);g.fill();const fl=flick>0?(Math.sin(t*40)>0.3?1:0.25):1;const L=lvl*fl;
 g.fillStyle=mixc('#6b7080','#fffdf2',L);rr(x-w/2,y-6,w,22,11);g.fill();if(ends>0){g.fillStyle=`rgba(30,25,20,${0.8*ends})`;rr(x-w/2,y-6,40,22,11);g.fill();rr(x+w/2-40,y-6,40,22,11);g.fill();}
 if(L>0.05){const lg=g.createRadialGradient(x,y+20,10,x,y+300,700);lg.addColorStop(0,`rgba(230,245,255,${0.35*L})`);lg.addColorStop(1,'rgba(230,245,255,0)');g.fillStyle=lg;g.fillRect(-600,y,2300,1200);}}
function bulb(x,y,s,on,t){g.save();g.translate(x,y);g.scale(s,s);if(on>0){const lg=g.createRadialGradient(0,0,10,0,0,220);lg.addColorStop(0,`rgba(255,230,150,${0.6*on})`);lg.addColorStop(1,'rgba(255,230,150,0)');g.fillStyle=lg;g.beginPath();g.arc(0,0,220,0,7);g.fill();}
 g.fillStyle=mixc('#8a8470','#fff3c4',on);g.beginPath();g.arc(0,0,50,0,7);g.fill();g.fillStyle='#b9bfcc';rr(-26,40,52,40,6);g.fill();g.fillStyle='#8592a6';for(let i=0;i<3;i++)g.fillRect(-26,48+i*10,52,4);g.restore();}
// ---------- cocina: lavavajillas, depósitos, nevera, despensa, cubo ----------
function dishwasher(x,y,t,open=1,load=0){ // x,y = esquina sup. izq. del hueco bajo la encimera (ancho 220)
 g.fillStyle='#cfd6e2';rr(x,y,220,330,8);g.fill();g.fillStyle='#9aa4b5';g.fillRect(x+10,y+10,200,24);g.fillStyle=`rgba(80,230,120,${0.6+0.4*Math.sin(t*3)})`;g.beginPath();g.arc(x+190,y+22,5,0,7);g.fill();
 if(open>0){g.fillStyle='#1b2232';g.fillRect(x+10,y+40,200,280);g.strokeStyle='#8592a6';g.lineWidth=4;for(let r=0;r<2;r++){const ry=y+110+r*120;g.beginPath();g.moveTo(x+18,ry);g.lineTo(x+202,ry);g.stroke();}
  for(let i=0;i<6;i++){const k=cl(load*6-i);if(k<=0)continue;g.fillStyle='#f0f3f8';g.save();g.globalAlpha=k;rr(x+26+i*30,y+110-70+(1-ease(k))*-60,12,70,6);g.fill();g.restore();}
  for(let i=0;i<5;i++){const k=cl(load*6-3-i*0.5);if(k<=0)continue;g.fillStyle='#e8d9b8';g.save();g.globalAlpha=k;rr(x+30+i*36,y+230-50,26,50,8);g.fill();g.restore();}
  g.fillStyle='#b9c2d0';g.beginPath();g.moveTo(x,y+330);g.lineTo(x+220,y+330);g.lineTo(x+250,y+420*open+330-420*open+90*open);g.lineTo(x-30,y+330+90*open);g.closePath();g.fill();}}
function tank(x,y,w,h,lvl,label,col,t){g.fillStyle='rgba(255,255,255,0.08)';rr(x,y,w,h,16);g.fill();g.strokeStyle='rgba(255,255,255,0.5)';g.lineWidth=5;rr(x,y,w,h,16);g.stroke();
 const lh=(h-10)*lvl;g.save();g.beginPath();g.roundRect(x+5,y+5,w-10,h-10,12);g.clip();g.fillStyle=col;g.beginPath();g.moveTo(x,y+h-lh);for(let i=0;i<=20;i++)g.lineTo(x+i*w/20,y+h-lh+Math.sin(i*0.8+t*4)*5);g.lineTo(x+w,y+h);g.lineTo(x,y+h);g.closePath();g.fill();g.restore();
 txt(label,x+w/2,y+h+40,32,'#fff',800);}
function plate(x,y,s,dirty=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#f0f3f8';g.beginPath();g.ellipse(0,0,60,22,0,0,7);g.fill();g.fillStyle='#d5dbe5';g.beginPath();g.ellipse(0,-2,40,13,0,0,7);g.fill();if(dirty>0){g.fillStyle=`rgba(190,110,50,${dirty})`;g.beginPath();g.ellipse(-10,-2,18,7,0.3,0,7);g.ellipse(14,0,10,5,0,0,7);g.fill();}g.restore();}
function spatula(x,y,rot){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle='#e5484d';rr(-8,-90,16,80,6);g.fill();g.fillStyle='#ffb3a8';rr(-22,-10,44,34,8);g.fill();g.restore();}
function fridge(x,y,t,open=1,frost=0){g.fillStyle='#e6ebf2';rr(x,y,300,640,20);g.fill();g.fillStyle='#cfd6e2';g.fillRect(x,y+200,300,8);
 if(open>0){g.fillStyle='#f6f9fd';rr(x+14,y+214,272,412,10);g.fill();const lg=g.createRadialGradient(x+150,y+300,20,x+150,y+400,400);lg.addColorStop(0,'rgba(220,240,255,0.5)');lg.addColorStop(1,'rgba(220,240,255,0)');g.fillStyle=lg;g.fillRect(x-200,y,700,800);
  g.fillStyle='#c9d3e0';[330,450].forEach(dy=>g.fillRect(x+14,y+dy,272,6));}
 g.fillStyle='#e3f2ff';rr(x+14,y+14,272,176,10);g.fill();if(frost>0){g.save();g.globalAlpha=frost;for(let i=0;i<10;i++)flake(x+40+rnd(i)*220,y+40+rnd(i+5)*130,10+rnd(i+3)*10,t+i);g.restore();}
 g.fillStyle='#9aa4b5';rr(x+260,y+80,10,80,5);g.fill();rr(x+260,y+260,10,120,5);g.fill();}
function flake(x,y,r,t){g.save();g.translate(x,y);g.rotate(t*0.5);g.strokeStyle='#8fd0ff';g.lineWidth=3;for(let k=0;k<6;k++){g.rotate(Math.PI/3);g.beginPath();g.moveTo(0,0);g.lineTo(0,r);g.moveTo(0,r*0.6);g.lineTo(r*0.25,r*0.8);g.stroke();}g.restore();}
function meatTray(x,y,s,fish=false){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#f4f6fa';rr(-70,-26,140,52,10);g.fill();if(fish){g.fillStyle='#9fb6c9';g.beginPath();g.ellipse(-6,0,50,16,0,0,7);g.fill();g.beginPath();g.moveTo(40,0);g.lineTo(62,-14);g.lineTo(62,14);g.fill();g.fillStyle='#223';g.beginPath();g.arc(-40,-3,3,0,7);g.fill();}
 else{g.fillStyle='#d9534f';g.beginPath();g.ellipse(0,0,52,18,0,0,7);g.fill();g.fillStyle='#f3d6c8';g.beginPath();g.ellipse(20,-4,14,6,0.3,0,7);g.fill();}
 g.fillStyle='#fff';rr(20,8,46,20,4);g.fill();g.fillStyle='#e5484d';g.fillRect(22,10,42,4);g.restore();}
function packet(x,y,s,kind,t){g.save();g.translate(x,y);g.scale(s,s);const K={arroz:['#f4f1ea','#3d7bff','🍚'],pasta:['#f2c14a','#c0392b','🍝'],legumbres:['#d9c7a7','#7a4b2a','🫘'],harina:['#ffffff','#c9b28a','🌾'],galletas:['#4a6fa5','#f2c14a','🍪']};
 if(kind==='conservas'){g.fillStyle='#c9d3e0';rr(-36,-50,72,100,8);g.fill();g.fillStyle='#e5484d';g.fillRect(-36,-24,72,48);emoji('🥫',0,0,40);}
 else if(kind==='aceite'){g.fillStyle='rgba(200,190,60,0.85)';rr(-24,-70,48,140,12);g.fill();g.fillStyle='#3a6b2a';rr(-12,-96,24,28,6);g.fill();g.fillStyle='#fff';g.fillRect(-20,-10,40,36);}
 else if(kind==='miel'){g.fillStyle='#e8a33a';rr(-38,-44,76,94,18);g.fill();g.fillStyle='#c9b28a';rr(-34,-62,68,22,6);g.fill();emoji('🍯',0,6,38);}
 else{const k=K[kind]||K.arroz;g.fillStyle=k[0];g.beginPath();g.moveTo(-50,-70);g.lineTo(50,-70);g.lineTo(56,70);g.lineTo(-56,70);g.closePath();g.fill();g.fillStyle=k[1];g.fillRect(-52,-20,104,40);emoji(k[2],0,40,40);g.fillStyle='rgba(0,0,0,0.08)';g.fillRect(-50,-70,100,12);}
 g.restore();}
function bin(x,y,s,open=0){g.save();g.translate(x,y);g.scale(s,s);g.fillStyle='#8592a6';g.beginPath();g.moveTo(-70,-100);g.lineTo(70,-100);g.lineTo(58,100);g.lineTo(-58,100);g.closePath();g.fill();g.fillStyle='#9aa4b5';g.fillRect(-60,-60,120,6);g.fillRect(-58,-10,116,6);g.fillRect(-56,40,112,6);
 g.save();g.translate(-72,-104);g.rotate(-open*1.1);g.fillStyle='#a8b2c2';rr(0,-14,144,18,6);g.fill();g.restore();g.restore();}
function dateLabel(x,y,title,date,col,p=1){if(p<=0)return;g.save();g.globalAlpha=cl(p*3);g.translate(x,y);g.scale(eob(p),eob(p));rr(-170,-56,340,112,14);g.fillStyle='#fff';g.fill();g.fillStyle=col;rr(-170,-56,340,40,[14,14,0,0]);g.fill();
 g.fillStyle='#fff';g.font=`800 22px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(title,0,-36);g.fillStyle='#1a1f2b';g.font=`900 40px ${F}`;g.fillText(date,0,22);g.restore();}
function pantry(t){g.fillStyle='#4a3326';g.fillRect(60,560,960,940);g.fillStyle='#5a3f30';rr(80,580,920,900,10);g.fill();[850,1150,1450].forEach(y=>{g.fillStyle='#3a2a20';g.fillRect(80,y,920,22);});
 const lg=g.createRadialGradient(540,700,40,540,900,700);lg.addColorStop(0,'rgba(255,220,150,0.25)');lg.addColorStop(1,'rgba(255,220,150,0)');g.fillStyle=lg;g.fillRect(60,560,960,940);}
