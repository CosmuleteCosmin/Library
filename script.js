const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

function displayBooks() {
    const container = document.querySelector('#library-container');
    if (!container) return;

    container.innerHTML = '';

    myLibrary.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-id', book.id);

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <p><strong>Status:</strong> ${book.read ? 'Read' : 'Not Read'}</p>
            <div class="card-buttons">
                <button class="toggle-read">Change Status</button>
                <button class="remove">Remove</button>
            </div>
        `;

        container.appendChild(bookCard);

        // Remove button logic
        const removeBtn = bookCard.querySelector('.remove');
        removeBtn.addEventListener('click', () => {
            removeBook(book.id);
        });

        // Toggle Read button logic
        const toggleBtn = bookCard.querySelector('.toggle-read');
        toggleBtn.addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });
    });
}

function removeBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#new-book-btn");
const closeButton = document.querySelector("#cancel");
const form = document.querySelector("#book-form");

showButton.addEventListener("click", () => {
    dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    dialog.close();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#book").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#status").value;
    const isRead = status === "read";

    addBookToLibrary(title, author, pages, isRead);

    form.reset();
    dialog.close();
});

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('The Little Prince', 'Antoine de Saint-Exupéry', 96, true);
