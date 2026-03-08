/* ============================================
   Edge AI Portfolio — Interactions & Animations
   ============================================ */

// ——— Dynamic Greeting based on time ———
const greetingEl = document.getElementById('greeting');
const hour = new Date().getHours();
if (hour < 12) greetingEl.textContent = 'Good morning';
else if (hour < 17) greetingEl.textContent = 'Good afternoon';
else greetingEl.textContent = 'Good evening';

// ——— Typing Effect ———
const roles = [
  'Edge AI Engineer',
  'Embedded AI Developer',
  'Computer Vision Specialist',
  'TensorRT Optimization',
  'Deep Learning Researcher',
  'Real-Time Inference Developer'
];

const typedEl = document.getElementById('typed-role');
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeLoop() {
  const current = roles[roleIdx];
  if (!isDeleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 70);
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 40);
  }
}
typeLoop();

// ——— Cursor Glow Follower ———
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateGlow() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateGlow);
}
animateGlow();

// ——— Scroll Progress Bar ———
const scrollProgress = document.getElementById('scrollProgress');

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateProgress, { passive: true });

// ——— Back to Top Button ———
const backToTop = document.getElementById('backToTop');

function updateBackToTop() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
}

window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ——— Scroll Reveal (Intersection Observer) ———
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-el').forEach(el => revealObserver.observe(el));

// ——— Skill Bar Animation ———
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      bar.style.width = bar.dataset.level + '%';
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-bar-fill').forEach(bar => barObserver.observe(bar));

// ——— Counter Animation ———
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 30));
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current + '+';
      }, 50);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// ——— Text Scramble Effect on Section Titles ———
class TextScrambler {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#_AIML';
    this.originalText = el.textContent;
    this.scrambled = false;
  }

  scramble() {
    if (this.scrambled) return;
    this.scrambled = true;
    const text = this.originalText;
    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      this.el.textContent = text.split('').map((char, i) => {
        if (i < iteration) return text[i];
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }).join('');

      iteration += 1 / 2;
      if (iteration >= maxIterations) {
        this.el.textContent = text;
        clearInterval(interval);
      }
    }, 30);
  }
}

const scrambleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target._scrambler) {
      entry.target._scrambler.scramble();
      scrambleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(el => {
  el._scrambler = new TextScrambler(el);
  scrambleObserver.observe(el);
});

// ——— Scroll Spy (Active Nav Link) ———
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function updateScrollSpy() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + id) {
          a.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateScrollSpy, { passive: true });
updateScrollSpy();

// ——— Theme Toggle ———
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggleBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// ——— Hamburger Menu ———
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
  });
});

// ——— 3D Tilt Effect on Glass Cards ———
const tiltCards = document.querySelectorAll('.skill-card, .stat-card, .contact-card');

tiltCards.forEach(card => {
  card.classList.add('tilt-card');

  // Add shine overlay
  const shine = document.createElement('div');
  shine.classList.add('tilt-shine');
  card.appendChild(shine);

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ——— Project Card Mouse Glow ———
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
  });
});

// ——— Magnetic Buttons ———
document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
  const btn = wrap.querySelector('.btn');
  if (!btn) return;

  wrap.addEventListener('mousemove', (e) => {
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  });

  wrap.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => { btn.style.transition = ''; }, 400);
  });
});

// ——— Project Filter with Count Badges ———
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Add count badges
filterBtns.forEach(btn => {
  const filter = btn.dataset.filter;
  let count;
  if (filter === 'all') {
    count = projectCards.length;
  } else {
    count = [...projectCards].filter(c => c.dataset.domain.split(' ').includes(filter)).length;
  }
  const badge = document.createElement('span');
  badge.className = 'count';
  badge.textContent = count;
  btn.appendChild(badge);
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.domain.split(' ').includes(filter)) {
        card.classList.remove('hidden');
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.classList.add('hidden');
        card.classList.remove('visible');
      }
    });
  });
});

// ——— Project Modal ———
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.querySelector('.close-modal');

projectCards.forEach(card => {
  card.addEventListener('click', () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modal.classList.add('show');
  });
});

closeModal.addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('show');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.remove('show');
});

