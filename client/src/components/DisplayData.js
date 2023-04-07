import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
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

  const CREATE_USER_MUTATION = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        name
        age
        nationality
      }
    }
  `;

  const [movieName, setMovieName] = useState("");

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [userName, setUserName] = useState("");
  const [nationality, setNationality] = useState("");

  const handleChange = (e) => {
    setMovieName(e.target.value);
  };

  const {
    data: userData,
    loading: userLoading,
    error: userError,
    refetch,
  } = useQuery(QUERY_ALL_USERS);

  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [getMovie, { data: movieSearchData, error: movieSearchError }] =
    useLazyQuery(QUERY_MOVIE_BY_NAME);

  if (movieSearchError) {
    console.log(movieSearchError);
  }

  const [addUser] = useMutation(CREATE_USER_MUTATION);

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
                <p>Name: {user.userName}</p>
                <p>Name: {user.nationality}</p>
              </div>
            );
          })}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setAge(Number(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nationality"
          onChange={(e) => {
            setNationality(e.target.value);
          }}
        />
        <button
          onClick={() => {
            addUser({
              variables: {
                input: {
                  name,
                  userName,
                  nationality,
                  age,
                },
              },
            });
            refetch();
          }}
        >
          Add User
        </button>
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
