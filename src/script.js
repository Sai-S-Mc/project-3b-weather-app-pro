function formatForecastDay(timestamp) {
  let then = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", ];
  let day = days[then.getDay()];
  return day;
}

function addForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="forecast-weather-day">
      <div class="forecast-weather-day-name">${formatForecastDay(
        day.time
      )}</div>
      <img src = "${day.condition.icon_url}" class="forecast-weather-icon"/>
      <div class="forecast-weather-temperatures">
      <div class="forecast-weather-temperature-high">${Math.round(
        day.temperature.maximum
      )}°</div>
      <div class="forecast-weather-temperature-low">${Math.round(
        day.temperature.minimum
      )}°</div>
      </div>
      </div>`;
    }
  });

  let forecastContainerElement = document.querySelector("#forecast-weather-container");
  forecastContainerElement.innerHTML = forecastHtml;
}

function apiForecastSearch(city) {
  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(addForecast);
}

function updateDateTime(now) {
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

function updateQuote(temp) {
  if (temp <= 10) {
    return `" <em>Keep warm</em> ♨️🧦"`;
  } else if (temp > 10 && temp < 20) {
    return `" <em>Tad bit chilly</em> 🍃🧥"`;
  } else if (temp >= 20 && temp <= 30) {
    return `" <em>Enjoy the warm weather</em> 🌦️☀️"`;
  } else {
    return `" <em>Remember to stay hydrated</em> 💧🕶️"`;
  }
}

function updateWeatherDetails(response) {
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
  let icon = document.querySelector("#current-temp-icon");
  let weatherQuote = document.querySelector("#quote");
  let apiTimeStamp = response.data.time;
  let now = new Date(apiTimeStamp * 1000);

  cityElement.innerHTML = response.data.city;
  countryElement.innerHTML = response.data.country;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = description;
  realFeelElement.innerHTML = `Feels like : <strong>${Math.round(
    response.data.temperature.feels_like
  )}°C</strong>`;
  humidityElement.innerHTML = `Humidity : <strong>${response.data.temperature.humidity}%</strong>`;
  windspeedElement.innerHTML = `Windspeed : <strong>${Math.round(
    response.data.wind.speed
  )} km/h</strong>`;
  icon.innerHTML = `<img src = "${response.data.condition.icon_url}" class="current-temp-icon" />`;

  weatherQuote.innerHTML = updateQuote(temperatureElement.innerHTML);

  currentTimeElement.innerHTML = updateDateTime(now);

  apiForecastSearch(response.data.city);
}

function apiCitySearch(city) {
  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeatherDetails);
}

function handleSearch(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-form-input").value;

  apiCitySearch(userInput);
}

function updateHeading() {
  let timeNow = new Date();
  let currentHour = timeNow.getHours();
  let headingElement = document.querySelector("#heading");

  if (currentHour >= 5 && currentHour < 12) {
    headingElement.innerHTML = "Good Morning🌅!";
  } else if (currentHour >= 12 && currentHour < 17) {
    headingElement.innerHTML = "Good Afternoon🌞!";
  } else if (currentHour >= 17 && currentHour < 21) {
    headingElement.innerHTML = "Good Evening🌆!";
  } else{
    headingElement.innerHTML = "Good Night🌛!";
  }
} 

updateHeading();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

apiCitySearch("Toronto");