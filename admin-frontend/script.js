let currentProducts = [];

function displayProducts(products) {

    let html = "";

    for (let i = 0; i < products.length; i++) {
        let product = products[i];

        html += `
                <div class="product-card">
                    <h2>${product.name}</h2>
                    <p>Description: ${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Brand: ${product.brand}</p>
                    <p>Category: ${product.category}</p>
                    <p>Release Date: ${product.releaseDate}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <p>Available: ${product.availability? "Yes" : "No"}</p>
                    <button onclick="updateProduct(${product.id})">Update</button>
                    <button onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            `;
    }
    document.getElementById("products").innerHTML = html;
}

function loadProduct(){

    document.getElementById("products").innerText = "Loading products...";

    fetch("http://localhost:8080/api/products")
    .then(response => response.json())
    .then(products => {

        currentProducts = products;
        console.log("Loaded products", products);

        displayProducts(products);
    })
        .catch(error => {
            console.log(error);
            document.getElementById("products").innerText = "Failed to load products...";
        });
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

function deleteProduct(id){

    let confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
        return;
    }

    fetch("http://localhost:8080/api/products/" + id, {
        method: "DELETE",
    })
    .then(() => {
        refreshPage();
    })
    .catch(error => {
        console.log(error)
        alert("Failed to delete product!");
    }
    );

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

function updateProduct(id){

    let product = null;

    for(let i = 0; i < currentProducts.length; i++) {
        if(currentProducts[i].id === id){
            product = currentProducts[i];
        }
    }

    console.log("Selected product: ", product);

    let popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popupOverlay">
            <div class="popupWindow">
                <h2>Update Product</h2>
                    <div class="popupFormRow">
                        <label for="updateNameInput">Name: </label>
                        <input id="updateNameInput" value="${product.name}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateDescInput">Description: </label>
                        <input id="updateDescInput" value="${product.description}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateBrandInput">Brand: </label>
                        <input id="updateBrandInput" value="${product.brand}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updatePriceInput">Price: </label>
                        <input id="updatePriceInput" type="number" value="${product.price}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateCategoryInput">Category: </label>
                        <input id="updateCategoryInput" value="${product.category}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateReleaseDateInput">Release Date: </label>
                        <input id="updateReleaseDateInput" type="date" value="${product.releaseDate}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateQuantityInput">Quantity: </label>
                        <input id="updateQuantityInput" type="number" value="${product.quantity}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateAvailabilityInput">Availability: </label>
                        <select id="updateAvailabilityInput">
                            <option value="">Select Availability</option>
                            <option value="true">Available</option>
                            <option value="false">Not available</option>
                        </select>
                    </div>
                    <div class="popupFormRow">
                        <button id="confirmUpdate">Confirm</button>
                        <button id="cancelUpdate">Cancel</button>
                    </div>
            </div>
        </div>
        `;

    document.body.appendChild(popup);
    document.getElementById("updateAvailabilityInput").value = String(product.availability);
    document.getElementById("cancelUpdate").onclick = function () {
        popup.remove();
    };
    document.getElementById("confirmUpdate").onclick = function () {

        let name = document.getElementById("updateNameInput").value;
        let desc = document.getElementById("updateDescInput").value;
        let brand = document.getElementById("updateBrandInput").value;
        let price = document.getElementById("updatePriceInput").value;
        let category = document.getElementById("updateCategoryInput").value;
        let releaseDate = document.getElementById("updateReleaseDateInput").value;
        let availability = document.getElementById("updateAvailabilityInput").value;
        let quantity = document.getElementById("updateQuantityInput").value;

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
            availability: availability === "true",
            quantity: Number(quantity),
        };

        console.log("Updated product: ", product);

        fetch("http://localhost:8080/api/products/" + id, {
            method: "PUT",
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
                alert("Failed to update product!");
            })
    };

}

function showLowStockDetails() {

    let lowStockDetails = "";

    fetch("http://localhost:8080/api/products/low-stock")
    .then(response => response.json())
        .then(lowStock => {

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

function findByCategory(category) {

    fetch("http://localhost:8080/api/products/category/" + category, {
        method: "GET",
    })
    .then(response => response.json())
    .then(byCategory => {

            console.log("Loaded products", byCategory);

            displayProducts(byCategory);

        })
        .catch(error => {
            console.log(error);
            document.getElementById("products").innerText = "Failed to load products...";
        });
}

function findByName(keyword) {
    fetch("http://localhost:8080/api/products/byname/" + keyword, {
        method: "GET",
    })
        .then(response => response.json())
        .then(byName => {

            console.log("Loaded products", byName);

            displayProducts(byName);
        })
        .catch(error => {
            console.log(error);
            document.getElementById("products").innerText = "Failed to load products...";
        });
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
            alert("Please enter a valid category!");
            return;
        }
        if(type === "name"){
            findByName(input);
        }
        if(type === "category") {
            findByCategory(input);
        }
        popup.remove();
    }

    document.getElementById("cancelPopup").onclick = function () {
        popup.remove();
    };
}

function refreshPage(){
    loadProduct();
    showProductStat();
}

refreshPage();
