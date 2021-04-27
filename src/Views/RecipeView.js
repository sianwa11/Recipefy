class RecipeView {
  _data;
  _parentElement = document.querySelector(".recipe");

  renderRecipe(data) {
    if (!data) return;

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
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

  _generateMarkup() {
    return `
        <p class="mb-0">
            <h1 class="text-muted font-w600">${this._data.title}</h1>
            <span class="text-muted font-w400">by ${this._data.publisher}</span>
            <em class="text-muted">&bull;</em>

            <a class="font-w600" href="${
              this._data.source_url
            }" target="_blank">website</a>
            <em class="text-muted">&bull; ${
              this._data.cooking_time
            } minutes to prepare</em>
        </p>

        <img
            style="border-radius: 8px; display: block;
            margin-left: auto; margin-right: auto;
            height: 22rem; width: 100%;"
            src="${this._data.image_url}"
            alt="${this._data.title}"/>
            
        <h4 class="text-muted font-w600 mt-5"> ${
          this._data.servings
        } servings</h4>

        <div>
            <h2 class="text-muted mt-5"> Recipe Ingredients</h2>
            <ul>
                ${this._data.ingredients
                  .map((el) => {
                    return `
                    <li>
                        <span>${!el.quantity ? "" : el.quantity}</span>
                        <span>${el.unit}</span>
                        <span>${el.description}</span>
                    </li>
                    `;
                  })
                  .join("")}
            </ul>
        </div>

        
    `;
  }
}

export default new RecipeView();
