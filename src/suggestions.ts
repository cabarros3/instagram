import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid"; // npm i --save-dev @types/uuid

class Suggestion {
  private _userName: string; // usar o underscore (underline) para nomear atributos privados
  private _description: string; // atributo privado
  private _createdAt: Date = new Date(); // atributo privado
  private _numberOfLikes: number = 0; // atributo privado
  private _id: string = uuidv4();
  private _isLiked: boolean = false;
  private _avatarUrl: string;
  private _imageUrl: string;
  private _hashtag: string;
  private _isFollowed: boolean = false;
  private _isSaved: boolean = false;

  constructor(
    userName: string,
    avatarUrl: string = "",
    imageUrl: string = "",
    description: string = "",
    hashtag: string = ""
  ) {
    this._userName = userName; // inicialização da propriedade userName
    this._description = description; // inicialização da propriedade titulo
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl; // inicialização do número de curtidas com 0
    this._hashtag = hashtag;
  }

  // para renderizar o explorar
  renderSuggestions() {
    const suggestions = document.createElement("div");
    suggestions.className = "user-sugestions";
    suggestions.innerHTML = `<div class="avatar-user">
              <div class="avatar">
                <img
                  src="${this._imageUrl}"
                  alt=""
                />
              </div>
              <div>${this._userName}</div>
            </div>
            <div id="btnfollow-${this._id}" class="follow">Follow</div>`;

    const userSuggestions = document.getElementById("suggestions-top");
    if (userSuggestions) {
      userSuggestions.appendChild(suggestions);
    }

    // btn follow para as sugestões
    const followBtn = document.querySelector(`#btnfollow-${this._id}`);
    if (followBtn) {
      followBtn.addEventListener("click", () => this.followSuggestion());
    }

    return suggestions;
  }

  // método follow para as sugestões
  followSuggestion() {
    const button = document.querySelector(`#btnfollow-${this._id}`);

    if (!button) return;

    if (this._isFollowed) {
      button.classList.remove("followed-style");
      button.innerHTML = "Follow";
    } else {
      button.classList.add("followed-style");
      button.innerHTML = "Following";
    }

    this._isFollowed = !this._isFollowed;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const suggestions: Suggestion[] = [];

  for (let i = 1; i <= 5; i++) {
    const userName = faker.person.firstName();
    const imageUrl = faker.image.urlLoremFlickr();

    const suggest = new Suggestion(userName, imageUrl);
    suggestions.push(suggest);

    suggest.renderSuggestions();
  }
});
