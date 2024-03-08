const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const handleAfterClassNext = (type) =>{
    const style = document.createElement("style");
    style.innerHTML = `
    .progress:nth-of-type(${type})::after{
        background-color : #6499E9 ;
        color : #fff ;
    }
    ` ;
    document.head.appendChild(style);
};
const handleAfterClassPrev = (type) =>{
    const style = document.createElement("style");
    style.innerHTML = `
    .progress:nth-of-type(${type})::after{
        background: #ececec;
        color : #000 ;
    }
    ` ;
    document.head.appendChild(style);
}

let index = 0 ;
if (index == 0) {
    prevBtn.classList.add("disabled");
}

nextBtn.addEventListener("click", () =>{
      switch(index){
         case 0 :
             handleAfterClassNext(1);
             document.querySelector(".progress:nth-of-type(1)").style.width = "calc(100% / 3 )";
             index ++ ;
             prevBtn.classList.remove("disabled");
         break ;
         case 1 : 
             handleAfterClassNext(2);
             document.querySelector(".progress:nth-of-type(2)").style.width = "calc(100% / 3)";
             index ++ ;
         break ;
         case 2 : 
             document.querySelector(".progress:nth-of-type(3)").style.width = "calc(100% / 3)";
             nextBtn.textContent = "Finished";
             nextBtn.classList.add("disabled");   
             index ++ ;
         break ;     
      }
});
prevBtn.addEventListener("click", () =>{
    switch(index){
        case 3 : 
            document.querySelector(".progress:nth-of-type(3)").style.width = "0";
            index -- ;
            nextBtn.textContent = "Next";
            nextBtn.classList.remove("disabled");
        break ;
        case 2 : 
            handleAfterClassPrev(2);
            document.querySelector(".progress:nth-of-type(2)").style.width = "0";
            index -- ;
            nextBtn.textContent = "Next";
            nextBtn.classList.remove("disabled");
        break ; 
        case 1 :
            handleAfterClassPrev(1);
            document.querySelector(".progress:nth-of-type(1)").style.width = "0";   
            index -- ;
            prevBtn.classList.add("disabled");
            nextBtn.textContent = "Next";
            nextBtn.classList.remove("disabled");
        break ;    
     }
});


