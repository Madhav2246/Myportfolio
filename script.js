// 💫 Preloader
window.addEventListener("load", () => {
  document.getElementById("preloader").style.display = "none";
});

// 🎧 Music Toggle
const musicBtn = document.getElementById("music-toggle");
const music = document.getElementById("bg-music");
let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.textContent = "🔊";
  } else {
    music.play();
    musicBtn.textContent = "🔇";
  }
  isPlaying = !isPlaying;
});

// 🖱️ Cursor & Chips
const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
  moveChips(e.clientX, e.clientY);
});

const chipsContainer = document.getElementById('chips-container');
const chips = [];

for (let i = 0; i < 15; i++) {
  const chip = document.createElement('div');
  chip.classList.add('chip');
  chip.style.top = `${Math.random() * 100}%`;
  chip.style.left = `${Math.random() * 100}%`;
  chipsContainer.appendChild(chip);
  chips.push(chip);
}

function moveChips(x, y) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  chips.forEach((chip, i) => {
    const offsetX = (x - centerX) / (25 - i * 0.8);
    const offsetY = (y - centerY) / (25 - i * 0.8);
    chip.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
}

// 🔤 Typing Animation
const typingText = document.getElementById('typing-text');
const roles = [
  "AI Enthusiast 💻",
  "Creative Thinker 🧠",
  "Web Wizard 🌐",
  "Visionary Developer 🚀"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  if (deleting) {
    typingText.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  } else {
    typingText.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length + 10) {
      deleting = true;
    }
  }
  setTimeout(typeEffect, 100);
}

typeEffect();
// 🧠 Scroll Reveal Animation
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
sections.forEach(sec => observer.observe(sec));
// 🖥️ Animate Terminal Lines on Scroll
const terminalLines = document.querySelectorAll(".terminal p");
const terminalSection = document.getElementById("about");
let revealed = false;

const termObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !revealed) {
    revealed = true;
    terminalLines.forEach((line, i) => {
      line.style.opacity = "0";
      setTimeout(() => {
        line.style.opacity = "1";
        line.style.transition = "opacity 0.5s";
      }, i * 600);
    });
  }
}, { threshold: 0.2 });

termObserver.observe(terminalSection);

// 📬 EmailJS Contact Form
const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
    .then(() => {
      status.textContent = "✅ Message sent!";
      status.style.color = "#0f0";
      form.reset();
    }, (err) => {
      status.textContent = "❌ Failed. Try again.";
      status.style.color = "#f33";
      console.error(err);
    });
});
// 🔢 Counter Animation
const counters = document.querySelectorAll('.counter');
let counted = false;

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      counters.forEach(counter => {
        let start = 0;
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16);

        const updateCounter = () => {
          start += step;
          if (start < target) {
            counter.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        updateCounter();
      });
    }
  });
}, { threshold: 0.3 });

counters.forEach(counter => counterObserver.observe(counter));
// 🎖️ Certification Carousel Scroll
const certScroll = document.getElementById("cert-scroll");
document.getElementById("cert-left").addEventListener("click", () => {
  certScroll.scrollBy({ left: -300, behavior: "smooth" });
});
document.getElementById("cert-right").addEventListener("click", () => {
  certScroll.scrollBy({ left: 300, behavior: "smooth" });
});
// 🌗 Theme Toggle Logic
const themeSwitch = document.getElementById("themeSwitch");
const body = document.body;

// Load theme from localStorage
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
  themeSwitch.checked = true;
}

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light-theme");
    localStorage.setItem("theme", "dark");
  }
});
// 🤖 Chat Assistant
const toggleBtn = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const chatContent = document.getElementById("chat-content");

toggleBtn.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
});

chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    const msg = chatInput.value.trim();
    chatContent.innerHTML += `<div class="msg user">${msg}</div>`;
    chatInput.value = "";
    setTimeout(() => {
      const reply = getReply(msg.toLowerCase());
      chatContent.innerHTML += `<div class="msg ai">${reply}</div>`;
      chatContent.scrollTop = chatContent.scrollHeight;
    }, 600);
  }
});

function getReply(message) {
  if (message.includes("project")) return "I’ve built AI tutors, biometric systems, and more!";
  if (message.includes("skills")) return "Python, React, Node.js, MongoDB, and space itself 🪐";
  if (message.includes("contact")) return "Use the form below or reach me on LinkedIn!";
  return "I'm still learning 🤖. Ask about my projects, skills, or certifications!";
}
// 🕹️ Konami Code Easter Egg
const konamiCode = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "b", "a"
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateSecret();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateSecret() {
  const div = document.createElement("div");
  div.innerHTML = "🧙 You've unlocked Madhav's Secret Level!";
  div.style.position = "fixed";
  div.style.top = "50%";
  div.style.left = "50%";
  div.style.transform = "translate(-50%, -50%)";
  div.style.background = "#0ff";
  div.style.color = "#000";
  div.style.padding = "20px";
  div.style.fontSize = "1.5rem";
  div.style.border = "2px solid #000";
  div.style.zIndex = 10000;
  div.style.boxShadow = "0 0 20px #0ff";
  div.style.animation = "pulse 2s infinite";
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}
