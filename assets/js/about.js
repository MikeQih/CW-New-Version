/* ===== 关于页面专用JavaScript功能 ===== */

// ===== 团队成员数据 =====
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

// ===== 团队成员交互功能 =====

/**
 * 显示团队成员详细信息
 * @param {string} leaderId - 团队成员ID
 */
function showLeaderDetails(leaderId) {
  const leader = leaderData[leaderId];
  const detailsContent = document.getElementById('detailsContent');
  const leaderDetails = document.getElementById('leaderDetails');
  
  if (!leader || !detailsContent || !leaderDetails) return;
  
  // 清除所有活动状态
  document.querySelectorAll('.leader-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // 设置当前卡片为活动状态
  const currentCard = document.querySelector(`[data-leader="${leaderId}"]`);
  if (currentCard) {
    currentCard.classList.add('active');
  }
  
  // 生成详情内容
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
  
  // 显示详情区域
  leaderDetails.classList.add('active');
  
  // 等待动画完成后再滚动，确保滚动位置准确
  setTimeout(() => {
    leaderDetails.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 350);
}

/**
 * 关闭详细信息展示
 */
function closeDetails() {
  const leaderDetails = document.getElementById('leaderDetails');
  if (!leaderDetails) return;
  
  leaderDetails.classList.remove('active');
  
  // 清除所有活动状态
  document.querySelectorAll('.leader-card').forEach(card => {
    card.classList.remove('active');
  });
  
  // 等待关闭动画完成后，滚动到页面标题位置
  setTimeout(() => {
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      pageHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 350);
}

// ===== 事件监听器 =====

/**
 * 初始化团队成员卡片点击事件
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
 * 初始化点击外部关闭功能
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
 * 关于页面初始化
 */
function initAboutPage() {
  // 初始化团队成员卡片事件
  initLeaderCardEvents();
  
  // 初始化点击外部关闭功能
  initOutsideClickClose();
  
  // 为关闭按钮添加事件（如果存在）
  const closeButton = document.querySelector('.close-details');
  if (closeButton) {
    closeButton.onclick = closeDetails;
  }
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  initAboutPage();
});

// ===== 导出函数供全局使用 =====
window.AboutPage = {
  showLeaderDetails,
  closeDetails
};