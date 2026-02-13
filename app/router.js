// ============================================
// Job Notification Tracker - Client-Side Router
// ============================================

// Route definitions with actual page content
const routes = {
    '/': {
        title: 'Job Notification Tracker',
        render: () => createLandingPage()
    },
    '/dashboard': {
        title: 'Dashboard',
        render: () => createDashboardPage()
    },
    '/saved': {
        title: 'Saved',
        render: () => createSavedPage()
    },
    '/digest': {
        title: 'Digest',
        render: () => createDigestPage()
    },
    '/settings': {
        title: 'Settings',
        render: () => createSettingsPage()
    },
    '/proof': {
        title: 'Proof',
        render: () => createProofPage()
    }
};

// Landing Page
function createLandingPage() {
    return `
        <div class="landing-page">
            <div class="hero">
                <h1 class="hero__title">Stop Missing The Right Jobs.</h1>
                <p class="hero__subtitle">Precision-matched job discovery delivered daily at 9AM.</p>
                <button class="btn btn--primary btn--large" onclick="navigateTo('/settings')">Start Tracking</button>
            </div>
        </div>
    `;
}

// Settings Page
function createSettingsPage() {
    return `
        <div class="settings-page">
            <div class="page-header">
                <h1 class="page-header__title">Settings</h1>
                <p class="page-header__subtitle">Configure your job preferences</p>
            </div>
            
            <div class="settings-form">
                <div class="form-group">
                    <label class="form-label">Role Keywords</label>
                    <input type="text" class="form-input" placeholder="e.g. Senior Frontend Engineer, React Developer">
                    <p class="form-hint">Enter job titles or keywords you're interested in</p>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Preferred Locations</label>
                    <input type="text" class="form-input" placeholder="e.g. San Francisco, New York, Remote">
                    <p class="form-hint">Separate multiple locations with commas</p>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Work Mode</label>
                    <div class="radio-group">
                        <label class="radio-option">
                            <input type="radio" name="work-mode" value="remote">
                            <span>Remote</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="work-mode" value="hybrid">
                            <span>Hybrid</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="work-mode" value="onsite">
                            <span>Onsite</span>
                        </label>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Experience Level</label>
                    <select class="form-input">
                        <option value="">Select experience level</option>
                        <option value="entry">Entry Level (0-2 years)</option>
                        <option value="mid">Mid Level (3-5 years)</option>
                        <option value="senior">Senior Level (6-10 years)</option>
                        <option value="lead">Lead/Principal (10+ years)</option>
                    </select>
                </div>
                
                <div class="form-actions">
                    <button class="btn btn--primary">Save Preferences</button>
                    <button class="btn btn--secondary">Reset</button>
                </div>
            </div>
        </div>
    `;
}

// Dashboard Page
function createDashboardPage() {
    return `
        <div class="dashboard-page">
            <div class="page-header">
                <h1 class="page-header__title">Dashboard</h1>
                <p class="page-header__subtitle">Your matched job opportunities</p>
            </div>
            
            <div class="empty-state">
                <p class="empty-state__message">No jobs yet. In the next step, you will load a realistic dataset.</p>
            </div>
        </div>
    `;
}

// Saved Page
function createSavedPage() {
    return `
        <div class="saved-page">
            <div class="page-header">
                <h1 class="page-header__title">Saved</h1>
                <p class="page-header__subtitle">Jobs you've bookmarked for later</p>
            </div>
            
            <div class="empty-state">
                <p class="empty-state__message">No saved jobs yet</p>
                <button class="btn btn--secondary" onclick="navigateTo('/dashboard')">Browse Jobs</button>
            </div>
        </div>
    `;
}

// Digest Page
function createDigestPage() {
    return `
        <div class="digest-page">
            <div class="page-header">
                <h1 class="page-header__title">Digest</h1>
                <p class="page-header__subtitle">Your daily job summary, delivered at 9AM</p>
            </div>
            
            <div class="empty-state">
                <p class="empty-state__message">No digest available yet</p>
                <p class="empty-state__hint">Your first digest will be generated once you configure your preferences and we have matching jobs.</p>
            </div>
        </div>
    `;
}

// Proof Page
function createProofPage() {
    return `
        <div class="proof-page">
            <div class="page-header">
                <h1 class="page-header__title">Proof</h1>
                <p class="page-header__subtitle">Artifact collection and verification</p>
            </div>
            
            <div class="proof-placeholder">
                <p class="proof-placeholder__message">This section will collect proof artifacts as you build the application.</p>
                
                <div class="proof-checklist">
                    <label class="proof-item">
                        <input type="checkbox" class="proof-checkbox">
                        <span>Settings configured</span>
                    </label>
                    <label class="proof-item">
                        <input type="checkbox" class="proof-checkbox">
                        <span>Jobs loaded</span>
                    </label>
                    <label class="proof-item">
                        <input type="checkbox" class="proof-checkbox">
                        <span>Matching working</span>
                    </label>
                    <label class="proof-item">
                        <input type="checkbox" class="proof-checkbox">
                        <span>Digest generated</span>
                    </label>
                </div>
            </div>
        </div>
    `;
}

// Navigate to a route
function navigateTo(path) {
    // Normalize path
    const normalizedPath = path === '/dashboard' ? '/' : path;

    // Update browser history
    window.history.pushState({}, '', normalizedPath);

    // Render the route
    renderRoute(normalizedPath);

    // Update active navigation link
    updateActiveLink(normalizedPath);

    // Close mobile menu if open
    closeMobileMenu();
}

// Render the current route
function renderRoute(path) {
    const route = routes[path] || routes['/'];
    const contentArea = document.getElementById('app-content');

    if (contentArea) {
        contentArea.innerHTML = route.render();
        document.title = `${route.title} - Job Notification Tracker`;
    }
}

// Update active navigation link styling
function updateActiveLink(path) {
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to current route links
    document.querySelectorAll(`.nav-link[data-route="${path}"]`).forEach(link => {
        link.classList.add('active');
    });

    // Handle dashboard special case (/ and /dashboard are the same)
    if (path === '/') {
        document.querySelectorAll('.nav-link[data-route="/dashboard"]').forEach(link => {
            link.classList.add('active');
        });
    }
}

// Close mobile menu
function closeMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (mobileNav) {
        mobileNav.classList.remove('active');
    }

    if (menuToggle) {
        menuToggle.classList.remove('active');
    }
}

// Initialize router
function initRouter() {
    // Handle navigation link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');

        if (link) {
            e.preventDefault();
            const path = link.getAttribute('data-route');
            navigateTo(path);
        }
    });

    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        renderRoute(window.location.pathname);
        updateActiveLink(window.location.pathname);
    });

    // Render initial route
    const initialPath = window.location.pathname === '/dashboard' ? '/' : window.location.pathname;
    renderRoute(initialPath);
    updateActiveLink(initialPath);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter);
} else {
    initRouter();
}
