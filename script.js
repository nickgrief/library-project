const library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Starting books for testing
library.push(new Book("Poop", "Me", "999", "yes"));
library.push(new Book("Dead Again", "Johnny Dead", "666", "nopes"));

function addBookToLibrary() {
  let title = prompt("Book's title:");
  let author = prompt("Book's author:");
  let pages = prompt("Nubmer of pages:");
  let isRead = prompt("Have you read it?");

  library.push(new Book(title, author, pages, isRead));
  displayLibrary();
}

const newBtn = document.querySelector(".new-book-btn");
newBtn.addEventListener("click", addBookToLibrary);

const holder = document.querySelector(".holder");

function displayLibrary() {
  // Clear display before repopulating
  while (holder.hasChildNodes()) {
    holder.removeChild(holder.lastChild);
  }

  for (const book of library) {
    let bookCard = document
      .createElement("div");
    bookCard.classList
      .toggle("book");
    bookCard.dataset.index = library.indexOf(book);
    for (property in book) {
      let element = document.createElement("p");
      element.classList.toggle(property);
      let text;
      switch (property) {
        case "title":
          text = "Title: ";
          break;
        case "author":
          text = "Author: ";
          break;
        case "pages":
          text = "Pages: ";
          break;
        case "isRead":
          text = "Read: ";
          break;
        default:
          text = "Poop";
          break;
      }
      element.textContent = text + book[property];
      bookCard.appendChild(element);
    }
    let removeBtn = document.createElement("button");
    removeBtn.classList.toggle("remove-book-btn");
    removeBtn.textContent = "REMOVE BOOK";
    removeBtn.addEventListener("click", () => {
      library.splice(removeBtn.parentElement.dataset.index, 1);
      displayLibrary();
    });
    bookCard.appendChild(removeBtn);
    holder.appendChild(bookCard);
  }
}

displayLibrary();
