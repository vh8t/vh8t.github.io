document.addEventListener("DOMContentLoaded", function() {
    const theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
    } else {
        localStorage.setItem("theme", "dark");
        setTheme("dark");
    }

    const scrambleType = localStorage.getItem("scrambleType");
    if (scrambleType) {
        const scramble_type = document.getElementById("scramble-type");
        scramble_type.innerHTML = scrambleType === "3x3" ? "3x3x3" : "2x2x2";
    } else {
        localStorage.setItem("scrambleType", "3x3");
        const scramble_type = document.getElementById("scramble-type");
        scramble_type.innerHTML = "3x3x3";
    }

    updateScore();
    generateScramble();
});

function setTheme(theme) {
    if (theme === "dark") {
        document.documentElement.style.setProperty("--bg-color", "#282c35");
        document.documentElement.style.setProperty("--bg-color-dark", "#1e2128");
        document.documentElement.style.setProperty("--fg-color", "#e3e3e3");
        document.documentElement.style.setProperty("--fg-color-light", "#f0f0f0");
        document.documentElement.style.setProperty("--fg-color-dark", "#c0c0c0");
        document.documentElement.style.setProperty("--border-color", "#3e3e3e");
        document.documentElement.style.setProperty("--block-color", "#f0f0f0");
    } else {
        document.documentElement.style.setProperty("--bg-color", "#e0e0e0");
        document.documentElement.style.setProperty("--bg-color-dark", "#d3d3d3");
        document.documentElement.style.setProperty("--fg-color", "#333");
        document.documentElement.style.setProperty("--fg-color-light", "#666");
        document.documentElement.style.setProperty("--fg-color-dark", "#333");
        document.documentElement.style.setProperty("--border-color", "#d3d3d3");
        document.documentElement.style.setProperty("--block-color", "#404040");
    }
}

let spaceDownTime;
let spaceUpTime;
let pressed = false;
let running = false;
let interval;

document.addEventListener("keydown", function(event) {
    if (event.code === 'Space') {
        if (!pressed && !running) {
            pressed = true;
            spaceDownTime = Date.now();
            const timer = document.getElementById("timer");
            timer.classList.add("waiting");
            setTimeout(() => {
                if (Date.now() - spaceDownTime >= 500 && pressed) {
                    timer.classList.remove("waiting");
                    timer.classList.add("ready");
                }
            }, 500);
        } else if (running) {
            stopTimer();
        }
    }
});

document.addEventListener("keyup", function(event) {
    if (event.code === 'Space' && !running) {
        spaceUpTime = Date.now();
        if (spaceDownTime && spaceUpTime - spaceDownTime >= 500) {
            startTimer();
        }
        spaceDownTime = null;
        spaceUpTime = null;
        pressed = false;
        const timer = document.getElementById("timer");
        timer.classList.remove("waiting");
        timer.classList.remove("ready");
    }
});

function startTimer() {
    // const scramble = document.getElementById("scramble");
    // scramble.classList.add("hidden");
    running = true;
    let startTime = Date.now();
    const timer = document.getElementById("timer");
    interval = setInterval(() => {
        const currentTime = Date.now();
        const timeDiff = currentTime - startTime;
        const time = new Date(timeDiff);
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let milliseconds = time.getMilliseconds();

        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (milliseconds < 10) {
            milliseconds = `00${milliseconds}`;
        } else if (milliseconds < 100) {
            milliseconds = `0${milliseconds}`;
        }

        if (minutes < 1) {
            timer.innerHTML = `${seconds}.${milliseconds}`;
        } else {
            timer.innerHTML = `${minutes}:${seconds}.${milliseconds}`;
        }
    }, 10);
}

