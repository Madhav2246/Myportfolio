// starfield.js — Custom Galaxy Particles
const canvas = document.getElementById("stars-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
const numStars = 120;

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.2,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < numStars; i++) {
    const star = stars[i];
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0ff";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#0ff";
    ctx.fill();
  }

  // Draw lines
  for (let i = 0; i < numStars; i++) {
    for (let j = i + 1; j < numStars; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = "rgba(0,255,255," + (1 - dist / 100) + ")";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  updateStars();
  requestAnimationFrame(drawStars);
}

function updateStars() {
  for (let i = 0; i < numStars; i++) {
    stars[i].x += stars[i].dx;
    stars[i].y += stars[i].dy;

    if (stars[i].x < 0 || stars[i].x > canvas.width) stars[i].dx *= -1;
    if (stars[i].y < 0 || stars[i].y > canvas.height) stars[i].dy *= -1;
  }
}

// React to mouse
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

drawStars();

// Resize canvas
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
