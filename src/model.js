import { API_URL, API_KEY, RES_PER_PAGE } from "./config.js";

export const state = {
  recipe: {}, // The recipe to be viewed
  search: {
    query: "",
    page: 1,
    results: [],
    resultsPerPage: RES_PER_PAGE,
  },
};

export const searchRecipe = async function (query) {
  try {
    state.search.page = 1;
    state.search.query = query;
    const res = await fetch(`${API_URL}?search=${query}&key=${API_KEY}`);
    const data = await res.json();

    // state.search.results.push(...data.data.recipes);
    state.search.results = data.data.recipes;

    // return state.search.results;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

export const getResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 10;

  return state.search.results.slice(start, end);
};

// fetch(
//   `https://api.spoonacular.com/recipes/complexSearch?apiKey=1feba7fd619b4bd88e2d5f4ee37a0886`
// )
//   .then((res) => {
//     console.log(res);
//     return res.json();
//   })
//   .then((data) => console.log(data));
