// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let numItems = document.querySelector(".num-items");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  // Cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];

    limpiarHTML();
  });
}

// Funciones
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // Elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); // Iteramos sobre el carrito y mostrar su HTML
  }
}

// Lee el contenido del HTML al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    // Actualizamos cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // Retorna el objeto actualizado
      } else {
        return curso; // Tetorna los objetos que no están duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso]; // Tb podemos usar .push()
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra o renderiza el carrito de compras en el HTML
function carritoHTML() {
  // Limpiar el HTML
  limpiarHTML();
  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100" />
      </td>
      <td>${titulo}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });

  // Agregar el nº de items en el carrito
  numeroDeItems();
}

// Elimina los cursos del tbody
function limpiarHTML() {
  // Forma lenta
  // contenedorCarrito.innerHTML = "";

  // Forma rápida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
  numeroDeItems();
}

function numeroDeItems() {
  let totalItems = 0;

  articulosCarrito.forEach((curso) => {
    totalItems += curso.cantidad;
  });

  numItems.textContent = totalItems;
}
