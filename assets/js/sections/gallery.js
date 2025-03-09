        // Generate gallery items
        const totalImages = 55;
        const galleryContainer = document.getElementById('galleryContainer');
        
        for(let i = 1; i <= totalImages; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="assets/images/f${i}-photo.jpg" 
                     alt="Gallery Image ${i}" 
                     loading="lazy">
            `;
            galleryContainer.appendChild(galleryItem);
        }

        // Navigation controls
        const prevButton = document.querySelector('.gallery-nav.prev');
        const nextButton = document.querySelector('.gallery-nav.next');
        
        const scrollAmount = window.innerWidth * 0.8; // Match mobile view width

        prevButton.addEventListener('click', () => {
            galleryContainer.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextButton.addEventListener('click', () => {
            galleryContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if(e.key === 'ArrowLeft') prevButton.click();
            if(e.key === 'ArrowRight') nextButton.click();
        });

        // Drag to scroll
        let isDown = false;
        let startX;
        let scrollLeft;

        galleryContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - galleryContainer.offsetLeft;
            scrollLeft = galleryContainer.scrollLeft;
        });

        galleryContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });

        galleryContainer.addEventListener('mouseup', () => {
            isDown = false;
        });

        galleryContainer.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - galleryContainer.offsetLeft;
            const walk = (x - startX) * 2;
            galleryContainer.scrollLeft = scrollLeft - walk;
        });

        // Touch support
        galleryContainer.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - galleryContainer.offsetLeft;
            scrollLeft = galleryContainer.scrollLeft;
        });

        galleryContainer.addEventListener('touchend', () => {
            isDown = false;
        });

        galleryContainer.addEventListener('touchmove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - galleryContainer.offsetLeft;
            const walk = (x - startX) * 2;
            galleryContainer.scrollLeft = scrollLeft - walk;
        });