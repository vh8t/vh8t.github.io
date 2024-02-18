const header = document.getElementById("header");

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email!');
        return;
    }

    fetch('https://vht8.pythonanywhere.com/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            message: message
        })
    })

    alert('Your message has been sent!');
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
});

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
