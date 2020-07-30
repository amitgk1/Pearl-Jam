const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "PearlJam";
const collection = "concerts";

const insertConcerts = (concerts) => {
  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true });
  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    db.createCollection(collection, function (err) {
      assert.equal(null, err);
      console.log("Created collection 'concerts' in db 'PearlJam'");
      db.collection(collection).insertMany(concerts, function (err, results) {
        assert.equal(null, err);
        console.log("all the concerts have been inserted to the collection");
        client.close();
      });
    });
  });
};

const makeDBQuery = async (query) => {
  // Create a new MongoClient
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const results = await db.collection(collection).find(query).toArray();
    console.log("results have been pulled from the db");

    client.close();
    console.log("closed the connection to the db successfuly");
    return await results;
  } catch (err) {
    console.log(err.stack);
    return [];
  }
};

module.exports = { insertConcerts, makeDBQuery };
