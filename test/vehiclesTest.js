var expect = require('chai').expect
var Vehicle = require('../footprintModels/vehicle')
vehicle =  new Vehicle;

describe('Vehicles',function(){

    /**
     * Test for the API functions
     * @param {object} input1
     * @return {object}
     */

    describe("Mini",function(){

        var input1 =  {
            type:"mini",
            fuel:"P",
            gas:"co2e",
            distance:213.231,
            resultIn:{
                footprintType:"pounds",
                distanceType:"miles"
            }
        }; 

        result = {}; 

        vehicle.getData(input1).then(function(data){
            result = data;

        }).catch((data)=>{
            result=data;
        });

        it("should return a object",function(){
            expect(result).to.have.property('result'); 
        });

        it("should return a object with property distance",function(){
            expect(result.distance).to.be.equal(input1.distance);
        });

        it("should return a object with the resultIn Property",function(){
            expect(result).to.have.property('resultIn');
        });

        it("should return the footprint according to result",function(){
            expect(result.result).to.be.equal(109.131329);

        });

        var input2 =  {
            type:"mini",
            fuel:"D",
            gas:"co2e",
            distance:213.231,
            resultIn:{
                footprintType:"pounds",
                distanceType:"mile"
            }
        };

        result2 = {}

        vehicle.getData(input2).then(function(data1){
            result2 = data1;
        }).catch(function(err){
            result2 = err;
            //console.log('found error')
        });
 
        it("Should return a Error",function(){
            //console.log(result2);
            expect(result2).to.have.property('error'); 
        });

        it("should not have property of result",function(){
            expect(result2).to.not.have.property('result');
        });

        it("should have description for error",function(){
            expect(result2.error).to.be.equal('DistanceType');
        });

    });
});
