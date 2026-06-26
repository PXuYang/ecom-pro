let products = [
    {
        name: "iPhone 17",
        price: "$999.99",
        brand: "Apple",
        category: "Phone"
    },
    {
        name: "Galaxy S25",
        price: "$899.99",
        brand: "Samsung",
        category: "Phone"
    }
];

function loadProduct(){
    console.log(products);

    let html = "";

    for(let i = 0; i < products.length; i++) {
        let product = products[i];

        html += `
        <div class="product-card">
        <h2>${product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>Brand: ${product.brand}</p>
        <p>Category: ${product.category}</p>
        </div>
        `;
    }

    document.getElementById("products").innerHTML = html;
}
