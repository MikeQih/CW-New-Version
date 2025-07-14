/* General JS, All pages use ===== */

/**
 * Smooth Scroll
 * @param {string} sectionId - Target Block - scroll to sectionId
 */
function scrollToSection(sectionId) {
  const target = document.querySelector(sectionId);
  if (target) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const extraOffset = 20;
    const targetPosition = target.offsetTop - headerHeight - extraOffset;
    
    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: 'smooth'
    });
  }
}

/**
 * Back to top of the page
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Go to bottom of the page
 */
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

// ===== Anchor Handling =====

/**
 * Add smooth scrolling effect to all anchor links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const extraOffset = 20;
        const targetPosition = target.offsetTop - headerHeight - extraOffset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== Scrolling Animation =====

/**
 * Handling element animation on scroll
 */
function handleScrollAnimations() {
  const animateElements = document.querySelectorAll('.scroll-animate');
  animateElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add('show');
    }
  });
}

// ===== Arrow Navigation General Function =====

/**
 * Initialize Arrow Display State
 */
function initArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  
  if (arrowDown) arrowDown.style.display = 'flex';
  if (arrowUp) arrowUp.style.display = 'none';
}

/**
 * Update arrow display based on scroll position
 */
function updateArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  
  if (!arrowDown || !arrowUp) return;
  
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  // At the top (first 200px)
  if (scrollPosition < 200) {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'none';
  }
  // At the bottom (last 50px)
  else if (scrollPosition >= pageHeight - 50) {
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'flex';
  }
  // At the middle
  else {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'flex';
  }
}

// ===== Event Listener =====

/**
 * Initialization after the page is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialization after the page is loaded
  initSmoothScrolling();
  
  // Initialize arrow display
  initArrowDisplay();
  
  // Checking the animation of visible elements
  handleScrollAnimations();
});

/**
 * Scroll event listener
 */
window.addEventListener('scroll', function() {
  // Update arrow display
  updateArrowDisplay();
  
  // Handling scrolling animations
  handleScrollAnimations();
});

// ===== Export functions to specified page =====
window.CellWaveCommon = {
  scrollToSection,
  scrollToTop,
  scrollToBottom,
  updateArrowDisplay,
  handleScrollAnimations
};