const { UserList, MovieList } = require("./DemoData");
const _ = require("lodash");
const fs = require("fs");

const resolvers = {
  // all the queries available
  Query: {
    // to get all the users
    users: (parent, args, context, info) => {
      console.log(info);
      if (UserList) return { users: UserList };

      return { message: "Some error occured!" };
    },

    // to get one specific user based on id
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    // to get all the movies
    movies: () => {
      return MovieList;
    },

    // to get one specific movie based on name
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    },

    // to get all the released or unreleased movies
    releasedMovies: (parent, args) => {
      const isReleased = args.isReleased;
      const movies = _.filter(
        MovieList,
        (movie) => movie.isReleased == Boolean(isReleased)
      );

      return movies;
    },

    userFavs: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user.favMovies;
    },
  },

  // all the mutations available
  Mutation: {
    addMovie: (parent, args) => {
      const { id, name, isReleased } = args;
      return addNewMovie(id, name, isReleased);
    },

    addUserFavMovie: (parent, args) => {
      const { userId, movieId, movieName, isMovieReleased } = args;
      return addUserFavMovie(userId, movieId, movieName, isMovieReleased);
    },

    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);

      return user;
    },

    updateUsername: (parent, args) => {
      const user = _.find(UserList, { id: Number(args.input.id) });

      UserList.forEach((u) => {
        if (u.id == Number(args.input.id)) {
          u.userName = args.input.userName;
        }
      });

      return user;
    },

    deleteUser: (parent, args) => {
      const id = args.id;

      _.remove(UserList, (u) => u.id === Number(id));

      return null;
    },
  },

  // look for this one - later part of episode 4
  // User: {
  //   favMovies: (parent, args) => {
  //     // const user = _.find(UserList, { id });
  //     // return user.favMovies;
  //     return MovieList;
  //   },
  // },

  UserResults: {
    __resolveType(obj) {
      if (obj.users) {
        return "UsersResultSuccess";
      }
      if (obj.message) {
        return "UsersResultError";
      }
      return null;
    },
  },
};

// functin to add new movie - called in the mutation resolver
const addNewMovie = (id, name, isReleased) => {
  const newMovie = {
    id,
    name,
    isReleased,
  };

  MovieList.push(newMovie);

  return newMovie;
};

// function to add fav movies to the user's data
const addUserFavMovie = (userId, movieId, movieName, isMovieReleased) => {
  const user = _.find(UserList, { id: Number(userId) });

  MovieList.push({
    id: movieId,
    name: movieName,
    isReleased: isMovieReleased,
  });

  user.favMovies.push({
    id: movieId,
    name: movieName,
    isReleased: isMovieReleased,
  });

  return user;
};

module.exports = { resolvers };
