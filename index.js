//API: https://www.omdbapi.com/?apikey=3d6ecfb9&s=%22here%22
//films-list inner html
/*
<div class="film-wrapper">
              <figure class="film-poster-wrapper">
                <img
                  class="film-poster"
                  src=""
                  alt=""
                />
              </figure>
              <div class="film-info">
                <h3 class="film-title"></h3>
                <div class="film-details">
                  <p class="film-year"></p>
                  <p class="film-type"></p>
                </div>
              </div>
            </div>
            */

async function renderFilms(targetValue) {
  //note: the targetValue is only for the sort
  const films = await fetch(
    "https://www.omdbapi.com/?apikey=3d6ecfb9&s=%22here%22"
  );
  const filmsData = await films.json();
  //Sort by year v
  if (targetValue === "Newest") {
    filmsData.Search.sort((a, b) => b.Year - a.Year);
  } else if (targetValue === "Oldest") {
    filmsData.Search.sort((a, b) => a.Year - b.Year);
  }
  //Sort by year ^
  const filmsDataHTML = filmsData.Search.map(
    (film) =>
      `<div class="film-wrapper">
    <figure class="film-poster-wrapper">
      <img
        class="film-poster"
        src="${film.Poster}"
        alt=""
      />
      <i class="fas fa-play-circle"></i>
    </figure>
    <div class="film-info">
      <h3 class="film-title">${film.Title}</h3>
      <div class="film-details">
        <p class="film-year">${film.Year}</p>
        <p class="film-type">${film.Type}</p>
      </div>
    </div>
  </div>`
  ).join("");
  const filmList = document.querySelector(".films-list");
  filmList.innerHTML = filmsDataHTML;
}
renderFilms();

async function OnSearchChange(event) {
  const id = event.target.value;
  const films = await fetch(`https://www.omdbapi.com/?apikey=3d6ecfb9&s=${id}`);
  const filmsData = await films.json();
  const filmsDataHTML = filmsData.Search.map(
    (film) =>
      `<div class="film-wrapper">
        <figure class="film-poster-wrapper">
          <img
            class="film-poster"
            src="${film.Poster}"
            alt=""
          />
          <i class="fas fa-play-circle"></i>
        </figure>
        <div class="film-info">
          <h3 class="film-title">${film.Title}</h3>
          <div class="film-details">
            <p class="film-year">${film.Year}</p>
            <p class="film-type">${film.Type}</p>
          </div>
        </div>
      </div>`
  ).join("");
  const filmList = document.querySelector(".films-list");
  filmList.innerHTML = filmsDataHTML;
  console.log(event.target.value);
}

function filterFilms(event) {
  renderFilms(event.target.value);
}
