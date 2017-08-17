# GHG Emissions

{% method %}
###**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| item | string |**Required:** The name of the item for which emission is to be found.|
| region | string | **Required:** Distance traveled by the vehicle. |
| quantity | number | **Required:** The number of units of the item for which emissions are to be calculated. |
| unit  | string | The unit of the element for which emissions are to be calculated.  |
| multiply  | number | If emissions are to be found for multiple elements.  |

This route enables you to find GHG emissions for things that can be directly related to emissions.
Currently supported items-

### 1. Electricity - 
The emission route can be requested to find emission for any country for per kilowatt of electricity consumed. It can also deliver components of emission like generation and transmission & dissipation when queried with item names `generation` and `td` respectively.The data source for this is [here](https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwihzNKT6MLUAhVLs48KHdzqCbMQFggsMAA&url=https%3A%2F%2Fecometrica.com%2Fassets%2FElectricity-specific-emission-factors-for-grid-electricity.pdf&usg=AFQjCNEJ8JPRvugX-uXAJwZEXi890P5XgA&sig2=9Q_msg2FZeRTGmzXduSXsg). The region that is unavailable results in returning the emission for the `Default` region which is calculated as a average of the whole data.

__Sample Request JSON__


Method - __POST__
```JSON
{
    "item": "electricity",
    "region": "india",
    "unit": "kWh",
    "quantity": 1.564
}
```
**Response Code**

`200` - Valid Request
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 2.8164596816,
        "CH4": 0.000032794,
        "N2O": 0.0000424829
    },
    "unit": "kg"
}
```
`400` - Error 
```JSON
{
    "success": false,
    "error": err
}
```    

### 2. Airplane fuel -
Airplane fuel converts the distance flown by a particular air plane to corresponing CO2 emission.

__Sample request JSON__

Method-__POST__
```JSON
{
    "item": "airplane model A380",
    "unit": "nm",
    "quantity": 125
}
```
**Response Code**

`200` - Valid Request
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 18.39436
    },
    "unit": "kg"
}
```
`400` - Error 
```JSON
{
    "success": false,
    "error": err
}
```
### 3. Vehicle Fuel - 
Emission route can be requested with fuel quantity and type and unit , to return the GHG emission generated on the consumption of the same.The fuels that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint/blob/master/Source/Core/core/resources/fuels.json). 

__Sample Request JSON__

Method - __POST__
```JSON
{
    "item":"fuelPetrol",
    "quantity": 2,
    "unit": "L"
}
```
**Response Code**

`200` - Valid Request
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 4.656,
        "CH4": 0.005015,
        "N2O": 0.0125756
    },
    "unit": "kg"
}
```
`400` - Error 
```JSON
{
    "success": false,
    "error": err
}
```
### 4. Trains -
Emission route can provide you with the emission generated from a train journey, provided with the distance of the journey.Here the item is the the train type and multiply signifies the number of passengers.

__Sample request JSON__

Method-__POST__
```JSON
{
    "item":"railcars",
    "region":"Default",
    "quantity": 1000,
    "unit": "kg/km",
    "multiply": 3
}
```
**Response Code**

`200` - Valid Request
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 123.6
    },
    "unit": "kg"
}
```
`400` - Error 
```JSON
{
    "success": false,
    "error": err
}
```
### 5. Trees - 
Emission route can be requested with tree name and the number of years to find out the CO2 absorption from it per year.The trees that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint/blob/master/Source/Core/core/resources/trees.json). 

__Sample Request JSON__

Method - __POST__
```JSON
{
    "item":"Cherry",
    "region":"Default",
    "quantity": 1,
    "unit": "year"
}
```
**Response Code**

`200` - Valid Request
```JSON
{
    "success": true,
    "emissions": {
        "CO2": -26.9
    },
    "unit": "kg",
    "note": "A negative number for emissions signifies that the item absorbs CO2."
}
```
`400` - Error 
```JSON
{
    "success": false,
    "error": err
}
```
### 6. Appliances - 
Emission route can be requested with a appliance name and the number of units and no of hours to find out the CO2 emission for the running time.The appliances that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint-API/blob/master/raw_data/appliances.json). 

__Sample Request JSON__

Method - __POST__

This request is querying for the emission from a single Air conditioner running for 8 hours.
```JSON
{
    "item":"Air conditioner large",
    "region":"Africa",
    "unit":"kWh",
    "quantity":1,
    "multiply":8
}
```
**Response Code**

`200` - Valid Request
```JSON
{
    "success": true,
    "emissions": {
        "CO2": 21.5292882176,
        "CH4": 0.0003433984,
        "N2O": 0.0002508032
    },
    "unit": "kg"
}
```
`400` - Error 
```JSON
{
    "success": false,
    "error": err
}
```

{% common %}
```
POST /v1/emissions
```
{% sample lang="Bash" %}
```Bash
#use your API key here
curl -POST -H 'access-key: <apikey>' -H "Content-type: application/json" -d '{
    "item": "electricity",
    "region": "india",
    "unit": "kWh",
    "quantity": 1.564
}' 'https://www.carbonhub.xyz/v1/emissions'
```

{% sample lang="python"%}
```python
import requests
import json

def getEmissions(url,data,headers):
    r = requests.post(url,data = json.dumps(data),headers=headers)
    return r.content
url = 'https://www.carbonhub.xyz/v1/emissions'
data = {
    "item": "electricity",
    "region": "india",
    "unit": "kWh",
    "quantity": 1.564
}
#use your api key here
headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
}
print getEmissions(url,data,headers)
```
{% sample lang="nodejs" %}
```javascript
var request = require('request');

function getEmissions(url,data,headers){
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
    
let url = "https://www.carbonhub.xyz/v1/emissions",
    data = {
    "item": "electricity",
    "region": "india",
    "unit": "kWh",
    "quantity": 1.564
    },
    //use your api key here
    headers = {
    "access-key":"<apikey>",
    "Content-Type":"application/json"
    };

getEmissions(url,data,headers); 
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

public class getEmissions {
    public static void main(String[] args) {
        HttpClient client = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost("https://www.carbonhub.xyz/v1/emissions");

        List<NameValuePair> data = new ArrayList<>(4); 
        data.add(new BasicNameValuePair("item", "electricity"));
        data.add(new BasicNameValuePair("region", "india"));
        data.add(new BasicNameValuePair("unit", "kWh"));
        data.add(new BasicNameValuePair("quantity", 1.564));

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
