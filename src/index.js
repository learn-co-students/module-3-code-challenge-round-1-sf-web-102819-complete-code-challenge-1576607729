let container = document.getElements
let url = 'https://randopic.herokuapp.com/images'
document.addEventListener('DOMContentLoaded', () => {
  addLikeListener();
  addCommentButtonListener();
  
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4169 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  console.log(imageURL)
  fetch(imageURL)
  .then(response => response.json())
  .then(json => {
    // let imageContent = document.getElementById('image_content')
    let image = document.getElementById('image')
    let nameContent = document.getElementById('name')
    let likeContent = document.getElementById('likes')
    let commentContent = document.getElementById('comments')
    let comments = json.comments

    image.src = `${json.url}`
    image.id = `${json.id}`
    nameContent.innerText = `${json.name}`
    likeContent.innerText = `${json.like_count}`
    console.log(comments[0].content)
    commentContent.innerHTML = comments.map(comment => renderComment(comment)).join("") 

    function renderComment(comment){
      return `
      <li>${comment.content}</li>
      <span><button class='deleteButton' id=${comment.id}> Delete Comment </button></span>
      `
    }

    let deleteButtons = document.getElementsByClassName('deleteButton')
    for (i = 0; i < deleteButtons.length; i++){
      deleteButtons[i].addEventListener('click', function(e){
        deleteComment(e)
      })
    }
    console.log(json)
  })

  function addLikeListener(){
    let likeButton = document.getElementById('like_button')
    likeButton.addEventListener('click', function(e){
      updateLikes(e)
    })
  }

  function updateLikes(event){

    let LikesBox = document.getElementById('likes')
    let numberOfLikes = parseInt(LikesBox.innerText)
    LikesBox.innerText = `${numberOfLikes +=1}`


    const data = {
      image_id: imageId
    }

    fetch(likeURL,{
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(json => console.log(json))
  }

  function addCommentButtonListener(){
    let commentForm = document.getElementById('comment_form')
    commentForm.addEventListener('submit', function(e){
      addComment()
    })

  }

  function addComment(){
    event.preventDefault()
    let commentBox = document.getElementById('comments')
    let commentValue = document.getElementById('comment_input').value
    let newComment = document.createElement('li')
    newComment.innerText = commentValue
    commentBox.append(newComment)
    
    
    const data = {
      image_id: imageId,
      content: commentValue
    }

    fetch(commentsURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(json => console.log(json))
  }

  
  function deleteComment(event){
    let commentId = event.target.id
    
    const data = {
      image_id: commentId
    }
    fetch(commentsURL+"/"+commentId, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(json => console.log(json))
  }


})


