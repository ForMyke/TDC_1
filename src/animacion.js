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
export default animacionTexto;
