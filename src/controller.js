// Imports
import * as model from "./model.js";
import SearchResultsView from "./Views/SearchResultsView.js";
import SearchView from "./Views/SearchView.js";
import PaginationView from "./Views/PaginationView.js";
import RecipeView from "./Views/RecipeView.js";

const controlSearchResults = async function () {
  try {
    // Render spinner
    SearchResultsView.renderSpinner();

    // 1. Get the query
    const query = SearchView.getQuery();
    if (!query) return;

    // 2. Search for recipes with query
    await model.searchRecipe(query);

    // 3. Render list of recipes searched
    SearchResultsView.render(model.getResultsPerPage());

    // 4. Render pagination
    PaginationView.render(model.state.search);
  } catch (err) {
    console.error(err.message);
    SearchResultsView.renderError();
  }
};

const controlPagination = function (goTo) {
  // 1. Render the new search results
  SearchResultsView.render(model.getResultsPerPage(goTo));

  // 2. Render pagination
  PaginationView.render(model.state.search);
};

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1. Render spinner
    RecipeView.renderSpinner();

    // 2. Load the recipe
    await model.getRecipe(id);

    // 3. Render Recipe
    RecipeView.renderRecipe(model.state.recipe);
    // console.log(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

// Starting point of the application
const init = function () {
  // This will change later
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerGoTo(controlPagination);
  SearchResultsView.addHandlerRecipe(controlRecipe);
};

init();
