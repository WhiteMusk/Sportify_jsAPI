const eventResolver = require('./eventResolver');
const formResolver = require('./formResolver');
const hostResolver = require('./hostResolver');

module.exports = {
    Query: {
        ...eventResolver.Query,
        ...formResolver.Query,
        ...hostResolver.Query
    },
    Mutation: {
        ...eventResolver.Mutation,
        ...formResolver.Mutation,
        ...hostResolver.Mutation
    }
}