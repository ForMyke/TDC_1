const formulario = document.getElementById("formulario");
let placaValida; // Declaración de la variable placaValida

const validandoPlaca = () => {
  const expresionRegular = /^[A-Z][1-9]{2}-[A-Z]{3}$/;
  const inputPlaca = formulario.querySelector("#placas");
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
  const inputPlaca = formulario.querySelector("#placas_edomex");
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
  const inputPlaca = formulario.querySelector("#placas_morelos");
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

export { validandoPlaca, validacionPlacaEstado, validacionPlacaMorelos };
