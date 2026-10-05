function fecha(fecha) {
    if (!fecha) return null;
    return fecha instanceof Date ? fecha.toISOString().slice(0, 10) : String(fecha).slice(0, 10);
}


