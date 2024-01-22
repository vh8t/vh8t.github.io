document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email!');
            return;
    }

    fetch('config.json')
        .then(response => response.json())
        .then(data => {
            const webhook = data.webhook;

            fetch(webhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    embeds: [{
                        title: email,
                        description: message,
                        color: 3552823,
                        timestamp: new Date()
                    }]
                })
            });
        });


    alert('Your message has been sent!');
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
});