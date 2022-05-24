// Dom elements

const form = document.querySelector('.book-form');
const list = document.querySelector('.list');
const removeBtn = document.querySelector('.delete');

const books = JSON.parse(localStorage.getItem('books')) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const displayBook = (book) => {
  const ulI = document.createElement('ul');
  ulI.innerHTML = `
  
  <li class="list-elements">"${book.title}" by ${book.author} </li>
  <button class="delete">remove</button>
  `;
  list.appendChild(ulI);
};

books.forEach(displayBook);

form.addEventListener('submit', (e) => {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  e.preventDefault();
  const book = new Book(title.value, author.value);
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));

  displayBook(book);
  title.value = '';
  author.value = '';
});

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});
