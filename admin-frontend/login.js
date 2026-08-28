const usernameInput = document.getElementById('loginUsernameInput');
const passwordInput = document.getElementById('loginPasswordInput');
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const userPassword = passwordInput.value;

    let errors = {};

    if (username === '') {
        errors.username = 'Username is required';
    }
    if (userPassword === '') {
        errors.password = 'Password is required';
    }

    document.getElementById('loginUsernameError').innerText = errors.username || '';
    document.getElementById('loginPasswordError').innerText = errors.password || '';

    if (Object.keys(errors).length > 0) {
        return;
    }

    let loginRequest = {
        username,
        userPassword
    }

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequest)
    })
    .then(response => {
        if (!response.ok) {
            return response.json()
                .then(errorData => {
                    let message = Object.values(errorData)
                        .flat()
                        .map(msg => '•    ' + msg)
                        .join('\n');

                    throw new Error(message);
                })
        }

        return response.json();
    })
    .then(data => {

        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        localStorage.setItem('roles', JSON.stringify(data.roles));

        console.log(data.token);

        //For now
        window.location.href = 'homepage.html';
    })
    .catch(error => {
        alert(error.message);
    })
})