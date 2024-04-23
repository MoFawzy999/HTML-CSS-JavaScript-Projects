document.querySelector(".splash-screen span").onclick = function () {
    let yourName = prompt("What's your name ?");
    if(yourName == null || yourName == ""){
        document.querySelector(".name span").innerHTML = "Unknown"
    }else{
        document.querySelector(".name span").innerHTML = yourName ;
    }
    document.querySelector(".splash-screen").remove();
};

let duration = 1500 ;
let blocksContainer = document.querySelector(".memory-blocks");
let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()] ;
shuffle(orderRange);

blocks.forEach( (block,index) =>{
     block.style.order = orderRange[index] ;
     block.addEventListener("click" , () =>{
         flipBlock(block);
     });
});

function flipBlock(selectedBlock){
    selectedBlock.classList.add("is-flip");
    let allFlipedBlocks = blocks.filter( block => block.classList.contains("is-flip"));
    if(allFlipedBlocks.length % 2 === 0){
        stopClicking();
        checkMatchedBlock(allFlipedBlocks[0],allFlipedBlocks[1]);
    }
}

function stopClicking(){
    blocksContainer.classList.add("no-clicking");
    setTimeout( ()=>{
        blocksContainer.classList.remove("no-clicking");
    },duration);
}

function checkMatchedBlock(firstBlock,secondBlock){
     let triesElement = document.querySelector(".tries span");
     if(firstBlock.dataset.technology == secondBlock.dataset.technology){
        firstBlock.classList.remove("is-flip");
        secondBlock.classList.remove("is-flip");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
     }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1 ; 
        setTimeout( ()=>{
            firstBlock.classList.remove("is-flip");
            secondBlock.classList.remove("is-flip");
        },duration);
     }
}

function shuffle(array){
    let current = array.length ;
    let random , temp ;
    while(current > 0){
       random = Math.floor(Math.random() * current);
       current-- ;
       temp = array[current];
       array[current] = array[random] ;
       array[random] = temp ;
    } 
    return array ;
}