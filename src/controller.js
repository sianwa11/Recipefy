// Imports
import * as model from "./model.js";
import SearchResultsView from "./Views/SearchResultsView.js";

const controlSearchResults = async function () {
  try {
    await model.searchRecipe();

    SearchResultsView.render(model.getSearchResults());
  } catch (err) {
    console.error(err.message);
  }
};

// Starting point of the application
const init = function () {
  console.log("Starting point of the application");

  controlSearchResults();
};

init();
