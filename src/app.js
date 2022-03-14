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

  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
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





function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature}°`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let highTempElement = document.querySelector("#highest");
  let highTemp = Math.round(response.data.main.temp_max);
  highTempElement.innerHTML = `${highTemp}°`;
  let lowTempElement = document.querySelector("#lowest");
  let lowTemp = Math.round(response.data.main.temp_min);
  lowTempElement.innerHTML = `${lowTemp}°`;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = `${humidity}%`;
  let windElement = document.querySelector("#windspeed");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `${windSpeed} km/h`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let currentWeatherIcon = document.querySelector("#current-weather-icon");

  currentWeatherIcon.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.svg`
  );

  currentWeatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "fd4ffa3dde63cf28819767f2d6c16744";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiUrl).then(displayTemperature);

}

search("New York");

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let cityInputElement = document.querySelector("#city-input");
  city.innerHTML = cityInputElement.value;
  search(cityInputElement.value);
  cityInputElement.value = "";
}


let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);