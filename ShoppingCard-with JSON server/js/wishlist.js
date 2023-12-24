let wishListContainer ;
window.addEventListener("DOMContentLoaded" , () =>{  
    if(localStorage.getItem("wishlist")){
         wishListContainer = JSON.parse(localStorage.getItem("wishlist"));
    }
    displayProduct(wishListContainer);
});



function displayProduct(data){
    let temp = "" ;
    for(let i = 0 ; i < data.length ; i++){
        temp += `
        <div class="col-md-4">
           <div class="product bg-body rounded-2 p-2 position-relative">
               <div class="product-img position-relative overflow-hidden">
                  <i onclick="deleteProduct(${i})" class="fas fa-xmark position-absolute close" ></i>
                  ${data[i].onSale == true ? "<span>OnSale</span>" : ""}
                  <img src = ${data[i].productUrl} alt="">
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

function deleteProduct(index){
     wishListContainer.splice(index,1);
     localStorage.setItem("wishlist", JSON.stringify(wishListContainer));
     displayProduct(wishListContainer);
}