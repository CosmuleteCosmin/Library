class Library {
    constructor(){
        this.books = [];
    }

    addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        this.books.push(newBook);
        this.displayBooks();
    }

    removeBook(id) {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books.splice(index, 1);
            this.displayBooks();
        }
    }

    displayBooks() {
        const container = document.querySelector('#library-container');
        if (!container) return;

        container.innerHTML = '';

        this.books.forEach((book) => {
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
                this.removeBook(book.id);
            });

            // Toggle Read button logic
            const toggleBtn = bookCard.querySelector('.toggle-read');
            toggleBtn.addEventListener('click', () => {
                book.toggleRead();
                this.displayBooks();
            });
        });
    }
};

class Book{
    constructor(title, author, pages, read){
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead(){
        this.read = !this.read;
    }

}


const myLibrary = new Library();
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

    myLibrary.addBookToLibrary(title, author, pages, isRead);

    form.reset();
    dialog.close();
});

myLibrary.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
myLibrary.addBookToLibrary('1984', 'George Orwell', 328, false);
myLibrary.addBookToLibrary('The Little Prince', 'Antoine de Saint-Exupéry', 96, true);
