import View from "./View.js";

class BookMarksView extends View {
  _parentElement = document.querySelector(".bookmarks");

  _generateMarkup(results) {
    return results.map(this._markup).join("");
  }

  _markup(el) {
    return ` 
    <li class="text-muted bookmarks">
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
}

export default new BookMarksView();
