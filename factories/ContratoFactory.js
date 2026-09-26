const Contrato = require('../models/Contrato.js');

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

    const fechaInicioConvertida = new Date(fecha_inicio);
    const fechaFinConvertida = new Date(fecha_fin);
    
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