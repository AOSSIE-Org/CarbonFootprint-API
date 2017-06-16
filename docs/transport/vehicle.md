# Vehicle Endpoint
This route enables you to find GHG emissions for a number of fuels.  

`/v1/vehicle`

Method - __POST__
```
{
    type:"Petrol",
    distance: 100,
    unit: "km",
    mileage: 50,
    mileage_unit: "km/L"
}
```
## Response Code
1. 200 - Valid Request
    ```
    {
        sucess: True,
        emissions: 4.65600
    }
    ```
2. 400 - Error 
    ```
    {
        success: False,
        error: 'Distance or Mileage cannot be less than zero'
    }
    ```



