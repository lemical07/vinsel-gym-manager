const conexion = require('../config/database');

class ExportacionRepository {
    async obtenerDatosCliente(clienteId) {
        const [asignaciones] = await conexion.query(
            `SELECT cp.id AS asignacion_id, cp.fecha_asignacion, cp.estado AS estado_asignacion,
                    p.id AS plan_id, p.nombre AS plan_nombre, p.duracion_semanas,
                    p.meta_fisica, p.nivel, p.precio_base, p.estado AS plan_estado
             FROM cliente_plan cp
             INNER JOIN planes_entrenamiento p ON p.id = cp.plan_id
             WHERE cp.cliente_id = ?
             ORDER BY cp.fecha_asignacion`,
            [clienteId]
        );
        const consultaAsignaciones = 'SELECT id FROM cliente_plan WHERE cliente_id = ?';

        const [[contratos], [avances], [planesNutricion], [alimentos]] = await Promise.all([
            conexion.query(`SELECT * FROM contratos WHERE cliente_plan_id IN (${consultaAsignaciones})`, [clienteId]),
            conexion.query(`SELECT * FROM seguimiento_fisico WHERE cliente_plan_id IN (${consultaAsignaciones})`, [clienteId]),
            conexion.query(`SELECT * FROM planes_nutricion WHERE cliente_plan_id IN (${consultaAsignaciones})`, [clienteId]),
            conexion.query(
                `SELECT * FROM alimentos_registro
                 WHERE plan_nutricion_id IN (
                     SELECT id FROM planes_nutricion WHERE cliente_plan_id IN (${consultaAsignaciones})
                 )`,
                [clienteId]
            ),
        ]);

        return { asignaciones, contratos, avances, planesNutricion, alimentos };
    }
}

module.exports = ExportacionRepository;
