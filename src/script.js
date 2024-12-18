function updateDateTime(now) {
  let test = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let currentHour = now.getHours();
  let currentMinutes = now.getMinutes();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  return `${day} ${currentHour}:${currentMinutes}`;
}

function updateWeather(response) {
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.condition.description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  let realFeelElement = document.querySelector("#real-feel-temperature");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let currentTimeElement = document.querySelector("#day-and-time");
  let apiTimeStamp = response.data.time;
  let now = new Date(apiTimeStamp * 1000);

  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = description;
  realFeelElement.innerHTML = `Feels like : ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  humidityElement.innerHTML = `Humidity : ${response.data.temperature.humidity}%`;
  windspeedElement.innerHTML = `Windspeed : ${Math.round(
    response.data.wind.speed
  )} km/h`;
  
  currentTimeElement.innerHTML = updateDateTime(now);
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
