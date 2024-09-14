const express = require('express');
const router = express.Router();
const Note = require('../models/Note.model');

router.post('/add', (req, res) =>{
    const { title, content} = req.body;

    const newNote = new Note({
        title,
        content
    });

    newNote.save()
        .then(() => res.json('Note added!'))
        .catch(err => res.status(400).json(`Error : ${err}`));
});

router.get('/', (req, res)=>{
    Note.find()
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json(`Error: ${err}`));
});


module.exports = router;