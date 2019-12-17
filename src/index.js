document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4165 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const titleElement = document.querySelector("#name")
  const likesElement = document.querySelector("#likes")
  const imageElement = document.querySelector("#image")
  const commentsContainer = document.querySelector("#comments")
  const likeButton = document.querySelector("#like_button")
  const commentForm = document.querySelector("#comment_form")
  const commentInput = document.querySelector("#comment_input")

  getImage()

  likeButton.addEventListener("click", () => addLikes())
  commentForm.addEventListener("submit", (event) => addComment(event))

  

  function getImage() {
    fetch(imageURL)
    .then(res => res.json())
    .then(res => renderImage(res))
  }

  function renderImage(json) {
    titleElement.innerText = json.name
    likesElement.innerText = json.like_count
    imageElement.setAttribute("src", json.url)
    json.comments.forEach(ele => {
      let newComment = document.createElement("li")
      newComment.innerHTML = `
      ${ele.content}
      <button type="button" id="newDelete"> Delete </button>
            `
      commentsContainer.appendChild(newComment)
      let deleteChange = document.querySelector("#newDelete")
        deleteChange.setAttribute("id", `delete-${ele.id}`) 
        deleteChange.addEventListener("click", () => addDelete(ele.id))
  })}


  function addLikes() {
    let currentLikes = likesElement.innerText
    currentLikes++
    likesElement.innerText = currentLikes
    likeObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accpet':'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    }
    fetch(likeURL, likeObj)
  }

  function addComment(event) {
    event.preventDefault()
    let newComment = document.createElement("li")
    newComment.innerHTML = `
        ${commentInput.value}`
    let newDeleteButton = document.createElement("button")
    newDeleteButton.setAttribute("type", "button")
    newDeleteButton.setAttribute("id", "newDelete") 
    newDeleteButton.innerText = "Delete"
    
    commentsContainer.appendChild(newComment)
    newComment.appendChild(newDeleteButton) 
    commentObj = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accpet':'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentInput.value})
    }
    fetch(commentsURL, commentObj)
      .then( res => res.json())
      .then(json => {
        let deleteChange = document.querySelector("#newDelete")
        deleteChange.setAttribute("id", `delete-${json.id}`) 
        deleteChange.addEventListener("click", () => addDelete(json.id))
      })

    commentInput.value = ''
  }

  function addDelete(deleteButtonId) {
    let deleteURL = `https://randopic.herokuapp.com/comments/${deleteButtonId}`
    let deleteCommentObj = {
      method: "Delete",
      headers: {
        'Content-Type': 'application/json',
        'Accpet':'application/json'
    }
  }
    // fetch(deleteURL, deleteCommentObj) couldn't git the comment to delete in time
    // .then(res => res.json())
    // .then(json => {
    //   )

    // })
}
})
