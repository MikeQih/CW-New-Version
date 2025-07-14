/* ===== JavaScript Functions for Homepage ===== */

// ===== Homepage-specific navigation functionality =====

/**
 * Scroll to the content section
 */
function scrollToContent() {
  const contentSection = document.getElementById('content');
  if (contentSection) {
    contentSection.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

/**
 * Scroll to the top (hero) section
 */
function scrollToHero() {
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// ===== Homepage arrow navigation logic =====

/**
 * Update the display state of navigation arrows
 */
function updateHomeArrowDisplay() {
  const heroSection = document.getElementById('hero');
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  
  if (!heroSection || !arrowDown || !arrowUp) return;
  
  const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  
  if (window.scrollY > heroBottom - window.innerHeight / 2) {
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'flex';
  } else {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'none';
  }
}

// ===== Event listeners =====

/**
 * Scroll listener for homepage
 */
function initHomeScrollListener() {
  window.addEventListener('scroll', function() {
    // Call the shared arrow display update function
    updateHomeArrowDisplay();
    
    // Call the shared scroll animation handler
    if (window.CellWaveCommon) {
      window.CellWaveCommon.handleScrollAnimations();
    }
  });
}

/**
 * Homepage initialization
 */
function initHomePage() {
  // Add click event listeners to arrow buttons
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  
  if (arrowDown) {
    arrowDown.onclick = scrollToContent;
    arrowDown.title = 'Learn More';
  }
  
  if (arrowUp) {
    arrowUp.onclick = scrollToHero;
    arrowUp.title = 'Back to Top';
  }
  
  // Initialize scroll listener
  initHomeScrollListener();
  
  // Initialize arrow display state
  updateHomeArrowDisplay();
}

// ===== Initialize after DOM is fully loaded =====
document.addEventListener('DOMContentLoaded', function() {
  initHomePage();
});
