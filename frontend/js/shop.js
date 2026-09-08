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

//Functions

//LoadProducts
const BASE_URL = "http://localhost:8080/api/";
const size = 6;
const currentPage = 0;
function loadProducts() {

    authenticateFetch(BASE_URL + "products/findProducts/page?page="
        + currentPage + "&size=" + size)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to load products");
        }

        return response.json();
    })
        .then((data) => {
            displayProducts(data.content);
        })
        .catch((error) => {
        handleRequestError(error, "Failed to load products");
        })
}

function displayProducts(products) {
    const productGrid = document.getElementById("productGrid");

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("productCard");

        const productImageWrapper = document.createElement("div");
        productImageWrapper.classList.add("productImageWrapper");

        const productImage = document.createElement("img");
        productImage.src = BASE_URL + "images/" + product.imageName;
        productImage.alt = product.name;
        productImage.classList.add("productImage");

        const quickView = document.createElement("div");
        quickView.classList.add("quickView");
        quickView.textContent = "Quick View";

        const productName = document.createElement("h3");
        productName.textContent = product.name;
        productName.classList.add("productName");

        const productPrice = document.createElement("p");
        productPrice.textContent = "$" + product.price.toFixed(2);
        productPrice.classList.add("productPrice");

        productImageWrapper.append(productImage);
        productImageWrapper.append(quickView);
        productGrid.appendChild(productCard);
        productCard.appendChild(productImageWrapper);
        productCard.appendChild(productName);
        productCard.appendChild(productPrice);
    })
}

loadProducts();