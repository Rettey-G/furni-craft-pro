// Common Navigation Component for FurniCraft Pro

document.addEventListener('DOMContentLoaded', function() {
    // Create navigation HTML with translation support
    const navHTML = `
    <div class="sticky-nav">
        <nav class="main-nav">
            <ul>
                <li><a href="home.html" id="nav-home"><i class="fas fa-home"></i> <span data-i18n="home">Home</span></a></li>
                <li><a href="projects.html" id="nav-projects"><i class="fas fa-project-diagram"></i> <span data-i18n="projects">Projects</span></a></li>
                <li><a href="room-planner.html" id="nav-room-planner"><i class="fas fa-drafting-compass"></i> <span data-i18n="room_planner">Room Planner</span></a></li>
                <li><a href="selection.html" id="nav-selection"><i class="fas fa-chair"></i> <span data-i18n="selection">Selection</span></a></li>
                <li><a href="room-calculator.html" id="nav-room-calculator"><i class="fas fa-calculator"></i> <span data-i18n="room_calculator">Room Calculator</span></a></li>
                <li><a href="ceiling-calculator.html" id="nav-ceiling-calculator"><i class="fas fa-th"></i> <span data-i18n="ceiling_calculator">Ceiling Calculator</span></a></li>
                <li><a href="2d-to-3d-v2.html" id="nav-2d-to-3d-v2"><i class="fas fa-cube"></i> <span data-i18n="2d_to_3d">2D to 3D</span></a></li>
                <li><a href="shop.html" id="nav-shop"><i class="fas fa-shopping-cart"></i> <span data-i18n="shop">Shop</span></a></li>
                <li><a href="wood-optimizer-v3.html" id="nav-wood-optimizer-v3"><i class="fas fa-cut"></i> <span data-i18n="wood_optimizer">Wood Optimizer</span></a></li>
                <li class="language-switcher-item">
                    <div class="language-switcher">
                        <button onclick="LanguageSwitcher.setLanguage('en')" class="${localStorage.getItem('furnicraft-language') === 'en' || !localStorage.getItem('furnicraft-language') ? 'active' : ''}">English</button>
                        <button onclick="LanguageSwitcher.setLanguage('dv')" class="${localStorage.getItem('furnicraft-language') === 'dv' ? 'active' : ''}">ދިވެހި</button>
                    </div>
                </li>
            </ul>
        </nav>
        <button class="hamburger" aria-label="Menu" aria-expanded="false" aria-controls="main-nav-list" style="display:none">
            <span></span>
        </button>
        <h1 style="margin-top:18px;">FurniCraft Pro</h1>
        <div class="nav-slogan" data-i18n="slogan">Smart Design, Seamless Living</div>
    </div>
    `;
    
    // Insert navigation at the beginning of the body
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navHTML;
    }
    // Hamburger menu logic
    const nav = document.querySelector('.main-nav');
    const navList = nav.querySelector('ul');
    navList.id = 'main-nav-list';
    const hamburger = nav.querySelector('.hamburger');
    function checkMobile() {
        if (window.innerWidth <= 600) {
            hamburger.style.display = 'block';
            navList.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        } else {
            hamburger.style.display = 'none';
            navList.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
    hamburger.addEventListener('click', function() {
        navList.classList.toggle('active');
        const expanded = navList.classList.contains('active');
        hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    window.addEventListener('resize', checkMobile);
    checkMobile();
    
    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop();
    let activeNavId = 'nav-home'; // Default
    
    if (currentPage.includes('projects')) {
        activeNavId = 'nav-projects';
    } else if (currentPage.includes('room-planner')) {
        activeNavId = 'nav-room-planner';
    } else if (currentPage.includes('selection')) {
        activeNavId = 'nav-selection';
    } else if (currentPage.includes('room-calculator')) {
        activeNavId = 'nav-room-calculator';
    } else if (currentPage.includes('ceiling-calculator')) {
        activeNavId = 'nav-ceiling-calculator';
    } else if (currentPage.includes('2d-to-3d-v2')) {
        activeNavId = 'nav-2d-to-3d-v2';
    } else if (currentPage.includes('2d-to-3d')) {
        activeNavId = 'nav-2d-to-3d';
    } else if (currentPage.includes('shop')) {
        activeNavId = 'nav-shop';
    } else if (currentPage.includes('wood-optimizer-v3')) {
        activeNavId = 'nav-wood-optimizer-v3';
    } else if (currentPage.includes('wood-optimizer')) {
        activeNavId = 'nav-wood-optimizer';
    }
    
    const activeNavItem = document.getElementById(activeNavId);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
    
    // Add language switcher styles
    const style = document.createElement('style');
    style.textContent = `
        .language-switcher {
            display: flex;
            gap: 5px;
            margin-left: 10px;
        }
        
        .language-switcher button {
            background-color: #f0f0f0;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
        }
        
        .language-switcher button.active {
            background-color: #4CAF50;
            color: white;
            border-color: #4CAF50;
        }
        
        .language-switcher button:hover {
            background-color: #e0e0e0;
        }
        
        .language-switcher button.active:hover {
            background-color: #3e8e41;
        }
        
        .language-switcher-item {
            margin-left: auto;
        }
        
        [dir="rtl"] .language-switcher-item {
            margin-left: 0;
            margin-right: auto;
        }
    `;
    document.head.appendChild(style);
});
