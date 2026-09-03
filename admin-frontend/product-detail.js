const defaultImageName = "No-Image-Found-400x264.png";

const param = new URLSearchParams(window.location.search);
const id = param.get("id");

let currentProduct = null;

function loadProductById(id){

    document.getElementById("productDetail").innerText = "Loading product...";

    authenticateFetch(`http://localhost:8080/api/products/${id}`)
        .then(response => response.json())
        .then(product => {
            console.log("Loaded product", product);
            currentProduct = product;
            displayProductDetail(product);
        })
        .catch(error => {
            handleRequestError(error, "Failed to load product...");
        });

}

function displayProductDetail(product) {

    let imageUrl = product.imageName ?
        "http://localhost:8080/api/images/" + product.imageName : defaultImageName;

    document.getElementById("productDetail").innerHTML = `
                <div class="product-detail-card">

                    <img src="${imageUrl}" 
                        alt="${product.name}" 
                        class="detailImage"
                        onerror="this.src='${defaultImageName}'">
                        
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

    authenticateFetch("http://localhost:8080/api/products/delete/" + id, {
        method: "DELETE",
    })
        .then(() => {
            window.location.href="homepage.html";
        })
        .catch(error => {
            handleRequestError(error, "Failed to delete this product!");
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
                        <span id="updateNameError" class="fieldError"></span>
                    </div>
                    <div class="popupFormRow">
                        <label for="updateDescInput">Description: </label>
                        <input id="updateDescInput" value="${currentProduct.description}">
                        <span id="updateDescError" class="fieldError"></span>
                    </div>
                    <div class="popupFormRow">
                        <label for="updateBrandInput">Brand: </label>
                        <input id="updateBrandInput" value="${currentProduct.brand}">
                        <span id="updateBrandError" class="fieldError"></span>
                    </div>
                    <div class="popupFormRow">
                        <label for="updatePriceInput">Price: </label>
                        <input id="updatePriceInput" type="number" value="${currentProduct.price}">
                        <span id="updatePriceError" class="fieldError"></span>
                    </div>
                    <div class="popupFormRow">
                        <label for="updateCategoryInput">Category: </label>
                        <input id="updateCategoryInput" value="${currentProduct.category}">
                        <span id="updateCategoryError" class="fieldError"></span>
                    </div>
                    <div class="popupFormRow">
                        <label for="updateReleaseDateInput">Release Date: </label>
                        <input id="updateReleaseDateInput" type="date" value="${currentProduct.releaseDate}">
                        <span id="updateReleaseDateError" class="fieldError"></span>
                    </div>
                    <div class="popupFormRow">
                        <label for="updateImageInput">Image: </label>
                        <input id="updateImageInput" type="file"">
                        <span id="updateImageError" class="fieldError"></span>
                    </div>
                    <div class="popupFormRow">
                        <label for="updateQuantityInput">Quantity: </label>
                        <input id="updateQuantityInput" type="number" value="${currentProduct.quantity}">
                        <span id="updateQuantityError" class="fieldError"></span>
                    </div>
                    <div class="popupFormRow">
                        <label for="updateAvailabilityInput">Availability: </label>
                        <select id="updateAvailabilityInput">
                            <option value="">Select Availability</option>
                            <option value="true">Available</option>
                            <option value="false">Not available</option>
                        </select>
                        <span id="updateAvailabilityError" class="fieldError"></span>
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
        let image = document.getElementById("updateImageInput").files[0];
        let availability = document.getElementById("updateAvailabilityInput").value;
        let quantity = document.getElementById("updateQuantityInput").value;

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
            errors.price = "Price must be number";
        }

        let datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if(!datePattern.test(releaseDate)){
            errors.releaseDate = "Invalid Date! Must be yyyy-MM-dd format!";
        }

        if(availability === ""){
            errors.availability = "Please select availability!";
        }

        if(quantity === "" || isNaN(Number(quantity))){
            errors.quantity = "Quantity must be number";
        }

        document.getElementById("updateNameError").innerText = errors.name || "";
        document.getElementById("updateDescError").innerText = errors.desc || "";
        document.getElementById("updateBrandError").innerText = errors.brand || "";
        document.getElementById("updatePriceError").innerText = errors.price || "";
        document.getElementById("updateCategoryError").innerText = errors.category || "";
        document.getElementById("updateReleaseDateError").innerText = errors.releaseDate || "";
        document.getElementById("updateQuantityError").innerText = errors.quantity || "";
        document.getElementById("updateAvailabilityError").innerText = errors.availability || "";

        if(Object.keys(errors).length > 0){
            return;
        }

        let product = new FormData();
        if(image){
            product.append("image", image)
        }
            product.append("name", name),
            product.append("description", desc),
            product.append("brand", brand),
            product.append("price", Number(price)),
            product.append("category", category),
            product.append("releaseDate", releaseDate),
            product.append("availability", availability),
            product.append("quantity", Number(quantity));

        console.log("Updated product:");
        for(let pair of product.entries()) {
            console.log(pair[0],pair[1]);
        }

        authenticateFetch("http://localhost:8080/api/products/update/" + id + "/with-image", {
            method: "PUT",
            body: product,
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
                handleRequestError(error, "Failed to update product!");
            })
    };

}

function refreshPage() {
    location.reload();
}

loadProductById(id);