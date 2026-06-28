let currentProducts = [];

function loadProduct(){

    document.getElementById("products").innerText = "Loading products...";

    fetch("http://localhost:8080/api/products")
    .then(response => response.json())
    .then(products => {
        currentProducts = products;
        console.log(products);

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
            <p>Available: ${product.availability}</p>
            <button onclick="updateProduct(${product.id})">Update</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
            </div>
            `;
    }
        document.getElementById("products").innerHTML = html;
    }
    )
        .catch(error => {
                console.log(error);
                document.getElementById("products").innerText = "Failed to load products...";
            }
        );
}

function deleteProduct(id){

    let confirmDelete = confirm("Are you sure you want to delete this product?");

    if (!confirmDelete) {
        return;
    }

    fetch("http://localhost:8080/api/products/" + id, {
        method: "DELETE",
    })
    .then(() => loadProduct())
    .catch(error => {
        console.log(error)
        alert("Failed to delete product!");
    }
    );

}

function addProduct(){

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

            document.getElementById("nameInput").value = "";
            document.getElementById("descInput").value = "";
            document.getElementById("brandInput").value = "";
            document.getElementById("priceInput").value = "";
            document.getElementById("categoryInput").value = "";
            document.getElementById("releaseDateInput").value = "";
            document.getElementById("availabilityInput").value = "";
            document.getElementById("quantityInput").value = "";

            loadProduct();
        })
        .catch(error => {
            console.log(error);
            alert("Failed to create product!");
        })

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
        <div style="position: fixed; top: 0; left: 0; width: 100%; 
        height: 100%; background: rgba(0, 0, 0, 0.4); 
        display: flex; align-items: center; justify-content: center">
            <div style="background-color: white; padding: 20px; border-radius: 10px">
                <h2>Update Product</h2>
                <label for="updateNameInput">Name: </label>
                <input id="updateNameInput" value="${product.name}"><br>
                <label for="updateDescInput">Description: </label>
                <input id="updateDescInput" value="${product.description}"><br>
                <label for="updateBrandInput">Brand: </label>
                <input id="updateBrandInput" value="${product.brand}"><br>
                <label for="updatePriceInput">Price: </label>
                <input id="updatePriceInput" type="number" value="${product.price}"><br>
                <label for="updateCategoryInput">Category: </label>
                <input id="updateCategoryInput" value="${product.category}"><br>
                <label for="updateReleaseDateInput">Release Date:</label>
                <input id="updateReleaseDateInput" type="date" value="${product.releaseDate}"><br>
                <label for="updateQuantityInput">Quantity: </label>
                <input id="updateQuantityInput" type="number" value="${product.quantity}"><br>
                <label for="updateAvailabilityInput">Availability: </label>
                <select id="updateAvailabilityInput">
                    <option value="">Select Availability</option>
                    <option value="true">Available</option>
                    <option value="false">Not available</option>
                </select><br>
                <button id="confirmUpdate">Confirm</button>
                <button id="cancelUpdate">Cancel</button>
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

                loadProduct();
                popup.remove();
            })
            .catch(error => {
                console.log(error);
                alert("Failed to update product!");
            })
    };

}
