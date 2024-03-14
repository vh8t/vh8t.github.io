var loadedBrews = 0;
var canLoadMore = true;

document.addEventListener("DOMContentLoaded", function () {
    const theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme);
    } else {
        localStorage.setItem("theme", "dark");
        setTheme("dark");
    }

    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            Object.keys(data).slice(loadedBrews, loadedBrews + 20).forEach(brewName => {
                const brew = data[brewName];
                loadBrew(brewName, brew);
                loadedBrews++;
            });
        });

    window.onscroll = function () {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight && canLoadMore) {
            fetch("recipes.json")
                .then(response => response.json())
                .then(data => {
                    Object.keys(data).slice(loadedBrews, loadedBrews + 20).forEach(brewName => {
                        const brew = data[brewName];
                        loadBrew(brewName, brew);
                        loadedBrews++;
                    });
                });
        }
    };
});

function setTheme(theme) {
    if (theme === "dark") {
        document.documentElement.style.setProperty("--bg-color", "#282c35");
        document.documentElement.style.setProperty("--fg-color", "#e3e3e3");
        document.documentElement.style.setProperty("--fg-color-light", "#f0f0f0");
        document.documentElement.style.setProperty("--fg-color-dark", "#c0c0c0");
        document.documentElement.style.setProperty("--border-color", "#3e3e3e");
        document.documentElement.style.setProperty("--block-color", "#f0f0f0");

        document.documentElement.style.setProperty("--base-color", "#3e3e3e");
        document.documentElement.style.setProperty("--common-color", "#4caf50");
        document.documentElement.style.setProperty("--uncommon-color", "#ffeb3b");
        document.documentElement.style.setProperty("--rare-color", "#2196f3");
        document.documentElement.style.setProperty("--legendary-color", "#9c27b0");
    } else {
        document.documentElement.style.setProperty("--bg-color", "#e0e0e0");
        document.documentElement.style.setProperty("--fg-color", "#333");
        document.documentElement.style.setProperty("--fg-color-light", "#666");
        document.documentElement.style.setProperty("--fg-color-dark", "#333");
        document.documentElement.style.setProperty("--border-color", "#d3d3d3");
        document.documentElement.style.setProperty("--block-color", "#404040");

        document.documentElement.style.setProperty("--base-color", "#d3d3d3");
        document.documentElement.style.setProperty("--common-color", "#8bc34a");
        document.documentElement.style.setProperty("--uncommon-color", "#ffc107");
        document.documentElement.style.setProperty("--rare-color", "#03a9f4");
        document.documentElement.style.setProperty("--legendary-color", "#e91e63");
    }
}

function loadBrew(brewName, brew) {
    const ingredients = brew.ingredients;
    const boilingTime = brew.boiling_time;
    const distillRuns = brew.distill_runs;
    const agingTime = brew.aging_time;
    const barrelType = brew.barrel_type;
    const rarity = brew.rarity;

    const brews = document.querySelector(".brews");
    const brewDiv = document.createElement("div");
    brewDiv.classList.add("brew");
    brewDiv.classList.add(rarity);

    const brewNameDiv = document.createElement("div");
    brewNameDiv.classList.add("brew-name");
    brewNameDiv.textContent = brewName;
    brewDiv.appendChild(brewNameDiv);

    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.classList.add("ingredients");
    ingredientsDiv.innerHTML = `<span class="subheader">Ingredients:</span>`;
    ingredients.forEach(ingredient => {
        const ingredientDiv = document.createElement("div");
        ingredient.ingredient = ingredient.ingredient.replace(/_/g, " ");
        ingredientDiv.textContent = `${ingredient.amount}x ${ingredient.ingredient}`;
        ingredientsDiv.appendChild(ingredientDiv);
    });
    brewDiv.appendChild(ingredientsDiv);

    const boilingTimeDiv = document.createElement("div");
    boilingTimeDiv.classList.add("boiling-time");
    boilingTimeDiv.innerHTML = `<span class="subheader">Boiling time:</span> ${boilingTime} minutes`
    brewDiv.appendChild(boilingTimeDiv);

    if (distillRuns > 0) {
        const distillRunsDiv = document.createElement("div");
        distillRunsDiv.classList.add("distill-runs");
        distillRunsDiv.innerHTML = `<span class="subheader">Distillation:</span> ${distillRuns} runs`
        brewDiv.appendChild(distillRunsDiv);
    }

    if (agingTime > 0) {
        const agingTimeDiv = document.createElement("div");
        const minutes = agingTime * 20;
        const days = Math.floor(minutes / 1440);
        const hours = Math.floor((minutes % 1440) / 60);
        const minutesLeft = minutes % 60;

        if (days > 0) {
            var formattedAgingTime = `${days}d ${hours}h ${minutesLeft}m`;
        } else {
            var formattedAgingTime = `${hours}h ${minutesLeft}m`;
        }

        agingTimeDiv.classList.add("aging-time");
        agingTimeDiv.innerHTML = `<span class="subheader">Aging:</span> ${agingTime} years (${formattedAgingTime})`
        brewDiv.appendChild(agingTimeDiv);

        const barrelTypeDiv = document.createElement("div");
        barrelTypeDiv.classList.add("barrel-type");
        barrelTypeDiv.innerHTML = `<span class="subheader">Barrel:</span> ${barrelType}`;
        brewDiv.appendChild(barrelTypeDiv);
    }

    brews.appendChild(brewDiv);
}

function searchBrew() {
    const filter = document.getElementById("rarity").value.toLowerCase();
    const search = document.getElementById("search").value;
    const brews = document.querySelectorAll(".brew");
    brews.forEach(brew => {
        brew.remove();
    });

    if (search === "") {
        fetch("recipes.json")
            .then(response => response.json())
            .then(data => {
                if (filter === "all") {
                    Object.keys(data).slice(0, 20).forEach(brewName => {
                        const brew = data[brewName];
                        loadBrew(brewName, brew);
                    });
                } else {
                    Object.keys(data).forEach(brewName => {
                        const brew = data[brewName];
                        if (brew.rarity === filter) {
                            loadBrew(brewName, brew);
                        }
                    });
                }
            });
        loadedBrews = 20;
        return;
    }

    let foundBrews = 0;
    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(brewName => {
                const brew = data[brewName];
                if (brewName.toLowerCase().includes(search.toLowerCase()) && (filter === "all" || brew.rarity === filter)) {
                    loadBrew(brewName, brew);
                    foundBrews++;
                }
            });
        });
    loadedBrews = foundBrews;
}

function filterBrews() {
    const filter = document.getElementById("rarity").value.toLowerCase();
    const brews = document.querySelectorAll(".brew");
    brews.forEach(brew => {
        brew.remove();
    });

    if (filter === "all") {
        fetch("recipes.json")
            .then(response => response.json())
            .then(data => {
                Object.keys(data).slice(0, 20).forEach(brewName => {
                    const brew = data[brewName];
                    loadBrew(brewName, brew);
                });
            });
        canLoadMore = true;
        loadedBrews = 20;
        return;
    }

    let foundBrews = 0;
    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(brewName => {
                const brew = data[brewName];
                if (brew.rarity === filter) {
                    loadBrew(brewName, brew);
                    foundBrews++;
                }
            });
            canLoadMore = false;
        });
    loadedBrews = foundBrews;
}