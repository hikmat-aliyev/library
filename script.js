const form = document.querySelector(".form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const modalContainer = document.getElementById("modal-container");
const checkbox = document.getElementById("cb");

let myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readButton = document.createElement("button");
    this.removeButton = document.createElement("button");
    this.read = false;
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
}


function showForm() {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.style.display = "block";
}

const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", (event) => {
    event.preventDefault;
    addBookToLibrary();
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

const bookShelf = document.createElement("div");
    bookShelf.classList.add("book-shelf");
    document.body.appendChild(bookShelf);

function displayBooks() {
    while (bookShelf.firstChild) {
      bookShelf.removeChild(bookShelf.firstChild);
    }
  
    for(let i = 0; i < myLibrary.length; i++){
      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");
      bookShelf.appendChild(bookDiv);
  
      const bookTitle = document.createElement("p");
      bookTitle.innerText = myLibrary[i].title;
      bookDiv.appendChild(bookTitle);
  
      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = myLibrary[i].author;
      bookDiv.appendChild(bookAuthor);
  
      const bookPages = document.createElement("p");
      bookPages.textContent = myLibrary[i].pages;
      bookDiv.appendChild(bookPages);
      
      if(checkbox.checked) {
        myLibrary[myLibrary.length - 1].read = true;
        myLibrary[myLibrary.length - 1].readButton.textContent = "READ";
        myLibrary[myLibrary.length - 1].readButton.style.background = "green";
        bookDiv.appendChild(myLibrary[i].readButton);
      } else {
        myLibrary[myLibrary.length - 1].read = false;
        myLibrary[myLibrary.length - 1].readButton.textContent = "NOT READ";
        myLibrary[myLibrary.length - 1].readButton.style.background = "red";
        bookDiv.appendChild(myLibrary[i].readButton);
      }

      bookDiv.appendChild(myLibrary[i].removeButton);   
      myLibrary[i].removeButton.textContent = "REMOVE";
      myLibrary[i].removeButton.style.display = "block";
      
      myLibrary[i].removeButton.addEventListener("click", () => {
        bookShelf.removeChild(bookShelf.children[i]);
        console.log(i);
        myLibrary.splice(i, 1);
        console.log(myLibrary);
      })

    }
    
  }

  const closeButton = document.getElementById("modal-close");
  
  closeButton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  var sayHello = function (name) {
    var text = 'Hello, ' + name;
    return function () {
      console.log(text);
    };
  };

