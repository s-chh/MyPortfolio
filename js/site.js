async function injectPartial(elementId, url, afterLoad) {
    const host = document.getElementById(elementId);
    if (!host) {
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        host.innerHTML = await response.text();
        afterLoad?.(host);
    } catch (error) {
        console.warn(`Failed to load ${url}:`, error);
    }
}

function applyNavActive(page) {
    const nav = document.querySelector('#site-nav .navbar');
    if (!nav) {
        return;
    }

    nav.querySelectorAll('.active, [aria-current="page"]').forEach((el) => {
        el.classList.remove('active');
        el.removeAttribute('aria-current');
    });

    if (page === 'index') {
        const brand = nav.querySelector('.brand-link');
        brand?.classList.add('active');
        brand?.setAttribute('aria-current', 'page');
        nav.querySelector('.nav-home a')?.classList.add('active');
        return;
    }

    const activeLink = nav.querySelector(`[data-nav="${page}"]`);
    activeLink?.classList.add('active');
    activeLink?.setAttribute('aria-current', 'page');
}

async function loadSiteChrome() {
    const page = document.body.dataset.page || 'index';

    await Promise.all([
        injectPartial('site-nav', 'partials/nav.html', () => applyNavActive(page)),
        injectPartial('site-footer', 'partials/footer.html'),
    ]);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSiteChrome);
} else {
    loadSiteChrome();
}
