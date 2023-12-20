// open likes list
let heartIcon = document.querySelector(".heart-icon");
let activityContainer = document.querySelector(".activity-container");
heartIcon.addEventListener("click",() =>{
      activityContainer.classList.toggle("hide");
      heartIcon.classList.toggle("bxs-heart")
});
function likePost(post){
    let likeBtn = post.querySelector(".like-icon"); 
    let likeImg = post.querySelector(".post-overlays");
    let likeCount = post.querySelector(".likes span");
    let shareWindow = post.querySelector(".share-window");
    likeBtn.addEventListener("click",() =>{
         likeBtn.classList.toggle("bxs-heart");
         likeImg.classList.add("show");
         likeCount.innerHTML = parseInt(likeCount.innerHTML) + 1;
         setTimeout( () =>{
            likeImg.classList.remove("show");
         },2000)
          if(!likeBtn.classList.contains("bxs-heart")){
                likeImg.classList.remove("show");
                likeCount.innerHTML = parseInt(likeCount.innerHTML) - 2;
          }
          if(likeImg.classList.contains("show")){
            shareWindow.classList.remove("active");
          }
    });
}
function sharePost(post){
    let shareBtn = post.querySelector(".share-icon");
    let shareWindow = post.querySelector(".share-window");
    shareBtn.addEventListener("click",() =>{
        shareWindow.classList.toggle("active");
    });
    let postLink = post.querySelector(".share-window .share-link-container input").placeholder;
    let copyBtn = post.querySelector(".share-window .share-link-container button");
    copyBtn.addEventListener("click", () =>{
         navigator.clipboard.writeText(postLink).then(() =>{
             shareBtn.click();
         });
    });
}
function addComment(post){
    let commentInput = post.querySelector(".comment-box .comment-input");
    let addComment = post.querySelector(".comment-box .add-comment-btn");
    let commentsContainer = post.querySelector(".comments-container");
    let commentCount = post.querySelector(".comment-count span");
    addComment.addEventListener("click", () =>{
    if(!commentInput.value){
        return ;
    }
     let comment = createComment(commentInput.value);
     let newNode = document.createElement("div");
     newNode.innerHTML = comment; 
     commentsContainer.appendChild(newNode);
     commentCount.innerHTML = parseInt(commentCount.innerHTML)+1 ;
     commentInput.value = "" ;
     removeComment(commentsContainer,commentCount);
     addLikeToComment(commentsContainer);
});
}
function createComment(comment){
    return `<div class="comments">
             <img src="images/user1.png" alt="">
             <p class="comment-content">${comment}</p>
             <div>
             <i class="bx bx-heart like-comment"></i>
             <i class="bx bxs-trash-alt delete-comment"></i>
             </div>
            </div>
           `
}
function removeComment(commentsContainer,commentCount){
    let commentDelete = commentsContainer.querySelectorAll(".delete-comment");
    commentDelete.forEach((el) =>{
     el.addEventListener("click",(e) => {
         e.currentTarget.parentElement.parentElement.remove();
         let comments =  [...commentsContainer.querySelectorAll(".comments")];
         commentCount.innerHTML = comments.length ;
     });
    }); 
}
function addLikeToComment(commentsContainer){
    let commentLike = commentsContainer.querySelectorAll(".like-comment");
    commentLike.forEach( (like) =>{
       like.onclick = function(){
            this.classList.toggle("bxs-heart");
            this.classList.toggle("red");
       };
    });
}
//posts settings in main section
function addIntersectionPost(post){
    //post like
    likePost(post);
    // post share
    sharePost(post);
    // comment
    addComment(post);
}

function createPost(postDesc,imgUrl){
    return `<div class="post">
              <div class="post-header">
              <img src="images/user1.png" alt="">
              <p class="username">@MoFawzy</p>
              </div>
              <div class="post-feed">
                 <div class="post-overlays">
                    <img src="images/icon/red-heart.png" alt="">
                 </div>
                 <div class="share-window">
                 <h1>Share the post with other</h1>
                 <div class="share-link-container">
                   <input type="text" placeholder="https://www.SocialApp.com/user/posts/45@cdr" disabled>
                   <button>Copy</button>
                  </div>
               </div>
               <div class="post-img-container">
                 <img src=${imgUrl} alt="">
               </div>
               </div>
               <div class="post-details">
                <div class="details">
                 <i class='bx bx-heart like-icon'></i>
                 <i class='bx bx-share share-icon'></i>
                 <span class="likes"><span>0</span> likes</span>
               </div>
                 <p class="post-desc">${postDesc}</p>
                 <div class="comments-container">
               </div>
               <div class="comment-box">
                 <input type="text" placeholder="Add a comment" class="comment-input">
                 <button class="add-comment-btn"><i class='bx bx-message-rounded-dots comment-icon'></i></button>
                 <span class="comment-count"><span>0</span> comment</span>
               </div>
              </div>
             </div>`
}
function createPostWithoutImg(postDesc){
    return `<div class="post">
    <div class="post-header">
    <img src="images/user1.png" alt="">
    <p class="username">@MoFawzy</p>
    </div>
    <div class="post-feed">
       <div class="post-overlays">
          <img src="images/icon/red-heart.png" alt="">
       </div>
       <div class="share-window">
       <h1>Share the post with other</h1>
       <div class="share-link-container">
         <input type="text" placeholder="https://www.SocialApp.com/user/posts/45@cdr" disabled>
         <button>Copy</button>
        </div>
     </div>
     </div>
     <div class="post-details">
      <div class="details">
       <i class='bx bx-heart like-icon'></i>
       <i class='bx bx-share share-icon'></i>
       <span class="likes"><span>0</span> likes</span>
     </div>
       <p class="post-desc">${postDesc}</p>
       <div class="comments-container">
     </div>
     <div class="comment-box">
       <input type="text" placeholder="Add a comment" class="comment-input">
       <button class="add-comment-btn"><i class='bx bx-message-rounded-dots comment-icon'></i></button>
       <span class="comment-count"><span>0</span> comment</span>
     </div>
    </div>
   </div>`
}
// add a post 
let postInput = document.querySelector(".post-content")
let postIcon = document.querySelector(".post-icon");
let postCrt = document.querySelector(".create-post");
let mediaBtn = document.querySelector(".add-media");
let postBtn = document.querySelector(".posting");
let postContainer = document.querySelector(".post-container");
let chooseMedia = document.querySelector(".choose-media");
let postImg = document.querySelector(".post-img-container img");
postIcon.addEventListener("click", () =>{
    postIcon.classList.toggle("bxs-plus-circle");
    postCrt.classList.toggle("hide");
});
let selectMedia = chooseMedia.onchange = () =>{
        let postImgUrl =  URL.createObjectURL(chooseMedia.files[0]);
        return postImgUrl ;
};
postBtn.onclick =  () =>{
    if(!postInput.value){
        return ;
    }
    let newNode = document.createElement("div");
    newNode.innerHTML = createPost(postInput.value,selectMedia());
    postContainer.prepend(newNode);
    addIntersectionPost(newNode);
    postInput.value = "" ;
};

let posts = document.querySelectorAll(".post");
posts.forEach( (post) => addIntersectionPost(post));