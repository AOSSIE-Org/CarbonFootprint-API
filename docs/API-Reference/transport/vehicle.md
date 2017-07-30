# Vehicle Endpoint

{% method %}
This route enables you to find GHG emissions for a number of fuels.The distance is calculated using [Google Map Distant Matrix API](https://developers.google.com/maps/documentation/javascript/distancematrix). The fuels that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint/blob/master/Source/Core/core/resources/fuels.json). 

**Example**
```JSON
{
    "type": "Petrol",
    "origin": "Bhubaneswar",
    "destination": "Cuttack",
    "mileage": 50,
    "mileage_unit": "km/L"
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
{% sample lang="http" %}
```
POST /v1/vehicle
```
**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| type | string | **Required:** The fuel type used by the vehicle.|
| origin    | string | **Required:** Origin of the journey. |
| destination   | string | **Required:** Destination of the journey. |
| mileage    | string | The fuel efficiency of the vehicle i.e. distance travelled per unit of fuel. The default value is 20. |
| mileage_unit     | string | The unit of mileage. The default sets to be 'km/L' |


{% endmethod %}
