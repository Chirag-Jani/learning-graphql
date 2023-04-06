4th April:

https://youtube.com/playlist?list=PLpPqplz6dKxXICtNgHY1tiCPau_AwWAJU

- Completed EP 1 to 4:
  - querying
  - basic API using GraphQL and Apollo Client

## Queries and Mutations til EP 5

### Operations

```
query Users {
users {
id
name
userName
nationality
}
}

query GetUser($userId: ID!) {
user(id: $userId) {
nationality
name
favMovies {
name
}
}
}

query Movies {
movies {
name
isReleased
}
}

query GetMovie($name: String!) {
movie(name: $name) {
name
isReleased
id
}
}

query GetReleasedMovies($isReleased: Boolean!) {
releasedMovies(isReleased: $isReleased) {
name
id
}
}

query UserFavs($userFavsId: ID!) {
userFavs(id: $userFavsId) {
name
}
}

mutation AddMovie(
$addMovieId: ID!
$addMovieName2: String!
$addMovieIsReleased2: Boolean!
) {
addMovie(
id: $addMovieId
name: $addMovieName2
isReleased: $addMovieIsReleased2
) {
name
id
isReleased
}
}

mutation AddUserFavMovie(
$addUserFavMovieUserId2: ID!
$movieId: ID!
$movieName: String!
$isMovieReleased: Boolean!
) {
addUserFavMovie(
userId: $addUserFavMovieUserId2
movieId: $movieId
movieName: $movieName
isMovieReleased: $isMovieReleased
) {
name
favMovies {
name
}
}
}

mutation CreateUser($input: CreateUserInput!) {
createUser(input: $input) {
name
age
nationality
}
}

mutation UpdateUserName($updateUsernameInput2: UpdateUsernameInput!) {
updateUsername(input: $updateUsernameInput2) {
id
name
userName
}
}

mutation DeleteUser($deleteUserId: ID!){
deleteUser(id: $deleteUserId) {
id
name
}
}

### Variables

{
// (QUERY) while finding user with ID
"userId": "1",
// (QUERY) while finding movies using name
"name": "Loki 2",
// (QUERY) while finding released/unreleased movies
"isReleased": true,
// (QUERY) while finding perticular user's fav movies
"userFavsId": "1",
// (MUTATION) while adding movie
"addMovieId": "2021",
"addMovieName2": "Avengers: Endgame",
"addMovieIsReleased2": true,
// (MUTATIONN) while adding new fav movie to given user's list
"addUserFavMovieUserId2": "1",
"movieId": "69",
"movieName": "Whiplash",
"isMovieReleased": true,
// (MUTATION) while creating new user
"input": {
"age": 18,
"name": "User 1",
"userName": "u1_here"
},
// (MUTATION) while updating username
"updateUsernameInput2": {
"id": "11",
"userName": "jani_5901"
},
// (MUTATION) while deleting user
"deleteUserId": "3",
}
```
