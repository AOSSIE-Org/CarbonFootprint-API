# Vehicle Endpoint

{% method %}
This route enables you to find GHG emissions for a number of fuels.The distance is calculated using [Google Map Distant Matrix API](https://developers.google.com/maps/documentation/javascript/distancematrix). The fuels that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint/blob/master/Source/Core/core/resources/fuels.json). 
###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| type | string | **Required:** The fuel type used by the vehicle.|
| origin    | string | **Required:** Origin of the journey. |
| destination   | string | **Required:** Destination of the journey. |
| mileage    | string | The fuel efficiency of the vehicle i.e. distance traveled per unit of fuel. The default value is 20. |
| mileage_unit     | string | The unit of mileage. The default sets to be 'km/L' |

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
{% common %}
```
POST /v1/vehicle
```
{% sample lang="BASH" %}
```Bash
#use your API key here
curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
    "type": "Petrol",
    "origin": "Bhubaneswar",
    "destination": "Cuttack",
    "mileage": 50,
    "mileage_unit": "km/l"
}' 'https://www.carbonhub.xyz/v1/vehicle'
```
{% sample lang="python" %}
```Python
import requests
import json

def getVehicleEmissions(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'https://www.carbonhub.xyz/v1/vehicle'
data = {
    "type": "Petrol",
    "origin": "Bhubaneswar",
    "destination": "Cuttack",
    "mileage": 50,
    "mileage_unit": "km/l"
}
#use your api key here
headers = {
    "access-key":"<apikey>",
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
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getVehicleEmissions(url,data,headers); 
```

{% sample lang="java" %}
```Java
package org.kodejava.example.httpclient;

import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class getVehicleEmissions {
    public static void main(String[] args) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost("https://www.carbonhub.xyz/v1/vehicle");

        List<NameValuePair> data = new ArrayList<>(5); 
        data.add(new BasicNameValuePair("type", "Petrol"));
        data.add(new BasicNameValuePair("origin", "Bhubaneswar"));
        data.add(new BasicNameValuePair("destination", "Cuttack"));
        data.add(new BasicNameValuePair("mileage", 50));
        data.add(new BasicNameValuePair("mileage_unit", "km/l"));

        try {
            post.setEntity(new UrlEncodedFormEntity(data));
            post.setHeader("Content-Type","application/json");
            // use your api key
            post.setHeader("access-key","<apikey>");
            HttpResponse response = client.execute(post);

            // Print out the response message
            System.out.println(EntityUtils.toString(response.getEntity()));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

{% common %}
{% endmethod %}
