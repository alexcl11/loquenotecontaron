// ===== Escenas: ventilar en invierno (2026-11-05) · kit en ill13.js (usa cfSalon/cfP/scr/coinsFrom de ill_20261029.js) =====
// salón con radiador, termostato y ventana de dos hojas. Devuelve las manillas de la ventana
function vnSalon(t,o={}){cfSalon(t,{temp:o.temp??21,heat:o.heat??0.6,off:o.off,glow:o.glow,lamp:o.lamp});return salonWin(t,o.win||{});}
function vnStand(o){return Object.assign({x:400,y:1160,apron:false,shirt:'#3d7bff'},o);}
function vnDim(a=0.62){g.fillStyle=`rgba(6,10,20,${a})`;g.fillRect(0,470,W,1150);}
// gancho: cierra la ventana para que no se escape el calor
ILL.vn_gancho=(c,t)=>{const s=c._s,M=c._m;const cls=ease(E(t,s+0.2,0.9));const op=0.75*(1-cls);
 g.save();camLerp(t,s,4,[1.45,330,930],[1.3,380,960]);
 const h=vnSalon(t,{heat:0.8,win:{open:op}});
 const reach=1-ease(E(t,s+1.3,0.5));const o=vnStand({lh:reach>0.05?[lerp(300,h.r[0],reach),lerp(1080,h.r[1],reach)]:[300,1080],rh:[440,1100],look:[-0.8*reach,-0.2],mouth:M.pro&&t>M.pro?'o':'flat',brow:M.pro&&t>M.pro?1:0});
 person(o,t);scarf(o,t,'#e5484d');hands(o);sofa(...SOFA);
 if(cls>0.95)emoji('🔒',VW[0]+VW[2]/2,VW[1]+70,46,E(t,s+1.2,0.3));
 const [wx,wy]=scr(VW[0]+VW[2],VW[1]+40);g.restore();
 labelTag('«QUE SE ESCAPA EL CALOR»',Math.min(wx+230,800),wy-10,E(t,s+1.4,0.4),C.amber);};
// la ventana entreabierta toda la mañana… con la calefacción encendida
ILL.vn_rendija=(c,t)=>{const s=c._s,M=c._m;const ti=M.ent?E(t,M.ent-0.3,0.6):0;const ca=M.cal?E(t,M.cal,0.4):0;
 g.save();camLerp(t,s,6,[1.2,380,960],[1.3,360,950]);
 vnSalon(t,{heat:0.85,win:{tilt:ti}});wallClock(560,700,46,t,M.man&&t>M.man?2.5:0.05);
 heatFlow(200,1060,200,650,t,ti*0.9,6);
 const o=cfP({x:520,y:1262,shirt:'#c0504d',rh:[610,1150],lh:[450,1160],look:[-0.6,-0.3],mouth:'smile'});person(o,t);jerseyCollar(o,t);hands(o);sofa(...SOFA);
 if(ca>0){g.save();g.globalAlpha=cl(ca*3);g.strokeStyle=C.red;g.lineWidth=6;g.beginPath();g.ellipse(150,1180,150,110+5*Math.sin(t*7),0,0,7);g.stroke();g.restore();}
 const [wx,wy]=scr(VW[0]+VW[2],VW[1]+20),[rx,ry]=scr(150,1290),[cx,cy]=scr(560,760);g.restore();
 labelTag('ENTREABIERTA',wx+150,wy,ti,C.blue);if(M.man)labelTag('⏱  HORAS',cx,cy+30,E(t,M.man,0.4),C.amber);labelTag('CALEFACCIÓN ENCENDIDA',Math.max(rx+60,260),Math.min(ry+20,1480),ca,C.red);};
