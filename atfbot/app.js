const header = document.getElementById("header");

function changeTheme(theme) {
    const linkElement = document.getElementById("theme-css");
    if (linkElement) {
        linkElement.href = theme;
        localStorage.setItem("theme", theme);
    }
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
        changeTheme(theme);
    } else {
        changeTheme('theme-dark.css');
    }
}

header.addEventListener("click", () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "theme-dark.css") {
        changeTheme("theme-light.css");
    } else {
        changeTheme("theme-dark.css");
    }
});

window.onload = loadTheme;