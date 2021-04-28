class PaginationView {
  _data;
  _parentElement = document.querySelector(".recipe_pagination");

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerGoTo(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-pagination");
      const goTo = +btn.dataset.goto;

      console.log(btn);

      handler(goTo);
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(`Total number of pages: ${numPages}`);

    // If More than one page
    if (currPage === 1 && numPages > 1) {
      return `
        <button
            type="button"
            class="btn-pagination btn btn-alt-secondary float-right"
            data-goto="${currPage + 1}">
            <i class="fa fa-chevron-right fa-fw"></i>
        </button>
        `;
    }

    // If its in the last page
    if (currPage === numPages && numPages > 1) {
      return `
        <button
            type="button"
            class="btn-pagination btn btn-alt-secondary float-left"
            data-goto="${currPage - 1}">
            <i class="fa fa-chevron-left fa-fw"></i>
        </button>
        `;
    }

    // If currPage > 1 and there are other pages
    if (currPage < numPages) {
      return `
      <button
        type="button"
        class="btn-pagination btn btn-alt-secondary float-right"
        data-goto="${currPage + 1}">
        <i class="fa fa-chevron-right fa-fw"></i>
      </button>

      <button
        type="button"
        class="btn-pagination btn btn-alt-secondary float-left"
        data-goto="${currPage - 1}">
        <i class="fa fa-chevron-left fa-fw"></i>
      </button>
      `;
    }

    // If there is no result
    return "";
  }
}

export default new PaginationView();
