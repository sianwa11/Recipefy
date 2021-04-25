class SearchResultsView {
  _parentElement = document.querySelector(".recipes");

  render(data) {
    const markup = this._generateMarkup(data);

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup(results) {
    return results.map(this._markup).join("");
  }

  _markup(el) {
    return ` 
    <li>
      <a href="javascript:void(0)">
        <img
          class="img-avatar"
          src="${el.image}"
          alt=""
        />
        ${el.title}

      </a>
    </li>`;
  }
}

export default new SearchResultsView();
