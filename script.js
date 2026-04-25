/* ============================================
   JEEVAN KS PORTFOLIO — SCRIPT.JS
   ============================================ */

// ── CUSTOM CURSOR ──────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX - 3 + 'px';
  cursorDot.style.top = mouseY - 3 + 'px';
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX - 16 + 'px';
  cursor.style.top = cursorY - 16 + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .social-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});


// ── MATRIX RAIN ───────────────────────────
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ</>{}[]';
const fontSize = 13;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(6, 10, 15, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00ff88';
  ctx.font = fontSize + 'px JetBrains Mono, monospace';

  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 55);
window.addEventListener('resize', () => {
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
});


// ── NAVBAR SCROLL ─────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ── HAMBURGER MENU ────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


// ── HERO TEXT ANIMATION ───────────────────
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  heroContent.style.opacity = '0';
  heroContent.style.transform = 'translateY(30px)';
  setTimeout(() => {
    heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    heroContent.style.opacity = '1';
    heroContent.style.transform = 'translateY(0)';
  }, 100);

  const heroImageWrap = document.querySelector('.hero-image-wrap');
  if (heroImageWrap) {
    heroImageWrap.style.opacity = '0';
    heroImageWrap.style.transform = 'translateX(30px)';
    setTimeout(() => {
      heroImageWrap.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
      heroImageWrap.style.opacity = '1';
      heroImageWrap.style.transform = 'translateX(0)';
    }, 200);
  }
});


// ── SKILL BARS (Intersection Observer) ───
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const target = fill.getAttribute('data-w');
      setTimeout(() => {
        fill.style.width = target + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


// ── SCROLL REVEAL ─────────────────────────
const revealEls = document.querySelectorAll(
  '.skill-card, .project-card, .social-card, .about-left, .about-right, .contact-item, .banner-inner'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transition = `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`;
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  revealObserver.observe(el);
});


// ── ACTIVE NAV LINKS ──────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) current = sec.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent-green)';
    }
  });
});


// ── SMOOTH SCROLL NAV ────────────────────
navAnchors.forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('open');
    }
  });
});


// ── CONTACT FORM ──────────────────────────
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Message Sent!';
    btn.style.background = '#00ff88';
    btn.style.color = '#060a0f';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.color = '';
      contactForm.reset();
    }, 3000);
  });
}


// ── GLITCH EFFECT ON HERO TITLE ──────────
const heroLines = document.querySelectorAll('.hero-title .line-1, .hero-title .line-2');
setInterval(() => {
  heroLines.forEach(line => {
    line.style.textShadow = `
      ${Math.random() * 6 - 3}px 0 rgba(0,255,136,0.6),
      ${Math.random() * 6 - 3}px 0 rgba(0,180,255,0.4)
    `;
    setTimeout(() => {
      line.style.textShadow = 'none';
    }, 80);
  });
}, 4000);


// ── TYPING EFFECT IN TERMINAL ─────────────
const termLines = document.querySelectorAll('.terminal-body .t-line');
const termObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      termLines.forEach((line, i) => {
        line.style.opacity = '0';
        setTimeout(() => {
          line.style.transition = 'opacity 0.3s ease';
          line.style.opacity = '1';
        }, i * 120);
      });
      termObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const termCard = document.querySelector('.terminal-card');
if (termCard) termObserver.observe(termCard);


// ── STATS COUNTER ANIMATION ───────────────
const statNums = document.querySelectorAll('.stat-num');
let counted = false;
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      statNums.forEach(el => {
        const val = el.textContent;
        if (!isNaN(parseInt(val))) {
          const end = parseInt(val);
          const suffix = val.replace(/[0-9]/g, '');
          let current = 0;
          const inc = end / 30;
          const timer = setInterval(() => {
            current = Math.min(current + inc, end);
            el.textContent = Math.round(current) + suffix;
            if (current >= end) clearInterval(timer);
          }, 40);
        }
      });
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);


// ── PROJECT CARD TILT ────────────────────
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
});
