const Emission = require('../models/emissionModel');
const spline = require('cubic-spline');
const Helper = require('./helperFunctions');
let interpolate = (l1, l2, d) => {
    for(let x = 0; x < l1.length; x++){
        if(d >= l1[x] && d < l1[x+1] && x < l1.length - 1){
            return spline(d,l1,l2)
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

let findMatch = (emissions, section, relativeLocation) => {
    console.log(`Given emissions: ${emissions}`);
    let supportedSections = { "section1": "trees", "section2":"trains", "section3":"vehicles"};
    return new Promise((resolve, reject) => {
        // We are only concerned with CO2 emission for now
        if(Object.values(supportedSections).includes(section) && emissions.CO2) {
            if(section === "trains") {
                let trainMatch = {
                    source: "",
                    destination: "",
                    passengers: 0,
                    distance: 0
                }
                console.log(`Relative location: ${JSON.stringify(relativeLocation)}`);
                let results = Helper.nearbyTrainStations(relativeLocation);
                results
                  .then((val) => {
                    //console.log(`results obtained`);
                    //console.log(`results : ${JSON.stringify(val)}`);
                    let sourceName = val[0].name;
                    let sourceLocation = val[0].location;
                    // We currently use the railcar type by default since it's the type that is most
                    // relatable. Hardcoding this for now since obtaining this from the DB is pretty
                    // expensive for this already expensive operation.
                    let railcarDefault = 0.0412;
                    var matches = [];
                    for(let i = 1; i < val.length; i++) {
                        let destinationLocation = val[i].location;
                        let destinationName = val[i].name;
                        let interDistance = Helper.getDistanceFromLatLon(sourceLocation.lat, sourceLocation.lng,
                                destinationLocation.lat, destinationLocation.lng);
                        let noOfPassengers = Math.round((emissions.CO2) / (railcarDefault * interDistance));
                        let singleMatch = {
                            source: sourceName,
                            destination: destinationName,
                            distance: interDistance,
                            passengers: noOfPassengers,
                            location: destinationLocation
                        }
                        matches.push(singleMatch);
                    }

                    if(matches.length > 1) {
                        let chosenOne = Helper.getRandomNumber(1, matches.length-1);

                        let trainSourceLocation = sourceLocation;
                        let trainDestLocation = matches[chosenOne].location;
                        console.log(`trainSourceLocation: ${JSON.stringify(trainSourceLocation)}`);
                        console.log(`trainDestLocation: ${JSON.stringify(trainDestLocation)}`);
                        let railDistance = Helper.distanceInCoordinates(trainSourceLocation, trainDestLocation, 'rail');
                        railDistance
                            .then((val) => {
                                let newPassengerCount = Math.round((emissions.CO2) / (railcarDefault * val));
                                trainMatch.source = sourceName;
                                trainMatch.destination = matches[chosenOne].destination;
                                trainMatch.passengers = newPassengerCount;
                                trainMatch.distance = val;
                                resolve(trainMatch);
                            }).catch((err) => {
                                reject(`Failed to get rail distance: ${err}`);
                            });
                    }
                    else {
                        reject(`Not many stations around the given location`);
                    }
                }).catch((err) => {
                    reject(err);
                });
            }
            else if(section === "vehicles") {
                let vehicleMatch = {
                    source: "",
                    destination: "",
                    mileage: 0,
                    distance: 0
                }
                let vehicleDefault = 2.328; // petrol default.
                let trainStationsNearby = Helper.nearbyTrainStations(relativeLocation);
                trainStationsNearby
                    .then((val) => {
                    //console.log(`results obtained`);
                    //console.log(`results : ${JSON.stringify(val)}`);
                    let sourceName = val[0].name;
                    let sourceLocation = val[0].location;
                    var matches = [];
                    for(let i = 1; i < val.length; i++) {
                        let destinationLocation = val[i].location;
                        let destinationName = val[i].name;
                        let singleMatch = {
                            source: sourceName,
                            destination: destinationName,
                            location: destinationLocation
                        }
                        matches.push(singleMatch);
                        //console.log(`Matched: ${JSON.stringify(matches)}`);
                    }

                    if(matches.length > 1) {
                        let chosenOne = Helper.getRandomNumber(1, matches.length-1);
                        let trainSourceLocation = sourceLocation;
                        let trainDestLocation = matches[chosenOne].location;
                        console.log(`trainSourceLocation: ${JSON.stringify(trainSourceLocation)}`);
                        console.log(`trainDestLocation: ${JSON.stringify(trainDestLocation)}`);
                        let drivingDistance = Helper.distanceInCoordinates(trainSourceLocation, trainDestLocation, 'driving');
                        drivingDistance
                            .then((val) => {
                                let noOfLitres = emissions.CO2 / vehicleDefault;
                                let newMileage = val / noOfLitres;
                                if(newMileage > 4) {
                                    vehicleMatch.source = sourceName;
                                    vehicleMatch.destination = matches[chosenOne].destination;
                                    vehicleMatch.mileage = newMileage;
                                    vehicleMatch.distance = val;
                                    resolve(vehicleMatch);
                                }
                                else {
                                    reject(`Emissions too high. Any local vehicle travel cannot produce these much emissions`);
                                }
                            }).catch((err) => {
                                reject(`Failed to get rail distance: ${err}`);
                            });
                    }
                    else {
                        reject(`Not many stations around the given location`);
                    }
                }).catch((err) => {
                    reject(err);
                });
            }
            else {
                let treeMatch = {
                    "item": "",
                    "quantity": 0,
                    "unit": ""
                }
                Emission.aggregate([
                    { $match: {"categories.0": section} }, { $sample: {size:1}}
                ], (err, match) => {
                    if(!err && match) {
                        console.log(`Match Item: ${match[0].item}`);
                        console.log(`Target : ${emissions.CO2}`);
                        let matchedQuantity = match[0].components[0].quantity;
                        let targetQuantity;
                        if(matchedQuantity < 0)
                            matchedQuantity = -1 * matchedQuantity;
                        targetQuantity = emissions.CO2 / matchedQuantity;
                        treeMatch.item = match[0].item;
                        treeMatch.unit = match[0].unit;
                        treeMatch.quantity = targetQuantity;
                        if(match[0].region && match[0].region !== 'Default')
                            treeMatch.region = match[0].region;
                        resolve(treeMatch);
                    }
                    else reject(err);
                });
            }
        }
        else reject(`invalid category`);
    });
}

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
        if(quantity<0) reject('quantity cannot be negative');
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
                                console.log(`Interpolated value = ${getInterpolatedQuantity}`);
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

exports.calculate = async function(itemName, region, quantity, multiply = 1){
    let emissions = await find(itemName, region, quantity);
    // round up the emission value upto 10 decimal points
    for(let i in emissions){
        emissions[i] = parseFloat((emissions[i]*multiply).toFixed(10));
        // remove CH4 or N2O key if emissions are zero
        if(!emissions[i] && i !== "CO2"){
            delete emissions[i];
        }
    }
    return emissions;
}

exports.reverseFind = async function(emissions, section, relativeLocation) {
	let matches = await findMatch(emissions, section, relativeLocation);
	return matches;
}
