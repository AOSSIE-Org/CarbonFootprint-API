const data = require('./electricty_emission.json');

console.log(`[`);
for (let i in data) {
    let obj = `{
        "item": "electricity",
        "region": "${data[i]["Country"]}",
        "quantity": 1,
        "units": "kg/kWh",
        "categories": ["electricity"],
        "components": [
            { "name": "generation", "quantity": 1, "units": "kWh" },
            { "name": "td", "quantity": 1, "units": "kWh" }
        ]
    },
	{
        "item": "generation",
        "region": "${data[i]["Country"]}",
        "quantity": 1,
        "units": "kWh",
        "categories": ["electricity"],
        "components": [
            { "name": "CO2", "quantity": ${data[i]["Generation-CO2"]}, "units": "kg CO2/kWh" },
            { "name": "CH4", "quantity": ${data[i]["Generation-CH4"]}, "units": "kg CH4/kWh" },
            { "name": "N20", "quantity": ${data[i]["Generation-N2O"]}, "units": "kg N20/kWh" }
        ]
    },
	{
        "item": "td",
        "region": "${data[i]["Country"]}",
        "quantity": 1,
        "units": "kWh",
        "categories": ["electricity"],
        "components": [
            { "name": "CO2", "quantity": ${data[i]["Td-CO2"]}, "units": "kg CO2/kWh" },
            { "name": "CH4", "quantity": ${data[i]["Td-CH4"]}, "units": "kg CH4/kWh" },
            { "name": "N20", "quantity": ${data[i]["Td-N2O"]}, "units": "kg N20/kWh" }
        ]
    },`

    console.log(obj);
}
console.log(`]`);

