        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.style.animation = 'fadeUp 0.6s forwards';
                }
            });
        });

        document.querySelectorAll('.contact-card').forEach(card => {
            observer.observe(card);
        });