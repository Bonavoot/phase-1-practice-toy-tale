// Selectors
const toyCollection = document.getElementById("toy-collection");
const submitNewToyBtn = document.getElementById("add-toy-form");

fetch("http://localhost:3000/toys")
  .then((response) => {
    return response.json();
  })
  .then((toys) => {
    return toys.forEach((toy) => {
      const toyCard = document.createElement("div");
      toyCard.className = "card";

      // name
      const name = document.createElement("h2");
      name.textContent = toy.name;

      // image
      const img = document.createElement("img");
      img.className = "toy-avatar";
      img.src = toy.image;

      const likes = document.createElement("p");
      likes.textContent = toy.likes;

      const button = document.createElement("button");
      button.className = "like-btn";
      button.id = toy.id;
      button.innerText = "Like ❤️";
      button.addEventListener("click", (e) => {
        let addLike = parseInt(likes.textContent) + 1;
        likes.textContent = addLike;

        fetch(`http://localhost:3000/toys/${button.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            likes: addLike,
          }),
        });
      });

      toyCard.append(name, img, likes, button);
      toyCollection.append(toyCard);
    });
  });

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

async function postNewToy() {
  const userToyName = document.getElementById("toy-name");
  const userToyImageUrl = document.getElementById("toy-image");

  await fetch("http://localhost:3000/toys", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify({
      name: userToyName.value,
      image: userToyImageUrl.value,
      likes: 0,
    }), // body data type must match "Content-Type" header
  });
}

// Add new toy function invoked
submitNewToyBtn.addEventListener("submit", postNewToy);
