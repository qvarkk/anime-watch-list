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

const listContainer = document.querySelector('#anime-list');

let animeCard = document.createElement('div');
animeCard.classList.add('anime-card');
let content = document.createElement('p');
content.setAttribute('id', 'content');

for (let i = 0; i < 6; i++) {
  animeCard.appendChild(content.cloneNode(true));
}

function displayList() {
  for (let anime of myList) {
    listContainer.insertBefore(animeCard.cloneNode(true), listContainer.children[0]);
    let contentParas = document.querySelectorAll('#content');
    contentParas[0].innerHTML = anime.title;
    contentParas[1].innerHTML = anime.status;
    contentParas[2].innerHTML = anime.epWatched;
    contentParas[3].innerHTML = anime.epAll;
    contentParas[4].innerHTML = anime.rating;
    contentParas[5].innerHTML = anime.notes;
  }
}
displayList();

