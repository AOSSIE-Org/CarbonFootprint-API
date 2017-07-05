// let mongoose = require("mongoose");
// var Emission = require('../api/v1/models/emissionModel.js');

//Require the dev-dependencies
var supertest = require("supertest");
var should = require("should");
var app = require('../app.js');

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3080");

// UNIT test begin
describe("API endpoint testing", () => {

  it("should return correct values of emission for a sample country", (done) => {
    server
      .post('/v1/emissions')
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
        .send({"type": "Petrol","origin": "Bhubaneswar","destination": "Cuttack","mileage": 50,"mileage_unit": "km/L"})
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.equal(1.20362256);
          done();
        });
    });

    it("Testing for trains - should return correct values for train emissions for a two location points , testing map api", (done) => {
      server
        .post('/v1/trains')
        .send({"type":"railcars","origin":"Bhubaneswar","destination":"Delhi","passengers":10})
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          res.status.should.equal(200);
          res.body.success.should.equal(true);
          res.body.emissions["CO2"].should.equal(718.86584);
          done();
        });
    });
});
