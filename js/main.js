// Wedding Invitation JavaScript

// Video intro functionality
let videoPlayed = false;

function playIntroVideo() {
    if (videoPlayed) return;
    videoPlayed = true;
    
    const video = document.getElementById('introVideo');
    const tapHint = document.getElementById('tapHint');
    
    // Hide the tap hint
    tapHint.classList.add('hidden');
    
    // Play the video
    video.play();
    
    // When video ends, show the landing screen
    video.addEventListener('ended', function() {
        document.getElementById('videoIntroScreen').classList.add('hidden');
    });
}

// Enter site animation
function enterSite() {
    document.getElementById('landingScreen').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('mainContent').classList.add('visible');
        document.body.classList.add('scrollable');
    }, 400);
}

// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('2026-05-20T16:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Start countdown
setInterval(updateCountdown, 1000);
updateCountdown();

// Add to Calendar
function addToCalendar() {
    const event = {
        title: 'Linor & Shahar Wedding',
        start: '20260520T160000',
        end: '20260521T023000',
        location: 'Basico, Ness Ziona - https://maps.app.goo.gl/fXkgaNmDiPG249Fq6',
        description: 'Wedding celebration of Linor and Shahar\\n\\nLocation: https://maps.app.goo.gl/fXkgaNmDiPG249Fq6'
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
BEGIN:VEVENT
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
LOCATION:${event.location}
DESCRIPTION:${event.description}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'linor-shahar-wedding.ics';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your confirmation! We look forward to celebrating with you.');
}

// Scroll fade-in animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Also animate children with fade-in classes
                const children = entry.target.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
                children.forEach(child => {
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in classes
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-scale');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Separate observer for timeline items with individual triggering
    const timelineObserverOptions = {
        root: null,
        rootMargin: '50px 0px 0px 0px',
        threshold: 0.05
    };

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, timelineObserverOptions);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Initialize scroll animations when main content becomes visible
const mainContentObserver = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
        if (mutation.target.classList.contains('visible')) {
            initScrollAnimations();
            mainContentObserver.disconnect();
        }
    });
});

mainContentObserver.observe(document.getElementById('mainContent'), {
    attributes: true,
    attributeFilter: ['class']
});

// Initialize scroll animations immediately since landing screen is disabled
initScrollAnimations();

// Fade out scroll indicator on scroll
function initScrollIndicatorFade() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    let hasScrolled = false;

    window.addEventListener('scroll', function() {
        if (!hasScrolled && window.scrollY > 50) {
            hasScrolled = true;
            scrollIndicator.classList.add('hidden');
        }
    }, { passive: true });
}

initScrollIndicatorFade();
