const form = document.querySelector('form')
const submitBtn = document.querySelector('.submit-btn')
const error = document.querySelector('.error-msg')

form.addEventListener('submit',handleSubmit)
submitBtn.addEventListener('click',handleSubmit)


function handleSubmit(e){
    e.preventDefault()
    fetchWeather()
}

function fetchWeather(){
    const input = document.querySelector('input[type="text"]')
    const location = input.value
    getWeatherData(location)
}

async function getWeatherData(location){
    const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=1986480656ec490d950204923202611&q=${location}`,
        { mode: 'cors',}
        )
    
        if (response.status===400){
            throwErrorMsg()
        }
        else{
            error.style.display ='none'
            const weatherData = await response.json()
            const newData = processData(weatherData)
            displayData(newData)
            reset()
        }
}

function reset(){
    form.reset();
}

function throwErrorMsg(){
    console.log("error from api")
    error.style.display = 'block'
    if(error.classList.contains('fade-in')){
        error.style.display = 'none'
        error.classList.remove('fade-in')
        error.offsetWidth;
        error.classList.add('fade-in');
        error.style.display = 'block'
    }

    error.classList.add('fade-in')
    
}

function processData(weatherData) {
    const myData = {
      condition: weatherData.current.condition.text,
      location: weatherData.location.name.toUpperCase(),
      currentTemp: Math.round(weatherData.current.temp_f),
      feelsLike: Math.round(weatherData.current.feelslike_f),
      wind: Math.round(weatherData.current.wind_mph),
      humidity: weatherData.current.humidity,
      region : weatherData.location.country.toUpperCase(),
    }
    return myData
}

function displayData(newData) {
    const weatherInfo = document.getElementsByClassName('info')
    Array.from(weatherInfo).forEach((div) => {
      if (div.classList.contains('fade-in2')) {
        div.classList.remove('fade-in2')
        div.offsetWidth
        div.classList.add('fade-in2')
      } else {
        div.classList.add('fade-in2')
      }
    });


    document.querySelector('.condition').textContent = newData.condition;

    document.querySelector('.location').textContent = `${newData.location}, ${newData.region}`

    document.querySelector('.degrees').textContent = newData.currentTemp

    document.querySelector('.feels-like').textContent = `FEELS LIKE: ${newData.feelsLike}`

    document.querySelector('.wind-mph').textContent = `WIND: ${newData.wind} MPH`

    document.querySelector('.humidity').textContent = `HUMIDITY: ${newData.humidity}`
  }
