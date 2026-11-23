/**
 * MOINUDDIN SAIYED — PORTFOLIO JAVASCRIPT
 * Pure Vanilla JavaScript: Typing Animation, Theme Switcher,
 * Sticky Nav Spy, Mobile Drawer, Modals, Form Validation & Confetti.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. THEME SWITCHER (Dark Mode / Light Mode with LocalStorage)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  // Check saved theme or default to light
  const savedTheme = localStorage.getItem('moin_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('moin_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIconSun) themeIconSun.style.display = 'block';
      if (themeIconMoon) themeIconMoon.style.display = 'none';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (themeIconSun) themeIconSun.style.display = 'none';
      if (themeIconMoon) themeIconMoon.style.display = 'block';
    }
  }

  /* ==========================================================================
     2. ANIMATED TYPING TEXT EFFECT
     ========================================================================== */
  const typingTarget = document.getElementById('typing-text');
  const roles = [
    "Computer Engineering Student",
    "Aspiring Software Developer",
    "Operations Associate",
    "Technology Enthusiast"
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingTarget) return;

    const currentRole = roles[roleIdx];

    if (!isDeleting) {
      typingTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;

      if (charIdx === currentRole.length) {
        // Pause at end of text
        isDeleting = true;
        setTimeout(typeEffect, 1800);
        return;
      }
      typingSpeed = 90;
    } else {
      typingTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;

      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typingSpeed = 300;
      } else {
        typingSpeed = 45;
      }
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  /* ==========================================================================
     3. STICKY HEADER & SCROLL SPY
     ========================================================================== */
  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');
  const scrollFab = document.getElementById('scroll-top-fab');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header glass effect
    if (siteHeader) {
      if (scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Scroll-to-top FAB
    if (scrollFab) {
      if (scrollY > 400) {
        scrollFab.classList.add('visible');
      } else {
        scrollFab.classList.remove('visible');
      }
    }

    // Scroll spy for navigation highlighting
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  /* ==========================================================================
     4. MOBILE HAMBURGER MENU
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle('open');
    });

    // Close when clicking mobile link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ==========================================================================
     5. SKILLS CATEGORY FILTER
     ========================================================================== */
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCategoryGroups = document.querySelectorAll('.skills-category-group');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCategoryGroups.forEach(group => {
        if (filterValue === 'all' || group.getAttribute('data-category') === filterValue) {
          group.style.display = 'block';
        } else {
          group.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     6. PROJECTS CATEGORY FILTER
     ========================================================================== */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. PROJECT DETAILS MODAL
     ========================================================================== */
  const projectModalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTriggers = document.querySelectorAll('.modal-trigger-btn');

  // Project database for modal
  const projectDetailsMap = {
    'inventory': {
      title: 'Smart Store & Inventory Management System',
      subtitle: 'Digital inventory tracking platform to replace paper logs in retail stores',
      category: 'Full Stack / Operations',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
      description: 'A comprehensive digital solution developed to streamline retail operations. Enables store managers to track incoming shipments, log outgoing sales, monitor low-stock thresholds, and view daily sales summaries.',
      problem: 'Manual paper logs caused constant stock miscounts and delayed supplier replenishment.',
      solution: 'Engineered a modern web portal with automated inventory calculations, barcode lookups, and discrepancy alerts.',
      features: [
        'Real-time stock level monitoring with visual threshold indicators',
        'Low inventory warning badges to trigger re-ordering automatically',
        'Customer purchase log and digital invoice receipt generator',
        'Search and filter products by category, barcode, or SKU'
      ],
      technologies: ['React / JavaScript', 'HTML5 & CSS3', 'SQL Database', 'Chart.js', 'Excel Export']
    },
    'campus': {
      title: 'JG University Student & Resource Portal',
      subtitle: 'Centralized academic resource hub for Computer Engineering students',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop',
      description: 'Designed a student-friendly web portal to provide quick access to academic timetables, lab manuals, syllabus outlines, and university circulars in one clean interface.',
      problem: 'Students previously had to navigate multiple scattered noticeboards and WhatsApp groups to find critical course files.',
      solution: 'Centralized all Computer Engineering academic files into an indexed, searchable single-page portal.',
      features: [
        'Course catalog and lab assignment download center',
        'Exam schedule countdown and notice board announcements',
        'Clean, accessible layout optimized for mobile and desktop screens',
        'Quick search for professors and departmental contacts'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'REST API', 'Responsive UI']
    },
    'support': {
      title: 'Customer Support & Query Resolution Tracker',
      subtitle: 'Ticketing system for recording client feedback and tracking resolution status',
      category: 'Business Software',
      image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?q=80&w=1200&auto=format&fit=crop',
      description: 'A support ticket tracker that logs customer complaints, suggestions, and queries. Enables store teams to assign priority flags, track response time, and measure customer satisfaction scores.',
      problem: 'Unresolved customer grievances led to lost repeat business and lack of accountability.',
      solution: 'Created a transparent ticket lifecycle workflow that ensured 100% of queries received timely follow-up.',
      features: [
        'Customer inquiry logging with automated timestamp and priority tag',
        'Status lifecycle tracking (Open, In Progress, Resolved, Follow-Up)',
        'Daily resolution metrics and customer sentiment summary',
        'Exportable customer service performance report'
      ],
      technologies: ['JavaScript', 'Python Backend', 'SQLite', 'HTML/CSS']
    },
    'portfolio': {
      title: 'Moinuddin Saiyed — Modern Personal Portfolio',
      subtitle: 'Modern, high-performance personal portfolio built with pure HTML, CSS & JavaScript',
      category: 'Frontend Engineering',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      description: 'A custom personal portfolio designed with Dark Navy Blue (#142B49) and Sky Blue (#4A90E2) aesthetic, dark/light theme switching, animated typing effect, and smooth scroll interactions.',
      problem: 'Needed an executive online presence to represent university credentials and operational experience to recruiters.',
      solution: 'Crafted a fast, zero-dependency portfolio highlighting both technical and operational capabilities.',
      features: [
        'Dynamic Dark & Light mode toggle with persistent state',
        'Typing animation highlighting multi-faceted career roles',
        'Fully responsive for desktop, tablet, and mobile devices',
        'Accessible semantic HTML with zero build dependencies'
      ],
      technologies: ['Semantic HTML5', 'Modern CSS3 Variables', 'Vanilla JavaScript (ES6+)', 'SVG Graphics']
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const projectId = trigger.getAttribute('data-project');
      const data = projectDetailsMap[projectId];
      if (!data) return;

      const modalImg = document.getElementById('modal-img');
      if (modalImg && data.image) modalImg.src = data.image;
      document.getElementById('modal-category').textContent = data.category;
      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-subtitle').textContent = data.subtitle;
      document.getElementById('modal-desc').textContent = data.description;
      document.getElementById('modal-problem').textContent = data.problem;
      document.getElementById('modal-solution').textContent = data.solution;

      // Populate features
      const featuresList = document.getElementById('modal-features');
      featuresList.innerHTML = '';
      data.features.forEach(f => {
        const li = document.createElement('li');
        li.className = 'check-item';
        li.innerHTML = `
          <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>${f}</span>
        `;
        featuresList.appendChild(li);
      });

      // Populate tags
      const techTags = document.getElementById('modal-tech-tags');
      techTags.innerHTML = '';
      data.technologies.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = t;
        techTags.appendChild(span);
      });

      projectModalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (projectModalBackdrop) {
      projectModalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (projectModalBackdrop) {
    projectModalBackdrop.addEventListener('click', (e) => {
      if (e.target === projectModalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  /* ==========================================================================
     8. EMAIL COPY TO CLIPBOARD
     ========================================================================== */
  const emailCopyBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('official-email-text');

  if (emailCopyBtn && emailTextEl) {
    emailCopyBtn.addEventListener('click', () => {
      const email = emailTextEl.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const copyLabel = emailCopyBtn.querySelector('.copy-label');
        if (copyLabel) copyLabel.textContent = 'Copied!';
        emailCopyBtn.classList.add('copied');

        setTimeout(() => {
          if (copyLabel) copyLabel.textContent = 'Copy';
          emailCopyBtn.classList.remove('copied');
        }, 2200);
      });
    });
  }

  /* ==========================================================================
     9. DOWNLOAD CV GENERATOR
     ========================================================================== */
  const downloadCvBtns = document.querySelectorAll('.download-cv-btn');
  downloadCvBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const cvText = `======================================================================
CURRICULUM VITAE — MOINUDDIN SAIYED
Computer Engineering Student | Operations Associate
======================================================================

CONTACT DETAILS:
Name: Moinuddin Saiyed
Location: Vatva, Ahmedabad, Gujarat, India
University: JG University, Ahmedabad
Email: moinuddinsaiyed.official@gmail.com
LinkedIn: https://linkedin.com/in/moinuddin-saiyed
GitHub: https://github.com/moinsaiyad31

PROFESSIONAL SUMMARY:
Hello! I am Moinuddin Saiyed, currently pursuing B.Tech in Computer Engineering
at JG University. I have practical experience in store management, inventory
operations, customer relationship management and business coordination.
I am passionate about technology, programming, problem-solving and building
innovative digital solutions.

EDUCATION:
- Bachelor of Technology (B.Tech) in Computer Engineering
  JG University, Ahmedabad, Gujarat, India (Undergraduate / Pursuing)
  Core Coursework: Data Structures & Algorithms, Object-Oriented Programming
  (C++, Java, Python), Database Management Systems (SQL), Web Technologies,
  Operating Systems, Software Engineering.
- Diploma in Computer Engineering
  LJ University, Ahmedabad, Gujarat, India (Completed)
  Foundational Coursework: C/C++, Web Basics, Relational Databases,
  Computer Hardware & Networking, Lab Practicals.
- Higher Secondary Education (12th / HSC Science Stream)
  Ahmedabad, Gujarat, India (Completed with Physics, Chemistry, Math, CS).

PRACTICAL EXPERIENCE:
- Operations Associate & Store Management
  Retail & Commercial Store Operations, Ahmedabad, Gujarat
  * Monitored daily inventory levels, conducted audits, minimized shrinkage.
  * Managed customer inquiries, resolved customer complaints, drove satisfaction.
  * Executed computer POS billing and reconciled daily cash/digital accounts.
  * Coordinated with wholesale suppliers for timely restocking.
  * Introduced spreadsheet tracking sheets reducing manual counting time by 60%.

TECHNICAL & PROFESSIONAL COMPETENCIES:
- Programming: C, C++, Python, Java Fundamentals, HTML5, CSS3, JavaScript
- Operations: Store Management, Inventory Audits, Stock Reconciliation, CRM, POS
- Tools: Microsoft Excel (Formulas & Data), MS Word, VS Code, Google Workspace
- Strengths: Problem Solving, Clear Communication, Time Management, Team Collaboration

======================================================================`;

      const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'Moinuddin_Saiyed_CV.txt';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    });
  });

  /* ==========================================================================
     10. CONTACT FORM VALIDATION & CONFETTI
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formSuccessBanner = document.getElementById('form-success-banner');
  const sendAnotherBtn = document.getElementById('send-another-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Inputs
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');

      // Helper
      function validateField(input, condition) {
        const group = input.closest('.form-group');
        if (!condition) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      }

      validateField(nameInput, nameInput.value.trim().length > 0);
      validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim()));
      validateField(messageInput, messageInput.value.trim().length >= 10);

      if (!isValid) return;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting Message...</span>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        contactForm.style.display = 'none';
        if (formSuccessBanner) formSuccessBanner.classList.add('active');

        // Trigger Canvas Confetti
        triggerConfettiCelebration();

        contactForm.reset();
      }, 1000);
    });
  }

  if (sendAnotherBtn && contactForm && formSuccessBanner) {
    sendAnotherBtn.addEventListener('click', () => {
      formSuccessBanner.classList.remove('active');
      contactForm.style.display = 'block';
    });
  }

  /* ==========================================================================
     11. PURE CANVAS CONFETTI ENGINE (No external libraries required)
     ========================================================================== */
  function triggerConfettiCelebration() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#142B49', '#4A90E2', '#6ba4e7', '#FFFFFF', '#10B981'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.6,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 14,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    let animationFrame;
    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.012;

        if (p.opacity > 0 && p.y < canvas.height) {
          activeParticles++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (activeParticles > 0) {
        animationFrame = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    }

    renderConfetti();
  }

  /* ==========================================================================
     12. BACK TO TOP CLICK HANDLER
     ========================================================================== */
  const backToTopBtns = document.querySelectorAll('.back-to-top-btn, #scroll-top-fab');
  backToTopBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

});
