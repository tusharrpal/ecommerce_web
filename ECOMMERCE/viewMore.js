document.addEventListener("DOMContentLoaded",()=>{
    updateCartCount();
    setupSearchRedirect();
    let products=JSON.parse(localStorage.getItem("products"))
    let productId=localStorage.getItem("productId")
    let productDetails=document.getElementById("productDetails")
    if(products && productId){
    let selectedProduct=products.find((v)=>{
        return v.id==productId;
    })
    console.log(selectedProduct);
    if(selectedProduct){
        let price=Math.ceil(selectedProduct.price)
        productDetails.innerHTML=`
        <main class="product-detail">
        <div id="up">
        <div id="block1">
        <img src="${selectedProduct.thumbnail}" alt="${selectedProduct.title}"/>
        </div>
        <div id="block2">
        <h2>${selectedProduct.title}</h2>
        <div class="detail-rating">
        <span>${"⭐".repeat(Math.round(selectedProduct.rating))} ${selectedProduct.rating.toFixed(1)}</span>
        <span>${selectedProduct.stock > 20 ? "In stock" : "Limited stock"}</span>
        <span>${Math.round(selectedProduct.discountPercentage || 0)}% off</span>
        </div>
        <p><b>Brand:</b> ${selectedProduct.brand || "Apna Bazar"}</p>
        <p><b>Category:</b> ${selectedProduct.category}</p>
        <p>${selectedProduct.description}</p>
        <div id="price1"><strong>Price: </strong><i class="fa-solid fa-indian-rupee-sign"></i><span> 
        ${price*85}</span></div>
        <div class="service-grid">
        <span class="service-pill">Free delivery</span>
        <span class="service-pill">7 day return</span>
        <span class="service-pill">Secure payment</span>
        </div>
        <div id="clk">
          <button id="b1">Add to Cart</button>
          <button id="buyNow">Buy Now</button>
          <button id="b2">Back to Home</button>
        </div>
        </div>
        </div>
        <div id="down">
        <h2>Customer reviews</h2>
        <div class="rating"><span class="heart">${"❤️".repeat(5)}</span><p>Great product!</p><p>By Shreya Tiwari</p></div>
        <div class="rating"><span class="heart">${"❤️".repeat(4)}</span><p>Awesome product!</p><p>By Samiksha Karpe</p></div>
        <div class="rating"><span class="heart">${"❤️".repeat(1)}</span><p>Poor quality!</p><p>By Kiran Pal</p></div>
        </div>
        </main>
        `;
    document.getElementById("b1").addEventListener("click",()=>{
    b1(selectedProduct);
    })
    document.getElementById("buyNow").addEventListener("click",()=>{
        b1(selectedProduct);
        window.location.href="./Cart.html";
    })
    document.getElementById("b2").addEventListener("click",()=>{
        window.location.href="./index.html";
    })
    }else{
        productDetails.innerHTML="<p class='status-message'>Product not found</p>"
    }

    }
    else{
        productDetails.innerHTML="<p class='status-message'>Product details not found</p>"
    }
})

function b1(product){
    let cart=JSON.parse(localStorage.getItem("cart"))|| []
    cart.push(product)
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCartCount();
    alert("Product added successfully")
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
