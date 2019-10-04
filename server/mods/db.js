const {MongoClient, ObjectID} = require("mongodb");

const URL = "mongodb://localhost:27017";

const _conn = new MongoClient(URL, {useNewUrlParser: true, useUnifiedTopology: true});

exports.connectDB = async () => {
    try { 
        await _conn.connect();
        console.log("Db connected");
        return _conn;
    } catch(error) {
        console.error("Db connection failed");
        console.error(error);
        return false;
    };
};

exports.getConn = () => _conn;

exports.toID = id => ObjectID(id);