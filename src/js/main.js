"use strict";

/*<li>titulo anime </li>
      <li><img src="https://cdn.myanimelist.net/images/anime/1141/142503.jpg"></li> */

//QUERY SELECTOR
const inputSearch = document.querySelector(".js-search");

const btnSearch = document.querySelector(".js-btnsearch");

const btnReset = document.querySelector(".js-btnreset");

const renderUl = document.querySelector(".js-list");

const renderUlFavorites = document.querySelector(".js-listfavorites");

//VARIABLE DE DATOS

let allAnimes = [];
let favorites = [];

/* {
    mal_id: 20,
    images: {
      jpg: {
        image_url: "https://placehold.co/210x300/ffffff/555555?text=TV",
      },
    },
    title: "NARUTO",
  },*/

//FUNCIONES

function handleclickselectanime(ev) {
  console.log(ev.currentTarget);

  const clickEventCurrentLi = ev.currentTarget;

  clickEventCurrentLi.classList.toggle("favorites");

  // Identificamos el objeto asociado al <li> en el que se ha hecho click.

  const idGancho = clickEventCurrentLi.dataset.gancho;

  // guardamos el array  clickeado en la variable clickedAnimesObject

  const clickedAnimesObject = allAnimes.find(
    (oneAnimeLi) => oneAnimeLi.mal_id === parseInt(idGancho)
  );
  console.log(clickedAnimesObject);

  //Busco si esta en favoritos o no el anime

  const animePositionFavorites = favorites.findIndex(
    (oneAnimeLi) => oneAnimeLi.mal_id === parseInt(idGancho)
  );

  //Si al clickear aún no esta en favoritos lo añado
  if (animePositionFavorites === -1) {
    //guardo en favorites los arrays que ha clickeado el usuario
    favorites.push(clickedAnimesObject);
    //lo pinto en html
    renderUlFavorites.innerHTML += `<li class="js-animelistli animelistli" data-gancho="${clickedAnimesObject.mal_id}"><img class="img" src="${clickedAnimesObject.images.jpg.image_url}"> <h3>${clickedAnimesObject.title}</h3></li>`;
  }
  console.log(animePositionFavorites);
}

/*
function renderOneAnimeUl() {
  renderUl.innerHTML = `<li>${infoOneAnime[0].title}</li>
      <li>
      <img src="${infoOneAnime[0].images.jpg.image_url}"> </li>`;
}

renderOneAnimeUl();*/

const handleclickbtnfilter = (ev) => {
  ev.preventDefault();

  const valueInput = inputSearch.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${valueInput}`)
    .then((res) => res.json())
    .then((data) => {
      renderUl.innerHTML = "";
      for (const animeTitle of data.data) {
        renderUl.innerHTML += `<li><img src="${animeTitle.images.jpg.image_url}" data-gancho="id"></li> <li>${animeTitle.title}</li>`;
      }
    });
};

//EVENTOS

btnSearch.addEventListener("click", handleclickbtnfilter);

//CUANDO CARGA LA PÁGINA

fetch("https://api.jikan.moe/v4/anime?q=naruto")
  .then((res) => res.json())
  .then((data) => {
    allAnimes = data.data;
    for (const animeTitle of data.data) {
      renderUl.innerHTML += `<li class="js-animelistli animelistli" data-gancho="${animeTitle.mal_id}"><img class="img" src="${animeTitle.images.jpg.image_url}"> <h3>${animeTitle.title}</h3></li>`;
    }
    const allAnimeLi = document.querySelectorAll(".js-animelistli");

    for (const oneAnimeLi of allAnimeLi) {
      oneAnimeLi.addEventListener("click", handleclickselectanime);
    }
  });
