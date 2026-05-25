/* Nav/footer HTML — keep in sync with partials/nav.html and partials/footer.html */
const NAV_HTML = `<nav class="navbar">
    <div class="nav-brand"><a href="index.html" class="brand-link">Sachin Chhabra</a></div>
    <ul class="nav-links" aria-label="Primary">
        <li class="nav-home"><a href="index.html" data-nav="index"><i class="fas fa-home" aria-hidden="true"></i><span class="nav-label-long">Home</span><span class="nav-label-short">Home</span></a></li>
        <li><a href="experience.html" data-nav="experience"><i class="fas fa-briefcase" aria-hidden="true"></i><span class="nav-label-long">Work Experience</span><span class="nav-label-short">Work</span></a></li>
        <li><a href="education.html" data-nav="education"><i class="fas fa-graduation-cap" aria-hidden="true"></i><span class="nav-label-long">Education</span><span class="nav-label-short">Edu</span></a></li>
        <li><a href="research.html" data-nav="research"><i class="fas fa-microscope" aria-hidden="true"></i><span class="nav-label-long">Research</span><span class="nav-label-short">Research</span></a></li>
        <li><a href="projects.html" data-nav="projects"><i class="fas fa-code-branch" aria-hidden="true"></i><span class="nav-label-long">Projects</span><span class="nav-label-short">Projects</span></a></li>
        <li><a href="contact.html" data-nav="contact"><i class="fas fa-envelope" aria-hidden="true"></i><span class="nav-label-long">Contact</span><span class="nav-label-short">Contact</span></a></li>
    </ul>
</nav>`;

const FOOTER_HTML = `<footer>
    <div class="footer-content">
        <p>&copy; Sachin Chhabra. All rights reserved.</p>
    </div>
</footer>`;

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
        const homeTab = nav.querySelector('.nav-home a');
        homeTab?.classList.add('active');

        if (window.matchMedia('(min-width: 1025px)').matches) {
            const brand = nav.querySelector('.brand-link');
            brand?.classList.add('active');
            brand?.setAttribute('aria-current', 'page');
        } else {
            homeTab?.setAttribute('aria-current', 'page');
        }
        return;
    }

    const activeLink = nav.querySelector(`[data-nav="${page}"]`);
    activeLink?.classList.add('active');
    activeLink?.setAttribute('aria-current', 'page');
}

function injectNav() {
    const navHost = document.getElementById('site-nav');
    if (navHost && !navHost.querySelector('.navbar')) {
        navHost.innerHTML = NAV_HTML;
    }
}

function injectFooter() {
    const footerHost = document.getElementById('site-footer');
    if (footerHost && !footerHost.querySelector('footer')) {
        footerHost.innerHTML = FOOTER_HTML;
    }
}

async function refreshPartial(elementId, url, fallbackHtml, afterLoad) {
    const host = document.getElementById(elementId);
    if (!host) {
        return;
    }

    try {
        const response = await fetch(url);
        if (response.ok) {
            host.innerHTML = await response.text();
            afterLoad?.(host);
        }
    } catch {
        /* Embedded HTML already in place */
    }
}

function finishSiteChrome() {
    const page = document.body.dataset.page || 'index';
    applyNavActive(page);
    injectFooter();

    if (window.location.protocol !== 'file:') {
        refreshPartial('site-nav', 'partials/nav.html', NAV_HTML, () => applyNavActive(page));
        refreshPartial('site-footer', 'partials/footer.html', FOOTER_HTML);
    }
}

injectNav();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', finishSiteChrome);
} else {
    finishSiteChrome();
}
