
try {
	var config = require('../../../config.json');
}
catch(e){
	console.log(`File "config.json" is missing.`);
}
let api = config.apikeys;
//google map api client defined
let googleMapsClient = require('@google/maps').createClient({
  key: `${api.googlemap}` 
});
exports.getDistanceFromLatLon = (lat1, lon1, lat2, lon2) => {
  let p = 0.017453292519943295;    // Math.PI / 180
  let c = Math.cos;
  let a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
};
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
        }, function (status, response) {
            if(response.json.status === 'OK' && response.json.rows[0].elements[0].status === 'OK'){
                resolve(response.json.rows[0].elements[0].distance.value/1000);
            }
            else {
                reject("Unable to find the distance between the origin and destination points.")
            }
        });
    });
};
