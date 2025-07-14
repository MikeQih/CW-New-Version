/* ===== Application Page Specific JavaScript Features ===== */

// ===== Section Navigation for Application Page =====

// Define the page sections in order
const sections = ['#app-nav', '#deadcell', '#scrna-workflow', '#cardio', '#monocytes', '#transfected', '#transfected-example'];

/**
 * Get the index of the current section
 */
function getCurrentSectionIndex() {
  const scrollPosition = window.scrollY + window.innerHeight / 2; // Use the vertical center of the viewport
  const headerHeight = document.querySelector('header').offsetHeight;
  
  // Check from bottom to top for better matching
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.querySelector(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop - headerHeight;
      
      if (scrollPosition >= sectionTop) {
        return i;
      }
    }
  }
  
  // Default to the first section
  return 0;
}

/**
 * Scroll to the next section
 */
function scrollToNextSection() {
  const currentIndex = getCurrentSectionIndex();
  
  if (currentIndex < sections.length - 1) {
    // If not the last section, scroll to the next one
    const nextIndex = currentIndex + 1;
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[nextIndex]);
    }
  } else {
    // If already at the last section, scroll to the bottom (footer)
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToBottom();
    }
  }
}

/**
 * Scroll to the previous section
 */
function scrollToPreviousSection() {
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  // If at the bottom of the page, go to the last section
  if (scrollPosition >= pageHeight - 50) {
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[sections.length - 1]);
    }
    return;
  }
  
  const currentIndex = getCurrentSectionIndex();
  
  if (currentIndex > 0) {
    // Scroll to the previous section
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[currentIndex - 1]);
    }
  } else {
    // If already at the first section, scroll to the top
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToTop();
    }
  }
}

// ===== Arrow Navigation Logic for Application Page =====

/**
 * Update visibility of arrow buttons on the application page
 */
function updateApplicationsArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  if (!arrowDown || !arrowUp) return;
  
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
  // In the middle
  else {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'flex';
  }
}

// ===== Event Listeners =====

/**
 * Scroll event listener specific to application page
 */
function initApplicationsScrollListener() {
  window.addEventListener('scroll', function() {
    // Update arrows on scroll
    updateApplicationsArrowDisplay();
    
    // Trigger common scroll animation handler
    if (window.CellWaveCommon) {
      window.CellWaveCommon.handleScrollAnimations();
    }
  });
}

/**
 * Initialize the application page
 */
function initApplicationsPage() {
  // Assign click events to arrow buttons
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  
  if (arrowDown) {
    arrowDown.onclick = scrollToNextSection;
    arrowDown.title = 'Next Section';
  }
  
  if (arrowUp) {
    arrowUp.onclick = scrollToPreviousSection;
    arrowUp.title = 'Previous Section';
  }
  
  // Initialize scroll listener
  initApplicationsScrollListener();
  
  // Set initial arrow display state
  updateApplicationsArrowDisplay();
}

// ===== Run on DOM content loaded =====
document.addEventListener('DOMContentLoaded', function() {
  initApplicationsPage();
});