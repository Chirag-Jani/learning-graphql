const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });

server
  .listen()
  .then(({ url }) => {
    console.log(`Server running on: ${url}`);
  })
  .catch((err) => {
    console.log(err);
  });
