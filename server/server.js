// const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server');

require('dotenv').config({ path: __dirname + '/.env' });

// const app = express();
const port = process.env.PORT || 5000;

const typeDefs = require('./schema.graphql');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const EventDB = require('./models/event.model');
const FormDB = require('./models/form.model');
const HostDB = require('./models/host.model');

// app.use(cors());
// app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const db = mongoose.connection

db.on('error', (error) => {
    console.error(error)
})

db.once('open', () => {
    console.log('MongoDB connected!')

    // const pubsub = new PubSub()

    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query,
            Mutation
        },
        context: {
            EventDB,
            FormDB,
            HostDB
            //   pubsub
        }
    });

    server.listen().then(({ port }) => {
        console.log(`🚀  Server ready at ${port}`);
    });
})

// const eventsRouter = require('./routes/events');
// const formsRouter = require('./routes/forms');

// app.use('/events', eventsRouter);
// app.use('/forms', formsRouter);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });