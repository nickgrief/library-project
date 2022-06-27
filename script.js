class Library {
  static books = [];

  static newBtn;
  static holder;

  static init() {
    this.newBtn = document.querySelector(".new-book-btn");
    this.newBtn.addEventListener("click", this.addBook);
    this.holder = document.querySelector(".holder");
    this.books.push(new Book("Mamu", "Dick Dickenson", 453));
    this.display();
  }

  static addBook = () => {
    const title = prompt("Book's title:");
    const author = prompt("Book's author:");
    const pages = prompt("Number of pages:");

    this.books.push(new Book(title, author, pages));

    this.display();
  }
  static display() {
    while (this.holder.hasChildNodes()) {
      this.holder.removeChild(this.holder.lastChild);
    }

    for (const book of this.books) {
      let bookCard = document
        .createElement("div");
      bookCard.classList
        .toggle("book");
      bookCard.dataset.index = this.books.indexOf(book);
      for (const property in book) {
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
          case "read":
            text = "Read: ";
            break;
          default:
            text = "Poop";
            break;
        }
        element.textContent = text + book[property];
        bookCard.appendChild(element);
      }
      let readBtn = document.createElement("button");
      readBtn.classList.toggle("read-book-btn");
      readBtn.textContent = "read/unread";
      readBtn.addEventListener("click", () => {
        this.books[readBtn.parentElement.dataset.index].read =
          !this.books[readBtn.parentElement.dataset.index].read;
        this.display();
      });
      bookCard.appendChild(readBtn);
      let removeBtn = document.createElement("button");
      removeBtn.classList.toggle("remove-book-btn");
      removeBtn.textContent = "REMOVE BOOK";
      removeBtn.addEventListener("click", () => {
        this.books.splice(removeBtn.parentElement.dataset.index, 1);
        this.display();
      });
      bookCard.appendChild(removeBtn);
      this.holder.appendChild(bookCard);
    }
  }
}

class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
  }
}

Library.init();
