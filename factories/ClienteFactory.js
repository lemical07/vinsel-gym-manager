const Cliente = require('../models/Cliente');

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

    const fechaNacimientoConvertida = new Date(fecha_nacimiento);

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