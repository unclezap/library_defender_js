const usersURL = 'http://localhost:3000/users'
const gamesURL = 'http://localhost:3000/games'
let thisUser;
let thisGame;
let userGames;

//moved these out here so I can call userGone in functions outside of the domcontentloaded event
//also useful for the playGame functionality
const sideNav = document.getElementById('sidenav')
const sideNavLevel = document.getElementById('sidenavlevel')
const sideNavLibrary = document.getElementById('sidenavlibrary')
const sideNavMoney = document.getElementById('sidenavmoney')

const newPlayer = document.getElementById("createAccountButton")
const oldPlayer = document.getElementById("signInButton")
const signOut = document.getElementById('signOutButton')
const newGame = document.getElementById('newGameButton')
const oldGame = document.getElementById('oldGameButton')

const bigLogo = document.getElementById('bigLogoDiv')


document.addEventListener("DOMContentLoaded", function() {


    
    newPlayer.addEventListener("click", function() {
        event.preventDefault()

        const contentBox = document.getElementById('bigbox')
        contentBox.className = "contentbox"
        const newUserForm = document.getElementById('newUserForm')
        bigLogo.hidden = true
        oldUserForm.hidden = true
        newUserForm.hidden = false

        newUserForm.addEventListener('submit', function(event){
            event.preventDefault()
            
            contentBox.className = "hiddencontentbox"
            newPlayer.hidden = true
            oldPlayer.hidden = true
            signOut.hidden = false
            newGame.hidden = false
            oldGame.hidden = false
            newUserForm.hidden = true
            bigLogo.hidden = false
          
            createUser(event)
        })
    })
  
    oldPlayer.addEventListener("click", function(event) {
        event.preventDefault()
        
        const contentBox = document.getElementById('bigbox')
        const oldUserForm = document.getElementById('oldUserForm')
        contentBox.className = "contentbox"
        bigLogo.hidden = true
        newUserForm.hidden = true
        oldUserForm.hidden = false

        oldUserForm.addEventListener('submit', function(event){
            event.preventDefault()
            getUsers(event.target.username.value)
            // moved all the navigation bar hidden true/false things to the fetch in case the user doesn't exist
            contentBox.className = "hiddencontentbox"
            newPlayer.hidden = true
            oldPlayer.hidden = true
            signOut.hidden = false
            newGame.hidden = false
            oldGame.hidden = false
            newUserForm.hidden = true
            bigLogo.hidden = false
            oldUserForm.hidden = true

        })
    })

    signOut.addEventListener('click', function(event){
        event.preventDefault()
        //moved this code to a function so I can use it when the user tries to sign in but we can't find their record/it doesn't exist
        //exists further down because it's not an event listener
        thisGame = null
        thisUser = null
        userGames = null
        
        userGone()
    })



    newGame.addEventListener('click', function(event){
        event.preventDefault()
        createGame()
        const map = document.getElementById('maparea')
        const contentBox = document.getElementById('bigbox')
        bigLogo.hidden = true
        contentBox.className = "contentbox"
        map.hidden = false
        sideNav.hidden = false

    })

    oldGame.addEventListener('click', function(event){
        event.preventDefault()
        const contentBox = document.getElementById('bigbox')
        sideNav.hidden = true
        bigLogo.hidden = true
        contentBox.className = "contentbox"
        const map = document.getElementById('maparea')
        map.hidden = true
        const oldGamesForm = document.getElementById('oldGamesForm')
        showGames()
    })
  })

  //^^^ the }) up above represents the end of the domcontentloaded event listener
  function userGone () {
    const contentBox = document.getElementById('bigbox')
    contentBox.className = "hiddencontentbox"
    const map = document.getElementById('maparea')
    map.hidden = true
    sideNav.hidden = true
    //where the thisUser = null etc. used to be
    newPlayer.hidden = false
    oldPlayer.hidden = false
    signOut.hidden = true
    newGame.hidden = true
    oldGame.hidden = true
    newUserForm.hidden = true
    bigLogo.hidden = false
    //this vvv removes a bug where when you signed out all the old games remained attached and clickable to the oldGamesForm
    oldGamesForm.innerHTML = ""
}

  function createUser (event) {
    newUser = {name: `${event.target.newUserName.value}`}

    thisUser = fetch(usersURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            newUser
        })      
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        thisUser = data
        console.log(data)
    })
    .catch((error) => {
        console.error('Error:', error)
        alert ("OH FUCK - TRY STARTING A RAILS SERVER");
    })
  }

  function getUsers (currentUser) {
    fetch(usersURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        findUser(data, currentUser)
    })
    .catch((error) => {
        console.error('Error:', error)
        alert ("OH FUCK - YOU SHOULD PROBABLY START A RAILS SERVER");
    })

  }

  function findUser(allUsers, currentUser) {
    thisUser = allUsers.find(user => user.name.toLowerCase() === currentUser.toLowerCase())
    if (thisUser === undefined) {
        alert ("Sorry, you don't have any games")
        userGone()
    }
  }



  function showGames () {
      const ourGames = fetch(gamesURL)
      .then(function(response) {
          return response.json()
      })
      .then(function(data) {
          makeButtons(data)
      })
      .catch((error) => {
        console.error('Error:', error)
        alert ("OH FUCK - YOU SHOULD PROBABLY START A RAILS SERVER");
      })
  
  }

  function makeButtons(allGames) {
      const games = allGames.filter(game => game.user_id === thisUser.id)
      const userGames = games
      const oldGames = document.getElementById("oldGameDiv")
      oldGames.hidden = false
      games.forEach(function(game){
        const oldGameInput = document.createElement('button')
        oldGameInput.className = "navbutton"
        oldGameInput.textContent = `Level ${game.current_level} - $${game.money} - ${game.created_at}`
        oldGameInput.id = game.id
        oldGamesForm.appendChild(oldGameInput)
        oldGameInput.addEventListener('click', function(event){
            event.preventDefault()
            console.log("clicked an old game")
            thisGame = userGames.find(possibleGame => possibleGame.id === game.id)

            // import { test } from './gamePlay.js';   
            // let val = test();  // val is "Hello"
            // val
            playGame()

            // debugger;
            // test()
            // const gamePlayModule = require('./gamePlay')
            // gamePlayModule.test()
            // debugger;
            // gamePlayModule.playGame(thisUser)
            //write code that starts a game with the button
            //also we need to add code that shows some message if there are no games for a user
            //stuff for aidan to do
        })
    })

  }

  function createGame () {
    thisGame = fetch(gamesURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            thisUser
        })      
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        thisGame = data
        playGame()
    })
    .catch((error) => {
        console.error('Error:', error)
        alert ("OH FUCK - TRY STARTING A RAILS SERVER");
    })

  }


  //=============================================
  //GamePlay Stuff
  //============================================

