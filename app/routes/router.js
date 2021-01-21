import express from 'express';
import note from '../controllers/note.controller.js';
var router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
  });

router.route('/notes')
    .get(note.findAllNotes)
    .post(note.createNote)
    .put(note.updateNote);

router.route('/notes/delete').post(note.deleteCompleted);
    
router.route('/notes/:noteId')
    .get(note.findOneNote)
    .delete(note.deleteNote);

export default router;