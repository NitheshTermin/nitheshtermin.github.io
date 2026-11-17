function formatExperience(startYear, startMonth, currentDate = new Date()) {
    const totalMonths = (currentDate.getFullYear() - startYear) * 12
        + currentDate.getMonth() + 1 - startMonth;
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    const yearText = `${years} ${years === 1 ? 'year' : 'years'}`;
    return months === 0 ? yearText : `${yearText}, ${months} ${months === 1 ? 'month' : 'months'}`;
}

const [careerStartYear, careerStartMonth] = document.querySelector('#career-start').dateTime.split('-').map(Number);
document.querySelector('#experience').textContent =
    `${formatExperience(careerStartYear, careerStartMonth)} of professional experience`;

const header = document.querySelector('.site-header');
const navigation = document.querySelector('#navigation');
const toggle = document.querySelector('.nav-toggle');
const mobileLayout = window.matchMedia('(max-width: 680px)');

function closeNavigation() {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
}

function updateNavigationLayout() {
    closeNavigation();
    toggle.hidden = !mobileLayout.matches;
}

toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    header.classList.toggle('nav-open', expanded);
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Close' : 'Menu';
});

navigation.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNavigation);
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('nav-open')) {
        closeNavigation();
        toggle.focus();
    }
});

header.addEventListener('focusout', event => {
    if (!header.contains(event.relatedTarget)) {
        closeNavigation();
    }
});

mobileLayout.addEventListener('change', updateNavigationLayout);
header.classList.add('nav-enhanced');
updateNavigationLayout();

const layerButtons = document.querySelectorAll('[data-layer]');
const layerPanels = document.querySelectorAll('.layer-panel');
const explorerStatus = document.querySelector('.explorer-status');

function selectLayer(button) {
    layerButtons.forEach(control => {
        control.setAttribute('aria-pressed', String(control === button));
    });
    layerPanels.forEach(panel => {
        panel.hidden = panel.id !== button.getAttribute('aria-controls');
    });
    explorerStatus.textContent = `Exploring ${button.querySelector('strong').textContent.toLowerCase()}. Details updated.`;
}

layerButtons.forEach(button => {
    button.addEventListener('click', () => selectLayer(button));
});

document.querySelectorAll('[data-explore-layer]').forEach(link => {
    link.addEventListener('click', () => {
        const button = [...layerButtons].find(control => control.dataset.layer === link.dataset.exploreLayer);
        selectLayer(button);
    });
});

layerPanels.forEach((panel, index) => {
    panel.hidden = index !== 0;
});
document.querySelector('.explorer-layout').classList.add('is-interactive');
document.querySelector('.layer-controls').hidden = false;

const focusButtons = document.querySelectorAll('[data-focus]');
const experienceItems = document.querySelectorAll('[data-focus-areas]');
const experienceCards = document.querySelectorAll('.experience-card');
const filterStatus = document.querySelector('.filter-status');

function filterExperience(button) {
    const focus = button.dataset.focus;
    focusButtons.forEach(control => {
        control.setAttribute('aria-pressed', String(control === button));
    });
    experienceItems.forEach(item => {
        item.hidden = focus !== 'all' && !item.dataset.focusAreas.split(' ').includes(focus);
    });
    const visibleRoles = [...experienceCards].filter(card => !card.hidden).length;
    filterStatus.textContent = `${visibleRoles} roles shown / ${button.textContent}`;
}

focusButtons.forEach(button => {
    button.addEventListener('click', () => filterExperience(button));
});

function revealLinkedExperience(hash) {
    const target = document.getElementById(hash.slice(1));
    if (target && target.closest('.experience-card[hidden]')) {
        filterExperience(focusButtons[0]);
        target.scrollIntoView();
    }
}

filterExperience(focusButtons[0]);
document.querySelector('.work-filters').hidden = false;
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => revealLinkedExperience(link.hash));
});
window.addEventListener('hashchange', () => revealLinkedExperience(window.location.hash));
revealLinkedExperience(window.location.hash);
