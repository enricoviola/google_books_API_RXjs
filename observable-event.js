const albumUrl = "https://www.googleapis.com/books/v1/volumes?q=vacanza";
const { from, of } = rxjs;
const { map, tap, switchMap } = rxjs.operators;

const p = fetch(albumUrl).then( res1 => res1.json());
p.then(res => console.log(res, typeof res));

const objs = from(p);
objs.pipe(
    map( res => res.items ),
    switchMap( (items) => of(...items) ),
    map( (item) => item.volumeInfo ),
    map( item => {
        const obj = {
            title: item.title,
            description: item.description,
            authors: item.authors ? item.authors.join(',') : '',
            thumbnail: item.imageLinks.smallThumbnail,
        };
        return obj;
    })
).subscribe( displayBooks );