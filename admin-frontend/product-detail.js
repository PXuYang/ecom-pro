const defaultImageUrl = "No-Image-Found-400x264.png";

const param = new URLSearchParams(window.location.search);
const id = param.get("id");

let currentProduct = null;

function loadProductById(id){

    document.getElementById("productDetail").innerText = "Loading product...";

    fetch(`http://localhost:8080/api/products/${id}`)
        .then(response => response.json())
        .then(product => {
            console.log("Loaded product", product);
            currentProduct = product;
            displayProductDetail(product);
        })
        .catch(error => {
            console.log(error);
            document.getElementById("productDetail").innerText = "Failed to load product...";
        });

}

function displayProductDetail(product) {

    document.getElementById("productDetail").innerHTML = `
                <div class="product-detail-card">

                    <img src="${product.imageUrl || defaultImageUrl}" 
                        alt="${product.name}" 
                        class="detailImage"
                        onerror="this.src='${defaultImageUrl}'">
                        
                    <div class="product-detail-info">
                        <h2>${product.name}</h2>
                        <p>Price: $${product.price}</p>
                        <p>Brand: ${product.brand}</p>
                        <p>Description: ${product.description}</p>
                        <p>Category: ${product.category}</p>
                        <p>Release Date: ${product.releaseDate}</p>
                        <p>Quantity: ${product.quantity}</p>
                        <p>Availability: ${product.availability ? "Yes" : "No"}</p>
                        
                        <button onclick="updateProduct(${product.id})">Update</button>
                        <button onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </div>
            `;
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
            window.location.href="homepage.html";
        })
        .catch(error => {
                console.log(error)
                alert("Failed to delete product!");
            }
        );

}

function updateProduct(id){

    if(currentProduct === null){
        alert("Product not found!");
        return;
    }

    console.log("Selected product: ", currentProduct);

    let popup = document.createElement("div");
    popup.innerHTML = `
        <div class="popupOverlay">
            <div class="popupWindow">
                <h2>Update Product</h2>
                    <div class="popupFormRow">
                        <label for="updateNameInput">Name: </label>
                        <input id="updateNameInput" value="${currentProduct.name}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateDescInput">Description: </label>
                        <input id="updateDescInput" value="${currentProduct.description}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateBrandInput">Brand: </label>
                        <input id="updateBrandInput" value="${currentProduct.brand}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updatePriceInput">Price: </label>
                        <input id="updatePriceInput" type="number" value="${currentProduct.price}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateCategoryInput">Category: </label>
                        <input id="updateCategoryInput" value="${currentProduct.category}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateReleaseDateInput">Release Date: </label>
                        <input id="updateReleaseDateInput" type="date" value="${currentProduct.releaseDate}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateImageUrlInput">Image URL: </label>
                        <input id="updateImageUrlInput" type="text" value="${currentProduct.imageUrl || ""}">
                    </div>
                    <div class="popupFormRow">
                        <label for="updateQuantityInput">Quantity: </label>
                        <input id="updateQuantityInput" type="number" value="${currentProduct.quantity}">
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
    document.getElementById("updateAvailabilityInput").value = String(currentProduct.availability);
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
        let imageUrl = document.getElementById("updateImageUrlInput").value;
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
            imageUrl: imageUrl,
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

function refreshPage() {
    location.reload();
}

loadProductById(id);