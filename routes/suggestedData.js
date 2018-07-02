const express = require('express');
const router = express.Router();
const multer = require('multer');
const suggestedData = require('../models/suggestedDataModel');
const fs = require('fs');
const upload = multer({ dest: 'suggested_data/' });

router.post('/', (req, res) => {
    var newSuggestedData = new suggestedData({
        title: req.body.title,
        data: req.body.data,
        createdby: req.body.useremail,
        state: 'Pending'
    });
    newSuggestedData.save(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully saved!");
        }
    });
});

router.get('/fetchData', (req, res) => {
    suggestedData.find({}, function (err, fetch) {
        res.send(fetch)
    });
});

router.post('/approveData', (req, res) => {
    suggestedData.findById({ _id: req.body.data_id }, function (err, approve) {
        fs.writeFile("approvedData.txt", approve, function (err) {
            if (err) {
                console.log(err);
            }
        });
        console.log("Successfully approved!");
    });
    suggestedData.findByIdAndRemove({ _id: req.body.data_id }, (err, approved) => {
        if (err) {
            res.send(400).json(err);
        } else {
            console.log("Removed from the verification list");
        }
    })
})

router.post('/rejectData', (req, res) => {
    suggestedData.findByIdAndRemove({ _id: req.body.data_id }, (err, reject) => {
        if (err) {
            res.send(400).json(err);
        } else {
            console.log(reject);

        }
    })
})

router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
})

module.exports = router;