// así se pierde más: las paredes se enfrían y volver a calentarlas cuesta
ILL.vn_paredes=(c,t)=>{const s=c._s,M=c._m;const ch=M.par?ease(E(t,M.par-0.3,1.6)):0;const vo=M.vol?E(t,M.vol-0.2,0.5):0;
 g.save();camLerp(t,s,6,[1.15,420,980],[1.22,400,970]);
 vnSalon(t,{heat:0.85+0.15*vo,win:{tilt:1}});heatFlow(200,1060,200,650,t,0.8,6);
 wallChill(155,740,ch,t,430);
 workFx(50,1105,200,150,t,vo);
 const o=cfP({x:520,y:1262,shirt:'#c0504d',rh:[610,1150],lh:[450,1160],look:[-0.6,-0.2],mouth:ch>0.5?'worry':'flat',brow:ch>0.5?1:0});person(o,t);scarf(o,t,'#3d7bff');hands(o);sofa(...SOFA);shiverFx(o.x,900,t,ch*0.9);
 const [px,py]=scr(300,700),[rx,ry]=scr(150,1100);
 if(M.pag)coinsFrom(150,1100,t,M.pag-0.2,7,820,700);
 g.restore();
 labelTag('❄  PAREDES FRÍAS',px+120,py-20,M.par?E(t,M.par,0.4):0,C.blue);labelTag('CALEFACCIÓN EXTRA',rx+250,ry+150,vo,C.red);};
// lo recomendado: de par en par, poco rato; ventanas opuestas + puertas abiertas = 1,5 min
ILL.vn_cruzada=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);salon(t,{lamp:0.5});sofa(...SOFA);g.restore();vnDim(0.7);
 const wl=M.abr?E(t,M.abr-0.1,0.6):0,wr=M.opu?E(t,M.opu-0.2,0.6):0,dr=M.pue?E(t,M.pue-0.3,0.7):0;const fl=Math.min(wl,wr)*(0.3+0.7*dr);
 floorPlan(140,720,800,500,t,{wl,wr,doors:dr,flow:fl});
 const a1=M.abr?E(t,M.abr,0.4)*(1-E(t,(M.opu||s+99)-0.3,0.3)):0;labelTag('DE PAR EN PAR · POCO RATO',540,660,a1,C.amber);
 labelTag('VENTANAS OPUESTAS + PUERTAS ABIERTAS',540,660,M.opu?E(t,M.opu,0.4):0,C.blue);
 if(M.min){const p=E(t,M.min-0.2,0.5);stopwatch(540,1340,82,ease(E(t,M.min,1.4)),'1,5 min',C.blue,p*3);}
 txt('CENEAM · Ministerio para la Transición Ecológica',540,1475,26,C.gray,700,'center',E(t,s+0.5,0.5));};
// IDAE: unos 10 minutos; y con los radiadores apagados
ILL.vn_apagar=(c,t)=>{const s=c._s,M=c._m;const op=ease(E(t,s,0.7));const off=M.apa?E(t,M.apa,0.3):0;const reach=M.apa?ease(E(t,M.apa-0.9,0.6)):0;
 g.save();camLerp(t,s,6,[1.15,420,980],[1.2,440,980]);
 vnSalon(t,{heat:0.7*(1-off),off:off>0.5,temp:21,win:{open:op}});coldIn(430,700,t,op,1,190);
 const o=vnStand({x:520,shirt:'#2fa58f',rh:[lerp(620,610,reach),lerp(1110,915,reach)],lh:[430,1110],look:[0.7*reach,-0.3*reach],mouth:'smile'});person(o,t);hands(o);sofa(...SOFA);
 if(off>0){g.save();g.globalAlpha=cl(off*3);g.strokeStyle=C.green;g.lineWidth=6;g.beginPath();g.arc(CF_TH[0],CF_TH[1],80+4*Math.sin(t*7),0,7);g.stroke();g.restore();}
 const [tx,ty]=scr(CF_TH[0],CF_TH[1]);g.restore();
 if(M.diez){const p=E(t,M.diez-0.2,0.4);stopwatch(880,700,78,ease(E(t,M.diez,1.6)),'~10 min',C.blue,p*3);labelTag('BASTA PARA RENOVAR EL AIRE',700,820,M.ren?E(t,M.ren,0.4):0,C.blue);}
 labelTag('RADIADORES APAGADOS',Math.min(tx+80,840),ty+120,off,C.green);
 txt('IDAE, Guía Práctica de la Energía (citada por Selectra)',540,1475,26,C.gray,700,'center',M.diez?E(t,M.diez,0.5):0);};
// coste en un invierno (estimación de Selectra): de par en par vs oscilobatiente
function vnJar(x,fill,mode,t,a,title,sub,price,pa,pcol){g.save();g.globalAlpha=a;miniWin(x,740,0.75,mode,t);txt(title,x,880,34,'#fff',900,'center',1,420);txt(sub,x,925,26,'#c9d1e0',700,'center',1,420);
 coinJar(x,1300,1.3,fill,t);g.restore();if(pa>0)txt(price,x,1380,72,pcol,900,'center',cl(pa*3)*a);}
