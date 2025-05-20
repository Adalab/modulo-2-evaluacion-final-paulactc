"use strict";

/*<li>titulo anime </li>
      <li><img src="https://cdn.myanimelist.net/images/anime/1141/142503.jpg"></li> */

//QUERY SELECTOR
const inputSearch = document.querySelector(".js-search");

const btnSearch = document.querySelector(".js-btnsearch");

const btnReset = document.querySelector(".js-btnreset");

const renderUl = document.querySelector(".js-list");

//VARIABLE DE DATOS

let allAnimes = [];

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
        renderUl.innerHTML += `<li><img src="${animeTitle.images.jpg.image_url}"></li> <li>${animeTitle.title}</li>`;
      }
    });
};

//EVENTOS

btnSearch.addEventListener("click", handleclickbtnfilter);

//CUANDO CARGA LA PÁGINA

fetch("https://api.jikan.moe/v4/anime?q=naruto")
  .then((res) => res.json())
  .then((data) => {
    for (const animeTitle of data.data) {
      renderUl.innerHTML += `<li class="js-animelistli animelistli"><img class="img" src="${animeTitle.images.jpg.image_url}"> <h3>${animeTitle.title}</h3></li>`;
    }
    const allAnimeLi = document.querySelectorAll(".js-animelistli");

    for (const oneAnimeLi of allAnimeLi) {
      oneAnimeLi.addEventListener("click", handleclickselectanime);
    }
  });
