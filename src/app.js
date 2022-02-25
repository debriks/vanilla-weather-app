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
  console.log(response.data);
}

let apiKey = "fd4ffa3dde63cf28819767f2d6c16744";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(displayTemperature);
