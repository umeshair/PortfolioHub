        // Newsletter Form Handling
        document.getElementById('newsletterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            // Add newsletter signup logic
            alert('Thanks for subscribing!');
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });