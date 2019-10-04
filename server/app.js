const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const {httpError, serverError} = require("./components/errors/methods");

const userRoutes = require("./components/users/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.get("*", (req, res, next) => {
    res.sendFile("index.html", {root: path.join(__dirname, "../client/dist")});
});

app.use(httpError);
app.use(serverError);

module.exports = app;