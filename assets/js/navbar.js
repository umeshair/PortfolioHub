const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Smooth scroll and active state management
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        
        // Smooth scroll
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Update active class
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Intersection Observer for active state
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.toggle('active', 
                    link.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));