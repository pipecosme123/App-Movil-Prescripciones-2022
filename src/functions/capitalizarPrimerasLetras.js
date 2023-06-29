export const capitalizarPrimerasLetras = (frase) => {
  const palabras = frase.split(" ");

  for (var i = 0; i < palabras.length; i++) {
    var palabra = palabras[i];
    palabras[i] = palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
  }

  const fraseCapitalizada = palabras.join(" ");

  return fraseCapitalizada;
};
