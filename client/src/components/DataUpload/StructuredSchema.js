const schemaArray = [
    {
    "title": "Structured Data",
    "type": "number",
    "enum": [1, 2, 3, 4, 5, 6, 7],
    "enumNames": ["Appliances", "Emissions", "Poultry", "quantity", "flight", "vehicle", "trains"]
},
{
    "title": "Appliances Data",
    "type": "object",
    "properties": {
        "appliance": { type: "string" },
        "type": { type: "string" },
        "region": { type: "string" },
        "quantity": { type: "string" },
        "runnning_time": { type: "string" }
    }
},
{
    "title": "Emissions Data",
    "type": "object",
    "properties": {
        "item": { type: "string" },
        "region": { type: "string" },
        "unit": { type: "string" },
        "quantity": { type: "string" }
    }
},
{
    "title": "Poultry Data",
    "type": "object",
    "properties": {
        "type": { type: "string" },
        "region": { type: "string" },
        "quantity": { type: "string" }
    } 
},
{   
    "title":"Quantity",
    "type": "object",
    "properties": {
        "item": { type: "string" } ,
        "region": { type: "string" } ,
        "emission": { type: "string" }
    }
},
{   "title":"Flight",
    "type": "object",
    "properties": {
        "origin": { type: "string" } ,
        "destination": { type: "string" },
        "type": { type: "string" },
        "model": { type: "string" },
        "passengers": {type: "string"}
    }
}   ,
{   "title": "Vehicle",
    "type": "object",
    "properties": {
            "type": { type:"string" },
            "origin": { type:"string" },
            "destination": { type:"string" },
            "mileage": { type:"string" },
            "mileage_unit": { type:"string" }
    }
},
{   "title":"Trains",
    "type": "object",
    "properties": {
            "type": { type:"string" },
            "origin": { type:"string" },
            "destination": { type:"string" },
            "passengers": { type:"string" }
    }
}]

export default schemaArray;