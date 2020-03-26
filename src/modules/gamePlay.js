// {
//     "type": "module"
// }
// export function test() {
//     console.log("hello")
//     return "Hello";
//   }
//   module.exports = {
//     hello: function() {
//         console.log("hello")
//         return "Hello";
//     }
//  }

console.log("The gameplay is running!!!!")
const usersURL = 'http://localhost:3000/users'
const gamesURL = 'http://localhost:3000/games'
const levelsURL = 'http://localhost:3000/levels'
const librariesURL = 'http://localhost:3000/levels'

const currentLevel
const currentHealth
const currentMoney
const thisLibrary

function playGame(thisUser, thisGame) {
    levelFetch(thisGame)
    libraryFetch(thisGame)
    // console.log("it's playing")
    // debugger;
}

function levelFetch(thisUser) {
    fetch(levelsURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        debugger;
        fetchMonsters(data)
    })
    .catch((error) => {
        console.error('Error:', error)
        alert ("NO LEVEL FOR YOU")
    })
}

function fetchMonsters(thisLevel) {
    
}
// fetch for level

// fetch for monsters from level
