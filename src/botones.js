import {
  validandoPlaca,
  validacionPlacaEstado,
  validacionPlacaMorelos,
} from "./validacionPlacas.js";
import leerAlfabeto from "./leerAlfabeto.js";
import validarPotencia from "./potencias.js";
import { compararCadenas } from "./cadenas.js";
import generarCadenasAleatorias from "./cadenas_aletorias.js"; // Importa la función de generación de cadenas aleatorias

//Boton para imprirmi la placa
const resultadoPotencia = document.getElementById("resultado_potencia");
const resultadoPlaca = document.getElementById("resultado_placa");
const resultadoPlacaEdoMex = document.getElementById("resultado_placaEdomex");
const resultadoPlacaMorelos = document.getElementById("resultado_placaMorelos");
const resultadoAlfabeto = document.getElementById("resultado_alfabeto");
const resultadoCadenas = document.getElementById("resultado_cadenas");
const resultadoCadena1 = document.getElementById("resultado_1");
const resultadoCadena2 = document.getElementById("resultado_2");
const resultadoDiferencia = document.getElementById("resultado_DIF");

//Botones para poder hacer las validaciones
const BtnAlfabeto = document.getElementById("verificar_alfabeto");
const BtnCadenas = document.getElementById("imprimir_cadenas");
const BtnNumero = document.getElementById("imprimir_lenguajes");
const BtnPotencia = document.getElementById("imprimir_potencia");
const BtnPlacas = document.getElementById("verificar_placa");
const BtnPlacasEdo = document.getElementById("verificar_placaEdomex");
const BtnPlacasMor = document.getElementById("verificar_placaMorelos");

//listener para los eventos del alfabetos
BtnAlfabeto.addEventListener("click", (evento) => {
  evento.preventDefault();
  const alfabeto = leerAlfabeto();
  //Llamamos al alfabeto
  if (alfabeto !== null) {
    resultadoAlfabeto.textContent = "El alfabeto es: " + alfabeto;
  } else {
  }
});
//Eventos para poder meter las funciones
BtnCadenas.addEventListener("click", (evento) => {
  evento.preventDefault();
  const cadena1 = document.getElementById("cadena_1").value; // Obtiene el valor del primer input
  const cadena2 = document.getElementById("cadena_2").value; // Obtiene el valor del segundo input

  const resultado = compararCadenas(cadena1, cadena2); // Llama a la función compararCadenas con las cadenas proporcionadas

  if (resultado !== null) {
    // Verifica si el resultado no es null antes de actualizar el contenido del elemento HTML
    resultadoCadenas.textContent = resultado; // Actualiza el contenido del elemento HTML con el resultado de la comparación
  } else {
    // Maneja el caso si el resultado es null
  }
});

BtnNumero.addEventListener("click", (evento) => {
  evento.preventDefault();
  //Traemos los numeros
  const resultados = generarCadenasAleatorias();

  const cadenas = compararCadenas("La cadena 1 ", "La cadena 2");
  if (cadenas !== null) {
    const { lenguaje1, lenguaje2, diferencia } = resultados;
    resultadoCadena1.textContent = "El Lenguaje 1 es: " + lenguaje1;
    resultadoCadena2.textContent = "El Lenguaje 2 es: " + lenguaje2;
    resultadoDiferencia.textContent = "La diferencia es: " + diferencia;
  } else {
  }
});
//Boton para las potencias
BtnPotencia.addEventListener("click", (evento) => {
  // Cuando se haga clic en el botón...
  console.log("uno");
  // Calcular la potencia
  const resultado = validarPotencia();
  // Verificar si el resultado no es nulo
  if (resultado !== null) {
    // Si el resultado no es nulo, actualizar el contenido del elemento HTML con el resultado
    console.log(resultado);
  }
});
//Placas para Ciudad de Mexico
BtnPlacas.addEventListener("click", (evento) => {
  const placas = validandoPlaca();
  if (placas !== null) {
    resultadoPlaca.textContent =
      "La placa " +
      placas +
      " es valida ya que el formato para estas placas es A00-AAA";
  }
});

//Placas para Edomex
BtnPlacasEdo.addEventListener("click", (evento) => {
  const placas = validacionPlacaEstado();
  if (placas !== null) {
    resultadoPlacaEdoMex.textContent =
      "La placa " +
      placas +
      " es valida ya que el formato para estas placas es de AAA-00-00";
  }
});

//Placas para Morelos
BtnPlacasMor.addEventListener("click", (evento) => {
  const placas = validacionPlacaMorelos();
  if (placas !== null) {
    resultadoPlacaMorelos.textContent =
      "La placa " +
      placas +
      " es valida ya que el formato para estas placas es de AAA-000-0";
  }
});
