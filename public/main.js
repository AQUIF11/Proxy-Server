const weatherDisplay = document.querySelector(".weather");
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");

// Fetch weather data from API
const fetchWeather = async (city) => {
  const API_KEY = "0f984c79339c2c1ed43d6baceeade6d5";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod === "404") {
    alert("City not found");
    return;
  }

  if (data.cod === 401) {
    alert("Invalid API Key");
    return;
  }

  const displayData = {
    city: data.name,
    temp: kelvinToCelsius(data.main.temp),
  };

  addWeatherToDOM(displayData);
};

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;C</h2>
  `;
  cityInput.value = "";
};

// Convert Kelvin to Celsius
const kelvinToCelsius = (temp) => {
  return Math.ceil(temp - 273.15);
};

// Event listener for form submission
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cityInput.value === "") {
    alert("Please enter a city");
  } else {
    fetchWeather(cityInput.value);
  }
});

// Initial fetch
fetchWeather("Miami");
