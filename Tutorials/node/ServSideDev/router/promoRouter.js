const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the promotions to you');
})
.post((req, res, next) => {
    res.end(`Will add the promotion: ${req.body.name} - ${req.body.description}`);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /promotions`);
})
.delete((req, res, next) => {
    // Dangerous operation. Should NOT be defined.
    res.end('Deleting all the promotions!');
});

promoRouter.route('/:promoId')
.get((req, res, next) => {
    res.end(`Will send details of the promotion ${req.params.promoId}`);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported for /promotions');
})
.put((req, res, next) => {
    res.write(`Updating the promotion: ${req.params.promoId}\n`)
    res.end(`Will update the promotion: ${req.body.name} - ${req.body.description}`);
})
.delete((req, res, next) => {
    res.end(`Will delete the promotion: ${req.params.promoId}`);
});

module.exports = promoRouter;
