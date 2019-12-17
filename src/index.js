document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageId = 4170 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likes = document.getElementById("likes");
  
  const getImgContent = () => {
    const name = document.getElementById("name");
    const image = document.getElementById("image");
    fetch(imageURL)
    .then(res => res.json())
    // .then(json => console.log(json))
    .then(json => {
      image.src = json.url,
      name.textContent = json.name,
      likes.textContent = json.like_count
    })
  }

  const likePlusOne = () => {
    let likeNum = parseInt(likes.textContent);
    likeNum += 1;
    likes.innerText = likeNum
  }
  
  const increaseLikes = () => {
    const likeBtn = document.getElementById("like_button");
    likeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      likePlusOne();
      fetch(likeURL, {
        method: "POST",
        body: JSON.stringify({
          image_id: imageId
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => res.json())
      // .then(json => console.log(json));
      .then(json => console.log(json.image_id));
    })
  }
  // GAVE UP on like
  const postComment = () => {
    const commentForm = document.getElementById("comment_form");
    const commentInput = document.getElementById("comment_input").value;
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(commentsURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_id: imageId,
          content: commentInput
        })
      })
      .then(res => res.json())
      .then(json => console.log(json));
    })
  }


  getImgContent()
  increaseLikes()
  postComment()
})