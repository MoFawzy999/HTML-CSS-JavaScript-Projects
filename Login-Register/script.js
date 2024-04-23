//register form
// elemnt selection 
const registerForm = document.querySelector(".register-form form") ,
fullnameInput = document.getElementById("fullname"),
emailInput = document.getElementById("reg-email"),
passwordInput = document.getElementById("reg-password"),
configPassInput = document.getElementById("config-password"),
passToggle = document.querySelector(".register-form .password i"),
configPassToggle = document.querySelector(".config-password i");
let users = [] ;

//Error handling function
const setError = (ele, msg) => {
    ele.classList.add("error");
    let errorMsg = ele.parentElement.lastElementChild;
    errorMsg.style.color = "red" ;
    errorMsg.innerText = msg ;
    return ;
};
const setSuccess = (ele) => {
    ele.classList.remove("error");
    let box = ele.parentElement.lastElementChild;
    box.innerText = "" ;
};

// inputs validation
const mailFormat = (e) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(String(e).toLowerCase());
};
const passFormat = (p) => {
      const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ig;
      return re.test(p);
}
const userFormat = (u) => {
      const re = /[^0-9]/;
      return re.test(u);
}
//toggle password visibilty
passToggle.addEventListener("click", () =>{
    if(passwordInput.type === "password"){
        passwordInput.type = "text" ;
        document.querySelector(".password i").className = " fa-solid fa-eye-slash";
    }else{
        passwordInput.type = "password" ;
        document.querySelector(".password i").className = "fa-solid fa-eye";
    }
});
configPassToggle.addEventListener("click", () =>{
    if(configPassInput.type === "password"){
        configPassInput.type = "text" ;
        document.querySelector(".config-password i").className = "fa-solid fa-eye-slash";
    }else{
        configPassInput.type = "password" ;
        document.querySelector(".config-password i").className = "fa-solid fa-eye";
    }
});


//form data handling 
let saveUser = (user,pass,passConf) =>{
    if(Object.keys(user).length > 2 && passConf == pass){
        users.push(user);
        localStorage.setItem("users",JSON.stringify(users));
    }
};

let handleFormData = () =>{

    let username = fullnameInput.value.trim();
    let mail = emailInput.value.trim();
    let pass = passwordInput.value.trim();
    let passConf = configPassInput.value.trim();

    let user = {} ;

    if (username === "") {
        setError(fullnameInput,"Full Name is required");
    } else if (!userFormat(username)) {
        setError(fullnameInput,"Please Enter your Full Name correctly");
    } else {
        setSuccess(fullnameInput);
        user.name = username ;
    }
    if (mail === "") {
        setError(emailInput,"Email is required");
    } else if (!mailFormat(mail)) {
        setError(emailInput,"Please Enter your E-mail correctly");
    } else {
        setSuccess(emailInput);
        user.email = mail ;
    }
    if (pass === "") {
        setError(passwordInput,"Password is required");
    } else if (!passFormat(pass)) {
        setError(passwordInput,"Password must be a minimum of 8 characters including number, Upper, Lower And one special character");
    } else {
        setSuccess(passwordInput);
        user.password = pass ; 
    }
    if (passConf === "") {
        setError(configPassInput,"Please confirm your password");
    } else if (passConf != pass) {
        setError(configPassInput,"Passwords does't match");
    } else {
        setSuccess(configPassInput);
        if(localStorage.getItem("users")){
            users = JSON.parse(localStorage.getItem("users"));
            if(users.some( (user) =>{
                return user.email == mail ;
            })){
                alert("User is already registered");
            }else{
                saveUser(user,pass,passConf);
            }
        }else{
            users = [] ;
            saveUser(user,pass,passConf);
        }
        document.querySelector(".register-form").style.display = "none" ;
        document.querySelector(".login-form").style.display = "block" ;
    }

   
};
//register form submission event handling
registerForm.addEventListener("submit", (e) =>{
    e.preventDefault();
    handleFormData();
});


// login form
// elemnt selection
const loginForm = document.querySelector(".login-form form") ,
emailLogin = document.getElementById("login-email"),
passwordLogin = document.getElementById("login-password") ,
passLoginToggle = document.querySelector(".login-form .password i") ;

passLoginToggle.addEventListener("click" , () =>{
    if(passwordLogin.type === "password"){
        passwordLogin.type = "text" ;
        document.querySelector(".login-form .password i").className = " fa-solid fa-eye-slash";
    }else{
        passwordLogin.type = "password" ;
        document.querySelector(".login-form .password i").className = " fa-solid fa-eye";
    }
});

let handleLogin = () =>{
    
    let email = emailLogin.value.trim() ;
    let password = passwordLogin.value.trim();

    if(email == ""){
       setError(emailLogin,"Email is required");
    }else{
        setSuccess(emailLogin);
    }

    if(password == ""){
        setError(passwordLogin,"Password is required");
    }else{
        setSuccess(passwordLogin);
        if(localStorage.getItem("users")){
            users = JSON.parse(localStorage.getItem("users"));
            if(users.some( (user) =>{
                 return user.email == email && user.password == password ;
            })){
                 alert("Login is Succesfull");
            }else{
                 alert("User is not registered yet");
            }
         }else{
              alert("User is not registered yet");
         }
    }

};

loginForm.addEventListener("submit",(e) =>{
    e.preventDefault();
    handleLogin();
});


// signIn & signUp
let signIn = document.querySelector(".sign-in");
let signUP = document.querySelector(".sign-up");

signIn.addEventListener("click",() =>{
    document.querySelector(".register-form").style.display = "none" ;
    document.querySelector(".login-form").style.display = "block" ;
});
signUP.addEventListener("click" , () =>{
    document.querySelector(".login-form").style.display = "none" ;
    document.querySelector(".register-form").style.display = "block" ;
});