ILL.vn_coste=(c,t)=>{const s=c._s,M=c._m;g.save();cam(1,540,1050);salon(t,{lamp:0.5});sofa(...SOFA);g.restore();vnDim(0.72);
 const st2=c.stage===2;
 const f1=st2?1:(M.par?ease(E(t,M.par,1.6)):0);const f2=st2&&M.die?ease(E(t,M.die-0.8,1.4)):0;
 vnJar(300,0.27*f1,'open',t,1,'DE PAR EN PAR','5 min · 2 o 3 veces al día','4–6 €',st2?1:(M.eur?E(t,M.eur-0.3,0.4):0),C.green);
 vnJar(780,0.8*f2,'tilt',t,st2?1:0.35,'OSCILOBATIENTE','abierto 8 h al día','16 €',f2>0.6?E(t,M.die,0.4):0,C.red);
 if(f1>0&&f1<1)coin(300,lerp(1000,1150,(t*1.6)%1),1.1,t*6);if(f2>0&&f2<1)coin(780,lerp(1000,1150,(t*2)%1),1.1,t*6);
 if(st2&&M.par)labelTag('Y SIN CONTAR LAS PAREDES FRÍAS',540,1460,E(t,M.par,0.4),C.red);
 else txt('Habitación de 20 m² en Madrid · gas · 120 días de calefacción · estimación de Selectra',540,1470,24,C.gray,700,'center',E(t,s+0.4,0.5),980);};
// no ventilar: humedad en el cristal y hongos
ILL.vn_moho=(c,t)=>{const s=c._s,M=c._m;const hu=M.hum?ease(E(t,M.hum-0.4,1.6)):0;const ho=M.hon?ease(E(t,M.hon-0.3,1.6)):0;
 g.save();camLerp(t,s,5,[1.6,200,820],[1.85,180,800]);
 vnSalon(t,{heat:0,win:{fog:0.15+0.85*hu,snow:0.6}});cornerMold(285,610,ho,t);cornerMold(0,890,ho*0.8,t+3);
 const [mx,my]=scr(300,640),[gx,gy]=scr(155,900);g.restore();
 labelTag('💧  HUMEDAD',gx,gy+40,M.hum?E(t,M.hum,0.4):0,C.blue);labelTag('HONGOS',Math.min(mx+120,900),my+60,M.hon?E(t,M.hon,0.4):0,C.red);};
// resumen: de par en par, poco rato, calefacción apagada… y luego cierras y la enciendes
ILL.vn_consejos=(c,t)=>{const s=c._s,M=c._m;const ci=M.cie||s+99;const op=M.par?ease(E(t,M.par-0.3,0.6))*(1-ease(E(t,ci-0.2,0.6))):0;
 const off=M.apa?E(t,M.apa-0.2,0.3)*(1-E(t,ci+0.9,0.3)):0;
 g.save();cam(1.12,420,980);
 const h=vnSalon(t,{heat:0.75*(1-off),off:off>0.5,temp:21,win:{open:op}});coldIn(430,700,t,op,1,190);
 const near=(M.par?Math.sin(Math.PI*E(t,M.par-0.8,1.2)):0)+(Math.sin(Math.PI*E(t,ci-0.8,1.2)));
 const o=vnStand({shirt:'#3d7bff',lh:near>0.05?[lerp(300,h.r[0],cl(near)),lerp(1080,h.r[1],cl(near))]:[300,1090],rh:[460,1100],look:[-0.7*cl(near),-0.2],mouth:'smile'});
 person(o,t);hands(o);sofa(...SOFA);
 if(M.poc)stopwatch(155,560,52,ease(E(t,M.poc,1.5)),'',C.blue,E(t,M.poc,0.3)*(1-E(t,ci,0.3)));
 g.restore();
 [['①  DE PAR EN PAR',M.par,C.amber],['②  POCO RATO',M.poc,C.blue],['③  CALEFACCIÓN APAGADA',M.apa,C.green],['④  CIERRAS Y ENCIENDES',M.cie,C.amber]].forEach(([l,m,col],i)=>labelTag(l,830,700+i*82,m?E(t,m,0.4):0,col));};
