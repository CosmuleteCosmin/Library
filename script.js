const myLibrary = [];

function Book(name, author, id){
    this.name = name;
    this.author = author;
    this.id = id;
}

function addBookToLibrary(name, author){
    myLibrary.add(Book(name, author, crypto.randomUUID()));
}

function displayBooks(){
    for(let i = 0; i < myLibrary.length; i++){
        
    }
}