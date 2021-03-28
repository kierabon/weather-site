function getDate () {
let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()]; 
let time= document.querySelector("#date");
time.innerHTML =`${day} ${month} ${date}, ${year} ${hours}:${minutes}`;
}

function showWeather(response) {
  let temperatureNow = document.querySelector("#temperature");
  let tempNow = Math.round(response.data.main.temp);
  let city = response.data.name;
  let cityNow = document.querySelector("#city");
  let humid = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  let windSpeed = response.data.wind.speed;
  let descriptionList = document.querySelector("#description");
  let {description, icon} = response.data.weather[0];
  let iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  let iconImg = document.querySelector("#icon")
  descriptionList.innerHTML = `${description}`;
  wind.innerHTML = `Wind Speed: ${windSpeed}m/s`;
  humid.innerHTML = `Humidity: ${humidity}%`;
  cityNow.innerHTML = `${city}`;
  temperatureNow.innerHTML = `${tempNow}`; 
iconImg.src = iconUrl;

}

function convertToFahrenheit(event) {
  event.preventDefault();
   let searchInput = document.querySelector("#search-input");
  let citySearch = searchInput.value;
  let apiKey = "39a4dba5764c859c9c8cade7545d15da";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`;
  fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let { temp } = data.main;
          
          let temperatureElement = document.querySelector("#temperature");
          let fahrenheit = (`${temp}` * 9) / 5 + 32;
          temperatureElement.innerHTML = Math.round(fahrenheit);
          
        });
      }

function convertToCelsius(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let citySearch = searchInput.value;
  let apiKey = "39a4dba5764c859c9c8cade7545d15da";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`;
fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let { temp } =data.main;
          let temperatureElement = document.querySelector("#temperature");
          temperatureElement.innerHTML = Math.round(temp);

        });
    

}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function weatherLocation(position) {
  let apiKey = "39a4dba5764c859c9c8cade7545d15da";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(weatherLocation);
}

function getCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#city");
  let citySearch = searchInput.value;
  let apiKey = "39a4dba5764c859c9c8cade7545d15da";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`;
  city.innerHTML = `${citySearch}`;
  axios.get(url).then(showWeather);
}

getDate();
let button = document.querySelector("#location-button");
let search =document.querySelector("#search-box");

search.addEventListener("submit", getCitySearch);
button.addEventListener("click",getCurrentPosition);
