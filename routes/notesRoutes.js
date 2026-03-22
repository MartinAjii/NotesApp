const express = require('express');
const router = express.Router();

const notesController = require("../controllers/notesController");

router.get("/notes", notesController.getAllNotes);
router.get("/notes/:id", notesController.getNotesById);
router.post("/notes", notesController.createNote);
router.put("/notes/:id", notesController.editNote);
router.delete("/notes/:id", notesController.deleteNote);

module.exports = router;