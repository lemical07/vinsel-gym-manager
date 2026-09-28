const PlanNutricion = require('../models/PlanNutricion.js');
const AlimentoRegistro = require('../models/AlimentoRegistro.js');

function convertirFecha(fecha) {
    if (!fecha) return null;
    const [anio, mes, dia] = fecha.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
}

class NutricionFactory {
    static crearPlan(datosCrudos) {
        const { 
            cliente_plan_id, 
            nombre, 
            meta_calorica, 
            fecha_inicio, 
            fecha_fin 
        } = datosCrudos;
        return new PlanNutricion(
            cliente_plan_id,
            nombre,
            meta_calorica,
            convertirFecha(fecha_inicio),
            fecha_fin ? convertirFecha(fecha_fin) : null
        );
    }

    static crearAlimento(datosCrudos) {
        const { 
            plan_nutricion_id, 
            fecha, nombre_alimento, 
            calorias 
        } = datosCrudos;
        return new AlimentoRegistro(
            plan_nutricion_id, 
            convertirFecha(fecha), 
            nombre_alimento, 
            calorias
        );
    }
}

module.exports = NutricionFactory;