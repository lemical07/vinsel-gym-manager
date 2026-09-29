const Contrato = require('../models/Contrato.js');
const { parsearFecha } = require('../utils/fecha.js');

class ContratoFactory {
  static crear(datosCrudos) {
    const {
        cliente_plan_id, 
        condiciones, 
        duracion_semanas, 
        precio, 
        fecha_inicio,
        fecha_fin, 
        estado
    } = datosCrudos;

    const fechaInicioConvertida = parsearFecha(fecha_inicio);
    const fechaFinConvertida = parsearFecha(fecha_fin);
    
    return new Contrato(
        cliente_plan_id, 
        condiciones, 
        duracion_semanas, 
        precio, 
        fechaInicioConvertida,
        fechaFinConvertida, 
        estado
    );
  }
}

module.exports = ContratoFactory;