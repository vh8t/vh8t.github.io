document.addEventListener("DOMContentLoaded", function() {
    const theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
    } else {
        localStorage.setItem("theme", "dark");
        setTheme("dark");
    }

    const themeLabel = document.querySelectorAll(".theme-switcher p");
    themeLabel.forEach((label) => {
        label.textContent = `${theme === "light" ? "Light" : "Dark"} Mode`;
    });

    const themeToggle = document.querySelectorAll(".theme-toggle");
    themeToggle.forEach((toggle) => {
        toggle.addEventListener("click", toggleTheme);
    });

    const name = document.getElementById("name");
    const nameText = "Samuel Golis";
    let i = 0;
    const interval = setInterval(() => {
        let span = name.querySelector(".typing-static");
        if (span) {
            span.remove();
        }

        name.innerHTML += nameText[i];
        name.innerHTML += "<span class='typing-static'></span>";
        i++;
        if (i > nameText.length - 1) {
            clearInterval(interval);
            span = name.querySelector(".typing-static");
            span.classList.remove("typing-static");
            span.classList.add("typing");
        }
    }, 150);

    const cubetimer = document.getElementById("cubetimer");
    const hexeditor = document.getElementById("hexeditor");
    const beziercurve = document.getElementById("beziercurve");

    cubetimer.addEventListener("click", () => {
        // window.location.href = "./p/cubetimer";
        window.open("./cubetimer", "_blank");
    });

    hexeditor.addEventListener("click", () => {
        // window.location.href = "./p/hexeditor";
        window.location.href = "https://github.com/vh8t/hex-editor";
    });

    beziercurve.addEventListener("click", () => {
        // window.location.href = "./p/beziercurve";
        window.location.href = "./beziercurve";
    });

    const hamburger = document.getElementById("hamburger");
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("change");
        const mobile = document.getElementById("mobile");
        mobile.classList.toggle("change");
    });
});

function toggleTheme() {
    const theme = localStorage.getItem("theme");
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    const themeLabel = document.querySelectorAll(".theme-switcher p");
    themeLabel.forEach((label) => {
        label.textContent = `${newTheme === "light" ? "Light" : "Dark"} Mode`;
    });
}

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
