const bcrypt = require("bcryptjs");

const {getConn} = require("../../mods/db");
const {signToken, verifyToken} = require("../../mods/jwt");
const EL = require("../errors/errorList");

const User = require("./userDAO")({
    conn: getConn(),
    db: "escape",
    collection: "users"
});

exports.authorizationMw = (req, res, next) => {
    let token = req.headers.authorization;
    if(token) {
        token = token.substring(7); // strips out "BEARER ";
        try {
            req.user = verifyToken(token, {aud: req.hostname});
            next();
        } catch(error) {
            // invalid token, expired, malformed, ....
            res.status(500).json({error: error.message});
        };
    } else {
        throw new EL.UnauthorizedError;
    };
};

exports.loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new EL.MissingFieldsError;
    };

    const user = await User.getUserByEmail(email);
    if(!user) {
        throw new EL.WrongCredentialsError;
    }
    
    const match = await bcrypt.compare(password, user.passwordHash);
    
    if(!match){
        throw new EL.WrongCredentialsError;
    };
    
    delete user.passwordHash;
    const token = signToken({user}, {sub: user._id.toString(), aud: req.hostname});
    res.json({token})
};

exports.registerUser = async (req, res, next) => {
    const {username, email, password} = req.body;
    
    if(!username || !email || !password) {
        throw new EL.MissingFieldsError;
    };

    const isEmailTaken = await User.getUserByEmail(email);
    if(isEmailTaken) {
        throw new EL.EmailTakenError;
    } 
    
    const hash = await bcrypt.hash(password, 10);
    const {data} = await User.insert({username, email, passwordHash: hash});
    delete data.passwordHash;
    const token = signToken({user: data}, {sub: data._id.toString(), aud: req.hostname});

    res.json({token});
};

// return a list of registered users
exports.getUsers = async (req, res, next) => {
    // if params aren't set parseInt return NaN
    const page = parseInt(req.query.page, 10);
    const resPerPage = parseInt(req.query.resPerPage, 10);
    
    const userList = await User.listUsers(page, resPerPage);
    res.status(200).json({userList});
};

// middleware triggered when :uId param is in the route
// async handler hoc cannot be used as express wouldn't recognize uId here
exports.getUserById = async (req, res, next, uId) => {
    try {
        req.currentUser = await User.getUserByID(uId);
        next();
    } catch(error){
        throw error;
    };
};

// return registered user's data
exports.getProfile = async (req, res, next) => {
    // atm is all in the token, to be expanded in the future
    res.json({user: req.currentUser})
};

exports.deleteUser = async (req, res, next) => {
    if(!req.currentUser) {
        throw new EL.UnauthorizedError;
    };

    const removedUser = await User.remove(req.currentUser._id);
    res.json({message: `User ${removedUser.value.username} removed successfully`});
};

exports.modifyUser = async (req, res, next) => {
    if(!req.currentUser){
        throw new EL.UnauthorizedError;
    };
    
    const updatedUser = await User.update(req.currentUser._id, req.body.changes);
    res.json({message: `User ${updatedUser.value.username} updated successfully`});
};