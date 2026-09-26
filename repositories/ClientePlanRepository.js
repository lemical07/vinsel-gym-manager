const conexion = require('../config/database');

class ClientePlan {
    async crear(plan) {
        const [resultado] = await conexion.query(
            `INSERT INTO cliente_plan (cliente_id, plan_id, fecha_asignacion, estado)
             VALUES (?, ?, ?, ?)`,
            [plan.cliente_id, plan.plan_id, plan.fecha_asignacion, plan.estado]
        );
        plan.asignarId(resultado.insertId);
        return plan;
    }
    async listar() {
    const [filas] = await conexion.query('SELECT * FROM cliente_plan');
    return filas;
    }

    async buscarPorId(id) {
    const [resultado] = await conexion.query('SELECT * FROM cliente_plan WHERE id = ?', [id]);
    return resultado[0];
    }

    async actualizar(id, datos) {
    const [resultado] = await conexion.query(
        'UPDATE cliente_plan SET cliente_id = ?, plan_id = ?, fecha_asignacion = ?, estado = ? WHERE id = ?',
        [datos.cliente_id, datos.plan_id, datos.fecha_asignacion, datos.estado, id]
    );
    return resultado;
    }

    async eliminar(id) {
    const [resultado] = await conexion.query('DELETE FROM cliente_plan WHERE id = ?', [id]);
    return resultado;
    }

}   


module.exports = ClientePlan;