const canvas = document.getElementById('particles');
if (canvas) { 
  const ctx = canvas.getContext('2d');
  let w, h;
  function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  window.addEventListener('resize', resize); resize();
  const count = 120;
  const particles = Array.from({length:count}, () => ({
    x: Math.random()*w,
    y: Math.random()*h,
    vx: (Math.random()-0.5)*0.7,
    vy: (Math.random()-0.5)*0.7
  }));
  const color = getComputedStyle(document.documentElement).getPropertyValue('--particle') || 'rgba(255,221,0,0.9)';
  const maxDist = 120;
  (function draw(){
    ctx.clearRect(0,0,w,h);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(p.x,p.y,3,0,Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    for(let i=0;i<count;i++){
      for(let j=i+1;j<count;j++){
        const a = particles[i], b = particles[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.hypot(dx,dy);
        if(dist < maxDist){
          ctx.strokeStyle = `rgba(255,221,0,${0.5 - dist/maxDist*0.5})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(a.x,a.y);
          ctx.lineTo(b.x,b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  })();
}
