import { API_URL, API_KEY, RES_PER_PAGE } from "./config.js";

export const state = {
  recipe: {}, // The recipe to be viewed
  search: {
    query: "",
    page: 1,
    results: [],
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const searchRecipe = async function (query) {
  try {
    state.search.page = 1;
    state.search.query = query;
    const res = await fetch(`${API_URL}?search=${query}&key=${API_KEY}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.status} (${res.status})`);
    if (data.results < 1) throw new Error(`Recipe not found :(`);

    state.search.results = data.data.recipes;
  } catch (err) {
    // console.error(err.message);
    throw err;
  }
};

export const getResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 10;

  return state.search.results.slice(start, end);
};

export const getRecipe = async function (id) {
  try {
    const res = await fetch(`${API_URL}${id}?key=${API_KEY}`);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    state.recipe = data.data.recipe;

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

/**
 * Ensures bookmarks do not exceed 7
 * @return
 */
export const bookMarkCap = function () {
  if (state.bookmarks.length === 7) {
    alert("Bookmarks Full");
    return true;
  } else {
    return false;
  }
};

export const addBookmarks = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  persistBookmarks();

  // console.log(state.bookmarks);
};

export const removeBookmarks = function (id) {
  const index = state.bookmarks.findIndex((recipe) => recipe.id === id);
  state.bookmarks.splice(index, 1);

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();
