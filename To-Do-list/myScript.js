(function (){
    let input = document.querySelector(".input");
    let submit = document.querySelector(".add");
    let tasksDiv = document.querySelector(".tasks");
    let arrayOfTasks = [] ;

    if(window.localStorage.getItem("data")){
        arrayOfTasks = JSON.parse(window.localStorage.getItem("data"));   
    }
    getDataFromLocalStorage();
    //add task
    submit.onclick = () =>{
       if(input.value !== ""){
          addTask(input.value);
          input.value = "" ;
       }
    };
    //click on task elemnt
    tasksDiv.addEventListener("click" , (e) =>{
        // delete elemnt
       if(e.target.classList.contains("del")){
          deleteTask(e.target.parentElement.getAttribute("data-id"));
          e.target.parentElement.remove();
       }
       // task elemnt
       if(e.target.classList.contains("task")){
           toggleTaskStatus(e.target.getAttribute("data-id"));
           e.target.classList.toggle("done");
       }
    });

    function addTask(taskTxt){
        const task = {id:Date.now() 
            ,title:taskTxt
            ,completed:false};
        arrayOfTasks.push(task);
        addElement(arrayOfTasks);
        addTasksToLocalStorage(arrayOfTasks);
    }
    function addElement(arrayOfTasks){
        tasksDiv.innerHTML = "" ;
        arrayOfTasks.forEach( (task) => {
           let div = document.createElement("div");
           div.className = "task" ;
           if(task.completed){
            div.className = "task done" ;
           }
           div.setAttribute("data-id",task.id) ;
           div.appendChild(document.createTextNode(task.title));
           let del = document.createElement("span");
           del.className = "del";
           del.appendChild(document.createTextNode("Delete"));
           div.appendChild(del); 
           tasksDiv.appendChild(div);
        });
    }
    function  addTasksToLocalStorage(arrayOfTasks){
        window.localStorage.setItem("data",JSON.stringify(arrayOfTasks));
    }
    
    function getDataFromLocalStorage(){
        let data = window.localStorage.getItem("data");
        if(data){
           let tasks = JSON.parse(data);
           addElement(tasks);
        }
    }
    function deleteTask(taskID){
        arrayOfTasks = arrayOfTasks.filter( (task) =>{
             return task.id != taskID ;
        });
        addTasksToLocalStorage(arrayOfTasks);
    }
    function toggleTaskStatus(taskId) {
        for (let i = 0; i < arrayOfTasks.length; i++) {
          if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
          }
        }
        addTasksToLocalStorage(arrayOfTasks);
      }
})();

