// === TREZE LABS - INDRA STUDIO FLORAL - COMMAND CENTER ===
(function() {
    console.log("%c TREZE LABS - Indra Studio Command Center", "color: #CBAE9D; font-weight: bold; font-size: 14px;");
    
    var allowedDomains = ["indra-studio-floral.vercel.app", "indra-studio-floral-web.vercel.app", "localhost", "127.0.0.1"];
    var currentDomain = window.location.hostname;
    if (allowedDomains.indexOf(currentDomain) === -1 && currentDomain !== "") {
        document.addEventListener('DOMContentLoaded', function() {
            document.body.innerHTML = '<div style="height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0f172a;color:#f8fafc;font-family:monospace;text-align:center;padding:20px"><h1 style="color:#ef4444;font-size:3rem;margin-bottom:20px">ACCESO DENEGADO</h1><p style="font-size:1.2rem;max-width:600px;line-height:1.6;color:#94a3b8">Panel de Administración Bloqueado. Dominio no autorizado.</p><a href="https://wa.me/522214092478" style="margin-top:40px;padding:15px 30px;border:1px solid #38bdf8;color:#38bdf8;text-decoration:none;border-radius:8px">Contactar Treze Labs</a></div>';
        });
        throw new Error("Dominio no autorizado.");
    }
})();

const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzWw3wuToMWeNC0nUg_mSGDjrRC857r_YUaUH26kF6RAUPJKE_pUjcO2A9yWea4AX9K/exec"; 

// ══════════════════════════════════════
// CATÁLOGO PRE-CARGADO (Productos reales de Indra)
// ══════════════════════════════════════
const CATALOGO_INICIAL = [
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

let catalogoData = [];

// ══════════════════════════════════════
// NAVEGACIÓN
// ══════════════════════════════════════
function switchView(viewId, el) {
    document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
}

// ══════════════════════════════════════
// INICIALIZACIÓN
// ══════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    if(WEBAPP_URL === "PEGAR_AQUI_LA_URL_DEL_SCRIPT") {
        document.getElementById('app-loader').style.display = 'none';
        catalogoData = [...CATALOGO_INICIAL];
        renderProductos();
        updateStats();
    } else {
        fetchDatos();
    }
});

// ══════════════════════════════════════
// UTILIDADES
// ══════════════════════════════════════
function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerHTML = `<i class="ri-checkbox-circle-fill"></i> ${msg}`;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function showLoader() { document.getElementById('app-loader').style.display = 'flex'; }
function hideLoader() { document.getElementById('app-loader').style.display = 'none'; }

function updateStats() {
    const countEl = document.getElementById('stat-products');
    const statusEl = document.getElementById('stat-status');
    const promoEl = document.getElementById('stat-promo');
    const catCountEl = document.getElementById('cat-count');

    if(countEl) countEl.textContent = catalogoData.length;
    if(catCountEl) catCountEl.textContent = catalogoData.length;

    const statusVal = document.getElementById('config-status');
    if(statusEl && statusVal) {
        statusEl.textContent = statusVal.value === 'ABIERTO' ? '🟢 Abierto' : '🔴 Cerrado';
    }

    const promoVal = document.getElementById('promo-active');
    if(promoEl && promoVal) {
        promoEl.textContent = promoVal.value === 'SI' ? '📢 Activa' : '— Off';
    }
}

