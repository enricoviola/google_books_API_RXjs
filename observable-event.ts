const albumUrl = "https://www.googleapis.com/books/v1/volumes?q=angular";

import {displayBooks} from "./function";
import { from, of } from "rxjs";
import { map, tap, switchMap } from "rxjs/operators";


// il comando JS Fecth restituisce una Promise
const p = fetch(albumUrl).then( res1 => 
    {
        return res1.json();
    });

    interface imageLink {
        smallThumbnail: string,
        thumbnail: string
    }
    interface volumeInfo {
        title: string,
        description: string,
        authors?: string[],
        categories?: string[],
        imageLinks: imageLink
    }
    interface book {
        id: string,
        volumeInfo : volumeInfo
    }
    interface books {
        items: book[],
        totalItems: number,
        kind: string
    }


//il comando FROM è corrispondente al vecchio "fromPromise" di RxJS 5
const objs = from(p);
objs.pipe(
    map( (res: books) => res.items ),
    switchMap( (items: book[]) => of(...items) ),
    map( (item:book) => item.volumeInfo ),
    map( (item: volumeInfo) => {
        const obj = {
            title: item.title,
            description: item.description || 'Descrizione non presente',
            authors: item.authors ? item.authors.join(',') : '',
            thumbnail: item.imageLinks.smallThumbnail,
        };
        return obj;
    })
).subscribe( displayBooks );