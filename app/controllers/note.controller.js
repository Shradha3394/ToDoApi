import Note from '../models/note.model.js';
import mongoose from 'mongoose';

const note = {
    createNote: (req, res) => {
        if (!req.body.content) {
            return res.status(400).send({ message: "Data can not be empty" })
        }

        const note = new Note({
            title: req.body.title || "Untitled Note",
            content: req.body.content
        });

        note.save()
            .then(data => res.send(data))
            .catch(err => res.status(500)
                .send({ message: err.message || "some error occoured" }));
    },

    findAllNotes: (req, res) => {
        Note.find()
            .then(notes => res.send(notes))
            .catch(err => res.status(500)
                .send({ message: err.message || "some error occoured" }));
    },

    findOneNote: (req, res) => {
        Note.findById(req.params.noteId)
            .then(note => {
                if (note)
                    res.send(note);
                else
                    res.status(500).send({ message: "some error occoured" })
            })
            .catch(err => res.status(500)
                .send({ message: err.message || "some error occoured" }));
    },

    updateNote: (req, res) => {
        if (!req.body.content) {
            return res.status(400).send({ message: "Data can not be empty" })
        }

        Note.findByIdAndUpdate(req.body._id, {
            title: req.body.title || "Untitled Note",
            content: req.body.content,
            done: req.body.done
        }, { new: true }).then(note => {
            if (note)
                res.send(note);
            else
                res.status(400).send({ message: "note not found" })
        })
            .catch(err => res.status(500)
                .send({ message: err.message || "some error occoured" }));
    },

    deleteNote: (req, res) => {
        Note.findByIdAndDelete(req.params.noteId)
            .then(note => {
                if (note)
                    res.send({ message: "note deleted successfully" })
                else
                    res.status(400).send({ message: "note not found" })
            })
            .catch(err => res.status(500)
                .send({ message: err.message || "some error occoured" }));
    },

    deleteCompleted: (req, res) => {
        if (req.body) {
            var idList = req.body.ids.map(s => mongoose.Types.ObjectId(s));
            Note.remove({ '_id': { '$in': idList } })
                .then(r => res.send({ message: "deleted scuccessfully" }))
                .catch(err => res.status(500)
                    .send({ message: err.message || "some error occoured" }));
        }
        else
            res.status(400).send({ message: "Data can not be empty" })
    }
}

export default note;