let productNameInput = document.getElementById("product_name");
let productPriceInput = document.getElementById("product_price");
let productCategoryInput = document.getElementById("product_category");
let productDescInput = document.getElementById("product_description");
let searchInput = document.getElementById("search_input");

let productsList = [];

if (localStorage.getItem("productsList") == null) {
    productsList = [];
} else {
    productsList = JSON.parse(localStorage.getItem("productsList"));
    displayProducts();
}
function addProduct() {
    let product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value
    };
    productsList.push(product);
    localStorage.setItem("productsList", JSON.stringify(productsList));
    displayProducts();
    clearForm();
}

function displayProducts() {
    let productBox = "";
    for (let i = 0; i < productsList.length; i++) {
        productBox += `<tr>
                        <td>${i + 1}</td>
                        <td>${productsList[i].name}</td>    
                        <td>${productsList[i].price}</td>
                        <td>${productsList[i].category}</td>
                        <td>${productsList[i].desc}</td>
                        <td><button class="btn btn-success" onclick="updateProduct(${i})">Update</button></td>
                        <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
                    </tr>`;
    }
    document.getElementById('product_table').innerHTML = productBox;
}
function deleteProduct(index) {
    productsList.splice(index, 1);
    localStorage.setItem("productsList", JSON.stringify(productsList));
    displayProducts();
}
function updateProduct(index) {
    productNameInput.value = productsList[index].name;
    productPriceInput.value = productsList[index].price;
    productCategoryInput.value = productsList[index].category;
    productDescInput.value = productsList[index].desc;
    productsList.splice(index, 1);
    localStorage.setItem("productsList", JSON.stringify(productsList));
    displayProducts();
}
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}
function searchProducts() {
    let searchResults = [];
    for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].name.toLowerCase().includes(searchInput.value.toLowerCase()) == true) {
            searchResults += `<tr>
                                <td>${i + 1}</td>
                                <td>${productsList[i].name}</td>    
                                <td>${productsList[i].price}</td>
                                <td>${productsList[i].category}</td>
                                <td>${productsList[i].desc}</td>
                                <td><button class="btn btn-success" onclick="updateProduct(${i})">Update</button></td>
                                <td><button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button></td>
                            </tr>`;
        }
    }
    document.getElementById('product_table').innerHTML = searchResults;
}

function clearSearch() {
    document.getElementById("search_input").value = "";
    displayProducts();
}