let words = ["Hello",
"Programming",
"Code",
"Javascript",
"Town",
"Country",
"Testing",
"Youtube",
"Linkedin",
"Twitter",
"Github",
"Leetcode",
"Internet",
"Python",
"Scala",
"Destructuring",
"Paradigm",
"Styling",
"Cascade",
"Documentation",
"Coding",
"Funny",
"Working",
"Dependencies",
"Task",
"Runner",
"Roles",
"Test",
"Rust",
"Playing"] ;

//settings level
const lvls = {
    "Easy" : 5 ,
    "Normal" : 4 ,
    "Hard" : 3
};
//Deafult level 
let startBtn = document.querySelector(".start");
let txtInput = document.querySelector(".input");
let seconds = document.querySelector(".message .seconds") ;
let timeLeftSpan = document.querySelector(".time span");
let scoreTotal = document.querySelector(".score .total");
let lvlSelect = document.querySelector(".message .lvl") ; 

//Disable past event 
txtInput.onpaste = () => false ;
getLevel();
lvlSelect.onchange = function(){
    getLevel();
}
startBtn.onclick = function(){
    let upcomingWords = document.querySelector(".upcoming-words");
    let word = document.querySelector(".the-word");
    this.remove();
    txtInput.focus();
    // Generate word function 
    generateWords(upcomingWords,word,getLevel());
}
// score history
let scoreHistoryElement =  document.querySelector(".prev-score .history");
console.log(scoreHistoryElement);
let scoreData = [] ;
if(localStorage.getItem("data")){
   scoreData = JSON.parse(localStorage.getItem("data"));
   scoreData.forEach(element => {
       addScoreHistory(element,scoreHistoryElement);
   });
}
let clearBtn = document.querySelector(".prev-score .clear-history");
clearBtn.addEventListener("click", () =>{
    scoreHistoryElement.remove();
    localStorage.removeItem("data");
});
// functions =====================================================================
function getLevel(){
    if(lvlSelect.value == "Easy"){
        seconds.textContent = lvls["Easy"] ;
        timeLeftSpan.textContent = lvls["Easy"] ;
        let easyWords = words.filter((word) =>{ return word.length <= 6});
        scoreTotal.textContent = easyWords.length ;
        return easyWords ;
    }else if(lvlSelect.value == "Normal"){
        seconds.textContent = lvls["Normal"] ;
        timeLeftSpan.textContent = lvls["Normal"] ;
        let normalWords = words.filter((word) =>{return word.length <= 9});
        scoreTotal.textContent = normalWords.length ;
        return normalWords ;
    }else{
        seconds.textContent = lvls["Hard"] ;
        timeLeftSpan.textContent = lvls["Hard"] ;
        let hardWords = words.filter((word) =>{return word.length > 6});
        scoreTotal.textContent = hardWords.length ;
        return hardWords ;
    }
}

function generateWords(upcomingWords,word,words){
    // get random word from array 
    let randomWord = words[Math.floor(Math.random() * words.length)];
    let wordIndex = words.indexOf(randomWord);
    words.splice(wordIndex,1);
    word.textContent = randomWord ;
    //Upcoming word 
    getUpComingWords(upcomingWords,words);
    startPlay(upcomingWords,word,words);
}

function getUpComingWords(upcomingWords,words){
    upcomingWords.innerHTML = "" ;
    for(let i = 0 ; i < words.length ; i++){
         let div = document.createElement("div");
         let txt = document.createTextNode(words[i]);
         div.appendChild(txt);
         upcomingWords.append(div);
    }
}

function startPlay(upcomingWords,word,words){
    let scoreGot = document.querySelector(".score .got");
    timeLeftSpan.textContent = seconds.textContent ;
    selectedLevel();
    let start = setInterval(()=>{
         timeLeftSpan.textContent-- ;
         if(timeLeftSpan.textContent == 0){
            clearInterval(start);
            if(word.textContent.toLowerCase() === txtInput.value.toLowerCase()){
                 txtInput.value = "" ;
                 scoreGot.textContent++ ;
                 if(words.length > 0){
                    generateWords(upcomingWords,word,words);
                 }else{
                    finishGame("Win");
                    upcomingWords.remove();
                    addScoreToStorage("Win",scoreGot.textContent,scoreData);
                 }
            }else{
                finishGame("Lose") ;
                addScoreToStorage("Lose",scoreGot.textContent,scoreData);
            }
         }
    },1000);
}
function selectedLevel(){
    let lvlName = document.querySelector(".message .lvl + div");
    lvlSelect.classList.add("none");
    lvlName.style.display = "inline-block";
    lvlName.textContent = lvlSelect.value ;
}
function finishGame(gameState){
    let finishMessage = document.querySelector(".finish");
    if(gameState == "Win"){
        let span = document.createElement("span");
        span.className = "good" ;
        let spanNode = document.createTextNode("Congratulation");
        span.appendChild(spanNode);
        finishMessage.appendChild(span);
    }else if(gameState == "Lose"){
        let span = document.createElement("span");
        span.className = "bad" ;
        let spanNode = document.createTextNode("Game Over");
        span.appendChild(spanNode);
        finishMessage.appendChild(span);
    }
}
function addScoreToStorage(status,number,arr){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    let days = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let dateNow = `${days}-${month}-${year} ${hours}:${minutes}` ;
    let finalScore = {"date":dateNow ,"status" : status , "score" : number } ;
    arr.push(finalScore);
    localStorage.setItem("data",JSON.stringify(arr));
}

function addScoreHistory({date,score,status},scoreHistoryElement){
    let div = document.createElement("div");
    let textNode = document.createTextNode(`Date: ${date} \u00A0 Status: ${status} \u00A0 Score: ${score}`);
    div.appendChild(textNode);
    scoreHistoryElement.appendChild(div);
}

