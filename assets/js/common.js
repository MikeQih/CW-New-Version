/* ===== 通用JavaScript功能 - 所有页面共享 ===== */

// ===== 通用导航功能 =====

/**
 * 平滑滚动到指定区块
 * @param {string} sectionId - 目标区块的选择器
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
 * 滚动到页面顶部
 */
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * 滚动到页面底部
 */
function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

// ===== 锚点链接处理 =====

/**
 * 为所有锚点链接添加平滑滚动效果
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

// ===== 滚动动画处理 =====

/**
 * 处理滚动时的元素动画
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

// ===== 箭头导航通用功能 =====

/**
 * 初始化箭头显示状态
 */
function initArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  
  if (arrowDown) arrowDown.style.display = 'flex';
  if (arrowUp) arrowUp.style.display = 'none';
}

/**
 * 根据滚动位置更新箭头显示
 */
function updateArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  
  if (!arrowDown || !arrowUp) return;
  
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  // 在顶部 (前200px)
  if (scrollPosition < 200) {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'none';
  }
  // 在底部 (最后50px)
  else if (scrollPosition >= pageHeight - 50) {
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'flex';
  }
  // 在中间部分
  else {
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'flex';
  }
}

// ===== 事件监听器 =====

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function() {
  // 初始化平滑滚动
  initSmoothScrolling();
  
  // 初始化箭头显示
  initArrowDisplay();
  
  // 检查可见元素的动画
  handleScrollAnimations();
});

/**
 * 滚动事件监听器
 */
window.addEventListener('scroll', function() {
  // 更新箭头显示
  updateArrowDisplay();
  
  // 处理滚动动画
  handleScrollAnimations();
});

// ===== 导出函数供特定页面使用 =====
window.CellWaveCommon = {
  scrollToSection,
  scrollToTop,
  scrollToBottom,
  updateArrowDisplay,
  handleScrollAnimations
};