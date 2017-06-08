let mongoose = require("mongoose");
var Emission = require('../api/v1/models/emissionModel.js');

//Require the dev-dependencies
var supertest = require("supertest");
var should = require("should");
var app = require('../app.js');
app.listen(3080);
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3080");
// UNIT test begin

describe("API endpoint testing",function(){
    it("Should return correct values of emission for a sample country",function(done){

    //calling emission api
    server
    .post('/v1/emissions')
    .send({"item":"electricity","region":"Africa","unit":"kg/kWh","quantity":1})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      res.body.emissions.should.equal(0.840987821);
    done();
    });
  });
  it("Should return default values of emission for a sample region that doesn't exist",function(done){

    //calling emission api
    server
    .post('/v1/emissions')
    .send({"item":"electricity","region":"gotham","unit":"kg/kWh","quantity":1})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.success.should.equal(true);
      res.body.emissions.should.equal(0.752534108);
    done();
    });
  });
});