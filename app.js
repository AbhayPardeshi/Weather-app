// "https://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&units=metric&appid=" +
//   apiKey;

const weatherApi = {
  apiKey: "key",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather?",
};

function fetchWeather(city) {
  fetch(
    `${weatherApi.baseUrl}q=${city}&units=metric&appid=${weatherApi.apiKey}`
  )
    .then((response) => {
      return response.json();
    })
    .then(displayWeather);
}

function displayWeather(data) {
  // Another Method of accessing value
  //  const { name } = data;
  //   const { icon, description } = data.weather[0];
  //   const { temp, humidity } = data.main;
  //   const { speed } = data.wind;

  const city = document.querySelector(".city");
  city.innerText = `Weather in ${data.name}`;

  const icons = document.querySelector(".icon");
  icons.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  const description = document.querySelector(".description");
  description.innerText = `${data.weather[0].description}`;

  const temperature = document.querySelector(".temp");
  temperature.innerText = `${data.main.temp}°C`;

  const humidity = document.querySelector(".humidity");
  humidity.innerText = `Humidity:${data.main.humidity}%`;

  const windSpeed = document.querySelector(".wind");
  windSpeed.innerText = `Wind speed:${data.wind.speed} km/h`;

  document.querySelector(".weather").classList.remove("loading");
  document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${data.name}')`;
}

const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", () => {
  fetchWeather(document.querySelector(".search-bar").value);
});

const searchBar = document.querySelector(".search-bar");

searchBar.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    fetchWeather(document.querySelector(".search-bar").value);
  }
});
