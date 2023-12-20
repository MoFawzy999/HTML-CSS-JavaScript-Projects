//select category
let categories = document.querySelectorAll("header nav ul li a");
let sections = document.querySelectorAll("section");
categories.forEach( (el) =>{
      el.addEventListener("click",removeActive);
      el.addEventListener("click",removeSection);
      el.addEventListener("click",function(){
          this.classList.add("active");
          document.querySelector(this.dataset.cat).style.display = "block";
      });
      if(el.classList.contains("active")){
        removeSection() ;
        document.querySelector(el.dataset.cat).style.display = "block";
      }
});
function removeActive(){
     categories.forEach((el) =>{
         el.classList.remove("active");
     });
}
function removeSection(){
    sections.forEach((el) =>{
        el.style.display = "none";
    });
}
//open & close cart
let cartIcon = document.querySelector(".cart-icon");
let cart = document.querySelector(".cart");
let cartClose = document.querySelector(".cart-close");
// notify icon
let notification = document.querySelector(".notify");
cartIcon.addEventListener("click",() =>{
     cart.classList.add("show");
});
cartClose.addEventListener("click",() =>{
    cart.classList.remove("show");
});
//start when the document is ready
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", start);
}else{
    start();
}
//start
function start(){
    addEvents();
}
// update
function update(){
    addEvents();
    updateTotal();
}
function addToCart(product) {
    
  }
// add events
function addEvents(){
    //remove items from cart
    let cartRemoveBtn = document.querySelectorAll(".cart-remove");
    cartRemoveBtn.forEach( (btn) =>{
        btn.addEventListener("click",removeItem);
    });
    // change item quantity 
    let itemQunatity = document.querySelectorAll(".cart-quantity");
    itemQunatity.forEach( (input) =>{
           input.addEventListener("change",function(){
            if(this.value < 1){
                 this.value = 1 ;
            }
            let thisCart = this.parentElement ;
            let totaloPriceItem = 0 ;
            let itemPrice = parseFloat(thisCart.querySelector(".cart-price").innerHTML.replace("$",""));
            totaloPriceItem = itemPrice * thisCart.querySelector(".cart-quantity").value;
            thisCart.parentElement.querySelector(".item-total-price").innerHTML = `$${totaloPriceItem}` ;
            update();
           });
    });
    // Add item to cart
    let addCartBtn = document.querySelectorAll(".product-box a");
    addCartBtn.forEach( (add) =>{
         add.addEventListener("click",addItems);
    });
    // buy order
     let buy = document.querySelector(".btn-buy");
     buy.addEventListener("click",buyOrder);
}
//=============================================
let itemsAdded = [] ;
function addItems(){
    let product = this.parentElement ;
    let productTitle = product.querySelector(".product-title").innerHTML;
    let productPrice = product.querySelector(".product-price").innerHTML;
    let productImg = product.querySelector(".product-box img").src ;
     // handle item is already exist
     let newToAdd = {productTitle, productPrice,productImg};
     if(itemsAdded.find( (el) => el.productTitle == newToAdd.productTitle )){
          alert("This Item is already exist!");
          return ;
     }else{
        itemsAdded.push(newToAdd);
     }
     // shopping card notifications
     if(itemsAdded.length > 0){
        notification.innerHTML = itemsAdded.length ;
        notification.style.opacity = "1";
     }
     //add product to cart 
     let cartBoxElement = cartBoxComponent(productTitle, productPrice, productImg);
     let newNode = document.createElement("div");
     newNode.innerHTML = cartBoxElement;
     const cartContent = cart.querySelector(".cart-content");
     cartContent.appendChild(newNode);
     update();
}
function removeItem(){
    this.parentElement.remove();
    itemsAdded = itemsAdded.filter( el =>
         el.productTitle != this.parentElement.querySelector(".cart-product-title").innerHTML);
    notification.innerHTML = itemsAdded.length;
    if(notification.innerHTML == 0){
        notification.style.opacity = "0";
    } 
    update();
}
function buyOrder(){
    if (itemsAdded.length <= 0) {
        alert("There is No Order to Place Yet! \nPlease Make an Order first.");
        return;
      }
      const cartContent = cart.querySelector(".cart-content");
      cartContent.innerHTML = "";
      alert("Your Order is Placed Successfully \nWe will contact you after at least three days");
      itemsAdded = [];
      notification.style.opacity = "0";
      cart.classList.remove("show");
      update();
} 
function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    let totalPrice = document.querySelector(".total-price");
    let total = 0 ;
    cartBoxes.forEach( (cartBox) =>{
         let price = parseFloat(cartBox.querySelector(".cart-price").innerHTML.replace("$","")) ;
         let quantity = cartBox.querySelector(".cart-quantity").value;
         total += price * quantity;
    });
    total = total.toFixed(2); // keep 2 digit after decimal point
    totalPrice.innerHTML = `$ ${total}`;
}
function cartBoxComponent(productTitle,productPrice,productImg){
    return `
        <div class="cart-box">
          <img src="${productImg}" alt="" class="cart-image">
          <div class="details-box">
            <div class="cart-product-title">${productTitle}</div>
            <div class="cart-price">${productPrice}</div>
            <input type="number" class="cart-quantity" value="1">
          </div>
          <div class="item-total-price"></div>
          <i class="bx bxs-trash-alt cart-remove"></i>
        </div> `
}