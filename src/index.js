document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 4161; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;
  
  const likeBtn = document.querySelector("#like_button");
  const imgLikesId = document.querySelector("#likes");

  const commentForm = document.querySelector("#comment_form")
  const commentInput = document.querySelector("#comment_input")

  
  function getImg() {
    const imgTag = document.querySelector("#image");
    const imgNameId = document.querySelector("#name");

    fetch(imageURL)
      .then(res => res.json())
      .then(json => {
        // console.log(json.url);
        imgTag.src = json.url;
        imgNameId.textContent = json.name;
        imgLikesId.textContent = json.like_count;
      });
    }
    
    function incrementLike(event) {
      event.preventDefault()
      
      const numLikes = parseInt(imgLikesId.textContent) + 1

      imgLikesId.textContent = numLikes
      
      const data = {
        like_count: imgLikesId.textContent
      }
      
      const formHeaders = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }}

      fetch(likeURL, formHeaders)
      // .then(res => res.json())
      // .then(json => console.log(json.like_count))
      
    }
    
    
    function addNewComment(event) {
      event.preventDefault()
      let createNewComment = document.createElement("li")
      


    }




    getImg();
    
    likeBtn.addEventListener("click", event => incrementLike(event));

    commentForm.addEventListener("submit", (event) => addComment(event))

});
