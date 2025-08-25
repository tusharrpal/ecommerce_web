let products=[];

function fetchData(){
    fetch("https://dummyjson.com/products").then((res)=>{
        return res.json();
    }).then((val)=>{
        // console.log(val.products)
        products=val.products;
        localStorage.setItem("products",JSON.stringify(products))
        fetchProducts(products)
    })
}
function fetchProducts(product){
    let output=""
    product.map((v)=>{
        let price=Math.ceil(v.price)
        let rate= Math.round(v.rating);
        output +=`
        <main>
        <div> <img src="${v.images[0]}"/> </div>
        <h2>"${v.title}"</h2>
        <div id="ratings"><span id="rating-box">Ratings:${"⭐".repeat(rate)}</div>
        <div id="pricebox">
        <div id="price"><strong>Price: </strong><span><i class="fa-solid fa-indian-rupee-sign"></i>
        ${price*85}</span></div>
        <div ><button id="view" onclick="viewMore(${v.id})">Viewmore</button><div>
        </div>
        </main>
        `
    });
   document.getElementById("containerBox").innerHTML=output;
}
  
console.log("Products1:",products)
document.getElementById("search-bar").addEventListener("input",function searchItem(event){
let searchItem = event.target.value.toLowerCase();
let filteredProducts = products.filter((v)=>{
return(
    v.title.toLowerCase().includes(searchItem) || v.category.toLowerCase().includes(searchItem)
)
});
fetchProducts(filteredProducts);
});
function viewMore(productId){
// console.log(productId)
localStorage.setItem("productId",productId);
window.location.href="./viewMore.html"
}

fetchData();
