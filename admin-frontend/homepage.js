const defaultImageUrl = "No-Image-Found-400x264.png";

let currentPage = 0;
let size = 2;
let totalPages = 0;

let currentMode = "normal";
let currentKeyword = "";
let currentAvailability = "";

function loadProductsByPage(page) {
    let url = "";

    if (currentMode === "normal") {
        url = "http://localhost:8080/api/products/page?page=" + page + "&size=" + size;
    }

    if (currentMode === "byCategory") {
        url = "http://localhost:8080/api/products/bycategory/" + encodeURIComponent(currentKeyword) + "/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "byName"){
        url = "http://localhost:8080/api/products/byname/" + encodeURIComponent(currentKeyword) + "/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "byBrand"){
        url = "http://localhost:8080/api/products/bybrand/" + encodeURIComponent(currentKeyword) + "/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "byAvailability"){
        url = "http://localhost:8080/api/products/byavailability/" + currentAvailability + "/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "lowStock"){
        url = "http://localhost:8080/api/products/low-stock/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "asc"){
        url = "http://localhost:8080/api/products/asc/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "priceAsc"){
        url = "http://localhost:8080/api/products/price/asc/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "priceDesc"){
        url = "http://localhost:8080/api/products/price/desc/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "quantityAsc"){
        url = "http://localhost:8080/api/products/quantity/asc/page?page=" + page + "&size=" + size;
    }

    if(currentMode === "quantityDesc"){
        url = "http://localhost:8080/api/products/quantity/desc/page?page=" + page + "&size=" + size;
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
            currentPage = pageData.number;
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
            <button onclick="previousPage()" ${pageData.first ? "disabled" : ""}>Previous</button>
        `;

        for (let i = 0; i < pageData.totalPages; i++) {
            html += `
            <button onclick="goToPage(${i})" ${pageData.number === i ? "disabled" : ""}>
            ${i + 1}
            </button>
            `;
        }

        html += `<button onclick="nextPage()" ${pageData.last ? "disabled" : ""}>Next</button>
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

        html += `
                <div class="product-card" onclick="goToProductDetail(${product.id})">
                    <h2>${product.name}</h2>
                    <img src="${product.imageUrl || defaultImageUrl}" 
                    alt="${product.name}" 
                    class="productImage"
                    onerror="this.src='${defaultImageUrl}'">
                    <p>Price: $${product.price}</p>
                    <p>Availability: ${product.availability? "Yes" : "No"}</p>
                </div>
            `;
    }
    document.getElementById("products").innerHTML = html;
}

function loadProduct(){

    document.getElementById("products").innerText = "Loading products...";
    loadProductsByPage(currentPage);
}

function showProductStat(){

    fetch("http://localhost:8080/api/products/stat")
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
                </div>
                <div class="popupFormRow">
                    <label for="descInput">Description: </label>
                    <input id="descInput" placeholder="Description">
                </div>
                <div class="popupFormRow">
                    <label for="brandInput">Brand: </label>
                    <input id="brandInput" placeholder="Brand">
                </div>
                <div class="popupFormRow">
                    <label for="priceInput">Price: </label>
                    <input id="priceInput" type="number" placeholder="Price">
                </div>
                <div class="popupFormRow">
                    <label for="categoryInput">Category: </label>
                    <input id="categoryInput" placeholder="Category">
                </div>
                <div class="popupFormRow">
                    <label for="releaseDateInput">Release Date:</label>
                    <input id="releaseDateInput" type="date">
                </div>
                <div class="popupFormRow">
                    <label for="imageUrlInput">Image URL: </label>
                    <input id="imageUrlInput" type="text">
                </div>
                <div class="popupFormRow">
                    <label for="quantityInput">Quantity: </label>
                    <input id="quantityInput" type="number" placeholder="Quantity">
                </div>
                <div class="popupFormRow">
                    <label for="availabilityInput">Availability: </label>
                    <select id="availabilityInput">
                        <option value="">Select Availability</option>
                        <option value="true">Available</option>
                        <option value="false">Not available</option>
                    </select>
                </div>
                <div class="popupFormRow">
                    <button id="confirmAdding">Add Product</button>
                    <button id="cancelAdding">Cancel</button>
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
        let imageUrl = document.getElementById("imageUrlInput").value;
        let availability = document.getElementById("availabilityInput").value;
        let quantity = document.getElementById("quantityInput").value;

        if(name === "" || desc === "" || brand === ""
            || category === ""){
            alert("Please enter a valid product!");
            return;
        }

        if(price === "" || isNaN(Number(price))){
            alert("Price must be number!");
            return;
        }

        let datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if(!datePattern.test(releaseDate)){
            alert("Invalid date! Must be yyyy-MM-dd format!");
            return;
        }

        if(availability === ""){
            alert("Please select availability!");
            return;
        }

        if(quantity === "" || isNaN(Number(quantity))){
            alert("Quantity must be number!");
            return;
        }

        let product = {
            name: name,
            description: desc,
            brand: brand,
            price: Number(price),
            category: category,
            releaseDate: releaseDate,
            imageUrl: imageUrl,
            availability: availability === "true",
            quantity: Number(quantity),
        };

        console.log(product);

        fetch("http://localhost:8080/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json()
                        .then(errorData => {
                            alert(errorData.message + " Please check your input!");
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

    fetch("http://localhost:8080/api/products/low-stock/page?page=0&size=1000")
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
                        <button id="cancelPopup">Close</button>
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

function findByCategory(categoryKeyword) {
    currentMode = "byCategory";
    currentKeyword = categoryKeyword;
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function findByName(nameKeyword) {
    currentMode = "byName";
    currentKeyword = nameKeyword;
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function findByBrand(brandKeyword) {
    currentMode = "byBrand";
    currentKeyword = brandKeyword;
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function filterByAvailability(availability) {
    currentMode = "byAvailability";
    currentAvailability = availability;
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function filterLowStock(){
    currentMode = "lowStock";
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function sortByName(){
    currentMode = "asc";
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function sortByPriceAsc() {
    currentMode = "priceAsc";
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function sortByPriceDesc(){
    currentMode = "priceDesc";
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function sortByQuantityAsc(){
    currentMode = "quantityAsc";
    currentPage = 0;
    loadProductsByPage(currentPage);
}

function sortByQuantityDesc(){
    currentMode = "quantityDesc";
    currentPage = 0;
    loadProductsByPage(currentPage);
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
                    <button id="searchButton">Search</button>
                    <button id="cancelPopup">Cancel</button>
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
                <button id="searchAvailabilityButton">Search</button>
                <button id="cancelAvailabilityPopup">Cancel</button>
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
    }
    document.getElementById("cancelAvailabilityPopup").onclick = function () {
        popup.remove();
    };
}

function refreshPage(){
    currentPage = 0;
    loadProduct();
    showProductStat();
}

function goToProductDetail(id){
    window.location.href="product-detail.html?id=" + id;
}

refreshPage();