//   const usersURL = 'http://localhost:3000/users'
//   const gamesURL = 'http://localhost:3000/games'
  const levelsURL = 'http://localhost:3000/levels'
  const librariesURL = 'http://localhost:3000/levels'
  
  let thisLevel;
  let thisLibrary;
  let currentHealth;
  let currentMoney;
  let currentMonsters;
  
  function playGame() {
      levelFetch()
  }
  
  function levelFetch() {
    fetch(`${gamesURL}/${thisGame.id}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        thisLevel = data.levels.find(level => 
            level.level_number === thisGame.current_level
        )
        thisLibrary = data.library 
        currentHealth = thisLibrary.health
        currentMoney = thisGame.money
        fetchMonsters(data)
        setSideNavValues()
    })
    .catch((error) => {
        console.error('Error:', error)
        alert ("NO LEVEL FOR YOU")
    })
  }
  
  function fetchMonsters(data) {
    fetch(`${levelsURL}/${data.levels.find(level => level.level_number === thisGame.current_level).id}}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        currentMonsters = data.monsters
    })  
    .catch((error) => {
        console.error('Error', error)
        alert ("A MONSTER ATE YOUR MONSTERS")
    })   
  }
  
  function setSideNavValues() {
      sideNavLevel.innerText = `Level: ${thisGame.current_level}`
      sideNavLibrary.innerText = `Books: ${currentHealth}`
      sideNavMoney.innerText = `Money: $${currentMoney}`
    }



