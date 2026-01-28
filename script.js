// ===============================
// SAFE SCRIPT.JS (GitHub Pages)
// ===============================

// -------- Scroll Reveal --------
(function () {
  const revealElements = document.querySelectorAll('.glass, .card');
  if (!revealElements.length) return;

  function revealOnScroll() {
    revealElements.forEach(el => {
      try {
        if (el.getBoundingClientRect().top < window.innerHeight - 80) {
          el.classList.add('reveal');
        }
      } catch (e) {
        console.warn('Reveal error:', e);
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
})();


// -------- Theme Toggle --------
(function () {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    toggleBtn.textContent =
      document.body.classList.contains('light') ? '🌞' : '🌙';
  });
})();


// -------- Project Modal --------
(function () {
  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.querySelector('.close-modal');

  if (!modal || !modalTitle || !modalDesc) return;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      try {
        modalTitle.textContent = card.dataset.title || '';
        modalDesc.textContent = card.dataset.desc || '';
        modal.style.display = 'flex';
      } catch (e) {
        console.warn('Modal error:', e);
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  modal.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });
})();


// -------- Particle Background (SAFE) --------
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;
  const particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5
    });
  }

  function animate() {
    try {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,242,255,0.25)';
        ctx.fill();
      });
      requestAnimationFrame(animate);
    } catch (e) {
      console.warn('Particles error:', e);
    }
  }

  animate();
})();
