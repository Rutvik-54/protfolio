// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation duration and delay
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Check for saved theme preference or respect OS theme setting
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
    themeIcon.textContent = '☀️';
} else {
    themeIcon.textContent = '🌙';
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', function() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.textContent = '🌙';
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        themeIcon.textContent = '☀️';
    }
});

// Mobile Navigation Toggle
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('navLinks').classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (document.getElementById('navLinks').classList.contains('active')) {
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Glow effect on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Check if section is in viewport
        if (scrollPosition > sectionTop - windowHeight / 1.5 && 
            scrollPosition < sectionTop + sectionHeight) {
            section.classList.add('section-active');
            
            // Add glow effect to elements inside active section
            const glowElements = section.querySelectorAll('.glow-effect, .text-glow');
            glowElements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        }
    });
});

// Form Validation
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (name && email && subject && message) {
        // In a real application, you would send this data to a server
        alert('Thanks for your message! I will get back to you soon.');
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Cursor glow effect
document.addEventListener('mousemove', function(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    // Create a temporary glow effect at cursor position
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.width = '20px';
    glow.style.height = '20px';
    glow.style.borderRadius = '50%';
    glow.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    glow.style.opacity = '0.2';
    glow.style.filter = 'blur(10px)';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '9999';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.left = x + 'px';
    glow.style.top = y + 'px';
    
    document.body.appendChild(glow);
    
    // Animation
    setTimeout(() => {
        glow.style.transition = 'opacity 0.5s ease, transform 0.5s ease, width 0.5s ease, height 0.5s ease';
        glow.style.opacity = '0';
        glow.style.width = '50px';
        glow.style.height = '50px';
        
        setTimeout(() => {
            document.body.removeChild(glow);
        }, 500);
    }, 10);
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Create particles
    createParticles();
    
    // Add initial animation styles
    const sections = document.querySelectorAll('section:not(#hero)');
    
    sections.forEach(section => {
        section.style.opacity = '1'; // Changed from '0' to '1'
        section.style.transform = 'translateY(0)'; // Changed from 'translateY(20px)' to 'translateY(0)'
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add initial animation styles to glow elements
    const glowElements = document.querySelectorAll('.glow-effect:not(#hero .glow-effect), .text-glow:not(#hero .text-glow)');
    
    glowElements.forEach(element => {
        element.style.opacity = '1'; // Changed from '0' to '1'
        element.style.transform = 'translateY(0)'; // Changed from 'translateY(20px)' to 'translateY(0)'
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger scroll event to show elements in view on page load
    window.dispatchEvent(new Event('scroll'));
});
