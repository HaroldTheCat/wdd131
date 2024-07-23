function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    const isExpanded = navLinks.classList.toggle('show');
    const hamburgerButton = document.querySelector('.hamburger');

    navLinks.setAttribute('aria-hidden', !isExpanded);
    hamburgerButton.setAttribute('aria-expanded', isExpanded);

    const links = navLinks.querySelectorAll('a, button');
    if (isExpanded) {
        // Remove tabindex when menu is expanded
        links.forEach(link => {
            link.removeAttribute('tabindex');
        });
        // Focus the first link in the navigation when opened
        navLinks.querySelector('a').focus();
    } else {
        // Add tabindex -1 when menu is hidden
        links.forEach(link => {
            link.setAttribute('tabindex', '-1');
        });
        // Focus the hamburger button when menu is closed
        hamburgerButton.focus();
    }
}