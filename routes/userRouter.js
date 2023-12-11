const express = require("express");
const {
  signup,
  login,
  logout,
  userInfo,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const { myAllNotes } = require("../controllers/notesController");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/userInfo", verifyToken, userInfo);
userRouter.get("/my-notes", verifyToken, myAllNotes);

module.exports = userRouter;