function stopTimer() {
    const scrambleType = localStorage.getItem("scrambleType");
    const best = localStorage.getItem(`${scrambleType}-best`);
    const worst = localStorage.getItem(`${scrambleType}-worst`);
    running = false;
    clearInterval(interval);
    const timer = document.getElementById("timer");
    let time = timer.innerHTML;
    const last5 = localStorage.getItem(`${scrambleType}-last12`);
    if (last5) {
        let timeArray = time.split(":");
        if (timeArray.length === 2) {
            timeArray[0] = parseInt(timeArray[0]) * 60000;
            timeArray[1] = parseFloat(timeArray[1]) * 1000;
        } else {
            timeArray[0] = parseFloat(timeArray[0]) * 1000;
        }
        time = timeArray.reduce((a, b) => a + b, 0);

        let last5Array = JSON.parse(last5);
        if (last5Array.length < 12) {
            last5Array.push(time);
        } else {
            last5Array.shift();
            last5Array.push(time);
        }
        localStorage.setItem(`${scrambleType}-last12`, JSON.stringify(last5Array));
    } else {
        let timeArray = time.split(":");
        if (timeArray.length === 2) {
            timeArray[0] = parseInt(timeArray[0]) * 60000;
            timeArray[1] = parseFloat(timeArray[1]) * 1000;
        } else {
            timeArray[0] = parseFloat(timeArray[0]) * 1000;
        }
        time = timeArray.reduce((a, b) => a + b, 0);
        localStorage.setItem(`${scrambleType}-last12`, JSON.stringify([time]));
    }

    if (best) {
        if (time < best) {
            localStorage.setItem(`${scrambleType}-best`, time);
            const bestElement = document.getElementById("best-time");
            bestElement.classList.add("new-best");
            setTimeout(() => {
                bestElement.classList.remove("new-best");
            }, 1000);
        }
    } else {
        localStorage.setItem(`${scrambleType}-best`, time);
        const bestElement = document.getElementById("best-time");
        bestElement.classList.add("new-best");
        setTimeout(() => {
            bestElement.classList.remove("new-best");
        }, 1000);
    }

    if (worst) {
        if (time > worst) {
            localStorage.setItem(`${scrambleType}-worst`, time);
            const worstElement = document.getElementById("worst-time");
            worstElement.classList.add("new-worst");
            setTimeout(() => {
                worstElement.classList.remove("new-worst");
            }, 1000);
        }
    } else {
        localStorage.setItem(`${scrambleType}-worst`, time);
        const worstElement = document.getElementById("worst-time");
        worstElement.classList.add("new-worst");
        setTimeout(() => {
            worstElement.classList.remove("new-worst");
        }, 1000);
    }

    // const scramble = document.getElementById("scramble");
    // scramble.classList.remove("hidden");
    generateScramble();
    updateScore();
}

function generateScramble() {
    const type = localStorage.getItem("scrambleType");
    if (type === "3x3") {
        generate3x3Scramble();
        updateScore()
    } else if (type === "2x2") {
        generate2x2Scramble();
        updateScore();
    }
}

