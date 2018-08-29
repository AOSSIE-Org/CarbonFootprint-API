# Sector Endpoint

{% method %}
This route enables you to find global emissions for different types of sectors for a certain country. The sectors included are:

| | | |
| - | - | - |
| Energy | Industry | Waste |

###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| item | string | **Required:** The name of sector.|
| region | string | **Required:** The country whose emissions are to be calculated. |
**Example**
```JSON
{
    "item":"energy",
    "region":"India"
}
```
`200` - **Response**
```JSON
{
    "success": true,
    "quantity": 1296650,
    "unit": "gigagrams",
    "note": "This is an estimate for the quantity of energy that could be the cause of emission provided."
}
```
`400` - **Error** 
```JSON
{
    "success": false,
    "error": "Unable to find sector emissions for item type invalid_sector in India"
}
```
{% common %}
```
POST /v1/sector
```
{% sample lang="Bash" %}
```Bash
#use your API key here

curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
    "item":"energy",
    "region":"India"
}' 'https://www.carbonhub.xyz/v1/sector'
```
{% sample lang="python" %}
```Python
import requests
import json

def getSectorEmission(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'https://www.carbonhub.xyz/v1/sector'
data = {
    "item":"energy",
    "region":"India"
}
#use your api key here
headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
}
print getSectorEmission(url,data,headers)
```
{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getSectorEmission(url,data,headers){
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
    
let url = "https://www.carbonhub.xyz/v1/sector",
    data = {
    "item":"energy",
    "region":"India"
    },
    //use your api key here
    headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getSectorEmission(url,data,headers); 
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

public class getSectorEmission {
    public static void main(String[] args) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost("https://www.carbonhub.xyz/v1/sector");

        // Create some NameValuePair for HttpPost parameters
        List<NameValuePair> data = new ArrayList<>(2);
        data.add(new BasicNameValuePair("item", "energy"));
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