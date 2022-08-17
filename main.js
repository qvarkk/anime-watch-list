// !!! MAKE ELEMENT WITH JS NOT WITH HTML !!!
const animeCard = document.querySelector("#feed");
animeCard.remove();
animeCard.removeAttribute("id");
// !!! MAKE ELEMENT WITH JS NOT WITH HTML !!!

// Object constructor for animes
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
  // refreshButtonsActions();
}
// Useless for now but if some of cards
// are in memory (future feature) it will load them on start up
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

// Modal and form functions for events
function addAnime() {
  addAnimeForm.reset();
  addAnimeModal.classList.remove("inactive");
  overlay.classList.remove("inactive");
}

function closeOverlay() {
  addAnimeModal.classList.add("inactive");
  overlay.classList.add("inactive");
}

function submitNewAnime(e) {
  e.preventDefault();
  addAnimeToList();
  addAnimeModal.classList.add("inactive");
  overlay.classList.add("inactive");
}

addAnimeBtn.onclick = addAnime;
overlay.onclick = closeOverlay;
addAnimeForm.onsubmit = submitNewAnime;

// Form function
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
  refreshButtonsActions();
}

// Cards buttons section
let addEpisodeBtn;
let switchHoldBtn;
let removeAnimeBtn;
let allCards;

// Buttons functions for events
// A bit inconsistent and confusing code but I have no idea how to solve this problem another way
function refreshButtonsActions() {
  addEpisodeBtn = document.querySelectorAll("#addEpBtn");
  switchHoldBtn = document.querySelectorAll("#switchHoldBtn");
  removeAnimeBtn = document.querySelectorAll("#remTitleBtn");
  allCards = document.querySelectorAll(".title-card");

  for (let i = 0; i < addEpisodeBtn.length; i++) {
    addEpisodeBtn[i].addEventListener("click", () => {
      if (
        myList[myList.length - 1 - i].epWatched ===
        myList[myList.length - 1 - i].epAll
      ) {
        return;
      } else {
        myList[myList.length - 1 - i].epWatched =
          parseInt(myList[myList.length - 1 - i].epWatched) + 1;
        reloadCardsGrid();
        refreshButtonsActions();
      }
    });
  }

  for (let i = 0; i < switchHoldBtn.length; i++) {
    switchHoldBtn[i].addEventListener("click", () => {
      if (myList[myList.length - 1 - i].status === "fin") {
        return;
      } else if (myList[myList.length - 1 - i].status === "watch") {
        myList[myList.length - 1 - i].status = "hold";
        reloadCardsGrid();
        refreshButtonsActions();
      } else if (myList[myList.length - 1 - i].status === "hold") {
        myList[myList.length - 1 - i].status = "watch";
        reloadCardsGrid();
        refreshButtonsActions();
      }
    });
  }

  for (let i = 0; i < removeAnimeBtn.length; i++) {
    removeAnimeBtn[i].addEventListener("click", () => {
      allCards[allCards.length - 1 - i].remove();
      myList.splice(myList.length - 1 - i, 1);
      reloadCardsGrid();
      refreshButtonsActions();
    });
  }
}
// As well does nothing now but later will be helpful
refreshButtonsActions();
