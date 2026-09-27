const SeguimientoFisico = require('../models/SeguimientoFisico.js');

class SeguimientoFactory {
    static crear(datosCrudos) {
        const { cliente_plan_id, fecha, peso_kg, grasa_corporal, medidas, foto_ruta, comentarios } = datosCrudos;
        const [anio, mes, dia] = fecha.split('-').map(Number);
        const fechaConvertida = new Date(anio, mes - 1, dia);
        return new SeguimientoFisico(cliente_plan_id, fechaConvertida, peso_kg, grasa_corporal, medidas, foto_ruta, comentarios);
    }
}

module.exports = SeguimientoFactory;