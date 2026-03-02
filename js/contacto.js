(function () {

const form = document.getElementById("form-contacto");
const loader = document.getElementById("loader");
const exito = document.getElementById("mensaje-exito");
const error = document.getElementById("mensaje-error");

form.addEventListener("submit", function () {

// Mostrar loader
loader.style.display = "block";

// Ocultar mensajes previos
exito.style.display = "none";
error.style.display = "none";

});

})();