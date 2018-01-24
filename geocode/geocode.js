const request = require('request');

const googleApiKey = "AIzaSyBOjVU2X3co_a9_oSy3vDSdTQ1PzTFbyPk";







let geocodeAddress = (address,callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleApiKey}`;

    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.')
        } else if (body.status === "ZERO_RESULTS") {
            callback('the address could not be found');
        } else if (body.status === "OK") {
            let results = {
                address : body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            };
            callback(undefined,results);
        }
    })
};

module.exports = {
  geocodeAddress
};
