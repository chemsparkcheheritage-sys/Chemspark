// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card-wrapper');

    cards.forEach(cardWrapper => {
        const shine = cardWrapper.querySelector('.card-shine');

        cardWrapper.addEventListener('mousemove', e => {
            const rect = cardWrapper.getBoundingClientRect();
            // Mouse position relative to the element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Center of the element
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate rotation values (max rotation is 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            // Apply 3D transform
            cardWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            cardWrapper.style.transition = 'none';
            cardWrapper.style.zIndex = '10';

            // Calculate shine position
            // We want the shine background to move based on mouse position
            const moveX = (x / rect.width) * 100;
            const moveY = (y / rect.height) * 100;
            
            // Re-center the gradient position for smooth crossing
            if (shine) {
                shine.style.backgroundPosition = `${moveX}% ${moveY}%`;
            }
        });

        cardWrapper.addEventListener('mouseleave', () => {
            // Reset to default
            cardWrapper.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            cardWrapper.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), z-index 0.5s ease';
            cardWrapper.style.zIndex = '1';

            if (shine) {
                shine.style.backgroundPosition = '100% 100%';
                shine.style.transition = 'opacity 0.5s ease, background-position 0.5s ease';
            }
        });

        cardWrapper.addEventListener('mouseenter', () => {
            // Remove transition when entering to prevent snap-back delay
            cardWrapper.style.transition = 'none';
            
            if (shine) {
                shine.style.transition = 'opacity 0.2s';
            }
        });
    });
});
