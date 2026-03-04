// Mobile Menu Toggle
const menuBtn = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
    // Menu icon change animation
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('bx-menu');
    icon.classList.toggle('bx-x');
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = menuBtn.querySelector('i');
      icon.classList.add('bx-menu');
      icon.classList.remove('bx-x');
    });
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      navLinks.classList.remove("active");
      const icon = menuBtn.querySelector('i');
      if(icon) {
        icon.classList.add('bx-menu');
        icon.classList.remove('bx-x');
      }
    }
  });
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Scroll Reveal Observer
const reveal = () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
};

window.addEventListener('DOMContentLoaded', reveal);

// WhatsApp Click Tracking
const trackWhatsAppClick = async (productName = 'General') => {
  try {
    fetch('http://localhost:3001/api/track-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        platform: navigator.platform,
        timestamp: new Date().toISOString(),
        product: productName
      })
    });
  } catch (error) {
    console.error('Tracking Error:', error);
  }
};

document.querySelectorAll('.whatsapp-link, .whatsapp-float').forEach(link => {
  link.addEventListener('click', (e) => {
    const productName = link.closest('.product-card')?.querySelector('h3')?.innerText || 'General';
    trackWhatsAppClick(productName);
  });
});
