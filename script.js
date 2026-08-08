window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500); // 1.5s delay to show off the animation
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Background Slideshow
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const bgImages = [
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
            'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
        ];
        let currentBgIndex = 0;

        setInterval(() => {
            heroBg.style.opacity = 0;
            setTimeout(() => {
                currentBgIndex = (currentBgIndex + 1) % bgImages.length;
                heroBg.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
                heroBg.style.opacity = 1;
            }, 1000);
        }, 60000); // Change every 60 seconds (1 minute)
    }

    // 3D Parallax Effect for Hero
    const heroContent = document.querySelector('.hero-content');
    const heroSection = document.querySelector('.hero');

    if (heroContent && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;
            heroContent.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            heroContent.style.transform = `rotateY(0deg) rotateX(0deg)`;
        });
    }

    const modal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.close-btn');
    const bookBtns = document.querySelectorAll('.book-btn');
    const vehicleInput = document.getElementById('vehicle-input');
    const selectedVehicleText = document.getElementById('selected-vehicle');
    const bookingForm = document.getElementById('booking-form');

    // Admin WhatsApp Number (Replace with actual number)
    const adminWhatsAppNumber = '919876543210'; 

    // Open Modal
    bookBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const vehicle = e.target.getAttribute('data-vehicle');
            vehicleInput.value = vehicle;
            selectedVehicleText.textContent = vehicle;
            modal.classList.add('active');
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
        // Wait for animation to finish before resetting form
        setTimeout(() => {
            bookingForm.reset();
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle Form Submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const vehicle = vehicleInput.value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const people = document.getElementById('people').value;
        const venue = document.getElementById('venue').value;

        // Construct WhatsApp Message
        const message = `*New Booking Request*%0A%0A` +
            `*Vehicle:* ${vehicle}%0A` +
            `*Name:* ${name}%0A` +
            `*Email:* ${email}%0A` +
            `*Phone:* ${phone}%0A` +
            `*Address:* ${address}%0A` +
            `*Number of People:* ${people}%0A` +
            `*Venue/Destination:* ${venue}%0A%0A` +
            `Please confirm the availability.`;

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${message}`;

        // Redirect to WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Close modal after submission
        closeModal();
    });

    // Handle Inquiry Form Submission
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents the page from reloading

            const inputs = inquiryForm.querySelectorAll('input, textarea');
            const name = inputs[0].value;
            const email = inputs[1].value;
            const msg = inputs[2].value;

            const whatsappMessage = `*New General Inquiry*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Message:* ${msg}`;

            const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${whatsappMessage}`;
            window.open(whatsappUrl, '_blank');

            inquiryForm.reset();
        });
    }
});
