const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    userName: String!
    age: Int!
    nationality: Nationality!
    friends: [User!]
    favMovies: [Movie!]
  }

  type Movie {
    id: ID!
    name: String!
    isReleased: Boolean!
  }

  enum Nationality {
    India
    US
    Canada
    Pak
  }

  input CreateUserInput {
    name: String!
    userName: String!
    age: Int!
    nationality: Nationality = India
  }

  input UpdateUsernameInput {
    id: ID!
    userName: String!
  }

  type Query {
    users: UserResults # new using union
    # users: [User!]! # old
    user(id: ID!): User!
    movies: [Movie!]!
    movie(name: String!): Movie
    releasedMovies(isReleased: Boolean!): [Movie!]!
    userFavs(id: ID!): [Movie]
  }

  type Mutation {
    addMovie(id: ID!, name: String!, isReleased: Boolean!): Movie!
    addUserFavMovie(
      userId: ID!
      movieId: ID!
      movieName: String!
      isMovieReleased: Boolean!
    ): User!

    createUser(input: CreateUserInput!): User

    updateUsername(input: UpdateUsernameInput!): User

    deleteUser(id: ID!): User
  }

  type UsersResultSuccess {
    users: [User!]!
  }

  type UsersResultError {
    message: String!
  }

  union UserResults = UsersResultSuccess | UsersResultError
`;

module.exports = { typeDefs };
