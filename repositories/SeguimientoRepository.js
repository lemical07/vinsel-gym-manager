const conexion = require('../config/database');

class SeguimientoRepository {
    async crear(seguimiento, conexionExterna = conexion) {
        const [resultado] = await conexionExterna.query(
            `INSERT INTO seguimiento_fisico (cliente_plan_id, fecha, peso_kg, grasa_corporal, medidas, foto_ruta, comentarios)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [seguimiento.cliente_plan_id, seguimiento.fecha, seguimiento.peso_kg, seguimiento.grasa_corporal, seguimiento.medidas, seguimiento.foto_ruta, seguimiento.comentarios]
        );
        seguimiento.asignarId(resultado.insertId);
        return seguimiento;
    }

    async listarPorClientePlan(cliente_plan_id) {
        const [filas] = await conexion.query('SELECT * FROM seguimiento_fisico WHERE cliente_plan_id = ? ORDER BY fecha ASC',
            [cliente_plan_id]
        );
        return filas;
    }

    async buscarPorId(id) {
        const [resultado] = await conexion.query('SELECT * FROM seguimiento_fisico WHERE id = ?', [id]);
        return resultado[0];
    }

    async contarPorClientePlan(cliente_plan_id, conexionExterna = conexion) {
        const [resultado] = await conexionExterna.query(
            'SELECT COUNT(*) AS total FROM seguimiento_fisico WHERE cliente_plan_id = ?',[cliente_plan_id]
        );
        return resultado[0].total;
    }

    async eliminar(id, conexionExterna = conexion) {
        const [resultado] = await conexionExterna.query('DELETE FROM seguimiento_fisico WHERE id = ?', [id]);
        return resultado;
    }
}

module.exports = SeguimientoRepository;