//settings
let gameName = "Guess The Word" ;
document.title = gameName ; 
document.querySelector("h1").innerHTML = gameName ;
document.querySelector("footer").innerHTML = `${gameName} Game Created by Zero web school`;
//game options
let numberOfTries = 6 ;
let numberOfLetters = 6 ;
let currentTry = 1 ;
let numberOfHints = 2 ;
// manage words
let wordToGuess = "" ; 
let words = ["Create" , "Update" , "Delete" , "Master" , "Branch" , "Mainly" , "ELZero" , "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
console.log(wordToGuess);
//manage hints 
document.querySelector(".hint span").innerHTML = numberOfHints ;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click",getHint);

let messageArea = document.querySelector(".message");

const guessButton = document.querySelector(".control .check");
guessButton.addEventListener("click" , handleWord);
window.onload = function (){
    generateInputs();
};
//=========================================================================

function getHint(){
    if(numberOfHints > 0){
       numberOfHints-- ;
       document.querySelector(".hint span").innerHTML = numberOfHints ;
    } 
    if(numberOfHints === 0){
      getHintButton.disabled = true ;
    }

    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnabledInputs = Array.from(enabledInputs).filter( (input) => input.value === "");
    
    if(emptyEnabledInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        if(indexToFill !== -1){
           randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }
}

function generateInputs(){
    const inputsContainer = document.querySelector(".inputs");
    // create tries
    for(let i = 1 ; i <= numberOfTries ; i++){
       const tryDiv = document.createElement("div");
       tryDiv.classList.add(`try-${i}`);
       tryDiv.innerHTML = `<span>Try ${i}</span>`;
       if( i !== 1){
          tryDiv.classList.add("disabled-inputs");
       }
       // create inputs
       for(let j = 1 ; j <= numberOfLetters ; j++ ){
           const letterInput = document.createElement("input");
           letterInput.type = "text" ;
           letterInput.id = `guess-${i}-letter-${j}`;
           letterInput.setAttribute("maxlength","1");
           tryDiv.appendChild(letterInput);
       }
       inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    const inputsDisabled = document.querySelectorAll(".disabled-inputs input");
    inputsDisabled.forEach( (input) =>{ input.disabled = true });

    handleInputActions();
}

function handleInputActions(){
    const inputs = document.querySelectorAll("input");
    inputs.forEach( (input,index) =>{
        input.addEventListener("input" , function(){
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index+1];
            if(nextInput) nextInput.focus();    
        });
        input.addEventListener("keydown" , function(event){
           //const currentIndex = Array.from(inputs).indexOf(event.target);
           if(event.key === "ArrowRight"){
              const nextIndex = index + 1;
              if(nextIndex < inputs.length) inputs[nextIndex].focus();
           }
           if(event.key === "ArrowLeft"){
              const prevIndex = index - 1 ;
              if(prevIndex >= 0) inputs[prevIndex].focus();
           }
           if(event.key === "Backspace"){
              const prevIndex = index - 1 ;
              if(prevIndex >= 0){
                inputs[index].value = "" ;
                inputs[prevIndex].value = "" ;
                inputs[prevIndex].focus();
              } 
           }
        });
    }); 
}

function handleWord(){
    let successGuess = true ;
    for(let i = 1 ; i <= numberOfLetters ; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];
        if(letter === actualLetter){
            inputField.classList.add("in-place");
        }else if (wordToGuess.includes(letter) && letter !== ""){
            inputField.classList.add("not-in-place");
            successGuess = false ;
        }else{
            inputField.classList.add("no-correct");
            successGuess = false ;
        }
    }
    // check user lose or win
    chechSuccess(successGuess);
}

function chechSuccess(successOption){
    if(successOption){
        messageArea.innerHTML = `You win the word is <span>${wordToGuess}</span>`;
        const allTries = document.querySelectorAll(".inputs > div");
        allTries.forEach((tryDiv) =>{tryDiv.classList.add("disabled-inputs")});
        document.querySelector(".control .check").disabled = true;
    }else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach( (input) =>{ input.disabled = true });
        currentTry++ ;
        let nextTry = document.querySelector(`.try-${currentTry}`);
        if(nextTry){
            nextTry.classList.remove("disabled-inputs");
            const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
            nextTryInputs.forEach((input) =>{input.disabled = false });
            nextTry.children[1].focus();
        }else{
            document.querySelector(".control .check").disabled = true;
            getHintButton.disabled = true ;
            messageArea.innerHTML = `You Loose the word is <span>${wordToGuess}</span>`;
        }
    }
}

