const SeguimientoFisico = require('../models/SeguimientoFisico.js');
const { parsearFecha } = require('../utils/fecha.js');

class SeguimientoFactory {
    static crear(datosCrudos) {
        const { 
            cliente_plan_id, 
            fecha, 
            peso_kg, 
            grasa_corporal, 
            medidas, foto_ruta, 
            comentarios 
        } = datosCrudos;
        
        const fechaConvertida = parsearFecha(fecha);

        return new SeguimientoFisico(
            cliente_plan_id, 
            fechaConvertida, 
            peso_kg, 
            grasa_corporal, 
            medidas, foto_ruta, 
            comentarios);
    }
}

module.exports = SeguimientoFactory;