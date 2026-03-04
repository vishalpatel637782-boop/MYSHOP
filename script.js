// Mobile Menu Toggle
const menuBtn = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });
}

// Scroll Reveal
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
    // Firing tracking call
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

// Add click listeners to all WhatsApp links
document.querySelectorAll('.whatsapp-link, .whatsapp-float').forEach(link => {
  link.addEventListener('click', async (e) => {
    // We don't prevent default, just fire the tracking call
    // If you want to ensure tracking finishes before redirect, use e.preventDefault() and then window.open
    const productName = link.closest('.product-card')?.querySelector('h3')?.innerText || 'General';
    trackWhatsAppClick(productName);
  });
});