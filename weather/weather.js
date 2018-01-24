const fahrenheitToCelsius = require('fahrenheit-to-celsius');
const request = require('request');

//39cc02ede10bbfe4b439e01bde83b9b9 forecast api key.

var getWeather = (lat,lng,callback) =>{
    const forecastApiKey ="39cc02ede10bbfe4b439e01bde83b9b9";
    const url = `https://api.darksky.net/forecast/${forecastApiKey}/${lat},${lng}`;
    request({
        url: url,
        json:true,
    },(err,res,body) =>{
        if(err) {
            callback("Unable to connect to Forecast servers.")
        } else if (res.statusCode === 400) {
            callback("The location is invalid.")
        }
        else if(res.statusCode === 200) {
            let  results = {
                temperatureCelsius: fahrenheitToCelsius(body.currently.temperature).toFixed(2),
                apparentTemperature: fahrenheitToCelsius(body.currently.apparentTemperature).toFixed(2)
            };

            callback(undefined,results);
        }

    });
};

module.exports.getWeather = getWeather;
