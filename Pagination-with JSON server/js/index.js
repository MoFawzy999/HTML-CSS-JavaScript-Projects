const paginateItem = document.querySelectorAll(".paginate-item");
let nextBtn = document.querySelector(".next");
let prevBtn = document.querySelector(".prev");
let paginateNum = 1 ;


let getData_from_API = (pageNum) =>{
    document.getElementById("showPosts").innerHTML = `<div class="text-center"><i class="fas fa-spinner fa-spin fa-3"></i></div>` ;   
    setTimeout( async() =>{
        let response = await fetch(`http://localhost:3000/posts?_page=${pageNum}`);
        let data = await response.json();
        displayPosts(data);
    },1000);
}

function displayPosts(data){
     let posts = "" ;
     data.forEach( (post) => {
          posts += `<div class="col-md-3">
                      <div class="post bg-info p-2 rounded-3 shado">
                         <h6>Title : ${post.title}</h6>
                         <h6>Body : ${post.body}</h6>
                      </div>
                    </div>
                    `;
     });
     document.getElementById("showPosts").innerHTML = posts ;    
}

function handleActivePaginate(){
    paginateItem.forEach( (paginate) =>{
        paginate.addEventListener("click" , (e) =>{
            removeActive();
            paginateNum = e.target.textContent ;
            e.target.classList.add("active");
            getData_from_API(paginateNum);
            if(paginateNum == paginateItem.length){
                nextBtn.classList.add("disabled");
            }else{
                nextBtn.classList.remove("disabled");
            }
            if(paginateNum == 1){
                prevBtn.classList.add("disabled");
            }else{
                prevBtn.classList.remove("disabled");
            }
        });
      });
}
function removeActive(){
    paginateItem.forEach( (paginate) =>{
        paginate.classList.remove("active");
    });
}
getData_from_API(paginateNum);

if(paginateNum == 1){
    prevBtn.classList.add("disabled");
}
nextBtn.addEventListener("click" , ()=>{
    paginateNum++ ;
    if(paginateNum == paginateItem.length){
        nextBtn.classList.add("disabled");
    }
    prevBtn.classList.remove("disabled");
    removeActive();
    paginateItem[paginateNum-1].classList.add("active");
    getData_from_API(paginateNum);
});
prevBtn.addEventListener("click" , ()=>{
    paginateNum-- ;
    if(paginateNum == 1){
        prevBtn.classList.add("disabled");
    }
    nextBtn.classList.remove("disabled");
    removeActive();
    paginateItem[paginateNum-1].classList.add("active");
    getData_from_API(paginateNum);
});

window.addEventListener("DOMContentLoaded",handleActivePaginate());
