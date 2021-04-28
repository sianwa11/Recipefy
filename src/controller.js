// Imports
import * as model from "./model.js";
import SearchResultsView from "./Views/SearchResultsView.js";
import SearchView from "./Views/SearchView.js";
import PaginationView from "./Views/PaginationView.js";
import RecipeView from "./Views/RecipeView.js";
import BookMarksView from "./Views/BookMarkViews.js";

const controlSearchResults = async function () {
  try {
    // 1. Get the query
    const query = SearchView.getQuery();
    if (query === "") {
      alert("Input recipe.");
      return;
    }

    // Render spinner
    SearchResultsView.renderSpinner();

    // 2. Search for recipes with query
    await model.searchRecipe(query);

    // 3. Render list of recipes searched
    SearchResultsView.render(model.getResultsPerPage());

    // 4. Render pagination
    PaginationView.render(model.state.search);
  } catch (err) {
    console.error(err.message);
    SearchResultsView.renderError(`${err.message}`);
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

const bookMarkRecipe = function (bool, recipe) {
  // Remove bookmark from storage
  if (!bool) {
    model.removeBookmarks(recipe.id);
    BookMarksView.render(model.state.bookmarks);
    return;
  }

  // Add bookmark to storage if they do not exceed the cap of 7
  const limitReached = model.bookMarkCap();
  if (limitReached) return;

  model.addBookmarks(recipe);
  BookMarksView.render(model.state.bookmarks);
};

// Starting point of the application
const init = function () {
  // This will change later
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerGoTo(controlPagination);
  SearchResultsView.addHandlerRecipe(controlRecipe);

  BookMarksView.render(model.state.bookmarks);
  RecipeView.addHandlerBookMarkRecipe(bookMarkRecipe);
};

init();
