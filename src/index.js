import _ from "lodash";
import './style.css'
import Icon from './assets/cloud-moon.svg';


const weatherBtn = document.querySelector('#weatherBtn')
const userInput = document.querySelector('#locationInput')

weatherBtn.addEventListener('click', function(e) {
    validateForm(e)
})

weatherBtn.addEventListener('keypress', function(e) {
    if(e.key == 'enter') {
        validateForm(e)
    }
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
    
        const country = geoData[0].country;
        const longitude = geoData[0].lon;
        const latitude = geoData[0].lat;
        console.log(geoData)
        
    
    
        const getWeather = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=680265e3e07eb5d8401e3eef55579493', {mode: 'cors'})
        const weatherData = await getWeather.json()
        console.log(weatherData)
    
        const weatherInfo = {
            name: `${geoData[0].name}, ${country}`,
            temp: `${Math.round(9/5 * (weatherData.main.temp-273) + 32) * 10 /10} °F`,
            feelsLike: `Feels like: ${Math.round(9/5 * (weatherData.main.feels_like-273) + 32) * 10 /10} °F`,
            mainWeather: weatherData.weather[0].main,
            humidity: `Humidity: ${weatherData.main.humidity}%`,
            windSpeed: `${weatherData.wind.speed} k/m`
        }
    
    
        displayWeatherInfo(weatherInfo)
    }
    catch(error) {
        userInput.setCustomValidity('Please enter a valid city.')
        userInput.reportValidity();
    }




}

function displayWeatherInfo(weatherInfo) {
    const locationName = document.querySelector('#locationName');
    const locationTemp = document.querySelector('#locationTemp');
    const locationFeel = document.querySelector('#locationFeel');
    const locationWeather = document.querySelector('#locationWeather');
    const locationHumidity = document.querySelector('#locationHumidity');
    const locationWind = document.querySelector('#locationWind');

    console.log(weatherInfo.name.state)

    locationName.textContent = weatherInfo.name;
    locationTemp.textContent = weatherInfo.temp;
    locationFeel.textContent = weatherInfo.feelsLike
    locationWeather.textContent = weatherInfo.mainWeather;
    locationHumidity.textContent = weatherInfo.humidity;
    locationWind.textContent = weatherInfo.windSpeed;


}