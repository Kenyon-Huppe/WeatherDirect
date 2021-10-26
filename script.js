import { MY_API_KEY } from './config.js';

// todo hide API keys on post

// Variables
let temperatureData = document.getElementById('temperature-data');
let coverageData = document.getElementById('coverage-data');
let sunsetData = document.getElementById('sunset-data');

let locationName = document.getElementById('location-name');

// functions
document.getElementById('current-submit').addEventListener('click', getData);

function getData() {
    const city = document.getElementById('current-weather-location').value;
    // todo add time api
    // todo add country field
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${MY_API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let tempOutput = `${data.main.temp}&#176 Fahrenheit`;
            let coverageOutput = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">`

            function timeUnixConvert() {

                let sunsetTime = new Date(data.sys.sunset * 1000 + (data.timezone * 1000));
                const hours = sunsetTime.getUTCHours();
                const minutes = sunsetTime.getUTCMinutes();
                const seconds = sunsetTime.getUTCSeconds();

                function militaryTimeConvert(minutes, hours) {
                    let sunsetFormat = '';
                    if (hours > 12) {
                        hours -= 12;
                        hours = zeroHoursFormat(hours);
                        minutes = zeroMinutesFormat(minutes);
                        sunsetFormat = `${hours}:${minutes} PM`;
                    } else {
                        hours = zeroHoursFormat(hours);
                        minutes = zeroMinutesFormat(minutes);
                        sunsetFormat = `${hours}:${minutes} AM`;
                    }

                    return sunsetFormat;
                }

                function zeroHoursFormat(hours) {
                    // formats zero onto hours & minutes in need be
                    if (hours < 10) {
                        return hours = `0${hours}`;
                    } else {
                        return minutes;
                    }

                }
                function zeroMinutesFormat(minutes) {
                    if (minutes < 10) {
                        return minutes = `0${minutes}`;
                    } else {
                        return minutes;
                    }
                }

                return militaryTimeConvert(minutes, hours);

            }

            let sunsetTime = `${timeUnixConvert()}`

            temperatureData.innerHTML = tempOutput;
            coverageData.innerHTML = coverageOutput;
            sunsetData.innerHTML = sunsetTime;
            locationName.innerHTML = city;

            temperatureData.style.marginTop = '12px';
            sunsetData.style.marginTop = '12px';
        })
        .catch((err) => console.log(err));
}