# GHG Emissions

{% method %}
This route enables you to find GHG emissions for things that can be directly related to emissions.
Currently supported items-

### 1. Electricity - 
The emisson route can be requested to find emission for any country for per kilowatt of electricity consumed. It can also deliver components of emission like generation and transmission & dissipation when queried with item names `generation` and `td` respectively.The data source for this is [here](https://www.google.co.in/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwihzNKT6MLUAhVLs48KHdzqCbMQFggsMAA&url=https%3A%2F%2Fecometrica.com%2Fassets%2FElectricity-specific-emission-factors-for-grid-electricity.pdf&usg=AFQjCNEJ8JPRvugX-uXAJwZEXi890P5XgA&sig2=9Q_msg2FZeRTGmzXduSXsg). The region that is unavailable results in returning the emission for the `Default` region which is calculated as a average of the whole data.

Sample Request JSON


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
    "error": "Unable to find component alpha for Default"
}
```    

### 2. Airplane fuel -
Airplane fuel converts the distance flown by a particular air plane to corresponing CO2 emission.

Sample request JSON

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
    "error": "Unable to find component alpha for Default"
}
```
### 3. Vehicle Fuel - 
Emission route can be requested with fuel quantity and type and unit , to return the GHG emission generated on the consumption of the same.The fuels that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint/blob/master/Source/Core/core/resources/fuels.json). 

Sample Request JSON

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
    "error": "Unable to find component alpha for Default"
}
```
### 4. Trains -
Emission route can provide you with the emission generated from a train journey, provided with the distance of the journey.Here the item is the the train type and multiply signifies the number of passengers.

Sample request JSON

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
    "error": "Unable to find component alpha for Default"
}
```
### 5. Trees - 
Emission route can be requested with tree name and the number of years to find out the CO2 emisson from it per year.The trees that we currently support are listed [here](https://gitlab.com/aossie/CarbonFootprint/blob/master/Source/Core/core/resources/trees.json). 

Sample Request JSON

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
        "CO2": 26.9
    },
    "unit": "kg"
}
```
`400` - Error 
```JSON
{
    "success": false,
    "error": "Unable to find component alpha for Default"
}
```



{% sample lang="http" %}
```
POST /v1/vehicle
```
**Parameters**

| Name        | Type           | Description  |
| ------------- |-------------| -----|
| item<br><span style="color:red">_required_ </span>   | string | The name of the item for which emission is to be found.|
| region<br><span style="color:red">_required_ </span>     | string | Distance travelled by the vehicle. |
| quantity  <br><span style="color:red">_required_ </span>   | number | The number of units of the item for which emissions are to be calculated. |
| unit  | string | The unit of the element for which emissions are to be calculated.  |
| multiply  | number | If emissions are to be found for multiple elements.  |

{% endmethod %}
