/* ===== 首页专用JavaScript功能 ===== */

// ===== 首页特定导航功能 =====

/**
 * 滚动到内容部分
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
 * 滚动到首页顶部
 */
function scrollToHero() {
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.scrollIntoView({
      behavior: 'smooth'
    });
  }
}

// ===== 首页箭头导航逻辑 =====

/**
 * 更新首页箭头显示状态
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

// ===== 事件监听器 =====

/**
 * 首页专用滚动事件监听器
 */
function initHomeScrollListener() {
  window.addEventListener('scroll', function() {
    // 调用通用的箭头更新函数
    updateHomeArrowDisplay();
    
    // 调用通用的滚动动画函数
    if (window.CellWaveCommon) {
      window.CellWaveCommon.handleScrollAnimations();
    }
  });
}

/**
 * 首页初始化
 */
function initHomePage() {
  // 为箭头按钮添加点击事件
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
  
  // 初始化滚动监听器
  initHomeScrollListener();
  
  // 初始化箭头显示状态
  updateHomeArrowDisplay();
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  initHomePage();
});