const { from, of, fromEvent } = rxjs;
const { map, tap, switchMap, filter, debounceTime } = rxjs.operators;

const searchEle = document.querySelector('input');
const node = document.querySelector('input[type=text]');

//create observable that emits click events
const source = fromEvent(document, 'click');
//map to string with given event timestamp
const example = source.pipe(
        map(event => `Event time: ${event.timeStamp}`)
    );
console.log(source, example);
//output (example): 'Event time: 7276.390000000001'
const subscribe = example.subscribe(val => console.log(val));
prendiLibriDaGoogleBooks();

// Trasforma l'evento in sequenza observable
const prendiTesto = fromEvent( document, 'input');
prendiTesto.pipe(
        map( event => {
            return event.target.value;
         }),
        filter( val => val.length > 2 ),
        debounceTime(800),

        // il TAP (vecchio DO di Rxjs 5) permette di fare qualsiasi cosa, in questo caso chiamare una funziona di pulizia esterna
        // tanto alla fine ripresenterà lo stesso Observable e possiamo continuare con le operations consecutive
        tap( () => cleanBooks() ),

        // lo SWITCHMAP permette invece di prendere l'observable e buttarlo dentro a un altro, per eventuali altre azioni.
        // per passare da un observable a un altro
        switchMap( q => prendiLibriDaGoogleBooks(q) )
    ).subscribe();

function prendiLibriDaGoogleBooks(q = "angular") {
    const albumUrl = `https://www.googleapis.com/books/v1/volumes?q=${q}`;
    // il comando JS Fecth restituisce una Promise
    const p = fetch(albumUrl).then( res1 => res1.json());

    //il comando FROM è corrispondente al vecchio "fromPromise" di RxJS 5
    let objs = from(p);
    console.log(albumUrl, q, typeof objs, objs)

    objs.pipe(
        map( res => res.items || [] ),
        filter ( items => items.length > 0 ),
        switchMap( (items) => of(...items) ),
        map( (item) => item.volumeInfo ),
        map( item => {
            const obj = {
                title: item.title,
                description: item.description || 'Descrizione non presente',
                authors: item.authors ? item.authors.join(',') : '',
                thumbnail: item.imageLinks.smallThumbnail,
            };
            return obj;
        })
    ).subscribe( displayBooks )
};