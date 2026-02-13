// ============================================
// Job Notification Tracker - Enhanced Router
// With Job Rendering, Filters, and Modal
// ============================================

// Global state
let allJobs = [];
let filteredJobs = [];
let savedJobIds = [];
let currentFilters = {
    keyword: '',
    location: 'all',
    mode: 'all',
    experience: 'all',
    source: 'all',
    sort: 'latest'
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Load jobs data
    allJobs = typeof jobsData !== 'undefined' ? jobsData : [];
    filteredJobs = [...allJobs];

    // Load saved jobs from localStorage
    const saved = localStorage.getItem('savedJobs');
    savedJobIds = saved ? JSON.parse(saved) : [];

    // Initialize router
    initRouter();
});

// Route definitions
const routes = {
    '/': {
        title: 'Dashboard',
        render: () => createDashboardPage()
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

// ============================================
// DASHBOARD PAGE
// ============================================

function createDashboardPage() {
    applyFilters();

    const filterBar = createFilterBar();
    const jobsHtml = filteredJobs.length > 0
        ? filteredJobs.map(job => createJobCard(job)).join('')
        : '<div class="empty-state"><p class="empty-state__message">No jobs match your filters</p></div>';

    return `
        <div class="dashboard-page">
            <div class="page-header">
                <h1 class="page-header__title">Dashboard</h1>
                <p class="page-header__subtitle">Your matched job opportunities</p>
            </div>
            
            ${filterBar}
            
            <div class="jobs-grid">
                ${jobsHtml}
            </div>
        </div>
        
        <div id="job-modal" class="modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div id="modal-body"></div>
            </div>
        </div>
    `;
}

// Create filter bar
function createFilterBar() {
    return `
        <div class="filter-bar">
            <div class="filter-group">
                <input 
                    type="text" 
                    id="filter-keyword" 
                    class="filter-input" 
                    placeholder="Search by title or company..."
                    value="${currentFilters.keyword}"
                    onkeyup="handleFilterChange('keyword', this.value)"
                >
            </div>
            
            <div class="filter-group">
                <select id="filter-location" class="filter-select" onchange="handleFilterChange('location', this.value)">
                    <option value="all">All Locations</option>
                    <option value="Bangalore" ${currentFilters.location === 'Bangalore' ? 'selected' : ''}>Bangalore</option>
                    <option value="Hyderabad" ${currentFilters.location === 'Hyderabad' ? 'selected' : ''}>Hyderabad</option>
                    <option value="Pune" ${currentFilters.location === 'Pune' ? 'selected' : ''}>Pune</option>
                    <option value="Chennai" ${currentFilters.location === 'Chennai' ? 'selected' : ''}>Chennai</option>
                    <option value="Mumbai" ${currentFilters.location === 'Mumbai' ? 'selected' : ''}>Mumbai</option>
                    <option value="Noida" ${currentFilters.location === 'Noida' ? 'selected' : ''}>Noida</option>
                    <option value="Gurgaon" ${currentFilters.location === 'Gurgaon' ? 'selected' : ''}>Gurgaon</option>
                </select>
            </div>
            
            <div class="filter-group">
                <select id="filter-mode" class="filter-select" onchange="handleFilterChange('mode', this.value)">
                    <option value="all">All Modes</option>
                    <option value="Remote" ${currentFilters.mode === 'Remote' ? 'selected' : ''}>Remote</option>
                    <option value="Hybrid" ${currentFilters.mode === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
                    <option value="Onsite" ${currentFilters.mode === 'Onsite' ? 'selected' : ''}>Onsite</option>
                </select>
            </div>
            
            <div class="filter-group">
                <select id="filter-experience" class="filter-select" onchange="handleFilterChange('experience', this.value)">
                    <option value="all">All Experience</option>
                    <option value="Fresher" ${currentFilters.experience === 'Fresher' ? 'selected' : ''}>Fresher</option>
                    <option value="0-1" ${currentFilters.experience === '0-1' ? 'selected' : ''}>0-1 Years</option>
                    <option value="1-3" ${currentFilters.experience === '1-3' ? 'selected' : ''}>1-3 Years</option>
                    <option value="3-5" ${currentFilters.experience === '3-5' ? 'selected' : ''}>3-5 Years</option>
                </select>
            </div>
            
            <div class="filter-group">
                <select id="filter-source" class="filter-select" onchange="handleFilterChange('source', this.value)">
                    <option value="all">All Sources</option>
                    <option value="LinkedIn" ${currentFilters.source === 'LinkedIn' ? 'selected' : ''}>LinkedIn</option>
                    <option value="Naukri" ${currentFilters.source === 'Naukri' ? 'selected' : ''}>Naukri</option>
                    <option value="Indeed" ${currentFilters.source === 'Indeed' ? 'selected' : ''}>Indeed</option>
                </select>
            </div>
            
            <div class="filter-group">
                <select id="filter-sort" class="filter-select" onchange="handleFilterChange('sort', this.value)">
                    <option value="latest" ${currentFilters.sort === 'latest' ? 'selected' : ''}>Latest First</option>
                    <option value="oldest" ${currentFilters.sort === 'oldest' ? 'selected' : ''}>Oldest First</option>
                </select>
            </div>
        </div>
    `;
}

// Create job card
function createJobCard(job) {
    const isSaved = savedJobIds.includes(job.id);
    const daysText = job.postedDaysAgo === 0 ? 'Today' :
        job.postedDaysAgo === 1 ? '1 day ago' :
            `${job.postedDaysAgo} days ago`;

    return `
        <div class="job-card">
            <div class="job-card__header">
                <div class="job-card__title-row">
                    <h3 class="job-card__title">${job.title}</h3>
                    <span class="source-badge source-badge--${job.source.toLowerCase()}">${job.source}</span>
                </div>
                <p class="job-card__company">${job.company}</p>
            </div>
            
            <div class="job-card__details">
                <span class="job-detail">
                    <svg class="job-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 8C9.66 8 11 6.66 11 5C11 3.34 9.66 2 8 2C6.34 2 5 3.34 5 5C5 6.66 6.34 8 8 8ZM8 9.5C5.67 9.5 1 10.67 1 13V14.5H15V13C15 10.67 10.33 9.5 8 9.5Z" fill="currentColor"/>
                    </svg>
                    ${job.location} • ${job.mode}
                </span>
                <span class="job-detail">
                    <svg class="job-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1C4.13 1 1 4.13 1 8C1 11.87 4.13 15 8 15C11.87 15 15 11.87 15 8C15 4.13 11.87 1 8 1ZM8 13.5C4.96 13.5 2.5 11.04 2.5 8C2.5 4.96 4.96 2.5 8 2.5C11.04 2.5 13.5 4.96 13.5 8C13.5 11.04 11.04 13.5 8 13.5Z" fill="currentColor"/>
                        <path d="M8.5 4.5H7V8.5L10.5 10.5L11 9.5L8.5 7.75V4.5Z" fill="currentColor"/>
                    </svg>
                    ${job.experience}
                </span>
                <span class="job-detail job-detail--posted">${daysText}</span>
            </div>
            
            <div class="job-card__salary">${job.salaryRange}</div>
            
            <div class="job-card__actions">
                <button class="btn btn--secondary btn--small" onclick="viewJob('${job.id}')">View</button>
                <button class="btn btn--secondary btn--small ${isSaved ? 'btn--saved' : ''}" onclick="toggleSaveJob('${job.id}')">
                    ${isSaved ? 'Saved ✓' : 'Save'}
                </button>
                <button class="btn btn--primary btn--small" onclick="applyJob('${job.applyUrl}')">Apply</button>
            </div>
        </div>
    `;
}

// ============================================
// SAVED PAGE
// ============================================

function createSavedPage() {
    const savedJobs = allJobs.filter(job => savedJobIds.includes(job.id));

    if (savedJobs.length === 0) {
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

    const jobsHtml = savedJobs.map(job => createJobCard(job)).join('');

    return `
        <div class="saved-page">
            <div class="page-header">
                <h1 class="page-header__title">Saved</h1>
                <p class="page-header__subtitle">${savedJobs.length} job${savedJobs.length !== 1 ? 's' : ''} bookmarked</p>
            </div>
            
            <div class="jobs-grid">
                ${jobsHtml}
            </div>
        </div>
        
        <div id="job-modal" class="modal">
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div id="modal-body"></div>
            </div>
        </div>
    `;
}

// ============================================
// OTHER PAGES
// ============================================

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
                        <input type="checkbox" class="proof-checkbox" checked>
                        <span>Settings configured</span>
                    </label>
                    <label class="proof-item">
                        <input type="checkbox" class="proof-checkbox" checked>
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

// ============================================
// FILTER FUNCTIONS
// ============================================

function handleFilterChange(filterType, value) {
    currentFilters[filterType] = value;
    applyFilters();
    renderRoute(window.location.pathname);
}

function applyFilters() {
    filteredJobs = allJobs.filter(job => {
        // Keyword filter
        if (currentFilters.keyword) {
            const keyword = currentFilters.keyword.toLowerCase();
            const matchesTitle = job.title.toLowerCase().includes(keyword);
            const matchesCompany = job.company.toLowerCase().includes(keyword);
            if (!matchesTitle && !matchesCompany) return false;
        }

        // Location filter
        if (currentFilters.location !== 'all' && job.location !== currentFilters.location) {
            return false;
        }

        // Mode filter
        if (currentFilters.mode !== 'all' && job.mode !== currentFilters.mode) {
            return false;
        }

        // Experience filter
        if (currentFilters.experience !== 'all' && job.experience !== currentFilters.experience) {
            return false;
        }

        // Source filter
        if (currentFilters.source !== 'all' && job.source !== currentFilters.source) {
            return false;
        }

        return true;
    });

    // Apply sorting
    if (currentFilters.sort === 'latest') {
        filteredJobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    } else if (currentFilters.sort === 'oldest') {
        filteredJobs.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
    }
}

// ============================================
// JOB ACTIONS
// ============================================

function viewJob(jobId) {
    const job = allJobs.find(j => j.id === jobId);
    if (!job) return;

    const modal = document.getElementById('job-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="modal-job">
            <h2 class="modal-job__title">${job.title}</h2>
            <p class="modal-job__company">${job.company}</p>
            
            <div class="modal-job__meta">
                <span>${job.location} • ${job.mode}</span>
                <span>${job.experience}</span>
                <span class="source-badge source-badge--${job.source.toLowerCase()}">${job.source}</span>
            </div>
            
            <div class="modal-job__salary">${job.salaryRange}</div>
            
            <h3 class="modal-section-title">Description</h3>
            <p class="modal-job__description">${job.description}</p>
            
            <h3 class="modal-section-title">Required Skills</h3>
            <div class="skills-list">
                ${job.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
            
            <div class="modal-actions">
                <button class="btn btn--primary" onclick="applyJob('${job.applyUrl}')">Apply Now</button>
                <button class="btn btn--secondary" onclick="toggleSaveJob('${job.id}'); closeModal();">
                    ${savedJobIds.includes(job.id) ? 'Unsave' : 'Save Job'}
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'flex';

    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = closeModal;

    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}

function closeModal() {
    const modal = document.getElementById('job-modal');
    if (modal) modal.style.display = 'none';
}

function toggleSaveJob(jobId) {
    const index = savedJobIds.indexOf(jobId);

    if (index > -1) {
        savedJobIds.splice(index, 1);
    } else {
        savedJobIds.push(jobId);
    }

    localStorage.setItem('savedJobs', JSON.stringify(savedJobIds));
    renderRoute(window.location.pathname);
}

function applyJob(url) {
    window.open(url, '_blank');
}

// ============================================
// ROUTER FUNCTIONS
// ============================================

function navigateTo(path) {
    const normalizedPath = path === '/dashboard' ? '/' : path;
    window.history.pushState({}, '', normalizedPath);
    renderRoute(normalizedPath);
    updateActiveLink(normalizedPath);
    closeMobileMenu();
}

function renderRoute(path) {
    const route = routes[path] || routes['/'];
    const contentArea = document.getElementById('app-content');

    if (contentArea) {
        contentArea.innerHTML = route.render();
        document.title = `${route.title} - Job Notification Tracker`;
    }
}

function updateActiveLink(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    document.querySelectorAll(`.nav-link[data-route="${path}"]`).forEach(link => {
        link.classList.add('active');
    });

    if (path === '/') {
        document.querySelectorAll('.nav-link[data-route="/dashboard"]').forEach(link => {
            link.classList.add('active');
        });
    }
}

function closeMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');

    if (mobileNav) mobileNav.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
}

function initRouter() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');
        if (link) {
            e.preventDefault();
            const path = link.getAttribute('data-route');
            navigateTo(path);
        }
    });

    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });
    }

    window.addEventListener('popstate', () => {
        renderRoute(window.location.pathname);
        updateActiveLink(window.location.pathname);
    });

    const initialPath = window.location.pathname === '/dashboard' ? '/' : window.location.pathname;
    renderRoute(initialPath);
    updateActiveLink(initialPath);
}
