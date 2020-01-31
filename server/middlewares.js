const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

function middlewares(app) {
  app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));
}

module.exports = middlewares;
