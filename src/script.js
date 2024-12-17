function updateWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let realFeelElement = document.querySelector("#real-feel-temperature");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");

  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  realFeelElement.innerHTML = `feels like : ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  humidityElement.innerHTML = `humidity : ${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `windspeed : ${Math.round(
    response.data.wind.speed
  )} km/h`;
}
function apiCitySearch(city) {
  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-form-input").value;

  apiCitySearch(userInput);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

apiCitySearch("Toronto");
