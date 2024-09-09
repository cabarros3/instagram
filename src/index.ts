import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid"; // npm i --save-dev @types/uuid

// para criar posts e renderizar os posts
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
  private _isFollowed: boolean = false;
  private _isSaved: boolean = false;

  // criando um construtor para "montar" o objeto post
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

  // para renderizar os posts
  render() {
    //criando onde iremos criar outros elementos os elementos
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";

    //

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
            <div id="btn-follow-${this._id}" class="follow-options">
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

    // icones
    const postIcons = document.createElement("div");
    postIcons.className = "post-icons";
    postIcons.innerHTML = `<div>
              <div id="btn-like-${this._id}">
                <i class="heart fa fa-heart-o"></i>
              </div>

              <div>
                <i class="fa fa-comment-o"></i>
              </div>

              <div>
                <i class="fa fa-send-o"></i>
              </div>
            </div>
            <div id="btn-save-${this._id}">
              <i class="fa fa-bookmark-o"></i>
            </div>`;

    // like
    const postLike = document.createElement("div");
    postLike.className = "post-likes";
    postLike.innerHTML = ` <i class="fa fa-heart"></i>
            <span id="like-count-${this._id}">0</span> likes`;

    // descrição
    const postDescription = document.createElement("div");
    postDescription.className = "post-description";
    postDescription.innerHTML = `<div class="user_name">${this._userName}</div>
            <div class="description">
              ${this._description} <span class="hash-tag">#${this._hashtag}</span>
            </div>`;

    // sugestões

    postContainer.append(
      postHeader,
      postImagem,
      postIcons,
      postLike,
      postDescription
    );

    // adicionando o postcontainer na tag main que está com flexbox (fica centralizado)

    const mainContainer = document.getElementById("container-position");
    if (mainContainer) {
      mainContainer.appendChild(postContainer);
    }

    // criando os escutadores de evento que substituem on "onclick"

    const likeButton = document.querySelector(`#btn-like-${this._id}`);
    if (likeButton) {
      likeButton.addEventListener("click", () => this.like());
    }

    const saveButton = document.querySelector(`#btn-save-${this._id}`);
    if (saveButton) {
      saveButton.addEventListener("click", () => this.save());
    }

    const followButton = document.querySelector(`#btn-follow-${this._id}`);
    if (followButton) {
      followButton.addEventListener("click", () => this.follow());
    }

    return postContainer;
  }

  // método like para os posts
  like() {
    // to get the element by id
    const button = document.getElementById(`btn-like-${this._id}`);
    const icon = button?.querySelector("i");

    let likeCountElement = document.getElementById(`like-count-${this._id}`);

    // make a condition to verify if icon isn't undefined or null
    if (!icon || !likeCountElement) return;

    // to remove the filled heart and add an empty heart
    if (this._isLiked) {
      icon.classList.remove("fa-heart");
      icon.classList.remove("liked");
      icon.classList.add("fa-heart-o");

      this._numberOfLikes--;
    } else {
      // to add a filled heart and remove the empty heart
      icon.classList.add("fa-heart");
      icon.classList.add("liked");
      icon.classList.remove("fa-heart-o");
      icon.classList.add("pulse");

      this._numberOfLikes++;

      setTimeout(() => {
        icon.classList.remove("pulse");
      }, 600);
    }

    likeCountElement.innerText = this._numberOfLikes.toString();

    this._isLiked = !this._isLiked;
  }

  // método save para os posts
  save() {
    const button = document.getElementById(`btn-save-${this._id}`);
    const icon = button?.querySelector("i");

    if (!icon) return;

    if (this._isSaved) {
      icon.classList.remove("fa-bookmark");
      icon.classList.remove("saved");
      icon.classList.add("fa-bookmark-o");
    } else {
      icon.classList.add("fa-bookmark");
      icon.classList.add("saved");
      icon.classList.remove("fa-bookmark-o");
    }

    this._isSaved = !this._isSaved;
  }

  // método follow para os posts
  follow() {
    const button = document.querySelector(`#btn-follow-${this._id}`);
    const icon = button?.querySelector("div");

    if (!icon) return;

    if (this._isFollowed) {
      icon.classList.remove("followed-style");
      icon.innerHTML = "Follow";
    } else {
      icon.classList.add("followed-style");
      icon.innerHTML = "Following";
    }

    this._isFollowed = !this._isFollowed;
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
