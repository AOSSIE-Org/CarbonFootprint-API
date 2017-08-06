# Trains Endpoint

{% method %}
This route enables you to find GHG emissions for a number of train types for a certain route.The distance is calculated using [Google Map Distant Matrix API](https://developers.google.com/maps/documentation/javascript/distancematrix). The trains that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/raw_data/trains.json). 

**Example**
```JSON
{
    "type":"railcars",
    "origin":"Bhubaneswar",
    "destination":"Delhi",
    "passengers":10
}
```
`200` - **Response**
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 750.104916
    },
    "unit": "kg"
}
```
`400` - **Error** 
```JSON
{
    "success": false,
    "error": "Distance cannot be less than zero"
}
```
{% sample lang="http" %}
```
POST /v1/trains
```
{% sample lang="Bash" %}
```Bash
#use your API key here
curl -POST -H 'api-key: 2804cbd0-5b69-519b-afbc-609e981f92b0' -H "Content-type: application/json" -d '{
    "type":"railcars",
    "origin":"Bhubaneswar",
    "destination":"Delhi",
    "passengers":10
}' 'http://www.carbonhub.xyz/v1/trains'
```
{% sample lang="python" %}
```Python
import requests
import json

def getTrainEmissions(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'http://www.carbonhub.xyz/v1/trains'
data = {
    "type":"railcars",
    "origin":"Bhubaneswar",
    "destination":"Delhi",
    "passengers":10
}
#use your api key here
headers = {
    "api-key":"2804cbd0-5b69-519b-afbc-609e981f92b0",
    "Content-Type":"application/json"
}
print getTrainEmissions(url,data,headers)
```
{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getTrainEmissions(url,data,headers){
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
    
let url = "https://www.carbonhub.xyz/v1/trains",
    data = {
    "type":"railcars",
    "origin":"Bhubaneswar",
    "destination":"Delhi",
    "passengers":10
    },
    //use your api key here
    headers = {
    "api-key":"2804cbd0-5b69-519b-afbc-609e981f92b0",
    "Content-Type":"application/json"
    };

getTrainEmissions(url,data,headers); 
```

{% common %}
**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| type | string | **Required:** The fuel type used by the vehicle.|
| origin    | string | **Required:** Origin of the journey. |
| destination   | string | **Required:** Destination of the journey. |
| region    | string |  Origin of the journey. The default sets to 'Default'. |
| passengers    | number | The number of passengers travelling in the journey.The default sets to 1. |

{% endmethod %}
