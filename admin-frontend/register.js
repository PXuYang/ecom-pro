const passwordInput = document.getElementById('registerPasswordInput');
const lengthRequirement = document.getElementById('lengthRequirement');
const lowercaseRequirement = document.getElementById('lowercaseRequirement');
const uppercaseRequirement = document.getElementById('uppercaseRequirement');
const specialRequirement = document.getElementById('specialRequirement');
const numberRequirement = document.getElementById('numberRequirement');

const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('registerUsernameInput');

//Password validation
passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;
    if (password.length >= 8) {
        lengthRequirement.classList.add('met');
    }else{
        lengthRequirement.classList.remove('met');
    }

    if(/[a-z]/.test(password)) {
        lowercaseRequirement.classList.add('met');
    }else{
        lowercaseRequirement.classList.remove('met');
    }

    if(/[A-Z]/.test(password)) {
        uppercaseRequirement.classList.add('met');
    }else {
        uppercaseRequirement.classList.remove('met');
    }

    if(/[^a-zA-Z0-9]/.test(password)) {
        specialRequirement.classList.add('met');
    }else {
        specialRequirement.classList.remove('met');
    }

    if(/[0-9]/.test(password)) {
        numberRequirement.classList.add('met');
    }else {
        numberRequirement.classList.remove('met');
    }
})

//Register form submission
registerForm.addEventListener('submit', event => {
    event.preventDefault();

    const username = usernameInput.value;
    const userPassword = passwordInput.value;

    let errors = {};

    if(username === '') {
        errors.username = ('Username cannot be empty');
    }

    if(userPassword.length < 8 ||
        !/[a-z]/.test(userPassword) ||
        !/[A-Z]/.test(userPassword) ||
        !/[^a-zA-Z0-9]/.test(userPassword) ||
        !/[0-9]/.test(userPassword)
    ) {
        errors.password = ('Passwords do not match with requirements!');
    }

    document.getElementById('registerUsernameError').innerText = errors.username || '';
    document.getElementById('registerPasswordError').innerText = errors.password || '';

    if(Object.keys(errors).length > 0){
        return;
    }

    let registerRequest = {
        username,
        userPassword
    }

    fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerRequest),
    })
    .then(response => {
        if (!response.ok) {
            return response.json()
                .then(errorData => {
                    let message = Object.values(errorData)
                        .flat()
                        .map(msg => "•    " + msg)
                        .join("\n");

                    throw new Error(message);
                })
        }

        return response.json();
    })
    .then(data => {
        alert(data.message);
        window.location.href = 'login.html';
    })
        .catch(error => {
            alert(error.message);
        })

})