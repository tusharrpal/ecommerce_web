let products = [];

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
});

const searchBar = document.getElementById("search-bar");
const categoryFilter = document.getElementById("category-filter");
const sortProducts = document.getElementById("sort-products");
const resultCount = document.getElementById("result-count");

function fetchData() {
    fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((val) => {
            products = val.products;
            localStorage.setItem("products", JSON.stringify(products));
            searchBar.value = new URLSearchParams(window.location.search).get("q") || "";
            createCategoryOptions(products);
            updateCartCount();
            applyFilters();
        });
}

function getProductPrice(product) {
    return Math.ceil(Number(product.price || 0) * 85);
}

function createCategoryOptions(items) {
    const categories = [...new Set(items.map((product) => product.category))].sort();

    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category.replaceAll("-", " ");
        categoryFilter.appendChild(option);
    });
}

function applyFilters() {
    const searchValue = searchBar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortValue = sortProducts.value;

    let filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchValue) ||
            product.category.toLowerCase().includes(searchValue) ||
            product.description.toLowerCase().includes(searchValue);

        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (sortValue === "price-low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "price-high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "rating") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    fetchProducts(filteredProducts);
}

function fetchProducts(productList) {
    const container = document.getElementById("containerBox");

    if (productList.length === 0) {
        container.innerHTML = `
            <div class="empty-products">
                <h2>No products found</h2>
                <p>Try another search or category.</p>
            </div>
        `;
        resultCount.textContent = "0 products found";
        return;
    }

    let output = "";

    productList.forEach((product) => {
        const price = getProductPrice(product);
        const rate = Math.round(product.rating);
        const discount = product.discountPercentage ? Math.round(product.discountPercentage) : 0;

        output += `
            <article class="product-card">
                <div class="product-media">
                    <span class="badge">${discount}% off</span>
                    <button class="wishlist-btn" aria-label="Add ${product.title} to wishlist">
                        <i class="fa-regular fa-heart"></i>
                    </button>
                    <img src="${product.images[0]}" alt="${product.title}">
                </div>
                <div class="product-body">
                    <p class="category">${product.category}</p>
                    <h2>${product.title}</h2>
                    <div class="ratings">
                        <span>${"⭐".repeat(rate)}</span>
                        <small>${product.rating.toFixed(1)}</small>
                    </div>
                    <div class="pricebox">
                        <div>
                            <p class="stock">${product.stock > 20 ? "In stock" : "Limited stock"}</p>
                            <div class="price">${rupeeFormatter.format(price)}</div>
                        </div>
                        <button onclick="viewMore(${product.id})">View</button>
                    </div>
                    <button class="add-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </article>
        `;
    });

    resultCount.textContent = `${productList.length} products found`;
    container.innerHTML = output;
}

function addToCart(productId) {
    const selectedProduct = products.find((product) => product.id === productId);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!selectedProduct) {
        return;
    }

    cart.push(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function viewMore(productId) {
    localStorage.setItem("productId", productId);
    window.location.href = "./viewMore.html";
}

searchBar.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortProducts.addEventListener("change", applyFilters);

fetchData();
