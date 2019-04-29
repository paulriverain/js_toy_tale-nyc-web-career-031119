const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const BASE_URL = "http://localhost:3000"
const TOY_URL = `${BASE_URL}/toys`
// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function() {

const form = document.querySelector(".add-toy-form")

const toyLike = document.querySelector(".card")

const toyName = document.querySelector("#toyName")
const toyPic = document.querySelector("#toyPic")

const toySpot = document.getElementById('toy-collection')
toySpot.innerHTML = ''

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })

  // OR HERE!
  fetch(TOY_URL)
  .then(function(response){ // promis that returns a response object
    return response.json()
  })
  .then(function(toys){
    return getToys(toys)
  })

  function getToys(toys) {
    toys.forEach(function(toy){
      toySpot.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        Likes: <p>${toy.likes}</p>
        <button  id=${toy.id} class="like-btn">Like <3</button>
      </div>
      `
    })
  }

  // const renderToy = document.createElement('div')

  // renderToy.innerHTML =
  const createNewToy = (toy) =>{
    const newToy = document.createElement('div')
    newToy.innerHTML = `
    <div class="card" >
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    Likes: <p>${toy.likes}</p>
    <button id=${toy.id} class="like-btn">Like <3</button>
    </div>
    `
    return newToy
  }

// const inputs = {`
//   name: ${toyName}.value,
//   image: ${toyPic}.value,
//   likes: 0 ${toyLike}.value
// `}

  form.addEventListener('submit', function(e){
    e.preventDefault()
    fetch(TOY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName.value,
        image: toyPic.value,
        likes: 0
      })
    })
    .then(function(response){
      return response.json()
    })
    .then(function(toy){
      console.log(toy)
        toySpot.appendChild(createNewToy(toy))
    })

    form.reset()
  })


  toySpot.addEventListener('click', function(e){
    if (e.target.className === "like-btn"){
      let toyId = e.target.id
      // debugger
      let likeCount = parseInt(e.target.previousElementSibling.innerText)
      let likes = `${++likeCount}`

      e.target.previousElementSibling.innerText = likes
      // debugger
      fetch(TOY_URL+`/${toyId}`,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likes
        })
      })
    }

  })


})
