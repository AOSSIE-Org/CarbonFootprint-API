const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD9rp-oHZvEBe2P-MJc7t56wTZwnwENIg8'
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
exports.distance = (ori,dest,mod) => {
let dist = googleMapsClient.distanceMatrix({
      origins: [
        ori
      ],
      destinations: [
        dest
      ],
      mode: mod,
      transit_mode: ['rail'],
      transit_routing_preference: 'fewer_transfers'
    },function(response,status) {
       console.log(response);
       if (status == 'OK') {
        console.log("I am here");
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.text;
            var duration = element.duration.text;
            var from = origins[i];
            var to = destinations[j];
          }
        }
      }
  });
}
