const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

function thirdInteraction() {
    mongoClient.connect(url, { useUnifiedTopology: true })
    .then((client) => {
        console.log('Connected to mongoDB server!');
        const db = client.db(dbname);
        dboper.insertDocument(db, {name: "Vadonut", description: "Test V"}, 'dishes')
        .then((result) => {
            console.log('Insert document:\n', result.result);

            return dboper.findDocuments(db, 'dishes');
        })
        .then((docs) => {
            console.log('Found documents:\n',docs);

            return dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'new Vadonut'}, 'dishes');
        })
        .then((result) => {
            console.log('Updated document:\n', result.result);

            return dboper.findDocuments(db, 'dishes');
        })
        .then((docs) => {
            console.log('Found documents:\n', docs);

            return db.dropCollection('dishes');
        })
        .then((result) => {
            console.log('Collection dropped:', result);
            client.close();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function secondInteraction() {
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        assert.equal(err, null);
        console.log('Connected to mongoDB server!');
        const db = client.db(dbname);
        dboper.insertDocument(db, {name: "Vadonut", description: "Test V"}, 'dishes', (result) => {
            console.log('Insert document:\n', result.result);

            dboper.findDocuments(db, 'dishes', (docs) => {
                console.log('Found documents:\n',docs);

                dboper.updateDocument(db, {name: 'Vadonut'}, {description: 'new Vadonut'}, 'dishes', (result) => {
                    console.log('Updated document:\n', result.result);

                    dboper.findDocuments(db, 'dishes', (docs) => {
                        console.log('Found documents:\n', docs);
                        db.dropCollection('dishes', (result) => {
                            console.log('Collection dropped:', result);
                            client.close();
                        });
                    });

                });
            });
        });
    });
}

function firstInteraction() {
    mongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
        assert.equal(err, null);
        console.log('Connected to mongoDB server!');
        const db = client.db(dbname);
        const collection = db.collection('dishes');
    
        collection.insertOne({"name": "Utahpizza", "description": "Test U-P2"}, (err, result) => {
            assert.equal(err, null);
            console.log('After insert: \n');
            console.log(result.ops);
    
            collection.find({}).toArray((err, docs) => {
                assert.equal(err, null);
                console.log('Found:\n');
                console.log(docs);
    
                db.dropCollection('dishes', (err, result) => {
                    assert.equal(err, null);
                    client.close();
                });
            });
        });
    });
}

thirdInteraction();
