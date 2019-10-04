const initDAO = options => {
    let conn;
    const db = options.db || "test";
    const collection = options.collection || "test";

    if(!options.conn) {
        const errMsg = options.conn === "undefined"
                            ?   "Connection not provided"
                            :   "Database not connected";
        throw new Error(errMsg);
    } else {
        conn = options.conn;
    };

    const coll = conn.db(db).collection(collection);

    return coll;
};

module.exports = initDAO;