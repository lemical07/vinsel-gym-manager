const conexion = require('../config/database');

class NutricionRepository {
    async crearPlan(plan, conexionExterna = conexion) {
        const [resultado] = await conexionExterna.query(
            `INSERT INTO planes_nutricion (cliente_plan_id, nombre, meta_calorica, fecha_inicio, fecha_fin)
             VALUES (?, ?, ?, ?, ?)`,
            [plan.cliente_plan_id, plan.nombre, plan.meta_calorica, plan.fecha_inicio, plan.fecha_fin]
        );
        plan.asignarId(resultado.insertId);
        return plan;
    }

    async buscarPlanPorId(id) {
        const [resultado] = await conexion.query('SELECT * FROM planes_nutricion WHERE id = ?', [id]);
        return resultado[0];
    }

    async crearAlimento(alimento, conexionExterna = conexion) {
        const [resultado] = await conexionExterna.query(
            `INSERT INTO alimentos_registro (plan_nutricion_id, fecha, nombre_alimento, calorias, peso_kg)
             VALUES (?, ?, ?, ?, ?)`,
            [alimento.plan_nutricion_id, alimento.fecha, alimento.nombre_alimento, alimento.calorias, alimento.peso_kg]
        );
        alimento.asignarId(resultado.insertId);
        return alimento;
    }

    async listarAlimentosPorPlan(plan_nutricion_id) {
        const [filas] = await conexion.query(
            'SELECT * FROM alimentos_registro WHERE plan_nutricion_id = ? ORDER BY fecha ASC',
            [plan_nutricion_id]
        );
        return filas;
    }

    async listarPlanes() {
        const [filas] = await conexion.query('SELECT * FROM planes_nutricion');
        return filas;
    }

    async buscarAlimentoPorId(id) {
        const [resultado] = await conexion.query('SELECT * FROM alimentos_registro WHERE id = ?', [id]);
        return resultado[0];
    }

    async actualizarAlimento(id, datos) {
        const [resultado] = await conexion.query(
            'UPDATE alimentos_registro SET fecha = ?, nombre_alimento = ?, calorias = ? WHERE id = ?',
            [datos.fecha, datos.nombre_alimento, datos.calorias, id]
        );
        return resultado;
    }
}

module.exports = NutricionRepository;