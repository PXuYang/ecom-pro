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

function handleRequestError(error, message) {

    if(error.message === AUTH_ERROR){
        return;
    }

    alert(message);
}

function logout() {
    clearAuthentication();
    window.location.href = 'login.html';
}