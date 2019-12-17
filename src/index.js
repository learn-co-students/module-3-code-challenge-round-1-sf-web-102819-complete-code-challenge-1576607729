document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4166 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  displayInfo();
  listenForLike();
  listenForComments();

  function displayInfo() {
    fetch(imageURL)
    .then((response) => response.json())
    .then(function(data) {
        updateInfo(data);

    })
  }

  function updateInfo(data) {
    let imageInfo = document.querySelector('#image');
      imageInfo.src = data.url;
    let imageName = document.querySelector('#name');
      imageName.innerText = data.name;
    let imageLikes = document.querySelector('#likes');
      imageLikes.innerText = data.like_count;
      let newComment = commentInfo(data);
  }

  function commentInfo(data) {
    let imageComments = document.querySelector('#comments');
    for(let i=0; i < data.comments.length; i++){
    let newComment = document.createElement('li');
    newComment.innerHTML = `<h4>${data.comments[i].content}</h4>`
    //attempt at delete button
    // let deleteButton = document.createElement('button');
    //     deleteButton.setAttribute("id", "delete");
    //     deleteButton.value = "Delete";
    //   newComment.append(deleteButton);
    imageComments.append(newComment);
    }
  }

  function listenForComments() {
  let commentForm = document.querySelector('#comment_form')
    commentForm.addEventListener('submit', addAComment);
  }

  function addAComment(event) {
      event.preventDefault();
      let imageComments = document.querySelector('#comments');
      let commentInput = [event.target][0][0].value;
      let newComment = document.createElement('li');
      let newCommentStyling = document.createElement('h4');
        newCommentStyling.innerText = commentInput;
      newComment.append(newCommentStyling);
      imageComments.append(newComment);
      let commentField = document.querySelector('#comment_input')
      commentField.value = "";

      commentBody = {
        image_id: imageId,
        content: commentInput
      }

      commentObj = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentBody)
      }

      fetch('https://randopic.herokuapp.com/comments', commentObj)
  }

  function listenForLike (){
    let likeButton = document.querySelector('#like_button');
    likeButton.addEventListener('click', addALike);
  }

  function addALike() {
    let likeCount = parseInt(event.target.previousElementSibling.children[0].innerText);
    likeCount++;
    event.target.previousElementSibling.children[0].innerText = likeCount;

    likeInfo = {
      image_id: imageId,
      like_count: likeCount
    }

    likeObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(likeInfo)
    }

    fetch('https://randopic.herokuapp.com/likes', likeObj)
  }

})
