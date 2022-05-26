class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const booksArr = [];

const formData = document.querySelector('#dataForm');
formData.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = document.querySelector('#title');
  const bookAuthor = document.querySelector('#author');
  const bookObj = new Book(bookTitle.value, bookAuthor.value);
  booksArr.push(bookObj);
  // check local storage
  const initialData = JSON.parse(localStorage.getItem('books'));
  if (initialData === null) {
    localStorage.setItem('books', JSON.stringify(booksArr));
    bookTitle.value = '';
    bookAuthor.value = '';
    window.location.reload(true);
  } else {
    const newData = [...initialData, ...booksArr];
    localStorage.setItem('books', JSON.stringify(newData));
    bookTitle.value = '';
    bookAuthor.value = '';
    window.location.reload(true);
  }
});

const displayBooks = (book) => {
  const mainSection = document.querySelector('#listBooks');
  const listSection = document.createElement('li');
  listSection.classList.add('list-item');
  const description = document.createElement('p');
  description.classList.add('description');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  description.innerHTML = `"${book.title}" by ${book.author}`;
  deleteButton.innerText = 'Delete';
  deleteButton.addEventListener('click', () => {
    const localData = JSON.parse(localStorage.getItem('books'));
    const filteredData = localData.filter(
      (item) => item.author !== book.author,
    );
    localStorage.setItem('books', JSON.stringify(filteredData));
    window.location.reload(true);
  });
  listSection.appendChild(description);
  listSection.appendChild(deleteButton);
  mainSection.appendChild(listSection);
};

document.addEventListener('DOMContentLoaded', () => {
  const localData = JSON.parse(localStorage.getItem('books'));
  localData.forEach((item) => displayBooks(item));
});

document.querySelector('#listNav').addEventListener('click', () => {
  document.querySelector('.books').style.display = 'block';
  document.querySelector('#dataForm').style.display = 'none';
  document.querySelector('.contacts').style.display = 'none';
});
document.querySelector('#bookNav').addEventListener('click', () => {
  document.querySelector('#dataForm').style.display = 'flex';
  document.querySelector('.books').style.display = 'none';
  document.querySelector('.contacts').style.display = 'none';
});
document.querySelector('#contactNav').addEventListener('click', () => {
  document.querySelector('#dataForm').style.display = 'none';
  document.querySelector('.books').style.display = 'none';
  document.querySelector('.contacts').style.display = 'block';
});
