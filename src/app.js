function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

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
  let month = months[date.getMonth()];

  let currentDate = date.getDate();

  return `<strong> ${day}, ${month} ${currentDate} </strong> <br/> ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 4) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-3">
      <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
        <img
        class="forecast-icon"
        src="images/${forecastDay.weather[0].icon}.svg"
        alt="sunny"
        width="25"
        />
      <div class="forecast-high-low">
      ${Math.round(forecastDay.temp.min)}° | <strong>${Math.round(
          forecastDay.temp.max
        )}°</strong>
      </div>
    </div>
 `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "fd4ffa3dde63cf28819767f2d6c16744";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#weather-description");
  let highTempElement = document.querySelector("#highest");
  let highTemp = Math.round(response.data.main.temp_max);
  let lowTempElement = document.querySelector("#lowest");
  let lowTemp = Math.round(response.data.main.temp_min);
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  let windElement = document.querySelector("#windspeed");
  let windSpeed = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  celsiusTemp = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = `${celsiusTemp}°`;
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  highTempElement.innerHTML = `${highTemp}°`;
  lowTempElement.innerHTML = `${lowTemp}°`;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${windSpeed} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  currentWeatherIcon.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.svg`
  );

  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  console.log(response.data.weather[0].icon);
}

function search(city) {
  let apiKey = "fd4ffa3dde63cf28819767f2d6c16744";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInputElement = document.querySelector("#city-input");
  city.innerHTML = cityInputElement.value;
  search(cityInputElement.value);
  cityInputElement.value = "";
  celsiusBtn.classList.add("active");
  fahrenheitBtn.classList.remove("active");
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  celsiusBtn.classList.remove("active");
  fahrenheitBtn.classList.add("active");
  temperatureElement.innerHTML = `${fahrenheitTemp}°`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusBtn.classList.add("active");
  fahrenheitBtn.classList.remove("active");
  temperatureElement.innerHTML = `${celsiusTemp}°`;
}

let celsiusTemp = null;

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let fahrenheitBtn = document.querySelector("#fahrenheit-btn");
fahrenheitBtn.addEventListener("click", displayFahrenheitTemp);

let celsiusBtn = document.querySelector("#celsius-btn");
celsiusBtn.addEventListener("click", displayCelsiusTemp);

search("New York");
