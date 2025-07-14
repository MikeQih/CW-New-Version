/* ===== About Page Specific JavaScript Features ===== */

// ===== Leadership Data =====
const leaderData = {
  robert: {
    name: "Mr. Robert Fu",
    position: "CEO and Co-founder",
    image: "../assets/img/leadership/teamPhoto/Bob.png",
    description: "Robert brings extensive technical and business development experience to CellWave. He successfully grew a software start-up into a multi-million dollar sales business, demonstrating his ability to scale innovative technologies.",
    education: "BASc University of Toronto, MSc London School of Economics",
    expertise: "Business Development, Strategic Planning, Technology Commercialization",
    linkedin: "https://www.linkedin.com/in/robertfu/"
  },
  ye: {
    name: "Assoc. Prof. Ye Ai",
    position: "Chief Scientific Adviser and Co-founder",
    image: "../assets/img/leadership/teamPhoto/Ye.png",
    description: "With more than 15 years of experience in research and development of acoustic microfluidic cell manipulation for single cell research, Prof. Ye Ai is a leading expert in the field. He concurrently serves as Professor at Singapore University of Technology and Design.",
    education: "Postdoctoral Researcher at Los Alamos National Laboratory",
    expertise: "Acoustic Microfluidics, Single Cell Research, Bioengineering",
    linkedin: "https://www.linkedin.com/in/ye-ai-3855701b/"
  },
  chayakorn: {
    name: "Dr Chayakorn Petchakup",
    position: "Chief Technology Officer",
    image: "../assets/img/leadership/teamPhoto/Chayakorn.jpg",
    description: "Dr. Petchakup brings more than 10 years of R&D experience in integrated microfluidics, combining label-free separation, biophysical cytometry, and machine learning for immune cell phenotyping in biological samples.",
    education: "PhD, Nanyang Technological University",
    expertise: "Microfluidics Integration, Machine Learning, Immune Cell Analysis",
    linkedin: "https://www.linkedin.com/in/chpetch/"
  }
};

// ===== Leadership Interaction Features =====

/**
 * Show detailed information of a leader
 * @param {string} leaderId - Leader ID
 */
function showLeaderDetails(leaderId) {
  const leader = leaderData[leaderId];
  const detailsContent = document.getElementById('detailsContent');
  const leaderDetails = document.getElementById('leaderDetails');
  
  if (!leader || !detailsContent || !leaderDetails) return;
  
  // Remove active state from all cards
  document.querySelectorAll('.leader-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Set current card as active
  const currentCard = document.querySelector(`[data-leader="${leaderId}"]`);
  if (currentCard) {
    currentCard.classList.add('active');
  }
  
  // Generate detail content
  detailsContent.innerHTML = `
    <div class="details-image">
      <img src="${leader.image}" alt="${leader.name}">
    </div>
    <div class="details-text">
      <h2>
        ${leader.name}
        <a href="${leader.linkedin}" target="_blank" class="linkedin-icon" title="View LinkedIn Profile">
          <svg viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </h2>
      <h3>${leader.position}</h3>
      <p>${leader.description}</p>
      <p><strong>Education & Background:</strong> ${leader.education}</p>
      <p><strong>Key Expertise:</strong> ${leader.expertise}</p>
    </div>
  `;
  
  // Show details section
  leaderDetails.classList.add('active');
  
  // Wait for animation to complete then scroll to ensure accurate position
  setTimeout(() => {
    leaderDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 350);
}

/**
 * Close the detail display
 */
function closeDetails() {
  const leaderDetails = document.getElementById('leaderDetails');
  if (!leaderDetails) return;
  
  leaderDetails.classList.remove('active');
  
  // Remove active state from all cards
  document.querySelectorAll('.leader-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // Wait for closing animation to finish then scroll to page header
  setTimeout(() => {
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      pageHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 350);
}

// ===== Event Listeners =====

/**
 * Initialize leader card click events
 */
function initLeaderCardEvents() {
  document.querySelectorAll('.leader-card').forEach(card => {
    card.addEventListener('click', function() {
      const leaderId = this.getAttribute('data-leader');
      if (leaderId && leaderData[leaderId]) {
        showLeaderDetails(leaderId);
      }
    });
  });
}

/**
 * Initialize outside click to close detail display
 */
function initOutsideClickClose() {
  document.addEventListener('click', function(e) {
    const leaderDetails = document.getElementById('leaderDetails');
    if (!leaderDetails) return;
    
    const isClickInsideDetails = leaderDetails.contains(e.target);
    const isClickOnCard = e.target.closest('.leader-card');
    
    if (!isClickInsideDetails && !isClickOnCard && leaderDetails.classList.contains('active')) {
      closeDetails();
    }
  });
}

/**
 * Initialize about page
 */
function initAboutPage() {
  // Initialize leader card click events
  initLeaderCardEvents();
  
  // Initialize outside click close functionality
  initOutsideClickClose();
  
  // Add event to close button if exists
  const closeButton = document.querySelector('.close-details');
  if (closeButton) {
    closeButton.onclick = closeDetails;
  }
}

// ===== Initialize on page load =====
document.addEventListener('DOMContentLoaded', function() {
  initAboutPage();
});

// ===== Export functions for global usage =====
window.AboutPage = {
  showLeaderDetails,
  closeDetails
};