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
      <div class="spinner-border text-dark" role="status">
        <span class="sr-only">Loading...</span>
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
    <li>
      <a href="javascript:void(0)">
        <img
          class="img-avatar"
          src="${el.image_url}"
          alt=""
        />
        ${el.title}

      </a>
    </li>`;
  }
}

export default new SearchResultsView();
