// ===== Kit: congelar y descongelar (2026-11-06) =====
// nevera baja (de pie delante de la encimera): congelador arriba en y+14…y+190; cuerpo prolongado hasta el suelo
function fridgeLow(x,y,t,open=0,frost=0){g.fillStyle='#d6dde8';rr(x,y+300,300,900,20);g.fill();fridge(x,y,t,open,frost);}
// paquete de carne cruda en bolsa de congelación, centrado en (x,y). o.ice 0–1 = escarcha; o.drip 0–1 = gotea jugo (o.t para animar)
function frozenPack(x,y,s,rot,o={}){const ice=o.ice??0,dr=o.drip??0,t=o.t||0;g.save();g.translate(x,y);g.rotate(rot||0);g.scale(s,s);
 g.fillStyle='rgba(225,238,255,0.55)';rr(-92,-46,184,92,18);g.fill();
 g.fillStyle='#7aa7e0';rr(-92,-46,184,12,6);g.fill();
 g.fillStyle=mixc('#d9534f','#b9a3b6',ice*0.6);g.beginPath();g.ellipse(-4,6,70,28,0,0,7);g.fill();
 g.fillStyle=mixc('#f3d6c8','#e8e8f2',ice*0.6);g.beginPath();g.ellipse(24,-2,20,8,0.3,0,7);g.ellipse(-36,14,12,5,-0.2,0,7);g.fill();
 g.fillStyle='#fff';rr(36,18,48,20,4);g.fill();g.fillStyle='#3d7bff';g.fillRect(38,20,44,4);
 if(ice>0){g.save();g.globalAlpha*=ice;g.fillStyle='rgba(235,245,255,0.6)';rr(-92,-46,184,92,18);g.fill();
  g.fillStyle='#fff';for(let i=0;i<26;i++){g.beginPath();g.arc(-84+rnd(i+50)*168,-38+rnd(i+80)*76,1.5+rnd(i+3)*3,0,7);g.fill();}
  g.strokeStyle='rgba(255,255,255,0.9)';g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(-80,-30);g.lineTo(-50,-36);g.moveTo(40,-34);g.lineTo(76,-28);g.stroke();g.restore();}
 g.strokeStyle='rgba(255,255,255,0.6)';g.lineWidth=3;rr(-92,-46,184,92,18);g.stroke();g.restore();
 if(dr>0){for(let i=0;i<4;i++){const ph=(t*0.9+i/4)%1;const dx=x+(-50+i*34)*s,dy=y+44*s+ph*90*s;g.save();g.globalAlpha*=dr*(1-ph);g.fillStyle='#c9433f';g.beginPath();g.ellipse(dx,dy,5*s,8*s,0,0,7);g.fill();g.restore();}}}
