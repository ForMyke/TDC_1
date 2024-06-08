import {
  validandoPlaca,
  validacionPlacaEstado,
  validacionPlacaMorelos,
} from "./validacionPlacas.js";

import leerAlfabeto from "./leerAlfabeto.js";
import validarPotencia from "./potencias.js";
import validarEntrada from "./cadenas.js";
import generarCadenasAleatorias from "./cadenas_aletorias.js"; // Importa la función de generación de cadenas aleatorias

const formulario = document.getElementById("formulario");

// Que escuche cuando el formulario está haciendo la validación
formulario.addEventListener("keyup", (evento) => {
  evento.preventDefault();
  // llamar a la validación
  if (evento.target.tagName === "INPUT") {
    // Validación de las placas
    if (evento.target.id === "placas") {
      validandoPlaca();
    } else if (evento.target.id === "ingresar_texto") {
      leerAlfabeto();
    } else if (evento.target.id === "potencia") {
      validarPotencia();
    } else if (
      evento.target.id === "cadena_1" ||
      evento.target.id === "cadena_2"
    ) {
      validarEntrada();
    } else if (
      evento.target.id === "numero_palabras" ||
      evento.target.id === "longitud_palabras"
    ) {
      generarCadenasAleatorias(); // Llamar a la función de generación de cadenas aleatorias
    } else if (evento.target.id === "placas_edomex") {
      validacionPlacaEstado();
    } else if (evento.target.id === "placas_morelos") {
      validacionPlacaMorelos();
    }
  }
});
