function formatForecastDay(timestamp) {
  let then = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[then.getDay()];
  return day;
}

function formatToday(today){
  let now = new Date(today*1000);
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[now.getDay()];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[now.getMonth()];
  let date = now.getDate();
  return `${day}, ${month} ${date}`;
}

function addForecast(response) {
  let today = document.querySelector("#date");
  let highTodayElement = document.querySelector("#high-today");
  let lowTodayElement = document.querySelector("#low-today");

  today.innerHTML = formatToday(response.data.daily[0].time);
  highTodayElement.innerHTML = `Today's high: ${Math.round(
    response.data.daily[0].temperature.maximum
  )}°`;
  lowTodayElement.innerHTML = `Today's low: ${Math.round(
    response.data.daily[0].temperature.minimum
  )}°`;

  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index >= 1 && index < 6) {
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

  let forecastContainerElement = document.querySelector(
    "#forecast-weather-container"
  );
  forecastContainerElement.innerHTML = forecastHtml;
}

function apiForecastSearch(city) {
  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(addForecast);
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
  let currentTimeElement = document.querySelector("#date");
  let icon = document.querySelector("#current-temp-icon");
  let weatherQuote = document.querySelector("#quote");

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
  } else {
    headingElement.innerHTML = "Good Night🌛!";
  }
}

updateHeading();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

apiCitySearch("Toronto");
