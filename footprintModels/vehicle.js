/**
 * Module for the Carbonfootprints 
 * Get carbonfootprints by distance
 * for vehicles by type & engine(not yet)
 *
 */

var csv = require('csvtojson').Converter;
var fs = require('fs');

// fs.createReadStream( __dirname + '/new.csv')
//   .pipe(stream)
//   .on('data', function (data) {
//     console.log(data);
// });


/**
 * Vehicles namespace.
 * @constructor
 */

var Vehicles = function(){
    this.type = "mini";
    this.typeOption = [
        'mini',
        'superMini',
        'lowerMedium',
        'upperMedium',
        'executive',
        'luxury',
        'sports',
        'dualPurpose',
        'mpv'
    ];
    this.engineOption = [
    ];
    this.footprintsFromEngine = {

    }
}

/**
* 1 Imperial Gallon to Litres
* @const
*/

Vehicles.IMPGAL_TO_L = 4.54609;

/**
* 1 US Gallon to Litres
* @const
*/

Vehicles.USGAL_TO_L = 3.785411784;

/**
* 1 Mile to Kilometer
* @const
*/

Vehicles.MI_TO_KM = 1.609344;

/**
* 1 Kilometer to Mile
* @const
*/

Vehicles.KM_TO_MI = 0.621371;

/**
* 1 Foot to kilometers
* @const
*/

Vehicles.FT_TO_KM = 0.0003048;

/**
* 1 Kilometer to Foot
* @const 
*/

Vehicles.KM_TO_FT = 0.0003048; 

/*
* 1 Kilogram to Pounds
* @const
*/

Vehicles.KG_TO_LBS = 2.204622621848775;

/*
* Exporting the module to main app(wherever)
*/

Vehicles.prototype.massConversion = {
        "kilograms": 1,
        "pounds" : Vehicles.KG_TO_LBS,
        "grams" : 1000
    };
    
Vehicles.prototype.distanceConversion = {
        "foots": Vehicles.KM_TO_FT,
        "miles" : Vehicles.KM_TO_MI,
        "kilometers" : 1
    }


    Vehicles.prototype.footprintsFromTypes = function(type,fuel,gas){
        return new Promise((resolve,reject)=>{
            var csvConverter = new csv({});
                csvConverter.on("end_parsed",(data)=>{
                    console.log(data);
                    for(x in data){
                        
                        if(data[x].type == type) {
                            console.log(data[x].type);
                            if(data[x][gas + fuel]) resolve(data[x][gas+fuel])
                            else reject({error:"fuel",throw:"fuel or gas is not known. Please refer to documentation %%%% for using this field"});
                        }
                }
                });
                fs.createReadStream(__dirname + '/new.csv')
                    .pipe(csvConverter)
                
            // fs.createReadStream( __dirname + '/new.csv')
            //     .pipe(stream)
            //     .on('json', function (data) {
            //         console.log(data);
            //         for(x in data){
                        
            //             if(data[x].type == type) {
            //                 console.log("came inside the function")
            //                 if(data[x][fuel + gas]) resolve(data[x][fuel+gas])
            //                 else reject({error:"fuel",throw:"fuel or gas is not known. Please refer to documentation %%%% for using this field"});
            //             }
            //     }
            // });
            //     reject({error:"type",throw:"type is not known. Please refer to documentation %%%% for using this field"});
        })
    }

    Vehicles.prototype.convertFootprint = function({distanceType,footprintType}){
        
        return new Promise((resolve,reject)=>{
            console.log(distanceType);
            (this.distanceConversion[distanceType])? d = this.distanceConversion[distanceType] : reject({error:"DistanceType",throw:"Distance Type is not known. Please refer to documentation %%%%% for using this field"});
            (this.massConversion[footprintType])? f = this.massConversion[footprintType]: reject({error:"FootprintType",throw:"Footprint Type is not known. Please refer to documentation %%%%% for using this field"});
            result = f/d;
            console.log(result);
            resolve(result.toFixed(6)); 
        })
    } 


    /**
    * return a Promise which on resolve results footprint
    * @param object
    * @param {string} type
    * @param {string} engine
    * @param {string} fuel  
    * @param {string} gas
    * @param {number} distance
    * @return {object}
    */

    Vehicles.prototype.getData = function({type,engine,fuel,gas,distance,resultIn}){
        console.log(this.type);
        console.log("Everything seems fine till now");
        let result = 0;
        if(type){
            return new Promise((resolve,reject) => {
                    console.log(resultIn);
                    this.convertFootprint(resultIn).then(result => {
                        this.footprintsFromTypes(type,fuel,gas).then((data)=>{
                            footprints = (result*data*distance).toFixed(6);
                            resolve({result:footprints,resultIn:resultIn}); 
                        }).catch(err =>{
                            reject(err);
                        });
                }).catch(err => {
                    reject(err);
                });
        })
    }
    }

module.exports  = Vehicles

