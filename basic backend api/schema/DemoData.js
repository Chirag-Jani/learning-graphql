const UserList = [
  {
    id: 1,
    name: "Jani",
    userName: "jani01",
    age: 22,
    nationality: "India",
    friends: [
      {
        id: 2,
        name: "mike",
        userName: "mikeyy",
        age: 16,
        nationality: "US",
      },
    ],
  },
  {
    id: 2,
    name: "mike",
    userName: "mikeyy",
    age: 16,
    nationality: "US",
    friends: [
      {
        id: 3,
        name: "umran",
        userName: "terror",
        age: 69,
        nationality: "Pak",
      },
    ],
  },
  {
    id: 3,
    name: "umran",
    userName: "terror",
    age: 69,
    nationality: "Pak",
  },
];

const MovieList = [
  {
    id: 11,
    name: "Iron Man 1",
    isReleased: true,
  },
  {
    id: 22,
    name: "Spiderman: No Way Home",
    isReleased: true,
  },
  {
    id: 33,
    name: "Loki 2",
    isReleased: false,
  },
];

module.exports = { UserList, MovieList };
