/* =============================================
   CYBERSECURITY PORTFOLIO — SCRIPT.JS
   ============================================= */

/* ── Apply saved color palette from admin ── */
(function applyAdminColors() {
  try {
    const saved = localStorage.getItem('portfolio_colors');
    if (!saved) return;
    const colors = JSON.parse(saved);
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, val]) => {
      if (val) root.style.setProperty(key, val);
    });
  } catch {}
})();

document.addEventListener('DOMContentLoaded', () => {
  initMatrixRain();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initContactForm();
  loadAllContent();
  setFooterYear();
});

/* ── MATRIX RAIN ── */
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|;:=+-*$#@!';
  const charArr = chars.split('');
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array.from({ length: columns }, () => Math.random() * -100);

  window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -100);
  });

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = charArr[Math.floor(Math.random() * charArr.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.globalAlpha = Math.random() * 0.5 + 0.1;
      ctx.fillText(char, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── NAVBAR ── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  // Scroll class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
  });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
  });

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      menu.classList.remove('open');
    }
  });
}

function updateActiveNav() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

/* ── TYPING EFFECT ── */
function initTypingEffect() {
  const element = document.getElementById('typing-text');
  if (!element) return;

  // Default taglines, will be overwritten by JSON
  let taglines = ['Cybersecurity', 'Ethical Hacking', 'Network Security', 'Penetration Testing'];
  let taglineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 40;
  const pauseTime = 2000;

  // Store taglines setter for JSON loading
  window._setTaglines = (newTaglines) => {
    taglines = newTaglines;
  };

  function type() {
    const current = taglines[taglineIndex];

    if (isDeleting) {
      element.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      speed = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation for grid items
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe reveal elements
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Re-observe when new content is loaded
  window._observeNewElements = () => {
    document.querySelectorAll('.skill-category, .project-card, .cert-card, .timeline-item').forEach((el, i) => {
      el.dataset.delay = i * 100;
      observer.observe(el);
    });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };
}

/* ── SKILL BAR ANIMATION ── */
function animateSkillBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach(fill => {
          const level = fill.dataset.level;
          setTimeout(() => {
            fill.style.width = level + '%';
          }, 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category').forEach(card => {
    observer.observe(card);
  });
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const subject = document.getElementById('form-subject').value;
    const message = document.getElementById('form-message').value;

    // Mailto fallback
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.location.href = mailtoLink;

    // Show success feedback
    const btn = form.querySelector('.form-submit');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="btn-icon">✓</span> Message Sent!';
    btn.style.borderColor = 'var(--neon-green)';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.borderColor = '';
      form.reset();
    }, 3000);
  });
}

/* ── LOAD ALL CONTENT FROM JSON ── */
async function loadAllContent() {
  try {
    const [profile, skills, projects, certificates, experience] = await Promise.all([
      fetchJSON('data/profile.json'),
      fetchJSON('data/skills.json'),
      fetchJSON('data/projects.json'),
      fetchJSON('data/certificates.json'),
      fetchJSON('data/experience.json')
    ]);

    if (profile) renderProfile(profile);
    if (skills) renderSkills(skills);
    if (projects) renderProjects(projects);
    if (certificates) renderCertificates(certificates);
    if (experience) renderTimeline(experience);

    // Re-observe newly added elements
    if (window._observeNewElements) {
      setTimeout(() => window._observeNewElements(), 100);
    }
    // Animate skill bars after rendering
    setTimeout(() => animateSkillBars(), 200);

  } catch (err) {
    console.error('Error loading content:', err);
  }
}

async function fetchJSON(path) {
  // Check localStorage for admin-saved overrides first
  const keyMap = {
    'data/profile.json': 'portfolio_profile',
    'data/skills.json': 'portfolio_skills',
    'data/projects.json': 'portfolio_projects',
    'data/certificates.json': 'portfolio_certificates',
    'data/experience.json': 'portfolio_experience'
  };
  const lsKey = keyMap[path];
  if (lsKey) {
    const stored = localStorage.getItem(lsKey);
    if (stored) {
      try { return JSON.parse(stored); } catch {}
    }
  }
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.json();
  } catch (err) {
    console.warn(`Could not load ${path}:`, err.message);
    return null;
  }
}

