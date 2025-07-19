const matrix = document.getElementById("matrix");
const mctx = matrix.getContext("2d");

let w, h, cols, yPos = [];
function initMatrix(){
  w = matrix.width = window.innerWidth;
  h = matrix.height = window.innerHeight;
  cols = Math.floor(w / 20) + 1;
  yPos = Array(cols).fill(0);
}
function drawMatrix(){
  mctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  mctx.fillRect(0, 0, w, h);
  mctx.fillStyle = "#0f0";
  mctx.font = "20px monospace";
  yPos.forEach((y, i) => {
    const text = String.fromCharCode(0x30A0 + Math.random() * 96);
    mctx.fillText(text, i * 20, y);
    yPos[i] = y > h + Math.random() * 1000 ? 0 : y + 20;
  });
}
window.addEventListener("resize", initMatrix);
initMatrix();
setInterval(drawMatrix, 75);
