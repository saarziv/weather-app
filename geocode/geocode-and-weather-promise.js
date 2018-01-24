const axios = require('axios');
const fahrenheitToCelsius = require('fahrenheit-to-celsius');
const request = require('request');

const googleApiKey = "AIzaSyBOjVU2X3co_a9_oSy3vDSdTQ1PzTFbyPk";
const forecastApiKey ="39cc02ede10bbfe4b439e01bde83b9b9";




var geocodeAddress = (address) =>{
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`;
    return new Promise((resolve, reject) => {

        axios.get(url)
            .then((response) =>{
                if (response.data.status === "ZERO_RESULTS") {
                    throw new Error("Unable to find address");
                }

                let addressLocation = response.data.results[0].geometry.location;
                const url = `https://api.darksky.net/forecast/${forecastApiKey}/${addressLocation.lat},${addressLocation.lng}`;
                return axios.get(url)
            })
            .then((response) => {
                let result = {
                    summary: response.data.daily.summary,
                    todaySummary: response.data.hourly.summary,
                    now: {
                        temperatureCelsius :fahrenheitToCelsius(response.data.currently.temperature).toFixed(2),
                        apparentTemperature :fahrenheitToCelsius(response.data.currently.apparentTemperature).toFixed(2),
                        rainIntensity : `${(response.data.currently.precipIntensity).toFixed(2)*100}%`
                    },
                    tomorrow: {
                        temperatureCelsiusMin :fahrenheitToCelsius(response.data.daily.data[1].temperatureMin).toFixed(2),
                        temperatureCelsiusMax :fahrenheitToCelsius(response.data.daily.data[1].temperatureMax).toFixed(2),
                        apparentTemperatureMin: fahrenheitToCelsius(response.data.daily.data[1].apparentTemperatureMin).toFixed(2),
                        apparentTemperatureHigh: fahrenheitToCelsius(response.data.daily.data[1].apparentTemperatureHigh).toFixed(2),
                        rainProbability: `${((response.data.daily.data[1].precipProbability).toFixed(2))*100}%`,
                        rainIntensity : `${(response.data.daily.data[1].precipIntensity).toFixed(2)*100}%`
                    }
                };
                resolve(result);
            })
            .catch((e)=> {
                if (e.code === "ENOTFOUND") {
                    reject('Unable to connect to API servers.')
                } else {
                    reject(e.message);
                }

            })
    })

};

module.exports.geocodeAddress = geocodeAddress;