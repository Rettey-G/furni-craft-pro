document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const subscriptionBanner = document.getElementById('subscription-banner');
    const closeBannerBtn = document.getElementById('close-banner');
    const newProjectBtn = document.getElementById('new-project-btn');
    const emptyCreateBtn = document.getElementById('empty-create-btn');
    const projectModal = document.getElementById('new-project-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const cancelProjectBtn = document.getElementById('cancel-project');
    const newProjectForm = document.getElementById('new-project-form');
    const projectSearch = document.getElementById('project-search');
    const projectsGrid = document.getElementById('projects-grid');
    const emptyState = document.getElementById('empty-state');
    const filterItems = document.querySelectorAll('.filter-list li');
    const typeItems = document.querySelectorAll('.type-list li');
    const favoriteButtons = document.querySelectorAll('.action-btn.favorite');
    const templateCards = document.querySelectorAll('.template-card');
    
    // Current filter state
    let currentFilter = 'all';
    let currentType = null;
    let searchTerm = '';
    
    // Close subscription banner
    if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', function() {
            subscriptionBanner.style.display = 'none';
        });
    }
    
    // Open project modal
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', openModal);
    }
    
    if (emptyCreateBtn) {
        emptyCreateBtn.addEventListener('click', openModal);
    }
    
    // Close project modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (cancelProjectBtn) {
        cancelProjectBtn.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Handle form submission
    if (newProjectForm) {
        newProjectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const projectName = document.getElementById('project-name').value;
            const projectType = document.getElementById('project-type').value;
            const projectDescription = document.getElementById('project-description').value;
            const projectTags = document.getElementById('project-tags').value;
            
            // Check if free plan limit is reached
            const projectCount = document.querySelectorAll('.project-card').length;
            
            if (projectCount >= 3) {
                // Show upgrade modal or alert for free plan users
                alert('You have reached the maximum number of projects for the Free plan. Please upgrade to create more projects.');
                closeModal();
                return;
            }
            
            // Create new project (in a real app, this would save to a database)
            createNewProject(projectName, projectType, projectDescription, projectTags);
            
            // Reset form and close modal
            newProjectForm.reset();
            closeModal();
        });
    }
    
    // Search functionality
    if (projectSearch) {
        projectSearch.addEventListener('input', function() {
            searchTerm = this.value.toLowerCase().trim();
            filterProjects();
        });
    }
    
    // Filter list click handlers
    filterItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all filter items
            filterItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.getAttribute('data-filter');
            
            // Apply filters
            filterProjects();
        });
    });
    
    // Type list click handlers
    typeItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle active class on clicked item
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                currentType = null;
            } else {
                typeItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                currentType = this.getAttribute('data-type');
            }
            
            // Apply filters
            filterProjects();
        });
    });
    
    // Favorite button click handlers
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Update project card data attribute
            const projectCard = this.closest('.project-card');
            if (this.classList.contains('active')) {
                projectCard.setAttribute('data-favorite', 'true');
            } else {
                projectCard.removeAttribute('data-favorite');
            }
        });
    });
    
    // Template card click handlers
    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            templateCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Functions
    
    // Open modal
    function openModal() {
        projectModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        projectModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Filter projects based on current filter, type, and search term
    function filterProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        let visibleCount = 0;
        
        projectCards.forEach(card => {
            let matchesFilter = true;
            let matchesType = true;
            let matchesSearch = true;
            
            // Check filter match
            if (currentFilter === 'recent') {
                // In a real app, this would check the date
                // For demo, we'll just show the first 3 cards
                matchesFilter = Array.from(projectCards).indexOf(card) < 3;
            } else if (currentFilter === 'favorites') {
                matchesFilter = card.hasAttribute('data-favorite');
            } else if (currentFilter === 'shared') {
                matchesFilter = card.classList.contains('shared');
            }
            
            // Check type match
            if (currentType) {
                matchesType = card.getAttribute('data-type') === currentType;
            }
            
            // Check search match
            if (searchTerm) {
                const cardTitle = card.querySelector('h3').textContent.toLowerCase();
                const cardDescription = card.querySelector('.project-description').textContent.toLowerCase();
                const cardTags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
                
                matchesSearch = cardTitle.includes(searchTerm) || 
                                cardDescription.includes(searchTerm) || 
                                cardTags.some(tag => tag.includes(searchTerm));
            }
            
            // Show or hide card based on all criteria
            if (matchesFilter && matchesType && matchesSearch) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show empty state if no projects match
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
            projectsGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            projectsGrid.style.display = 'grid';
        }
        
        // Update counts (in a real app, this would be dynamic)
        updateFilterCounts();
    }
    
    // Create a new project card
    function createNewProject(name, type, description, tags) {
        // Create project card element
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-type', type);
        
        // Get type icon
        let typeIcon = 'fa-chair';
        if (type === 'room') typeIcon = 'fa-door-open';
        if (type === 'material') typeIcon = 'fa-cut';
        
        // Parse tags
        const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        let tagsHTML = '';
        
        tagArray.forEach(tag => {
            tagsHTML += `<span class="tag">${tag}</span>`;
        });
        
        // Set card HTML
        card.innerHTML = `
            <div class="project-actions">
                <button class="action-btn favorite"><i class="fas fa-star"></i></button>
                <div class="action-dropdown">
                    <button class="action-btn dropdown-toggle"><i class="fas fa-ellipsis-v"></i></button>
                    <div class="dropdown-menu">
                        <a href="#" class="dropdown-item"><i class="fas fa-edit"></i> Edit</a>
                        <a href="#" class="dropdown-item"><i class="fas fa-copy"></i> Duplicate</a>
                        <a href="#" class="dropdown-item"><i class="fas fa-share-alt"></i> Share</a>
                        <a href="#" class="dropdown-item text-danger"><i class="fas fa-trash"></i> Delete</a>
                    </div>
                </div>
            </div>
            <div class="project-preview">
                <img src="assets/projects/default-${type}.jpg" alt="${name}">
            </div>
            <div class="project-info">
                <h3>${name}</h3>
                <div class="project-meta">
                    <span class="project-type"><i class="fas ${typeIcon}"></i> ${capitalizeFirstLetter(type)}</span>
                    <span class="project-date">Just now</span>
                </div>
                <p class="project-description">${description || 'No description provided.'}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
            </div>
        `;
        
        // Add event listener to favorite button
        const favoriteBtn = card.querySelector('.action-btn.favorite');
        favoriteBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                card.setAttribute('data-favorite', 'true');
            } else {
                card.removeAttribute('data-favorite');
            }
        });
        
        // Add card to grid
        projectsGrid.prepend(card);
        
        // Update filter counts
        updateFilterCounts();
        
        // Make sure empty state is hidden
        emptyState.style.display = 'none';
        projectsGrid.style.display = 'grid';
    }
    
    // Update filter counts based on visible projects
    function updateFilterCounts() {
        const projectCards = document.querySelectorAll('.project-card');
        const visibleProjects = Array.from(projectCards).filter(card => card.style.display !== 'none');
        
        // Update all projects count
        document.querySelector('.filter-list li[data-filter="all"] .count').textContent = projectCards.length;
        
        // Update favorites count
        const favoritesCount = Array.from(projectCards).filter(card => card.hasAttribute('data-favorite')).length;
        document.querySelector('.filter-list li[data-filter="favorites"] .count').textContent = favoritesCount;
        
        // Update shared count
        const sharedCount = Array.from(projectCards).filter(card => card.classList.contains('shared')).length;
        document.querySelector('.filter-list li[data-filter="shared"] .count').textContent = sharedCount;
        
        // Update type counts
        const furnitureCount = Array.from(projectCards).filter(card => card.getAttribute('data-type') === 'furniture').length;
        document.querySelector('.type-list li[data-type="furniture"] .count').textContent = furnitureCount;
        
        const roomCount = Array.from(projectCards).filter(card => card.getAttribute('data-type') === 'room').length;
        document.querySelector('.type-list li[data-type="room"] .count').textContent = roomCount;
        
        const materialCount = Array.from(projectCards).filter(card => card.getAttribute('data-type') === 'material').length;
        document.querySelector('.type-list li[data-type="material"] .count').textContent = materialCount;
        
        // Update storage meter
        const storageBar = document.querySelector('.storage-used');
        const storageText = document.querySelector('.storage-meter p');
        
        if (storageBar && storageText) {
            const percentage = (projectCards.length / 5) * 100;
            storageBar.style.width = `${percentage}%`;
            storageText.textContent = `${projectCards.length}/5 projects used (Free Plan)`;
        }
    }
    
    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Initialize
    updateFilterCounts();
});
