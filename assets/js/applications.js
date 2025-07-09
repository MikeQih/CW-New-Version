/* ===== 应用页面专用JavaScript功能 ===== */

// ===== 应用页面区块导航 =====

// 定义页面区块，按顺序排列
const sections = ['#app-nav', '#deadcell', '#scrna-workflow', '#cardio', '#monocytes', '#transfected', '#transfected-example'];

/**
 * 获取当前所在的区块索引
 */
function getCurrentSectionIndex() {
  const scrollPosition = window.scrollY + window.innerHeight / 2; // 使用屏幕中心点检测
  const headerHeight = document.querySelector('header').offsetHeight;
  
  // 从后往前检查，确保更精确的匹配
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.querySelector(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop - headerHeight;
      
      if (scrollPosition >= sectionTop) {
        return i;
      }
    }
  }
  
  // 默认返回第一个section
  return 0;
}

/**
 * 滚动到下一个区块
 */
function scrollToNextSection() {
  const currentIndex = getCurrentSectionIndex();
  
  if (currentIndex < sections.length - 1) {
    // 如果不是最后一个区块，滚动到下一个区块
    const nextIndex = currentIndex + 1;
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[nextIndex]);
    }
  } else {
    // 如果在最后一个区块（transfected-example），滚动到页面底部（footer）
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToBottom();
    }
  }
}

/**
 * 滚动到上一个区块
 */
function scrollToPreviousSection() {
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  // 如果在页面底部，返回到最后一个区块
  if (scrollPosition >= pageHeight - 50) {
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[sections.length - 1]);
    }
    return;
  }
  
  const currentIndex = getCurrentSectionIndex();
  
  if (currentIndex > 0) {
    // 滚动到上一个区块
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToSection(sections[currentIndex - 1]);
    }
  } else {
    // 如果在第一个区块，滚动到页面顶部
    if (window.CellWaveCommon) {
      window.CellWaveCommon.scrollToTop();
    }
  }
}

// ===== 应用页面箭头导航逻辑 =====

/**
 * 更新应用页面箭头显示状态
 */
function updateApplicationsArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  if (!arrowDown || !arrowUp) return;
  
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
 * 应用页面专用滚动事件监听器
 */
function initApplicationsScrollListener() {
  window.addEventListener('scroll', function() {
    // 调用应用页面的箭头更新函数
    updateApplicationsArrowDisplay();
    
    // 调用通用的滚动动画函数
    if (window.CellWaveCommon) {
      window.CellWaveCommon.handleScrollAnimations();
    }
  });
}

/**
 * 应用页面初始化
 */
function initApplicationsPage() {
  // 为箭头按钮添加点击事件
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
  
  // 初始化滚动监听器
  initApplicationsScrollListener();
  
  // 初始化箭头显示状态
  updateApplicationsArrowDisplay();
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  initApplicationsPage();
});