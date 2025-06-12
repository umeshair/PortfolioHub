/**
 * Enhanced Portfolio Website with React Components
 * Features:
 * - Fast reloading with React
 * - Smooth animations and transitions
 * - Responsive design
 * - Improved SEO
 */

// Load React and ReactDOM from CDN
const loadReactScripts = () => {
  return new Promise((resolve) => {
    // Load React
    const reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
    reactScript.crossOrigin = '';
    
    // Load ReactDOM
    const reactDOMScript = document.createElement('script');
    reactDOMScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    reactDOMScript.crossOrigin = '';
    
    // Load Babel for JSX support
    const babelScript = document.createElement('script');
    babelScript.src = 'https://unpkg.com/babel-standalone@6/babel.min.js';
    
    // Append scripts to document
    document.body.appendChild(reactScript);
    
    reactScript.onload = () => {
      document.body.appendChild(reactDOMScript);
      
      reactDOMScript.onload = () => {
        document.body.appendChild(babelScript);
        
        babelScript.onload = () => {
          // Create a script for our React components
          const appScript = document.createElement('script');
          appScript.type = 'text/babel';
          appScript.textContent = `
            // React Components
            const GalleryComponent = () => {
              const [images, setImages] = React.useState([]);
              const [currentIndex, setCurrentIndex] = React.useState(0);
              
              React.useEffect(() => {
                // Fetch gallery images
                const galleryImages = [
                  { id: 1, src: 'assets/images/f1-photo.jpg', caption: 'Youth Leadership Workshop' },
                  { id: 2, src: 'assets/images/f3-photo.jpg', caption: 'Community Engagement' },
                  { id: 3, src: 'assets/images/f7-photo.jpg', caption: 'International Conference' },
                  { id: 4, src: 'assets/images/f9-photo.jpg', caption: 'Panel Discussion' },
                  { id: 5, src: 'assets/images/f11-photo.jpg', caption: 'Field Visit' },
                  { id: 6, src: 'assets/images/f15-photo.jpg', caption: 'Media Interview' },
                  { id: 7, src: 'assets/images/f20-photo.jpg', caption: 'Youth Advocacy Program' },
                  { id: 8, src: 'assets/images/f25-photo.jpg', caption: 'Regional Summit' },
                  { id: 9, src: 'assets/images/f30-photo.jpg', caption: 'Community Outreach' },
                  { id: 10, src: 'assets/images/f35-photo.jpg', caption: 'Leadership Training' },
                  { id: 11, src: 'assets/images/f40-photo.jpg', caption: 'Policy Dialogue' },
                  { id: 12, src: 'assets/images/f45-photo.jpg', caption: 'Youth Parliament' }
                ];
                
                setImages(galleryImages);
              }, []);
              
              const handlePrev = () => {
                setCurrentIndex((prevIndex) => 
                  prevIndex === 0 ? images.length - 1 : prevIndex - 1
                );
              };
              
              const handleNext = () => {
                setCurrentIndex((prevIndex) => 
                  prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
              };
              
              // Auto-advance gallery every 5 seconds
              React.useEffect(() => {
                const autoAdvanceTimer = setInterval(() => {
                  if (!document.hidden) {
                    handleNext();
                  }
                }, 5000);
                
                return () => clearInterval(autoAdvanceTimer);
              }, [currentIndex, images.length]);
              
              // Animation states
              const [animating, setAnimating] = React.useState(false);
              
              const handleNavigation = (direction) => {
                if (animating) return;
                
                setAnimating(true);
                if (direction === 'prev') {
                  handlePrev();
                } else {
                  handleNext();
                }
                
                setTimeout(() => setAnimating(false), 500);
              };
              
              return (
                <div className="gallery-react-container">
                  <button 
                    className="gallery-nav prev" 
                    onClick={() => handleNavigation('prev')}
                    disabled={animating}
                    aria-label="Previous image"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  <div className="gallery-slider" 
                       style={{ 
                         transform: \`translateX(-\${currentIndex * 100}%)\`,
                         transition: animating ? 'transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
                       }}>
                    {images.map((image, index) => (
                      <div 
                        key={image.id} 
                        className={\`gallery-item \${index === currentIndex ? 'active' : ''}\`}
                        style={{
                          opacity: Math.abs(index - currentIndex) > 2 ? 0.4 : 1,
                          transform: \`scale(\${index === currentIndex ? 1 : 0.9})\`,
                          transition: 'all 0.5s ease'
                        }}
                      >
                        <img src={image.src} alt={image.caption} />
                        <div className="gallery-caption">
                          <h3>{image.caption}</h3>
                          <div className="gallery-indicator">
                            <span className="current-index">{index + 1}</span>
                            <span className="total-count">/{images.length}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className="gallery-nav next" 
                    onClick={() => handleNavigation('next')}
                    disabled={animating}
                    aria-label="Next image"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  
                  <div className="gallery-dots">
                    {images.map((_, index) => (
                      <button 
                        key={index}
                        className={\`gallery-dot \${index === currentIndex ? 'active' : ''}\`}
                        onClick={() => {
                          if (animating) return;
                          setAnimating(true);
                          setCurrentIndex(index);
                          setTimeout(() => setAnimating(false), 500);
                        }}
                        aria-label={\`Go to image \${index + 1}\`}
                      />
                    ))}
                  </div>
                </div>
              );
            };
            
            const ContactForm = () => {
              const [formData, setFormData] = React.useState({
                name: '',
                email: '',
                message: ''
              });
              
              const [status, setStatus] = React.useState({
                submitted: false,
                submitting: false,
                info: { error: false, msg: null }
              });
              
              const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData((prevData) => ({ ...prevData, [name]: value }));
              };
              
              const handleSubmit = (e) => {
                e.preventDefault();
                setStatus({
                  submitted: false,
                  submitting: true,
                  info: { error: false, msg: null }
                });
                
                // Simulate form submission
                setTimeout(() => {
                  setStatus({
                    submitted: true,
                    submitting: false,
                    info: { error: false, msg: 'Message sent successfully!' }
                  });
                  
                  // Reset form after successful submission
                  setFormData({
                    name: '',
                    email: '',
                    message: ''
                  });
                  
                  // Reset status after 3 seconds
                  setTimeout(() => {
                    setStatus({
                      submitted: false,
                      submitting: false,
                      info: { error: false, msg: null }
                    });
                  }, 3000);
                }, 1000);
              };
              
              return (
                <div className="contact-form-container">
                  {status.info.msg && (
                    <div className={\`form-status \${status.info.error ? 'error' : 'success'}\`}>
                      {status.info.msg}
                    </div>
                  )}
                  
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <button 
                      type="submit" 
                      className="cta-button"
                      disabled={status.submitting}
                    >
                      {status.submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              );
            };
            
            // Render React Components
            const galleryContainer = document.getElementById('galleryContainer');
            if (galleryContainer) {
              ReactDOM.render(<GalleryComponent />, galleryContainer);
            }
            
            const contactFormContainer = document.querySelector('.contact-form');
            if (contactFormContainer) {
              const contactFormParent = contactFormContainer.parentNode;
              contactFormContainer.remove();
              ReactDOM.render(<ContactForm />, contactFormParent);
            }
          `;
          
          document.body.appendChild(appScript);
          resolve();
        };
      };
    };
  });
};

