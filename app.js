const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');



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




geocode.geocodeAddress(argv.address,(errorMessage,results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`the weather in :${results.address} is :`);
        // console.log(JSON.stringify(results,undefined,2));
        weather.getWeather(results.latitude,results.longitude,(errorMessage,results)=> {
            if(errorMessage){
                console.log(errorMessage);
            } else {
                console.log(`${results.temperatureCelsius} , but feels like ${results.apparentTemperature}`);
            }
        })
    }
});


