import leerAlfabeto from "./leerAlfabeto";

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

export default validarEntrada;
export { compararCadenas };
