export default class View {
  _data;
  _parentElement;

  render(data) {
    if (!data) return;
    this._data = data;

    const markup = this._generateMarkup(data);

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = "") {
    const markup = `
      <li class="text-muted ml-50">
        <p>${message}</p>
      </li>
    `;
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
