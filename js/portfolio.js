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
