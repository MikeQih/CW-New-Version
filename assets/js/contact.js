/* ===== Contact Page Specific JavaScript Features ===== */

// ===== Contact Page Section Navigation =====

// Define page sections in order
const sections = ['#contact-info', '#linkedin', '#contact-form'];

/**
 * Get the index of the current section (fixed version)
 */
function getCurrentSectionIndex() {
  const scrollPosition = window.scrollY;
  const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
  
  // Special case: if near top of the page, return first section
  if (scrollPosition < 100) {
    return 0;
  }
  
  // Check from the last section backward to ensure it gets detected correctly
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.querySelector(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop - headerHeight - 100;
      
      if (scrollPosition >= sectionTop) {
        console.log(`Current section: ${sections[i]} (index: ${i})`);
        return i;
      }
    }
  }
  
  // Default return: first section
  return 0;
}

/**
 * Scroll to the next section
 */
function scrollToNextSection() {
  const currentIndex = getCurrentSectionIndex();
  console.log(`Next: Current section index: ${currentIndex}`);
  
  if (currentIndex < sections.length - 1) {
    // If not the last section, scroll to the next section
    const nextIndex = currentIndex + 1;
    console.log(`Scrolling to next section: ${sections[nextIndex]}`);
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[nextIndex]);
    }
  } else {
    // If at the last section (form), scroll to bottom of the page (footer)
    console.log('Scrolling to bottom');
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToBottom();
    }
  }
}

/**
 * Scroll to the previous section (fixed version)
 */
function scrollToPreviousSection() {
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  console.log(`Previous: scrollPosition: ${scrollPosition}, pageHeight: ${pageHeight}`);
  
  // Get the current section index
  const currentIndex = getCurrentSectionIndex();
  console.log(`Previous: Current section index: ${currentIndex}`);
  
  // Check if we're really in the footer area (beyond the bottom of the last section)
  const lastSection = document.querySelector(sections[sections.length - 1]);
  let isInFooterArea = false;
  
  if (lastSection) {
    const lastSectionBottom = lastSection.offsetTop + lastSection.offsetHeight;
    const footerThreshold = lastSectionBottom + 50; // footer threshold
    
    console.log(`Last section bottom: ${lastSectionBottom}, current scroll: ${scrollPosition}, footer threshold: ${footerThreshold}`);
    
    isInFooterArea = scrollPosition > footerThreshold;
  }
  
  // Only scroll back to last section if really in the footer area
  if (isInFooterArea) {
    console.log('In footer area, scrolling to last section');
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[sections.length - 1]);
    }
    return;
  }
  
  // Standard section navigation logic - can go up from any section
  if (currentIndex > 0) {
    // Scroll to previous section
    const prevIndex = currentIndex - 1;
    console.log(`Scrolling to previous section: ${sections[prevIndex]}`);
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[prevIndex]);
    }
  } else {
    // If at the first section, scroll to top of the page
    console.log('Scrolling to top');
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToTop();
    }
  }
}

// ===== Contact Page Arrow Navigation Logic =====

/**
 * Update the visibility of arrows on the contact page
 */
function updateContactArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  if (!arrowDown || !arrowUp) return;
  
  // At the top (within first 200px)
  if (scrollPosition < 200) {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'none';
  }
  // At the bottom (last 100px)
  else if (scrollPosition >= pageHeight - 100) {
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'flex';
  }
  // In the middle
  else {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'flex';
  }
}

// ===== Form Handling =====

/**
 * Handle contact form submission
 */
function handleFormSubmit(e) {
  // Netlify Forms automatically handles form submission
  // You can add client-side validation or other logic here
  
  // Show submission success message
  setTimeout(() => {
    alert('Thank you for your message! We will get back to you soon.');
  }, 100);
}

/**
 * Initialize form event listeners
 */
function initFormEvents() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

// ===== Event Listeners =====

/**
 * Contact page specific scroll event listener
 */
function initContactScrollListener() {
  window.addEventListener('scroll', function() {
    // Call contact page arrow update function
    updateContactArrowDisplay();
    
    // Call common scroll animation handler
    if (window.CellWaveCommon) {
      window.CellWaveCommon.handleScrollAnimations();
    }
  });
}

/**
 * Initialize the contact page
 */
function initContactPage() {
  // Add click events for arrow buttons
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
  
  // Initialize form events
  initFormEvents();
  
  // Initialize scroll listener
  initContactScrollListener();
  
  // Initialize arrow display state
  updateContactArrowDisplay();
}

// ===== Initialize on page load =====
document.addEventListener('DOMContentLoaded', function() {
  initContactPage();
});