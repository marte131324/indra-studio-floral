document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Screen Logic
    const splashScreen = document.getElementById('splash-screen');
    const appContainer = document.querySelector('.app-container');

    setTimeout(() => {
        splashScreen.style.opacity = '0';
        appContainer.classList.add('loaded');
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            initAnimations();
        }, 1200); 
    }, 2000); 

    // 2. Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg && scrolled < 400) {
            heroBg.style.transform = `scale(1.05) translateY(${scrolled * 0.4}px)`;
        }
    });

    // 3. Save Contact (vCard generation)
    window.downloadVCard = function() {
        const vcardData = `BEGIN:VCARD\nVERSION:3.0\nN:Indra Studio;Floral;;;\nFN:Indra Studio Floral\nORG:Indra Studio Floral\nTITLE:Diseño Floral de Autor\nTEL;TYPE=CELL:522282393575\nURL:https://indra-studio-floral-web.vercel.app\nNOTE:Creamos experiencias botánicas memorables y arreglos florales curados.\nEND:VCARD`;
        const blob = new Blob([vcardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'IndraStudioFloral.vcf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    // 4. Entrance Animations
    function initAnimations() {
        const elements = document.querySelectorAll('.fade-in-up');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
        elements.forEach(el => observer.observe(el));
    }

    // 5. PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW registered!', reg))
            .catch(err => console.error('SW failed', err));
    }

    // 6. Theme Toggle (Night Garden)
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('i');
    const metaThemeColor = document.getElementById('meta-theme-color');

    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        metaThemeColor.setAttribute('content', '#1A1F1A');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if(document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
            metaThemeColor.setAttribute('content', '#1A1F1A');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
            metaThemeColor.setAttribute('content', '#F8F6F0');
        }
    });

    // 7. Modals Global Logic
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-modal');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.style.overflow = 'hidden'; // Prevents background scroll
    }

    function closeModal() {
        modals.forEach(modal => {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 400); // match css transition
        });
    }

    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    window.addEventListener('click', (e) => {
        if(e.target.classList.contains('modal')) closeModal();
    });

    // 8. Image Viewer Modal (Immersive Portfolio)
    const galleryItems = document.querySelectorAll('.interactive-img');
    const modalImg = document.getElementById('modal-img');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            modalImg.src = src;
            openModal('image-modal');
        });
    });

    // 9. QR Code Logic
    const qrBtn = document.getElementById('btn-qr');
    let qrGenerated = false;

    qrBtn.addEventListener('click', () => {
        openModal('qr-modal');
        if(!qrGenerated && typeof QRCode !== 'undefined') {
            new QRCode(document.getElementById('qrcode'), {
                text: window.location.href,
                width: 200,
                height: 200,
                colorDark : "#2C352D",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
            qrGenerated = true;
        }
    });

    // 10. Inquiry Form to WhatsApp
    const btnInquiry = document.getElementById('btn-inquiry');
    btnInquiry.addEventListener('click', () => openModal('inquiry-modal'));

    document.getElementById('inquiry-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('event-type').value;
        const date = document.getElementById('event-date').value;
        const budget = document.getElementById('event-budget').value;
        const details = document.getElementById('event-details').value;

        const message = `¡Hola Indra Studio Floral! 🌿 Me gustaría cotizar un servicio:\n\n*Tipo:* ${type}\n*Fecha:* ${date}\n*Presupuesto Estimado:* ${budget}\n*Detalles:* ${details || 'Sin detalles adicionales'}`;
        
        const waUrl = `https://wa.me/522282393575?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
        closeModal();
    });

    // 11. Native Share
    const btnShare = document.getElementById('btn-share');
    btnShare.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Indra Studio Floral',
                    text: 'Diseño Floral de Autor',
                    url: window.location.href,
                });
            } catch (err) {
                console.log('Error sharing', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('¡Enlace copiado al portapapeles!');
            });
        }
    });

    // 12. Testimonial Carousel Auto Scroll
    const track = document.querySelector('.carousel-track');
    if(track) {
        const slides = Array.from(track.children);
        let slideIndex = 0;

        if(slides.length > 1) {
            setInterval(() => {
                slideIndex = (slideIndex + 1) % slides.length;
                const amountToMove = slideIndex * 100;
                track.style.transform = `translateX(-${amountToMove}%)`;
            }, 6000); // changes every 6 seconds
        }
    }
});
