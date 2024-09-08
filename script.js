const titleInput = document.querySelector("input[name='title']");
const authorInput = document.querySelector("input[name='author']");
const pagesInput = document.querySelector("input[name='pages']");
const bookShelf = document.querySelector(".book-shelf");

const LIBRARY = [];

// INITIALIZE
createFormElement();

// book.. XD
function Book(title, author, numberOfPages) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
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
  titleInput.name = "title";
  authorInput.name = "author";
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
function createBookElement(title, author, numberOfPages) {
  const li = document.createElement("li");
  li.classList = "book-wrapper";
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

  h2.innerText = title;
  p.innerText = author;
  span.innerText = numberOfPages;

  li.appendChild(article);
  article.appendChild(header);
  header.appendChild(h2);
  article.appendChild(section);
  section.appendChild(p);
  section.appendChild(span);

  return li;
}

// displays the books on the library to the bookShelf element
function displayLibrary() {
  clearBookShelfElement();
  LIBRARY.forEach((book) => {
    const bookElement = createBookElement(
      book.title,
      book.author,
      book.numberOfPages
    );

    bookShelf.appendChild(bookElement);
  });
}

function clearBookShelfElement() {
  bookShelf.innerHTML = "";
  createFormElement();
}

function createBook(title, author, numberOfPages) {
  LIBRARY.push(new Book(title, author, numberOfPages));
}
