const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the dishes to you');
})
.post((req, res, next) => {
    res.end(`Will add the dish: ${req.body.name} - ${req.body.description}`);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /dishes`);
})
.delete((req, res, next) => {
    // Dangerous operation. Should NOT be defined.
    res.end('Deleting all the dishes!');
});

dishRouter.route('/:dishId')
.get((req, res, next) => {
    res.end(`Will send details of the dish ${req.params.dishId}`);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported for /dishes');
})
.put((req, res, next) => {
    res.write(`Updating the dish: ${req.params.dishId}\n`)
    res.end(`Will update the dish: ${req.body.name} - ${req.body.description}`);
})
.delete((req, res, next) => {
    res.end(`Will delete the dish: ${req.params.dishId}`);
});

module.exports = dishRouter;
