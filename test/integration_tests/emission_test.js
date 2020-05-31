/* eslint-disable no-undef */
// Require the dev-dependencies
const supertest = require('supertest');
const sinon = require('sinon');
// eslint-disable-next-line no-unused-vars
const should = require('should');

process.env.NODE_ENV = 'test';
const app = require('../../app.js');
// eslint-disable-next-line import/order, import/no-unresolved
const Logger = require('@framework/Logger');

app.listen(3080);
require('dotenv').config();

// This agent refers to PORT where program is running.
const server = supertest.agent('http://localhost:3080');
const { API_TEST_KEY } = process.env;

// set test access-key in the header
// server.set('access-key', ACCESS_KEY)

// UNIT test begin
describe('API endpoint testing', () => {
  // to silence all the logs other than test checks
  before(() => {
    sinon.stub(Logger, 'info');
    sinon.stub(Logger, 'error');
    sinon.stub(Logger, 'debug');
  });

  describe('Emission endpoint tests', () => {
    it('should return correct values of emission for a sample country', done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'electricity',
          region: 'Africa',
          unit: 'kg CO2/kWh',
          quantity: 1,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.equal(0.840987821);
          done();
        });
    });

    it("should return default values of emission for a sample region that doesn't exist", done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'electricity',
          region: 'gotham',
          unit: 'kg CO2/kWh',
          quantity: 1,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.equal(0.752534108);
          done();
        });
    });

    it('should return correct values even if quantity is not 1', done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'electricity',
          region: 'india',
          unit: 'kg CO2/kWh',
          quantity: 1.564,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.equal(2.8164596816);
          done();
        });
    });

    it('should return correct values for atomic items also', done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'generation',
          region: 'albania',
          unit: 'kg CO2/kWh',
          quantity: 1.5,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.equal(0.013695132);
          done();
        });
    });

    it('Testing for trees - should return correct values for Cherry tree for 2 years annd 10 trees', done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'Cherry',
          region: 'Default',
          unit: 'years',
          quantity: 2,
          multiply: 10,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.equal(-538);
          done();
        });
    });

    it('should return correct values for flight emissions', done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'airplane model A380',
          region: 'Default',
          unit: 'nm',
          quantity: 125,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.equal(18.39436);
          done();
        });
    });

    it('should return correct values for flight emissions for a distance not present , testing interpolation', done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'airplane model A380',
          region: 'Default',
          unit: 'nm',
          quantity: 2300,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.equal(220.6954654213);
          done();
        });
    });

    it('should return correct values for airplane fuel factor 3.16', done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'airplane fuel',
          region: 'Default',
          unit: 'nm',
          quantity: 1,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.equal(0.00316);
          done();
        });
    });
  });

  describe('vehicle endpoint tests', () => {
    it('Testing for vehicles - should return correct values for vehicle emissions for a two location points , testing map api', done => {
      server
        .post('/v1/vehicle')
        .set('access-key', API_TEST_KEY)
        .send({
          type: 'Petrol',
          origin: 'Bhubaneswar',
          destination: 'Cuttack',
          mileage: 50,
          mileage_unit: 'km/L',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.approximately(1.203576, 0.1);
          done();
        });
    });
  });

  describe('trains endpoint tests', () => {
    it('Testing for trains - should return correct values for train emissions for a two location points , testing map api', done => {
      server
        .post('/v1/trains')
        .set('access-key', API_TEST_KEY)
        .send({
          type: 'railcars',
          origin: 'Bhubaneswar',
          destination: 'Cuttack',
          passengers: 10,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.approximately(11.444124, 3);
          done();
        });
    });
  });
  describe('flight endpoint tests', () => {
    it('Testing for flights - should return correct values for flight emissions between two airports', done => {
      server
        .post('/v1/flight')
        .set('access-key', API_TEST_KEY)
        .send({
          origin: 'DEL',
          destination: 'JFK',
          type: 'international',
          model: 'A380',
          passengers: 840,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.approximately(499960.612, 1);
          done();
        });
    });
    it('Testing for flights - should return error for incorrect IATA code of origin or destination', done => {
      server
        .post('/v1/flight')
        .set('access-key', API_TEST_KEY)
        .send({
          origin: 'INCORRECT_VALUE',
          destination: 'JFK',
          type: 'international',
          model: 'A380',
          passengers: 840,
        })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });
  });
  describe('poultry emission endpoint tests', () => {
    it('should check result for emissions produced after the production of 4 kg of turkey in Pennsylvania', done => {
      server
        .post('/v1/poultry')
        .set('access-key', API_TEST_KEY)
        .set('Content-type', 'application/json')
        .send({
          type: 'turkey',
          quantity: 4,
          region: 'pennsylvania',
        })
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.approximately(43.583252, 0.1);
          done();
        });
    });

    it('should check result if the negative quantity if fetched for poultry route', done => {
      server
        .post('/v1/poultry')
        .set('access-key', API_TEST_KEY)
        .set('Content-type', 'application/json')
        .send({
          type: 'pork',
          quantity: -9,
          region: 'michigan',
        })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it('should return err key for emissions produced after the production of 1 kg of Broiler (Chicken)? in British Columbia', done => {
      server
        .post('/v1/poultry')
        .set('access-key', API_TEST_KEY)
        .set('Content-type', 'application/json')
        .send({
          type: 'Broiler',
          quantity: 1,
          region: 'British Columbia',
        })
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe('appliances emission endpoint tests', () => {
    it('should return correct value for appliance large air conditioner', done => {
      server
        .post('/v1/emissions')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'Air conditioner large',
          region: 'Africa',
          unit: 'kWh',
          quantity: 1,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.approximately(2.6911610272, 0.2);
          done();
        });
    });

    it('should return correct value for appliance instantaneous Water heater', done => {
      server
        .post('/v1/appliances')
        .set('access-key', API_TEST_KEY)
        .send({
          appliance: 'Water heater instantaneous',
          region: 'India',
          unit: 'kWh',
          quantity: 1,
          running_time: 3,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions.CO2.should.approximately(7.0231411497, 0.2);
          done();
        });
    });
  });

  describe('quantity route tests', () => {
    it('should return correct value for quantity route', done => {
      server
        .post('/v1/quantity')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'lamp',
          region: 'Default',
          emission: 91,
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.quantity.should.approximately(2.310839737829899, 0.2);
          done();
        });
    });
  });

  describe('agriculture emission endpoint tests', () => {
    it('should return correct value for agriculture route', done => {
      server
        .post('/v1/agriculture')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'Synthetic Fertilizers',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.quantity.should.approximately(112131.9921, 0.2);
          done();
        });
    });

    it("should return an error for emissions produced for item 'Manure to crops' in India for agriculture route", done => {
      server
        .post('/v1/agriculture')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'Manure to crops',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it("should return an error for emissions produced for item 'Synthetic Fertilizers' in Delhi (city) for agriculture route", done => {
      server
        .post('/v1/agriculture')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'Synthetic Fertilizers',
          region: 'Delhi',
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe('food route tests', () => {
    it('should return correct value for food route', done => {
      server
        .post('/v1/food')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'rice, paddy',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.quantity.should.approximately(116848.5533, 0.2);
          done();
        });
    });

    it('should return an error for emissions produced for item Chicken in India for food route', done => {
      server
        .post('/v1/food')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'Chicken',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it('should return an error for emissions produced for absent item key for food route', done => {
      server
        .post('/v1/food')
        .set('access-key', API_TEST_KEY)
        .send({
          foodItem: 'rice, paddy',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe('land endpoint route tests', () => {
    it('should return correct value for land route', done => {
      server
        .post('/v1/land')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'cropland',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.quantity.should.approximately(8483.9433, 0.2);
          done();
        });
    });

    it("should return an error for emissions produced for item 'Commercial land' in India for land route", done => {
      server
        .post('/v1/land')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'Commercial land',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it('should return an error for emissions produced for absent region key for land route', done => {
      server
        .post('/v1/land')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'cropland',
          place: 'India',
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe('sector endpoint route tests', () => {
    it('should return correct value for sector route', done => {
      server
        .post('/v1/sector')
        .set('access-key', API_TEST_KEY)
        .send({
          sector: 'energy',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.quantity.should.approximately(1296650, 0.2);
          done();
        });
    });

    it('should return an error for emissions produced for sector Health in India for sector route', done => {
      server
        .post('/v1/sector')
        .set('access-key', API_TEST_KEY)
        .send({
          sector: 'Health',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });

    it('should return an error for emissions produced for absent sector key for sector route', done => {
      server
        .post('/v1/sector')
        .set('access-key', API_TEST_KEY)
        .send({
          item: 'cropland',
          region: 'India',
        })
        .expect('Content-type', /json/)
        .expect(400)
        .end((err, res) => {
          res.status.should.equal(400);
          res.body.success.should.equal(false);
          done();
        });
    });
  });

  describe('comparer endpoint tests', () => {
    it('testing for trees should return a 200 along with correct response', done => {
      server
        .post('/v1/comparer')
        .set('access-key', API_TEST_KEY)
        .send({
          emissions: {
            CO2: 25.6473,
          },
          relativeLocation: {
            lat: 37.4219806,
            lng: -122.0841979,
          },
          section: 'trees',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          done();
        });
    });

    it('testing for all options should return a 200 along with correct response', done => {
      server
        .post('/v1/comparer')
        .set('access-key', API_TEST_KEY)
        .send({
          emissions: {
            CO2: 25.6473,
          },
          relativeLocation: {
            lat: 37.4219806,
            lng: -122.0841979,
          },
          section: 'all',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.matches.length.should.equal(3);
          done();
        });
    });

    it('testing for vehicles should return a 200 along with correct response', done => {
      server
        .post('/v1/comparer')
        .set('access-key', API_TEST_KEY)
        .send({
          emissions: {
            CO2: 25.6473,
          },
          relativeLocation: {
            lat: 37.4219806,
            lng: -122.0841979,
          },
          section: 'vehicles',
        })
        .expect('Content-type', /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.matches.match.source.should.equal('Mountain View');
          res.body.matches.match.sourceState.should.equal('CA');
          done();
        });
    });

    it('testing for trains should return a 404', done => {
      server
        .post('/v1/comparer')
        .set('access-key', API_TEST_KEY)
        .send({
          emissions: {
            CO2: 25.6473,
          },
          relativeLocation: {
            lat: 37.4219806,
            lng: -122.0841979,
          },
          section: 'trains',
        })
        .expect('Content-type', /json/)
        .expect(404)
        .end((err, res) => {
          res.status.should.equal(404);
          res.body.success.should.equal(false);
          done();
        });
    });
  });
});
