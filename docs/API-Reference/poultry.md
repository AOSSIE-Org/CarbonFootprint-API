# Poultry
{% method %}
This route enables you to find GHG emissions for different type of Poutry meat production. In this we consider the factors like Production emission, Water loss factor, Moisture loss factor, Post-farmgate emissions in different conditions according to region in which they are found. The different poultry type can be found [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/raw_data/poultry.json).
###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| type   | string | **Required:** The type of the poultry meat(and egg). Type which are currently supported [are](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/raw_data/poultry.json)|
| region   | string | Region in which the poultry meat(and egg) is produced. By default we use average of all regions. |
| quantity   | number | The weight(number in case of egg) of poultry meat in production. By default we use 1 kg(1 quantity for egg)|

**Example**
```JSON
{
  "type":"Broiler chicken",
  "region":"British columbia",
  "quantity":3
}
```
`200` - **Response**
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 20.647125
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
POST /v1/poultry
```
{% sample lang="Bash" %}
```Bash
#use your API key here

curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
    "type":"Broiler chicken",
    "region":"British columbia",
    "quantity":3
}' 'https://www.carbonhub.org/v1/poultry'
```
{% sample lang="python" %}
```Python
import requests
import json

def getPoultryEmissions(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'https://www.carbonhub.org/v1/poultry'
data = {
    "type":"Broiler chicken",
    "region":"British columbia",
    "quantity":3
}
#use your api key here
headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
}
print getPoultryEmissions(url,data,headers)
```
{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getPoutryEmissions(url,data,headers){
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
    
let url = "https://www.carbonhub.org/v1/poultry",
    data = {
    "type":"Broiler chicken",
    "region":"British columbia",
    "quantity":3
    },
    //use your api key here
    headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getPoultryEmissions(url,data,headers); 
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

public class getPoultryEmissions {
    public static void main(String[] args) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost("https://www.carbonhub.org/v1/poultry");

        // Create some NameValuePair for HttpPost parameters
        List<NameValuePair> data = new ArrayList<>(3);  
        data.add(new BasicNameValuePair("type", "Broiler chicken"));
        data.add(new BasicNameValuePair("region", "British columbia"));
        data.add(new BasicNameValuePair("quantity", Integer.toString(3)));

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
```

{% common %}
{% endmethod %}
