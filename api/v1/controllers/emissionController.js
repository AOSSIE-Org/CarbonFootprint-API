var mongoose = require('mongoose');
var Emission = require('../models/emissionModel');

/*
 * A function to calculate the emissions of a component.
 * Refer to the Emission schema for more information on the components.
 */

let find = (component, region, quantity) => {
    var sum = 0; // emissions accumulator
    return new Promise((resolve, reject) => {
        // find the component in the database
        Emission.findOne({ $or:[ { 'item': new RegExp(`^${component}$`, "i"), 'region': new RegExp(`^${region}$`, "i") }, { 'item': new RegExp(`^${component}$`, "i"), 'region': 'Default' }]}, (err, item) => {
            // if component is found
            if (!err && item) {
                console.log(`\nItem name: ${item.item} :: Type: ${item.itemType} :: Region: ${item.region}`);
                // if component type is atomic return its CO2 emissions
                if (item.itemType == 'atomic') {
                    sum += (quantity * item.components[0].quantity);
                    console.log(`Emissions: ${sum} ${item.components[0].units}`);
                    resolve(sum);
                }
                // if component type is complex, recurse to find its atomic components
                else {
                    let numOfComponents = item.components.length; // number of subcomponents
                    (async function(){
                        for (let i = 0; i < numOfComponents; i++) {
                        await find(item.components[i].name, region, item.components[i].quantity)
                            .then((emis) => {
                                sum += emis;
                            })
                            .catch((err) => console.log(err));
                        }
                    })().then(() => resolve(quantity * sum));
                }
            } 
            // return an error if component is not found
            else reject(`Unable to find component ${component} for ${region}`);
        });
    });
}

exports.find = (req, res) => {
    console.log(req.body);
    find(req.body["item"],req.body["region"],req.body["quantity"])
        .then((sum) => {
            console.log(`\nTotal Emissions: ${sum}`);
            res.json({
                success: true,
                emissions: parseFloat(sum.toFixed(10))
            });
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
            res.json({
                success: false,
                err: err
            });
        });
}
