const { expect } = require('chai');
const { describe } = require('mocha');
const { it } = require('mocha');

// importing functions that needs to be tested
const {
  getDistanceFromLatLon, distance, nearbyTrainStations, geodecodeFromLatLon,
} = require('../../api/v1/controllers/helperFunctions');
const { getEmissionsOfUser, createLog } = require('../../api/user/services/dailyEmissionServices');


describe('testing helper functions', () => {
  it('distance()=> should return distance between origin and destination', async () => {
    const result1 = await distance('delhi', 'mumbai');
    const result2 = await distance('false', 'data');
    expect(result1).to.equal(1426.753);
    expect(result2).to.equal(-1);
  });

  it('getDistanceFromLatLon()=> should calculate distance from latitude and longitude of place', () => {
    const result = getDistanceFromLatLon(4.74, -6.66, 39.40, -119.25);
    expect(result).to.equal(11573.767348098268);
  });

  it('nearbyTrainStations()=> should return all the nearby stations of a place by its latitude and longitude', async () => {
    let result = await nearbyTrainStations({
      lat: 37.4219806,
      lng: -122.0841979,
    });
    result = result.map(item => item.name);
    // eslint-disable-next-line no-unused-expressions
    expect(result).to.exist;
  });

  it('geodecodeFromLatLon()=> get info about place from its latitude and longitude', async () => {
    const result = await geodecodeFromLatLon({
      lat: 37.4219806,
      lng: -122.0841979,
    });
    expect(result.country).to.equal('Indonesia');
    expect(result.countryCode).to.equal('ID');
    expect(result.city).to.equal('Jatisar 2');
    expect(result.state).to.equal('Central Java');
  });
});


describe('To check whether user emissions are stored and fetched successfully', () => {
  it('createLog()=> should successfully save the emissions of user', async () => {
    const result = await createLog('testmail@aossie.com', 2675.21, new Date());
    expect(result.email).to.equal('testmail@aossie.com');
  });

  it('getEmissionsOfUser()=> should return emissions of a user', async () => {
    const result = await getEmissionsOfUser('testmail@aossie.com');
    expect(result[0].email).to.equal('testmail@aossie.com');
    // eslint-disable-next-line no-unused-expressions
    expect(result).to.exist;
  });
});
