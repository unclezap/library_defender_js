const usersURL = 'http://localhost:3000/users'
const skull = document.getElementById("skull")


document.addEventListener("DOMContentLoaded", function() {
    const newPlayer = document.getElementById("createAccountButton")
    const oldPlayer = document.getElementById("signInButton")
    
    newPlayer.addEventListener("click", function() {
        event.preventDefault()
        createUser()
    })
  
    oldPlayer.addEventListener("click", function(event) {
        event.preventDefault()
        getUsers(event)
    })


    skull.addEventListener("dragend", function (event) {
        console.log(event)
        // debugger;
        skull.style.left = `${event.screenX}px`;
        skull.style.bottom = `${event.screenY}px`;

        // debugger;
    })
  })

//   function allowDrop(event) {
//       event.preventDefault()
//   }

//   function drag(event) {
      
//   }

//   function drop(event) {
//       event.preventDefault();
//       debugger;
//       skull.style.left = `${event.screenX}px`;
//       skull.style.bottom = `${event.screenY}px`;

//         debugger;
//   }
  
  function createUser () {
    newUser = {name: "Testy McTesterson"}
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
    console.log(userId)
    console.log("You're finding old games!")
    //need to see what info we get back and set a variable to user_id
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