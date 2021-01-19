import express from 'express';
import note from '../controllers/note.controller.js';
var router = express.Router();

router.route('/notes')
    .get(note.findAllNotes)
    .post(note.createNote);

router.route('/notes/:noteId')
    .get(note.findOneNote)
    .put(note.updateNote)
    .delete(note.deleteNote);

export default router;