/* ===== JavaScript Functions Specific to Technology Page ===== */

// ===== Section Navigation for Technology Page =====

// Define page sections in sequential order
const sections = ['#hero', '#user-friendly', '#workflow'];

/**
 * Get the index of the currently visible section
 */
function getCurrentSectionIndex() {
  const scrollPosition = window.scrollY;
  const headerHeight = document.querySelector('header').offsetHeight;
  
  // Check scroll position for each section
  for (let i = 0; i < sections.length; i++) {
    const section = document.querySelector(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop - headerHeight - 50;
      const nextSection = document.querySelector(sections[i + 1]);
      let sectionBottom;
      
      if (nextSection) {
        sectionBottom = nextSection.offsetTop - headerHeight - 50;
      } else {
        // Last section: bottom of page
        sectionBottom = document.body.scrollHeight;
      }
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return i;
      }
    }
  }
  
  // Default case
  if (scrollPosition < 200) {
    return 0;
  }
  
  return sections.length - 1;
}

/**
 * Scroll to the next section
 */
function scrollToNextSection() {
  const currentIndex = getCurrentSectionIndex();
  
  if (currentIndex < sections.length - 1) {
    // If not at the last section, scroll to the next one
    const nextIndex = currentIndex + 1;
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[nextIndex]);
    }
  } else {
    // If at the last section, scroll to the bottom (footer)
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
  
  // If at the bottom of the page, return to the last section
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
    // If already at the first section, scroll to the top of the page
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToTop();
    }
  }
}

// ===== Arrow Navigation Logic for Technology Page =====

/**
 * Update the visibility of navigation arrows on the technology page
 */
function updateTechnologyArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  if (!arrowDown || !arrowUp) return;
  
  // Simplified logic: show arrows based on scroll position instead of section index
  if (scrollPosition <= 100) {
    // At the top: show only down arrow
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'none';
  } else if (scrollPosition >= pageHeight - 100) {
    // At the bottom: show only up arrow
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'flex';
  } else {
    // In the middle: show both arrows
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'flex';
  }
}

// ===== Event Listeners =====

/**
 * Scroll event listener specific to the technology page
 */
function initTechnologyScrollListener() {
  window.addEventListener('scroll', function() {
    // Update arrow visibility based on scroll
    updateTechnologyArrowDisplay();
    
    // Trigger shared scroll animations
    if (window.CellWaveCommon) {
      window.CellWaveCommon.handleScrollAnimations();
    }
  });
}

/**
 * Initialize behavior for the technology page
 */
function initTechnologyPage() {
  // Add click events to arrow buttons
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
  initTechnologyScrollListener();
  
  // Set initial arrow display state
  updateTechnologyArrowDisplay();
}

// ===== Initialize after page load =====
document.addEventListener('DOMContentLoaded', function() {
  initTechnologyPage();
});
