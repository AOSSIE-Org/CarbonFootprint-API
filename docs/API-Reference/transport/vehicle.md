# Vehicle Endpoint

{% method %}
This route enables you to find GHG emissions for a number of fuels.The distance is calculated using [Google Map Distant Matrix API](https://developers.google.com/maps/documentation/javascript/distancematrix). The fuels that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint/blob/master/Source/Core/core/resources/fuels.json). 

**Example**
```JSON
{
    "type": "Petrol",
    "origin": "Bhubaneswar",
    "destination": "Cuttack",
    "mileage": 50,
    "mileage_unit": "km/l"
}
```
`200` - **Response**
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 1.20362256,
        "CH4": 0.0012964277,
        "N2O": 0.0032509184
    },
    "unit": "kg"
}
```
`400` - **Error** 
```JSON
{
    "success": false,
    "error": "Distance or Mileage cannot be less than zero"
}
```
{% sample lang="http" %}
```
POST /v1/vehicle
```
{% sample lang="BASH" %}
```Bash
#use your API key here
curl -POST -H 'api-key: 2804cbd0-5b69-519b-afbc-609e981f92b0' -H "Content-type: application/json" -d '{
    "type": "Petrol",
    "origin": "Bhubaneswar",
    "destination": "Cuttack",
    "mileage": 50,
    "mileage_unit": "km/l"
}' 'http://www.carbonhub.xyz/v1/vehicle'
```
{% sample lang="python" %}
```Python
import requests
import json

def getVehicleEmissions(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'http://www.carbonhub.xyz/v1/vehicle'
data = {
    "type": "Petrol",
    "origin": "Bhubaneswar",
    "destination": "Cuttack",
    "mileage": 50,
    "mileage_unit": "km/l"
}
#use your api key here
headers = {
    "api-key":"2804cbd0-5b69-519b-afbc-609e981f92b0",
    "Content-Type":"application/json"
}
print getVehicleEmissions(url,data,headers)
```

{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getVehicleEmissions(url,data,headers){
    var options = {
        url: url,
        method: 'POST',
        headers: headers,
        form: data
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body)
        }
    });
}
    
let url = "https://www.carbonhub.xyz/v1/vehicle",
    data = {
    "type": "Petrol",
    "origin": "Bhubaneswar",
    "destination": "Cuttack",
    "mileage": 50,
    "mileage_unit": "km/l"
    },
    //use your api key here
    headers = {
    "api-key":"2804cbd0-5b69-519b-afbc-609e981f92b0",
    "Content-Type":"application/json"
    };

getVehicleEmissions(url,data,headers); 
```

{% common %}
**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| type | string | **Required:** The fuel type used by the vehicle.|
| origin    | string | **Required:** Origin of the journey. |
| destination   | string | **Required:** Destination of the journey. |
| mileage    | string | The fuel efficiency of the vehicle i.e. distance travelled per unit of fuel. The default value is 20. |
| mileage_unit     | string | The unit of mileage. The default sets to be 'km/L' |


{% endmethod %}
