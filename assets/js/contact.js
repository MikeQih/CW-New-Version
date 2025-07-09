/* ===== 联系页面专用JavaScript功能 ===== */

// ===== 联系页面区块导航 =====

// 定义页面区块，按顺序排列
const sections = ['#contact-info', '#linkedin', '#contact-form'];

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
    // 如果在最后一个区块（表单），滚动到页面底部（footer）
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

// ===== 联系页面箭头导航逻辑 =====

/**
 * 更新联系页面箭头显示状态
 */
function updateContactArrowDisplay() {
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

// ===== 表单处理 =====

/**
 * 处理联系表单提交
 */
function handleFormSubmit(e) {
  // Netlify Forms会自动处理表单提交
  // 这里可以添加客户端验证或其他处理逻辑
  
  // 显示提交成功消息
  setTimeout(() => {
    alert('Thank you for your message! We will get back to you soon.');
  }, 100);
}

/**
 * 初始化表单事件
 */
function initFormEvents() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

// ===== 事件监听器 =====

/**
 * 联系页面专用滚动事件监听器
 */
function initContactScrollListener() {
  window.addEventListener('scroll', function() {
    // 调用联系页面的箭头更新函数
    updateContactArrowDisplay();
    
    // 调用通用的滚动动画函数
    if (window.CellWaveCommon) {
      window.CellWaveCommon.handleScrollAnimations();
    }
  });
}

/**
 * 联系页面初始化
 */
function initContactPage() {
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
  
  // 初始化表单事件
  initFormEvents();
  
  // 初始化滚动监听器
  initContactScrollListener();
  
  // 初始化箭头显示状态
  updateContactArrowDisplay();
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', function() {
  initContactPage();
});