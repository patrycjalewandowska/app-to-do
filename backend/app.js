const express = require('express');
const cors = require('cors');

require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://'+ process.env.DB_USERNAME+
    ':'+ 
    process.env.DB_PASSWORD +
    '@cluster0.q8zhjov.mongodb.net/tasks?retryWrites=true&w=majority');

const app = express();
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const taskRoutes = require('./api/routes/tasks');
const userRoutes = require('./api/routes/users');

app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);


const port = process.env.PORT || 3001;

app.use((req, res, next) => {
    res.status(404).json({ wiadomosc: 'Nie odnaleziono' });
  });



module.exports = app;
