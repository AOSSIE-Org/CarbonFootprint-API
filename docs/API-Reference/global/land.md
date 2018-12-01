# Land Endpoint

{% method %}
This route enables you to find global emissions for different types of land for a certain country. The land types included are:

| | | | |
| - | - | - | - |
| Forest land | Cropland | Grassland | Burning Biomass |

###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| item | string | **Required:** The type of land.|
| region | string | **Required:** The country whose emissions are to be calculated. |
**Example**
```JSON
{
    "item":"Cropland",
    "region":"India"
}
```
`200` - **Response**
```JSON
{
    "success": true,
    "quantity": 8483.9433,
    "unit": "gigagrams",
    "note": "This is an estimate for the quantity of cropland that could be the cause of emission provided."
}
```
`400` - **Error** 
```JSON
{
    "success": false,
    "error": "Unable to find land emissions for item type invalid_land in India"
}
```
{% common %}
```
POST /v1/land
```
{% sample lang="Bash" %}
```Bash
#use your API key here

curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
    "item":"Cropland",
    "region":"India"
}' 'https://www.carbonhub.org/v1/land'
```
{% sample lang="python" %}
```Python
import requests
import json

def getLandEmission(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'https://www.carbonhub.org/v1/land'
data = {
    "item":"Cropland",
    "region":"India"
}
#use your api key here
headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
}
print getLandEmission(url,data,headers)
```
{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getLandEmission(url,data,headers){
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
    
let url = "https://www.carbonhub.org/v1/land",
    data = {
    "item":"Cropland",
    "region":"India"
    },
    //use your api key here
    headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getLandEmission(url,data,headers); 
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

public class getLandEmission {
    public static void main(String[] args) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost("https://www.carbonhub.org/v1/land");

        // Create some NameValuePair for HttpPost parameters
        List<NameValuePair> data = new ArrayList<>(2);
        data.add(new BasicNameValuePair("item", "Cropland"));
        data.add(new BasicNameValuePair("region", "India"));
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