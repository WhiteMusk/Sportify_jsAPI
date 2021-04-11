const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({path: __dirname + '/.env'});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const eventsRouter = require('./routes/events');
const formsRouter = require('./routes/forms');

app.use('/events', eventsRouter);
app.use('/forms', formsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});