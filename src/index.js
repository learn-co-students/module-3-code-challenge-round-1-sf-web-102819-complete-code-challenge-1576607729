let imageId = 1 //Enter the id from the fetched image here
const imageCard = document.querySelector("#image_card")
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const url = "https://randopic.herokuapp.com/images/4159"
const likeButtonElement = document.getElementById("like_button")

document.addEventListener('DOMContentLoaded', (e) => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  e.preventDefault();
  getData();
  likeButton();
  useLikeButton();
})


function getData() {
  fetch(url)
  .then((resp) => resp.json())
  .then(json =>  {
    imageCard.innerHTML += (`<img src=${json.url}></img`)
    const imageName = document.querySelector("#name")
    imageName.textContent = (`${json.name}`)
    myLikes = document.querySelector("#likes")
    myLikes.textContent = (`${json.like_count}`)
  })
}


function likeButton() {
  const likeButtonElement = document.getElementById("like_button")
  // console.log(likeButtonElement)
  likeButtonElement.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("hey") // spent entire time trying to get button event listener to work.
  }  )
}
   

function useLikeButton() { // incomplete function
  fetch(url), {
  method: "post",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // 
  })
 }
}