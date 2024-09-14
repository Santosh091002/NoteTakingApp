const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://SantoshDB:naiks@cluster0.81v2i1z.mongodb.net/',
    {useNewUrlParser: true, useUnifiedTopology: true}
);

const connection = mongoose.connection;
connection.once('open', () =>{
    console.log('MongoDB connection established Successfully');
});

const NotesRouter = require('./routes/Notes');
app.use('/Notes', NotesRouter);

app.listen(PORT, () =>{
    console.log(`Server running on port : ${PORT}`);

});