// ===== Title: advanced drop letters =====
const titleEl = document.getElementById('title');
const titleText = 'Networking & IT Student';
[...titleText].forEach((ch, i) => {
  const s = document.createElement('span');
  s.textContent = ch;
  s.className = 'drop';
  s.style.animation = `drop 800ms cubic-bezier(.2,.8,0,1) forwards`;
  s.style.animationDelay = `${i * 55}ms`;
  titleEl.appendChild(s);
});

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=> e.isIntersecting && e.target.classList.add('in'));
}, {threshold:.12});
document.querySelectorAll('.reveal, section').forEach(el=>io.observe(el));

// ===== Nav spy =====
const links = [...document.querySelectorAll('header nav a[href^="#"]')];
const secs = links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const spy = new IntersectionObserver((ents)=>{
  ents.forEach(ent=>{
    if(ent.isIntersecting){
      links.forEach(a=>a.classList.toggle('active', a.getAttribute('href') === '#' + ent.target.id));
    }
  })
}, {rootMargin:'-50% 0px -45% 0px'});
secs.forEach(s=>spy.observe(s));

// ===== Particles background =====
const cvs = document.getElementById('fx');
const ctx = cvs.getContext('2d');
let W=0,H=0, dots=[]; const N=80;
const resize=()=>{ W=window.innerWidth; H=window.innerHeight; cvs.width=W; cvs.height=H; }
window.addEventListener('resize', resize); resize();
for(let i=0;i<N;i++) dots.push({x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25});
function draw(){
  ctx.clearRect(0,0,W,H);
  for(const d of dots){
    d.x+=d.vx; d.y+=d.vy;
    if(d.x<0||d.x>W) d.vx*=-1; if(d.y<0||d.y>H) d.vy*=-1;
    ctx.beginPath(); ctx.arc(d.x,d.y,1.1,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,.55)'; ctx.fill();
  }
  for(let i=0;i<N;i++){
    for(let j=i+1;j<N;j++){
      const dx=dots[i].x-dots[j].x, dy=dots[i].y-dots[j].y; const dist=dx*dx+dy*dy;
      if(dist< 120*120){
        ctx.strokeStyle=`rgba(122,140,255,${1 - dist/(120*120)})`;
        ctx.lineWidth=.3; ctx.beginPath(); ctx.moveTo(dots[i].x,dots[i].y); ctx.lineTo(dots[j].x,dots[j].y); ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

// ===== Interactive Projects: Modal viewer =====
const dlg = document.getElementById('viewer');
const mTitle = document.getElementById('m-title');
const mSummary = document.getElementById('m-summary');
const mPoints = document.getElementById('m-points');
const mDemo = document.getElementById('m-demo');
const mRepo = document.getElementById('m-repo');
const mVisual = document.getElementById('m-visual');

document.querySelectorAll('.proj-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const title = card.dataset.title;
    const summary = card.dataset.summary;
    const points = JSON.parse(card.dataset.points || '[]');
    const demo = card.dataset.demo || '#';
    const repo = card.dataset.repo || '#';

    mTitle.textContent = title;
    mSummary.textContent = summary;
    mPoints.innerHTML = '';
    points.forEach(p=>{ const li=document.createElement('li'); li.textContent=p; mPoints.appendChild(li); });
    mDemo.href = demo; mRepo.href = repo;

    // Visual theme from the card
    const vis = card.querySelector('.proj-visual');
    const bg = getComputedStyle(vis).backgroundImage;
    mVisual.style.backgroundImage = bg;

    if(typeof dlg.showModal === 'function'){ dlg.showModal(); }
    else { dlg.setAttribute('open',''); }
  });
});

document.getElementById('m-close').addEventListener('click', ()=> dlg.close());
dlg.addEventListener('click', (e)=>{ if(e.target === dlg) dlg.close(); });
window.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && dlg.open) dlg.close(); });

// ===== Smooth anchor scroll offset (fixed header) =====
const HEADER_H = 64;
const scrollToWithOffset = (el)=>{
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_H + 1;
  window.scrollTo({ top:y, behavior:'smooth' });
};
document.querySelectorAll('header nav a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(el){ e.preventDefault(); scrollToWithOffset(el); }
  })
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
