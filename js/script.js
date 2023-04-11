/*=============== NAV MENU ===============*/

const navToggle = document.querySelector(".nav_toggle"),
  navMenu = document.querySelector(".nav_menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show-menu");
  navToggle.classList.toggle("active");
});

/*=============== DARK LIGHT THEME ===============*/

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-sun" : "bx bx-moon";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== POST ===============*/
var firebaseConfig = {
  apiKey: "AIzaSyAI3tTxhNAXT5AAfLEdJOGAKbNR455U3Wo",
  authDomain: "setor-geek-blog.firebaseapp.com",
  databaseURL: "https://setor-geek-blog-default-rtdb.firebaseio.com",
  projectId: "setor-geek-blog",
  storageBucket: "setor-geek-blog.appspot.com",
  messagingSenderId: "977179668338",
  appId: "1:977179668338:web:9f0b11e90cb063976077eb",
  measurementId: "G-PBRFJMX4BP"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

document.getElementById("form-post").addEventListener("submit", function(event) {
  event.preventDefault();
  criarPostagem();
});

// Defining the Portage class
class Postagem {
  constructor(title, content, author) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.dataCriacao = new Date();
  }

  exibirPostagem() {
  let html = `<div class="postagem">
                <h2>${this.title}</h2>
                <p>${this.content}</p>
                <div class="informacoes">
                  <span>Em ${this.dataCriacao.toLocaleDateString()}</span>
                </div>
              </div>
              <div class="informacoes author">
                <span>Por ${this.author}</span>
              </div>`;
  return html;
} 
  
}

// Creating the object to store the posts
let blog = {
  postagens: [],

  // Function to add a new post
  adicionarPostagem: function (postagem) {
    this.postagens.push(postagem);
  },

  // Function to list all posts
  listarPostagens: function () {
    let postagensDiv = document.getElementById("postagens");
    postagensDiv.innerHTML = "";
    this.postagens.forEach((postagem) => {
      let postagemHtml = postagem.exibirPostagem();
      postagensDiv.innerHTML += postagemHtml;
    });
  },
};

// Function to create a new post from form in HTML page
function criarPostagem() {
  let title = document.getElementById('title').value;
  let content = document.getElementById('content').value;
  let author = document.getElementById('author').value;
  let dataCriacao = new Date().toISOString();

  let postagem = {
    title: title,
    content: content,
    author: author,
    dataCriacao: dataCriacao
  }

  // Saving the post to the database
  database.ref('postagens').push(postagem);

  location.reload();
}

function listarPostagens() {
  // Clearing the posts displayed on the screen
  let postagensDiv = document.getElementById('postagens');
  postagensDiv.innerHTML = '';

  // Fetching saved posts in Firebase
  database.ref('postagens').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      let postagem = new Postagem(childSnapshot.val().title, childSnapshot.val().content, childSnapshot.val().author);
      postagem.dataCriacao = childSnapshot.val().dataCriacao; // set the date created from database
      let postagemDiv = document.createElement('div');
      postagemDiv.classList.add('postagem');

      let titleDiv = document.createElement('h2');
      titleDiv.innerHTML = postagem.title;
      postagemDiv.appendChild(titleDiv);

      let contentDiv = document.createElement('p');
      contentDiv.innerHTML = postagem.content;
      postagemDiv.appendChild(contentDiv);

      postagensDiv.appendChild(postagemDiv);

      let authorDiv = document.createElement('div');
      authorDiv.classList.add('author-p');
      authorDiv.innerHTML = '<span class="por">Por</span> <u>' + postagem.author + '</u>&nbsp;<span class="em">em</span> ' + new Date(postagem.dataCriacao).toLocaleDateString();
      postagemDiv.appendChild(authorDiv);


    });
  });
}

// Calling the function to list posts on page load
window.onload = function() {
  listarPostagens();
}

function validateTitle() {
  let titleInput = document.getElementById("title");
  let errorTitle = document.getElementById("error-title");

  if (titleInput.value.length > 84) {
    errorTitle.style.display = "block";
  } else {
    errorTitle.style.display = "none";
  }
}

/*=============== SEARCH ===============*/
const searchBox = document.querySelector('.search');
const searchIcon = document.querySelector('.icon');
let timer;

searchIcon.addEventListener('mouseenter', () => {
  clearTimeout(timer); // Clears the previous timer to prevent the search box from closing immediately
  searchBox.classList.add('active');
});

searchBox.addEventListener('mouseleave', () => {
  timer = setTimeout(() => { // Sets a new timer to close the search box after 2 seconds
    searchBox.classList.remove('active');
  }, 2000);
});

/*=============== sendgrid/mail ===============*/