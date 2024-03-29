const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');

const Leaders = require('../models/leaders');
const authenticate = require('../authenticate');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.get(cors.cors, (req, res, next) => {
    Leaders.find(req.query)
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.create(req.body)
    .then((leader) => {
        // console.log('Promotion created ', promotion);
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /leaders`);
})
.delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    // Dangerous operation. Should NOT be defined.
    Leaders.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.get(cors.cors, (req, res, next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported for /leaders');
})
.put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.findOneAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new: true })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;
