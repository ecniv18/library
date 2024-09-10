const titleInput = document.querySelector("input[name='title']");
const authorInput = document.querySelector("input[name='author']");
const pagesInput = document.querySelector("input[name='pages']");
const bookShelf = document.querySelector(".book-shelf");

const LIBRARY = [];
const generatedIdList = [];
const IDLENGTH = 10;

// INITIALIZE
createFormElement();

// book.. XD
function Book(title, author, numberOfPages, id) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.id = id;
  this.read = false;
  this.toggleRead = () => {
    this.read = !this.read;
  };
}

// Create the form element instead of hand-writing at the html file, to be able to keep the form in the same container as the books, and not be overwritten/removed when we clear the bookShelf element by adding a new book.
function createFormElement() {
  const li = document.createElement("li");
  li.classList = "form-wrapper";
  const form = document.createElement("form");
  form.method = "none";
  const titleInput = document.createElement("input");
  const authorInput = document.createElement("input");
  const pagesInput = document.createElement("input");
  titleInput.type = "text";
  authorInput.type = "text";
  pagesInput.type = "number";
  titleInput.name = "title";
  authorInput.name = "author";
  pagesInput.name = "pages";
  titleInput.id = "title";
  authorInput.id = "author";
  pagesInput.id = "pages";

  titleInput.placeholder = "ex: The Hobbit";
  authorInput.placeholder = "ex: J.R.R Tolkien";
  pagesInput.placeholder = "ex: (# of pages): 300";

  const button = document.createElement("button");
  button.classList = "add-button";
  button.innerText = "Add";

  li.appendChild(form);
  form.appendChild(titleInput);
  form.appendChild(authorInput);
  form.appendChild(pagesInput);
  form.appendChild(button);

  // Add button Eventlistener | I put this inside here because if I put these outside by query selecting the button it gives an error because the button doesn't exist yet.
  // and since we're constantly clearing the bookShelf element after every new Book, we need to recreate the whole Form element thus re-initiating this event listener
  button.addEventListener("click", (e) => {
    e.preventDefault();
    // creates a book and adds it to the LIBRARY array
    createBook(titleInput.value, authorInput.value, pagesInput.value);

    displayLibrary();
  });

  bookShelf.appendChild(li);
}

// Creates the book element to be shown on the screen
function createBookElement(book) {
  const li = document.createElement("li");
  li.classList = "book-wrapper";
  li.id = book.id;
  const article = document.createElement("article");
  article.classList = "book";
  const header = document.createElement("header");
  const h2 = document.createElement("h2");
  h2.classList = "book-title";
  const section = document.createElement("section");
  section.classList = "book-info-section";
  const p = document.createElement("p");
  p.classList = "author";
  const span = document.createElement("p");
  span.classList = "number-of-pages";
  const deleteButton = document.createElement("button");
  deleteButton.classList = "delete-book";
  const readButton = document.createElement("button");
  readButton.classList = "read-button";

  h2.innerText = book.title;
  p.innerText = book.author;
  span.innerText = book.numberOfPages;
  deleteButton.innerText = "Delete";
  readButton.innerText = book.read ? "unread" : "read";

  li.appendChild(article);
  article.appendChild(header);
  header.appendChild(h2);
  article.appendChild(section);
  section.appendChild(p);
  section.appendChild(span);
  section.appendChild(deleteButton);
  section.appendChild(readButton);

  // EVENT LISTENERS
  deleteButton.addEventListener("click", () => {
    deleteBook(book.id, prompt("are you sure you want to delete ( y/n )"));
  });

  readButton.addEventListener("click", () => {
    book.toggleRead();
    displayLibrary();
  });

  return li;
}

// displays the books on the library to the bookShelf element
function displayLibrary() {
  clearBookShelfElement();
  LIBRARY.forEach((book) => {
    const bookElement = createBookElement(book);

    bookShelf.appendChild(bookElement);
  });

  console.log(LIBRARY);
}

function clearBookShelfElement() {
  bookShelf.innerHTML = "";
  createFormElement();
}

function createBook(title, author, numberOfPages) {
  // ADD BASIC INPUT VERIFICATION
  if (title.length === 0 || author.length === 0 || numberOfPages.lenght === 0) {
    alert("All inputs are required");
    return;
  }
  if (Number(numberOfPages) === 0) {
    alert("Number of Pages require a Number input");
    return;
  }

  LIBRARY.push(new Book(title, author, numberOfPages, genereteId(IDLENGTH)));
}

function deleteBook(targetId, bool) {
  if (bool == "y" || bool == "Y") {
    // filter method don't work because the LIBRARY is immutable and we have to reassign its return value to the LIBRARY.
    LIBRARY.forEach((book) => {
      if (book.id === targetId) LIBRARY.splice(LIBRARY.indexOf(book), 1);
    });

    displayLibrary();
  }
}

// TODO: prevent from generating two identical ID, although the're so much combination the characters can do that makes it less possible
function genereteId(lenght) {
  const characters =
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let generatedId = "";
  for (let i = 0; i < lenght; i++) {
    const rndNum = Math.ceil(Math.random() * characters.length);
    generatedId += characters[rndNum];
  }
  // pushes the genereted ID to the generated ID list for future improvement
  generatedIdList.push(generatedId);

  return generatedId;
}
