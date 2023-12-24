let myData ;
let getDatafromApi = async() =>{
    let response = await fetch("http://localhost:3000/products" , {method : "GET"});
    let data =  await response.json() ;
    myData = data ;
    displayProduct(data);
};
window.addEventListener("DOMContentLoaded", () =>{
    getDatafromApi();
});

function displayProduct(data){
    let temp = "" ;
    for(let i = 0 ; i < data.length ; i++){
        temp += `
        <div class="col-md-4 col-xxl-3">
           <div class="product bg-body rounded-2 p-2 position-relative">
               <div class="product-img position-relative overflow-hidden">
                  ${data[i].onSale == true ? "<span>OnSale</span>" : ""}
                  <img src = ${data[i].productUrl} alt="">
                  <div class="product-services d-flex gap-3 position-absolute bg-white p-2">
                      <div class="icon">
                        <i onclick="saveData_to_Wishlist(${i})" class="fas fa-heart"></i>
                      </div>
                      <div class="icon">
                        <i onclick="" class="fas fa-cart-shopping"></i>
                      </div>
                  </div>
               </div>
               <div class="product-details text-center mt-3">
                  <h2>${data[i].productName}</h2>
                  <div class="product-price position-absolute d-flex justify-content-between align-items-center w-100 px-2">
                     <h6>Price : ${data[i].price}</h6>
                     <h6>Count : ${data[i].count}</h6>
                  </div>
               </div>
           </div>
        </div>
        ` ;
    }
   document.getElementById("show-data").innerHTML = temp ;
}
let wishListData = [] ;
if(localStorage.getItem("wishlist")){
   wishListData = JSON.parse(localStorage.getItem("wishlist"));
}
function saveData_to_Wishlist(index){
    wishListData.push(myData[index]);
    saveData_to_LocalStorage(wishListData);
}

function saveData_to_LocalStorage(dataContainer){
    localStorage.setItem("wishlist",JSON.stringify(dataContainer));
}