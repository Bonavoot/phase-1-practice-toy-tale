// Selectors
const toyCollection = document.getElementById("toy-collection");

fetch("http://localhost:3000/toys")
  .then((response) => {
    return response.json();
  })
  .then((toys) => {
    return toys.forEach((toy) => {
      const toyCard = document.createElement("div");
      toyCard.className = "card";

      const name = document.createElement("h2");
      name.innerText = toy.name;

      const img = document.createElement("img");
      img.className = "toy-avatar";
      img.src = toy.image;

      const likes = document.createElement("p");
      likes.innerText = toy.likes;

      const button = document.createElement("button");
      button.className = "like-btn";
      button.id = toy.id;
      button.innerText = "Like ❤️";

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

fetch("http://localhost:3000/toys", {
  method: "POST", // *GET, POST, PUT, DELETE, etc.

  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify(), // body data type must match "Content-Type" header
});
