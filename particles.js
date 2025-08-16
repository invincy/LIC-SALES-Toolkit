const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h;
  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  window.addEventListener('resize', resize); resize();
  const particles = Array.from({length:80}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    vx: (Math.random()-0.5)*0.7,
    vy: (Math.random()-0.5)*0.7
  }));
  const color = getComputedStyle(document.documentElement).getPropertyValue('--particle') || 'rgba(245,193,61,0.7)';
  (function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x,p.y,2,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}
