let sliderImgs = Array.from(document.querySelectorAll(".slider-container img"));
let slidesCount = sliderImgs.length ;
let curentSlide = 1 ;

let imgNumber = document.querySelector(".slider-number");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");



let pagination = document.createElement("ul");
for(let i= 1 ; i <= slidesCount ; i++){
    let paginationItem = document.createElement("li") ;
    paginationItem.setAttribute("data-index",i);
    paginationItem.appendChild(document.createTextNode(i));
    pagination.appendChild(paginationItem);
}
let indicators = document.querySelector(".indicators");
indicators.appendChild(pagination);

var paginationCreatedUl = document.querySelector('.indicators ul');
let paginationItems = Array.from(document.querySelectorAll(".indicators ul li"));
for (var i = 0; i < paginationItems.length; i++) {
    paginationItems[i].onclick = function () {
      curentSlide = parseInt(this.getAttribute('data-index'));
      checker();
    }
  }

nextBtn.onclick = nextSlide ;
prevBtn.onclick = prevSlide ;
checker();

function nextSlide(){
    if(nextBtn.classList.contains("disabled")){
        return false ;
    }else{
        curentSlide ++ ;
        checker();
    }
}
function prevSlide(){
    if(prevBtn.classList.contains("disabled")){
        return false ;
    }else{
        curentSlide -- ;
        checker();
    }
}
function checker(){
    imgNumber.textContent = `Slide #${curentSlide}`;
    removeAllActive();
    sliderImgs[curentSlide - 1].classList.add("active"); 
    paginationCreatedUl.children[curentSlide - 1].classList.add("active");
    if(curentSlide == 1){
        prevBtn.classList.add("disabled");
    }else{
        prevBtn.classList.remove("disabled");
    }
    if(curentSlide == slidesCount){
        nextBtn.classList.add("disabled");
    }else{
        nextBtn.classList.remove("disabled");
    }
}

function removeAllActive(){
    paginationItems .forEach( (li) =>{
        li.classList.remove("active");
    });
    sliderImgs.forEach( (img) =>{
       img.classList.remove("active");
    });
}

