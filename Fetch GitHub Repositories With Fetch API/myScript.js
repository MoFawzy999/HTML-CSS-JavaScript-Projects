let theInput = document.querySelector(".get-repos input");
let getBtn = document.querySelector(".get-repos span");
let reposData = document.querySelector(".show-data");

getBtn.onclick = function(){
    getRepos();
}

function getRepos(){
     if(theInput.value == ""){
         reposData.innerHTML = "<span>Please write Github Username</span>";
     }else{
         fetchRepos(`https://api.github.com/users/${theInput.value}/repos`);
     }
}

function fetchRepos(api){
    fetch(api).then( (response) => response.json())
    .then((data) =>{
       reposData.innerHTML = "" ;
       data.forEach( (repo) => {
           let mainDiv = document.createElement("div");

           let headName = document.createElement("h3");
           let repoName = document.createTextNode(repo.name);
           headName.appendChild(repoName);
           
           let link = document.createElement("a");
           let repoUrl = document.createTextNode("Visit");
           // link.href = `https://github.com/MoFawzy999/${repo.name}`
           link.href = repo['html_url'] ;
           link.setAttribute("target","_blank");
           link.appendChild(repoUrl);

           let starsSpan = document.createElement("span");
           let repoStars = document.createTextNode(`Stars:${repo['stargazers_count']}`);
           starsSpan.appendChild(repoStars);

           let desc = document.createElement("p");
           let descRepo = document.createTextNode(`Description:${repo['description']}`);
           desc.appendChild(descRepo);
           
           mainDiv.appendChild(headName);
           mainDiv.appendChild(starsSpan);
           mainDiv.appendChild(desc);
           mainDiv.appendChild(link);
           mainDiv.classList.add("repos-box");
           reposData.appendChild(mainDiv);
       });
    })
}