const conexion = require('../config/database');

class PlanesEntrenamiento {
    async crear(plan) {
        const [resultado] = await conexion.query(
            `INSERT INTO planes_entrenamiento (nombre, duracion_semanas, meta_fisica, nivel, precio_base, estado)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [plan.nombre, plan.duracion_semana, plan.meta_fisica, plan.nivel, plan.precio_base, plan.estado]
        );
        plan.asignarId(resultado.insertId);
        return plan;
    }
    async listar() {
    const [filas] = await conexion.query('SELECT * FROM planes_entrenamiento');
    return filas;
    }

    async buscarPorId(id) {
    const [resultado] = await conexion.query('SELECT * FROM planes_entrenamiento WHERE id = ?', [id]);
    return resultado[0];
    }

    async actualizar(id, datos) {
    const [resultado] = await conexion.query(
        'UPDATE planes_entrenamiento SET nombre = ?, duracion_semanas = ?, meta_fisica = ?, nivel = ?, precio_base = ?, estado = ? WHERE id = ?',
        [datos.nombre, datos.duracion_semana, datos.meta_fisica, datos.nivel, datos.precio_base, datos.estado, id]
    );
    return resultado;
    }

    async eliminar(id) {
    const [resultado] = await conexion.query('DELETE FROM planes_entrenamiento WHERE id = ?', [id]);
    return resultado;
    }
}   


module.exports = PlanesEntrenamiento;