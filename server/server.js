const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

require('dotenv').config({ path: __dirname + '/.env' });

const typeDefs = require('./schema.graphql');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Event = require('./models/event.model');
const Form = require('./models/form.model');
const Host = require('./models/host.model');

const port = process.env.PORT || 5000;
const MONGO_DB = process.env.ATLAS_URI;

mongoose.connect(MONGO_DB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
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
            Event,
            Form,
            Host
            //   pubsub
        }
    });

    server.listen(port).then(({ url }) => {
        console.log(`🚀 Server running at ${url}`);
    });
})

// const eventsRouter = require('./routes/events');
// const formsRouter = require('./routes/forms');

// app.use('/events', eventsRouter);
// app.use('/forms', formsRouter);

// app.listen(port, () => {
//     console.log(`Server is running on port: ${port}`);
// });