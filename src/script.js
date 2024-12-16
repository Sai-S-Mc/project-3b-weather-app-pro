function updateWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = response.data.country;

  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
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
