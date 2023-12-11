const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    desc: {
      type: String,
      required: [true, "this is description error"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("notes", NoteSchema);
module.exports = { Note, NoteSchema };
