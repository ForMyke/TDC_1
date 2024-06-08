'use strict';

const animacionTexto = (elemento) => {
  const texto = elemento.dataset.texto;
  const numeroLetras = texto.length;

  for (let i = 0; i < numeroLetras; i++) {
    setTimeout(() => {
      const letra = document.createElement("span");
      letra.append(elemento.dataset.texto[i]);
      elemento.append(letra);
    }, 100 * i);
  }
};

const formulario$1 = document.getElementById("formulario");
let placaValida; // Declaración de la variable placaValida

const validandoPlaca = () => {
  const expresionRegular = /^[A-Z][1-9]{2}-[A-Z]{3}$/;
  const inputPlaca = formulario$1.querySelector("#placas");
  if (expresionRegular.test(inputPlaca.value)) {
    inputPlaca.classList.remove("validacion-erronea");
    inputPlaca.classList.add("validacion-correcta");
    placaValida = inputPlaca.value;
    return placaValida;
  } else {
    inputPlaca.classList.add("validacion-erronea");
    inputPlaca.classList.remove("validacion-correcta");
    placaValida = null;
    return null;
  }
};

const validacionPlacaEstado = () => {
  const expresionRegular = /^[A-Z]{3}-\d{2}-\d{2}$/;
  const inputPlaca = formulario$1.querySelector("#placas_edomex");
  if (expresionRegular.test(inputPlaca.value)) {
    inputPlaca.classList.remove("validacion-erronea");
    inputPlaca.classList.add("validacion-correcta");
    placaValida = inputPlaca.value;
    return placaValida;
  } else {
    inputPlaca.classList.add("validacion-erronea");
    inputPlaca.classList.remove("validacion-correcta");
    placaValida = null;
    return null;
  }
};

const validacionPlacaMorelos = () => {
  const expresionRegular = /^[A-Z]{3}-\d{3}-\d{1}$/;
  const inputPlaca = formulario$1.querySelector("#placas_morelos");
  if (expresionRegular.test(inputPlaca.value)) {
    inputPlaca.classList.remove("validacion-erronea");
    inputPlaca.classList.add("validacion-correcta");
    placaValida = inputPlaca.value;
    return placaValida;
  } else {
    inputPlaca.classList.add("validacion-erronea");
    inputPlaca.classList.remove("validacion-correcta");
    placaValida = null;
    return null;
  }
};

const leerAlfabeto = () => {
  let alfabeto = [];
  let expRanLetras = /^[a-z]-[a-z]$/i;
  let expRanNum = /^\d-\d+/;

  const inputAlfabetoClass = document.getElementById("ingresar_texto");
  const inputAlfabeto = document
    .getElementById("ingresar_texto")
    .value.toLowerCase(); // Convertir a minúsculas
  const simbolos = inputAlfabeto.split(",");
  let esValido = true;
  simbolos.forEach((simbolo) => {
    simbolo = simbolo.trim();
    if (expRanLetras.test(simbolo)) {
      let [inicio, fin] = simbolo.split("-");
      for (let i = inicio.charCodeAt(0); i <= fin.charCodeAt(0); i++) {
        const char = String.fromCharCode(i);
        if (!alfabeto.includes(char)) {
          alfabeto.push(char);
        } else {
          inputAlfabetoClass.classList.add("validacion-erronea");
          esValido = false;
        }
      }
    } else if (expRanNum.test(simbolo)) {
      let [inicio, fin] = simbolo.split("-");
      for (let i = parseInt(inicio); i <= parseInt(fin); i++) {
        const num = String(i);
        if (!alfabeto.includes(num)) {
          alfabeto.push(num);
        } else {
          inputAlfabetoClass.classList.add("validacion-erronea");
          esValido = false;
        }
      }
    } else if (/^\w$/.test(simbolo)) {
      if (!alfabeto.includes(simbolo)) {
        alfabeto.push(simbolo);
      } else {
        inputAlfabetoClass.classList.add("validacion-erronea");
        esValido = false;
      }
    } else {
      inputAlfabetoClass.classList.add("validacion-erronea");
      esValido = false;
    }
  });
  if (alfabeto.length < 3 || !esValido) {
    inputAlfabetoClass.classList.add("validacion-erronea");
    inputAlfabetoClass.classList.remove("validacion-correcta");
    alfabeto = [];
    return null;
  }
  inputAlfabetoClass.classList.remove("validacion-erronea");
  inputAlfabetoClass.classList.add("validacion-correcta");

  return alfabeto;
};

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

const compararCadenas = (w1, w2) => {
  if (w1 === w2) {
    return `${w1} es prefijo, sufijo y subcadena de ${w2}`;
  } else if (w2.startsWith(w1)) {
    if (w2.endsWith(w1)) {
      return `${w1} es un prefijo propio, sufijo propio y subcadena de ${w2}`;
    } else {
      return `${w1} es un prefijo propio y subcadena de ${w2}`;
    }
  } else if (w2.endsWith(w1)) {
    return `${w1} es un sufijo propio y subcadena de ${w2}`;
  } else if (w2.includes(w1)) {
    return `${w1} es una subcadena de ${w2}`;
  } else if (esSubsecuencia(w1, w2)) {
    return `${w1} es una subsecuencia de ${w2}`;
  } else {
    return `${w1} no es ni prefijo, sufijo, subcadena ni subsecuencia de ${w2}`;
  }
};