// ══════════════════════════════════════
// FETCH DESDE GOOGLE SHEETS
// ══════════════════════════════════════
async function fetchDatos() {
    try {
        const res = await fetch(WEBAPP_URL + "?action=get");
        const data = await res.json();
        
        // Cargar Config
        if(data.config) {
            if(document.getElementById('config-status')) document.getElementById('config-status').value = data.config.tiendaStatus || 'ABIERTO';
            if(document.getElementById('config-banner')) document.getElementById('config-banner').value = data.config.banner || '';
            if(document.getElementById('config-horario')) document.getElementById('config-horario').value = data.config.horario || '';
            if(document.getElementById('promo-active')) document.getElementById('promo-active').value = data.config.promoActive || 'NO';
            if(document.getElementById('promo-title')) document.getElementById('promo-title').value = data.config.promoTitle || '';
            if(document.getElementById('promo-desc')) document.getElementById('promo-desc').value = data.config.promoDesc || '';
            // Flor de Temporada
            if(document.getElementById('season-name')) document.getElementById('season-name').value = data.config.seasonName || '';
            if(document.getElementById('season-canva-url')) document.getElementById('season-canva-url').value = data.config.seasonCanvaUrl || '';
            if(document.getElementById('season-dispo')) document.getElementById('season-dispo').value = data.config.seasonDispo || 'En Stock';
            if(document.getElementById('season-price')) document.getElementById('season-price').value = data.config.seasonPrice || '';
            if(document.getElementById('season-note')) document.getElementById('season-note').value = data.config.seasonNote || '';
            // Eventos
            if(document.getElementById('evento-titulo')) document.getElementById('evento-titulo').value = data.config.eventoTitulo || '';
            if(document.getElementById('evento-desc')) document.getElementById('evento-desc').value = data.config.eventoDesc || '';
            if(document.getElementById('evento-fecha')) document.getElementById('evento-fecha').value = data.config.eventoFecha || '';
            if(document.getElementById('evento-hora')) document.getElementById('evento-hora').value = data.config.eventoHora || '';
            if(document.getElementById('evento-precio')) document.getElementById('evento-precio').value = data.config.eventoPrecio || '';
        }

        // Cargar Productos (si hay en BD, usar esos; si no, usar catálogo inicial)
        if(data.productos && data.productos.length > 0) {
            catalogoData = data.productos;
        } else {
            catalogoData = [...CATALOGO_INICIAL];
        }
        renderProductos();
        updateStats();
        hideLoader();
    } catch(err) {
        console.error(err);
        // Si falla la conexión, cargar catálogo inicial
        catalogoData = [...CATALOGO_INICIAL];
        renderProductos();
        updateStats();
        hideLoader();
    }
}

// ══════════════════════════════════════
// POST A GOOGLE SHEETS
// ══════════════════════════════════════
async function saveData(payload, successMsg) {
    if(WEBAPP_URL === "PEGAR_AQUI_LA_URL_DEL_SCRIPT") {
        showToast(successMsg + " (Simulado)");
        return;
    }
    showLoader();
    try {
        await fetch(WEBAPP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        });
        hideLoader();
        showToast(successMsg);
        updateStats();
    } catch(err) {
        hideLoader();
        alert("Error enviando datos.");
    }
}

// ══════════════════════════════════════
// CONFIGURACIÓN COMPLETA (envía TODO)
// ══════════════════════════════════════
function getFullConfig() {
    return {
        tiendaStatus: document.getElementById('config-status') ? document.getElementById('config-status').value : '',
        banner: document.getElementById('config-banner') ? document.getElementById('config-banner').value : '',
        horario: document.getElementById('config-horario') ? document.getElementById('config-horario').value : '',
        promoActive: document.getElementById('promo-active') ? document.getElementById('promo-active').value : '',
        promoTitle: document.getElementById('promo-title') ? document.getElementById('promo-title').value : '',
        promoDesc: document.getElementById('promo-desc') ? document.getElementById('promo-desc').value : '',
        // Flor de Temporada
        seasonName: document.getElementById('season-name') ? document.getElementById('season-name').value : '',
        seasonCanvaUrl: document.getElementById('season-canva-url') ? document.getElementById('season-canva-url').value : '',
        seasonDispo: document.getElementById('season-dispo') ? document.getElementById('season-dispo').value : '',
        seasonPrice: document.getElementById('season-price') ? document.getElementById('season-price').value : '',
        seasonNote: document.getElementById('season-note') ? document.getElementById('season-note').value : '',
        // Eventos
        eventoTitulo: document.getElementById('evento-titulo') ? document.getElementById('evento-titulo').value : '',
        eventoDesc: document.getElementById('evento-desc') ? document.getElementById('evento-desc').value : '',
        eventoFecha: document.getElementById('evento-fecha') ? document.getElementById('evento-fecha').value : '',
        eventoHora: document.getElementById('evento-hora') ? document.getElementById('evento-hora').value : '',
        eventoPrecio: document.getElementById('evento-precio') ? document.getElementById('evento-precio').value : ''
    };
}

