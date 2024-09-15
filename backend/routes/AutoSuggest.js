const express = require('express');
const router = express.Router();
const Note = require('../models/Note.model');
const natural = require('natural');
const NGrams = natural.NGrams;

const nGramIndex = {};

const textCorpus = [
    "The quick brown fox jumps over the lazy dog",
    "JavaScript is a versatile language",
    "Natural language processing is a branch of artificial intelligence",
    "MERN stack is a powerful combination for building web apps"
];

function buildNGramIndex(n = 2) {
    textCorpus.forEach(sentence => {
        const ngrams = NGrams.ngrams(sentence, n);
        ngrams.forEach(ngram => {
            const key = ngram[0]; // Use the first word as the key
            if (!nGramIndex[key]) {
                nGramIndex[key] = [];
            }
            nGramIndex[key].push(ngram.join(' '));
        });
    });
}

buildNGramIndex();

function generateSuggestions(input) {
    return nGramIndex[input] || [];
}

router.get('/', (req, res) => {
    const { input } = req.body;
    const suggestions = generateSuggestions(input);
    res.json({ suggestions });
});

module.exports = router;