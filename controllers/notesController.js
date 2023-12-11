const { Note } = require("../model/notesModel");
const User = require("../model/userModel");

exports.createNote = async (req, res) => {
  const userId = req._id;
  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(401).send({ message: "User not found!" });
    }
    const { title, desc } = req.body;

    const note = await Note.create({
      title: title,
      desc: desc,
      owner: user._id,
    });

    return res.status(200).send({ note: note });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

exports.myAllNotes = async (req, res) => {
  const userId = req._id;
  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(401).send({ message: "User not found!" });
    }
    const allNotes = await Note.find({ owner: userId });
    return res.status(200).send({ notes: allNotes });
  } catch (error) {
    return res.status(500).send({ message: "Error getting my notes" });
  }
};

exports.deleteNote = async (req, res) => {
  const userId = req._id;
  const noteId = req.params.id;
  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(401).send({ message: "User not found!" });
    }
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send({ message: "Note not found!" });
    }
    if (note.owner.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "Unauthorized access to delete note!" });
    }
    await Note.findByIdAndDelete(noteId);
    return res.status(200).send({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Error deleting note" });
  }
};

exports.updateNote = async (req, res) => {
  const userId = req._id;
  const noteId = req.params.id;
  const { title, desc } = req.body;
  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(401).send({ message: "User not found!" });
    }
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).send({ message: "Note not found!" });
    }
    if (note.owner.toString() !== userId) {
      return res
        .status(403)
        .send({ message: "Unauthorized access to delete note!" });
    }
    if (title || desc) {
      if (title) {
        note.title = title;
      }
      if (desc) {
        note.desc = desc;
      }

      await note.save();
      return res.status(200).send({ message: "Note updated successfully!" });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error updating note" });
  }
};
