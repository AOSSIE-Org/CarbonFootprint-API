# Quantity
{% method %}
This route is can be used to retrieve the quantity of a certain element provided the CO2 emission for the specific item is already known. Refer to the [GHG Emission](https://docs.carbonhub.xyz/API-Reference/emissions.html) doc for more details on items available.
###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| item | string | **Required:** The item name. |
| region   | string | **Required:** Region in which the item is used. |
| emission   | number | **Required:** The quantity of emission recorded. |

**Example**
```JSON
{
        "item": "lamp",
        "region": "ohio",
        "emission": 91
}
```
`200` - **Response**
```JSON
{
    "success": true,
    "quantity": 2.015314173084483,
    "note": "This is a estimate for the quantity of lamp that could be the cause of the emission provided."
}
```
`400` - **Error** 
```JSON
{
    "success": false,
    "err": err
}
```
{% common %}
```
POST /v1/quantity
```
{% sample lang="Bash" %}
```Bash
#use your API key here

curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
        "item": "lamp",
        "region": "ohio",
        "emission": 91
}' 'https://www.carbonhub.xyz/v1/quantity'
```
{% sample lang="python" %}
```Python
import requests
import json

def getQuantity(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'https://www.carbonhub.xyz/v1/quantity'
data = {
        "item": "lamp",
        "region": "ohio",
        "emission": 91
}
#use your api key here
headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
}
print getQuantity(url,data,headers)
```
{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getQuantity(url,data,headers){
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
    
let url = "https://www.carbonhub.xyz/v1/quantity",
    data = {
        "item": "lamp",
        "region": "ohio",
        "emission": 91
},
    //use your api key here
    headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getQuantity(url,data,headers); 
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

public class getQuantity {
    public static void main(String[] args) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost("https://www.carbonhub.xyz/v1/quantity");

        // Create some NameValuePair for HttpPost parameters
        List<NameValuePair> data = new ArrayList<>(3);
        data.add(new BasicNameValuePair("item", "lamp"));
        data.add(new BasicNameValuePair("region", "ohio"));
        data.add(new BasicNameValuePair("emission", Integer.toString(91)));
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