// charco de jugo
function juicePuddle(x,y,w,a){if(a<=0)return;g.save();g.globalAlpha*=a;g.fillStyle='rgba(201,67,63,0.75)';g.beginPath();g.ellipse(x,y,w/2,w*0.09,0,0,7);g.fill();g.fillStyle='rgba(255,255,255,0.3)';g.beginPath();g.ellipse(x-w*0.15,y-2,w*0.12,w*0.025,0,0,7);g.fill();g.restore();}
// bacteria dormida por el frío: sl 0–1 (ojos cerrados, tinte azul y "z"); con sl=0 es un germ normal
function napGerm(x,y,r,t,i,a,sl,pop=0){if(a<=0)return;germ(x,y,r,t,i,a,pop);if(sl<=0)return;const yy=y+Math.sin(t*6+i)*r*0.12;g.save();g.globalAlpha*=a*cl(sl*2);
 g.fillStyle='#7be36b';g.beginPath();g.arc(x-r*0.32,yy-r*0.15,r*0.34,0,7);g.arc(x+r*0.32,yy-r*0.15,r*0.34,0,7);g.fill();
 g.strokeStyle='#173d12';g.lineWidth=r*0.1;g.lineCap='round';[-1,1].forEach(sd=>{g.beginPath();g.arc(x+sd*r*0.32,yy-r*0.22,r*0.17,0.3,Math.PI-0.3);g.stroke();});
 g.fillStyle=`rgba(150,200,255,${0.4*sl})`;g.beginPath();g.arc(x,yy,r,0,7);g.fill();
 for(let k=0;k<2;k++){const ph=(t*0.5+k*0.5+i*0.13)%1;g.globalAlpha=a*sl*(1-ph);g.fillStyle='#e6f4ff';g.font=`900 ${Math.round(r*(0.8+ph*0.5))}px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText('z',x+r*0.9+ph*r*0.8,yy-r*1.1-ph*r*1.4);}
 g.restore();}
// bloque de hielo translúcido que envuelve algo (a = opacidad, se derrite bajando a)
function iceBlock(x,y,w,h,a,t){if(a<=0)return;g.save();g.globalAlpha*=a;g.fillStyle='rgba(190,225,255,0.28)';rr(x-w/2,y-h/2,w,h,26);g.fill();
 g.strokeStyle='rgba(235,248,255,0.85)';g.lineWidth=5;rr(x-w/2,y-h/2,w,h,26);g.stroke();
 g.fillStyle='rgba(255,255,255,0.35)';g.beginPath();g.moveTo(x-w/2+20,y-h/2+16);g.lineTo(x-w/2+120,y-h/2+16);g.lineTo(x-w/2+40,y-h/2+90);g.closePath();g.fill();
 g.strokeStyle='rgba(255,255,255,0.5)';g.lineWidth=2.5;g.beginPath();g.moveTo(x+w*0.2,y-h/2+6);g.lineTo(x+w*0.26,y-h*0.1);g.lineTo(x+w*0.18,y+h*0.1);g.moveTo(x-w*0.3,y+h/2-8);g.lineTo(x-w*0.22,y+h*0.25);g.stroke();g.restore();}
// interior de congelador (fondo helado a pantalla completa de la escena), k = opacidad
function freezerBG(t,k){if(k<=0)return;g.save();g.globalAlpha*=k;const gr=g.createLinearGradient(0,470,0,1620);gr.addColorStop(0,'#2c4f7c');gr.addColorStop(1,'#16304f');g.fillStyle=gr;g.fillRect(0,470,W,1150);
 const lg=g.createRadialGradient(540,700,40,540,800,700);lg.addColorStop(0,'rgba(200,235,255,0.35)');lg.addColorStop(1,'rgba(200,235,255,0)');g.fillStyle=lg;g.fillRect(0,470,W,1150);
 g.strokeStyle='rgba(220,240,255,0.35)';g.lineWidth=6;[760,1240].forEach(y=>{g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke();for(let x=30;x<W;x+=60){g.beginPath();g.moveTo(x,y-4);g.lineTo(x,y+4);g.stroke();}});
 for(let i=0;i<14;i++)flake(60+rnd(i+21)*960,520+rnd(i+33)*1050,10+rnd(i+5)*14,t*0.3+i);
 g.fillStyle='rgba(255,255,255,0.12)';g.fillRect(0,470,W,40);g.restore();}
// albóndigas en la superficie de una olla (stockPot en x,y,s)
function meatballs(x,y,s,n=6){const sy=y-184*s;for(let i=0;i<n;i++){const bx=x+(-80+i*(160/(n-1)))*s,by=sy+((i%2)?-6:4)*s;g.fillStyle='#8a4a22';g.beginPath();g.arc(bx,by,15*s,0,7);g.fill();g.fillStyle='rgba(255,220,180,0.35)';g.beginPath();g.arc(bx-5*s,by-5*s,5*s,0,7);g.fill();}}
// escarcha y etiqueta sobre un táper (tupper en x,y,s): a 0–1
function frostTupper(x,y,s,a,label){if(a<=0)return;g.save();g.translate(x,y);g.scale(s,s);g.globalAlpha*=a;g.fillStyle='rgba(230,244,255,0.45)';rr(-72,-66,144,66,12);g.fill();
 g.fillStyle='#fff';for(let i=0;i<16;i++){g.beginPath();g.arc(-64+rnd(i+90)*128,-60+rnd(i+70)*56,1.5+rnd(i)*2.5,0,7);g.fill();}
 if(label){g.fillStyle='#fffbe8';rr(-44,-40,88,26,5);g.fill();g.fillStyle='#1b1e26';g.font=`900 16px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText(label,0,-27);}g.restore();}
// signos de interrogación flotando
function qMarks(x,y,t,a){if(a<=0)return;g.save();for(let i=0;i<3;i++){const ph=(t*0.6+i/3)%1;g.globalAlpha=a*Math.sin(ph*Math.PI);g.fillStyle=i===1?C.amber:'#fff';g.font=`900 ${54-i*8}px ${F}`;g.textAlign='center';g.textBaseline='middle';g.fillText('?',x+(i-1)*70+Math.sin(t*2+i)*8,y-ph*60-(i===1?20:0));}g.restore();}
