(function(){
  var root=document.documentElement; if(!root.classList.contains('intro-on')) return;
  var el=document.getElementById('intro'), cv=document.getElementById('introRain'), term=document.getElementById('introText'), skip=document.getElementById('introSkip');
  var cx=cv.getContext('2d'), W,H,cols,drops,fs=18, glyphs='アイウエオカキクケコサシスセソ0123456789ABCDEF<>{}[]/*+-=', alive=true, ended=false;
  function size(){ W=cv.width=innerWidth; H=cv.height=innerHeight; cols=Math.ceil(W/fs); drops=[]; for(var i=0;i<cols;i++) drops.push(Math.random()*-40); }
  size(); addEventListener('resize',size);
  var last=0;
  function rain(t){
    if(!alive) return; requestAnimationFrame(rain);
    if(t-last<45) return; last=t;
    cx.fillStyle='rgba(2,6,4,.14)'; cx.fillRect(0,0,W,H);
    cx.font=fs+'px "JetBrains Mono",monospace';
    for(var i=0;i<cols;i++){
      var ch=glyphs.charAt(Math.floor(Math.random()*glyphs.length)), y=drops[i]*fs;
      cx.fillStyle='#d6ffe6'; cx.fillText(ch,i*fs,y);
      cx.fillStyle='#39ff88'; cx.fillText(glyphs.charAt(Math.floor(Math.random()*glyphs.length)),i*fs,y-fs);
      if(y>H && Math.random()>.975) drops[i]=0; drops[i]++;
    }
  }
  requestAnimationFrame(rain);

  var lines=['Wake up, visitor...','The portfolio has you.','Initializing jorge.dev ...','Access granted.'];
  var li=0, ci=0;
  function type(){
    if(ended) return;
    var txt=lines[li];
    if(ci<=txt.length){ term.innerHTML=txt.slice(0,ci)+'<span class="caret"></span>'; ci++; setTimeout(type,li===3?45:38); }
    else{ if(li<lines.length-1){ setTimeout(function(){ li++; ci=0; type(); }, li===0?600:450); } else setTimeout(end,700); }
  }
  setTimeout(type,500);

  function end(){
    if(ended) return; ended=true;
    el.classList.add('done');
    setTimeout(function(){ alive=false; root.classList.remove('intro-on'); }, 850);
  }
  skip.addEventListener('click',end);
  addEventListener('keydown',function(e){ if(e.key==='Escape'||e.key==='Enter'||e.key===' ') end(); });
})();