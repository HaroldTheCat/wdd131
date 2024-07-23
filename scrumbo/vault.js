let enteredCode = "";
const codes = {
    "0001": function() { loadBlogPost('post1.html'); },
    "0002": function() { loadBlogPost('post2.html'); },
    "0003": function() { loadBlogPost('post3.html'); },
    "0004": function() { loadBlogPost('post4.html'); },
    "0005": function() { loadBlogPost('post5.html'); },
    "1987": function() { rickRoll(); }, // Rick Roll code
    "1993": function() { loadDoom(); }, // Doom 1993 (Freeware)

    // Add more codes and associated blog posts as needed
};

function enterDigit(digit) {
    if (enteredCode.length < 4) {
        enteredCode += digit;
        document.getElementById("display").innerText = enteredCode;
    }
}

function clearDisplay() {
    enteredCode = "";
    document.getElementById("display").innerText = "";
}

function checkCode() {
    if (codes[enteredCode]) {
        codes[enteredCode](); // Execute the function associated with the entered code
    } else {
        alert("Incorrect Code. Try Again.");
        clearDisplay();
    }
}

function loadBlogPost(post) {
    const modal = document.getElementById('myModal');
    const span = document.querySelector('.close');
    const modalBody = document.getElementById('modal-body');

    fetch(`blog_posts/${post}`)
        .then(response => response.text())
        .then(data => {
            modalBody.innerHTML = data;
            modal.style.display = 'block';
            span.focus();
        })
        .catch(error => {
            modalBody.textContent = 'Failed to load content.';
            console.error('Error loading blog post:', error);
        });

    span.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function rickRoll() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

document.addEventListener('DOMContentLoaded', () => {
    const span = document.querySelector('.close');
    span.onclick = function() {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        const modal = document.getElementById('myModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
});

let currentPage = 0;
let gravityInterval;

function openYellowPagesBook() {
    document.getElementById('yellowPagesFlippable').style.display = 'block';
    showPage(currentPage);
    if (!gravityInterval) {
        applyGravity();
    }
}

function closeYellowPagesBook() {
    document.getElementById('yellowPagesFlippable').style.display = 'none';
    // Keep gravityInterval running to maintain the position with gravity effect
}

function showPage(page) {
    const pages = document.querySelectorAll('.book .page');
    pages.forEach((p, index) => {
        p.style.display = index === page ? 'block' : 'none';
    });
}

function nextPage() {
    const pages = document.querySelectorAll('.book .page');
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        showPage(currentPage);
    }
}

function makeElementDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(el.id + "header")) {
        document.getElementById(el.id + "header").onmousedown = dragMouseDown;
    } else {
        el.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        clearInterval(gravityInterval); // Stop gravity while dragging
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        let top = el.offsetTop - pos2;
        let left = el.offsetLeft - pos1;
        // Ensure the element stays within the viewport
        top = Math.max(0, Math.min(top, window.innerHeight - el.offsetHeight));
        left = Math.max(0, Math.min(left, window.innerWidth - el.offsetWidth));
        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        applyGravity(); // Restart gravity when dragging stops
    }
}

function applyGravity() {
    const book = document.getElementById('yellowPagesBook');
    let velocity = 0;
    const gravity = 0.5;
    const friction = 0.8;
    const ground = window.innerHeight - book.offsetHeight;
    gravityInterval = setInterval(() => {
        let top = parseFloat(book.style.top || 0);
        velocity += gravity;
        top += velocity;
        if (top >= ground) {
            top = ground;
            velocity *= -friction;
        }
        book.style.top = `${top}px`;
    }, 20);
}

function ensureBookInBounds() {
    const book = document.getElementById('yellowPagesBook');
    let top = parseFloat(book.style.top || 0);
    let left = parseFloat(book.style.left || 0);
    top = Math.max(0, Math.min(top, window.innerHeight - book.offsetHeight));
    left = Math.max(0, Math.min(left, window.innerWidth - book.offsetWidth));
    book.style.top = `${top}px`;
    book.style.left = `${left}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    const yellowPagesBook = document.getElementById('yellowPagesBook');
    makeElementDraggable(yellowPagesBook);
    applyGravity(); // Apply gravity when the page loads
    window.addEventListener('resize', ensureBookInBounds); // Ensure book stays in bounds on window resize
});

// Add this function at the end of the file
function loadDoom() {
    const modal = document.getElementById('doomModal');
    const span = document.querySelector('.close-doom');

    modal.style.display = 'block';
    span.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}