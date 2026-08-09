// Namobrahma Studios - Interactivity

document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Navbar Effect on Scroll
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 2. Animated Counters
  const counters = document.querySelectorAll(".counter");
  const speed = 200; // The lower the slower

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  // Intersection Observer for Counters
  const numberSection = document.querySelector(".numbers-section");
  if (numberSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(numberSection);
  }

  // 3. Simple Parallax / Floating effect for sticky notes
  const stickies = document.querySelectorAll('.sticky-note, .scrapbook-element, .doodle');
  // Store initial transforms to prevent runaway strings
  stickies.forEach(sticky => {
    const computed = window.getComputedStyle(sticky).transform;
    // We can also just read the rotation from the CSS if we set it in data attributes,
    // but the simplest fix is to just let hover effects in CSS handle it, or use a data attribute.
    // Let's store the initial inline transform or computed transform.
    if (!sticky.hasAttribute('data-initial-transform')) {
      // Actually, since transform is set in css classes, getComputedStyle might return matrix.
      // A better way is to define the rotations in data attributes or just not preserve the rotation if it's complex, 
      // but wait, the rotation is crucial for the scrapbook look!
    }
  });

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    stickies.forEach(sticky => {
      const speed = sticky.classList.contains('sticky-note') ? 20 : 10;
      const x = mouseX * speed;
      const y = mouseY * speed;
      
      // We will rely on CSS variables for rotation to keep it clean.
      // Let's just update CSS variables --x and --y and let CSS handle the transform.
      sticky.style.setProperty('--x', `${x}px`);
      sticky.style.setProperty('--y', `${y}px`);
    });
  });

  // 4. Reveal Elements on Scroll
  const revealElements = document.querySelectorAll('.feature-card, .sticky-card, .quote-card');
  
  // Set initial state
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) ' + (entry.target.classList.contains('q1') ? 'rotate(-2deg)' : 
                                                           entry.target.classList.contains('q2') ? 'rotate(1deg)' :
                                                           entry.target.classList.contains('q3') ? 'rotate(-1deg)' :
                                                           entry.target.classList.contains('q4') ? 'rotate(3deg)' : '');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Jump Animation Observer
  const jumpElements = document.querySelectorAll('.animate-jump-on-scroll');
  const jumpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('jump-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  jumpElements.forEach(el => jumpObserver.observe(el));

  // 5. Mobile Menu Toggle
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const mobileMenuDrawer = document.getElementById("mobile-menu");
  const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");
  const mobileMenuClose = document.getElementById("mobile-menu-close");

  const closeMobileMenu = () => {
    if (mobileMenuDrawer) mobileMenuDrawer.classList.remove("active");
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove("active");
    if (hamburgerMenu) hamburgerMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  };

  const openMobileMenu = () => {
    if (mobileMenuDrawer) mobileMenuDrawer.classList.add("active");
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add("active");
    if (hamburgerMenu) hamburgerMenu.classList.add("active");
    document.body.classList.add("menu-open");
    // Focus close button for accessibility
    if (hamburgerMenu) hamburgerMenu.focus();
  };

  if (hamburgerMenu && mobileMenuDrawer) {
    hamburgerMenu.addEventListener("click", () => {
      if (hamburgerMenu.classList.contains("active")) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener("click", closeMobileMenu);
    }

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenuDrawer.classList.contains("active")) {
        closeMobileMenu();
      }
    });

    // Close menu when a navigation link is clicked
    const menuLinks = mobileMenuDrawer.querySelectorAll("a");
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");
        if (href && (href.startsWith("#") || (!href.startsWith("mailto:") && !href.startsWith("tel:") && link.target !== "_blank"))) {
          closeMobileMenu();
        }
      });
    });
  }

  // 6. ScrollSpy for Navbar and Mobile Drawer
  const sections = document.querySelectorAll("header[id], section[id], div[id]");
  const navLinks = document.querySelectorAll(".nav-center .nav-link");
  const drawerNavLinks = document.querySelectorAll(".mobile-menu-links .nav-item-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    drawerNavLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // 7. Handle Contact Form Submission via FormSubmit.co
  const contactForm = document.getElementById("contact-form");
  const successPopup = document.getElementById("success-popup");

  if (contactForm && successPopup) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = "SENDING...";
      submitBtn.disabled = true;

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        // Show success popup
        successPopup.style.display = "flex";
        contactForm.reset();
      })
      .catch(error => {
        alert("Oops! There was a problem submitting your form.");
      })
      .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});
