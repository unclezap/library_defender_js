const usersURL = 'http://localhost:3000/users'
const gamesURL = 'http://localhost:3000/games'
let thisUser;
let thisGame;
let userGames;

//moved these out here so I can call userGone in functions outside of the domcontentloaded event
//also useful for the playGame functionality

const newPlayer = document.getElementById("createAccountButton")
const oldPlayer = document.getElementById("signInButton")
const signOut = document.getElementById('signOutButton')
const newGame = document.getElementById('newGameButton')
const oldGame = document.getElementById('oldGameButton')

const bigLogo = document.getElementById('bigLogoDiv')

const map = document.getElementById('maparea')

    const noGames = document.createElement('p')
    noGames.id = "noGamesMessage"
    noGames.textContent = "You have no saved games"
    noGames.className = "formtitle"

    const sideNav = document.getElementById('sidenav')
    const sideNavLevel = document.getElementById('sidenavlevel')
    const sideNavLibrary = document.getElementById('sidenavlibrary')
    const sideNavMoney = document.getElementById('sidenavmoney')


document.addEventListener("DOMContentLoaded", function() {


    
    newPlayer.addEventListener("click", function() {
        event.preventDefault()

        const contentBox = document.getElementById('bigbox')
        contentBox.className = "contentbox"
        const newUserForm = document.getElementById('newUserForm')
        bigLogo.hidden = true
        oldUserForm.hidden = true
        newUserForm.hidden = false
        noGames.hidden = true

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
        noGames.hidden = true

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
        //going to move map to the outside so it can be used in gameplay
        // const map = document.getElementById('maparea')
        const contentBox = document.getElementById('bigbox')
        bigLogo.hidden = true
        contentBox.className = "contentbox"
        map.hidden = false
        sideNav.hidden = false
        noGames.hidden = true

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
       

        //         // we need this stuff \/
        //         oldGamesForm.hidden = true
        //         map.hidden = false
        //         sideNav.hidden = false
    })
    // <div id= "item" class="child"> 
    //     <img class='imginside' src="unnamed.png">
    // </div>
    const map = document.getElementById('maparea')
    
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
            thisGame = userGames.find(possibleGame => possibleGame.id === game.id)
            playGame()    
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

  function getAllLibrarians() {
    fetch(librariansURL)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        allLibrarians = data
        makeLibrarianButtons(allLibrarians)
    })
    .catch((error) => {
        console.error('Error:', error)
        alert ("THE LIBRARIANS ARE ON A BREAK");
    })

}

function makeLibrarianButtons(allLibrarians) {
    const librarian1button = document.getElementById('defender1button')
    librarian1button.addEventListener('click',function(event){
        event.preventDefault()
        let lib1 = allLibrarians.librarian1
        if(currentMoney >= lib1.cost){
            currentMoney -= lib1.cost
            sideNavMoney.innerText = `Money: ${currentMoney}`
            const itemdiv = document.createElement('div')
            itemdiv.id = "item1"
            itemdiv.className = "child"
            const itemP = document.createElement('p')
            itemP.hidden = true
            itemP.innerText = `${lib1.attack_damage}`
            itemP.className = "damage"
            itemdiv.appendChild(itemP)
            const itemimg = document.createElement('img')
            itemimg.className = "imginside"
            itemimg.setAttribute('src', "./src/images/librarian1.png")
            itemdiv.appendChild(itemimg)
            currentDefenders.push(itemdiv)

            map.appendChild(itemdiv)
            $(function () {
                $("div[id='item1']").draggable({
                    containment: "#con",
                    scroll: false
                });
            }); 
        }
    })
    const librarian2button = document.getElementById('defender2button')
    librarian2button.addEventListener('click',function(event){
        event.preventDefault()
        let lib2 = allLibrarians.librarian2
        if(currentMoney >= lib2.cost){
            currentMoney -= lib2.cost
            sideNavMoney.innerText = `Money: ${currentMoney}`
            const itemdiv = document.createElement('div')
            itemdiv.id = "item2"
            itemdiv.className = "child"
            const itemP = document.createElement('p')
            itemP.hidden = true
            itemP.innerText = `${lib2.attack_damage}`
            itemP.className = "damage"
            itemdiv.appendChild(itemP)
            const itemimg = document.createElement('img')
            itemimg.setAttribute('src', "./src/images/librarian2.png")
            itemimg.className = "imginside"
            itemdiv.appendChild(itemimg)
            map.appendChild(itemdiv)
            currentDefenders.push(itemdiv)
            $(function () {
                $("div[id='item2']").draggable({
                    containment: "#con",
                    scroll: false
                });
            });
        }
    })
    const librarian3button = document.getElementById('defender3button')
    librarian3button.addEventListener('click',function(event){
        event.preventDefault()
        let lib3 = allLibrarians.librarian3
        if(currentMoney >= lib3.cost){
            currentMoney -= lib3.cost
            sideNavMoney.innerText = `Money: ${currentMoney}`
            const itemdiv = document.createElement('div')
            itemdiv.id = "item3"
            itemdiv.className = "child"
            const itemP = document.createElement('p')
            itemP.hidden = true
            itemP.innerText = `${lib3.attack_damage}`
            itemP.className = "damage"
            itemdiv.appendChild(itemP)
            const itemimg = document.createElement('img')
            itemimg.setAttribute('src', "./src/images/librarian3.png")
            itemimg.className = "imginside"
            itemdiv.appendChild(itemimg)
            map.appendChild(itemdiv)
            currentDefenders.push(itemdiv)
            $(function () {
                $("div[id='item3']").draggable({
                    containment: "#con",
                    scroll: false
                });
            });
        }
    })
    const librarian4button = document.getElementById('defender4button')
    librarian4button.addEventListener('click',function(event){
        event.preventDefault()
        let lib4 = allLibrarians.librarian4
        if(currentMoney >= lib4.cost){
            currentMoney -= lib4.cost
            sideNavMoney.innerText = `Money: ${currentMoney}`
            const itemdiv = document.createElement('div')
            itemdiv.id = "item4"
            itemdiv.className = "child"
            const itemP = document.createElement('p')
            itemP.hidden = true
            itemP.innerText = `${lib4.attack_damage}`
            itemP.className = "damage"
            itemdiv.appendChild(itemP)
            const itemimg = document.createElement('img')
            itemimg.setAttribute('src', "./src/images/librarian4.png")
            itemimg.className = "imginside"
            itemdiv.appendChild(itemimg)
            map.appendChild(itemdiv)
            currentDefenders.push(itemdiv)
            $(function () {
                $("div[id='item4']").draggable({
                    containment: "#con",
                    scroll: false
                });
            });
        }
    })
    
}

  //=============================================
  //GamePlay Stuff
  //============================================

