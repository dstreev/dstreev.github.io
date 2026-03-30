// ---- Navigation scroll effect ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ---- Mobile menu ----
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ---- Install tabs ----
function switchTab(tabName) {
  document.querySelectorAll('.install-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.install-content').forEach(c => c.classList.remove('active'));
  document.getElementById('tab-' + tabName).classList.add('active');
  event.currentTarget.classList.add('active');
}

// ---- Copy code blocks ----
function copyCode(btn) {
  const code = btn.closest('.code-block').querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ---- Scroll animations (Apple-style reveals) ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-animate], .section-reveal, .stagger-children')
  .forEach(el => observer.observe(el));

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    }
  });
});

// ---- Hero floating particles ----
(function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(p);
  }
})();

// ---- Parallax on hero screenshot ----
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-screenshot');
  if (hero && window.scrollY < window.innerHeight) {
    hero.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  }
});

// ---- Counter animation (utility) ----
function animateCounter(el, target, duration) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ---- Image carousel ----
function goToSlide(carouselId, index) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// Auto-advance carousels
document.querySelectorAll('.carousel').forEach(carousel => {
  let current = 0;
  const slides = carousel.querySelectorAll('.carousel-slide');
  if (slides.length <= 1) return;
  setInterval(() => {
    current = (current + 1) % slides.length;
    goToSlide(carousel.id, current);
  }, 5000);
});
