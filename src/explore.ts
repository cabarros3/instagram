import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid"; // npm i --save-dev @types/uuid

class Explore {
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
  renderExplore() {
    const explore = document.createElement("div");
    explore.className = "image-blocks";
    explore.innerHTML = `<img src="${this._imageUrl}" alt="">
    <div id="btn-like-${this._id}" class="image-overlay">
      <i class="fa fa-heart-o fa-2x"></i>
    </div>
     `;

    const findExplore = document.getElementById("container-principal");
    if (findExplore) {
      findExplore.appendChild(explore);
    } else {
      console.error("Element with ID 'container-principal' not found.");
    }

    const likeButton = document.querySelector(`#btn-like-${this._id}`);
    if (likeButton) {
      likeButton.addEventListener("click", () => this.like());
    }

    return explore;
  }

  like() {
    const button = document.getElementById(`btn-like-${this._id}`);
    const icon = button?.querySelector("i");

    if (!icon) return;

    icon.classList.toggle("fa-heart");
    icon.classList.toggle("liked");
    icon.classList.toggle("fa-heart-o");

    this._isLiked = !this._isLiked;

    icon.classList.add("pulse");
    setTimeout(() => {
      icon.classList.remove("pulse");
    }, 600);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const explores: Explore[] = [];

  for (let i = 1; i <= 24; i++) {
    const imageUrl = faker.image.urlLoremFlickr();

    const explore = new Explore(
      "", // Nome de usuário vazio
      "", // URL do avatar vazio
      imageUrl, // URL da imagem
      "", // Descrição vazia
      "" // Hashtag vazia
    );
    explores.push(explore);

    explore.renderExplore();
  }
});
