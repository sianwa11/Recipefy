import { API_URL } from "./config.js";

export const state = {
  recipe: {}, // The recipe to be viewed
  search: {
    results: [],
  },
};

// Temporary
export const searchRecipe = async function () {
  try {
    const res = await fetch(`${API_URL}`);
    const data = await res.json();

    state.search.results.push(...data.results);
  } catch (err) {
    console.error(err.message);
  }
};

export const getSearchResults = function () {
  return state.search.results;
};

// fetch(
//   `https://api.spoonacular.com/recipes/complexSearch?apiKey=1feba7fd619b4bd88e2d5f4ee37a0886`
// )
//   .then((res) => {
//     console.log(res);
//     return res.json();
//   })
//   .then((data) => console.log(data));
