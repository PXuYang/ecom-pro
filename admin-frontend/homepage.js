const defaultImageName = "No-Image-Found-400x264.png";
const BASE_URL = "http://localhost:8080/api/";

let currentPage = 0;
let size = 3;
let totalPages = 0;

let currentName = "";
let currentBrand = "";
let currentCategory = "";
let currentAvailability = "";
let currentSortBy = "";
let currentSortOrder = "";
let currentLowStock = "";

function loadProductsByPage(page) {
    document.getElementById("products").innerText = "Loading products...";

    let url = BASE_URL + "products/findProducts/page?page=" + page + "&size=" + size;

    if (currentName !== "") {
        url += "&name=" + encodeURIComponent(currentName);
    }

    if (currentCategory !== "") {
        url += "&category=" + encodeURIComponent(currentCategory);
    }

    if(currentBrand !== ""){
        url += "&brand=" + encodeURIComponent(currentBrand);
    }

    if(currentAvailability !== ""){
        url += "&availability=" + currentAvailability;
    }

    if(currentLowStock !== ""){
        url += "&lowStock=" + currentLowStock;
    }

    if(currentSortBy !== ""){
        url += "&sortBy=" + currentSortBy;
        url += "&sortOrder=" + currentSortOrder;
    }

    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error("Http error: " + response.status);
            }
            return response.json();
        })
        .then(pageData => {
            console.log("Loaded page data: ", pageData);
            currentPage = pageData.page;
            totalPages = pageData.totalPages;

            displayProducts(pageData.content);
            displayPaginationButtons(pageData);
        })
        .catch(error => {
            console.error(error);
            document.getElementById("products").innerHTML = "Failed to load products...";
        });
}

function displayPaginationButtons(pageData) {

    let html = `
        <div class="paginationBox">
            <button type="button" onclick="previousPage()" ${pageData.first ? "disabled" : ""}>Previous</button>
        `;

        for (let i = 0; i < pageData.totalPages; i++) {
            html += `
            <button type="button" onclick="goToPage(${i})" ${pageData.page === i ? "disabled" : ""}>
            ${i + 1}
            </button>
            `;
        }

        html += `<button type="button" onclick="nextPage()" ${pageData.last ? "disabled" : ""}>Next</button>
        </div>
        `;

    document.getElementById("pagination").innerHTML = html;
}

function goToPage(page) {
    loadProductsByPage(page);
}

function previousPage() {
    if (currentPage > 0) {
        loadProductsByPage(currentPage - 1);
    }
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        loadProductsByPage(currentPage + 1);
    }
}

function displayProducts(products) {

    if (products.length === 0) {
        document.getElementById("products").innerHTML = "<p>No products found.</p>";
        return;
    }

    let html = "";

    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        let imageUrl = product.imageName ?
            BASE_URL + "images/" + product.imageName : defaultImageName;

        html += `
                <div class="product-card" onclick="goToProductDetail(${product.id})">
                    <h2>${product.name}</h2>
                    <img src="${imageUrl}" 
                    alt="${product.name}" 
                    class="productImage"
                    onerror="this.src='${defaultImageName}'">
                    <p>Price: $${product.price}</p>
                    <p>Availability: ${product.availability? "Yes" : "No"}</p>
                </div>
            `;
    }
    document.getElementById("products").innerHTML = html;
}

function showProductStat(){

    fetch(BASE_URL + "products/stat")
    .then(response => response.json())
    .then(stats => {
        document.getElementById("totalProCount").innerText = stats.totalProductCount;
        document.getElementById("lowStockCount").innerText = stats.lowStockCount;
        document.getElementById("categoryCount").innerText = stats.categoryCount;
    })
    .catch(error => {
        console.log(error);
    });
}

