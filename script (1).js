// Set Tomorrow's date as default in booking form
window.addEventListener('load', () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrowStr = today.toISOString().split('T')[0];
    document.getElementById('book-date').value = tomorrowStr;
});

/* ================= PREMIUM REVIEWS ARRAY & SYSTEM ================= */
const reviewData = [
    {
        name: "Ananya Sharma",
        stars: 5,
        text: "The burnt basque cheesecake here is simply out of this world. It instantly takes me back to my favorite pastry boutiques in Paris. Rich and deeply satisfying.",
        city: "Gurugram"
    },
    {
        name: "Rohan Mehra",
        stars: 5,
        text: "Highly sophisticated ambiance! Perfect for getting some remote work done or writing. The matcha latte with oat milk was frothy, rich and perfectly sweet.",
        city: "Delhi"
    },
    {
        name: "Neha T.",
        stars: 5,
        text: "Amazing artisan bread. Their sourdough is crispy on the outside, and delightfully soft inside. Gurugram finally has a high-caliber patisserie.",
        city: "Gurugram"
    },
    {
        name: "Simran Kaur",
        stars: 5,
        text: "Exceptional hospitality! The server walked us through the tasting profiles of the different coffee blends on hand. It felt like a wine tasting experience.",
        city: "Noida"
    }
];

let selectedStars = 5;
function setFormStars(count) {
    selectedStars = count;
    const buttons = document.querySelectorAll('#rating-star-selector button');
    buttons.forEach((btn, idx) => {
        if (idx < count) {
            btn.classList.add('text-gold');
            btn.classList.remove('text-coffee/35');
        } else {
            btn.classList.add('text-coffee/35');
            btn.classList.remove('text-gold');
        }
    });
}

function renderTestimonials() {
    const container = document.getElementById('reviews-grid');
    if(!container) return;
    container.innerHTML = '';
    
    reviewData.forEach(rev => {
        let starMarkup = '';
        for(let i=0; i<5; i++) {
            if (i < rev.stars) {
                starMarkup += `<i data-lucide="star" class="w-4 h-4 fill-current text-gold"></i>`;
            } else {
                starMarkup += `<i data-lucide="star" class="w-4 h-4 text-gold/30"></i>`;
            }
        }

        container.innerHTML += `
            <div class="bg-white border border-gold/15 p-6 shadow-md hover:shadow-xl transition-all">
                <div class="flex text-gold mb-3">${starMarkup}</div>
                <p class="text-xs text-muted leading-relaxed mb-4 italic">"${rev.text}"</p>
                <div class="border-t border-gold/10 pt-3 flex justify-between items-center">
                    <span class="font-serif text-xs font-bold text-coffee">${rev.name}</span>
                    <span class="text-[9px] uppercase tracking-widest text-gold font-bold">${rev.city}</span>
                </div>
            </div>
        `;
    });
    lucide.createIcons();
}

function handleReviewSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('rev-name').value;
    const message = document.getElementById('rev-message').value;

    // Prepend new review
    reviewData.unshift({
        name: name,
        stars: selectedStars,
        text: message,
        city: "Verified Patron"
    });

    renderTestimonials();
    triggerToast("Review Published!", "Your experience has been shared successfully with our visitors.", "sparkles");
    
    // reset
    document.getElementById('add-review-form').reset();
    setFormStars(5);
}

