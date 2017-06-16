var Emission = require('../models/emissionModel');

let interpolate = (l1, l2, d) => {
    for(var x = 0; x < l1.length; x++){
        if(d >= l1[x] && d < l1[x+1] && x < l1.length - 1){
            l1Floor = l1[x]
            l1Ceil = l1[x+1];
            l2Floor = l2[x]
            l2Ceil = l2[x+1];
            return l2Floor + ((l2Ceil - l2Floor)/(l1Ceil - l1Floor))*(d - l1Floor)
        }
        if(d >= l1[l1.length-1]){
            let slope=Math.abs((l2[l2.length-1]-l2[l2.length-2])/(l1[l1.length-1]-l1[l1.length-2]));
            return l2[l2.length-1]+(slope*(d-l1[l1.length-1]))
        }
        if(d <= l1[0]){
            let slope=Math.abs((l2[1]-l2[0])/(l1[1]-l1[0]));
            console.log(slope*d)
            return slope*d
        }
    }
}

/*
 * A function to calculate the emissions of a component.
 * Refer to the Emission schema for more information on the components.
 */
let find = (component, region, quantity) => {
    var sum = 0; // emissions accumulator
    return new Promise((resolve, reject) => {
        // find the component in the database
        Emission.findOne({ 
            $or: [{ 
                'item': new RegExp(`^${component}$`, "i"), 
                'region': new RegExp(`^${region}$`, "i") 
            }, 
            // find the default values if a particular region is not found
            { 
                'item': new RegExp(`^${component}$`, "i"), 
                'region': 'Default' 
            }]
        }, (err, item) => {
            // if component is found
            if (!err && item) {
                console.log(`\nItem name: ${item.item} :: Region: ${item.region}`);
                // if component type is atomic return its CO2 emissions
                if (item.components[0].name == 'CO2' ||
                    item.components[0].name == 'CH4' ||
                    item.components[0].name == 'N2O') {
                    sum += (quantity * item.components[0].quantity[0]);
                    console.log(`Emissions: ${sum} ${item.components[0].unit}`);
                    resolve(sum);
                }
                // if component type is complex, recurse to find its atomic components
                else {
                    let numOfComponents = item.components.length; // number of subcomponents
                    (async function(){
                        for (let i = 0; i < numOfComponents; i++) {
                            if(item.components[i].quantity.length > 1){
                                let getInterpolatedQuantity = await interpolate(item.quantity, item.components[i].quantity, quantity);
                                console.log(`Interpolated value= ${getInterpolatedQuantity}`)
                                await find(item.components[i].name, region, getInterpolatedQuantity)
                                        .then((emis) => {
                                            sum += emis;
                                        })
                                        .catch((err) => console.log(err));
                            }
                            else {
                                await find(item.components[i].name, region, item.components[i].quantity[0])
                                        .then((emis) => {
                                            sum += emis;
                                        })
                                        .catch((err) => console.log(err));
                            }
                        }
                    })().then(() => {
                        if(item.calculationMethod == 'interpolation'){
                            resolve(sum);
                        }
                        else resolve(quantity * sum);
                    })
                    .catch((err) => console.log(err));
                }
            } 
            // return an error if component is not found
            else reject(`Unable to find component ${component} for ${region}`);
        });
    });
}

exports.calculate = (a, b, c) => find(a, b, c);
    // console.log(req.body);
    // let itemName = req.body["item"];
    // let region = req.body["region"] || "Default";
    // let quantity = req.body["quantity"] || 1;

    // find(itemName, region, quantity)
    //     .then((sum) => {
    //         console.log(`\nTotal Emissions: ${sum}`);
    //         res.status(200).json({
    //             success: true,
    //             emissions: parseFloat(sum.toFixed(10))
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(`Error: ${err}`);
    //         res.json({
    //             success: false,
    //             err: err
    //         });
    //     });
// }
