import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid"; // npm i --save-dev @types/uuid

// Todas as classes começam com letra maiúscula

class Post {
  // criando atributos e definindo eles como privados, pois atributos declarados privados não podem ser acessados e modificados
  private _userName: string; // usar o underscore (underline) para nomear atributos privados
  private _description: string; // atributo privado
  private _createdAt: Date = new Date(); // atributo privado
  private _numberOfLikes: number = 0; // atributo privado
  private _id: string = uuidv4();
  private _isLiked: boolean = false;
  private _avatarUrl: string;
  private _imageUrl: string;
  private _hashtag: string;

  // criando um construtor para "montar" o objeto post
  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string,
    hashtag: string
  ) {
    this._userName = userName; // inicialização da propriedade userName
    this._description = description; // inicialização da propriedade titulo
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl; // inicialização do número de curtidas com 0
    this._hashtag = hashtag;
  }

  render() {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";

    // header
    const postHeader = document.createElement("div");
    postHeader.className = "post-header";
    postHeader.innerHTML = `
          <div class="avatar-user">
              <div class="avatar">
                <img
                  src="${this._avatarUrl}"
                  alt=""
                />
              </div>
              <span>${this._userName}</span>
            </div>
            <div id="btn-follow" class="follow-options" onclick="follow()">
              <div class="follow">Follow</div>
              <div>...</div>
            </div>`;

    // imagem
    const postImagem = document.createElement("div");
    postImagem.className = "post-image";
    postImagem.innerHTML = `<img
              src="${this._imageUrl}"
              alt=""
              srcset=""
            />`;

    const postIcons = document.createElement("div");
    postIcons.className = "post-icons";
    postIcons.innerHTML = `<div>
              <div id="btn-like" onclick="like()">
                <i class="fa fa-heart-o"></i>
              </div>

              <div>
                <i class="fa fa-comment-o"></i>
              </div>

              <div>
                <i class="fa fa-send-o"></i>
              </div>
            </div>
            <div id="btn-save" onclick="save()">
              <i class="fa fa-bookmark-o"></i>
            </div>`;

    const postLike = document.createElement("div");
    postLike.className = "post-likes";
    postLike.innerHTML = ` <i class="fa fa-heart"></i>
            <span id="like-count">0</span> likes`;

    const postDescription = document.createElement("div");
    postDescription.className = "post-description";
    postDescription.innerHTML = `<div class="user_name">${this._userName}</div>
            <div class="description">
              ${this._description} <span class="hash-tag">#${this._hashtag}</span>
            </div>`;

    postContainer.append(
      postHeader,
      postImagem,
      postIcons,
      postLike,
      postDescription
    );

    const mainContainer = document.getElementById("container-position");
    if (mainContainer) {
      mainContainer.appendChild(postContainer);
    }

    return postContainer;
  }

  like() {
    // to get the element by id
    const button = document.getElementById("btn-like");
    const icon = button?.children[0];

    let likeCountElement = document.getElementById("like-count");

    // make a condition to verify if icon isn't undefined or null
    if (!icon || !likeCountElement) return;

    // to remove the filled heart and add an empty heart
    if (this._isLiked) {
      icon.classList.remove("fa-heart");
      icon.classList.remove("liked");
      icon.classList.add("fa-heart-o");

      this._numberOfLikes--;
    } else {
      // to add an filled heart and remove the empty heart
      icon.classList.add("fa-heart");
      icon.classList.add("liked");
      icon.classList.remove("fa-heart-o");

      this._numberOfLikes++;
    }

    likeCountElement.innerText = this._numberOfLikes.toString();

    this._isLiked = !this._isLiked;
  }
}

const posts: Post[] = [];

for (let i = 1; i <= 15; i++) {
  const userName = faker.person.firstName();
  const avatarURL = faker.image.avatar();
  const imageUrl = faker.image.urlLoremFlickr();
  const description = faker.lorem.sentences(2);
  const hashtagWord = faker.lorem.word();

  const post = new Post(
    userName,
    avatarURL,
    imageUrl,
    description,
    hashtagWord
  );

  post.render();
  posts.push(post);
}

// console.log(posts);
