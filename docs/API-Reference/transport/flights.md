# Flights

{% method %}
### Get Emissions
Find Emissions for a flight between two airports.
Only [ICAO Airport Codes](https://en.wikipedia.org/wiki/International_Civil_Aviation_Organization_airport_code) are supported.

###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| origin | string |**Required:** Flight origin airport _ICAO_ code. |
| destination  | string |**Required:** Flight destination airport _ICAO_ code. |
| type     | string | Flight type (`international` or `domestic`). Default is `international`. |
| model     | string | Flight model (e.g A310). Default is `A380` for international flights and `A320` for domestic flights. |
| passengers     | number | Pass the number of passengers to get the emissions relative to per person on the flight. |

**Example**
```JSON
{
	"origin": "DEL",
	"destination": "JFK",
	"type": "international",
	"model": "A380",
	"passengers": 840
}
```
`200` - **Response**
```JSON
{
	"success": true,
	"emissions": {
		"CO2": 122.192782162
	},
	"unit": "kg"
}
```
`400` - **Error** 
```JSON
{
	"success": false,
	"error": "Unable to find a given airport. Please use ICAO airport code."
}
```
{% common %}
```
POST /v1/flight
```
{% sample lang="Bash" %}
```Bash
#use your API key here

curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
    "origin": "DEL",
    "destination": "JFK",
    "type": "international",
    "model": "A380",
    "passengers": 840
}' 'https://www.carbonhub.xyz/v1/flight'
```
{% sample lang="python" %}
```Python
import requests
import json

def getFlightEmissions(url,data,headers):
	r = requests.post(url,data = json.dumps(data),headers=headers)
	return r.content
url = 'https://www.carbonhub.xyz/v1/flight'
data = {
    "origin": "DEL",
    "destination": "JFK",
    "type": "international",
    "model": "A380",
    "passengers": 840
}
#use your api key here
headers = {
	"access-key":"<apikey>",
	"Content-Type":"application/json"
}
print getFlightEmissions(url,data,headers)
```

{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getFlightEmissions(url,data,headers){
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
    
let url = "https://www.carbonhub.xyz/v1/flight",
    data = {
    "origin": "DEL",
    "destination": "JFK",
    "type": "international",
    "model": "A380",
    "passengers": 840
    },
    //use your api key here
    headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getFlightEmissions(url,data,headers); 
```
{% common %}
{% endmethod %}