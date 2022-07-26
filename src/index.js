import _ from "lodash";
import './style.css'

async function getGeoInfo() {
    const input = 'London'
0
    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' +input+ '&limit=5&appid=680265e3e07eb5d8401e3eef55579493', {mode: 'cors'})


    const geoData = await response.json()

    console.log(geoData)

    const state = geoData[0].state;
    const longitude = geoData[0].lon;
    const latitude = geoData[0].lat;

    console.log(longitude)
    console.log(state)
}

getGeoInfo();