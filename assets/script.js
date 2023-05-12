


var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = nameInputEl.value.trim();
  if (city) {
    getForecast(city);
    weatherContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

var getCurrentWeather = function(city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=334c9cf8dddd1102356e9a0fff7d603c';
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          displayCurrentWeather(data);
          console.log(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to OpenWeather');
    });
};

var displayCurrentWeather = function(weatherData) {
  var currentWeatherEl = document.createElement('div');
  currentWeatherEl.classList = 'list-item flex-row justify-space-between align-center';

  var cityNameEl = document.createElement('span');
  cityNameEl.textContent = weatherData.name;

  var weatherIconEl = document.createElement('img');
  weatherIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png');
  weatherIconEl.setAttribute('alt', weatherData.weather[0].description);

  var tempEl = document.createElement('span');
  tempEl.textContent = 'Temperature: ' + weatherData.main.temp + '°F';

  var humidityEl = document.createElement('span');
  humidityEl.textContent = 'Humidity: ' + weatherData.main.humidity + '%';

  currentWeatherEl.appendChild(cityNameEl);
  currentWeatherEl.appendChild(weatherIconEl);
  currentWeatherEl.appendChild(tempEl);
  currentWeatherEl.appendChild(humidityEl);

  weatherContainerEl.prepend(currentWeatherEl);
};

var getForecast = function (city) {
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=334c9cf8dddd1102356e9a0fff7d603c';
  console.log(apiUrl);
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayForecast(data, city);
          console.log(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });

    getCurrentWeather(city);
};


var displayForecast = function (forecast, city) {
  console.log('Displaying forecast')
  if (forecast.length === 0) {
    weatherContainerEl.textContent = 'No weather found';
    return;
  }
  weatherSearchTerm.textContent = city;
  for (var i = 0; i < forecast.list.length; i+=8) {
    var day = forecast.list[i].dt_txt;
    var date = new Date(day);
    var options = {weekday: 'long' ,}
    var temp = forecast.list[i].main.temp;
    var humidity = forecast.list[i].main.humidity;
    var wind =  forecast.list[i].wind.speed;
    var iconCode = forecast.list[i].weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconCode + '.png';
    console.log('day: '+ day, ' temp: '+ temp + ' humidity: ' + humidity + ' wind: ' + wind);
    var forecastEl = document.createElement('div');
    forecastEl.classList = 'list-item flex-row justify-space-between align-center';
    var titleEl = document.createElement('span');
    console.log(titleEl);
    var statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    var iconEl = document.createElement('img');
    iconEl.setAttribute('src', iconUrl);

    titleEl.textContent = day + ': ' + temp + ' F, ' + humidity + '% humidity, ' + wind + ' mph wind';
    statusEl.appendChild(iconEl);
    forecastEl.appendChild(titleEl);
    forecastEl.appendChild(statusEl);
    weatherContainerEl.appendChild(forecastEl);
    localStorage.setItem(city, city);

    var historyContainer = document.createElement('div');
    historyContainer.classList = 'flex-row align-right';

    var history = document.createElement('button');
  }
};
userFormEl.addEventListener('submit', formSubmitHandler);



























