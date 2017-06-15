// create electricity JSON using electricity emissions provided.

// Use command `node createElectricityJSON.js | cat > electricity.json` 
// to get a JSON file

const data = require('./electricty_emission.json');
 
console.log(`[
    {
        "item": "electricity",
        "region": "Default", 
        "quantity": 1,
        "units": "kWh",
        "categories": ["electricity"],
        "components": [
            { "name": "generation", "quantity": 1, "units": "kWh" },
            { "name": "td", "quantity": 1, "units": "kWh" }
        ]
    },`);
for (let i in data) {
    let obj = ` {
        "item": "generation",
        "region": "${data[i]["Country"]}",
        "quantity": 1,
        "units": "kWh",
        "categories": ["electricity"],
        "components": [
            { "name": "CO2", "quantity": ${data[i]["Generation-CO2"]}, "units": "kg CO2/kWh" },
            { "name": "CH4", "quantity": ${data[i]["Generation-CH4"]}, "units": "kg CH4/kWh" },
            { "name": "N2O", "quantity": ${data[i]["Generation-N2O"]}, "units": "kg N2O/kWh" }
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
            { "name": "N2O", "quantity": ${data[i]["Td-N2O"]}, "units": "kg N2O/kWh" }
        ]
    },`

    console.log(obj);
}
console.log(`]`);