//   const usersURL = 'http://localhost:3000/users'
//   const gamesURL = 'http://localhost:3000/games'
  const levelsURL = 'http://localhost:3000/levels'
  const librariesURL = 'http://localhost:3000/libraries'
  const librariansURL = 'http://localhost:3000/defenders'
  
  let thisLevel;
  let thisLibrary;
  let currentHealth;
  let currentMoney;
  let currentMonsters;
  let currentDefenders = [];
  let currentMonstersDiv = []
  let allLibrarians;

  const kids = document.getElementsByClassName("Loud")

  
  function playGame() {
    getAllLibrarians()
      levelFetch()
      alert ("Your library is under attack!")

//       function attackRepeater() {
//         clearInterval(repeat)
//         repeat = setInterval(damage, 1000)
//   }



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
        makeMonsterTabs()
    })  
    .catch((error) => {
        console.error('Error', error)
        alert ("A MONSTER ATE YOUR MONSTERS")
    })   
  }
  
  function setSideNavValues() {
      sideNavLevel.innerText = `Level: ${thisGame.current_level}`
      sideNavLibrary.innerText = `Books: ${currentHealth}    `
      sideNavMoney.innerText = `Money: $${currentMoney}`
    }

    function makeMonsterTabs() {
        let y = 0
        currentMonsters.forEach((monster) => {
            y = y + 50
            const monsterImg = document.createElement('img')
            switch (monster.monster_name) {
                case "Loud":
                    monsterImg.src = './src/images/monster1.gif';
                    monsterImg.id = `${monster.id}`
                    monsterImg.type = "Loud"
                    monsterImg.style=`position:absolute; left: ${1150 + y}; top: 390; width: 100; height: 100;`
                    break;
                case "Monkey":
                    monsterImg.src = './src/images/monster2.gif'  
                    monsterImg.id = `${monster.id}` 
                    monsterImg.type = "Monkey"             
                    monsterImg.style=`position:absolute; left: ${1150 + y}; top: 380; width: 100; height: 100;`
                    break;
                case "Music":
                    monsterImg.src = './src/images/monster3.png'
                    monsterImg.id = `${monster.id}`
                    monsterImg.type = "Music"
                    monsterImg.style=`position:absolute; left: ${1150 + y}; top: 415; width: 30; height: 30;`
                    break;                  
                case "Drink":
                    monsterImg.src = './src/images/monster4.png'  
                    monsterImg.id = `${monster.id}`    
                    monsterImg.type = "Drink"            
                    monsterImg.style=`position:absolute; left: ${1150 + y}; top: 375; width: 100; height: 100;`
                    break;
                }
            monsterImg.className = `${monster.monster_name}`
            const imgDiv = document.createElement('div')
            imgDiv.className = "allMonsters"
            monsterImg.health = monster.health
            imgDiv.appendChild(monsterImg)

            map.appendChild(imgDiv)
            currentMonstersDiv.push(monsterImg)
        })
        moveMonsters()
    }

    var count, repeat, i

    function moveMonsters() {
        debugger;
        clearInterval(repeat)
        repeat = setInterval(changeY, 20)
  }

    function changeY() {
        let x
        i = 0
        while (i < currentMonstersDiv.length) {
            let xPos = currentMonstersDiv[i].style.left.replace('px','')
            x = parseInt(xPos, 10)
            let yPos = currentMonstersDiv[i].style.top.replace('px','')
            y = parseInt(yPos, 10)
            if (!!currentMonstersDiv[i].type) {
                currentMonstersDiv[i].className = currentMonstersDiv[i].type
            }
            
            switch (currentMonstersDiv[i].className) {
                case "Loud":
                    x -= 1
                    break;
                case "Monkey":
                    x -=2
                    break;
                case "Music":
                    x -= 3
                    y -= Math.floor(Math.random() * 5) - 2
                    if (y > 800) {
                        y = 800
                    }

                    if (y < 100) {
                        y = 100
                    }
                    break;
                case "Drink":
                    x -= 2
                    break;
            }

            currentMonstersDiv[i].style.left = `${x}px`
            currentMonstersDiv[i].style.top = `${y}px`
            damage()
            i++
        }
            
        if (x < 300) {
            clearInterval(repeat)
            monstersAttack()
        }

    } 

    function monstersAttack() {
        clearInterval(repeat)
        repeat = setInterval(dealDamage, 10)
    }

    function dealDamage() {
        i = 0
        while (i < currentMonstersDiv.length && currentHealth >= 0) {
            // debugger;
            // let monId = currentMonstersDiv[i].id
            let mon = currentMonsters.find(monster => monster.id == currentMonstersDiv[i].id)
            currentHealth -= mon.attack_damage
            // debugger;
            sideNavLibrary.innerText = `Books: ${currentHealth}    `
            i++
        }

        if (currentHealth <= 0) {
            debugger;
            currentMonsters = []
            currentMonstersDiv = []
        const oldMonsters = document.getElementsByClassName("allMonsters")
        i = 0
        while (i < oldMonsters.length) {
            oldMonsters[i].remove()
        i++    
        }
        
            debugger;
            // oldMonsters.parentNode.removeChild(oldMonsters)
            
            console.log("hi")
            sideNavLibrary.innerText = `Books: 0 `
            clearInterval(repeat)
            alert ("The Library is out of books!  Illiteracy has befallen the populace!")
            alert("You lose!")
            //fetch to update game file in ruby
            userGone()
            // nextLevel()
        }
    }
    function damage() {
       currentDefenders.forEach(function(defender){
           currentMonstersDiv.forEach(function(monster){
               if((Math.abs(defender.offsetLeft - monster.offsetLeft) < 300) && (Math.abs(defender.offsetTop - monster.offsetTop) < 300)) {
                //    console.log(`${monster.className}`)
                let defenderDamage = defender.getElementsByClassName("damage")[0].textContent
                monster.health -= defenderDamage
                // console.log(`Defender Left ${defender.offsetLeft}`)
            // console.log(`Monster Left ${monster.offsetLeft}`)
            // console.log(`Defender Top ${defender.offsetTop}`)
            // console.log(`Monster Top ${monster.offsetTop}`)
                // console.log("hit!")
                
                // monster.type = `${monster.className}`
                monster.className = `${monster.className} damagedMonster`
                setTimeout(function(){
                    monster.className = monster.type
                }, 500)
               }
               if(monster.health < 1){
                    let deadMonster = currentMonstersDiv.find(function(divItem){
                        return divItem.id === monster.id
                    })
                    let deadMonsterIndex = currentMonstersDiv.indexOf(deadMonster)
                    currentMonstersDiv = currentMonstersDiv.filter ((item) => {
                        return currentMonstersDiv.indexOf(item) !== deadMonsterIndex
                    })
                    monster.parentElement.removeChild(monster)
                    currentMonsters.pop()
                    if (currentMonsters.length === 0) {
                        alert ("Congratulations!")
                        nextLevel()
                    }
               }
           })
       }) 
    }
    

    function nextLevel() {
        // oldMonsters.hidden = true
        // oldMonsters.parentNode.removeChild(oldMonsters)
        updateGameAndLibrary()               
    }


    function updateGameAndLibrary() {
        fetch(`${gamesURL}/${thisGame.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                thisGame,
                currentMoney
            })
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            thisGame = data
            makeNewLevel(thisGame)
        })
        .catch((error) => {
            console.error('Error:', error)
            alert ("SAVE DIDN'T SAVE!")
        })

        fetch(`${librariesURL}/${thisLibrary.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                thisLibrary,
                currentHealth
            })
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            thisLibrary = data
        })
        .catch((error) => {
            console.error('Error:', error)
            alert ("LIBRARY DIDN'T SAVE!")
        })
    }

    function makeNewLevel() {
        fetch(levelsURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                thisGame,
                thisLevel
            })
        })
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            thisLevel = data
            currentMonsters = data.monsters.splice(0, data.monsters.length/2)
            sideNavLevel.innerText = `Level: ${data.level_number}`
            // currentDefenders[0].hidden = true
            makeMonsterTabs()
        })
        .catch((error) => {
            console.error('Error:', error)
            alert ("IMAGINARY LEVEL")
        }) 
    }
