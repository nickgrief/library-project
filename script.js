const library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

library.push(new Book("Poop", "Me", "999", "yes"));
library.push(new Book("Dead Again", "Johnny Dead", "666", "nopes"));

function addBookToLibrary() {
  let title = prompt("Book's title:");
  let author = prompt("Book's author:");
  let pages = prompt("Nubmer of pages:");
  let isRead = prompt("Have you read it?");

  library.push(new Book(title, author, pages, isRead));
}

const holder = document.querySelector(".holder");

function displayLibrary() {
  for (const book of library) {
    let bookCard = document
      .createElement("div");
    bookCard.classList
      .toggle("book");
    for (property in book) {
      let element = document.createElement("p");
      element.classList.toggle(property);
      element.textContent = book[property];
      bookCard.appendChild(element);
    }
    holder.appendChild(bookCard);
  }
}

displayLibrary();
