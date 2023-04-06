import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";

const DisplayData = () => {
  const QUERY_ALL_USERS = gql`
    query Users {
      users {
        id
        name
        userName
        nationality
      }
    }
  `;

  const QUERY_ALL_MOVIES = gql`
    query Movies {
      movies {
        name
        isReleased
      }
    }
  `;

  const QUERY_MOVIE_BY_NAME = gql`
    query GetMovie($name: String!) {
      movie(name: $name) {
        id
        name
      }
    }
  `;

  const [movieName, setMovieName] = useState("");

  const handleChange = (e) => {
    setMovieName(e.target.value);
  };

  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(QUERY_ALL_USERS);

  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [getMovie, { data: movieSearchData, error: movieSearchError }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);

  if (movieSearchError) {
    console.log(movieSearchError.message);
  }

  return (
    <div>
      <hr color="black" />
      <h3>User Data:</h3>
      <div>
        {userLoading && <h1>Loading..</h1>}
        {userError && <h1>Error Occured!!</h1>}
        {userData &&
          userData.users.map((user) => {
            return (
              <div>
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
              </div>
            );
          })}
      </div>

      <hr color="black" />
      <h3>Movie Data:</h3>
      <div>
        {movieData.movies.map((movie) => {
          return (
            <div>
              <p>Name: {movie.name}</p>
            </div>
          );
        })}
      </div>

      <hr color="black" />
      <h3>Search Movie by Name:</h3>
      <div>
        <input
          type="text"
          placeholder="Enter Movie Name"
          onChange={handleChange}
          value={movieName}
        />
        <button
          onClick={() => {
            getMovie({
              variables: {
                name: movieName,
              },
            });
          }}
        >
          Search
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>Movie Found :)</h1>
              <p>{movieSearchData.movie.id}</p>
              <p>{movieSearchData.movie.name}</p>
            </div>
          )}
        </div>
      </div>
      <hr color="black" />
    </div>
  );
};

export default DisplayData;
