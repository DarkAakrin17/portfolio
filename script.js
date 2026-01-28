// Scroll Reveal
document.querySelectorAll('.glass, .card').forEach(el => {
  const reveal = () => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.classList.add('reveal');
    }
  };
  window.addEventListener('scroll', reveal);
  reveal();
});

// Theme Toggle
const toggleBtn = document.getElementById('themeToggle');
toggleBtn.onclick = () => {
  document.body.classList.toggle('light');
  toggleBtn.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
};

// Skill Bars
document.querySelectorAll('.fill').forEach(fill => {
  setTimeout(() => fill.style.width = fill.dataset.level + '%', 800);
});

// Project Modal
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
document.querySelectorAll('.project-card').forEach(card => {
  card.onclick = () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modal.style.display = 'flex';
  };
});
document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';

// Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let w,h,particles=[];
function resize(){ w=canvas.width=innerWidth; h=canvas.height=innerHeight; }
resize(); window.onresize=resize;

for(let i=0;i<80;i++) particles.push({x:Math.random()*w,y:Math.random()*h,dx:Math.random()-0.5,dy:Math.random()-0.5,r:Math.random()*2+1});

function animate(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{
    p.x+=p.dx; p.y+=p.dy;
    if(p.x<0||p.x>w) p.dx*=-1;
    if(p.y<0||p.y>h) p.dy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(0,242,255,0.3)';
    ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