const esSubsecuencia = (w1, w2) => {
  let i = 0;
  let j = 0;
  while (i < w1.length && j < w2.length) {
    if (w1[i] === w2[j]) {
      i++;
    }
    j++;
  }
  return i === w1.length;
};

const validarEntrada = () => {
  const alfabeto = leerAlfabeto();
  const inputCadena1 = document.getElementById("cadena_1");
  const inputCadena2 = document.getElementById("cadena_2");

  inputCadena1.addEventListener("input", () => {
    const valor = inputCadena1.value.toLowerCase();
    if (valor.split("").every((char) => alfabeto.includes(char))) {
      inputCadena1.classList.remove("validacion-erronea");
      inputCadena1.classList.add("validacion-correcta");
      console.log("La cadena 1 es válida.");
      return compararCadenas(valor, inputCadena2.value.toLowerCase());
    } else {
      inputCadena1.classList.add("validacion-erronea");
      inputCadena1.classList.remove("validacion-correcta");
      return "La cadena 1 es inválida. Por favor, asegúrese de ingresar solo caracteres del alfabeto.";
    }
  });

  inputCadena2.addEventListener("input", () => {
    const valor = inputCadena2.value.toLowerCase();
    if (valor.split("").every((char) => alfabeto.includes(char))) {
      inputCadena2.classList.remove("validacion-erronea");
      inputCadena2.classList.add("validacion-correcta");
      console.log("La cadena 2 es válida.");
      return compararCadenas(inputCadena1.value.toLowerCase(), valor);
    } else {
      inputCadena2.classList.add("validacion-erronea");
      inputCadena2.classList.remove("validacion-correcta");
      return "La cadena 2 es inválida. Por favor, asegúrese de ingresar solo caracteres del alfabeto.";
    }
  });
};

const generarCadenasAleatorias = () => {
  const cadena1 = leerAlfabeto();
  const cadena2 = leerAlfabeto();
  const numeroPalabras = parseInt(
    document.getElementById("numero_palabras").value
  );
  const longitudPalabras = parseInt(
    document.getElementById("longitud_palabras").value
  );

  // Expresión regular para validar que el valor ingresado sea un número
  const expRegNumero = /^\d+$/;

  // Validar número de palabras
  if (!expRegNumero.test(numeroPalabras)) {
    document
      .getElementById("numero_palabras")
      .classList.remove("validacion-correcta");
    document
      .getElementById("numero_palabras")
      .classList.add("validacion-erronea");
    return null;
  } else {
    document
      .getElementById("numero_palabras")
      .classList.remove("validacion-erronea");
    document
      .getElementById("numero_palabras")
      .classList.add("validacion-correcta");
  }

  // Validar longitud de palabras
  if (!expRegNumero.test(longitudPalabras)) {
    document
      .getElementById("longitud_palabras")
      .classList.remove("validacion-correcta");
    document
      .getElementById("longitud_palabras")
      .classList.add("validacion-erronea");
    return null;
  } else {
    document
      .getElementById("longitud_palabras")
      .classList.remove("validacion-erronea");
    document
      .getElementById("longitud_palabras")
      .classList.add("validacion-correcta");
  }

  const alfabeto = new Set([...cadena1, ...cadena2]); // Usamos un conjunto para garantizar elementos únicos

  const generarPalabraAleatoria = (longitud, palabrasExistentes) => {
    let palabra;
    do {
      palabra = "";
      for (let i = 0; i < longitud; i++) {
        palabra +=
          Array.from(alfabeto)[Math.floor(Math.random() * alfabeto.size)];
      }
    } while (palabrasExistentes.has(palabra)); // Verificamos si la palabra ya existe
    return palabra;
  };

  const generarCadenaAleatoria = (numeroPalabras, longitudPalabras) => {
    const resultado = new Set(); // Usamos un conjunto para garantizar elementos únicos
    while (resultado.size < numeroPalabras) {
      resultado.add(generarPalabraAleatoria(longitudPalabras, resultado));
    }
    return Array.from(resultado);
  };

  const lenguaje1 = generarCadenaAleatoria(numeroPalabras, longitudPalabras);
  const lenguaje2 = generarCadenaAleatoria(numeroPalabras, longitudPalabras);

  // Calcular diferencia entre L1 y L2
  const diferencia = [...lenguaje1].filter(
    (palabra) => !lenguaje2.includes(palabra)
  );

  return { lenguaje1, lenguaje2, diferencia }; // Devuelve un objeto con los arrays y la diferencia
};

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

//Boton para imprirmi la placa
document.getElementById("resultado_potencia");
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

//Funcion para las placas
window.addEventListener("load", () => {
  animacionTexto(document.querySelector(".hero__titulo--uno"));
});
