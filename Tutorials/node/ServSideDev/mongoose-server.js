const mongoose = require('mongoose');
const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, { useNewUrlParser: true });

connect.then((db) => {
    console.log(`Connected to DB server`);

    Dishes.create({
        name: 'Uthappizza',
        description: 'test U-P'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: { description: "update description" }
        },{
            new: true
        }).exec();
    })
    .then ((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: 'first comment',
            author: 'jajz'
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});
