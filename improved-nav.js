// Improved Navigation Component for FurniCraft Pro

document.addEventListener('DOMContentLoaded', function() {
    // Create navigation HTML
    const navHTML = `
    <div class="sticky-nav">
        <div class="nav-header">
            <h1>FurniCraft Pro</h1>
            <button class="mobile-menu-toggle" id="mobile-menu-toggle">
                <i class="fas fa-bars"></i>
            </button>
        </div>
        <nav class="main-nav" id="main-nav">
            <ul>
                <li><a href="home.html" id="nav-home"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="projects.html" id="nav-projects"><i class="fas fa-project-diagram"></i> Projects</a></li>
                <li><a href="room-planner.html" id="nav-room-planner"><i class="fas fa-drafting-compass"></i> Room Planner</a></li>
                <li><a href="selection.html" id="nav-selection"><i class="fas fa-chair"></i> Selection</a></li>
                <li><a href="room-calculator.html" id="nav-room-calculator"><i class="fas fa-calculator"></i> Room Calculator</a></li>
                <li><a href="ceiling-calculator.html" id="nav-ceiling-calculator"><i class="fas fa-th"></i> Ceiling Calculator</a></li>
                <li><a href="2d-to-3d-v2.html" id="nav-2d-to-3d-v2"><i class="fas fa-cube"></i> 2D to 3D</a></li>
                <li><a href="shop.html" id="nav-shop"><i class="fas fa-shopping-cart"></i> Shop</a></li>
                <li><a href="wood-optimizer-v3.html" id="nav-wood-optimizer-v3"><i class="fas fa-cut"></i> Wood Optimizer</a></li>
            </ul>
        </nav>
    </div>
    `;
    
    // Insert navigation at the beginning of the body
    const header = document.querySelector('header');
    if (header) {
        header.innerHTML = navHTML;
        
        // Add mobile menu toggle functionality
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mainNav = document.getElementById('main-nav');
        
        if (mobileMenuToggle && mainNav) {
            mobileMenuToggle.addEventListener('click', function() {
                mainNav.classList.toggle('show');
                this.classList.toggle('active');
                
                // Change icon
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    }
    
    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop();
    let activeNavId = 'nav-home'; // Default
    
    if (currentPage.includes('home')) {
        activeNavId = 'nav-home';
    } else if (currentPage.includes('projects')) {
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
});