/* ================= PREMIUM MENU MASTER DATA & ENGINE ================= */
const menuData = [
    { id: 1, category: "coffee", name: "Premium Espresso", price: 160, desc: "Robust double shot extracted precisely from high-altitude single origin specialty beans.", img: "https://images.unsplash.com/photo-151097252790b-af4f42dd47cf?auto=format&fit=crop&q=80&w=400" },
    { id: 2, category: "coffee", name: "Classic Cappuccino", price: 250, desc: "Perfect balanced ratios of espresso, steamed cream milk and silky micro-foam.", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400" },
    { id: 3, category: "coffee", name: "Madagascar Vanilla Latte", price: 270, desc: "A smooth sweet brew infused with organic Madagascar vanilla bean syrup and espresso.", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400" },
    { id: 4, category: "coffee", name: "Mocha Choc Fudge", price: 280, desc: "Decadent dark Belgian chocolate ganache swirled with premium espresso and steamed milk.", img: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=400" },
    { id: 5, category: "coffee", name: "Affogato Al Caffe", price: 300, desc: "Creamy Madagascar vanilla bean gelato drowned in a piping hot double shot of house espresso.", img: "https://images.unsplash.com/photo-1594911774802-8822a7079af1?auto=format&fit=crop&q=80&w=400" },

    { id: 6, category: "matcha", name: "Ceremonial Kyoto Matcha Latte", price: 300, desc: "Rich premium stone-ground organic green tea from Kyoto whipped smoothly with oat milk.", img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400" },
    { id: 7, category: "matcha", name: "Mango Infused Matcha Chiller", price: 330, desc: "Chilled ceremonial matcha floating atop a sweet, organic tropical Alphanso mango puree.", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400" },
    { id: 8, category: "matcha", name: "Matcha Strawberry Float", price: 320, desc: "Fresh sweet strawberries crushed at the base, layered with dairy and chilled matcha top.", img: "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=400" },
    { id: 9, category: "matcha", name: "Matcha Coconut Cloud", price: 340, desc: "Ceremonial matcha whisked lightly over natural, chilled tender coconut water and coconut foam.", img: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&q=80&w=400" },

    { id: 10, category: "bakery", name: "French Butter Croissant", price: 180, desc: "Baked fresh every morning with traditional 27 lamination steps and AOP Charentes-Poitou butter.", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400" },
    { id: 11, category: "bakery", name: "Double Chocolate Muffin", price: 150, desc: "Rich crumbly muffin stuffed with premium Belgian dark chocolate chunks and a melting center.", img: "https://images.unsplash.com/photo-1587960389599-77a69555866a?auto=format&fit=crop&q=80&w=400" },
    { id: 12, category: "bakery", name: "Almond Frangipane Pastry", price: 220, desc: "Twice baked croissant filled with creamy, rich almond frangipane paste and topped with sliced flakes.", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400" },

    { id: 13, category: "dessert", name: "Burnt Basque Cheesecake", price: 350, desc: "Crustless premium cheesecake with a wonderfully dark caramelized top and rich gooey core.", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400" },
    { id: 14, category: "dessert", name: "Wild Blueberry Cheesecake", price: 360, desc: "Rich and dense Cold Set cheesecake loaded with premium wild blueberry coulis and fresh berries.", img: "https://images.unsplash.com/photo-1524351199679-46cddf530c04?auto=format&fit=crop&q=80&w=400" },
    { id: 15, category: "dessert", name: "Walnut fudge Brownie", price: 280, desc: "A dense, rich fudge chocolate brownie loaded with roasted premium walnuts. Served slightly warm.", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400" },

    { id: 16, category: "food", name: "Truffle Mushroom Pita Pocket", price: 420, desc: "Stuffed freshly baked pita filled with wild roasted mushrooms and a creamy truffle-infused hummus.", img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=400" },
    { id: 17, category: "food", name: "French Toast Brioche", price: 450, desc: "Extra thick luxury brioche bread soaked in spiced custard, caramelized and served with pure maple.", img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400" },
    { id: 18, category: "food", name: "Avocado & Burrata Salad", price: 490, desc: "Premium sliced hass avocado, hand-stretched burrata cheese, organic greens, and dark aged balsamic glaze.", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400" }
];

function renderMenu(categoryFilter = 'all') {
    const container = document.getElementById('menu-items-grid');
    if(!container) return;
    container.innerHTML = '';

    const filtered = categoryFilter === 'all' ? menuData : menuData.filter(item => item.category === categoryFilter);

    filtered.forEach(item => {
        container.innerHTML += `
            <div class="group bg-white border border-gold/15 hover:border-gold hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
                <div class="relative overflow-hidden h-56 bg-charcoal">
                    <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                </div>
                <div class="p-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-serif text-lg text-coffee font-semibold">${item.name}</h3>
                        <span class="font-serif text-gold font-bold">₹${item.price}</span>
                    </div>
                    <p class="text-muted text-xs leading-relaxed">${item.desc}</p>
                </div>
            </div>
        `;
    });
}

function filterMenu(category) {
    document.querySelectorAll('.menu-filter-btn').forEach(btn => {
        btn.classList.add('bg-ivory', 'text-coffee');
        btn.classList.remove('bg-coffee', 'text-ivory');
    });

    const activeBtn = document.getElementById(`btn-m-${category}`);
    if(activeBtn) {
        activeBtn.classList.remove('bg-ivory', 'text-coffee');
        activeBtn.classList.add('bg-coffee', 'text-ivory');
    }

    renderMenu(category);
}

/* ================= PREMIUM GALLERY MASTER DATA & LIGHTBOX ================= */
const galleryData = [
    { tag: "interiors", src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800", desc: "Our luxurious main salon, adorned with minimalist marble counters and European design elements." },
    { tag: "beverages", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", desc: "Our skilled baristas crafting a specialty single-origin espresso shot on our high-end bar machine." },
    { tag: "bakery", src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800", desc: "Traditional slow-laminated French butter croissants baked fresh at early morning hours." },
    { tag: "beverages", src: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=800", desc: "Kyoto Ceremonial grade stone-ground matcha whipped to perfection for optimal natural umami." },
    { tag: "interiors", src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800", desc: "A cozy window dining corner - perfect for slow living mornings, study reads and soft conversations." },
    { tag: "beverages", src: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800", desc: "A cup of signature Gold-Dust Pistachio latte ready to elevate your afternoon." },
    { tag: "bakery", src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800", desc: "Sweet dessert arrays on our elegant pastry showcase cases." },
    { tag: "interiors", src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800", desc: "Elegant lighting grids illuminating fine botanicals in our modern architectural interior." }
];

let currentLightboxIndex = 0;

function renderGallery(tagFilter = 'all') {
    const container = document.getElementById('gallery-grid');
    if(!container) return;
    container.innerHTML = '';

    galleryData.forEach((item, idx) => {
        if (tagFilter !== 'all' && item.tag !== tagFilter) return;

        container.innerHTML += `
            <div class="group relative overflow-hidden h-72 bg-charcoal cursor-pointer border border-gold/10" onclick="openLightbox(${idx})">
                <img src="${item.src}" alt="${item.desc}" class="w-full h-full object-cover transition-transform duration-750 group-hover:scale-105">
                <div class="absolute inset-0 bg-charcoal/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                    <span class="text-xs uppercase text-gold font-bold tracking-widest mb-1">${item.tag}</span>
                    <p class="text-xs text-ivory/80 leading-relaxed max-w-sm line-clamp-2">${item.desc}</p>
                </div>
            </div>
        `;
    });
}

function filterGallery(tag) {
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
        btn.classList.add('bg-ivory', 'text-coffee');
        btn.classList.remove('bg-coffee', 'text-ivory');
    });

    const activeBtn = document.getElementById(`btn-g-${tag}`);
    if(activeBtn) {
        activeBtn.classList.remove('bg-ivory', 'text-coffee');
        activeBtn.classList.add('bg-coffee', 'text-ivory');
    }

    renderGallery(tag);
}

/* LIGHTBOX SYSTEM */
function openLightbox(index) {
    currentLightboxIndex = index;
    const item = galleryData[index];
    document.getElementById('lightbox-img').src = item.src;
    document.getElementById('lightbox-desc').textContent = item.desc;
    document.getElementById('lightbox-index').textContent = `Photo ${index + 1} of ${galleryData.length}`;
    
    const modal = document.getElementById('lightbox-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    currentLightboxIndex += dir;
    if (currentLightboxIndex >= galleryData.length) currentLightboxIndex = 0;
    if (currentLightboxIndex < 0) currentLightboxIndex = galleryData.length - 1;
    openLightbox(currentLightboxIndex);
}

/* ================= SPA Client-Side Routing ================= */
function checkRoute() {
    let hash = window.location.hash || '#home';
    
    const sections = {
        '#home': 'home-section',
        '#about': 'about-section',
        '#menu': 'menu-section',
        '#gallery': 'gallery-section',
        '#testimonials': 'testimonials-section',
        '#contact': 'contact-section'
    };

    const targetSectionId = sections[hash] || 'home-section';

    document.querySelectorAll('.page-section').forEach(sec => {
        sec.classList.remove('active');
    });

    const activeSec = document.getElementById(targetSectionId);
    if (activeSec) {
        activeSec.classList.add('active');
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.remove('text-muted');
            link.classList.add('text-coffee', 'border-gold');
        } else {
            link.classList.remove('text-coffee', 'border-gold');
            link.classList.add('text-muted');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (hash === '#menu') {
        renderMenu();
    } else if (hash === '#gallery') {
        renderGallery();
    } else if (hash === '#testimonials') {
        renderTestimonials();
    }
}

window.addEventListener('hashchange', checkRoute);
window.addEventListener('DOMContentLoaded', () => {
    checkRoute();
    lucide.createIcons();
});


/* ================= DYNAMIC FORMS & RESERVATIONS INTERACTIVE ENGINE ================= */

function openReservationModal() {
    const modal = document.getElementById('reservation-modal');
    const card = document.getElementById('res-modal-card');
    
    document.getElementById('res-form-container').classList.remove('hidden');
    document.getElementById('res-success-container').classList.add('hidden');

    modal.classList.remove('hidden');
    setTimeout(() => {
        card.classList.remove('scale-95', 'opacity-0');
        card.classList.add('scale-100', 'opacity-100');
    }, 10);
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    const modal = document.getElementById('reservation-modal');
    const card = document.getElementById('res-modal-card');
    card.classList.remove('scale-100', 'opacity-100');
    card.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 250);
}

function handleBookingSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('book-name').value;
    const guests = document.getElementById('book-guests').value;
    const time = document.getElementById('book-time').value;
    const dateVal = document.getElementById('book-date').value;

    const code = 'LVD-' + Math.floor(1000 + Math.random() * 9000);

    const dateObj = new Date(dateVal);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);

    document.getElementById('success-code').textContent = code;
    document.getElementById('success-name').textContent = name;
    document.getElementById('success-guests').textContent = guests;
    document.getElementById('success-datetime').textContent = `${formattedDate} @ ${time}`;

    document.getElementById('res-form-container').classList.add('hidden');
    document.getElementById('res-success-container').classList.remove('hidden');

    document.getElementById('booking-form').reset();
}

function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    
    triggerToast(
        "Inquiry Logged!", 
        `Thank you ${name}. Our luxury concierge will reply to your inbox within the next 2 hours.`, 
        "check"
    );
    document.getElementById('contact-form').reset();
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = document.getElementById('news-email').value;
    triggerToast(
        "Subscription Live!", 
        `We have securely registered ${email} for upcoming private tasting events.`, 
        "sparkles"
    );
    document.getElementById('news-email').value = '';
}

/* ================= MOBILE HAMBURGER MENU CONTROL ================= */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    const isOpen = mobileMenu.classList.contains('hidden');
    if (isOpen) {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
    }
}

// Close mobile menu on tapping any link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
    });
});

/* ================= DYNAMIC TOAST NOTIFICATION SYSTEM ================= */
let toastTimeout;
function triggerToast(title, msg, iconName = 'info') {
    const toast = document.getElementById('toast');
    const tTitle = document.getElementById('toast-title');
    const tMessage = document.getElementById('toast-message');
    const tIcon = document.getElementById('toast-icon');

    tTitle.textContent = title;
    tMessage.textContent = msg;
    tIcon.setAttribute('data-lucide', iconName);
    lucide.createIcons();

    clearTimeout(toastTimeout);
    
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 5000);
}

// Close Lightbox on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeLightbox();
        closeReservationModal();
    }
});
