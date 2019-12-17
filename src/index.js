let imageId = 4171;
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;
const picCard = document.getElementById("image");
const picName = document.getElementById("name");
const picLikes = document.getElementById("likes");
const picComments = document.getElementById("comments");
const deleteButton = document.createElement("button");

document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  fetchImages();
});

async function fetchImages() {
  const response = await fetch(imageURL);
  const apiData = await response.json();
  console.log(apiData);
  picCard.src = apiData.url;
  picName.textContent = apiData.name;
  picLikes.textContent = apiData.like_count;
  apiData.comments.map(comment => {
    renderComment(comment);
  });
  likeListener(image);
}

function renderComment(comment) {
  picComments.innerHTML += "<li>" + comment.content + "</li>";
  deleteButton.textContent = "Delete Comment";
  picComments.appendChild(deleteButton);
}

function likeListener(image) {
  const imageContentDiv = document.getElementById("image_content");
  imageContentDiv.addEventListener("click", e => {
    if (e.target.id === "like_button") {
      const imageLikes = document.getElementById("likes");
      let like = event.target.previousElementSibling.innerText.split(": ");
      likeCount = parseInt(like[1]);
      imageLikes.innerHTML = likeCount + 1;
      fetch(likeURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image_id: imageId
        })
      });
    } else if (e.target.textContent === "Delete Comment") {
      const commentContent = e.target.previousElementSibling;
      const commentButton = e.target;
      commentContent.remove();
      commentButton.remove();

      console.log(e.target.previousElementSibling);

      fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }
  });
}
