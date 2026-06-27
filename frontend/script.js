function loadProduct(){

    document.getElementById("products").innerText = "Loading products...";

    fetch("http://localhost:8080/api/products")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let html = "";

        for (let i = 0; i < data.length; i++) {
            let product = data[i];

        html += `
            <div class="product-card">
            <h2>${product.name}</h2>
            <p>Description: ${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Brand: ${product.brand}</p>
            <p>Category: ${product.category}</p>
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

    let product = {
        name: name,
        description: desc,
        brand: brand,
        price: price,
        category: category,
        releaseDate: releaseDate,
        availability: availability,
        quantity: quantity,
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
            loadProduct();
        })
        .catch(error => {
            console.log(error);
            alert("Failed to create product!");
        })

}
