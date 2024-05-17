document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const navbar = document.querySelector(".gameboy-navbar ul");

    function toggleMenuItems() {
        navbar.classList.toggle("hide-items");
    }

    function handleResize() {
        if (window.innerWidth >= 1000) {
            navbar.classList.remove("hide-items");
        }
    }

    menuButton.addEventListener("click", toggleMenuItems);
    window.addEventListener("resize", handleResize);

    // Ensure correct visibility on initial load
    handleResize();
});
document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.querySelector(".gallery");
    let viewer;

    function viewerTemplate(pic, alt) {
        return `
            <div class="viewer hide">
                <button class="close-viewer">X</button>
                <img src="${pic}" alt="${alt}">
            </div>`;
    }

    function viewHandler(event) {
        if (event.target.tagName === 'IMG') {
            const imgSrc = event.target.dataset.full; // Use data-full attribute for the full-sized image
            const imgAlt = event.target.alt;
            document.body.insertAdjacentHTML('beforeend', viewerTemplate(imgSrc, imgAlt));
            viewer = document.querySelector('.viewer');
            viewer.classList.remove('hide');
            document.querySelector('.close-viewer').addEventListener('click', closeViewer);
        }
    }

    function closeViewer() {
        viewer.classList.add('hide');
        setTimeout(() => viewer.remove(), 300); // Allow animation to complete
    }

    gallery.addEventListener("click", viewHandler);
});
