// Language Switcher for FurniCraft Pro
// Handles translation between English and Dhivehi (Maldivian)

// Load translations
const currentLanguage = localStorage.getItem('furnicraft-language') || 'en';

// Initialize language switcher
const LanguageSwitcher = {
  // Current language (default to English if not set)
  currentLang: currentLanguage,
  
  // Initialize the language switcher
  init: function() {
    // Set the initial language
    this.setLanguage(this.currentLang);
    
    // Add language switcher to the navigation
    this.addLanguageSwitcher();
    
    // Translate the page on load
    this.translatePage();
  },
  
  // Set the current language and save to localStorage
  setLanguage: function(lang) {
    if (lang !== 'en' && lang !== 'dv') {
      console.error('Unsupported language: ' + lang);
      return;
    }
    
    this.currentLang = lang;
    localStorage.setItem('furnicraft-language', lang);
    
    // Update the page direction for Dhivehi (right-to-left)
    if (lang === 'dv') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl-language');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl-language');
    }
    
    // Translate the page
    this.translatePage();
  },
  
  // Get translation for a key
  translate: function(key) {
    // If translations aren't loaded yet, return the key
    if (typeof translations === 'undefined') {
      console.warn('Translations not loaded yet');
      return key;
    }
    
    // Get the translation for the current language
    const translation = translations[this.currentLang][key];
    
    // Return the translation or the key if not found
    return translation || key;
  },
  
  // Translate all elements with data-i18n attribute
  translatePage: function() {
    // If translations aren't loaded yet, wait and try again
    if (typeof translations === 'undefined') {
      console.warn('Waiting for translations to load...');
      setTimeout(() => this.translatePage(), 100);
      return;
    }
    
    // Find all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    // Translate each element
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.translate(key);
      
      // If the element is an input with placeholder, translate the placeholder
      if (element.hasAttribute('placeholder')) {
        element.setAttribute('placeholder', translation);
      } 
      // If the element is an input with value, translate the value
      else if (element.tagName === 'INPUT' && element.type === 'submit') {
        element.value = translation;
      }
      // Otherwise, set the inner text
      else {
        element.innerText = translation;
      }
    });
    
    // Also translate elements with data-i18n-placeholder
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.setAttribute('placeholder', this.translate(key));
    });
    
    // Translate page title if it has a data-i18n attribute
    const pageTitle = document.querySelector('.page-title h2');
    if (pageTitle && pageTitle.hasAttribute('data-i18n')) {
      document.title = this.translate(pageTitle.getAttribute('data-i18n')) + ' - FurniCraft Pro';
    }
  },
  
  // Add language switcher to the navigation
  addLanguageSwitcher: function() {
    // Wait for the DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.addLanguageSwitcher());
      return;
    }
    
    // Check if the language switcher already exists
    if (document.getElementById('language-switcher')) {
      return;
    }
    
    // Create language switcher container
    const switcher = document.createElement('div');
    switcher.id = 'language-switcher';
    switcher.className = 'language-switcher';
    
    // Create English button
    const enButton = document.createElement('button');
    enButton.innerText = 'English';
    enButton.className = this.currentLang === 'en' ? 'active' : '';
    enButton.onclick = () => this.setLanguage('en');
    
    // Create Dhivehi button
    const dvButton = document.createElement('button');
    dvButton.innerText = 'ދިވެހި';
    dvButton.className = this.currentLang === 'dv' ? 'active' : '';
    dvButton.onclick = () => this.setLanguage('dv');
    
    // Add buttons to switcher
    switcher.appendChild(enButton);
    switcher.appendChild(dvButton);
    
    // Add switcher to the navigation
    const nav = document.querySelector('nav ul');
    if (nav) {
      const li = document.createElement('li');
      li.className = 'language-switcher-item';
      li.appendChild(switcher);
      nav.appendChild(li);
    } else {
      // If nav doesn't exist yet, add to header
      const header = document.querySelector('header');
      if (header) {
        header.appendChild(switcher);
      }
    }
    
    // Add CSS for language switcher
    this.addLanguageSwitcherStyles();
  },
  
  // Add CSS for language switcher
  addLanguageSwitcherStyles: function() {
    // Check if styles already exist
    if (document.getElementById('language-switcher-styles')) {
      return;
    }
    
    // Create style element
    const style = document.createElement('style');
    style.id = 'language-switcher-styles';
    
    // Add CSS
    style.innerHTML = `
      .language-switcher {
        display: flex;
        align-items: center;
        margin-left: 20px;
      }
      
      .language-switcher button {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 14px;
        padding: 5px 10px;
        margin: 0 5px;
        border-radius: 4px;
        transition: background-color 0.3s;
      }
      
      .language-switcher button:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      
      .language-switcher button.active {
        background-color: rgba(255, 255, 255, 0.2);
        font-weight: bold;
      }
      
      /* RTL language styles */
      .rtl-language {
        direction: rtl;
        text-align: right;
      }
      
      .rtl-language .language-switcher {
        margin-left: 0;
        margin-right: 20px;
      }
      
      .rtl-language input,
      .rtl-language textarea {
        text-align: right;
      }
      
      .rtl-language .nav-buttons {
        flex-direction: row-reverse;
      }
      
      @media (max-width: 768px) {
        .language-switcher {
          margin: 10px 0;
        }
      }
    `;
    
    // Add style to head
    document.head.appendChild(style);
  }
};

// Initialize language switcher when the page loads
document.addEventListener('DOMContentLoaded', function() {
  LanguageSwitcher.init();
});

// Make LanguageSwitcher available globally
window.LanguageSwitcher = LanguageSwitcher;
