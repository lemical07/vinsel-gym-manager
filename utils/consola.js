function crearHipervinculo(texto, url) {
    return `\u001B]8;;${url}\u0007${texto}\u001B]8;;\u0007`;
}

module.exports = { crearHipervinculo };