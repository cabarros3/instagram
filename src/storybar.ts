import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid"; // npm i --save-dev @types/uuid

class Story {
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

  createStoryBar() {
    const storyBar = document.createElement("div");
    storyBar.className = "story-bar"; // Adicione uma classe para estilização

    storyBar.innerHTML = `
      <div class="story">
          <div class="storyImage">
          <img
            src="${this._avatarUrl}"
            alt="avatar"
            onerror="this.onerror=null; this.src='https://cdn.pixabay.com/photo/2018/11/13/22/01/instagram-3814080_640.png';" 
          />
          </div>
      </div>
    `;

    // Adiciona a barra de stories ao contêiner da barra inicial

    const barraInicial = document.getElementById("story-barra");
    if (barraInicial) {
      barraInicial.appendChild(storyBar);
    }
  }
}
// Crie a barra de stories quando a página carregar
const stories: Story[] = [];

for (let i = 1; i <= 8; i++) {
  const userNameStory = faker.person.firstName();
  const avatarStory = faker.image.avatar();

  const story = new Story(userNameStory, avatarStory);
  story.createStoryBar();
  stories.push(story);
}
