"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var uuid_1 = require("uuid"); // npm i --save-dev @types/uuid
// Todas as classes começam com letra maiúscula
var Post = /** @class */ (function () {
    // criando um construtor para "montar" o objeto post
    function Post(userName, avatarUrl, imageUrl, description) {
        this._createdAt = new Date(); // atributo privado
        this._numberOfLikes = 0; // atributo privado
        this._id = (0, uuid_1.v4)();
        // private _saved: boolean;
        // private _coment: string;
        // private _comentQuant: number;
        // private _sendQuant: number;
        this._isLiked = false;
        this._userName = userName; // inicialização da propriedade userName
        this._description = description; // inicialização da propriedade titulo
        this._avatarUrl = avatarUrl;
        this._imageUrl = imageUrl; // inicialização do número de curtidas com 0
        // // não usados pelo pro
        // this._coment = "";
        // this._comentQuant = 0;
        // this._sendQuant = 0;
        // this._saved = false;
    }
    Post.prototype.like = function () {
        this._isLiked = !this._isLiked;
        // incrementa o número de likes
        if (this._isLiked) {
            this._numberOfLikes += 1;
        }
        else {
            // decrementa o número de likes
            this._numberOfLikes -= 1;
        }
    };
    return Post;
}());
var posts = [];
for (var i = 1; i <= 15; i++) {
    var userName = faker_1.faker.person.firstName();
    var avatarURL = faker_1.faker.image.avatar();
    var imageUrl = faker_1.faker.image.urlLoremFlickr();
    var description = faker_1.faker.lorem.word();
    var post = new Post(userName, avatarURL, imageUrl, description);
    posts.push(post);
}
// // like
// posts[0].like();
// console.log(posts[0]);
// // tira like
// posts[0].like();
// console.log(posts[0]);
