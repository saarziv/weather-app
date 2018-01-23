const request = require('request');
const yargs = require('yargs');

const googleApiKey = "AIzaSyBOjVU2X3co_a9_oSy3vDSdTQ1PzTFbyPk";


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


const encodedAddress = encodeURIComponent(argv.a);
const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`;

request({
    url: url,
    json: true
},(error, response, body) => {
    console.log(`the address is:${body.results[0].formatted_address}`);
    console.log(`the latitude is :${body.results[0].geometry.location.lat}`);
    console.log(`the longitude is :${body.results[0].geometry.location.lng}`);
});
