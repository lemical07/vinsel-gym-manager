const PlanEntrenamiento = require('../models/PlanEntrenamiento.js');

class PlanEntrenamientoFactory {
  static crear(datosCrudos) {
    const {
        nombre, 
        duracion_semanas, 
        meta_fisica, 
        nivel, 
        precio_base, 
        estado
    } = datosCrudos;

    const duracionSemanasConvertida = Number(duracion_semanas);
    const precioBaseConvertida = Number(precio_base);
    
    return new PlanEntrenamiento(
        nombre, 
        duracionSemanasConvertida, 
        meta_fisica, nivel, 
        precioBaseConvertida, 
        estado,
    );
  }
}

module.exports = PlanEntrenamientoFactory;