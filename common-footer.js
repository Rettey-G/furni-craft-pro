// Common Footer Component for FurniCraft Pro

document.addEventListener('DOMContentLoaded', function() {
    const footerHTML = `
        <footer class="main-footer">
            <div class="footer-content">
                <div class="footer-logo">
                    <span class="footer-title">FurniCraft Pro</span>
                </div>
                <div class="footer-links">
                    <a href="about.html" data-i18n="about_us">About Us</a>
                    <a href="contact.html" data-i18n="contact">Contact</a>
                    <a href="privacy.html" data-i18n="privacy">Privacy Policy</a>
                </div>
                <div class="footer-social">
                    <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                    <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>&copy; <span id="footer-year"></span> FurniCraft Pro. <span data-i18n="rights_reserved">All rights reserved.</span></span>
            </div>
        </footer>
    `;
    
    // Insert footer at the end of the body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
    // Set current year
    const yearSpan = document.getElementById('footer-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
