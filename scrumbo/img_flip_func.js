document.addEventListener('DOMContentLoaded', () => {
    const photo = document.getElementById('photo');
    const photoInner = document.getElementById('photo-inner');
    let isFlipped = false;

    const flipImage = () => {
        if (!isFlipped) {
            photoInner.classList.add('flipped-right');
            setTimeout(() => {
                photo.src = './scrumbo/images/alternate_image.png'; // Change to the alternate image
                photoInner.classList.remove('flipped-right');
            }, 500); // Delay changing the image until after the flip animation (0.6s)
        } else {
            photoInner.classList.add('flipped-left');
            setTimeout(() => {
                photo.src = './scrumbo/images/harold_sip.png' // Change back to the original image
                photoInner.classList.remove('flipped-left');
            }, 500); // Delay changing the image until after the flip animation (0.6s)
        }
        isFlipped = !isFlipped;
    };

    photo.addEventListener('click', flipImage);

    photo.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Prevent default action for Enter or Space key
            flipImage();
        }
    });
});