const express = require('express');
const router = express.Router();
const Note = require('../models/Note.model');
const stringSimilarity = require('string-similarity');


const dictionary = [
    "hello", "world", "javascript", "natural", "processing", "language", "mern", "stack"
];

function autoCorrect(word) {
    const matches = stringSimilarity.findBestMatch(word, dictionary);
    return matches.bestMatch.target;
}

router.get('/', (req, res) => {
    const { word } = req.body;  // Make sure you send the data in the request body
    if (!word) {
        return res.status(400).json({ error: 'Word is required' });
    }
    const correctedWord = autoCorrect(word);
    res.json({ correctedWord });
});

module.exports = router;