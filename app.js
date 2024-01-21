const projects = [
    {
        title: "Bezier Curve Visualizer",
        description: "Simple bezier curve visualizer made in HTML, CSS, and JavaScript.",
        image: "./images/bezier-curve.png",
        url: "https://vh8t.github.io/beziercurve/"
    },
    {
        title: "CLI Hex Editor",
        description: "Simple lightweight command line hex editor made in Python.",
        image: "./images/hex-editor.png",
        url: "https://github.com/vh8t/hex-editor"
    },
    {
        title: "CLI Speed-cube timer",
        description: "Simple command line cube timer made in Python.",
        image: "./images/cube-timer.png",
        url: "https://github.com/vh8t/cubetimer"
    }
];

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

window.onload = generateProjectCards;
