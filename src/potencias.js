import leerAlfabeto from "./leerAlfabeto";

// Definición de la función 'calcularPotencia()' para calcular la potencia de un alfabeto.
const validarPotencia = () => {
  // Obtener el valor de la potencia desde el input HTML
  const potenciaInput = document.getElementById("potencia").value;
  const inputPotencia = document.getElementById("potencia");

  const potencia = parseInt(potenciaInput);

  // Verificar si el valor de la potencia ingresado es válido (entre -5 y 5, ambos inclusive).
  if (isNaN(potencia) || potencia < -5 || potencia > 5) {
    // Mostrar un mensaje de alerta si el valor de la potencia no es válido y salir de la función.
    console.error(
      "Por favor, ingrese un valor válido para la potencia (rango: -5 a 5)."
    );
    // Agregar clase CSS para indicar validación errónea
    inputPotencia.classList.add("validacion-erronea");
    inputPotencia.classList.remove("validacion-correcta");
    return null;
  }

  // Agregar clase CSS para indicar validación correcta
  inputPotencia.classList.remove("validacion-erronea");
  inputPotencia.classList.add("validacion-correcta");

  // Inicializar un array para almacenar el resultado de la potencia.
  let resultadoPotencia = [];

  // Calcular y construir la representación del resultado de la potencia del alfabeto.
  if (potencia === 0) {
    // Caso especial para potencia 0 (λ representa la cadena vacía).
    resultadoPotencia.push("∑<sup>" + potencia + "</sup> = {λ}");
  } else {
    // Caso general para potencias diferentes de 0.
    const alfabeto = leerAlfabeto(); // Obtener el alfabeto importado
    const longitud = Math.abs(potencia); // Calcular la longitud de las palabras en la potencia.
    for (let i = 0; i < Math.pow(alfabeto.length, longitud); i++) {
      // Generar todas las palabras posibles de la longitud especificada y agregarlas al resultado.
      if (potencia < 0) {
        resultadoPotencia.push(PalabraPotenciaNeg(i, longitud));
      } else {
        resultadoPotencia.push(PalabraPotencia(i, longitud));
      }
    }
  }

  return resultadoPotencia;
};

// Esta función genera una palabra de longitud 'longitud' a partir del 'indice' proporcionado, utilizando el array 'alfabeto'.
// Utiliza recursión para construir la palabra letra por letra, seleccionando letras del alfabeto según el resto del índice y el nuevo índice.
const PalabraPotencia = (indice, longitud) => {
  const alfabeto = leerAlfabeto(); // Obtener el alfabeto importado
  let palabra = "";
  // Caso base: cuando la longitud es 0, la palabra generada es una cadena vacía.
  if (longitud === 0) {
    return palabra;
  } else {
    // Se calcula el resto de dividir el índice por la longitud del array 'alfabeto'.
    const resto = indice % alfabeto.length;
    // Se obtiene la letra correspondiente al resto del array 'alfabeto'.
    const letra = alfabeto[resto];
    // Se calcula el nuevo índice dividiendo el índice entre la longitud del array 'alfabeto' y redondeándolo hacia abajo.
    const nuevoIndice = Math.floor(indice / alfabeto.length);
    // Se llama recursivamente a la función 'PalabraPotencia' con el nuevo índice y una longitud reducida en 1,
    // y se concatena la letra obtenida en cada iteración.
    palabra += letra;
    return palabra + PalabraPotencia(nuevoIndice, longitud - 1);
  }
};

const PalabraPotenciaNeg = (indice, longitud) => {
  const alfabeto = leerAlfabeto(); // Obtener el alfabeto importado
  let palabra = "";
  // Caso base: cuando la longitud es 0, la palabra generada es una cadena vacía.
  if (longitud === 0) {
    return palabra;
  } else {
    // Se calcula el resto de dividir el índice por la longitud del array 'alfabeto'.
    const resto = indice % alfabeto.length;
    // Se obtiene la letra correspondiente al resto del array 'alfabeto', pero en orden inverso.
    const letra = alfabeto[alfabeto.length - 1 - resto];
    // Se calcula el nuevo índice dividiendo el índice entre la longitud del array 'alfabeto' y redondeándolo hacia abajo.
    const nuevoIndice = Math.floor(indice / alfabeto.length);
    // Se llama recursivamente a la función 'PalabraPotenciaNeg' con el nuevo índice y una longitud reducida en 1,
    // y se concatena la letra obtenida en cada iteración.
    palabra += letra;
    return palabra + PalabraPotenciaNeg(nuevoIndice, longitud - 1);
  }
};
export default validarPotencia;
