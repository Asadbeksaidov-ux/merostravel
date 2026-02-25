// Initialize EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("VFOlcr26fn2MPqXYK");
    }
})();

// Utility: Toast Notification
function showToast(title, message) {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Initialize Flatpickr if element exists
const dateInput = document.getElementById('date');
if (dateInput) {
    flatpickr("#date", {
        minDate: "today",
        dateFormat: "Y-m-d",
        animate: true,
        disableMobile: true
    });
}

// Form Submission Logic
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = e.target.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        const getVal = (id) => document.getElementById(id) ? document.getElementById(id).value : null;

        const templateParams = {
            name: getVal('name'),
            email: getVal('email'),
            contact: getVal('contact'),
            tour: getVal('tour'),
            date: getVal('date'),
            people: getVal('people'),
            vehicle: getVal('vehicle'),
            message: getVal('message') || "No additional info"
        };

        emailjs.send('service_n4nb5ob', 'template_vep6qxe', templateParams)
            .then(function () {
                alert('Success! Your booking inquiry has been sent. We will contact you shortly.');
                bookingForm.reset();
            }, function (error) {
                alert('An error occurred. Please try again or contact us via Telegram.');
                console.log('EmailJS Error:', error);
            })
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
    });
}

// Smooth Scroll to Top
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Show/Hide Scroll Button & Nav Scroll Effect
window.addEventListener('scroll', () => {
    // Scroll Top Button
    if (scrollTopBtn) {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    }

    // Nav Scroll Effect
    const nav = document.querySelector('.main-nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
});

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

if (navToggle && navMenu && navOverlay) {
    const toggleMenu = (show) => {
        navMenu.classList.toggle('active', show);
        navOverlay.classList.toggle('active', show);
        const icon = navToggle.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars-staggered');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.add('fa-bars-staggered');
                icon.classList.remove('fa-xmark');
            }
        }
    };

    navToggle.addEventListener('click', () => toggleMenu());
    navOverlay.addEventListener('click', () => toggleMenu(false));
}

// Tab Functionality (Common across tour pages)
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tour-category');
if (tabs.length > 0) {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.target);
            if (target) target.classList.add('active');
        });
    });
}

// Language Switcher Logic
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
if (langBtn && langDropdown) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.style.display = langDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
        langDropdown.style.display = 'none';
    });
}

// Hero Slider (Gallery Page)
const slides = document.querySelectorAll('.slide');
if (slides.length > 0) {
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3000);
}

// Lightbox Logic (Gallery Page)
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
if (galleryItems.length > 0 && lightbox && lightboxImg) {
    const closeLightbox = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            lightboxImg.src = images[currentIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeBox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeLightbox) closeLightbox.addEventListener('click', closeBox);
    lightbox.addEventListener('click', closeBox);
    lightboxImg.addEventListener('click', (e) => e.stopPropagation());

    if (prevBtn) prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    });

    if (nextBtn) nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeBox();
        if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
        if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });
}

// --- Specific Tour Page Logic ---

// Aral Sea Tour Selection
window.selectAralTour = function (priceBox) {
    const tourValue = priceBox.dataset.tourValue;
    document.querySelectorAll('.aral-price-box').forEach(box => box.classList.remove('selected', 'hint-available'));
    document.querySelectorAll('.aral-card').forEach(card => card.classList.remove('selected'));

    priceBox.classList.add('selected');
    const parentCard = priceBox.closest('.aral-card');
    if (parentCard) parentCard.classList.add('selected');

    setTimeout(() => {
        document.querySelectorAll('.aral-price-box[onclick]').forEach(box => {
            if (box !== priceBox) {
                box.classList.add('hint-available');
                setTimeout(() => box.classList.remove('hint-available'), 600);
            }
        });
    }, 500);

    const tourSelect = document.getElementById('tour');
    if (tourValue && tourSelect) tourSelect.value = tourValue;
    showToast("Selected!", tourValue);
    setTimeout(() => {
        const booking = document.getElementById('booking');
        if (booking) booking.scrollIntoView({ behavior: 'smooth' });
    }, 800);
};

// Walking Tour Selection
window.selectWalkingTour = function (priceCard) {
    const tourValue = priceCard.dataset.tourValue;
    document.querySelectorAll('.e-card').forEach(card => card.classList.remove('selected', 'hint-available'));
    priceCard.classList.add('selected');

    setTimeout(() => {
        document.querySelectorAll('.e-card[onclick]').forEach(card => {
            if (card !== priceCard) {
                card.classList.add('hint-available');
                setTimeout(() => card.classList.remove('hint-available'), 600);
            }
        });
    }, 500);

    const tourSelect = document.getElementById('tour');
    if (tourValue && tourSelect) tourSelect.value = tourValue;
    showToast("Selected!", tourValue);
    setTimeout(() => {
        const booking = document.getElementById('booking');
        if (booking) booking.scrollIntoView({ behavior: 'smooth' });
    }, 800);
};

// Generic Expand/Select Logic (for transfers and day trips)
const setupTripCards = () => {
    const tripCards = document.querySelectorAll('.trip-card');
    const vCards = document.querySelectorAll('.v-card');

    tripCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.v-card')) return;
            card.classList.toggle('expanded');
        });
    });

    vCards.forEach(vCard => {
        vCard.addEventListener('click', (e) => {
            e.stopPropagation();
            const tourCard = vCard.closest('.trip-card');
            const tourValue = tourCard ? tourCard.dataset.tourValue : null;
            const vehicleType = vCard.dataset.vehicle;

            document.querySelectorAll('.trip-card').forEach(card => card.classList.remove('selected'));
            document.querySelectorAll('.v-card').forEach(card => card.classList.remove('selected'));

            if (tourCard) tourCard.classList.add('selected');
            vCard.classList.add('selected');

            const tourSelect = document.getElementById('tour');
            if (tourValue && tourSelect) tourSelect.value = tourValue;

            const vehicleSelect = document.getElementById('vehicle');
            if (vehicleType && vehicleSelect) vehicleSelect.value = vehicleType;

            showToast("Selected!", `${tourValue || ''} - ${vehicleType}`);
            setTimeout(() => {
                const booking = document.getElementById('booking');
                if (booking) booking.scrollIntoView({ behavior: 'smooth' });
            }, 800);
        });
    });
};

setupTripCards();
