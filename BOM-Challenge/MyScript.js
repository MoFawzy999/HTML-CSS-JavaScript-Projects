let add = document.querySelector(".add");
let txt = document.querySelector(".input");
let results = document.querySelector(".tasks");
let arrTasks = [] ;

    if(window.localStorage.getItem("tasks")){
        arrTasks = JSON.parse(window.localStorage.getItem("tasks"));
        arrTasks.forEach( e => {
            addElementsToPage(e.title,e.id);
        });
    }

    add.onclick = () => {
       if(txt.value != ""){
        addTaskToArray(txt.value,Math.random());
        txt.value = "";
        let item ;
        for(let i=0 ; i < arrTasks.length ; i++){
             item = arrTasks[i]
        }
        addElementsToPage(item.title,item.id);
       }
    };

    function addTaskToArray(value,iD){
        let obj = {id:iD,title:value};
        arrTasks.push(obj);
        window.localStorage.setItem("tasks", JSON.stringify(arrTasks));
    }

    function deleteTaskFromLocalStorage(iD){
        arrTasks = arrTasks.filter( (e) =>{
            return e.id !==  iD ;
        });
        localStorage.setItem("tasks",JSON.stringify(arrTasks));
    }

    function addElementsToPage(title,id){
            let task = document.createElement("div");
            task.style.cssText = "display:flex;justify-content:space-between;padding:10px 15px;border-radius:4px;width:400px;background-color:white;margin: 10px auto";
            task.appendChild(document.createTextNode(title));
            let del = document.createElement("button");
            del.textContent = "Delete" ;
            del.style.cssText = "position:relative;right:0;padding:10px 10px;background-color:orangered;color:white;border-radius:4px;border:none;";
            del.onclick = function(){
               task.remove();
               deleteTaskFromLocalStorage(id);
            }
            task.append(del);
            results.appendChild(task);
    }

    
