document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});


// --- PREMIUM CURSOR WITH TRAIL LOGIC (AUTO-INJECT) ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Auto-Inject HTML if it doesn't exist on the page
    let dot = document.querySelector('.cursor-dot');
    let trailContainer = document.getElementById('trailContainer');

    if (!dot) {
        dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(dot);
    }
    if (!trailContainer) {
        trailContainer = document.createElement('div');
        trailContainer.id = 'trailContainer';
        trailContainer.className = 'cursor-trail-container';
        document.body.appendChild(trailContainer);
    }

    // 2. Cursor Tracking Logic
    let mouseX = 0;
    let mouseY = 0;
    let lastSpawningX = 0;
    let lastSpawningY = 0;
    const minDistBeforeSpawning = 15; 

    function getDist(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Move dot
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';

        // Spawn trails
        const distMoved = getDist(mouseX, mouseY, lastSpawningX, lastSpawningY);
        if (distMoved > minDistBeforeSpawning) {
            createTrailRing(mouseX, mouseY);
            lastSpawningX = mouseX;
            lastSpawningY = mouseY;
        }
    });

    function createTrailRing(x, y) {
        const ring = document.createElement('div');
        ring.classList.add('trail-ring');
        ring.style.left = x + 'px';
        ring.style.top = y + 'px';
        
        trailContainer.appendChild(ring);

        setTimeout(() => {
            ring.remove();
        }, 600);
    }

    // 3. Hover Effects for Interactive Elements
    // Use event delegation so it works on elements added later (like tabs)
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
            target.closest('button') || target.closest('a') || 
            target.tagName === 'INPUT' || target.tagName === 'SELECT') {
            dot.classList.add('hovering');
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
            target.closest('button') || target.closest('a') || 
            target.tagName === 'INPUT' || target.tagName === 'SELECT') {
            dot.classList.remove('hovering');
        }
    });
});