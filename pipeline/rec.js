const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const fs=require('fs');const {spawn}=require('child_process');
(async()=>{const dir=process.argv[2];const mode=process.argv[3];
 const tl=JSON.parse(fs.readFileSync(dir+'/timeline.json'));
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('file://'+__dirname+'/engine.html');await p.evaluate(x=>window.setTL(x),tl);await p.waitForTimeout(500);
 if(mode==='preview'){const ts=process.argv.slice(4).map(Number);fs.mkdirSync(dir+'/prev',{recursive:true});
  for(const t of ts){const d=await p.evaluate(t=>window.frame(t,0.8),t);fs.writeFileSync(`${dir}/prev/${String(t).padStart(6,'0')}.jpg`,Buffer.from(d,'base64'));}
 } else {const fps=30,N=Math.ceil(tl.T*fps);
  const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',''+fps,'-c:v','mjpeg','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium',dir+'/video.mp4']);
  for(let i=0;i<N;i++){const d=await p.evaluate(t=>window.frame(t,0.93),i/fps);if(!ff.stdin.write(Buffer.from(d,'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
  ff.stdin.end();await new Promise(r=>ff.on('close',r));console.log('video ok',dir);}
 await b.close();})();
