document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Plan selection highlight
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            planCards.forEach(c => c.style.transform = 'scale(0.98)');
            this.style.transform = 'scale(1.03) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            planCards.forEach(c => c.style.transform = '');
        });
    });
});