function salvarConfiguracion() {
    saveData({ action: 'saveConfig', data: getFullConfig() }, "Configuración Guardada ✓");
    updateStats();
}

function salvarTemporada() {
    saveData({ action: 'saveConfig', data: getFullConfig() }, "Flor de Temporada Actualizada 🌸");
}

function salvarEvento() {
    saveData({ action: 'saveConfig', data: getFullConfig() }, "Cartelera de Talleres Actualizada ✓");
}

// ══════════════════════════════════════
// CATÁLOGO FLORAL (CRUD)
// ══════════════════════════════════════
function renderProductos() {
    const div = document.getElementById('dom-productos');
    if(!div) return;
    div.innerHTML = '';
    
    if(catalogoData.length === 0) {
        div.innerHTML = '<div style="text-align:center; padding:40px; color:var(--text-dim);"><i class="ri-flower-line" style="font-size:3rem; display:block; margin-bottom:10px;"></i>Tu catálogo está vacío. Agrega tu primer producto.</div>';
        return;
    }

    catalogoData.forEach(p => {
        const statusClass = p.status === 'DISPONIBLE' ? 'status-on' : (p.status === 'SOBRE PEDIDO' ? 'status-on' : 'status-off');
        div.innerHTML += `
        <div class="product-item">
            <div class="product-info">
                <div>
                    <div class="product-title">${p.nombre}</div>
                    <div class="product-cat">${p.categoria || ''}</div>
                    <div class="product-price">Desde $${p.precio} MXN</div>
                </div>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <span class="status-badge ${statusClass}">${p.status}</span>
                <button class="btn btn-secondary" onclick="editProduct('${p.id}')">Editar</button>
            </div>
        </div>
        `;
    });
}

function openProductModal() {
    document.getElementById('p-id').value = '';
    document.getElementById('p-name').value = '';
    document.getElementById('p-category').value = '💐 Arreglos Florales';
    document.getElementById('p-price').value = '';
    document.getElementById('p-status').value = 'DISPONIBLE';
    document.getElementById('p-desc').value = '';
    document.getElementById('btn-delete').style.display = 'none';
    document.getElementById('modal-title').innerText = 'Nuevo Producto';
    document.getElementById('modal-product').classList.add('show');
}

function editProduct(id) {
    const p = catalogoData.find(x => x.id === id);
    if(!p) return;
    document.getElementById('p-id').value = p.id;
    document.getElementById('p-name').value = p.nombre;
    if(p.categoria) document.getElementById('p-category').value = p.categoria;
    document.getElementById('p-price').value = p.precio;
    document.getElementById('p-status').value = p.status;
    document.getElementById('p-desc').value = p.desc || '';
    document.getElementById('btn-delete').style.display = 'block';
    document.getElementById('modal-title').innerText = 'Editar Producto';
    document.getElementById('modal-product').classList.add('show');
}

function guardarProducto() {
    const id = document.getElementById('p-id').value || 'indra_' + Date.now();
    const data = {
        id: id,
        nombre: document.getElementById('p-name').value,
        categoria: document.getElementById('p-category').value,
        precio: document.getElementById('p-price').value,
        status: document.getElementById('p-status').value,
        desc: document.getElementById('p-desc').value
    };

    const isEdit = document.getElementById('p-id').value !== '';
    if(isEdit) {
        const idx = catalogoData.findIndex(x => x.id === id);
        catalogoData[idx] = data;
    } else {
        catalogoData.push(data);
    }
    
    renderProductos();
    updateStats();
    document.getElementById('modal-product').classList.remove('show');

    saveData({
        action: 'saveProducts',
        productos: catalogoData
    }, "Catálogo Sincronizado ✓");
}

function eliminarProducto() {
    if(!confirm("¿Seguro que deseas eliminar este producto del catálogo?")) return;
    const id = document.getElementById('p-id').value;
    catalogoData = catalogoData.filter(x => x.id !== id);
    renderProductos();
    updateStats();
    document.getElementById('modal-product').classList.remove('show');

    saveData({
        action: 'saveProducts',
        productos: catalogoData
    }, "Producto Eliminado");
}
