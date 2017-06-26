const Emission = require('../models/emissionModel');

const interpolate = (l1, l2, d) => {
    for(let x = 0; x < l1.length; x++){
        if(d >= l1[x] && d < l1[x+1] && x < l1.length - 1){
            let l1Floor = l1[x];
            let l1Ceil = l1[x+1];
            let l2Floor = l2[x];
            let l2Ceil = l2[x+1];
            return l2Floor + ((l2Ceil - l2Floor)/(l1Ceil - l1Floor))*(d - l1Floor)
        }
        if(d >= l1[l1.length-1]){
            let slope=Math.abs((l2[l2.length-1]-l2[l2.length-2])/(l1[l1.length-1]-l1[l1.length-2]));
            return l2[l2.length-1]+(slope*(d-l1[l1.length-1]))
        }
        if(d <= l1[0]){
            let slope=Math.abs((l2[1]-l2[0])/(l1[1]-l1[0]));
            return slope*d;
        }
    }
};

/*
 * A function to calculate the emissions of a component.
 * Refer to the Emission schema for more information on the components.
 */
let find = (component, region, quantity) => {
    let emissions = {
        'CO2': 0,
        'CH4': 0,
        'N2O': 0
    }; // emissions accumulator
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
                console.log(`Item name: ${item.item} :: Region: ${item.region}`);
                // if component type is atomic return it's emissions
                if (item.components[0].name === 'CO2' ||
                    item.components[0].name === 'CH4' ||
                    item.components[0].name === 'N2O') {
                    for(let component of item.components){
                        if (emissions.hasOwnProperty(component.name)) {
                            emissions[component.name] += (quantity * component.quantity[0]);
                            console.log(`Emissions ${component.name}: ${emissions[component.name]} kg`);
                        }
                    }
                    resolve(emissions);
                }
                // if component type is complex, recurse to find its atomic components
                else {
                    let numOfComponents = item.components.length; // number of subcomponents
                    (async function(){
                        for (let i = 0; i < numOfComponents; i++) {
                            if(item.components[i].quantity.length > 1){
                                let getInterpolatedQuantity = await interpolate(item.quantity, item.components[i].quantity, quantity);
                                console.log(`Interpolated value = ${getInterpolatedQuantity}`)
                                await find(item.components[i].name, region, getInterpolatedQuantity)
                                        .then((emis) => {
                                            for(let i in emis){
                                                emissions[i] += emis[i];
                                            }
                                        })
                                        .catch((err) => console.log(err));
                            }
                            else {
                                await find(item.components[i].name, region, item.components[i].quantity[0])
                                        .then((emis) => {
                                            for(let i in emis){
                                                emissions[i] += emis[i];
                                            }
                                        })
                                        .catch((err) => console.log(err));
                            }
                        }
                    })().then(() => {
                        if(item.calculationMethod === 'interpolation'){
                            resolve(emissions);
                        }
                        else {
                            for(let i in emissions){
                                emissions[i] *= quantity;
                            }
                            resolve(emissions);
                        }
                    })
                    .catch((err) => console.log(err));
                }
            } 
            // return an error if component is not found
            else reject(`Unable to find component ${component} for ${region}`);
        });
    });
}

exports.calculate = async function(a, b, c){
    let emissions = await find(a, b, c);
    // round up the emission value up to 10 decimal points
    for(let i in emissions){
        emissions[i] = parseFloat(emissions[i].toFixed(10));
        // remove CH4 or N2O key if emissions are zero
        if(!emissions[i] && i !== "CO2"){
            delete emissions[i];
        }
    }
    return emissions;
}

