const library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Starting books for testing
library.push(new Book("Example Book", "Delete It", "0", true));

function submitBook() {
  const titleForm = document.getElementById("title");
  const isTitleValid = titleForm.reportValidity();

  const authorForm = document.getElementById("author");
  const isAuthorValid = authorForm.reportValidity();

  const pagesForm = document.getElementById("pages");
  const isPagesValid = pagesForm.reportValidity();

  const isReadForm = document.querySelector('input[name="is-read"]:checked');

  if (!isTitleValid || !isAuthorValid || !isPagesValid) {
    return;
  }

  addBookToLibrary();

  clearForm();

  function addBookToLibrary() {
    let title = titleForm.value;
    let author = authorForm.value;
    let pages = pagesForm.value;
    let isReadString = isReadForm.value;
    let isRead;
    if (isReadString == "yes" || isReadString == "y") {
      isRead = true;
    } else {
      isRead = false;
    }

    library.push(new Book(title, author, pages, isRead));
    displayLibrary();
  }

  function clearForm() {
    titleForm.value = "";
    authorForm.value = "";
    pagesForm.value = undefined;
    document.getElementById("yes").checked = true;
  }
}

const newBtn = document.querySelector(".new-book-btn");
newBtn.addEventListener("click", submitBook);

const holder = document.querySelector(".holder");

function displayLibrary() {
  // Clear display before repopulating
  while (holder.hasChildNodes()) {
    holder.removeChild(holder.lastChild);
  }

  for (const book of library) {
    let bookCard = document.createElement("div");
    bookCard.classList.toggle("book");
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
    let readBtn = document.createElement("button");
    readBtn.classList.toggle("read-book-btn");
    readBtn.textContent = "!read";
    readBtn.addEventListener("click", () => {
      library[readBtn.parentElement.dataset.index].isRead =
        !library[readBtn.parentElement.dataset.index].isRead;
      displayLibrary();
    });
    bookCard.appendChild(readBtn);
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
