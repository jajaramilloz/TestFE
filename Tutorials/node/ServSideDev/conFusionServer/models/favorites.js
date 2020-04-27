const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dishes: [ { type : mongoose.Schema.Types.ObjectId, ref: 'Dish' } ]
},{
    timestamps: true
});

let Favorites = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorites;

// var dataSchema = new Schema({..}, { collection: 'favorites' })  // collection name explicity