function generate3x3Scramble() {
    const moves = ["U", "D", "L", "R", "F", "B"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    let lastMove = "";
    for (let i = 0; i < 20; i++) {
        let move = moves[Math.floor(Math.random() * moves.length)];
        while (move === lastMove) {
            move = moves[Math.floor(Math.random() * moves.length)];
        }
        lastMove = move;
        scramble += move + modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
    }
    const scrambleElement = document.getElementById("scramble");
    scrambleElement.innerHTML = scramble;
}

function generate2x2Scramble() {
    const moves = ["U", "R", "F"];
    const modifiers = ["", "'", "2"];
    let scramble = "";
    let lastMove = "";
    for (let i = 0; i < 9; i++) {
        let move = moves[Math.floor(Math.random() * moves.length)];
        while (move === lastMove) {
            move = moves[Math.floor(Math.random() * moves.length)];
        }
        lastMove = move;
        scramble += move + modifiers[Math.floor(Math.random() * modifiers.length)] + " ";
    }
    const scrambleElement = document.getElementById("scramble");
    scrambleElement.innerHTML = scramble;
}

function changeScrambleType() {
    let scrambleType = localStorage.getItem("scrambleType");
    const scramble_type = document.getElementById("scramble-type");
    if (scrambleType === "3x3") {
        localStorage.setItem("scrambleType", "2x2");
        scramble_type.innerHTML = "2x2x2";
    } else if (scrambleType === "2x2") {
        localStorage.setItem("scrambleType", "3x3");
        scramble_type.innerHTML = "3x3x3";
    }
    generateScramble();
}

function ao5() {
    const scrambleType = localStorage.getItem("scrambleType");
    const last12 = localStorage.getItem(`${scrambleType}-last12`);
    if (last12) {
        const last12Array = JSON.parse(last12);
        if (last12Array.length < 5) {
            const ao5Element = document.getElementById("ao5");
            ao5Element.innerHTML = "N/A";
            return;
        }
        while (last12Array.length > 5) {
            last12Array.shift();
        }
        const best = Math.min(...last12Array);
        const bestIndex = last12Array.indexOf(best);
        const worst = Math.max(...last12Array);
        const worstIndex = last12Array.indexOf(worst);
        last12Array.splice(bestIndex, 1);
        last12Array.splice(worstIndex, 1);
        const sum = last12Array.reduce((a, b) => a + b, 0);
        const average = sum / 3;
        const ao5Element = document.getElementById("ao5");
        let minutes = Math.floor(average / 60000);
        let seconds = Math.floor((average % 60000) / 1000);
        let milliseconds = Math.floor((average % 1000) / 10);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (milliseconds < 10) {
            milliseconds = `00${milliseconds}`;
        } else if (milliseconds < 100) {
            milliseconds = `0${milliseconds}`;
        }
        if (minutes < 1) {
            ao5Element.innerHTML = `${seconds}.${milliseconds}`;
        } else {
            ao5Element.innerHTML = `${minutes}:${seconds}.${milliseconds}`;
        }
    }
}

function ao12() {
    const scrambleType = localStorage.getItem("scrambleType");
    const last12 = localStorage.getItem(`${scrambleType}-last12`);
    if (last12) {
        const last12Array = JSON.parse(last12);
        if (last12Array.length < 12) {
            const ao12Element = document.getElementById("ao12");
            ao12Element.innerHTML = "N/A";
            return;
        }
        const best = Math.min(...last12Array);
        const bestIndex = last12Array.indexOf(best);
        const worst = Math.max(...last12Array);
        const worstIndex = last12Array.indexOf(worst);
        last12Array.splice(bestIndex, 1);
        last12Array.splice(worstIndex, 1);
        const sum = last12Array.reduce((a, b) => a + b, 0);
        const average = sum / 10;
        const ao12Element = document.getElementById("ao12");
        let minutes = Math.floor(average / 60000);
        let seconds = Math.floor((average % 60000) / 1000);
        let milliseconds = Math.floor((average % 1000) / 10);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (milliseconds < 10) {
            milliseconds = `00${milliseconds}`;
        } else if (milliseconds < 100) {
            milliseconds = `0${milliseconds}`;
        }
        if (minutes < 1) {
            ao12Element.innerHTML = `${seconds}.${milliseconds}`;
        } else {
            ao12Element.innerHTML = `${minutes}:${seconds}.${milliseconds}`;
        }
    }
}

function updateScore() {
    const scrambleType = localStorage.getItem("scrambleType");
    const best = localStorage.getItem(`${scrambleType}-best`);
    const worst = localStorage.getItem(`${scrambleType}-worst`);
    const bestElement = document.getElementById("best-time");
    const worstElement = document.getElementById("worst-time");

    if (best) {
        let minutes = Math.floor(best / 60000);
        let seconds = Math.floor((best % 60000) / 1000);
        let milliseconds = Math.floor((best % 1000) / 10);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (milliseconds < 10) {
            milliseconds = `00${milliseconds}`;
        } else if (milliseconds < 100) {
            milliseconds = `0${milliseconds}`;
        }
        if (minutes < 1) {
            bestElement.innerHTML = `${seconds}.${milliseconds}`;
        } else {
            bestElement.innerHTML = `${minutes}:${seconds}.${milliseconds}`;
        }
    } else {
        bestElement.innerHTML = "N/A";
    }

    if (worst) {
        let minutes = Math.floor(worst / 60000);
        let seconds = Math.floor((worst % 60000) / 1000);
        let milliseconds = Math.floor((worst % 1000) / 10);
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (milliseconds < 10) {
            milliseconds = `00${milliseconds}`;
        } else if (milliseconds < 100) {
            milliseconds = `0${milliseconds}`;
        }
        if (minutes < 1) {
            worstElement.innerHTML = `${seconds}.${milliseconds}`;
        } else {
            worstElement.innerHTML = `${minutes}:${seconds}.${milliseconds}`;
        }
    } else {
        worstElement.innerHTML = "N/A";
    }

    ao5();
    ao12();
}
