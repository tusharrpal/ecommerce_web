document.addEventListener("DOMContentLoaded",()=>{
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
        <main>
        <div id="up">
        <div id="block1">
        <img src="${selectedProduct.thumbnail}"/>
        </div>
        <div id="block2">
        <h2>${selectedProduct.title}</h2>
        <p><b>Brand:</b>${selectedProduct.brand}</p>
        <p><b>Category:</b>${selectedProduct.category}</p>
        <p><b>Description:</b>${selectedProduct.description}</p>
        <div id="price1"><strong>Price: </strong><i class="fa-solid fa-indian-rupee-sign"></i><span> 
        ${price*85}</span></div>
        <div id="clk">
          <button id="b1">Add to Cart</button>
          <button id="b2">Back to Home</button>
        </div>
        </div>
        </div>
        <div id="down">
        <h2>Customer reviews</h2>
        <div class="rating"><span class="heart">${"❤️".repeat(5)}</spam><p>Great product !</p><p>By Shreya Tiwari on Wed Age 36 2025 13.11.02 GMT-0530(Indian Standard Time)</p></div>
        <div class="rating"><span class="heart">${"❤️".repeat(4)}</spam><p>Awesome product !</p>By Samiksha Karpe on Mon Age 36 2025 08.13.07 GMT-0530(Indian Standard Time)<p></p></div>
        <div class="rating"><span class="heart">${"❤️".repeat(1)}</spam><p>Poor quality !</p><p>By Kiran Pal on Wed Sat 36 2025 11.11.13 GMT-0530(Indian Standard Time)</p></div>
        </div>
        </main>
        `;
    document.getElementById("b1").addEventListener("click",()=>{
    b1(selectedProduct);
    })
    document.getElementById("b2").addEventListener("click",()=>{
        window.location.href="./index.html";
    })
    }else{
        productDetails.innerHTML="<p>Product Not found</p>"
    }

    }
    else{
        productDetails.innerHTML="<p>Product Details Not found</p>"
    }
})

function b1(product){
    let cart=JSON.parse(localStorage.getItem("cart"))|| []
    cart.push(product)
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product added successfully")
}