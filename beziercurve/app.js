const canvas = document.getElementById('bezier-canvas');
const ctx = canvas.getContext('2d');
const timeSlider = document.getElementById('time-slider');
const resetButton = document.getElementById('reset-button');
const timeLabel = document.getElementById('time-label');
const header = document.getElementById("header");

let points = [];

document.addEventListener("DOMContentLoaded", function() {
    const theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
    } else {
        localStorage.setItem("theme", "dark");
        setTheme("dark");
    }
});

function setTheme(theme) {
    if (theme === "dark") {
        document.documentElement.style.setProperty("--bg-color", "#282c35");
        document.documentElement.style.setProperty("--fg-color", "#e3e3e3");
        document.documentElement.style.setProperty("--fg-color-light", "#f0f0f0");
        document.documentElement.style.setProperty("--fg-color-dark", "#c0c0c0");
        document.documentElement.style.setProperty("--border-color", "#3e3e3e");
        document.documentElement.style.setProperty("--block-color", "#f0f0f0");
    } else {
        document.documentElement.style.setProperty("--bg-color", "#e0e0e0");
        document.documentElement.style.setProperty("--fg-color", "#333");
        document.documentElement.style.setProperty("--fg-color-light", "#666");
        document.documentElement.style.setProperty("--fg-color-dark", "#333");
        document.documentElement.style.setProperty("--border-color", "#d3d3d3");
        document.documentElement.style.setProperty("--block-color", "#404040");
    }
}

function drawBezierCurve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (points.length === 0) {
        ctx.font = '16px Arial';
        ctx.fillStyle = '#888';
        ctx.textAlign = 'center';
        ctx.fillText('Click anywhere on canvas to place point', canvas.width / 2, canvas.height / 2);
        return;
    }

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);

    for (let t = 0; t <= 1; t += 0.01) {
        const redDot = calculateRedDotCoordinates(t);
        ctx.lineTo(redDot.x, redDot.y);
    }

    ctx.strokeStyle = "#007bff";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.strokeStyle = document.documentElement.style.getPropertyValue("--fg-color-dark");
    ctx.stroke();
    ctx.closePath();

    for (let i = 0; i < points.length; i++) {
        ctx.beginPath();
        ctx.arc(points[i].x, points[i].y, 5, 0, Math.PI * 2);
        ctx.fillStyle = document.documentElement.style.getPropertyValue("--fg-color-dark");
        ctx.fill();
        ctx.closePath();
    }

    const currentTime = parseFloat(timeSlider.value);
    const redDot = calculateRedDotCoordinates(currentTime);

    ctx.beginPath();
    ctx.arc(redDot.x, redDot.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#ff6961";
    ctx.fill();
    ctx.closePath();

    for (let i = 0; i < points.length; i++) {
        ctx.font = '10px Arial';
        ctx.fillStyle = document.documentElement.style.getPropertyValue("--fg-color-dark");
        ctx.textAlign = 'center';
        ctx.fillText(`(${points[i].x.toFixed(2)}, ${points[i].y.toFixed(2)})`, points[i].x, points[i].y - 10);
    }

    ctx.font = '10px Arial';
    ctx.fillStyle = '#ff6961';
    ctx.textAlign = 'center';
    ctx.fillText(`(${redDot.x.toFixed(2)}, ${redDot.y.toFixed(2)})`, redDot.x, redDot.y - 10);
}

function cubicBezier(t, p0, p1, p2, p3) {
    return Math.pow(1 - t, 3) * p0 + 3 * Math.pow(1 - t, 2) * t * p1 + 3 * (1 - t) * Math.pow(t, 2) * p2 + Math.pow(t, 3) * p3;
}

function calculateRedDotCoordinates(t) {
    const n = points.length - 1;
    let x = 0;
    let y = 0;

    for (let i = 0; i <= n; i++) {
        const binomialCoefficient = bc(n, i);
        const term = binomialCoefficient * Math.pow((1 - t), n - i) * Math.pow(t, i);
        x += term * points[i].x;
        y += term * points[i].y;
    }

    return {x, y};
}

function bc(n, k) {
    if (k < 0 || k > n) {
        return 0;
    }
    let result = 1;
    for (let i = 1; i <= Math.min(k, n - k); i++) {
        result *= n;
        result /= i;
        n--;
    }
    return result;
}

function updateCanvas() {
    drawBezierCurve();
    updateTimeLabel();
}

function updateTimeLabel() {
    const formattedTime = parseFloat(timeSlider.value).toFixed(2);
    timeLabel.textContent = `Time: ${formattedTime}`;
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const newPoint = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };

    points.push(newPoint);
    updateCanvas();
});

timeSlider.addEventListener('input', () => {
    updateCanvas();
});

resetButton.addEventListener('click', () => {
    points = [];
    updateCanvas();
});

window.addEventListener('resize', () => {
    canvas.width = Math.floor(window.innerWidth * 0.7);
    canvas.height = Math.floor(window.innerHeight * 0.7);
    updateCanvas();
});

window.dispatchEvent(new Event('resize'));
