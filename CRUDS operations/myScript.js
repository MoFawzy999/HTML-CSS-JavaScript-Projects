let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create" ;
let tmp ;
// getTotal
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - discount.value ;
        total.textContent = result ;
        total.style.backgroundColor = "#040";
    }else{
        total.textContent = "" ;
        total.style.backgroundColor = "#a00d02" ;
    } 
}
// read products
let data  ;
if(localStorage.getItem("products-data")){
   data = JSON.parse(localStorage.getItem("products-data"));
}else{
    data = [] ;
}
showData(data);
//createProduct
submit.onclick = function(){
    if(title.value == "" || price.value == ""  ||  count.value > 200 ){
         return ;
    }else{
        let newPro = {
            "title" : title.value.toLowerCase() ,
            "price" : price.value ,
            "taxes" : taxes.value ,
            "ads" : ads.value ,
            "discount" : discount.value ,
            "total" : total.textContent ,
            "count" : count.value ,
            "category" : category.value.toLowerCase() 
        };
//count
    if(mood == "create"){
        if(newPro.count > 1){
          for(let i = 0 ; i < newPro.count ; i++){
             data.push(newPro);
          }
        }else{
          data.push(newPro);
        }
        saveData_to_LocalStorage(data);
        clearData();
        showData(data);
        // update
    }else{
        data[tmp] = newPro ;
        saveData_to_LocalStorage(data);
        clearData();
        showData(data);
        mood = "create" ;
        submit.textContent = "Create" ;
        count.style.display = "block" ;
    }
    }
}
//save in local storage
function saveData_to_LocalStorage(data){
   localStorage.setItem("products-data",JSON.stringify(data));
}
//clear inputs
function clearData(){
   title.value = "" ;
   price.value = "" ;
   taxes.value = "" ;
   ads.value = "" ;
   discount.value = "" ;
   total.textContent = "" ;
   total.style.backgroundColor = "#a00d02" ;
   count.value = "" ;
   category.value = "" ;
}
// read 
function showData(data){
    let table = "" ;
    for(let i = 0 ; i < data.length ; i++){
         table += ` <tr>
                <td>${i+1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
            </tr>
         ` ;
    }
    document.getElementById("tbody").innerHTML = table ;
    let btnDelete = document.getElementById("delete-All");
    if(data.length > 0){
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${data.length})</button>` ;
    }else{
        btnDelete.innerHTML = "" ;
    }
}


//delete All
function deleteAll(){
    localStorage.clear();
    data.splice(0);
    showData(data);
}
//delete
function deleteProduct(i){
    data.splice(i,1);
    localStorage.setItem("products-data",JSON.stringify(data));
    showData(data);
}


//update
function updateProduct(i){
    title.value = data[i].title ;
    price.value = data[i].price ;
    taxes.value = data[i].taxes ;
    ads.value = data[i].ads ;
    discount.value = data[i].discount;
    getTotal();
    count.style.display = "none" ;
    category.value = data[i].category ;
    submit.textContent = "Update";
    mood = "update" ;
    tmp = i ;
    scroll({
        top : 0 ,
        behavior : "smooth"
    });
}



//search
let searchMood = "title" ;
function getMoodSearch(id){
    let search = document.getElementById("search");
    if(id == "searchTitle"){
        searchMood = "title" ;
    }else{
        searchMood = "category" ;
    }
    search.placeholder = `Search by ${searchMood}` ;
    search.focus();
    search.value = "" ; 
    //showData(data);
}


function searchData(value){
    let table = "" ;
    for(let i =0 ; i < data.length ; i++){
        if(searchMood == "title"){
            if(data[i].title.toLowerCase().includes(value.toLowerCase())){
              table += ` <tr>
              <td>${i+1}</td>
              <td>${data[i].title}</td>
              <td>${data[i].price}</td>
              <td>${data[i].taxes}</td>
              <td>${data[i].ads}</td>
              <td>${data[i].discount}</td>
              <td>${data[i].total}</td>
              <td>${data[i].category}</td>
              <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
              <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
              </tr>
              ` ; 
            }
        }else{
            if(data[i].category.toLowerCase().includes(value.toLowerCase())){
                table += ` <tr>
                <td>${i+1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button onclick="updateProduct(${i})" id="update">Update</button></td>
                <td><button onclick="deleteProduct(${i})" id="delete">Delete</button></td>
                </tr>
                ` ; 
            }
        }
    }
        
     document.getElementById("tbody").innerHTML = table ;
}