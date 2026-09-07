//Check authentication and roles
if(checkAuthentication()) {
    const usernameDisplay = document.getElementById('usernameDisplay');
    usernameDisplay.textContent = getUsername();

    const roles = getRoles();
    const adminDashboardLink = document.getElementById('adminDashboardLink');
    if (!roles.includes('ADMIN')) {
        adminDashboardLink.style.display = "none";
    }
}

//Account menu drop down
const accountMenu = document.querySelector(".accountMenu");

const accountButton = document.querySelector(".accountButton");
const accountDropdown = document.querySelector(".accountDropdown");
accountButton.addEventListener("click", () => {
    accountDropdown.classList.toggle("show");
});
document.addEventListener("click", (event) => {
    if (!accountMenu.contains(event.target)) {
        accountDropdown.classList.remove("show");
    }
});

//Change password function
const changePasswordLink = document.getElementById('changePasswordLink');
changePasswordLink.addEventListener("click", (event) => {
    event.preventDefault();
    changePassword();
})

//Log out function
const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', (event) => {
    event.preventDefault();
    logout();
});