let now = new Date();
let datetimeElement = document.querySelector("#datetime");
let hours = now.getHours();
let minutes = now.getMinutes();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

datetimeElement.innerHTML = `${day}, ${hours}:${minutes}`;

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#realfeel").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#forecast").innerHTML = response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function retrieveLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToC(event) {
  event.preventDefault();

  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = 17;
}
let celLink = document.querySelector("#cel-link");
celLink.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  let currentTempElement = document.querySelector("#current-temp");
  currentTempElement.innerHTML = 17 * 1.8 + 32;
}
let fahrLink = document.querySelector("#fahr-link");
fahrLink.addEventListener("click", convertToF);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let retrieveLocationButton = document.querySelector("#current-location-button");
retrieveLocationButton.addEventListener("click", retrieveLocation);

searchCity("Paris");
