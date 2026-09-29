function formatearFecha(fecha) {
    return new Date(fecha).toISOString().slice(0, 10);
}

function parsearFecha(fechaTexto) {
    const partes = fechaTexto.split('-');

    if (partes.length !== 3) {
        return new Date('fecha-invalida');
    }

    const [dia, mes, anio] = partes.map(Number);

    return new Date(anio, mes - 1, dia);
}

module.exports = { formatearFecha };
module.exports = { formatearFecha, parsearFecha };