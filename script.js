const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const modalContainer = document.getElementById("modal-container");
const checkbox = document.getElementById("checkbox");
const form = document.getElementById("form");
const bookShelf = document.createElement("div");
bookShelf.classList.add("book-shelf");
document.body.appendChild(bookShelf);

let myLibrary = [];
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.bookDiv = document.createElement("div");
    this.bookDiv.classList.add("book");

    this.titleElement = document.createElement("p");
    this.titleElement.textContent = `Title: ${this.title}`;
    this.bookDiv.appendChild(this.titleElement);

    this.authorElement = document.createElement("p");
    this.authorElement.textContent = `Author: ${this.author}`;
    this.bookDiv.appendChild(this.authorElement);

    this.pagesElement = document.createElement("p");
    this.pagesElement.textContent = `Pages: ${this.pages}`;
    this.bookDiv.appendChild(this.pagesElement);

    this.readButton = document.createElement("button");
    this.readButton.classList.add("read-button")
    this.read = false;
    this.bookDiv.appendChild(this.readButton);
    this.readButton.addEventListener("click", () => {
      this.read = !this.read
      if (this.read === false) {
          this.readButton.style.background = "red";
          this.readButton.textContent = "NOT READ";
      } else {
          this.readButton.style.background = "green";
          this.readButton.textContent = "READ";
      }
    });

    this.removeButton = document.createElement("button");
    this.removeButton.classList.add("remove-button");
    this.removeButton.textContent = "REMOVE";
    this.removeButton.addEventListener("click", () => {
      const index = myLibrary.indexOf(this);
      myLibrary.splice(index, 1);
      this.bookDiv.parentNode.removeChild(this.bookDiv);
      console.log(myLibrary);
      console.log(index);
    })
    this.bookDiv.appendChild(this.removeButton);
    
  }
  addToBookshelf(bookshelf) {
    bookshelf.appendChild(this.bookDiv);
  }
}



function showForm() {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "block";
}

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", (event) => {
    event.preventDefault;
    addBookToLibrary();
    for(let i = 0; i < myLibrary.length; i++){
      
        if(checkbox.checked) {
          myLibrary[myLibrary.length - 1].readButton.textContent = "READ";
          myLibrary[myLibrary.length - 1].readButton.style.background = "green"
          myLibrary[myLibrary.length - 1].read = true;
 
        }else if(!checkbox.checked) {
          myLibrary[myLibrary.length - 1].readButton.textContent = "NOT READ";
          myLibrary[myLibrary.length - 1].readButton.style.background = "red"
          myLibrary[myLibrary.length - 1].read = false;
        }
      }
    
})

function addBookToLibrary() {

    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    bookInfo = new Book(title, author, pages);
    myLibrary.push(bookInfo);   
    displayBooks();
    modalContainer.style.display = "none";
     // reset the form
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

    // show the form again
    form.style.display = "block";
    
}


function displayBooks() {
  while (bookShelf.firstChild) {
    bookShelf.removeChild(bookShelf.firstChild);
  }

  for (let i = 0; i < myLibrary.length; i++) {
    let book = myLibrary[i];

    // check if the book already exists in the bookshelf
    let bookDiv = document.querySelector(`.book[data-index="${i}"]`);
    if (!bookDiv) {
      // create a new bookDiv for the book
      bookDiv = new Book(book.title, book.author, book.pages).bookDiv;
      bookDiv.dataset.index = i;
    } else {
      // update the existing bookDiv
      bookDiv.querySelector(".title").textContent = `Title: ${book.title}`;
      bookDiv.querySelector(".author").textContent = `Author: ${book.author}`;
      bookDiv.querySelector(".pages").textContent = `Pages: ${book.pages}`;
    }

    book.addToBookshelf(bookShelf);
  }
}


const closeButton = document.getElementById("modal-close");
closeButton.addEventListener("click", () => {
  modalContainer.style.display = "none";
});



