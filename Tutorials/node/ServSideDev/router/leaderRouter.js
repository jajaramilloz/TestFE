const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res, next) => {
    res.end('Will send all the leaders to you');
})
.post((req, res, next) => {
    res.end(`Will add the leader: ${req.body.name} - ${req.body.description}`);
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /leaders`);
})
.delete((req, res, next) => {
    // Dangerous operation. Should NOT be defined.
    res.end('Deleting all the leaders!');
});

leaderRouter.route('/:leaderId')
.get((req, res, next) => {
    res.end(`Will send details of the leader ${req.params.leaderId}`);
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported for /leaders');
})
.put((req, res, next) => {
    res.write(`Updating the leader: ${req.params.leaderId}\n`);
    res.end(`Will update the leader: ${req.body.name} - ${req.body.description}`);
})
.delete((req, res, next) => {
    res.end(`Will delete the leader: ${req.params.leaderId}`);
});

module.exports = leaderRouter;
