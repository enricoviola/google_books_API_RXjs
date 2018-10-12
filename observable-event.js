"use strict";
exports.__esModule = true;
var albumUrl = "https://www.googleapis.com/books/v1/volumes?q=angular";
var function_1 = require("./function");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
// il comando JS Fecth restituisce una Promise
var p = fetch(albumUrl).then(function (res1) {
    return res1.json();
});
//il comando FROM è corrispondente al vecchio "fromPromise" di RxJS 5
var objs = rxjs_1.from(p);
objs.pipe(operators_1.map(function (res) { return res.items; }), operators_1.switchMap(function (items) { return rxjs_1.of.apply(void 0, items); }), operators_1.map(function (item) { return item.volumeInfo; }), operators_1.map(function (item) {
    var obj = {
        title: item.title,
        description: item.description || 'Descrizione non presente',
        authors: item.authors ? item.authors.join(',') : '',
        thumbnail: item.imageLinks.smallThumbnail
    };
    return obj;
})).subscribe(function_1.displayBooks);
