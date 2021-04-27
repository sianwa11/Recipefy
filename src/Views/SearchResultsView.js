class SearchResultsView {
  _parentElement = document.querySelector(".recipes");

  render(data) {
    if (!data) return;
    const markup = this._generateMarkup(data);

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError() {
    const markup = `Recipe not found :(`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderSpinner() {
    const spinner = `
    <div style="display: flex; justify-content: center;">
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>  
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", spinner);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup(results) {
    // console.log(results);
    return results.map(this._markup).join("");
  }

  _markup(el) {
    return ` 
    <li class="text-muted preview">
      <a href="#${el.id}">
        <img
          class="img-avatar"
          src="${el.image_url}"
          alt=""
        />
        ${el.title}

      </a>
    </li>`;
  }

  /**
   * Runs the model.controlRecipe function when the page is loaded
   * and when there's a hashchange in the url
   * @param {controlRecipe} handler
   */
  addHandlerRecipe(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
}

export default new SearchResultsView();
