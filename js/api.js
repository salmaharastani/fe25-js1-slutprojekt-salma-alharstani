// js/api.js


const API_KEY = "20f00688fb9f4d5f8e15e37b33c274cb";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

import { API_KEY } from "./config.public.js";



async function fetchJson(endpoint) {
  const joinChar = endpoint.includes("?") ? "&" : "?";
  const url = `${BASE_URL}${endpoint}${joinChar}api_key=${API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return await res.json();
}


export function getImageUrl(path) {
  if (!path) return "";
  return `${IMG_BASE}${path}`;
}

export async function getTopRatedTop10() {
  const data = await fetchJson("/movie/top_rated?language=en-US&page=1");
  return data.results.slice(0, 10);
}

export async function getPopularTop10() {
  const data = await fetchJson("/movie/popular?language=en-US&page=1");
  return data.results.slice(0, 10);
}

export async function searchMovies(query) {
  const q = encodeURIComponent(query);
  const data = await fetchJson(`/search/movie?query=${q}&language=en-US&page=1`);
  return data.results;
}

export async function searchPeople(query) {
  const q = encodeURIComponent(query);
  const data = await fetchJson(`/search/person?query=${q}&language=en-US&page=1`);
  return data.results;
}
