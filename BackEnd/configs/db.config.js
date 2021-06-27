const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbName = 'gig'
const conxnURL = 'mongodb://localhost:27017';
const OID = mongodb.ObjectID;

module.exports = {
    MongoClient,
    dbName,
    conxnURL,
    OID
}