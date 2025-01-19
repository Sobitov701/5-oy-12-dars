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
      bookItem.classList.add("book-item");
      bookItem.dataset.id = data.id;
      bookItem.innerHTML = `
        <h2>${data.title}</h2> (${data.year}) ${data.author}
        <button data-id="${data.id}" class="edit">Tahrirlash</button>
        <button data-id="${data.id}" class="deletebtn">O'chirish</button>`;
      booksContainer.appendChild(bookItem);
    })
    .catch((error) => {
      alert(error.message);
    });
});

function showBooks(books) {
  booksContainer.innerHTML = "";
  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.dataset.id = book.id;
    bookItem.innerHTML = `
      <h2>${book.title}</h2> (${book.year}) ${book.author}
      <button data-id="${book.id}" class="edit">Tahrirlash</button>
      <button data-id="${book.id}" class="deletebtn">O'chirish</button>`;
    booksContainer.appendChild(bookItem);
  });
}

let deleteButtons = document.querySelectorAll(".deletebtn");
deleteButtons.length > 0 &&
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", function () {
      let confirmDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
      let elementId = this.getAttribute("data-id");
      if (confirmDelete && elementId) {
        fetch("https://trello.vimlc.uz/books/${elementId}", {
          method: "DELETE",
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then((data) => {
            console.log(data);
            this.parentNode.remove();
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    });
  });
