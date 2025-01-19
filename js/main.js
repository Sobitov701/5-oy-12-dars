const bookForm = document.getElementById("book-form");
const booksContainer = document.getElementById("books-container");
const booktitle = document.getElementById("book-title");
const bookauthor = document.getElementById("book-author");
const bookdescription = document.getElementById("book-description");

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newBook = {
    title: booktitle.value,
    author: bookauthor.value,
    year: bookdescription.value,
  };

  fetch("https://trello.vimlc.uz/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  })
    .then((response) => response.json())
    .then((data) => {
      const bookItem = document.createElement("div");
      bookItem.innerHTML = `<h2>${data.title}</h2> (${data.year})  ${data.author} <button class="edit">Tahrirlash</button> <button class="delete">O'chirish</button>`;
      booksContainer.appendChild(bookItem);
    })
    .catch((error) => {
      alert(error.message);
    });
});

fetch("https://trello.vimlc.uz/books")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.innerHTML = `<h2>${book.title}</h2> (${book.year})  ${book.author} <button class="edit">Tahrirlash</button> <button class="delete">O'chirish</button>`;
      booksContainer.appendChild(bookItem);
    });
  })
  .catch((error) => console.error("Xatolik:", error));
