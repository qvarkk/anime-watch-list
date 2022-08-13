let myList = [];

// !! ADD IMAGE INPUT !!
function Anime(title, status, epWatched, epAll, rating, notes) {
  this.title = title;
  this.status = status;
  this.epWatched = epWatched;
  this.epAll = epAll;
  this.rating = rating;
  this.notes = notes;
}

function addAnimeToList() {
  let title = prompt('title');
  let status = prompt('status');
  let epWatched = prompt('epWatched');
  let epAll = prompt('epAll');
  let rating = prompt('rating');
  let notes = prompt('notes');

  let newAnime = new Anime(title, status, epWatched, epAll, rating, notes);
  myList.push(newAnime);
}

let anime1 = new Anime('haru', 'finished', '12', '12', '9', 'stupid');
let anime2 = new Anime('natsu', 'watching', '9', '24', '*', 'quite fun');
myList.push(anime1, anime2);
