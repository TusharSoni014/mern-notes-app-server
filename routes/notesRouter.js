const express = require("express");
const { createNote, deleteNote } = require("../controllers/notesController");
const verifyToken = require("../middlewares/verifyToken");
const notesRouter = express.Router();

notesRouter.post("/create", verifyToken, createNote);
notesRouter.delete("/delete/:id", verifyToken, deleteNote);

module.exports = notesRouter;
