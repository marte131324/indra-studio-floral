// === TREZE LABS ANTI-CLONE & EASTER EGG ===
(function() {
    const signature = `
    ████████╗██████╗ ███████╗███████╗███████╗    ██╗      █████╗ ██████╗ ███████╗
    ╚══██╔══╝██╔══██╗██╔════╝╚══███╔╝██╔════╝    ██║     ██╔══██╗██╔══██╗██╔════╝
       ██║   ██████╔╝█████╗    ███╔╝ █████╗      ██║     ███████║██████╔╝███████╗
       ██║   ██╔══██╗██╔══╝   ███╔╝  ██╔══╝      ██║     ██╔══██║██╔══██╗╚════██║
       ██║   ██║  ██║███████╗███████╗███████╗    ███████╗██║  ██║██████╔╝███████║
       ╚═╝   ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝    ╚══════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
    `;
    console.log("%c" + signature, "color: #38bdf8; font-weight: bold;");
    console.log("%c⚠️ ALERTA DE PROPIEDAD INTELECTUAL", "color: #ef4444; font-size: 16px; font-weight: bold;");
    
    // Domain Lock (Anti-Clonación)
    const allowedDomains = ["indra-studio-floral-web.vercel.app", "indra-studio-floral.vercel.app", "localhost", "127.0.0.1"];
    const currentDomain = window.location.hostname;
    
    if (allowedDomains.indexOf(currentDomain) === -1 && currentDomain !== "") {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.innerHTML = '<div style="height:100vh; display:flex; align-items:center; justify-content:center; background:#0f172a; color:#ef4444; font-family:monospace; font-size: 2rem;text-align:center;">🚨 ACCESO DENEGADO<br>VIOLACIÓN DE PROPIEDAD INTELECTUAL 🚨</div>';
        });
        throw new Error("Ejecución detenida: Violación de Propiedad Intelectual.");
    }
})();

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
            loadDynamicData();
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
        const vcardData = `BEGIN:VCARD\nVERSION:3.0\nN:Indra Studio;Floral;;;\nFN:Indra Studio Floral\nORG:Indra Studio Floral\nTITLE:Café entre flores\nTEL;TYPE=CELL:522293706307\nURL:https://indra-studio-floral-web.vercel.app\nNOTE:Café entre flores. Creamos experiencias botánicas memorables y arreglos florales curados.\nEND:VCARD`;
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
    const modalWaBtn = document.getElementById('modal-wa-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-src');
            modalImg.src = src;
            
            // Build the WhatsApp message payload with the public Vercel URL
            const publicUrl = "https://indra-studio-floral-web.vercel.app/" + encodeURI(src);
            const waMessage = "Hola! Quisiera cotizar un arreglo/detalle tomando esta foto como referencia:\n" + publicUrl;
            modalWaBtn.href = "https://wa.me/522293706307?text=" + encodeURIComponent(waMessage);

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
        const details = document.getElementById('event-details').value;

        const message = `¡Hola Indra Studio Floral! 🌿 Me gustaría solicitar una cotización real (sujeta a temporada/existencia):\n\n*Tipo:* ${type}\n*Fecha:* ${date}\n*Detalles:* ${details || 'Sin detalles adicionales'}`;
        
        const waUrl = `https://wa.me/522293706307?text=${encodeURIComponent(message)}`;
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
                    text: 'Café entre flores',
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

    // 13. Dynamic Data Connection (Treze Labs Webhook API)
    function loadDynamicData() {
        const scriptUrl = 'https://script.google.com/macros/s/AKfycbzWw3wuToMWeNC0nUg_mSGDjrRC857r_YUaUH26kF6RAUPJKE_pUjcO2A9yWea4AX9K/exec';
        
        // Simular catálogo pre-cargado si no hay BD o mientras carga
        const FALLBACK_CATALOG = [
            { id: 'indra_001', nombre: 'Ramo de Novia Clásico', categoria: '🌹 Ramos de Novia', precio: '1800', status: 'DISPONIBLE', desc: 'Ramo de novia con rosas blancas, eucalipto y follaje natural. Incluye listón personalizado.' },
            { id: 'indra_002', nombre: 'Ramo de Novia Silvestre', categoria: '🌹 Ramos de Novia', precio: '2200', status: 'DISPONIBLE', desc: 'Estilo bohemio con flores silvestres, astilbe y ramitas de olivo. Acabado orgánico.' },
            { id: 'indra_003', nombre: 'Arreglo Centro de Mesa', categoria: '💐 Arreglos Florales', precio: '650', status: 'DISPONIBLE', desc: 'Centro de mesa elegante con flores de temporada. Ideal para eventos y bodas. Precio por pieza.' },
            { id: 'indra_004', nombre: 'Bouquet Sorpresa', categoria: '🌿 Bouquets', precio: '450', status: 'DISPONIBLE', desc: 'Bouquet mixto con flores frescas de la semana. Perfecto para regalar sin ocasión especial.' },
            { id: 'indra_005', nombre: 'Arreglo Premium', categoria: '💐 Arreglos Florales', precio: '1200', status: 'DISPONIBLE', desc: 'Arreglo de autor con peonías, rosas garden y complementos de temporada en base de cerámica.' },
            { id: 'indra_006', nombre: 'Hatbox Floral', categoria: '🎁 Cajas / Hatboxes', precio: '850', status: 'DISPONIBLE', desc: 'Caja redonda con rosas preservadas y flores frescas. Presentación premium.' },
            { id: 'indra_007', nombre: 'Decoración Ceremonia Completa', categoria: '🏠 Decoración Evento', precio: '8500', status: 'SOBRE PEDIDO', desc: 'Paquete de decoración floral para ceremonia: altar, camino y sillas. Cotización personalizada.' },
            { id: 'indra_008', nombre: 'Bouquet Petite', categoria: '🌿 Bouquets', precio: '280', status: 'DISPONIBLE', desc: 'Ramo compacto y delicado, ideal para detalle express o acompañamiento de regalo.' },
            { id: 'indra_009', nombre: 'Arreglo Condolencias', categoria: '💐 Arreglos Florales', precio: '750', status: 'DISPONIBLE', desc: 'Arreglo con tonos blancos y verdes. Diseño sobrio y elegante para momentos sensibles.' },
            { id: 'indra_010', nombre: 'Suscripción Mensual Básica', categoria: '🌸 Temporada', precio: '400', status: 'DISPONIBLE', desc: 'Entrega mensual de un bouquet fresco de temporada a tu domicilio.' },
            { id: 'indra_011', nombre: 'Suscripción Mensual Premium', categoria: '🌸 Temporada', precio: '750', status: 'DISPONIBLE', desc: 'Entrega mensual de arreglo grande con flores selectas + nota personalizada.' },
            { id: 'indra_012', nombre: 'Planta Suculenta en Maceta', categoria: '🪴 Plantas', precio: '180', status: 'DISPONIBLE', desc: 'Suculenta en maceta artesanal decorativa. Bajo mantenimiento, ideal para escritorio.' },
        ];

        fetch(scriptUrl + "?action=get")
            .then(res => res.json())
            .then(data => {
                if(data.config) {
                    const c = data.config;

                    // A) Banner Global
                    const banner = document.getElementById('global-banner');
                    if (banner && c.banner && c.banner.trim() !== '') {
                        banner.innerHTML = c.banner;
                        banner.style.display = 'block';
                    }

                    // B) Promo Modal
                    if (c.promoActive === 'SI' && c.promoTitle && c.promoDesc) {
                        const promoModal = document.getElementById('promo-modal');
                        if(promoModal && document.getElementById('promo-title-display')) {
                            document.getElementById('promo-title-display').textContent = c.promoTitle;
                            document.getElementById('promo-desc-display').textContent = c.promoDesc;
                            
                            if(sessionStorage.getItem('promo_closed') !== 'true') {
                                setTimeout(() => {
                                    promoModal.style.display = 'flex';
                                    void promoModal.offsetWidth;
                                    promoModal.style.opacity = '1';
                                    promoModal.querySelector('.modal-content').style.transform = 'translateY(0)';
                                }, 500);

                                document.querySelector('#promo-modal .btn-save').addEventListener('click', () => {
                                    sessionStorage.setItem('promo_closed', 'true');
                                });
                                document.querySelector('#promo-modal .fa-times').parentElement.addEventListener('click', () => {
                                    sessionStorage.setItem('promo_closed', 'true');
                                });
                            }
                        }
                    }

                    // C) Status Badge Tienda & Horario
                    const badgeDot = document.getElementById('store-status-dot');
                    const badgeText = document.getElementById('store-status-text');
                    
                    if (badgeDot && badgeText) {
                        if (c.tiendaStatus === 'CERRADO') {
                            badgeDot.style.background = '#ef4444';
                            badgeText.textContent = 'Cerrado Temporalmente';
                            badgeText.style.color = '#ef4444';
                        } else {
                            badgeDot.style.background = '#4ade80';
                            let txt = 'Abierto Hoy';
                            if(c.horario && c.horario.trim() !== '') txt += ` · ${c.horario}`;
                            badgeText.textContent = txt;
                            badgeText.style.color = 'var(--text-muted)';
                        }
                    }

                    // D) Flor de Temporada (Canva Dinámico)
                    const sfSection = document.getElementById('season-flower-section');
                    if(sfSection && c.seasonCanvaUrl && c.seasonName) {
                        sfSection.style.display = 'block';
                        document.getElementById('season-title-display').textContent = c.seasonName;
                        if(c.seasonPrice) document.getElementById('season-price-display').textContent = `Sujeto a Cotización`;
                        if(c.seasonNote) document.getElementById('season-note-display').textContent = c.seasonNote;
                        
                        const sBadge = document.getElementById('season-status-badge');
                        if(sBadge) {
                            sBadge.textContent = c.seasonDispo || 'En Stock';
                            if(c.seasonDispo === 'Agotada') {
                                sBadge.style.background = 'rgba(239, 68, 68, 0.1)';
                                sBadge.style.color = '#ef4444';
                            } else if(c.seasonDispo === 'Últimas Unidades') {
                                sBadge.style.background = 'rgba(234, 179, 8, 0.1)';
                                sBadge.style.color = '#eab308';
                            } else {
                                sBadge.style.background = 'rgba(16, 185, 129, 0.1)';
                                sBadge.style.color = '#10b981';
                            }
                        }

                        // Inyectar iframe canva
                        const canvaContainer = document.getElementById('season-canva-container');
                        canvaContainer.innerHTML = `
                            <iframe 
                                loading="lazy" 
                                style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0; margin: 0; pointer-events: none;"
                                src="${c.seasonCanvaUrl}" 
                                allowfullscreen="allowfullscreen" 
                                allow="fullscreen">
                            </iframe>
                            <a href="https://www.canva.com/" target="_blank" rel="noopener" style="position: absolute; bottom: 5px; right: 5px; font-size: 0.6rem; color: rgba(0,0,0,0.1); text-decoration: none;">Diseñado en Canva</a>
                        `;
                    }
                }

                // E) Render Catálogo
                const prods = (data.productos && data.productos.length > 0) ? data.productos : FALLBACK_CATALOG;
                const grid = document.getElementById('productos-dinamicos');
                if(grid) {
                    grid.innerHTML = '';
                    prods.forEach(p => {
                        grid.innerHTML += `
                            <div class="product-card">
                                <div class="product-info-web">
                                    <h3>${p.nombre}</h3>
                                    <div class="cat">${p.categoria || 'Catálogo'} &nbsp;·&nbsp; <span class="${p.status === 'AGOTADO' ? 'text-red' : 'text-green'}" style="color:${p.status === 'AGOTADO' ? '#ef4444' : '#10b981'}; font-weight:600;">${p.status || 'Disponible'}</span></div>
                                    <p>${p.desc || ''}</p>
                                </div>
                                <a href="https://wa.me/522293706307?text=Hola,%20me%20interesa%20cotizar%20el%20producto:%20${encodeURIComponent(p.nombre)}" target="_blank" class="btn-wa">
                                    <i class="fa-brands fa-whatsapp"></i>
                                </a>
                            </div>
                        `;
                    });
                }
            })
            .catch(err => console.error("Error cargando DB:", err));
    }
});
