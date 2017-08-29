# Trains Endpoint

{% method %}
This route enables you to find GHG emissions for a number of train types for a certain route.The distance is calculated using [Google Map Distant Matrix API](https://developers.google.com/maps/documentation/javascript/distancematrix). The trains that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/raw_data/trains.json). 
###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| type | string | **Required:** The fuel type used by the vehicle.|
| origin    | string | **Required:** Origin of the journey. |
| destination   | string | **Required:** Destination of the journey. |
| region    | string |  Origin of the journey. The default sets to 'Default'. |
| passengers    | number | The number of passengers traveling in the journey.The default sets to 1. |
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
{% common %}
```
POST /v1/trains
```
{% sample lang="Bash" %}
```Bash
#use your API key here

curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
    "type":"railcars",
    "origin":"Bhubaneswar",
    "destination":"Delhi",
    "passengers":10
}' 'https://www.carbonhub.xyz/v1/trains'
```
{% sample lang="python" %}
```Python
import requests
import json

def getTrainEmissions(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'https://www.carbonhub.xyz/v1/trains'
data = {
    "type":"railcars",
    "origin":"Bhubaneswar",
    "destination":"Delhi",
    "passengers":10
}
#use your api key here
headers = {
    "access-key":"<apikey>",
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
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getTrainEmissions(url,data,headers); 
```
{% sample lang="java" %}
```Java
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

public class getTrainEmission {
    public static void main(String[] args) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost("https://www.carbonhub.xyz/v1/trains");

        // Create some NameValuePair for HttpPost parameters
        List<NameValuePair> data = new ArrayList<>(4);
        data.add(new BasicNameValuePair("type", "railcars"));
        data.add(new BasicNameValuePair("origin", "Bhubaneswar"));
        data.add(new BasicNameValuePair("destination", "Delhi"));
        data.add(new BasicNameValuePair("passengers", Integer.toString(10)));
        try {
            post.setEntity(new UrlEncodedFormEntity(data));
            //use your apikey here
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
