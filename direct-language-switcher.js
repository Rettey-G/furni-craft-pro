// Direct Language Switcher for FurniCraft Pro
// This script adds a floating language switcher button to all pages

document.addEventListener('DOMContentLoaded', function() {
  // Create the language switcher container
  const switcherContainer = document.createElement('div');
  switcherContainer.className = 'floating-language-switcher';
  
  // Get current language
  const currentLang = localStorage.getItem('furnicraft-language') || 'en';
  
  // Create language buttons
  const enButton = document.createElement('button');
  enButton.innerText = 'English';
  enButton.className = currentLang === 'en' ? 'active' : '';
  enButton.onclick = function() {
    setLanguage('en');
  };
  
  const dvButton = document.createElement('button');
  dvButton.innerText = 'ދިވެހި';
  dvButton.className = currentLang === 'dv' ? 'active' : '';
  dvButton.onclick = function() {
    setLanguage('dv');
  };
  
  // Add buttons to container
  switcherContainer.appendChild(enButton);
  switcherContainer.appendChild(dvButton);
  
  // Add container to body
  document.body.appendChild(switcherContainer);
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .floating-language-switcher {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      gap: 5px;
      background-color: rgba(52, 73, 94, 0.9);
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    [dir="rtl"] .floating-language-switcher {
      right: auto;
      left: 20px;
    }
    
    .floating-language-switcher button {
      background-color: #2c3e50;
      border: 1px solid #4a6b8a;
      border-radius: 4px;
      padding: 8px 15px;
      cursor: pointer;
      font-size: 16px;
      color: white;
      transition: all 0.3s ease;
    }
    
    .floating-language-switcher button.active {
      background-color: #3498db;
      color: white;
      border-color: #2980b9;
    }
    
    .floating-language-switcher button:hover {
      background-color: #3498db;
    }
  `;
  document.head.appendChild(style);
  
  // Function to set language
  function setLanguage(lang) {
    localStorage.setItem('furnicraft-language', lang);
    
    // Update button states
    enButton.className = lang === 'en' ? 'active' : '';
    dvButton.className = lang === 'dv' ? 'active' : '';
    
    // Update page direction
    if (lang === 'dv') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-language');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl-language');
    }
    
    // Translate all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function(element) {
      const key = element.getAttribute('data-i18n');
      if (translations && translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });
    
    // Translate placeholders
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(function(element) {
      const key = element.getAttribute('data-i18n-placeholder');
      if (translations && translations[lang] && translations[lang][key]) {
        element.placeholder = translations[lang][key];
      }
    });
    
    // Update page title if it has a translation
    const pageTitle = document.querySelector('title');
    if (pageTitle && pageTitle.getAttribute('data-i18n')) {
      const titleKey = pageTitle.getAttribute('data-i18n');
      if (translations && translations[lang] && translations[lang][titleKey]) {
        pageTitle.textContent = translations[lang][titleKey] + ' - FurniCraft Pro';
      }
    }
  }
});
