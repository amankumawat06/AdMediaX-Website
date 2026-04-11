(function () {
    const btn      = document.getElementById('hamburger');
    const drawer   = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close');
 
    function openDrawer() {
        drawer.classList.add('is-open');
        backdrop.classList.add('is-open');
        btn.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
 
    function closeDrawer() {
        drawer.classList.remove('is-open');
        backdrop.classList.remove('is-open');
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
 
    btn.addEventListener('click', () =>
        drawer.classList.contains('is-open') ? closeDrawer() : openDrawer()
    );
    closeBtn.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
 
    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
    });
 
    // Close when a drawer link is tapped
    document.querySelectorAll('.drawer-link, .drawer-ai-btn, .drawer-start-btn')
        .forEach(a => a.addEventListener('click', closeDrawer));
})();