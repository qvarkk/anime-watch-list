// I don't know easier way to save html built element to js,
// so it just takes the div and removes it on load
const animeCard = document.querySelector("#feed");
animeCard.remove();
animeCard.removeAttribute("id");

let myList = [];
function Anime(title, status, epWatched, epAll, notes) {
  this.title = title;
  this.status = status;
  this.epWatched = epWatched;
  this.epAll = epAll;
  this.notes = notes;
}

function addAnimeToList() {
  let title = prompt("title");
  let status = prompt("status");
  let epWatched = prompt("epWatched");
  let epAll = prompt("epAll");
  let notes = prompt("notes");

  let newAnime = new Anime(title, status, epWatched, epAll, notes);
  myList.push(newAnime);
}

let anime1 = new Anime("haru", "fin", "12", "12", "slicky");
let anime2 = new Anime("natsu", "watch", "9", "24", "hot");
let anime3 = new Anime("aki", "hold", "0", "12", "not yet");
let anime4 = new Anime("fuyu", "hold", "0", "69", "not yet");
let anime5 = new Anime("mata haru", "hold", "0", "420", "not yet");
let anime6 = new Anime("mata natsu", "hold", "0", "42", "not yet");
myList.push(anime1, anime2, anime3, anime4, anime5, anime6);

const cardsGrid = document.querySelector("#titlesGrid");

function loadTitleToGrid(name, status, epN, epA, notes) {
  cardsGrid.insertBefore(
    animeCard.cloneNode(true),
    document.querySelector(".title-card")
  );

  let statusDiv = document.querySelectorAll("#statusDiv")[0];
  let statusPara = document.querySelectorAll("#statusPara")[0];
  let namePara = document.querySelectorAll("#titlePara")[0];
  let epPara = document.querySelectorAll("#epPara")[0];
  let notesPara = document.querySelectorAll("#notesPara")[0];

  // Changing tiles inners according to form
  if (status === "hold") {
    statusPara.textContent = "On Hold";
    statusDiv.classList.add("hold");
    statusDiv.classList.remove("watch");
    statusDiv.classList.remove("fin");
  } else if (status === "watch") {
    statusPara.textContent = "Watching";
    statusDiv.classList.add("watch");
    statusDiv.classList.remove("hold");
    statusDiv.classList.remove("fin");
  } else {
    statusDiv.classList.add("fin");
    statusPara.textContent = "Finished";
    statusDiv.classList.remove("hold");
    statusDiv.classList.remove("watch");
  }
  namePara.textContent = name;
  epPara.textContent = `${epN}/${epA} Ep`;
  notesPara.textContent = notes;
}

for (anime of myList) {
  loadTitleToGrid(
    anime.title,
    anime.status,
    anime.epWatched,
    anime.epAll,
    anime.notes
  );
}
