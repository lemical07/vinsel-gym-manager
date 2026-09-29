const PlanNutricion = require('../models/PlanNutricion.js');
const AlimentoRegistro = require('../models/AlimentoRegistro.js');
const { parsearFecha } = require('../utils/fecha.js');

class NutricionFactory {
    static crearPlan(datosCrudos) {
        const { 
            cliente_plan_id, 
            nombre, 
            meta_calorica, 
            fecha_inicio, 
            fecha_fin 
        } = datosCrudos;
        const fechaInicioConvertida = parsearFecha(fecha_inicio);
        const fechaFinConvertida = parsearFecha(fecha_fin);

        return new PlanNutricion(
            cliente_plan_id,
            nombre,
            meta_calorica,
            fechaInicioConvertida(fecha_inicio),
            fecha_fin ? fechaFinConvertida(fecha_fin) : null
        );
    }

    static crearAlimento(datosCrudos) {
        const { 
            plan_nutricion_id, 
            fecha, 
            nombre_alimento, 
            calorias,
            peso_kg
        } = datosCrudos;

        const pesoKgConvertido = Number(peso_kg);

        return new AlimentoRegistro(
            plan_nutricion_id, 
            convertirFecha(fecha), 
            nombre_alimento, 
            calorias,
            pesoKgConvertido
        );
    }
}

module.exports = NutricionFactory;