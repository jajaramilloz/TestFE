const express = require('express');
const bodyParser = require('body-parser');
const Favorites = require('../models/favorites');
const Dishes = require('../models/dishes');
// const Users = require('../models/users');

const authenticate = require('../authenticate');
const cors = require('./cors');

const favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.find({author: req.user._id})
    .populate('author')
    .populate('dishes')
    .then((favorites) => {
        res.statusCode = 200;
        res.setHeader('Context-Type', 'application/json');
        res.json(favorites);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ author: req.user._id})
    .then ((favorite) => {
        if (!favorite) {
            // user hasn't registered favorites; lets create it
            let fav = { "author": req.user._id, "dishes": [] };
            Favorites.create(fav)
            .then((favorite) => {
                for (let i = 0 ; i < req.body.length ; i++) {
                    // Dishes.findById(req.body[i]._id)
                    // .then((dish) => {
                        // lets see if the _id belongs to a dish
                        // if (!!dish) {
                            //if so, lets remove and add it to the favorites
                            //removing it first we ensure it will be unique
                            favorite.dishes.remove(req.body[i]);
                            favorite.dishes.push(req.body[i]);
                        // }
                    // });
                }
                favorite.save()
                .then((favorites) => {
                    Favorites.findById(favorite._id)
                    .populate('author')
                    .populate('dishes')
                    .then((favorites) => {
                        res.statusCode = 200;
                        res.setHeader('Context-Type', 'application/json');
                        res.json(favorites);
                    })
                    .catch((err) => next(err))
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        } else {
            //lest add the favorite dishes
            for (let i = 0 ; i < req.body.length ; i++) {
                favorite.dishes.remove(req.body[i]);
                favorite.dishes.push(req.body[i]);
            }
            favorite.save()
            .then((favorites) => {
                Favorites.findById(favorite._id)
                .populate('author')
                .populate('dishes')
                .then((favorites) => {
                    res.statusCode = 200;
                    res.setHeader('Context-Type', 'application/json');
                    res.json(favorites);
                })
                .catch((err) => next(err))
            })
            .catch((err) => next(err));
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.deleteOne({ author: req.user._id })
    .then((resp) => {
        if (resp.deletedCount != 0) {
            res.statusCode = 200;
            res.setHeader('Context-Type', 'application/json');
            res.json(resp);
        } else {
            err = new Error(`Favorites dishes for user ${req.user.username} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

favoriteRouter.route('/:objId')
.options(cors.corsWithOptions, 
    (req, res) => { res.sendStatus(200) }
)
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({author: req.user._id})
    then((favorites) => {
        if (!favorites) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({"exists": false, "favorites": favorites});
        } else {
            if (favorites.dishes.indexOf(req.params.objId) < 0) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": false, "favorites": favorites});
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                return res.json({"exists": true, "favorites": favorites});
                }
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Dishes.findById(req.params.objId)
    .then((dish) => {
        if (!!dish) {
            // the dish exists
            Favorites.findOne({ author: req.params._id})
            .then ((favorite) => {
                if (!!favorite) {
                    // user has already registered favorites; lets update it
                    let found = false;
                    for (let i = 0; !found && i < favorite.dishes.length ; i++) {
                        found = favorite.dishes[i]._id.equals(req.params.objId);
                    } 
                    // let idx = favorite.dishes.indexof(req.params.objId);
                    // if (!!favorite.dishes.id(req.params.objId)) {
                    if (found) {
                        // the dish already exists; couldn't be added twice
                        err = new Error(`Favorite dish '${dish.description}' for user ${req.user.username} already exits`);
                        res.statusCode = 400;
                        return next(err);
                    } else {
                        // the dish wasn't registered as a favorite; lets add it
                        favorite.dishes.push({ _id: req.params.objId });
                        favorite.save()
                        .then((favorite) => {
                            Favorites.findById(favorite._id)
                            .populate('author')
                            .populate('dishes')
                            .then((favorite) => {
                                res.statusCode = 200;
                                res.setHeader('Context-Type', 'application/json');
                                res.json(favorite);
                            });
                        }, (err) => (next(err)))
                        .catch((err) => next(err));
                    }
                } else {
                    // user hasn't registered favorites; lets create it
                    let fav = { "author": req.user._id, "dishes": [ { "_id": req.params.objId } ] };
                    Favorites.create(fav)
                    .then((favorite) => {
                        Favorites.findById(favorite._id)
                        .populate('author')
                        .populate('dishes')
                        .then((favorite) => {
                            res.statusCode = 200;
                            res.setHeader('Context-Type', 'application/json');
                            res.json(favorite);
                        }, (err) => next(err))
                        .catch((err) => next(err))
                    }, (err) => next(err))
                    .catch((err) => next(err));
                }
            }, (err) => next(err))
            .catch((err) => next(err));
        } else {
            // the dish doesn't exist
            err = new Error(`Dish '${req.params.objId}' not found to add to favorites`);
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites/:id`);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ author: req.user._id })
    .then((favorite) => {
        if (!!favorite) {
            let nDishesBef = favorite.dishes.length;
            favorite.dishes.remove(req.params.objId);
            let nDishesAft = favorite.dishes.length;
            // console.log("nDishesBef , nDishesAft", nDishesBef , nDishesAft);
            if (nDishesBef != nDishesAft) {
                //the dish was removed
                favorite.save()
                .then((favorite) => {
                    Favorites.findById(favorite._id)
                    .populate('author')
                    .populate('dishes')
                    .then((favorite) => {
                        res.statusCode = 200;
                        res.setHeader('Context-Type', 'application/json');
                        res.json(favorite);
                    }, (err) => next(err))
                    .catch((err) => next(err))
            });
            } else {
                //dishId not found in favorites
                err = new Error(`Favorite dish '${req.params.objId}' for user ${req.user.username} not found`);
                res.statusCode = 404;
                return next(err);
            }
        } else {
            err = new Error(`Favorites dishes for user ${req.user.username} not found`);
            res.statusCode = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = favoriteRouter;