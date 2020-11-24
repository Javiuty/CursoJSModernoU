// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
  // Cuando el usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // Cuando el documento esté cargado en su totalidad
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];

    console.log(tweets);

    crearHTML();
  });
}

// Funciones
function agregarTweet(e) {
  e.preventDefault();

  // Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;

  // Validacion
  if (tweet === "") {
    mostrarError("No puede ir vacio");

    return; // Evita que se ejecuten más líneas de código
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadir al array de tweets
  tweets = [...tweets, tweetObj];

  // Una vez agregado creamos el HTML
  crearHTML();

  // Reiniciar el form
  formulario.reset();
}

// Mostrar Mensaje Error
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  // Insertarlo en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);

  // Elimina la alerta después de 3s
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // Agregar botón de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.textContent = "X";

      // Añadir la fn de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // Crear el HTML
      const li = document.createElement("li");

      // Añadir el texto
      li.innerText = tweet.tweet;

      // Asignar el btn
      li.appendChild(btnEliminar);

      // Insertarlo en el html
      listaTweets.appendChild(li);
    });
  }

  sincronizarStorage();
}

// Agrega los tweets actuales a localstorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Eliminar tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);

  crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}
