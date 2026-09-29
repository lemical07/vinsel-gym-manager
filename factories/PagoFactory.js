const Pago = require('../models/Pago.js');
const { parsearFecha } = require('../utils/fecha.js');

class PagoFactory {
  static crear(datosCrudos) {
    const {
      contrato_id, 
      tipo, 
      categoria, 
      monto, 
      fecha, 
      descripcion
    } = datosCrudos;

    const contratoIdConvertido = contrato_id ? Number(contrato_id) : null;
    const montoConvertido = Number(monto);
    const fechaConvertida = parsearFecha(fecha);

    return new Pago(
      contratoIdConvertido, 
      tipo, 
      categoria, 
      montoConvertido, 
      fechaConvertida, 
      descripcion
    );
  }
}

module.exports = PagoFactory;