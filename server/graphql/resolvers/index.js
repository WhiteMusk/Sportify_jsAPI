const eventResolver = require('./eventResolver');
const formResolver = require('./formResolver');

module.exports = {
    Query: {
        ...eventResolver.Query
    },
    Mutation: {
        ...formResolver.Mutation
    }
}