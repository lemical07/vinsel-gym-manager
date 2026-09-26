const conexion = require('../config/database');

class Contratos {
    async crear(contrato, conexionExterna = conexion) {
        const [resultado] = await conexionExterna.query(
            `INSERT INTO contratos (cliente_plan_id, condiciones, duracion_semanas, precio, fecha_inicio, fecha_fin, estado)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [contrato.cliente_plan_id, contrato.condiciones, contrato.duracion_semanas, contrato.precio, contrato.fecha_inicio, contrato.fecha_fin,  contrato.estado]
        );
        contrato.asignarId(resultado.insertId);
        return contrato;
    }
    async listar() {
    const [filas] = await conexion.query('SELECT * FROM contratos');
    return filas;
    }

    async buscarPorId(id) {
    const [resultado] = await conexion.query('SELECT * FROM contratos WHERE id = ?', [id]);
    return resultado[0];
    }

    async actualizar(id, datos) {
    const [resultado] = await conexion.query(
        'UPDATE contratos SET cliente_plan_id = ?, condiciones = ?, duracion_semanas = ?, precio = ?, fecha_inicio = ?, fecha_fin =?, estado = ? WHERE id = ?',
        [datos.cliente_plan_id, datos.condiciones, datos.duracion_semanas, datos.precio, datos.fecha_inicio, datos.fecha_fin,  datos.estado, id]
    );
    return resultado;
    }

    async eliminar(id) {
    const [resultado] = await conexion.query('DELETE FROM contratos WHERE id = ?', [id]);
    return resultado;
    }

}   


module.exports = Contratos;