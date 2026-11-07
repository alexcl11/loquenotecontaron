// ===== Escenas: tapar la olla (2026-11-10) · kit en ill18.js (usa stockPot de ill7.js, heatOut/costMeter de ill5.js, scr de ill_20261029.js) =====
const TO_POT=[885,1150,0.75];const TO_KNOB=[885,1150+(-190-29)*0.75];
function toP(o){return Object.assign({x:620,y:1200,shirt:'#3d7bff'},o);}
// olla en el fuego: lid 0–1 (puesta), st = vapor, fire = llama
function toStove(t,o={}){stockPot(...TO_POT,t,{lid:o.lid||0,steam:0});burner(TO_POT[0],1170,170,t,o.fire??0.8);
 if(!o.lid){steamPlume(TO_POT[0],1010,200,t,o.st??1,360);steam(TO_POT[0],1010,t,(o.st??1)*0.8);}}
ILL.to_fondo=(c,t)=>{ILL.cocina_fondo(c,t);};
// gancho: agua hirviendo sin tapa, la tapa en la encimera; «total, da igual»
ILL.to_gancho=(c,t)=>{const s=c._s,M=c._m;const sh=M.tot?Math.sin(Math.PI*E(t,M.tot-0.1,1.1)):0;const no=M.no?E(t,M.no-0.2,0.4):0;
 g.save();camLerp(t,s,5,[1.15,650,1000],[1.28,700,990]);kitchen(t);
 const o=toP({rh:sh>0.05?[lerp(760,720,sh),lerp(1120,1000,sh)]:[760,1120],lh:[lerp(520,500,sh),lerp(1150,1010,sh)],look:no>0.5?[0.8,0.1]:[0,0.1],mouth:no>0.5?'o':'smile',brow:no>0.5?1:0});
 person(o,t);toStove(t,{st:1});counterFront();lidRest(420,1182,0.75);hands(o);
 heatOut(830,940,990,t,0.5+0.5*no,300);
 const [px,py]=scr(TO_POT[0],980),[lx,ly]=scr(420,1150);g.restore();
 labelTag('SIN TAPA',Math.min(px,880),Math.max(py-170,640),E(t,s+0.4,0.4),C.red);
 labelTag('LA TAPA, AQUÍ',Math.max(lx,220),ly+120,E(t,s+0.9,0.4),C.blue);
 labelTag('«TOTAL, DA IGUAL»',540,1440,M.tot?E(t,M.tot,0.4)*(1-E(t,(M.no||s+99)-0.2,0.3)):0,C.amber);};
// pregunta temprana: enseña la tapa a cámara
ILL.to_pregunta=(c,t)=>{const s=c._s,M=c._m;const up=ease(E(t,s,0.6));
 g.save();cam(1.4,660,940);kitchen(t);
 const hx=lerp(760,790,up),hy=lerp(1120,870,up);
 const o=toP({rh:[hx,hy],lh:[520,1150],look:[0,0.1],mouth:'smile',brow:M.q&&t>M.q?1:0});
 person(o,t);toStove(t,{st:0.8});counterFront();potLid(hx,hy,0.75,-0.25*up);hands(o);g.restore();};
// mecanismo: sin tapa, el calor se va con el vapor y el fuego trabaja más
ILL.to_escapa=(c,t)=>{const s=c._s,M=c._m;const es=M.esc?E(t,M.esc-0.3,0.6):0.3;const fu=M.fue?E(t,M.fue-0.2,0.8):0;
 g.save();camLerp(t,s,6,[1.45,840,1000],[1.6,870,990]);kitchen(t);
 const o=toP({rh:[740,1140],lh:[520,1150],look:[0.8,-0.3],mouth:fu>0.5?'worry':'flat',brow:1});
 person(o,t);toStove(t,{st:0.6+0.4*es,fire:0.8+0.6*fu});counterFront();hands(o);
 heatOut(810,960,990,t,es,360);
 const [px,py]=scr(TO_POT[0],1150);g.restore();
 labelTag('🔥 EL CALOR SE VA CON EL VAPOR',540,650,M.esc?E(t,M.esc,0.4):0,C.red);
 costMeter(150,1330,220,fu,C.red);
 labelTag('MÁS FUEGO = MÁS GASTO',600,1440,fu,C.red);};
