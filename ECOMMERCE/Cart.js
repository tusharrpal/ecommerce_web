document.addEventListener("DOMContentLoaded", () => {
    displayProduct();
    updateCartCount();
    setupSearchRedirect();
});

const rupeeFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
});

function getProductPrice(product) {
    return Math.ceil(Number(product.price || 0) * 85);
}

function displayProduct() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContent = document.getElementById("cartContent");
    const totalPrice = document.getElementById("totalPrice");

    cartContent.innerHTML = "";

    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <div>
                    <h2>Your cart is empty</h2>
                    <p>Find something you love and add it here. Your selected products will appear in this space.</p>
                    <a href="./index.html">Start shopping</a>
                </div>
            </div>
        `;

        totalPrice.innerHTML = `
            <h2>Order Summary</h2>
            <div class="summary-row">
                <span>Items</span>
                <strong>0</strong>
            </div>
            <div class="summary-total">
                <span>Total</span>
                <span>${rupeeFormatter.format(0)}</span>
            </div>
        `;
        updateCartCount();
        return;
    }

    let totalBill = 0;

    cart.forEach((product, index) => {
        const productPrice = getProductPrice(product);
        const image = product.thumbnail || product.images?.[0] || "";
        const rating = product.rating ? Number(product.rating).toFixed(1) : "New";
        const brand = product.brand || "Apna Bazar";

        totalBill += productPrice;

        const productElem = document.createElement("article");
        productElem.className = "product-info";
        productElem.innerHTML = `
            <div class="product-image-wrap">
                <img src="${image}" alt="${product.title || "Cart product"}">
            </div>
            <div class="product-copy">
                <h2>${product.title || "Untitled product"}</h2>
                <p>${product.description || "A clean pick from your shopping list."}</p>
                <div class="product-meta">
                    <span class="pill">${brand}</span>
                    <span class="pill">${product.category || "Product"}</span>
                    <span class="pill">Rating ${rating}</span>
                </div>
            </div>
            <div class="product-action">
                <span class="item-price">${rupeeFormatter.format(productPrice)}</span>
                <button class="remove-btn" onclick="deleteFromCart(${index})">Remove</button>
            </div>
        `;
        cartContent.appendChild(productElem);
    });

    totalPrice.innerHTML = `
        <h2>Order Summary</h2>
        <div class="summary-row">
            <span>Items</span>
            <strong>${cart.length}</strong>
        </div>
        <div class="summary-row">
            <span>Delivery</span>
            <strong>Free</strong>
        </div>
        <div class="summary-total">
            <span>Total</span>
            <span>${rupeeFormatter.format(totalBill)}</span>
        </div>
        <button class="checkout-btn">Checkout</button>
    `;
    updateCartCount();
}

function deleteFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayProduct();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function setupSearchRedirect() {
    const searchBar = document.getElementById("search-bar");

    if (!searchBar) {
        return;
    }

    searchBar.addEventListener("keydown", (event) => {
        const query = searchBar.value.trim();

        if (event.key === "Enter" && query) {
            window.location.href = `./index.html?q=${encodeURIComponent(query)}#shop-section`;
        }
    });
}