// Intersection Observer for animations
const setupAnimations = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.dataset.animation || 'animate-fade-in';
        const delay = element.dataset.delay || '';
        
        element.classList.add(animation);
        if (delay) {
          element.classList.add(delay);
        }
        
        // Unobserve after animation is applied
        animationObserver.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    animationObserver.observe(element);
  });
};

// Navigation active state
const setupNavigation = () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.5 });
  
  sections.forEach(section => {
    navObserver.observe(section);
  });
  
  // Mobile navigation toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileNavToggle.classList.remove('active');
      });
    });
  }
};

// Lazy loading images
const setupLazyLoading = () => {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
};

// Service Worker for offline caching and fast reloading
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }
};

// Back to top button functionality
const setupBackToTop = () => {
  const backToTopButton = document.getElementById('backToTop');
  
  if (backToTopButton) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
};

// Add floating animations to elements
const setupFloatingAnimations = () => {
  // Add floating animation to home image
  const homeImage = document.querySelector('.home-image');
  if (homeImage) {
    homeImage.classList.add('animate-float');
  }
  
  // Add bounce animation to CTA buttons
  document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.classList.add('animate-pulse');
    });
    
    button.addEventListener('mouseleave', () => {
      button.classList.remove('animate-pulse');
    });
  });
  
  // Add subtle animations to footer elements
  document.querySelectorAll('.footer-links a').forEach((link, index) => {
    link.style.transitionDelay = `${index * 0.05}s`;
  });
};

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
  // Add animation classes to elements
  document.querySelectorAll('.home-image, .home-text h1, .home-text .subtitle, .home-text p')
    .forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      el.dataset.animation = index % 2 === 0 ? 'animate-slide-left' : 'animate-slide-right';
      el.dataset.delay = `delay-${(index + 1) * 100}`;
    });
  
  document.querySelectorAll('.gallery-item, .featured-article, .author-highlight, .contact-card')
    .forEach(el => {
      el.classList.add('animate-on-scroll');
      el.dataset.animation = 'animate-fade-in';
    });
  
  // Add animations to footer elements
  document.querySelectorAll('.footer-logo, .footer-links, .footer-contact')
    .forEach((el, index) => {
      el.classList.add('animate-on-scroll');
      el.dataset.animation = 'animate-fade-in';
      el.dataset.delay = `delay-${(index + 1) * 100}`;
    });
  
  // Setup features
  setupAnimations();
  setupNavigation();
  setupLazyLoading();
  setupBackToTop();
  setupFloatingAnimations();
  
  // Load React components
  loadReactScripts().then(() => {
    console.log('React components loaded successfully');
  });
  
  // Register service worker
  registerServiceWorker();
  
  // Add preloading for images to improve performance
  const preloadImages = () => {
    const imagesToPreload = [
      'assets/images/f1-photo.jpg',
      'assets/images/f3-photo.jpg',
      'assets/images/f7-photo.jpg',
      'assets/images/f9-photo.jpg'
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };
  
  // Preload images after initial page load
  window.addEventListener('load', () => {
    setTimeout(preloadImages, 1000);
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});