function addProduct(){

    let popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popupOverlay">
            <div class="popupWindow">
                <h2>Add Product</h2>
                <div class="popupFormRow">
                    <label for="nameInput">Name: </label>
                    <input id="nameInput" placeholder="Name">
                    <span id="nameError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="descInput">Description: </label>
                    <input id="descInput" placeholder="Description">
                    <span id="descError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="brandInput">Brand: </label>
                    <input id="brandInput" placeholder="Brand">
                    <span id="brandError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="priceInput">Price: </label>
                    <input id="priceInput" type="number" placeholder="Price">
                    <span id="priceError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="categoryInput">Category: </label>
                    <input id="categoryInput" placeholder="Category">
                    <span id="categoryError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="releaseDateInput">Release Date: </label>
                    <input id="releaseDateInput" type="date">
                    <span id="releaseDateError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="imageInput">Image: </label>
                    <input id="imageInput" type="file" accept="image/*">
                    <span id="imageError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="quantityInput">Quantity: </label>
                    <input id="quantityInput" type="number" placeholder="Quantity">
                    <span id="quantityError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <label for="availabilityInput">Availability: </label>
                    <select id="availabilityInput">
                        <option value="">Select Availability</option>
                        <option value="true">Available</option>
                        <option value="false">Not available</option>
                    </select>
                    <span id="availabilityError" class="fieldError"></span>
                </div>
                <div class="popupFormRow">
                    <button type="button" id="confirmAdding">Add Product</button>
                    <button type="button" id="cancelAdding">Cancel</button>
                </div>
            </div>
        </div>
        `;

    document.body.appendChild(popup);
    document.getElementById("cancelAdding").onclick = function () {
        popup.remove();
    };
    document.getElementById("confirmAdding").onclick = function () {
        let name = document.getElementById("nameInput").value;
        let desc = document.getElementById("descInput").value;
        let brand = document.getElementById("brandInput").value;
        let price = document.getElementById("priceInput").value;
        let category = document.getElementById("categoryInput").value;
        let releaseDate = document.getElementById("releaseDateInput").value;
        let image = document.getElementById("imageInput").files[0];
        let availability = document.getElementById("availabilityInput").value;
        let quantity = document.getElementById("quantityInput").value;

        let errors = {};

        if(name === ""){
            errors.name = "Name is required";
        }

        if(desc === ""){
            errors.desc = "Description is required";
        }

        if(brand === ""){
            errors.brand = "Brand is required";
        }

        if(category === ""){
            errors.category = "Category is required";
        }

        if(price === "" || isNaN(Number(price))){
            errors.price = "Price must be number!";
        }

        if(!image){
            errors.image = "Please enter a valid image!";
        }

        let datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if(!datePattern.test(releaseDate)){
            errors.date = "Invalid date! Must be yyyy-MM-dd format!";
        }

        if(availability === ""){
            errors.availability = "Please select availability!";
        }

        if(quantity === "" || isNaN(Number(quantity))){
            errors.quantity = "Quantity must be number!";
        }

        document.getElementById("nameError").innerText = errors.name || "";
        document.getElementById("descError").innerText = errors.desc || "";
        document.getElementById("brandError").innerText = errors.brand || "";
        document.getElementById("priceError").innerText = errors.price || "";
        document.getElementById("categoryError").innerText = errors.category || "";
        document.getElementById("imageError").innerText = errors.image || "";
        document.getElementById("releaseDateError").innerText = errors.date || "";
        document.getElementById("availabilityError").innerText = errors.availability || "";
        document.getElementById("quantityError").innerText = errors.quantity || "";

        if(Object.keys(errors).length > 0){
            return;
        }

        let product = new FormData();
        product.append("name", name);
        product.append("description", desc);
        product.append("brand", brand);
        product.append("price", Number(price));
        product.append("category", category);
        product.append("releaseDate", releaseDate);
        product.append("image", image);
        product.append("availability", availability);
        product.append("quantity", Number(quantity));

        fetch(BASE_URL + "products/with-image", {
            method: "POST",
            body: product,
        })
            .then(response => {
                if (!response.ok) {
                    return response.json()
                        .then(errorData => {
                            let messages = Object.values(errorData)
                                .flat()
                                .map(msg => "•    " + msg)
                                .join("\n");
                            alert(messages);
                        })
                }

                refreshPage();
                popup.remove();
            })
            .catch(error => {
                console.log(error);
                alert("Failed to create product!");
            })
    };

}

function showLowStockDetails() {

    let lowStockDetails = "";

    fetch(BASE_URL + "products/findProducts/page?page=0&size=1000&lowStock=true")
    .then(response => response.json())
        .then(pageData => {

            let lowStock = pageData.content || [];

            if(lowStock.length === 0){
                lowStockDetails = "<p>There is no low stock product!</p>";
            } else {
                for (let i = 0; i < lowStock.length; i++) {
                    let product = lowStock[i];

                    lowStockDetails += `
                    <p>Product Name: ${product.name}</p>
                    <p>Stock: ${product.quantity}</p>
                    <hr>
                `;
                }
            }

            let popup = document.createElement("div");
            popup.innerHTML = `
                <div class="popupOverlay">
                    <div class="popupWindow">
                        <h2>Low Stock</h2>
                        ${lowStockDetails}
                        <button type="button" id="cancelPopup">Close</button>
                    </div>    
                </div>
            `;
            document.body.appendChild(popup);
            document.getElementById("cancelPopup").onclick = function () {
                popup.remove();
            };
        })
        .catch(error => {
        console.log(error);
        alert("Failed to load low stock products!");
        })
}

function reloadFirstPage() {
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function findByCategory(categoryKeyword) {
    currentCategory = categoryKeyword;
    reloadFirstPage();
}

function findByName(nameKeyword) {
    currentName = nameKeyword;
    reloadFirstPage();
}

function findByBrand(brandKeyword) {
    currentBrand = brandKeyword;
    reloadFirstPage();
}

function filterByAvailability(availability) {
    currentAvailability = availability;
    reloadFirstPage();
}

function filterLowStock(){
    currentLowStock = "true";
    reloadFirstPage();
}

function sortByName(){
    currentSortBy = "name";
    currentSortOrder = "asc";
    reloadFirstPage();
}

function sortByPriceAsc() {
    currentSortBy = "price";
    currentSortOrder = "asc";
    reloadFirstPage();
}

function sortByPriceDesc(){
    currentSortBy = "price";
    currentSortOrder = "desc";
    reloadFirstPage();
}

function sortByQuantityAsc(){
    currentSortBy = "quantity";
    currentSortOrder = "asc";
    reloadFirstPage();
}

function sortByQuantityDesc(){
    currentSortBy = "quantity";
    currentSortOrder = "desc";
    reloadFirstPage();
}

function clearSearch(){
    currentName = "";
    currentBrand = "";
    currentCategory = "";
    currentAvailability = "";
    currentLowStock = "";
    currentSortBy = "";
    currentSortOrder = "";

    reloadFirstPage();
}

function searchBox(type){
    let popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popupOverlay">
            <div class="popupWindow">
                <div class="popupFormRow">
                    <input id="searchInput" type="text" placeholder="Search Products" />
                </div>
                <div>
                    <button type="button" id="searchButton">Search</button>
                    <button type="button" id="cancelPopup">Cancel</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
    document.getElementById("searchButton").onclick = function () {
        let input = document.getElementById("searchInput").value;
        if(input === ""){
            alert("Please enter a valid value!");
            return;
        }
        if(type === "name"){
            findByName(input);
        }
        if(type === "category") {
            findByCategory(input);
        }
        if(type === "brand"){
            findByBrand(input);
        }
        popup.remove();
    }

    document.getElementById("cancelPopup").onclick = function () {
        popup.remove();
    };
}

function filterBox(){
    let popup = document.createElement("div");

    popup.innerHTML = `
    <div class="popupOverlay">
        <div class="popupWindow">
            <div class="popupFormRow">
                <h2>Filter By Availability</h2>
                <select id="filterAvailability">
                    <option value="">Select Availability</option>
                    <option value="true">Available</option>
                    <option value="false">Not available</option>
                </select>
            </div>
            <div>
                <button type="button" id="searchAvailabilityButton">Search</button>
                <button type="button" id="cancelAvailabilityPopup">Cancel</button>
            </div>
        </div>
   </div>`

    document.body.appendChild(popup);

    document.getElementById("searchAvailabilityButton").onclick = function (){
        let input = document.getElementById("filterAvailability").value;
        if(input === ""){
            alert("Please select availability!");
            return;
        }
        filterByAvailability(input);
        popup.remove();
    };

    document.getElementById("cancelAvailabilityPopup").onclick = function () {
        popup.remove();
    };
}

function refreshPage(){
    clearSearch();
    showProductStat();
}

function goToProductDetail(id){
    window.location.href="product-detail.html?id=" + id;
}

refreshPage();
