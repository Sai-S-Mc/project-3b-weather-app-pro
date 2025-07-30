function formatForecastDay(timestamp) {
  let then = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[then.getDay()];
  return day;
}

function formatToday(apiTimeStamp) {
  let now = new Date(apiTimeStamp * 1000);
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
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  return `${day}, ${month} ${date}`;
}

function addForecast(response) {
  let forecastApiResponse = response.data;
  let today = document.querySelector("#date");
  today.innerHTML = `Local Date : ${formatToday(forecastApiResponse.daily[0].time)}`;

  let highTodayElement = document.querySelector("#high-today");
  highTodayElement.innerHTML = `Today's high: ${Math.round(
    forecastApiResponse.daily[0].temperature.maximum
  )}°`;

  let lowTodayElement = document.querySelector("#low-today");
  lowTodayElement.innerHTML = `Today's low: ${Math.round(
    forecastApiResponse.daily[0].temperature.minimum
  )}°`;

  let forecastHtml = "";
  forecastApiResponse.daily.forEach(function (day, index) {
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
  if (temp <= 30) {
    if (temp <= 10) {
      return `<em>Keep warm</em> ♨️🧦`;
    } else if (temp < 20) {
      return ` <em>Tad bit chilly</em> 🍃🧥`;
    }
    return ` <em>Enjoy the warm weather</em> 🌦️☀️`;
  } else {
    return `<em>Remember to stay hydrated</em> 💧🕶️`;
  }
}

function updateWeatherDetails(response) {
  let apiResponse = response.data;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = apiResponse.city;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = apiResponse.country;

  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(apiResponse.temperature.current);

  let descriptionElement = document.querySelector("#weather-description");
  let description = apiResponse.condition.description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  descriptionElement.innerHTML = description;

  let realFeelElement = document.querySelector("#real-feel-temperature");
  realFeelElement.innerHTML = `Feels like : <strong>${Math.round(
    apiResponse.temperature.feels_like
  )}°C</strong>`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity : <strong>${apiResponse.temperature.humidity}%</strong>`;

  let windspeedElement = document.querySelector("#windspeed");
  windspeedElement.innerHTML = `Windspeed : <strong>${Math.round(
    apiResponse.wind.speed
  )} km/h</strong>`;

  let icon = document.querySelector("#current-temp-icon");
  icon.innerHTML = `<img src = "${apiResponse.condition.icon_url}" class="current-temp-icon" />`;

  let weatherQuote = document.querySelector("#quote");
  weatherQuote.innerHTML = updateQuote(temperatureElement.innerHTML);

  apiForecastSearch(apiResponse.city);
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

function determineGreeting(hour) {
  if (hour >= 5 && hour < 21) {
    if (hour < 12) {
      return "Good Morning🌅!";
    } else if (hour < 17) {
      return "Good Afternoon🌞!";
    }
    return "Good Evening🌆!";
  } else {
    return "Good Night🌛!";
  }
}

function updateGreeting() {
  let timeNow = new Date();
  let currentHour = timeNow.getHours();
  let greetingElement = document.querySelector("#user-greeting");
  greetingElement.innerHTML = determineGreeting(currentHour);
}

updateGreeting();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);

apiCitySearch("Toronto");
