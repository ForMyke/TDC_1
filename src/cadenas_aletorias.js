import leerAlfabeto from "./leerAlfabeto";

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

export default generarCadenasAleatorias;
