// script.js

// Fade in sections and product cards individually
const fadeElements = document.querySelectorAll(
  'section, .product-card, .cap-card, footer'
);


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // stop observing after visible
    }
  });
}, { threshold: 0.1 }); // smaller threshold ensures partial visibility triggers

fadeElements.forEach(el => {
  // do NOT re-add 'fade' dynamically; add it in HTML
  observer.observe(el);
});


// Navbar background on scroll past hero
const nav = document.querySelector('.nav');
const hero = document.querySelector('.hero')  || document.querySelector('.shop-hero');
window.addEventListener('scroll', () => {
  if (window.scrollY > hero.offsetHeight - nav.offsetHeight) {
    nav.style.background = '#ebe7df';
    nav.style.padding = '12px 48px';
    nav.querySelector('.logo').style.fontSize = '36px';
  } else {
    nav.style.background = 'transparent';
    nav.style.padding = '16px 48px';
    nav.querySelector('.logo').style.fontSize = '40px';
  }
});


