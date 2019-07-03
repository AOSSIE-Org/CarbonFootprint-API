const Emission = require('../models/emissionModel');
const Helper = require('./helperFunctions');

const getTreesReverseLookup = (emissions, relativeLocation) => new Promise((resolve, reject) => {
    const treeMatch = {
      section: 'trees',
      item: '',
      quantity: 0,
      unit: ''
    };
    Emission.aggregate(
      [
        {
          $match: {
            'categories.0': 'trees',
          },
        },
        {
          $sample: {
            size: 1,
          },
        },
      ],
      (err, match) => {
        if (!err && match) {
          let matchedQuantity = match[0].components[0].quantity;
          let targetQuantity;
          if (matchedQuantity < 0) matchedQuantity = -1 * matchedQuantity;
          targetQuantity = emissions.CO2 / matchedQuantity;
          treeMatch.item = match[0].item;
          treeMatch.unit = match[0].unit;
          treeMatch.quantity = targetQuantity;
          if (match[0].region && match[0].region !== 'Default') treeMatch.region = match[0].region;
          resolve(treeMatch);
        } else reject(err);
      },
    );
  });

const getVehiclesReverseLookup = (emissions, relativeLocation) => new Promise((resolve, reject) => {
    const vehicleMatch = {
      section: 'vehicles',
      source: '',
      sourceState: '',
      destination: '',
      destinationState: '',
      mileage: 0,
      distance: 0,
    };
    const vehicleDefault = 2.328; // petrol default.
    let destinationCity;
    let destinationState;
    let distance;
    let newMileage;
    let noOfLitres;
    const geoDetails = Helper.geodecodeFromLatLon(
      relativeLocation.lat,
      relativeLocation.lng,
    );
    geoDetails
      .then((val) => {
        const countryCityDataPath = `../../../raw_data/cities/${val.countryCode}.json`;
        const cityList = require(countryCityDataPath);
        const noOfCities = Object.keys(cityList).length;
        do {
          destinationCity = cityList[Helper.getRandomNumber(0, noOfCities)];
          distance = Helper.getDistanceFromLatLon(
            relativeLocation.lat,
            relativeLocation.lng,
            destinationCity.lat,
            destinationCity.lng,
          );
          noOfLitres = emissions.CO2 / vehicleDefault;
          newMileage = distance / noOfLitres;
          if (
            destinationCity.name !== val.city
            && (newMileage > 10 && newMileage < 30)
          ) {
            const geoDetailsDest = Helper.geodecodeFromLatLon(
              destinationCity.lat,
              destinationCity.lng,
            );
            geoDetailsDest
              .then((details) => {
                destinationState = details.state;
                vehicleMatch.source = val.city;
                vehicleMatch.sourceState = val.state;
                vehicleMatch.destination = destinationCity.name;
                vehicleMatch.destinationState = destinationState;
                vehicleMatch.mileage = newMileage;
                vehicleMatch.distance = distance;
                resolve(vehicleMatch);
              })
              .catch((err) => {
                vehicleMatch.source = val.city;
                vehicleMatch.sourceState = val.state;
                vehicleMatch.destination = destinationCity.name;
                vehicleMatch.mileage = newMileage;
                vehicleMatch.distance = distance;
                resolve(vehicleMatch);
              });
            break;
          }
        } while (true);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getTrainReverseLookup = (emissions, relativeLocation) => new Promise((resolve, reject) => {
    const trainMatch = {
      section: 'trains',
      source: '',
      destination: '',
      passengers: 0,
      distance: 0,
    };
    const results = Helper.nearbyTrainStations(relativeLocation);
    results
      .then((val) => {
        const sourceName = val[0].name;
        const sourceLocation = val[0].location;
        // We currently use the railcar type by default since it's the type that is most
        // relatable. Hardcoding this for now since obtaining this from the DB is pretty
        // expensive for this already expensive operation.
        const railcarDefault = 0.0412;
        const matches = [];
        for (let i = 1; i < val.length; i++) {
          const destinationLocation = val[i].location;
          const destinationName = val[i].name;
          const interDistance = Helper.getDistanceFromLatLon(
            sourceLocation.lat,
            sourceLocation.lng,
            destinationLocation.lat,
            destinationLocation.lng,
          );
          const noOfPassengers = Math.round(
            emissions.CO2 / (railcarDefault * interDistance),
          );
          const singleMatch = {
            source: sourceName,
            destination: destinationName,
            distance: interDistance,
            passengers: noOfPassengers,
            location: destinationLocation,
          };
          matches.push(singleMatch);
        }

        if (matches.length > 1) {
          const chosenOne = Helper.getRandomNumber(1, matches.length - 1);
          const trainSourceLocation = sourceLocation;
          const trainDestLocation = matches[chosenOne].location;
          const railDistance = Helper.railDistanceInCoordinates(
            trainSourceLocation,
            trainDestLocation,
          );
          railDistance
            .then((val) => {
              const newPassengerCount = Math.round(
                emissions.CO2 / (railcarDefault * val),
              );
              trainMatch.source = sourceName;
              trainMatch.destination = matches[chosenOne].destination;
              trainMatch.passengers = newPassengerCount;
              trainMatch.distance = val;
              resolve(trainMatch);
            })
            .catch((err) => {
              reject(`Failed to get rail distance: ${err}`);
            });
        } else {
          reject('Not many stations around the given location');
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const findMatch = (emissions, section, relativeLocation) => {
  const supportedSections = {
    section1: 'trees',
    section2: 'trains',
    section3: 'vehicles',
    section4: 'all'
  };
  return new Promise((resolve, reject) => {
    // We are only concerned with CO2 emission for now
    if (Object.values(supportedSections).includes(section) && emissions.CO2) {
      if (section === 'trains') {
        const trainResponse = {
          train: '',
          section: 'trains'
        };
        getTrainReverseLookup(emissions, relativeLocation)
          .then((result) => {
            delete result.section;
            trainResponse.match = result;
            resolve(trainResponse);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (section === 'vehicles') {
        const vehicleResponse = {
          match: '',
          section: 'vehicles'
        };
        getVehiclesReverseLookup(emissions, relativeLocation)
          .then((result) => {
            delete result.section;
            vehicleResponse.match = result;
            resolve(vehicleResponse);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (section === 'trees') {
        const treeResponse = {
          match: '',
          section: 'trees'
        };
        getTreesReverseLookup(emissions, relativeLocation)
          .then((result) => {
            delete result.section;
            treeResponse.match = result;
            resolve(treeResponse);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (section === 'all') {
        const sectionPromises = [];
        const reflect = p => p.then(
            match => ({
              status: 'success',
              match,
              section: match.section,
            }),
            error => ({
              error,
              status: 'failure'
            }),
          );
        sectionPromises.push(
          getTrainReverseLookup(emissions, relativeLocation),
        );
        sectionPromises.push(
          getVehiclesReverseLookup(emissions, relativeLocation),
        );
        sectionPromises.push(
          getTreesReverseLookup(emissions, relativeLocation),
        );
        Promise.all(sectionPromises.map(reflect))
          .then((results) => {
            for (let i = 0; i < results.length; i++) {
              if (results[i].match) {
                // Cleanup unwanted section key
                delete results[i].match.section;
              }
            }
            resolve(results);
          })
          .catch((err) => {
            reject(err);
          });
      }
    } else reject('invalid category');
  });
};

exports.reverseFind = async function (emissions, section, relativeLocation) {
  const matches = await findMatch(emissions, section, relativeLocation);
  return matches;
};
