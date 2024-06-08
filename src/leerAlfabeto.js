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

export default leerAlfabeto;
