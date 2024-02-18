let projects;
const header = document.getElementById("header");

fetch('./projects.json')
    .then(response => response.json())
    .then(data => {
        projects = data;
        generateProjectCards();
    })
    .catch(error => console.error('Error reading JSON file:', error));

function generateProjectCards() {
    const projectContainer = document.getElementById("project-container");

    projects.forEach(project => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        const image = document.createElement("img");
        image.src = project.image;
        card.appendChild(image);

        const title = document.createElement("h3");
        title.textContent = project.title;
        card.appendChild(title);

        const description = document.createElement("p");
        description.textContent = project.description;
        card.appendChild(description);

        card.addEventListener("click", () => {
            window.location.href = project.url;
        });

        projectContainer.appendChild(card);
    });
}

function changeTheme(theme) {
    const linkElement = document.getElementById("theme-css");
    if (linkElement) {
        linkElement.href = theme;
        localStorage.setItem("theme", theme);

        const instagram = document.getElementById("instagram");
        const youtube = document.getElementById("youtube");
        const github = document.getElementById("github");

        if (theme === "theme-dark.css") {
            instagram.src = "images/icons/light-instagram.svg";
            youtube.src = "images/icons/light-youtube.svg";
            github.src = "images/icons/light-github.svg";
        } else {
            instagram.src = "images/icons/dark-instagram.svg";
            youtube.src = "images/icons/dark-youtube.svg";
            github.src = "images/icons/dark-github.svg";
        }
    }
}

function loadTheme() {
    const theme = localStorage.getItem("theme");
    if (theme) {
        changeTheme(theme);
    } else {
        changeTheme("theme-dark.css");
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
