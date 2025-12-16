// js/main.js
import {
  getTopRatedTop10,
  getPopularTop10,
  searchMovies,
  searchPeople,
} from "./api.js";

import {
  setStatus,
  clearResults,
  renderMovieList,
  renderPersonList,
} from "./ui.js";

const btnTopRated = document.querySelector("#btnTopRated");
const btnPopular = document.querySelector("#btnPopular");
const form = document.querySelector("#searchForm");
const input = document.querySelector("#searchInput");

async function loadTopRated() {
  try {
    setStatus("Laddar Top Rated...", "info");
    clearResults();
    const movies = await getTopRatedTop10();
    renderMovieList(movies, "Top Rated - Top 10");
  } catch (err) {
    setStatus("Något gick fel vid hämtning av Top Rated. Försök igen.", "error");
    console.error(err);
  }
}

async function loadPopular() {
  try {
    setStatus("Laddar Popular...", "info");
    clearResults();
    const movies = await getPopularTop10();
    renderMovieList(movies, "Popular - Top 10");
  } catch (err) {
    setStatus("Något gick fel vid hämtning av Popular. Försök igen.", "error");
    console.error(err);
  }
}

async function handleSearch(e) {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  const type = document.querySelector('input[name="searchType"]:checked').value;

  try {
    setStatus(`Söker "${query}"...`, "info");
    clearResults();

    if (type === "movie") {
      const movies = await searchMovies(query);

      if (movies.length === 0) {
        setStatus(`Inga filmer hittades för "${query}". Prova ett annat ord.`, "error");
        return;
      }

      renderMovieList(movies, `Sökresultat (Film): "${query}"`);
    } else {
      const people = await searchPeople(query);

      if (people.length === 0) {
        setStatus(`Inga personer hittades för "${query}". Prova ett annat namn.`, "error");
        return;
      }

      renderPersonList(people, `Sökresultat (Person): "${query}"`);
    }
  } catch (err) {
    setStatus("Något gick fel vid sökning. Kontrollera internet och försök igen.", "error");
    console.error(err);
  }
}

btnTopRated.addEventListener("click", loadTopRated);
btnPopular.addEventListener("click", loadPopular);
form.addEventListener("submit", handleSearch);

// Bonus: ladda något direkt vid start
loadPopular();
