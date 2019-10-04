const initDAO = require("../initDAO");
const {toID} = require("../../mods/db");

const UserModel = options => {
    const usersColl = initDAO(options);

    return {
        // errors caught one level above
        insert: async userData => {
            const {ops} = await usersColl.insertOne(userData);
            const newUser = ops[0];
            delete newUser.passwordHash;
            return {message: "Document inserted", data: newUser}
        },
        update: async (id, changes) => {
            // changes obj already validated
            return await usersColl.findOneAndUpdate({_id: id}, {$set: changes});
        },
        getUserByID: async id => await usersColl.findOne({_id: toID(id)}),
        getUserByEmail: async email  => {
            if(!email) {
                throw new Error("Bad request format: one or more required fields are missing");
            };

            return await usersColl.findOne({email});
        },
        remove: async currUserId => {
            return await usersColl.findOneAndDelete({_id: toID(currUserId)});
        },
        listUsers: async (page=0, resPerPage=20) => {
            // no page set, no limit
            if(page === 0){ resPerPage = 0; };

            const cursor = await usersColl.find({}, {projection: {"username": 1}})
                            .skip(page > 0 ? ((page -1)*resPerPage) : 0)
                            .limit(resPerPage);

            return cursor.toArray();
        },
    };
};

module.exports = UserModel;