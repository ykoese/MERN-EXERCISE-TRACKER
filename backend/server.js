const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//! middleware
app.use(express.json()); // body parser
app.use (cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('MongoDB connection established successfully')
});

// !require and use routes

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);



app.listen(port, ()=>{
  console.log(`server running on http:localhost:${port}`);
})