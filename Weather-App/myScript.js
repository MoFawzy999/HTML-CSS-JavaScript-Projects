let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");
let weatherCarts = document.querySelector(".days");
let currentWeather = document.querySelector(".current-weather");
let locationBtn = document.querySelector(".curr-location-btn");
const API_KEY = 'c1a0476ac7f8d5637a7c5d6b639ecfb4';

searchBtn.addEventListener("click",getCityCoordinates);
locationBtn.addEventListener("click",getUserLocation);
searchInput.addEventListener("keyup", e => e.key == "Enter" && getCityCoordinates());

function getUserLocation(){
    navigator.geolocation.getCurrentPosition( (position) =>{
         let {latitude,longitude} = position.coords ;
         //console.log(position.coords);
         // to get the name of city through longitude and latitiude
         let reverse_API = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
         fetch(reverse_API).then( result => result.json()).then( (data) =>{
             let {name} = data[0];
             getWeatherDetails(name,latitude,longitude);
         });
    },(error) =>{
         if(error.code === error.PERMISSION_DENIED){
            alert("GeoLocation request denied");
         }
    }
    );
}
function  getCityCoordinates(){
    let cityName = searchInput.value.trim();
     if(!cityName){
        return ;
     }
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
    .then( result => result.json())
    .then((data) =>{
        if(!data.length){
          alert(`No Data found for this ${cityName}`); 
        }
        let {name,lat,lon} = data[0] ;
        getWeatherDetails(name,lat,lon);
        //console.log(data[0]);
     }).catch(() =>{
        alert("Error while fetching the weather coordinates!");
     });
}
function getWeatherDetails(city,longitude,latitude){
       fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
       .then( result => result.json())
       .then( data => {
        // filter forecats to get one forecast per day ;
        let uniqueForecastsDays = [];
           let fiveDaysForecasts = data.list.filter((forecast) =>{
                let forecastDate = new Date(forecast.dt_txt).getDate();
                if(!uniqueForecastsDays.includes(forecastDate)){
                    return uniqueForecastsDays.push(forecastDate);
                }
           });
           searchInput.value = "" ;
           currentWeather.innerHTML = "" ;
           weatherCarts.innerHTML = "";
           //console.log(data);
           //console.log(fiveDaysForecasts);
           fiveDaysForecasts.forEach( (weatherItem,index) => {
              if(index == 0){
                currentWeather.innerHTML = createWeatherCart(city,weatherItem,index);
              }else{
                let newNode = document.createElement("div");
                newNode.innerHTML = createWeatherCart(city,weatherItem,index);
                weatherCarts.appendChild(newNode);
              }
           });
       }).catch(() =>{
        alert("Error while fetching the weather forecast!");
     });
}
function createWeatherCart(city,weatherItem,index){
    if(index === 0){
        return ` 
                  <div class="details">
                  <h2>${city} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                  <h4>Temperature: ${Math.trunc(weatherItem.main.temp - 273.15)} °C</h4>
                  <h4>Wind: ${Math.trunc(weatherItem.wind.speed * 3.6)} km/h</h4>
                  <h4>Humidity: ${weatherItem.main.humidity} %</h4>
                  </div>
                <div class="icon">
                  <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                  <h4>Moderate Rain</h4>
                </div>
                `
    }else{
        return `
        <div class="day">
           <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
           <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
           <h4>Temperature: ${Math.trunc(weatherItem.main.temp - 273.15)} °C</h4>
           <h4>Wind: ${Math.trunc(weatherItem.wind.speed * 3.6)} km/h</h4>
           <h4>Humidity: ${weatherItem.main.humidity} %</h4>
         </div> 
          `
    }
}


