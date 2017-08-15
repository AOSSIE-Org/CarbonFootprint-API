//Require the dev-dependencies
var supertest = require("supertest");
var should = require("should");
var app = require('../app.js');
app.listen(3080);
require('dotenv').config();

// This agent refers to PORT where program is runninng.
const server = supertest.agent("http://localhost:3080");
const ACCESS_KEY = process.env.API_TEST_KEY

// set test access-key in the header
// server.set('access-key', ACCESS_KEY)

// UNIT test begin
describe("API endpoint testing", () => {
  it("should return correct values of emission for a sample country", (done) => {
    server
      .post('/v1/emissions')
      .set('access-key', ACCESS_KEY)
      .send({ "item": "electricity", "region": "Africa", "unit": "kg CO2/kWh", "quantity": 1 })
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        res.body.emissions["CO2"].should.equal(0.840987821);
        done();
      });
  });

  it("should return default values of emission for a sample region that doesn't exist", (done) => {
    server
      .post('/v1/emissions')
      .set('access-key', ACCESS_KEY)
      .send({ "item": "electricity", "region": "gotham", "unit": "kg CO2/kWh", "quantity": 1 })
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        res.body.emissions["CO2"].should.equal(0.752534108);
        done();
      });
  });

  it("should return correct values even if quantity is not 1", (done) => {
    server
      .post('/v1/emissions')
      .set('access-key', ACCESS_KEY)
      .send({ "item": "electricity", "region": "india", "unit": "kg CO2/kWh", "quantity": 1.564 })
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        res.body.emissions["CO2"].should.equal(2.8164596816);
        done();
      });
  });

  it("should return correct values for atomic items also", (done) => {
    server
      .post('/v1/emissions')
      .set('access-key', ACCESS_KEY)
      .send({ "item": "generation", "region": "albania", "unit": "kg CO2/kWh", "quantity": 1.5 })
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        res.body.emissions["CO2"].should.equal(0.013695132);
        done();
      });
  });

  it("Testing for trees - should return correct values for Cherry tree for 2 years annd 10 trees", (done) => {
      server
        .post('/v1/emissions')
        .set('access-key', ACCESS_KEY)
        .send({"item":"Cherry","region":"Default","unit":"years","quantity":2,"multiply":10})
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.equal(538);
          done();
        });
  });

  it("should return correct values for flight emissions", (done) => {
    server
      .post('/v1/emissions')
      .set('access-key', ACCESS_KEY)
      .send({ "item": "airplane model A380", "region": "Default", "unit": "nm", "quantity": 125 })
      .expect("Content-type", /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.success.should.equal(true);
        res.body.emissions["CO2"].should.equal(18.39436);
        done();
      });
  });

  it("should return correct values for flight emissions for a distance not present , testing interpolation", (done) => {
      server
        .post('/v1/emissions')
        .set('access-key', ACCESS_KEY)
        .send({ "item": "airplane model A380", "region": "Default", "unit": "nm", "quantity": 2300 })
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.equal(220.6954654213);
          done();
        });
    });

    it("should return correct values for airplane fuel factor 3.16", (done) => {
      server
        .post('/v1/emissions')
        .set('access-key', ACCESS_KEY)
        .send({ "item": "airplane fuel", "region": "Default", "unit": "nm", "quantity": 1 })
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.equal(0.00316);
          done();
        });
    });

    it("Testing for vhicles - should return correct values for vehicle emissions for a two location points , testing map api", (done) => {
      server
        .post('/v1/vehicle')
        .set('access-key', ACCESS_KEY)
        .send({"type": "Petrol","origin": "Bhubaneswar","destination": "Cuttack","mileage": 50,"mileage_unit": "km/L"})
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.approximately(1.203576, .1);
          done();
        });
    });

    it("Testing for trains - should return correct values for train emissions for a two location points , testing map api", (done) => {
      server
        .post('/v1/trains')
        .set('access-key', ACCESS_KEY)
        .send({"type":"railcars","origin":"Bhubaneswar","destination":"Delhi","passengers":10})
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.approximately(783.865432, 100);
          done();
        });
    });

    /* Test Cases for Poultry Emissions */

    it("should check result for emissions produced after the production of 2 eggs in British Columbia",(done) => {
      server
        .post('/v1/poultry')
        .set('access-key',ACCESS_KEY)
        .set('Content-type','application/json')
        .send({"type":"egg","quantity":2,"region":"british columbia"})
        .expect(200)
        .end((err,res) => {
          if(err) console.log(err);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.approximately(8.747984,0.1);
          done();
        });
    });

    it("should check result for emissions produced after the production of 7 eggs in India",(done) => {
      server
        .post('/v1/poultry')
        .set('access-key',ACCESS_KEY)
        .set('Content-type','application/json')
        .send({"type":"egg","quantity":7,"region":"india"})
        .expect(200)
        .end((err,res) => {
          if(err) console.log(err);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.approximately(33.743248,0.1);
          done();
        });
    });

     it("should check result for emissions produced after the production of 4 kg of turkey in Pennsylvania",(done) => {
      server
        .post('/v1/poultry')
        .set('access-key',ACCESS_KEY)
        .set('Content-type','application/json')
        .send({"type":"turkey","quantity":4,"region":"pennsylvania"})
        .expect(200)
        .end((err,res) => {
          if(err) console.log(err);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.approximately(43.583252,0.1);
          done();
        });
    });

     it("should check result for emissions produced after the production of 9 kg of Pork in michigan",(done) => {
      server
        .post('/v1/poultry')
        .set('access-key',ACCESS_KEY)
        .set('Content-type','application/json')
        .send({"type":"pork","quantity":9,"region":"michigan"})
        .expect(200)
        .end((err,res) => {
          if(err) console.log(err);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.approximately(101.596302,0.1);
          done();
        });
    });

     it("should check result for emissions produced after the production of 6 kg of Pork in Austria",(done) => {
      server
        .post('/v1/poultry')
        .set('access-key',ACCESS_KEY)
        .set('Content-type','application/json')
        .send({"type":"pork","quantity":6,"region":"Austria"})
        .expect(200)
        .end((err,res) => {
          if(err) console.log(err);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.approximately(72.573048,0.1);
          done();
        });
    });

     it("should check result for emissions produced after the production of 1 kg of Broiler Chicken in British Columbia",(done) => {
      server
        .post('/v1/poultry')
        .set('access-key',ACCESS_KEY)
        .set('Content-type','application/json')
        .send({"type":"Broiler Chicken","quantity":1,"region":"British Columbia"})
        .expect(200)
        .end((err,res) => {
          if(err) console.log(err);
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.approximately(6.882375,0.1);
          done();
        });
    });
});
