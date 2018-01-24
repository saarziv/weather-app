const yargs = require('yargs');

const geocodeAndWeatherPromise = require('./geocode/geocode-and-weather-promise');



const argv = yargs
    .option({
        address:{
            describe: 'Enter address',
            alias: 'a',
            string: true,
            demand:true
        }
    })
    .help()
    .alias('help','h')
    .argv;


geocodeAndWeatherPromise.geocodeAddress(argv.address)
    .then((weatherResult) => {
       console.log(JSON.stringify(weatherResult,undefined,2));
    });


