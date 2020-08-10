const objectId = require("mongodb").ObjectID;
const express = require('express');
const router = express.Router();
const jsonParser = express.json();



router.get('/', function (req, res) {
    const collection = req.app.locals.collection;

    collection.find().toArray(function (err, trainings) {
        if (err) return console.log(err);
        res.send(trainings)
    });
});

router.get('/graph', function (req, res) {
    const collection = req.app.locals.collection;
    collection.find().toArray(function(err, trainings){
        if(err) return console.log(err);
        res.send(trainings.map(training => +training.distance))
    });
});

router.get('/:id', function (req, res) {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;

    collection.findOne({_id: id}, function (err, training) {
        if (err) return console.log(err);
        res.send(training);
    });
});

router.post("/create", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    console.log(req.body);

    const training = {
        name: req.body.name,
        distance: req.body.distance,
        date: req.body.date,
        type: req.body.type,
        comment: req.body.comment
    };

    const collection = req.app.locals.collection;
    collection.insertOne(training, function (err) {

        if (err) return console.log(err);
        res.send(
            training
        );
    });
});

router.post("/update/:id", jsonParser, function (req, res) {
    const id = new objectId(req.params.id);
    if (!req.body) return res.sendStatus(400);

    const training = {
        name: req.body.name,
        distance: req.body.distance,
        date: req.body.date,
        type: req.body.type,
        comment: req.body.comment
    };

    const collection = req.app.locals.collection;


    collection.findOneAndUpdate({_id: id}, {$set: training}, {returnOriginal: false}, function (err, result) {
        if (err) return console.log(err);
        res.send(result.value);
    });
});

router.post("/delete/:id", function (req, res) {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function (err, result) {

        if (err) return console.log(err);
        let training = result.value;
        res.send(training);
    });
});

module.exports = router;
