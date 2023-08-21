const api = {
    key: "6dfe07cd1ad19dda597e6254c51f67e0",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    let now = new Date();
    let date = document.querySelector('.location .date');
    let temp2 = 0;
    let temp = document.querySelector('.current .temp');
    let weather_el = document.querySelector('.current .weather');
    if(String(weather.cod) === '404'){
        city.innerText = `city not found!`;
        date.innerText = dateBuilder(now);    
        temp.innerHTML = `0<span>°c</span>`;  
        temp2.innerHTML =  `0<span>°F</span>`;
        weather_el.innerText = "null"; 
    }
    else{
        city.innerText = `${weather.name}, ${weather.sys.country}`;
        date.innerText = dateBuilder(now);    
        temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>${getWeatherIcon(weather.weather[0].id)}`;  
        temp2.innerHTML = `${temperatureConverter(weather.main.temp)}<span>°F</span>`;
        weather_el.innerText = weather.weather[0].main; 
    }

  }
  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

  
    return `${day} ${date} ${month} ${year}`;

  }

  function getWeatherIcon(condition) {
    if (condition < 300) {
        return '🌩';
    } else if (condition < 400) {
        return '🌧';
    } else if (condition < 600) {
        return '☔️';
    } else if (condition < 700) {
        return '☃️';
    } else if (condition < 800) {
        return '🌫';
    } else if (condition === 800) {
        return '☀️';
    } else if (condition <= 804) {
        return '☁️';
    } else {
        return '🤷‍';
    }
}

function temperatureConverter(valNum) {
    valNum = parseFloat(valNum);
    document.getElementById("outputCelsius").innerHTML = Math.round((valNum*1.8) + 32);
  }
