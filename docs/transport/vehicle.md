# Vehicle Endpoint

{% method %}
This route enables you to find GHG emissions for a number of fuels. The fuels that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint/blob/master/Source/Core/core/resources/fuels.json). 

### Sample Request JSON
Method - __POST__
```JSON
{
    type:"Petrol",
    distance: 100,
    unit: "km",
    mileage: 50,
    mileage_unit: "km/L"
}
```
### Response Code
1. 200 - Valid Request
    ```JSON
    {
        "sucess": True,
        "emissions": {
            "CO2": 4.65600
            "unit": "kg"
    }
    ```
2. 400 - Error 
    ```JSON
    {
        "success": False,
        "error": 'Distance or Mileage cannot be less than zero'
    }
    ```
{% sample lang="http" %}
```
POST /v1/vehicle
```
**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| type<br><span style="color:red">_required_ </span>   | string | The fuel type used by the vehicle.|
| distance<br><span style="color:red">_required_ </span>     | number | Distance travelled by the vehicle. |
| unit     | string | Distance in SI unit. The default sets to 'km'. |
| mileage    | string | The fuel efficiency of the vehicle i.e. distance travelled per unit of fuel. The default value is 20. |
| mileage_unit     | string | The unit of mileage. The default sets to be 'km/L' |


{% endmethod %}
