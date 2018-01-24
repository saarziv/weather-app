const request = require('request');

const googleApiKey = "AIzaSyBOjVU2X3co_a9_oSy3vDSdTQ1PzTFbyPk";

/*
* The Request library does`nt support promises - it uses a call back instead of returning a promise.
* therefore we need to make that change manually by wrapping  the request withing a promise.
* and that promise withing a function (that can receive parameters.)*/
let geocodeRequest = (address) => {
    return new Promise(((resolve, reject) => {

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`;
        request({
            url: url,
            json: true
        }, (err, req, body) => {
            if (body.status === "OK") {
                let results = {
                    address : body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                };
                resolve(results);
            } else {
                reject("Some error occurred.")
            }

        });
    }))

};

geocodeRequest("dov hausner 4").then((res) =>{
    console.log(res);
})
    .catch((err) => {
        console.log(err);
    });
