const { UserList, MovieList } = require("./DemoData");
const _ = require("lodash");

const resolvers = {
  Query: {
    users: () => {
      return UserList;
    },

    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    movies: () => {
      return MovieList;
    },

    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name: name });
      return movie;
    },

    releasedMovies: (parent, args) => {
      const isReleased = args.isReleased;
      const movies = [];
      MovieList.map((movie) => {
        if (movie.isReleased == Boolean(isReleased)) {
          movies.push(movie);
        }
      });
      return movies;
    },
  },
};

module.exports = { resolvers };
