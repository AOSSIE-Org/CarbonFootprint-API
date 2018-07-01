const express = require('express');
const router = express.Router();
const suggestedData = require('../models/suggestedDataModel');


router.post('/', (req,res) =>{
    var newSuggestedData = new suggestedData({
        title: req.body.title,
        data: req.body.data,
        createdby: req.body.useremail, 
        state: 'Pending'
    });
    newSuggestedData.save(function(err, data){
        if(err){
            console.log(err);            
        }else{
            console.log("Successfully saved!");
        }
    });
});

router.get('/approveData',(req,res) =>{
    suggestedData.find({}, function(err, approve) {
        res.send(approve)
    });
});

module.exports = router;