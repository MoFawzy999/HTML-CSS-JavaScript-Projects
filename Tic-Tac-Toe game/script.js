let turn = 'x' ;
let title = document.querySelector(".title");
let squares = [] ;

function winner(){
     for(let i = 1 ; i < 10 ; i++){
        squares[i] = document.getElementById(`item${i}`).innerHTML;
     }
     if(squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != ""){
          end(1,2,3);
     }else if(squares[4] == squares[5] && squares[5] == squares[6] && squares[4] != ""){
        end(4,5,6);
     }else if(squares[7] == squares[8] && squares[8] == squares[9] && squares[7] != ""){
        end(7,8,9);
     }else if(squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != ""){
        end(1,4,7);
     }else if(squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != ""){
        end(2,5,8);
     }else if(squares[3] == squares[6] && squares[6] == squares[9] && squares[3] != ""){
        end(3,6,9);
     }else if(squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != ""){
        end(1,5,9);
     }else if(squares[3] == squares[5] && squares[5] == squares[7] && squares[3] != ""){
        end(3,5,7);
     }
}

function end(num1,num2,num3){
    title.innerHTML = `${squares[num1]} Winner` ;
    document.getElementById(`item${num1}`).style.backgroundColor = "#000";
    document.getElementById(`item${num2}`).style.backgroundColor = "#000";
    document.getElementById(`item${num3}`).style.backgroundColor = "#000";
    setInterval(() => {
        title.innerHTML += '..' ;
    }, 1000);
    setTimeout(()=>{
        location.reload();
    },4000);
}
function game(id){
    let element = document.getElementById(id);
    if(turn === 'x' && element.innerHTML == "" ){
         element.innerHTML = 'X' ;
         turn = 'o' ;
         title.innerHTML = 'O';
    }else if(turn === 'o' && element.innerHTML == ""){
        element.innerHTML = 'O' ;
        turn = 'x' ;
        title.innerHTML = 'X' ;
    }
    winner();
}