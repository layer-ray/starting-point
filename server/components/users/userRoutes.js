const express = require("express");
const router = express.Router();

const {asyncHandler} = require("../errors/methods");
const {registerUser, loginUser, getUsers,
       getProfile, deleteUser, modifyUser, 
       getUserById, authorizationMw } = require("./userControllers");

router.param("uId", getUserById);

router.route("/profile/:uId")
        .get(getProfile)
        .patch(authorizationMw, asyncHandler(modifyUser))
        .delete(authorizationMw, asyncHandler(deleteUser));

router.get("/list", asyncHandler(getUsers));
router.post("/login", asyncHandler(loginUser));
router.post("/register", asyncHandler(registerUser));

module.exports = router;