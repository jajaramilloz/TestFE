const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

const Dishes = require('../models/dishes');
const authenticate = require('../authenticate');
const cors = require('./cors');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.get(cors.cors, (req, res, next) => {
    Dishes.find(req.query)
    .populate('comments.author')
    .then((dishes) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(dishes);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Dishes.create(req.body)
    .then((dish) => {
        // console.log('Dish created ', dish);
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /dishes`);
})
.delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    // Dangerous operation. Should NOT be defined.
    Dishes.deleteMany({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.get(cors.cors, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('Post operation not supported for /dishes');
})
.put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Dishes.findOneAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.get(cors.cors, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) => {
        if (!!dish) {
            res.statusCode = 200;
            res.setHeader('Context-Type', 'application/json');
            res.json(dish.comments);
        } else {
            err = new Error(`Dish ${req.params.dishId} not found`);            
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (!!dish) {
            req.body.author = req.user._id;
            dish.comments.push(req.body);
            dish.save()
            .then((dish) => {
                Dishes.findById(dish._id)
                    .populate('comments.author')
                    .then((dish) => {
                        res.statusCode = 200;
                        res.setHeader('Context-Type', 'application/json');
                        res.json(dish);
                    });
            }, (err) => next(err));
        } else {
            err = new Error(`Dish ${req.params.dishId} not found`);            
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /dishes/${req.params.dishId}/comments`);
})
.delete(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (!!dish) {
            for (var i = (dish.comments.length -1); i >= 0 ; i--) {
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Context-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err));
        } else {
            err = new Error(`Dish ${req.params.dishId} not found`);            
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

dishRouter.route('/:dishId/comments/:commentId')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.get(cors.cors, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) => {
        if (!!dish && !!dish.comments.id(req.params.commentId)) {
            res.statusCode = 200;
            res.setHeader('Context-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        } else if (!!dish) {
            err = new Error(`Dish ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        } else {
            err = new Error(`Comment /dishes/${req.params.dishId}/comments/${req.params.commentId} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /dishes/${req.params.dishId}/comments/${req.params.commentId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (!!dish && !!dish.comments.id(req.params.commentId)) {
            //check owner user
            let commentAuthor = dish.comments.id(req.params.commentId).author;
            let userId = req.user._id;
            // console.log(` PUT commentId: commentAuthor=${commentAuthor} userId=${userId}`);
            if (commentAuthor.equals(userId)) {
                if (req.body.rating) {
                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                }
                if (req.body.comment) {
                    dish.comments.id(req.params.commentId).comment = req.body.comment;
                }
                dish.save()
                .then((dish) => {
                    Dishes.findById(dish._id)
                        .populate('comments.author')
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Context-Type', 'application/json');
                            res.json(dish);
                        });
                }, (err) => next(err))
            } else {
                err = new Error(`You are not the author to modify this comment! (commentAuthor=${commentAuthor} userId=${userId})`);
                res.statusCode = 403;
                return next(err);
            }
        } else if (!!dish) {
            err = new Error(`Dish ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        } else {
            err = new Error(`Comment /dishes/${req.params.dishId}/comments/${req.params.commentId} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.dishId)
    .then((dish) => {
        if (!!dish && !!dish.comments.id(req.params.commentId)) {
            let commentAuthor = dish.comments.id(req.params.commentId).author;
            let userId = req.user._id;
            // console.log(` DELETE commentId: commentAuthor=${commentAuthor} userId=${userId}`);
            if (commentAuthor.equals(userId)) {
                dish.comments.id(req.params.commentId).remove();
                dish.save()
                .then((dish) => {
                    Dishes.findById(dish._id)
                        .populate('comments.author')
                        .then((dish) => {
                            res.statusCode = 200;
                            res.setHeader('Context-Type', 'application/json');
                            res.json(dish);
                        })
                }, (err) => next(err));
            } else {
                err = new Error(`You are not the author to delete this comment! (commentAuthor=${commentAuthor} userId=${userId})`);
                res.statusCode = 403;
                return next(err);
            }
        } else if (!!dish) {
            err = new Error(`Dish ${req.params.dishId} not found`);
            res.statusCode = 404;
            return next(err);
        } else {
            err = new Error(`Comment /dishes/${req.params.dishId}/comments/${req.params.commentId} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = dishRouter;