/* ── RENDER PROFILE ── */
function renderProfile(data) {
  const nameEl = document.getElementById('home-name');
  const titleEl = document.getElementById('home-title');
  const introEl = document.getElementById('home-intro');
  const bioEl = document.getElementById('about-bio');
  const imgEl = document.getElementById('profile-image');

  if (nameEl && data.name) nameEl.textContent = data.name;
  if (titleEl && data.title) titleEl.textContent = data.title;
  if (introEl && data.intro) introEl.textContent = data.intro;
  if (bioEl && data.bio) bioEl.textContent = data.bio;

  // Profile image — use placeholder if not set
  if (imgEl) {
    if (data.profileImage) {
      imgEl.src = data.profileImage;
    } else {
      imgEl.src = 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
          <rect width="300" height="300" fill="#12121f"/>
          <circle cx="150" cy="120" r="50" fill="#1a1a2e" stroke="#00ff41" stroke-width="2"/>
          <ellipse cx="150" cy="250" rx="80" ry="60" fill="#1a1a2e" stroke="#00ff41" stroke-width="2"/>
          <text x="150" y="310" text-anchor="middle" fill="#00ff41" font-family="monospace" font-size="12">profile.jpg</text>
        </svg>
      `);
      imgEl.alt = data.name || 'Profile';
    }
  }

  // Taglines for typing effect
  if (data.taglines && window._setTaglines) {
    window._setTaglines(data.taglines);
  }

  // Social links
  if (data.social) {
    const setLink = (id, url) => {
      const el = document.getElementById(id);
      if (el && url) el.href = url;
    };
    setLink('contact-email', `mailto:${data.social.email}`);
    setLink('contact-linkedin', data.social.linkedin);
    setLink('contact-github', data.social.github);
    setLink('footer-github', data.social.github);
    setLink('footer-linkedin', data.social.linkedin);
    setLink('footer-twitter', data.social.twitter);
    setLink('footer-email-link', `mailto:${data.social.email}`);

    const contactEmailEl = document.getElementById('contact-email');
    if (contactEmailEl && data.social.email) {
      contactEmailEl.textContent = data.social.email;
    }
  }

  // Resume link — check localStorage upload first, then fall back to file path
  const resumeBtn = document.getElementById('resume-download-btn');
  if (resumeBtn) {
    const savedResume = localStorage.getItem('portfolio_resume');
    const savedName   = localStorage.getItem('portfolio_resume_name') || 'Resume.pdf';
    if (savedResume) {
      resumeBtn.href = savedResume;
      resumeBtn.download = savedName;
    } else if (data.resumeFile) {
      resumeBtn.href = data.resumeFile;
    }
  }

  // Update page title
  if (data.name) {
    document.title = `${data.name} | Cybersecurity Portfolio`;
  }
}

/* ── RENDER SKILLS ── */
function renderSkills(data) {
  const container = document.getElementById('skills-container');
  if (!container || !data.categories) return;

  container.innerHTML = data.categories.map(cat => `
    <div class="skill-category">
      <div class="skill-cat-header">
        <span class="skill-cat-icon">${cat.icon}</span>
        <h3 class="skill-cat-name">${cat.name}</h3>
      </div>
      ${cat.skills.map(skill => `
        <div class="skill-item">
          <div class="skill-info">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percent">${skill.level}%</span>
          </div>
          <div class="skill-bar-bg">
            <div class="skill-bar-fill" data-level="${skill.level}"></div>
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

/* ── RENDER PROJECTS ── */
function renderProjects(data) {
  const container = document.getElementById('projects-container');
  if (!container || !data.projects) return;

  container.innerHTML = data.projects.map((proj, i) => `
    <div class="project-card" onclick="toggleProjectDesc(${i})" style="cursor:pointer;">
      <div class="project-card-header">
        <span class="terminal-dot red"></span>
        <span class="terminal-dot yellow"></span>
        <span class="terminal-dot green"></span>
      </div>
      <div class="project-card-body">
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc project-desc-short" id="proj-desc-${i}">${proj.description}</p>
        <div class="project-techs">
          ${proj.technologies.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
        </div>
        <span class="project-toggle" id="proj-toggle-${i}">▸ Read More</span>
      </div>
    </div>
  `).join('');
}

/* Toggle project description expand/collapse */
function toggleProjectDesc(index) {
  const desc = document.getElementById(`proj-desc-${index}`);
  const toggle = document.getElementById(`proj-toggle-${index}`);
  if (!desc || !toggle) return;

  const isExpanded = desc.classList.contains('project-desc-expanded');
  if (isExpanded) {
    desc.classList.remove('project-desc-expanded');
    desc.classList.add('project-desc-short');
    toggle.textContent = '▸ Read More';
  } else {
    desc.classList.remove('project-desc-short');
    desc.classList.add('project-desc-expanded');
    toggle.textContent = '▾ Read Less';
  }
}

/* ── RENDER CERTIFICATES ── */
function renderCertificates(data) {
  const container = document.getElementById('certs-container');
  if (!container || !data.certificates) return;

  const certIcons = ['🏆', '🛡️', '📜', '☁️', '🌐', '⚔️', '🔐', '💎', '🎯', '🔬'];

  container.innerHTML = data.certificates.map((cert, i) => `
    <div class="cert-card">
      <span class="cert-icon">${certIcons[i % certIcons.length]}</span>
      <h3 class="cert-name">${cert.name}</h3>
      <p class="cert-issuer">${cert.issuer}</p>
      <p class="cert-date">${cert.date}</p>
    </div>
  `).join('');
}

/* ── RENDER TIMELINE ── */
function renderTimeline(data) {
  const container = document.getElementById('timeline-container');
  if (!container || !data.timeline) return;

  container.innerHTML = data.timeline.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <p class="timeline-year">${item.year}</p>
        <h4 class="timeline-role">${item.role}</h4>
        <p class="timeline-org">${item.organization}</p>
        <p class="timeline-desc">${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* ── FOOTER YEAR ── */
function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
