// analog clock date
const hour = document.querySelector(".clock-hour");
const minute = document.querySelector(".clock-minutes");
const second = document.querySelector(".clock-seconds");

let clock = () =>{
    let date = new Date();
    let hours = date.getHours() * 30 ;
    let minutes = date.getMinutes() * 6 ;
    let seconds = date.getSeconds() * 6 ;
    hour.style.transform = `rotateZ(${hours + minutes / 12}deg)` ;
    minute.style.transform = `rotateZ(${minutes}deg)` ;
    second.style.transform = `rotateZ(${seconds}deg)` ;
}
setInterval(clock,1000);
// text date and time 
const txtHours = document.querySelector(".clock-txt-hours");
const txtMinutes = document.querySelector(".clock-txt-minutes");
const txtAm_Pm = document.querySelector(".clock-txt-ampm");
const dateDay = document.querySelector(".date-day");
const dateMonth = document.querySelector(".date-month");
const dateYear = document.querySelector(".date-year");

let clockTxt = () => {
    let date = new Date();
    let hours = date.getHours() ;
    let minutes = date.getMinutes() ;
    let Am_Pm = "" ;
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    // text time
    if(hours >= 12){
       hours = hours - 12 ;
       Am_Pm = "PM" ;
    }else{
        Am_Pm = "AM" ;
    }
    if(hours == 0){hours = 12};
    if(hours < 10){hours = `0${hours}`};
    txtHours.textContent = `${hours}:` ;
    txtMinutes.textContent = `${minutes}` ;
    txtAm_Pm.textContent = `${Am_Pm}` ;
    // text date
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dateDay.textContent = `${day}` ;
    dateMonth.textContent = `${months[month]}` ;
    dateYear.textContent = `${year}` ;
};
setInterval(clockTxt,1000);


// dark-light theme
const themeButton = document.querySelector('.clock-theme i');
const darkTheme = 'dark-theme'
const iconTheme = 'bxs-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light' ;
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bxs-moon' : 'bxs-sun' ;

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bxs-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})
