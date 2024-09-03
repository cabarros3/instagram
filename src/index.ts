// like

let isLiked = false;

function like() {
  // to get the element by id
  const button = document.getElementById("btn-like");
  const icon = button?.children[0];
  //   console.log(icon);

  // make a condition to verify if icon isn't undefined or null
  if (!icon) return;

  // to remove the filled heart and add an empty heart
  if (isLiked) {
    icon.classList.remove("fa-heart");
    icon.classList.remove("liked");
    icon.classList.add("fa-heart-o");
  } else {
    // to add an filled heart and remove the empty heart
    icon.classList.add("fa-heart");
    icon.classList.add("liked");
    icon.classList.remove("fa-heart-o");
  }

  isLiked = !isLiked;
}

// bookmark

let isSaved = false;

function save() {
  const button = document.getElementById("btn-save");
  // console.log("botão: ", button);
  const icon = button?.children[0];
  // console.log("filho: ", icon);

  if (!icon) return;

  if (isSaved) {
    console.log("entrou no if");
    icon.classList.remove("fa-bookmark");
    icon.classList.remove("saved");
    icon.classList.add("fa-bookmark-o");
  } else {
    console.log("entrou no else");
    icon.classList.add("fa-bookmark");
    icon.classList.add("saved");
    icon.classList.remove("fa-bookmark-o");
  }

  isSaved = !isSaved;
}
