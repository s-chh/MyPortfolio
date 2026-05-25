function formatDuration(totalMonths) {
    if (totalMonths < 1) {
        return '< 1 mo';
    }

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const parts = [];

    if (years > 0) {
        parts.push(`${years} yr${years !== 1 ? 's' : ''}`);
    }
    if (months > 0) {
        parts.push(`${months} mo${months !== 1 ? 's' : ''}`);
    }

    return parts.join(' ');
}

function parseYearMonth(value) {
    const [year, month] = value.split('-').map(Number);
    return { year, month: month - 1 };
}

function computeDurationMonths(startValue, endValue) {
    const start = parseYearMonth(startValue);
    const end = endValue === 'present'
        ? { year: new Date().getFullYear(), month: new Date().getMonth() }
        : parseYearMonth(endValue);

    return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

function renderExperienceDurations() {
    document.querySelectorAll('.card-date[data-start][data-end]').forEach((dateEl) => {
        const durationEl = dateEl.querySelector('.card-duration');
        if (!durationEl) {
            return;
        }

        const months = computeDurationMonths(dateEl.dataset.start, dateEl.dataset.end);
        durationEl.textContent = `(${formatDuration(months)})`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderExperienceDurations();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const typedEl = document.querySelector('.typed');

    if (typedEl) {
        if (prefersReducedMotion || typeof Typed === 'undefined') {
            typedEl.textContent = 'Machine Learning Scientist';
        } else {
            new Typed('.typed', {
                strings: [
                    'Machine Learning Scientist',
                    'PhD Graduate',
                    'Computer Vision Researcher',
                ],
                typeSpeed: 70,
                backSpeed: 50,
                backDelay: 2000,
                loop: true,
            });
        }
    }
});
