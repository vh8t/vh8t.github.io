let projects;

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
