function updateCityElement(city) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;
}

function handleSearch(event) {
  event.preventDefault();
  let userInput = document.querySelector("#search-form-input").value;
  updateCityElement(userInput);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearch);
