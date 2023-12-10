const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: Object,
  },
});

const Note = mongoose.model("notes", NoteSchema);
module.exports = Note;
