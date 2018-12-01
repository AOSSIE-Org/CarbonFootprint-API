# Appliances
{% method %}
This route enables you to find GHG emissions for a number of appliance types for a specific quantity and running time. The emissions are calculated from the electricity based emissions on a particular region. The different appliance types can be found in this [excel sheet](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/raw_data/Applicances.xlsx) or in the json form [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/raw_data/appliances.json). 
###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| appliance | string | **Required:** The appliance name. |
| type   | string | **Required:** The type of the appliance. Its necessary if it exists. |
| region   | string | **Required:** Region in which the appliance is used. |
| quantity   | number | The number of appliances being used. |
| running_time   | number | The number of hours the appliances are being used. |

**Example**
```JSON
{
  "appliance":"Water heater",
  "type":"instantaneous",
  "region":"India",
  "quantity":1,
  "running_time":3
}
```
`200` - **Response**
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 7.0231411497,
        "CH4": 0.0000817752,
        "N2O": 0.0001059357
    },
    "unit": "kg"
}
```
`400` - **Error** 
```JSON
{
    "success": false,
    "error": err
}
```
{% common %}
```
POST /v1/appliances
```
{% sample lang="Bash" %}
```Bash
#use your API key here

curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
    "appliance":"Water heater",
    "type":"instantaneous",
    "region":"India",
    "quantity":1,
    "running_time":3
}' 'https://www.carbonhub.org/v1/appliances'
```
{% sample lang="python" %}
```Python
import requests
import json

def getApplianceEmissions(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'https://www.carbonhub.org/v1/appliances'
data = {
    "appliance":"Water heater",
    "type":"instantaneous",
    "region":"India",
    "quantity":1,
    "running_time":3
}
#use your api key here
headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
}
print getApplianceEmissions(url,data,headers)
```
{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getApplianceEmissions(url,data,headers){
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
    
let url = "https://www.carbonhub.org/v1/appliances",
    data = {
    "appliance":"Water heater",
    "type":"instantaneous",
    "region":"India",
    "quantity":1,
    "running_time":3
    },
    //use your api key here
    headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getApplianceEmissions(url,data,headers);
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

public class getApplianceEmissions {
    public static void main(String[] args) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost("https://www.carbonhub.org/v1/appliances");

        // Create some NameValuePair for HttpPost parameters
        List<NameValuePair> data = new ArrayList<>(5);
        data.add(new BasicNameValuePair("appliance", "Water heater"));
        data.add(new BasicNameValuePair("type", "instantaneous"));
        data.add(new BasicNameValuePair("region", "India"));
        data.add(new BasicNameValuePair("quantity", Integer.toString(1)));
        data.add(new BasicNameValuePair("running_time", Integer.toString(3)));


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
