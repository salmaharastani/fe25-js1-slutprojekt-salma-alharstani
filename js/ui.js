// js/ui.js
import { getImageUrl } from "./api.js";

export function setStatus(message = "", type = "info") {
  const el = document.querySelector("#status");
  if (!message) {
    el.innerHTML = "";
    return;
  }

  const className =
    type === "error" ? "alert alert-danger" : type === "success" ? "alert alert-success" : "alert alert-secondary";

  el.innerHTML = `<div class="${className}" role="alert">${message}</div>`;
}

export function clearResults() {
  document.querySelector("#results").innerHTML = "";
}

export function renderMovieList(movies, title) {
  setStatus(title, "success");
  const results = document.querySelector("#results");
  results.innerHTML = "";

  movies.forEach((m) => {
    const img = getImageUrl(m.poster_path);
    results.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="card h-100">
          ${img ? `<img class="poster" src="${img}" alt="${m.title}" />` : `<div class="poster"></div>`}
          <div class="card-body">
            <h5 class="card-title">${m.title}</h5>
            <p class="card-text small mb-1"><strong>Release:</strong> ${m.release_date || "Okänt"}</p>
            ${m.overview ? `<p class="card-text small">${m.overview}</p>` : ""}
          </div>
        </div>
      </div>
    `;
  });
}

export function renderPersonList(people, title) {
  setStatus(title, "success");
  const results = document.querySelector("#results");
  results.innerHTML = "";

  people.forEach((p) => {
    const img = getImageUrl(p.profile_path);

    // known_for: lista av filmer/TV - vi tar max 3
    const top3 = (p.known_for || []).slice(0, 3).map((item) => {
      const type = item.media_type === "tv" ? "TV" : "Movie";
      const name = item.title || item.name || "Okänd titel";
      return `<li>${type}: ${name}</li>`;
    }).join("");

    results.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="card h-100">
          ${img ? `<img class="poster" src="${img}" alt="${p.name}" />` : `<div class="poster"></div>`}
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text small mb-2"><strong>Known for:</strong> ${p.known_for_department || "Okänt"}</p>
            <p class="card-text small mb-1"><strong>Topp 3:</strong></p>
            <ul class="small mb-0">
              ${top3 || "<li>Ingen info</li>"}
            </ul>
          </div>
        </div>
      </div>
    `;
  });
}
