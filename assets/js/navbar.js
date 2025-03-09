document.addEventListener('DOMContentLoaded', function() {
    // Load navbar
    fetch('includes/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            setActiveNavigation();
        });

    // Load footer
    fetch('includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });

    function setActiveNavigation() {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            if(link.href === window.location.href + link.getAttribute('href')) {
                link.classList.add('active');
            }
        });
    }
});