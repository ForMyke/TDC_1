import animacionTexto from "./animacion";
import "./formulario";
import "./botones";
//Funcion para las placas
window.addEventListener("load", () => {
  animacionTexto(document.querySelector(".hero__titulo--uno"));
});
