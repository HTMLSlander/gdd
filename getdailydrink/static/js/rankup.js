document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
            } else {
                mobileMenu.style.display = 'block';
            }
        });
    }
    
    // Pagination dots
    const paginationDots = document.querySelectorAll('.pagination-dot');
    
    if (paginationDots.length > 0) {
        paginationDots.forEach(dot => {
            dot.addEventListener('click', function() {
                // Remove active class from all dots
                paginationDots.forEach(d => d.classList.remove('active'));
                // Add active class to clicked dot
                this.classList.add('active');
                
                // Here you would typically implement pagination logic
                // For example, loading different leaderboard data
            });
        });
    }
    
    // Track button animation
    const trackBtn = document.querySelector('.track-btn');
    
    if (trackBtn) {
        trackBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add a simple pulse animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                // Here you would typically implement the tracking logic
            }, 200);
        });
    }
});