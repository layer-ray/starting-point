// credits to Siddhartha Chowdhury [Medium]
// https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e

const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const keysPath = path.join(__dirname, "..");
const privateKey = fs.readFileSync(keysPath + "/private.key", {encoding: "utf-8"});
const publicKey = fs.readFileSync(keysPath + "/public.key", {encoding: "utf-8"});

const ISSUER = "http://localhost:5000";

exports.signToken = (payload, opts) => {
    const sOpts = {
        issuer: ISSUER,
        subject: opts.sub,
        audience: opts.aud,
        expiresIn: "1h",
        algorithm: "RS256"
    };

    return jwt.sign(payload, privateKey, sOpts);
};

exports.verifyToken = (token, opts) => {

    const currentUID = jwt.decode(token);

    const vOpts = {
        issuer: ISSUER,
        subject: currentUID ? currentUID.uId : null, // subject has to be the same as payload uId
        audience: opts.aud,
        expiresIn: "1h",
        algorithm: "RS256"
    };

    jwt.verify(token, publicKey, vOpts, (error, payload) => {
        if(error) {
            throw error
        };

        return payload;
    });
};