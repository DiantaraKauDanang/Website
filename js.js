// js/security.js

// ========== SISTEM KEAMANAN TAMBAHAN ==========

// Fungsi untuk memvalidasi input form
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name.trim()) {
        errors.push({ 
            field: 'name', 
            message: currentLanguage === 'id' ? 'Nama harus diisi' : 'Name is required' 
        });
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errors.push({ 
            field: 'email', 
            message: currentLanguage === 'id' ? 'Format email tidak valid' : 'Invalid email format' 
        });
    }
    
    if (!formData.subject.trim()) {
        errors.push({ 
            field: 'subject', 
            message: currentLanguage === 'id' ? 'Subjek harus diisi' : 'Subject is required' 
        });
    }
    
    if (!formData.message.trim()) {
        errors.push({ 
            field: 'message', 
            message: currentLanguage === 'id' ? 'Pesan harus diisi' : 'Message is required' 
        });
    }
    
    return errors;
}

// ========== SISTEM UI LAINNYA ==========

function initializeUIComponents() {
    initializeNavigation();
    initializeEditModeSystem();
    initializeAdminDashboard();
    initializeBlogCarousel();
    initializeDetailModal();
    initializeCalendarSystem();
    initializeSaveSystem();
    initializeForms();
    initializeAnimations();
    createParticleSystem();
    
    // Portfolio detail modal close button
    const closePortfolioDetailModal = document.getElementById('closePortfolioDetailModal');
    if (closePortfolioDetailModal) {
        closePortfolioDetailModal.addEventListener('click', () => {
            const modal = document.getElementById('portfolioDetailModal');
            if (modal) modal.classList.remove('active');
            clearInterval(portfolioSliderInterval);
        });
    }
    
    // Check for saved edit mode
    const savedEditMode = localStorage.getItem('editModeActive');
    if (savedEditMode === 'true') {
        setTimeout(() => {
            enableEditMode();
        }, 100);
    }
}

function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) navLinks.classList.remove('active');
            if (hamburger) {
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Back to top button
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });
    
    // Back to top
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

function initializeDetailModal() {
    const detailModal = document.getElementById('detailModal');
    const detailClose = document.getElementById('detailClose');
    
    if (detailClose) {
        detailClose.addEventListener('click', () => {
            if (detailModal) detailModal.classList.remove('active');
        });
    }
    
    if (detailModal) {
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) {
                detailModal.classList.remove('active');
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && detailModal && detailModal.classList.contains('active')) {
            detailModal.classList.remove('active');
        }
    });
}

