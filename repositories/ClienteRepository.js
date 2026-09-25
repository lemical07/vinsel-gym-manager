const conexion = require('../config/database');

class ClienteRepository {
    async crear(cliente) {
        const [resultado] = await conexion.query(
            `INSERT INTO clientes (nombre, apellido, email, telefono, fecha_nacimiento, estado)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [cliente.nombre, cliente.apellido, cliente.email, cliente.telefono, cliente.fecha_nacimiento, cliente.estado]
        );
        cliente.asignarId(resultado.insertId);
        return cliente;
    }
    async listar() {
    const [filas] = await conexion.query('SELECT * FROM clientes');
    return filas;
    }

    async buscarPorId(id) {
    const [resultado] = await conexion.query('SELECT * FROM clientes WHERE id = ?', [id]);
    return resultado[0];
    }

    async actualizar(id, datos) {
    const [resultado] = await conexion.query(
        'UPDATE clientes SET nombre = ?, apellido = ?, email = ?, telefono = ?, fecha_nacimiento = ?, estado = ? WHERE id = ?',
        [datos.nombre, datos.apellido, datos.email, datos.telefono, datos.fecha_nacimiento, datos.estado, id]
    );
    return resultado;
    }

    async eliminar(id) {
    const [resultado] = await conexion.query('DELETE FROM clientes WHERE id = ?', [id]);
    return resultado;
    }

    //metodo extra para la validación de unicidad antes de crear
    async buscarPorEmail(email) {
    const [resultado] = await conexion.query('SELECT * FROM clientes WHERE email = ?', [email]);
    return resultado[0];
    }

}   


module.exports = ClienteRepository;