// ——— Interactive Terminal ———
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const terminalCommands = {
  help: () => "Available commands: skills, projects, contact, location, focus, status, whoami, frameworks, hello, clear",
  skills: () => "['Computer_Vision', 'Deep_Learning', 'Edge_AI', 'RL', 'NLP', 'Software_Dev']",
  projects: () => `Total: ${projectCards.length} projects across Edge AI, CV, Healthcare, NLP, and Software`,
  contact: () => "📧 aakashkarthi2004@gmail.com  |  💻 github.com/DarkAakrin17",
  location: () => "'Chennai, India 🇮🇳'",
  focus: () => "['Edge_AI', 'Computer_Vision', 'Deep_Learning', 'Robotics']",
  status: () => "'Building AI at the edge 🚀'",
  whoami: () => "'Aakash Jayapaul — Edge AI & ML Engineer'",
  frameworks: () => "['PyTorch', 'TensorFlow', 'TFLite', 'TF.js', 'ONNX', 'OpenCV']",
  hello: () => {
    const h = new Date().getHours();
    if (h < 12) return "'Good morning! ☀️ Welcome to my portfolio.'";
    if (h < 17) return "'Good afternoon! 🌤️ Thanks for visiting.'";
    return "'Good evening! 🌙 Glad you stopped by.'";
  },
  clear: () => {
    terminalOutput.innerHTML = '';
    return null;
  }
};

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';

    if (!cmd) return;

    // Show the command
    const cmdLine = document.createElement('div');
    cmdLine.className = 'line terminal-output-line';
    cmdLine.innerHTML = `<span class="prompt">>>> </span>${cmd}`;
    terminalOutput.appendChild(cmdLine);

    // Process
    const handler = terminalCommands[cmd];
    let result;
    if (handler) {
      result = handler();
    } else {
      result = `NameError: command '${cmd}' not found. Try 'help'`;
    }

    if (result !== null && result !== undefined) {
      const outLine = document.createElement('div');
      outLine.className = 'line terminal-output-line';
      outLine.innerHTML = `<span class="output">${result}</span>`;
      terminalOutput.appendChild(outLine);
    }

    // Auto-scroll terminal
    terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
  }
});

// ——— Particle Network Background (Mouse-reactive) ———
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w, h;
const particles = [];
const PARTICLE_COUNT = 65;
const MAX_DIST = 140;
const MOUSE_DIST = 200;

let particleMouseX = -1000, particleMouseY = -1000;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

document.addEventListener('mousemove', (e) => {
  particleMouseX = e.clientX;
  particleMouseY = e.clientY;
});

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: Math.random() * 1.8 + 0.6,
    baseR: Math.random() * 1.8 + 0.6
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, w, h);

  // Draw connections between particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        const opacity = (1 - dist / MAX_DIST) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[j].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  // Draw connections to mouse
  particles.forEach(p => {
    const dx = p.x - particleMouseX;
    const dy = p.y - particleMouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_DIST) {
      const opacity = (1 - dist / MOUSE_DIST) * 0.3;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(particleMouseX, particleMouseY);
      ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Repel particles slightly from mouse
      const force = (MOUSE_DIST - dist) / MOUSE_DIST * 0.3;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;

      // Grow particle near mouse
      p.r = p.baseR + (1 - dist / MOUSE_DIST) * 2;
    } else {
      p.r += (p.baseR - p.r) * 0.05;
    }
  });

  // Draw and move particles
  particles.forEach(p => {
    // Dampen velocity
    p.vx *= 0.99;
    p.vy *= 0.99;

    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.fill();
  });

  // Draw mouse dot
  if (particleMouseX > 0 && particleMouseY > 0) {
    ctx.beginPath();
    ctx.arc(particleMouseX, particleMouseY, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(16, 185, 129, 0.5)';
    ctx.fill();
  }

  requestAnimationFrame(drawParticles);
}

drawParticles();

// ——— Timeline Expand/Collapse ———
document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('click', () => {
    const wasExpanded = item.classList.contains('expanded');
    // Collapse all
    document.querySelectorAll('.timeline-item.expanded').forEach(i => i.classList.remove('expanded'));
    // Toggle clicked
    if (!wasExpanded) item.classList.add('expanded');
  });
});
