const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const stars = [];

const colors = ['237, 152, 198', '237, 152, 200', '252, 245, 250', '91,131,190'];

class Star {
    constructor(x, y, size, opacity, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.opacity = opacity;
        this.speedX = (Math.random() - 0.5) * 2; // Random speed between -1 and 1
        this.speedY = (Math.random() - 0.5) * 2; // Random speed between -1 and 1
        this.color = color;
    }

    update() {
        // Move the star
        this.x += this.speedX;
        this.y += this.speedY;

        // Reduce opacity over time
        this.opacity -= 0.01; 
        // Higher number -> Faster Fading

        // Remove star when opacity is zero
        if (this.opacity <= 0) {
            stars.splice(stars.indexOf(this), 1);
        }
    }

    draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.closePath();
        ctx.fill();
    }
}


function createStars(x, y) {
    const NUM_STARS = 15; // Number of stars to spawn
    for (let i = 0; i < NUM_STARS; i++) {
        const size = Math.random() * 2 + 1; // Random size between 1 and 3
        const opacity = Math.random(); // Random opacity between 0 and 1
        // Random color from the array
        const color = colors[Math.floor(Math.random() * colors.length)]; 
        const star = new Star(x, y, size, opacity, color);
        stars.push(star);
    }
}

window.addEventListener('mousemove', handleMouseMove);
function handleMouseMove(event) {
    const x = event.clientX;
    const y = event.clientY;
    createStars(x, y);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.update();
        star.draw();
    }

    requestAnimationFrame(animate);
}

animate();