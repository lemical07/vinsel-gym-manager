import Cliente from '../models/Cliente.js';

export default class ClienteFactory {
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