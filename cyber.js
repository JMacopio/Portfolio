(function(){
  "use strict";
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  /* code rain (low-key): hex + code symbols falling in columns */
  var cv=document.createElement('canvas'); cv.id='rain'; cv.setAttribute('aria-hidden','true'); document.body.prepend(cv);
  var cx=cv.getContext('2d'), dpr=1, cols=[], fs=16, W=0, H=0, glyphs='01{}[]();<>/=+-*&|#$%0123456789abcdef'.split('');
  function size(){ dpr=Math.min(devicePixelRatio||1,2); W=cv.width=innerWidth*dpr; H=cv.height=innerHeight*dpr; fs=15*dpr;
    var n=Math.ceil(W/fs); cols=[]; for(var i=0;i<n;i++) cols.push(Math.random()*H/fs); }
  addEventListener('resize',size); size();
  var last=0;
  function rain(t){
    if(t-last>55){ last=t;
      var light=root.getAttribute('data-theme')==='light';
      cx.fillStyle=light?'rgba(242,246,244,.12)':'rgba(5,8,10,.12)'; cx.fillRect(0,0,W,H);
      cx.font=fs+'px "JetBrains Mono",monospace';
      for(var i=0;i<cols.length;i++){
        if(Math.random()<.55){ cols[i]+=1; }  // slower, sparser than a movie matrix
        else continue;
        var ch=glyphs[(Math.random()*glyphs.length)|0];
        cx.fillStyle=light?'rgba(10,125,60,.9)':(Math.random()<.04?'rgba(180,255,210,.95)':'rgba(57,255,136,.75)');
        cx.fillText(ch,i*fs,cols[i]*fs);
        if(cols[i]*fs>H && Math.random()>.975) cols[i]=0;
      }
    }
    if(!reduce) requestAnimationFrame(rain);
  }
  if(!reduce) requestAnimationFrame(rain);

  /* hero: shell prompt, terminal window around the photo */
  var hi=document.querySelector('.hero-hi'); if(hi) hi.innerHTML='<span>$ whoami</span>';
  var av=document.querySelector('.hero-avatar'), badge=document.querySelector('.hero-badge');
  if(av){
    var win=document.createElement('div'); win.className='termwin';
    win.innerHTML='<div class="termbar"><i></i><i></i><i></i><span>jorge@portfolio:~$ cat profile.jpg</span></div>';
    av.parentNode.insertBefore(win,av); win.appendChild(av);
    var beam=document.createElement('div'); beam.className='scanbeam'; win.appendChild(beam);
    var sb=document.createElement('div'); sb.className='statusbar';
    sb.innerHTML='<span>status: <em>building</em></span><b>Anatomia 3D</b>';
    win.appendChild(sb); if(badge) badge.remove();
  }

  /* typing effect on the role line */
  var title=document.querySelector('.hero-title');
  if(title){
    var full=title.textContent.trim(); title.textContent='';
    if(reduce){ title.textContent=full; }
    else { var i=0; (function type(){ title.textContent=full.slice(0,i); if(i++<full.length) setTimeout(type,24); })(); }
  }

  /* section eyebrows read like paths */
  document.querySelectorAll('.section-head .eyebrow').forEach(function(e){ e.textContent='~/'+e.textContent.trim().toLowerCase().replace(/\s+/g,'-'); });

  /* ticker from skills */
  var hero=document.getElementById('home');
  if(hero){
    var names=[].slice.call(document.querySelectorAll('.skill-card .badge')).map(function(b){return b.textContent.trim();});
    names=names.filter(function(n,i){return n&&names.indexOf(n)===i;});
    names=names.map(function(n){return 'loaded module: '+n.toLowerCase().replace(/\s+/g,'_');});
    var t=document.createElement('div'); t.className='ticker'; t.setAttribute('aria-hidden','true');
    t.innerHTML='<div class="ticker-track">'+names.concat(names).map(function(n){return '<span>'+n+'</span>';}).join('')+'</div>'; hero.appendChild(t);
  }

  /* glitch the name on hover */
  var nm=document.querySelector('.hero-name');
  if(nm && !reduce) nm.addEventListener('mouseenter',function(){ nm.classList.remove('glitch'); void nm.offsetWidth; nm.classList.add('glitch'); });
})();