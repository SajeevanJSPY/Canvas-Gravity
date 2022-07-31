"use strict";
// Canvas API
// Implementing Gravity 
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const mouse = {
    x: 0,
    y: 0
};
// Event Listeners
window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('resize', () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    init();
});
window.addEventListener('click', () => {
    init();
});
// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
// Colors
const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
];
// Ball
class Ball {
    // Circle Depending Things
    x;
    y;
    dx;
    dy;
    radius;
    // Gravity Depending Things
    friction;
    gravity;
    color;
    constructor(x, y, dx, dy, radius) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.friction = 0.89;
        this.gravity = 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    draw() {
        c.beginPath();
        c.fillStyle = this.color;
        c.lineWidth = 2;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill();
        c.stroke();
        c.closePath();
    }
    update() {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * this.friction;
        }
        else {
            this.dy += this.gravity;
        }
        if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        this.y += this.dy;
        this.x += this.dx;
        this.draw();
    }
}
let ballArray = [];
// Initialize
function init() {
    ballArray = [];
    for (let i = 0; i < 100; i++) {
        let radius = randomIntFromRange(20, 30);
        let x = randomIntFromRange(30, canvas.width);
        let y = randomIntFromRange(50, canvas.height - 30);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2, 2);
        ballArray.push(new Ball(x, y, dx, dy, radius));
    }
}
// Animation
function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
    ballArray.forEach(v => v.update());
}
// init()
// animate()
