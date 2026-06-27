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
