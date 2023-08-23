// header-section
let header  = document.createElement("header");
header.style.cssText = "display:flex;justify-content:space-between"
let logo = document.createElement("p");
logo.textContent = "TECH" ;
logo.style.cssText = "margin-left:15px;color:green;font-weight:bold;font-size:22px"
let navBar = document.createElement("ul");
navBar.style.cssText = "display:flex;flex-wrap:wrap;margin-right:15px;list-style:none"
for(let i=0 ; i < 4 ; i++){
    let list = document.createElement("li");
    list.style.cssText="Padding: 10px 0 0 20px;font-size:20px"
    navBar.appendChild(list);
}
let lists = navBar.children ;
lists[0].textContent = "Home"
lists[1].textContent = "About"
lists[2].textContent = "Services"
lists[3].textContent = "Contact"
header.appendChild(logo);
header.appendChild(navBar);
document.body.appendChild(header);
// body-section
let middleSection = document.createElement("section");
middleSection.style.cssText = "padding: 35px 15px";
let container = document.createElement("div");
container.style.cssText = "padding:40px 20px;display:grid;grid-template-columns: repeat(auto-fill, minmax(200px,1fr));gap:40px;background-color:gray"
for(let i=0 ; i < 15 ; i++){
    let card = document.createElement("div");
    card.style.cssText = "height:100px;border-radius:2px;background-color:white;color:black;display:flex;flex-direction:column"
    let productNumber = document.createElement("span");
    productNumber.textContent= `${i+1}` ;
    productNumber.style.cssText = "margin-top:20px;text-align:center;font-size:16px" ;
    let productText = document.createElement("span");
    productText.textContent = "Product";
    productText.style.cssText = "text-align:center;margin-top:10px;color:#777"
    card.appendChild(productNumber);
    card.appendChild(productText);
    container.appendChild(card);
    middleSection.appendChild(container);
}
document.body.appendChild(middleSection);
// footer-section
let footer = document.createElement("footer");
let content = document.createElement("div");
content.textContent = "CopyRight 2023";
content.style.cssText = "background-color:green;display:flex;justify-content:center;align-items:center;color:white;font-size:22px;height:50px;" ;
footer.appendChild(content);
document.body.appendChild(footer);
document.body.style.cssText = "margin:0;font-family:Tahoma";