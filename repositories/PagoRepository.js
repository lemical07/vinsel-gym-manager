const conexion = require('../config/database');

class PagoRepository {
    async crear(pagos) {
        const [resultado] = await conexion.query(
            `INSERT INTO pagos (contrato_id, tipo, categoria, monto, fecha, descripcion)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [pagos.contrato_id, pagos.tipo, pagos.categoria, pagos.monto, pagos.fecha, pagos.descripcion]
        );
        pagos.asignarId(resultado.insertId);
        return pagos;
        }
    async listar() {
        const [filas] = await conexion.query('SELECT * FROM pagos');
        return filas;
    }

    async buscarPorId(id) {
        const [resultado] = await conexion.query('SELECT * FROM pagos WHERE id = ?', [id]);
        return resultado[0];
    }

    async actualizar(id, datos) {
    const [resultado] = await conexion.query(
        'UPDATE pagos SET contrato_id = ?, tipo = ?, categoria = ?, monto = ?, fecha = ?, descripcion = ? WHERE id = ?',
        [datos.contrato_id, datos.tipo, datos.categoria, datos.monto, datos.fecha, datos.descripcion, id]
    );
        return resultado;
    }

    async eliminar(id) {
        const [resultado] = await conexion.query('DELETE FROM pagos WHERE id = ?', [id]);
    return resultado;
    }

    async balancePorFechas(desde, hasta) {
        const [filas] = await conexion.query(
            `SELECT
                COALESCE(SUM(CASE WHEN tipo = 'ingreso' THEN monto END), 0) AS total_ingresos,
                COALESCE(SUM(CASE WHEN tipo = 'egreso' THEN monto END), 0) AS total_egresos
             FROM pagos
             WHERE fecha BETWEEN ? AND ?`,
            [desde, hasta]
        );
        return filas[0];
    }

    async balancePorCliente(cliente_id) {
        const [filas] = await conexion.query(
            `SELECT
                COALESCE(SUM(CASE WHEN p.tipo = 'ingreso' THEN p.monto END), 0) AS total_ingresos,
                COALESCE(SUM(CASE WHEN p.tipo = 'egreso' THEN p.monto END), 0) AS total_egresos
             FROM pagos p
             INNER JOIN contratos c ON p.contrato_id = c.id
             INNER JOIN cliente_plan cp ON c.cliente_plan_id = cp.id
             WHERE cp.cliente_id = ?`,
            [cliente_id]
        );
        return filas[0];
    }

    async listarPorTipo(tipo) {
    const [filas] = await conexion.query(
        'SELECT * FROM pagos WHERE tipo = ?',
        [tipo]
    );
    return filas;
    }
}   


module.exports = PagoRepository;