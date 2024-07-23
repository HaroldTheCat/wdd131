document.addEventListener('DOMContentLoaded', () => {
    const postButtonsContainer = document.getElementById('post-buttons-container');
    const blogPosts = [
        { filename: 'post1.html', image: 'images/post1.png' },
        { filename: 'post2.html', image: 'images/post2.png' },
        { filename: 'post3.html', image: 'images/post3.png' },
        { filename: 'post4.html', image: 'images/post4.png' },
        // Add more blog post filenames and images here
    ];

    blogPosts.forEach((post, index) => {
        const button = document.createElement('div');
        button.className = 'button';  // Use a universal class name
        button.dataset.post = post.filename;
        button.innerHTML = `<img src="${post.image}" alt="Project ${index + 1}" style="width: 200px; height: 200px;">`; // Set larger size here
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', `Open blog post ${index + 1}`);
        
        button.addEventListener('click', () => loadPostContent(post.filename));
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                loadPostContent(post.filename);
            }
        });
        
        postButtonsContainer.appendChild(button);
    });

    function loadPostContent(post) {
        const modal = document.getElementById('myModal');
        const span = document.querySelector('.close');
        const modalBody = document.getElementById('modal-body');

        fetch(`blog_posts/${post}`)
            .then(response => response.text())
            .then(data => {
                modalBody.innerHTML = data;
                modal.style.display = 'block';
                // Set focus to the close button
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
    
    const closeButton = document.querySelector('.close');
    
    // Add tabindex, role, and aria-label to close button for accessibility
    closeButton.setAttribute('tabindex', '0');
    closeButton.setAttribute('role', 'button');
    closeButton.setAttribute('aria-label', 'Close modal');

    // Add click event to close button
    closeButton.addEventListener('click', () => {
        const modal = document.getElementById('myModal');
        modal.style.display = 'none';
    });

    // Add keypress event to close button for Enter and Space keys
    closeButton.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const modal = document.getElementById('myModal');
            modal.style.display = 'none';
        }
    });

    // Add click event to close modal when clicking outside of modal-content
    window.onclick = (event) => {
        const modal = document.getElementById('myModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});