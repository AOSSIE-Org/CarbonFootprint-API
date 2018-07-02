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
    "required": ["appliance","type","region","quantity","running_time"],
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
    "required":["item","region","quantity","unit"],
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
    "required":["type","region","quantity"],
    "properties": {
        "type": { type: "string" },
        "region": { type: "string" },
        "quantity": { type: "string" }
    } 
},
{   
    "title":"Quantity",
    "type": "object",
    "required": ["item","region","emission"],
    "properties": {
        "item": { type: "string" } ,
        "region": { type: "string" } ,
        "emission": { type: "string" }
    }
},
{   "title":"Flight",
    "type": "object",
    "required": ["origin","destination","type","model"],
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
    "required": ["type","origin","destination"],
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
    "required": ["type","origin","destination"],
    "properties": {
            "type": { type:"string" },
            "origin": { type:"string" },
            "destination": { type:"string" },
            "passengers": { type:"string" }
    }
}]

export default schemaArray;