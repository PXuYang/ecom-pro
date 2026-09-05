const AUTH_ERROR = "Unauthorized";

function checkAuthentication(){
    const token = localStorage.getItem('token');

    if(token === null){
        window.location.href = 'login.html';
        return false;
    }

    return true;
}

function authenticateFetch(url, options = {}){
    return fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: "Bearer " + getToken()
        }
    })
        .then(response => {
            if(response.status === 401){
                clearAuthentication();
                window.location.href = 'login.html';
                throw new Error(AUTH_ERROR);
            }
            return response;
        });
}

function getToken() {
    return localStorage.getItem('token');
}

function getUsername() {
    return localStorage.getItem('username');
}

function getRoles() {
    return JSON.parse(localStorage.getItem('roles'));
}

function clearAuthentication() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
}

function changePassword() {
    let popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popupOverlay">
            <div class="popupWindow">
                <h2>Change Your Password</h2>
                <div class="popupFormRow">
                    <label for="currentPasswordInput">Current Password</label>
                    <input id="currentPasswordInput" type="password" 
                    placeholder="Enter Your Current Password">
                    <span id="currentPasswordError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="newPasswordInput">New Password</label>
                    <input id="newPasswordInput" type="password" 
                    placeholder="Enter New Password">
                    <span id="newPasswordError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="confirmNewPasswordInput">Confirm New Password</label>
                    <input id="confirmNewPasswordInput" type="password" 
                    placeholder="Confirm New Password">
                    <span id="confirmNewPasswordError" class="fieldError"></span>
                </div>  
                <div class="popupFormRow">
                    <button type="button" id="confirmChanging">Confirm</button>
                    <button type="button" id="cancelChanging">Cancel</button>
                </div>
            </div>
        </div>
        `;

    document.body.append(popup);
    document.getElementById('cancelChanging').addEventListener('click', () => {
        popup.remove();
    });
    document.getElementById('confirmChanging').addEventListener('click', () => {
        let currentPassword = document.getElementById('currentPasswordInput').value;
        let newPassword = document.getElementById('newPasswordInput').value;
        let confirmNewPassword = document.getElementById('confirmNewPasswordInput').value;

        let errors = {};

        if (currentPassword === '') {
            errors.currentPassword = 'Current password is required';
        }

        if (newPassword === '') {
            errors.newPassword = 'New password is required';
        }

        if (newPassword === currentPassword) {
            errors.newPassword = 'New password cannot be the same as current password';
        }

        if(newPassword.length < 8 ||
            !/[a-z]/.test(newPassword) ||
            !/[A-Z]/.test(newPassword) ||
            !/[^a-zA-Z0-9]/.test(newPassword) ||
            !/[0-9]/.test(newPassword)
        ) {
            errors.newPassword = ('Passwords do not match with requirements!');
        }

        if (newPassword !== confirmNewPassword) {
            errors.confirmNewPassword = 'Confirm new password is not match';
        }

        document.getElementById('currentPasswordError').innerText = errors.currentPassword || '';
        document.getElementById('newPasswordError').innerText = errors.newPassword || '';
        document.getElementById('confirmNewPasswordError').innerText = errors.confirmNewPassword || '';

        if (Object.keys(errors).length > 0) {
            return;
        }

        let changePasswordRequest = {
            currentPassword: currentPassword,
            newPassword: newPassword
        }

        authenticateFetch('http://localhost:8080/api/auth/password-change', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changePasswordRequest)
        })
        .then(response => {
            if (!response.ok) {
                return response.json()
                    .then(errorData => {
                        let messages = Object.values(errorData)
                            .flat()
                            .map(msg => "•    " + msg)
                            .join("\n");
                        throw new Error(messages);
                    })
            }
            return response.text();
        })
        .then(text => {
            alert(text);
            popup.remove();
            window.location.href = 'login.html';
        })
            .catch(error => {
                handleRequestError(error, "Incorrect current password");
            })
    })
}

function logout() {
    clearAuthentication();
    window.location.href = 'login.html';
}

function handleRequestError(error, message) {

    if(error.message === AUTH_ERROR){
        return;
    }

    alert(error.message || message);
}