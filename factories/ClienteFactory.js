const Cliente = require('../models/Cliente.js');
const { parsearFecha } = require('../utils/fecha.js');

class ClienteFactory {
  static crear(datosCrudos) {
    const {
      nombre,
      apellido,
      email,
      telefono,
      fecha_nacimiento,
      estado,
    } = datosCrudos;
    const fechaNacimientoConvertida = parsearFecha(fecha_nacimiento);

    return new Cliente(
      nombre,
      apellido,
      email,
      telefono,
      fechaNacimientoConvertida,
      estado,
    );
  }
}

module.exports = ClienteFactory;