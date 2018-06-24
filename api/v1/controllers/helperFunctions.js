var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GOOGLE_MAPS_KEY, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

//google map api client defined
let googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_KEY 
});
exports.getDistanceFromLatLon = (lat1, lon1, lat2, lon2) => {
  let p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};

exports.getRandomNumber = (minimum, maximum) => {
	return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
}

//Using google map api to find distance.
exports.distance = (ori, dest, mod) => {
    return new Promise((resolve, reject) => {
        googleMapsClient.distanceMatrix({
            origins: [
                ori
            ],
            destinations: [
                dest
            ],
            mode: mod,
            transit_mode: ['rail'],
            transit_routing_preference: 'fewer_transfers'
        }, (status, response) => {
            if(response.json.status === 'OK' && response.json.rows[0].elements[0].status === 'OK'){
                resolve(response.json.rows[0].elements[0].distance.value/1000);
            }
            else {
                reject("Unable to find the distance between the origin and destination points.")
            }
        });
    });
};

exports.nearbyTrainStations = (relativeLocation) => {
    //console.log("Sending maps request");
    let radiusDefault = 1000000; // 100 km
    return new Promise((resolve, reject) => {
        googleMapsClient.places({
            radius: radiusDefault,
            location: relativeLocation.lat+","+relativeLocation.lng,
            type: 'train_station'
        }, function(status, response) {
            //console.log("Maps response: "+JSON.stringify(response.json));
            if(response.json.status === 'OK' && response.json.results[1].name) { // At least two results
                var finalResults = [ ]
                for(let i = 0; i < response.json.results.length; i++) {
                    let singleResult = {
                        name: response.json.results[i].name,
                        location: response.json.results[i].geometry.location
                    }
                    finalResults.push(singleResult);
                }
                resolve(finalResults);
            }
            else {
                reject("Unable to find nearby train stations")
            }
        });
    });
}

// Different from distance(orig, dest, mod) since this accepts coordinates
exports.transitDistanceInCoordinates = (sourceLocation, destinationLocation, mode) => {
    return new Promise((resolve, reject) => {
        googleMapsClient.distanceMatrix({
            origins: sourceLocation.lat +","+ sourceLocation.lng,
            destinations: destinationLocation.lat +","+ destinationLocation.lng,
            mode: 'transit',
            transit_mode: mode,
            transit_routing_preference: 'fewer_transfers'
        }, function (status, response) {
            if(response.json.status === 'OK' && response.json.rows[0].elements[0].status === 'OK'){
                resolve(response.json.rows[0].elements[0].distance.value/1000);
            }
            else {
                reject("Unable to find the distance between the origin and destination points.")
            }
        });
    });
}

// Different from distance(orig, dest, mod) since this accepts coordinates
exports.distanceInCoordinates = (sourceLocation, destinationLocation, mode) => {
    return new Promise((resolve, reject) => {
        googleMapsClient.distanceMatrix({
            origins: sourceLocation.lat +","+ sourceLocation.lng,
            destinations: destinationLocation.lat +","+ destinationLocation.lng,
            mode: mode
        }, function (status, response) {
            if(response.json.status === 'OK' && response.json.rows[0].elements[0].status === 'OK'){
                resolve(response.json.rows[0].elements[0].distance.value/1000);
            }
            else {
                reject("Unable to find the distance between the origin and destination points.")
            }
        });
    });
}

exports.geodecodeFromLatLon = (lat, lng) => {
    return new Promise((resolve, reject) => {
        var geocoder = NodeGeocoder(options);
        let data = {};
        geocoder.reverse({
            lat: lat,
            lon: lng
        }, function(err, res) {
            if (err)
                reject(err);
            else {
                //console.log(res);
                data.country = res[0].country;
                data.countryCode = res[0].countryCode;
                data.city = res[0].city;
                data.state = res[0].administrativeLevels.level1long;
                //console.log(data);
                resolve(data);
            }
        });
    });
}