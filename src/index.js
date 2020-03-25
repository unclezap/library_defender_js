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
        newUserForm.addEventListener('submit', function(event){
            event.preventDefault()

            //use event attributes to create new user
            //made them in the createUser function instead
            contentBox.className = "hiddencontentbox"
            newPlayer.hidden = true
            oldPlayer.hidden = true
            signOut.hidden = false
            newGame.hidden = false
            oldGame.hidden = false
            createUser(event)
        })
    })
  
    oldPlayer.addEventListener("click", function(event) {
        event.preventDefault()
        getUsers(event)
        const contentBox = document.getElementById('bigbox')
        contentBox.className = "contentbox"
        findUser(event)
    })
  })
  
  function createUser (event) {
      debugger;
    newUser = {name: `${event.target.newUserName.value}`}
    console.log("You're making a new player! Huzzah!")
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
        debugger;
    })
    .catch((error) => {
        alert ("OH FUCK");
        console.error('Error:', error)
    })
  }

  function getUsers (userId) {
    // console.log(userId) <- don't think this is necessary, will take it out soon
    console.log("You're finding old users!")
    fetch(usersURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
    .catch((error) => {
        alert ("OH FUCK");
        console.error('Error:', error)
    })
  }

  function showGames (gameData) {
      console.log("this makes a ul that lists all of the user's games that you can click on to load that game")
      console.log
  }