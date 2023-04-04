const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    userName: String!
    age: Int!
    nationality: Nationality!
    friends: [User!]
  }

  type Movie {
    id: ID!
    name: String!
    isReleased: Boolean!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie
    releasedMovies(isReleased: Boolean!): [Movie!]!
  }

  enum Nationality {
    India
    US
    Canada
    Pak
  }
`;

module.exports = { typeDefs };
