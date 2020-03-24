document.addEventListener("DOMContentLoaded", function() {
    const newPlayer = document.getElementById("createAccountButton")
    const oldPlayer = document.getElementById("signInButton")
    const signOut = document.getElementById('signOutButton')
    const newGame = document.getElementById('newGameButton')
    const oldGame = document.getElementById('oldGameButton')

    const bigLogo = document.getElementById('bigLogoDiv')


    console.log(newPlayer)
    console.log("hi")
    
    newPlayer.addEventListener("click", function() {
        event.preventDefault()
        const contentBox = document.getElementById('bigbox')
        contentBox.className = "contentbox"
        const newUserForm = document.getElementById('newUserForm')
        bigLogo.hidden = true
        newUserForm.addEventListener('submit', function(event){
            event.preventDefault()

            //use event attributes to create new user
            
            contentBox.className = "hiddencontentbox"
            newPlayer.hidden = true
            oldPlayer.hidden = true
            signOut.hidden = false
            newGame.hidden = false
            oldGame.hidden = false
        })
        createUser()
    })
  
    oldPlayer.addEventListener("click", function(event) {
        event.preventDefault()
        const contentBox = document.getElementById('bigbox')
        contentBox.className = "contentbox"
        findUser(event)
    })
  })
  
  function createUser () {
  console.log("You're making a new player! Huzzah!")
  }

  function findUser (userId) {
    console.log(userId)
    console.log("You're finding old games!")
    //need to see what info we get back and set a variable to user_id
    fetch(`http://localhost:3000/users/${userIdVariableWeSetEarlier}`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        showGames(data)
    })
  }

  function showGames (gameData) {
      console.log("this makes a ul that lists all of the user's games that you can click on to load that game")
  }