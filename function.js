function displayBooks ( book ) {
    const booksEle = document.querySelector('#books');

    const bookTpl = 
    `<img class="card-img-top" src="${book.thumbnail}" alt="Card image cap">
    <div class="card-body">
    <h6 class="card-title">${book.title}</h6>
    <p class="card-text">${book.description}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>`;

    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = bookTpl;
    booksEle.appendChild(div);
}

function cleanBooks() {
    let booksElement = document.querySelector('#books');
    booksElement.innerHTML = "";
}