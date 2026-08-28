(function(){
  "use strict";

  /* ----------------------------------------------------------
     CENTRALIZED CONTENT CONFIG
     Edit values here to update the site — most components read
     structural data from these objects rather than hard-coding
     repeated markup logic (filters, theme, validation rules).
     ---------------------------------------------------------- */
  const CONFIG = {
    name: "Jorge",
    theme: { default: "dark" } // no localStorage in this preview; persists in-memory for the session only
  };

  /* ---------------- Theme toggle (in-memory, no storage APIs) --------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  root.setAttribute('data-theme', CONFIG.theme.default);

  function applyTheme(t){
    root.setAttribute('data-theme', t);
    themeToggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  applyTheme(CONFIG.theme.default);

  themeToggle.addEventListener('click', function(){
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------------- Sticky nav shadow on scroll --------------- */
  const navbar = document.getElementById('navbar');
  function onScroll(){
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile menu --------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', function(){
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------------- Scroll reveal --------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------------- Project filtering --------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projectGrid .project-card');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(function(card){
        const cats = card.getAttribute('data-cat').split(' ');
        const show = filter === 'all' || cats.indexOf(filter) !== -1;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------------- Contact form validation --------------- */
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  function setError(id, msg){
    const el = document.getElementById('err-' + id);
    if (el) el.textContent = msg || '';
  }

  function validate(){
    let ok = true;
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name){ setError('name', 'Please enter your name.'); ok = false; } else setError('name');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)){ setError('email', 'Please enter a valid email.'); ok = false; } else setError('email');
    if (!subject){ setError('subject', 'Please add a subject.'); ok = false; } else setError('subject');
    if (!message || message.length < 10){ setError('message', 'Message should be at least 10 characters.'); ok = false; } else setError('message');

    return ok;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    success.classList.remove('show');
    if (validate()){
      success.classList.add('show');
      form.reset();
      setTimeout(function(){ success.classList.remove('show'); }, 6000);
    }
  });

  /* ---------------- Certificate modal --------------- */
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalOpenTab = document.getElementById('certModalOpenTab');
  const certModalClose = document.getElementById('certModalClose');
  const certModalBackdrop = document.getElementById('certModalBackdrop');
  const certViewBtns = document.querySelectorAll('.cert-view-btn');
  let lastFocusedEl = null;

  function openCertModal(imgSrc, title){
    lastFocusedEl = document.activeElement;
    certModalImg.src = imgSrc;
    certModalImg.alt = title ? (title + ' — certificate image') : 'Certificate image';
    certModalTitle.textContent = title || 'Certificate';
    certModalOpenTab.href = imgSrc;
    certModal.hidden = false;
    document.body.style.overflow = 'hidden';
    // allow the browser to paint hidden->flex before animating in
    requestAnimationFrame(function(){
      requestAnimationFrame(function(){ certModal.classList.add('open'); });
    });
    certModalClose.focus();
  }

  function closeCertModal(){
    certModal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function(){
      certModal.hidden = true;
      certModalImg.src = '';
    }, 260);
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function'){
      lastFocusedEl.focus();
    }
  }

  certViewBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      openCertModal(btn.getAttribute('data-cert-img'), btn.getAttribute('data-cert-title'));
    });
  });

  certModalClose.addEventListener('click', closeCertModal);
  certModalBackdrop.addEventListener('click', closeCertModal);

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && !certModal.hidden){
      closeCertModal();
    }
  });
})();
