const usersURL = 'http://localhost:3000/users'

document.addEventListener("DOMContentLoaded", function() {
    const newPlayer = document.getElementById("createAccountButton")
    const oldPlayer = document.getElementById("signInButton")
    const signOut = document.getElementById('signOutButton')
    const newGame = document.getElementById('newGameButton')
    const oldGame = document.getElementById('oldGameButton')

    const bigLogo = document.getElementById('bigLogoDiv')

    
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
            const thisUser = getUsers(event.target.username.value)
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

        newPlayer.hidden = false
        oldPlayer.hidden = false
        signOut.hidden = true
        newGame.hidden = true
        oldGame.hidden = true
        newUserForm.hidden = true
        bigLogo.hidden = false
    })
    newGame.addEventListener('click', function(event){
        event.preventDefault()
        const map = document.getElementById('map')
        const contentBox = document.getElementById('bigbox')
        bigLogo.hidden = true
        contentBox.className = "contentbox"
        map.hidden = false
    })
    oldGame.addEventListener('click', function(event){
        event.preventDefault()
        const contentBox = document.getElementById('bigbox')
        bigLogo.hidden = true
        contentBox.className = "contentbox"
        map.hidden = true
        const oldGamesForm = document.getElementById('oldGamesForm')
        const games = showGames(gameData)
        console.log(games)
        games.forEach(function(game){
            const oldGameInput = document.createElement('input')
            oldGameInput.type = "button"
            oldGameInput.textContent = `Level ${game.level} - $${game.money} - ${game.created_at}`
            oldGamesForm.appendChild(oldGameInput)
            oldGameInput.addEventListener('click', function(event){
                event.preventDefault()
                // start game
            })
        })
    })
  })
  
  function createUser (event) {
    newUser = {name: `${event.target.newUserName.value}`}

    fetch(usersURL, {
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
        console.log(data)
    })
    .catch((error) => {
        alert ("OH FUCK - TRY STARTING A RAILS SERVER");
        console.error('Error:', error)
    })
  }

  function getUsers (currentUser) {
    const ourUser = fetch(usersURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        return findUser(data, currentUser)
    })
    .catch((error) => {
        alert ("OH FUCK - YOU SHOULD PROBABLY START A RAILS SERVER");
        console.error('Error:', error)
    })

    return ourUser
  }

  function findUser(allUsers, currentUser) {
    return allUsers.find(user => user.name.toLowerCase() === currentUser.toLowerCase())
  }



  function showGames (gameData) {
      console.log("this makes a ul that lists all of the user's games that you can click on to load that game")
      
  }