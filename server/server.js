const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers } = require('graphql-scalars');
const mongoose = require('mongoose');

const self_typeDefs = require('./graphql/schema.graphql');
const self_resolvers = require('./graphql/resolvers');

require('dotenv').config({ path: `${__dirname}/../.env` });

const port = process.env.SERVER_PORT || 5000;
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
        typeDefs: [...typeDefs, self_typeDefs],
        resolvers: { ...resolvers, ...self_resolvers }
    });

    server.listen(port).then(({ url }) => {
        console.log(`🚀 Server running at ${url}`);
    });
})