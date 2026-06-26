/**
 * Koleksi Aya — Static Gallery
 * Loads data from data/gallery.json
 */

const REPO_OWNER = 'Ayakariz'; // Ganti dengan username GitHub kamu
const REPO_NAME = 'KoleksiPribadi'; // Ganti dengan nama repo
const DATA_URL = 'data/gallery.json';

let galleryData = [];
let currentCategory = 'all';

// ── Load Data ──────────────────────────────
async function loadGallery() {
    try {
        const res = await fetch(DATA_URL + '?t=' + Date.now());
        if (!res.ok) throw new Error('Failed to load');
        galleryData = await res.json();
        renderGallery();
        updateCounts();
    } catch (e) {
        console.error('Error loading gallery:', e);
        document.getElementById('emptyState').style.display = 'block';
    }
}

// ── Render Gallery ─────────────────────────
function renderGallery() {
    const masonry = document.getElementById('masonry');
    const emptyState = document.getElementById('emptyState');
    
    const filtered = currentCategory === 'all' 
        ? galleryData 
        : galleryData.filter(img => img.category === currentCategory);

    if (filtered.length === 0) {
        masonry.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    
    masonry.innerHTML = filtered.map((img, index) => `
        <div class="card" style="animation-delay: ${index * 0.02}s">
            <div class="card-img-wrap" onclick="openLightbox('${img.filename}', '${img.source_url || ''}', '${escapeHtml(img.caption || '')}')">
                <img 
                    src="images/${img.category}/${img.filename}" 
                    alt="${escapeHtml(img.caption || img.filename)}"
                    loading="lazy"
                    class="card-img"
                    onerror="this.parentElement.parentElement.style.display='none'"
                >
                <div class="card-overlay">
                    ${img.source_url ? `
                    <a href="${img.source_url}" target="_blank" rel="noopener" class="source-link" onclick="event.stopPropagation()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Sumber Asli
                    </a>
                    ` : ''}
                    ${img.caption ? `<span class="card-caption">${escapeHtml(img.caption)}</span>` : ''}
                </div>
            </div>
            <div class="card-badge ${img.category}">${img.category}</div>
        </div>
    `).join('');
}

// ── Update Counts ──────────────────────────
function updateCounts() {
    const allCount = galleryData.length;
    const cosplayCount = galleryData.filter(i => i.category === 'cosplay').length;
    const fanartCount = galleryData.filter(i => i.category === 'fanart').length;
    
    document.getElementById('count-all').textContent = allCount;
    // You can add counts for cosplay/fanart if you add the elements
}

// ── Category Filter ────────────────────────
document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.cat;
        renderGallery();
    });
});

// ── Lightbox ───────────────────────────────
function openLightbox(filename, sourceUrl, caption) {
    const category = galleryData.find(i => i.filename === filename)?.category || 'cosplay';
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-caption');
    const src = document.getElementById('lightbox-source');
    
    img.src = `images/${category}/${filename}`;
    cap.textContent = caption || '';
    
    if (sourceUrl && sourceUrl !== 'undefined' && sourceUrl !== '') {
        src.href = sourceUrl;
        src.style.display = 'inline-flex';
    } else {
        src.style.display = 'none';
    }
    
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox') || e.target.className === 'lightbox-close') {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ── Helpers ────────────────────────────────
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ── Init ───────────────────────────────────
loadGallery();
