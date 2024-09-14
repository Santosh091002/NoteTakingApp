const express = require('express');
const router = express.Router();
const Note = require('../models/Note.model');
var ObjectId = require('mongodb').ObjectId;


router.post('/add', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json('Title and content are required.');
    }

    const newNote = new Note({
        title,
        content
    });

    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


router.get('/', (req, res) => {
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.put('/update/:id', (req, res) => {
    const noteId = req.params.id;

    Note.findOne({_id: new ObjectId(noteId)})
        .then(note => {
            if (!note) {
                return res.status(404).json('Note not found');
            }

            note.title = req.body.title;
            note.content = req.body.content;

            note.save()
                .then(() => res.json('Note updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', (req, res) =>{
    const noteId = req.params.id;

    Note.findOneAndDelete({_id: new ObjectId(noteId)})
        .then(() => res.json('Notes deleted'))
        .catch(err=> res.status(400).json(`Error: ${err}`));
})

module.exports = router;
