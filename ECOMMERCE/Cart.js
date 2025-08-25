document.addEventListener("DOMContentLoaded",()=>{
    displayProduct()
})

function displayProduct(){
    let cart=JSON.parse(localStorage.getItem("cart")) || []
    let cartContent=document.getElementById("cartContent");
    let totalPrice=document.getElementById("totalPrice");
    cartContent.innerHTML="";

let totalBill=0;
if(cart.length==0){
    cartContent.innerHTML="<p>Your cart is Empty, Start shopping</P"
    totalPrice=innerHTML="";
   
}

cart.map((product,index)=>{
    // console.log(product,index);
    totalBill += product.price*85;
    let productElem=document.createElement("div")
    productElem.setAttribute("class","product-info");
    productElem.innerHTML=`
    <main>
    <img src="${product.images[0]}"/>
    <button onclick="deleteFromCart(${index})">Remove</button>
    </main>
    `;
    cartContent.appendChild(productElem);
   
});
 totalPrice.innerHTML=`<h2>Total Amount:${totalBill}</h2>`

}

function deleteFromCart(index){
    // console.log(index)
    let cart=JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index,1);
    // console.log(cart)
    localStorage.setItem("cart",JSON.stringify(cart));
    window.location.reload();
    displayProduct()
}
