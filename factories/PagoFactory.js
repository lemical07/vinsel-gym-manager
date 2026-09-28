const Pago = require('../models/Pago.js');

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
    const fechaConvertida = new Date(`${fecha}T00:00:00`);

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