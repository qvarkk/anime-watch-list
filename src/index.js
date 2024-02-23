class Anime {
  constructor(title, status, epWatched, epAll, notes) {
    this.title = title;
    this.status = status;
    this.epWatched = epWatched;
    this.epAll = epAll;
    this.notes = notes;
  }
}
let myList = [];

const animeCard = document.querySelector("#feed");
animeCard.remove();
animeCard.removeAttribute("id");

//#region DOM_actions

function createGridCard(name, status, epN, epA, notes) {
  const cardsGrid = document.querySelector("#titlesGrid");

  let newCard = animeCard.cloneNode(true);
  cardsGrid.insertBefore(
    newCard,
    document.querySelector(".title-card")
  );

  let statusDiv = newCard.querySelector("#statusDiv");
  let statusPara = newCard.querySelector("#statusPara");
  let namePara = newCard.querySelector("#titlePara");
  let epPara = newCard.querySelector("#epPara");
  let notesPara = newCard.querySelector("#notesPara");

  switch (status) {
    case "hold":
      statusPara.textContent = "On Hold";
      statusDiv.classList.add("hold");
      statusDiv.classList.remove("watch");
      statusDiv.classList.remove("fin");
      break;
    case "watch":
      statusPara.textContent = "Watching";
      statusDiv.classList.add("watch");
      statusDiv.classList.remove("hold");
      statusDiv.classList.remove("fin");
      break;
    case "fin":
      statusPara.textContent = "Finished";
      statusDiv.classList.add("fin");
      statusDiv.classList.remove("hold");
      statusDiv.classList.remove("watch");
      break;
  }

  namePara.textContent = name;
  epPara.textContent = `${epN}/${epA} Ep`;
  notesPara.textContent = notes;
}

function refreshButtonsActions() {
  let cards = document.querySelectorAll(".title-card");

  let i = 0;
  for (card of cards) {
    let epBtn = card.querySelector("#addEpBtn");
    let holdBtn = card.querySelector("#switchHoldBtn");
    let removeBtn = card.querySelector("#remTitleBtn");
    let index = myList.length - i - 1;

    epBtn.addEventListener("click", () => {
      if (myList[index].epWatched >= myList[index].epAll) {
        return;
      } else {
        myList[index].epWatched = parseInt(myList[index].epWatched) + 1;
        if (myList[index].epWatched == myList[index].epAll) {
          myList[index].status = "fin";
        }
        saveList();
        reloadCardsGrid();
      }
    });

    holdBtn.addEventListener("click", () => {
      switch (myList[index].status) {
        case "fin":
          return;
        case "watch":
          myList[index].status = "hold";
          break;
        case "hold":
          myList[index].status = "watch";
          break;
      }
      saveList();
      reloadCardsGrid();
    });

    removeBtn.addEventListener("click", () => {
      card.remove();
      myList.splice(index, 1);
      saveList();
      reloadCardsGrid();
    });

    i++;
  }
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
  refreshButtonsActions();
}

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
  saveList();
  reloadCardsGrid();
}

//#endregion

//#region form_actions

const addAnimeBtn = document.querySelector("#addTitleBtn");
const addAnimeModal = document.querySelector("#modal");
const overlay = document.querySelector("#overlay");

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

//#endregion

//#region localstorage_actions

function saveList() {
  let jStr = JSON.stringify(myList);
  localStorage.setItem("list", jStr);
}

function loadList() {
  if (localStorage.getItem("list") != null) {
    myList = JSON.parse(localStorage.getItem("list"));
  }
}

//#endregion

loadList();
reloadCardsGrid();