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

    // comentários
    const postComments = document.createElement("div");
    postComments.className = "post-comments";
    postComments.innerHTML = `
              <div class="comments-list" id="comments-list-${this._id}"></div>
                <div class="comment-input">
                  <textarea id="comment-input-${this._id}" placeholder="Add a comment..." rows="3"></textarea>
                  <div class="post-comment hidden" id="comment-submit-${this._id}">Post</div>
                </div>
            `;

    postContainer.append(
      postHeader,
      postImagem,
      postIcons,
      postLike,
      postDescription,
      postComments
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

    // comentários
    const commentInput = document.getElementById(
      `comment-input-${this._id}`
    ) as HTMLTextAreaElement;
    const commentButton = document.getElementById(`comment-submit-${this._id}`);

    if (commentInput && commentButton) {
      // Adicione um evento de input para o textarea
      commentInput.addEventListener("input", () => {
        // Verifique o valor do textarea
        if (commentInput.value.trim() === "") {
          // Esconda o botão se o textarea estiver vazio
          commentButton.classList.add("hidden");
        } else {
          // Mostre o botão se o textarea contiver algum texto
          commentButton.classList.remove("hidden");
        }
      });

      // Adicione o evento de clique no botão de postagem
      commentButton.addEventListener("click", () => this.addComment());
    }

    return postContainer;
  }

  // método like para os posts
  like() {
    const button = document.getElementById(`btn-like-${this._id}`);
    const icon = button?.querySelector("i");
    let likeCountElement = document.getElementById(`like-count-${this._id}`);
    if (!icon || !likeCountElement) return;
  
  icon.classList.toggle("fa-heart");
  icon.classList.toggle("liked");
  icon.classList.toggle("fa-heart-o");

  this._numberOfLikes += this._isLiked ? -1 : 1;
  likeCountElement.innerText = this._numberOfLikes.toString();
  this._isLiked = !this._isLiked;

  icon.classList.add("pulse");
  setTimeout(() => {
    icon.classList.remove("pulse");
  }, 600);
}


  addComment() {
    const commentInput = document.getElementById(
      `comment-input-${this._id}`
    ) as HTMLTextAreaElement;
    const commentsList = document.getElementById(`comments-list-${this._id}`);
    if (!commentInput || !commentsList) return;

    const commentText = commentInput.value.trim();
    if (commentText) {
      // Cria um novo elemento de comentário
      const commentElement = document.createElement("div");
      commentElement.className = "comment";
      commentElement.innerText = commentText;

      // Adiciona o comentário à lista de comentários
      commentsList.appendChild(commentElement);

      // Limpa o campo de entrada de comentário
      commentInput.value = "";
    }
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
