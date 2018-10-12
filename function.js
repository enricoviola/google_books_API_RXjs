function displayBooks ( book ) {
    const booksEle = document.querySelector('#books');

    const bookTpl = `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${book.thumbnail}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">${book.description}</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>`;

    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = bookTpl;
    booksEle.appendChild(div);
}