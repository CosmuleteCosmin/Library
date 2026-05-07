const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

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

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p><strong>Autor:</strong> ${book.author}</p>
            <p><strong>Pagini:</strong> ${book.pages}</p>
            <p><strong>Statut:</strong> ${book.read ? 'Citită' : 'Necitită'}</p>
        `;

        container.appendChild(bookCard);
    });
}

const button = document.querySelector("#new-book-btn");

button.addEventListener("click", () => {

});


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('The Little Prince', 'Antoine de Saint-Exupéry', 96, true);c