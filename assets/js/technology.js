/* ===== 技术页面专用JavaScript功能 ===== */

// ===== 技术页面区块导航 =====

// 定义页面区块，按顺序排列
const sections = ['#hero', '#user-friendly', '#workflow'];

/**
 * 获取当前所在的区块索引
 */
function getCurrentSectionIndex() {
  const scrollPosition = window.scrollY;
  const headerHeight = document.querySelector('header').offsetHeight;
  
  // 为每个区块检查当前滚动位置
  for (let i = 0; i < sections.length; i++) {
    const section = document.querySelector(sections[i]);
    if (section) {
      const sectionTop = section.offsetTop - headerHeight - 50;
      const nextSection = document.querySelector(sections[i + 1]);
      let sectionBottom;
      
      if (nextSection) {
        sectionBottom = nextSection.offsetTop - headerHeight - 50;
      } else {
        // 最后一个区块，到页面底部
        sectionBottom = document.body.scrollHeight;
      }
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return i;
      }
    }
  }
  
  // 默认情况
  if (scrollPosition < 200) {
    return 0;
  }
  
  return sections.length - 1;
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
    // 如果在最后一个区块，滚动到页面底部（footer）
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

// ===== 技术页面箭头导航逻辑 =====

/**
 * 更新技术页面箭头显示状态
 */
function updateTechnologyArrowDisplay() {
  const arrowDown = document.getElementById('arrowDown');
  const arrowUp = document.getElementById('arrowUp');
  const scrollPosition = window.scrollY;
  const pageHeight = document.body.scrollHeight - window.innerHeight;
  
  if (!arrowDown || !arrowUp) return;
  
  // 简化的箭头显示逻辑：基于滚动位置而不是区块索引
  if (scrollPosition <= 100) {
    // 页面顶部：只显示向下
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'none';
  } else if (scrollPosition >= pageHeight - 100) {
    // 页面底部：只显示向上
    arrowDown.style.display = 'none';
    arrowUp.style.display = 'flex';
  } else {
    // 中间位置：显示双箭头
    arrowDown.style.display = 'flex';
    arrowUp.style.display = 'flex';
  }
}

// ===== 事件监听器 =====

/**
 * 技术页面专用滚动事件监听器
 */
function initTechnologyScrollListener() {
  window.addEventListener('scroll', function() {
    // 调用技术页面的箭头更新函数
    updateTechnologyArrowDisplay();
    
    // 调用通用的滚动动画函数
    if (window.CellWaveCommon) {
      window.CellWaveCommon.handleScrollAnimations();
    }
  });
}

/**
 * 技术页面初始化
 */
function initTechnologyPage() {
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
  initTechnologyScrollListener();
  
  // 初始化箭头显示状态
  updateTechnologyArrowDisplay();
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  initTechnologyPage();
});