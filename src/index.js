
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 4162
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`



  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  

  fetchImage()
  function fetchImage(){
    fetch(imageURL)
    .then(response => response.json())
    .then(json => renderImageData(json))
  }

  let likeButton = document.getElementById("like_button")
  likeButton.addEventListener("click", event => addLikes(event))
  let commentForm = document.getElementById("comment_form")
  commentForm.addEventListener("submit", event => addNewComment(event))
  
})

function renderImageData(json){
  
  let img = document.getElementById("image")
  img.src = json.url;
  let title = document.getElementById("name")
  title.innerText = json.name
  let likes = document.getElementById("likes")
  likes.innerText = json.like_count
  
  json.comments.forEach(comment => addComments(comment))
}


function addComments(comment){
  let comments = document.getElementById("comments")
  let button = document.createElement("button")
  button.innerText = "DELETE"
  let li = document.createElement("li")
  li.setAttribute("id", `${comment.id}`)
  button.setAttribute("id", `${comment.id}`)
  li.innerText = comment.content
  li.appendChild(button)
  button.addEventListener("click", event => deleteComment(event))
  comments.append(li)
}

function addLikes(event){
  event.preventDefault()
  const likeURL = `https://randopic.herokuapp.com/likes/`
  let imageId = 4162
  let button = event.target
  let likes = document.getElementById("likes")
  let amountOfLikes = parseInt(likes.innerText)
  let newLikes = amountOfLikes + 1
  likes.innerText = `${newLikes}`
  
  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
     },
     body: JSON.stringify({image_id: imageId,  })
  })
}

function addNewComment(event){
  event.preventDefault()
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageId = 4162
  let newCommentText = document.getElementById("comment_input").value
  let comment = {
    content: newCommentText,
    image_id: imageId
  }
  addComments(comment)
  document.getElementById("comment_input").value = null
  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })

}

function deleteComment(event){
  event.preventDefault()
 
  let button = event.target
  let commentToRemove = button.parentElement
  
  const commentsURLId = `https://randopic.herokuapp.com/comments/${commentToRemove.id}`
  let comments = document.getElementById("comments")
  comments.removeChild(commentToRemove)
  fetch(commentsURLId, {
    method: "DELETE",
    message: 'Comment Successfully Destroyed'

  })
  
 
  deleteAlert()
}

function deleteAlert(){
  alert('Comment Successfully Destroyed')
}


