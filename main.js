// I don't know easier way to save html built element to js,
// so it just takes the div and removes it on load
const animeCard = document.querySelector("#feed");
animeCard.remove();
animeCard.removeAttribute("id");

// Object constructor
let myList = [];
function Anime(title, status, epWatched, epAll, notes) {
  this.title = title;
  this.status = status;
  this.epWatched = epWatched;
  this.epAll = epAll;
  this.notes = notes;
}

// Title section
// Variables
const cardsGrid = document.querySelector("#titlesGrid");
let statusDiv;
let statusPara;
let namePara;
let epPara;
let notesPara;

// Functions
function createGridCard(name, status, epN, epA, notes) {
  cardsGrid.insertBefore(
    animeCard.cloneNode(true),
    document.querySelector(".title-card")
  );

  statusDiv = document.querySelectorAll("#statusDiv")[0];
  statusPara = document.querySelectorAll("#statusPara")[0];
  namePara = document.querySelectorAll("#titlePara")[0];
  epPara = document.querySelectorAll("#epPara")[0];
  notesPara = document.querySelectorAll("#notesPara")[0];

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

function reloadCardsGrid() {
  let allCards = document.querySelectorAll(".title-card");
  for (card of allCards) {
    card.remove();
    console.log(`removed ${card}`);
  }
  for (anime of myList) {
    createGridCard(
      anime.title,
      anime.status,
      anime.epWatched,
      anime.epAll,
      anime.notes
    );
  }
}
reloadCardsGrid();

// Modal and form section
// Modal variables
const addAnimeBtn = document.querySelector("#addTitleBtn");
const addAnimeModal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");
// Form variables
const addAnimeForm = document.querySelector("#addTitleForm");
const nameFormInput = document.querySelector("#nameFormInput");
const epNowFormInput = document.querySelector("#epNowFormInput");
const epAllFormInput = document.querySelector("#epAllFormInput");
const notesFormInput = document.querySelector("#notesFormInput");
const watchingFormInput = document.querySelector("#watchingFormInput");
const submitFormBtn = document.querySelector("#submitTitleButton");

// Modal events
addAnimeBtn.addEventListener("click", () => {
  addAnimeForm.reset();
  addAnimeModal.classList.remove("inactive");
  overlay.classList.remove("inactive");
});

overlay.addEventListener("click", () => {
  addAnimeModal.classList.add("inactive");
  overlay.classList.add("inactive");
});

// Form events
addAnimeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addAnimeToList();
  addAnimeModal.classList.add("inactive");
  overlay.classList.add("inactive");
});

function addAnimeToList() {
  let status;
  if (epNowFormInput.value === epAllFormInput.value) {
    status = "fin";
  } else if (watchingFormInput.checked === true) {
    status = "watch";
  } else {
    status = "hold";
  }
  let newAnime = new Anime(
    nameFormInput.value,
    status,
    epNowFormInput.value,
    epAllFormInput.value,
    notesFormInput.value
  );
  myList.push(newAnime);
  reloadCardsGrid();
}