function initializeCalendarSystem() {
    const calendarModal = document.getElementById('calendarModal');
    const calendarPrev = document.getElementById('calendarPrev');
    const calendarNext = document.getElementById('calendarNext');
    const yearPrev = document.getElementById('yearPrev');
    const yearNext = document.getElementById('yearNext');
    const confirmDate = document.getElementById('confirmDate');
    const closeCalendar = document.getElementById('closeCalendar');
    
    if (!calendarModal) return;
    
    // Event listeners for calendar
    if (calendarPrev) {
        calendarPrev.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if (calendarNext) {
        calendarNext.addEventListener('click', () => {
            currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
            renderCalendar();
        });
    }
    
    // Year navigation
    if (yearPrev) {
        yearPrev.addEventListener('click', () => {
            currentCalendarYear--;
            currentCalendarDate.setFullYear(currentCalendarYear);
            renderCalendar();
        });
    }
    
    if (yearNext) {
        yearNext.addEventListener('click', () => {
            currentCalendarYear++;
            currentCalendarDate.setFullYear(currentCalendarYear);
            renderCalendar();
        });
    }
    
    if (confirmDate) {
        confirmDate.addEventListener('click', () => {
            if (selectedCalendarDate) {
                const formattedDate = formatDate(selectedCalendarDate);
                if (calendarTarget === 'portfolio') {
                    const portfolioDateInput = document.getElementById('portfolioDate');
                    if (portfolioDateInput) portfolioDateInput.value = formattedDate;
                } else if (calendarTarget === 'blog') {
                    const blogDateInput = document.getElementById('blogDate');
                    if (blogDateInput) blogDateInput.value = formattedDate;
                }
                calendarModal.classList.remove('active');
            }
        });
    }
    
    if (closeCalendar) {
        closeCalendar.addEventListener('click', () => {
            calendarModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    calendarModal.addEventListener('click', (e) => {
        if (e.target === calendarModal) {
            calendarModal.classList.remove('active');
        }
    });
    
    // Render initial calendar
    renderCalendar();
}

function openCalendar() {
    const calendarModal = document.getElementById('calendarModal');
    if (calendarModal) {
        calendarModal.classList.add('active');
        // Reset to current date
        currentCalendarDate = new Date();
        currentCalendarYear = currentCalendarDate.getFullYear();
        selectedCalendarDate = null;
        renderCalendar();
    }
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const monthYearElement = document.getElementById('calendarMonthYear');
    const yearDisplay = document.getElementById('calendarYear');
    
    if (!calendarGrid || !monthYearElement || !yearDisplay) return;
    
    calendarGrid.innerHTML = '';
    
    // Update year display
    yearDisplay.textContent = currentCalendarYear;
    
    // Month names based on current language
    const monthNames = currentLanguage === 'id' ? [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ] : [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    monthYearElement.textContent = `${monthNames[currentCalendarDate.getMonth()]} ${currentCalendarDate.getFullYear()}`;
    
    // Day headers based on current language
    const dayNames = currentLanguage === 'id' ? 
        ['M', 'S', 'S', 'R', 'K', 'J', 'S'] : 
        ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.style.fontWeight = 'bold';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get first day of month
    const firstDay = new Date(currentCalendarYear, currentCalendarDate.getMonth(), 1);
    const lastDay = new Date(currentCalendarYear, currentCalendarDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Adjust for Indonesian locale (Monday first)
    const adjustedStartingDay = currentLanguage === 'id' ? (startingDay === 0 ? 6 : startingDay - 1) : startingDay;
    
    // Add empty cells
    for (let i = 0; i < adjustedStartingDay; i++) {
        const emptyElement = document.createElement('div');
        emptyElement.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyElement);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Check if selected
        if (selectedCalendarDate && 
            selectedCalendarDate.getDate() === day &&
            selectedCalendarDate.getMonth() === currentCalendarDate.getMonth() &&
            selectedCalendarDate.getFullYear() === currentCalendarYear) {
            dayElement.classList.add('selected');
        }
        
        // Check if today
        const today = new Date();
        if (day === today.getDate() && 
            currentCalendarDate.getMonth() === today.getMonth() &&
            currentCalendarYear === today.getFullYear()) {
            dayElement.style.background = 'rgba(59, 130, 246, 0.1)';
        }
        
        dayElement.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day').forEach(d => {
                d.classList.remove('selected');
            });
            
            dayElement.classList.add('selected');
            selectedCalendarDate = new Date(currentCalendarYear, currentCalendarDate.getMonth(), day);
            
            const selectedDateInput = document.getElementById('selectedDate');
            if (selectedDateInput) {
                selectedDateInput.value = formatDate(selectedCalendarDate);
            }
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

function formatDate(date) {
    const monthNames = currentLanguage === 'id' ? [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ] : [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function initializeForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (!submitBtn) return;
            
            const originalText = submitBtn.innerHTML;
            
            // Reset error states
            document.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            // Get form data
            const formData = {
                name: document.getElementById('name')?.value || '',
                email: document.getElementById('email')?.value || '',
                subject: document.getElementById('subject')?.value || '',
                message: document.getElementById('message')?.value || ''
            };
            
            // Validate form
            const errors = validateForm(formData);
            
            if (errors.length > 0) {
                errors.forEach(error => {
                    const field = document.getElementById(error.field);
                    const errorElement = document.getElementById(error.field + 'Error');
                    if (field && errorElement) {
                        field.closest('.form-group').classList.add('error');
                        errorElement.textContent = error.message;
                    }
                });
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + 
                (currentLanguage === 'id' ? 'Mengirim...' : 'Sending...');
            submitBtn.classList.add('loading');
            
            // Simulate form submission
            setTimeout(() => {
                alert(currentLanguage === 'id' ? 
                    'Terima kasih! Pesan Anda telah berhasil dikirim.' : 
                    'Thank you! Your message has been sent successfully.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.classList.remove('loading');
            }, 2000);
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            const email = emailInput.value;
            alert(currentLanguage === 'id' 
                ? `Terima kasih! Email ${email} telah berhasil didaftarkan untuk newsletter.`
                : `Thank you! Email ${email} has been successfully registered for the newsletter.`);
            newsletterForm.reset();
        });
    }
}

function initializeAnimations() {
    // Create particle system
    createParticleSystem();
    
    // Animated elements on scroll
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
}