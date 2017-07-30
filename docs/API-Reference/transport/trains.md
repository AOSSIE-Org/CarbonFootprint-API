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
**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| type | string | **Required:** The fuel type used by the vehicle.|
| origin    | string | **Required:** Origin of the journey. |
| destination   | string | **Required:** Destination of the journey. |
| region    | string |  Origin of the journey. The default sets to 'Default'. |
| passengers    | number | The number of passengers travelling in the journey.The default sets to 1. |

{% endmethod %}
