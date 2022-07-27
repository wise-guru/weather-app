import _ from "lodash";
import './style.css'


const weatherBtn = document.querySelector('#weatherBtn')
const userInput = document.querySelector('#locationInput')

weatherBtn.addEventListener('click', function(e) {
    validateForm(e)
})

function validateForm(e) {
    e.preventDefault()

    if (userInput.validity.valueMissing) {
        userInput.setCustomValidity('Please enter a city.')
        userInput.reportValidity();
        
    } else {
        userInput.setCustomValidity('')
        getGeoInfo(userInput.value)
    }

  
   
}


async function getGeoInfo(input) {

    try {
        const getCoordinates = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' +input+ '&limit=5&appid=680265e3e07eb5d8401e3eef55579493', {mode: 'cors'})
        const geoData = await getCoordinates.json()
    
        const state = geoData[0].state;
        const longitude = geoData[0].lon;
        const latitude = geoData[0].lat;
    
    
        const getWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=680265e3e07eb5d8401e3eef55579493', {mode: 'cors'})
        const weatherData = await getWeather.json()
        console.log(weatherData)
    
        const weatherInfo = {
            name: `${weatherData.name}, ${state}`,
            temp: `${weatherData.main.temp}`,
            feelsLike: `Feels like: ${weatherData.main.feels_like}`,
            mainWeather: weatherData.weather[0].main,
            humidity: `Humidity: ${weatherData.main.humidity}%`,
            windSpeed: `${weatherData.wind.speed} k/m`
        }
    
    
        console.log(weatherInfo)
    }
    catch(error) {
        userInput.setCustomValidity('Please enter a valid city.')
        userInput.reportValidity();
    }




}

function displayWeatherInfo() {

}