// con la tapa, el calor se queda dentro
ILL.to_tapar=(c,t)=>{const s=c._s,M=c._m;const kt=(M.tap||s+0.8);const t0=kt-0.6,land=kt+0.3;
 const mv=ease(E(t,t0,land-t0));const on=t>=land;const back=ease(E(t,land+0.6,0.5));const qu=M.que?E(t,M.que-0.2,0.6):0;const ap=M.apr?E(t,M.apr-0.2,0.5):0;
 g.save();camLerp(t,s,5,[1.35,760,980],[1.42,790,980]);kitchen(t);
 const hold=[lerp(790,TO_KNOB[0],mv),lerp(870,TO_KNOB[1],mv)];
 const rh=on?[lerp(TO_KNOB[0],760,back),lerp(TO_KNOB[1],1130,back)]:hold;
 const o=toP({rh,lh:[520,1150],look:on?[0.6,0.1]:[0.8,-0.2],mouth:'smile'});
 person(o,t);stockPot(...TO_POT,t,{lid:on?1:0});burner(TO_POT[0],1170,170,t,0.8);
 if(!on){steamPlume(TO_POT[0],1010,200,t,1-0.5*mv,360);steam(TO_POT[0],1010,t,0.8*(1-mv));}
 else{const w=1-E(t,land,0.8);steamPlume(TO_POT[0],1000,160,t,0.6*w,260);}
 counterFront();if(!on)potLid(hold[0],hold[1],0.75,lerp(-0.25,0,mv));
 trappedHeat(TO_POT[0],1085,190,110,t,on?Math.max(qu,0.5*E(t,land,0.5)):0);hands(o);
 g.restore();
 labelTag('🍲 CON TAPA',540,650,on?E(t,land,0.4):0,C.amber);
 labelTag('EL CALOR SE QUEDA DENTRO',540,735,qu,C.green);
 costMeter(150,1330,220,on?1-0.65*ap:0,C.green);
 labelTag('LO APROVECHAS MEJOR',600,1440,ap,C.green);};
// qué hacer: el fondo de la olla, un poco más grande que el fuego
ILL.to_tamano=(c,t)=>{const s=c._s,M=c._m;ILL.cocina_fondo(c,t);g.fillStyle='rgba(6,10,20,0.25)';g.fillRect(0,470,W,1150);
 const a1=ease(E(t,s+0.2,0.5)),a2=M.gra?ease(E(t,M.gra-0.3,0.5)):0;const B=1255;
 if(a1>0){g.save();g.globalAlpha=a1;g.fillStyle='#151b28';rr(150,B+6,300,16,6);g.fill();stockPot(300,B-14,0.45,t,{lid:1});burner(300,B,230,t,1);sideLick(246,354,B-14,140,t,1);g.restore();}
 if(a2>0){g.save();g.globalAlpha=a2;g.fillStyle='#151b28';rr(630,B+6,300,16,6);g.fill();stockPot(780,B-14,0.75,t,{lid:1});burner(780,B,150,t,0.8);trappedHeat(780,B-80,190,110,t,0.8);g.restore();}
 labelTag('IDAE: EL FONDO, UN POCO MÁS GRANDE',540,650,M.fon?E(t,M.fon-0.2,0.4):0,C.amber);
 labelTag('✕ PEQUEÑA: EL CALOR SE ESCAPA',300,1360,a1>0.9?E(t,s+0.8,0.4):0,C.red);
 labelTag('✓ UN POCO MÁS GRANDE',780,1440,a2>0.9?E(t,M.gra+0.2,0.4):0,C.green);};
