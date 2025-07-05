// Beautiful Tulip Rain Effect
const tulipSVG = `<svg width="25" height="25" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M39.8 45.1C33.4 50.4 33.9 64 33.9 64h2.2C41.9 46.2 62 39.5 62 39.5s-12.8-2.3-22.2 5.6z" fill="#83bf4f"></path><path fill="#75a843" d="M33.6 1l2.5 63h-5z"></path><path d="M45.2 25.1c0 11-5.2 15.7-11.6 15.7S22 36.1 22 25.1S33.6 1 33.6 1s11.6 13.1 11.6 24.1z" fill="#aa1f65"></path><path d="M37 19.9c14.8 9.3 4.8 22.5-3.6 22.5s-15.2-8.6-15.2-19.3s8.3-19.3 8.3-19.3s-.4 9.3 10.5 16.1" fill="#d33777"></path><path d="M30.3 19.9c-14.8 9.3-4.8 22.5 3.6 22.5s15.2-8.6 15.2-19.3s-8.2-19.2-8.2-19.2s.3 9.2-10.6 16" fill="#e84d88"></path><path d="M24.8 43.1c6.6 6.6 8.7 20.9 8.7 20.9h-4.8C21 45.8 2 32.5 2 32.5s16.2 4.1 22.8 10.6z" fill="#83bf4f"></path></svg>`;

function createTulip() {
    const tulip = document.createElement('div');
    tulip.innerHTML = tulipSVG;
    tulip.style.position = 'fixed';
    tulip.style.left = Math.random() * (window.innerWidth - 30) + 'px';
    tulip.style.top = '-30px';
    tulip.style.zIndex = '3';
    tulip.style.pointerEvents = 'auto';
    tulip.style.cursor = 'pointer';
    tulip.style.opacity = Math.random() * 0.4 + 0.3; // 0.3-0.7 opacity
    tulip.style.transition = 'all 0.3s ease';
    tulip.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    
    // Smooth falling animation
    let pos = -30;
    const fallSpeed = Math.random() * 1.5 + 0.8;
    const sway = Math.random() * 20 - 10;
    let swayPos = 0;
    
    const fall = setInterval(() => {
        pos += fallSpeed;
        swayPos += 0.1;
        tulip.style.top = pos + 'px';
        tulip.style.transform = `translateX(${Math.sin(swayPos) * sway}px) rotate(${Math.random() * 30 - 15}deg)`;
        
        if (pos > window.innerHeight + 50) {
            clearInterval(fall);
            if (tulip.parentNode) tulip.remove();
        }
    }, 50);
    
    // Hover effect
    tulip.addEventListener('mouseenter', () => {
        tulip.style.opacity = '0.9';
        tulip.style.transform += ' scale(1.2)';
    });
    
    tulip.addEventListener('mouseleave', () => {
        tulip.style.opacity = Math.random() * 0.4 + 0.3;
        tulip.style.transform = tulip.style.transform.replace(' scale(1.2)', '');
    });
    
    // Click event for firework
    tulip.addEventListener('click', function(e) {
        createFirework(e.clientX, e.clientY);
        clearInterval(fall);
        tulip.style.transition = 'all 0.5s ease';
        tulip.style.opacity = '0';
        tulip.style.transform += ' scale(0)';
        setTimeout(() => tulip.remove(), 500);
    });
    
    document.body.appendChild(tulip);
}

function createFirework(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = tulipSVG;
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.zIndex = '999';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.8';
        
        const angle = (i * 36) * Math.PI / 180;
        const distance = Math.random() * 80 + 60;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        particle.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.style.left = endX + 'px';
            particle.style.top = endY + 'px';
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0.3) rotate(360deg)';
        }, 10);
        
        setTimeout(() => {
            if (particle.parentNode) particle.remove();
        }, 1200);
    }
}

// Start tulip rain
window.addEventListener('load', function() {
    setInterval(createTulip, 1500);
    setTimeout(createTulip, 300);
});