const PagoFactory = require('../factories/PagoFactory.js');
const PagoRepository = require('../repositories/PagoRepository.js');
const ClienteService = require('./ClienteService.js');

const pagoRepository = new PagoRepository();

class PagoService {
  static async crear(datosCrudos) {
    const pago = PagoFactory.crear(datosCrudos);
    try {
        return await pagoRepository.crear(pago);
    } catch (err) {
        if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new Error(`❌ No existe un contrato con id ${pago.contrato_id}`);
        }
        throw err;
    }
}


  static async listar() {
    return pagoRepository.listar();
  }


  static async buscarPorId(id) {
    const pago = await pagoRepository.buscarPorId(id);
    if (!pago) {
      throw new Error(`❌ No existe un pago con id ${id}`);
    }
    return pago;
  }


  static async actualizar(id, datosCrudos) {
    await this.buscarPorId(id);

    const pagoActualizado = PagoFactory.crear(datosCrudos);
    pagoActualizado.asignarId(id);

    await pagoRepository.actualizar(id, pagoActualizado);
    return pagoActualizado;
  }

  static async eliminar(id) {
    await this.buscarPorId(id);
    await pagoRepository.eliminar(id);
  }

  static async listarPorTipo(tipo) {
    if (tipo !== 'ingreso' && tipo !== 'egreso') {
        throw new Error(`❌ Tipo inválido: ${tipo}`);
    }
    return pagoRepository.listarPorTipo(tipo);
  }

  static async balancePorFechas(desde, hasta) {
    const formato = /^\d{4}-\d{2}-\d{2}$/;
    if (!formato.test(desde) || !formato.test(hasta)) {
        throw new Error('❌ Las fechas deben tener formato YYYY-MM-DD');
    }
    if (desde > hasta) {
        throw new Error('❌ La fecha "desde" no puede ser posterior a "hasta"');
    }

    const filas = await pagoRepository.balancePorFechas(desde, hasta);

    const total_ingresos = Number(filas.total_ingresos);
    const total_egresos = Number(filas.total_egresos);
    const balance = Number((total_ingresos - total_egresos).toFixed(2));

    return { total_ingresos, total_egresos, balance };
  }
  //buscar nombre y enlistar, luego seleccionar
  static async balancePorCliente(cliente_id) {
    if (!Number.isInteger(cliente_id) || cliente_id <= 0) {
        throw new Error('❌ El id de cliente debe ser un entero positivo');
    }
    await ClienteService.buscarPorId(cliente_id);
    const filas = await pagoRepository.balancePorCliente(cliente_id);

    const total_ingresos = Number(filas.total_ingresos);
    const total_egresos = Number(filas.total_egresos);
    const balance = Number((total_ingresos - total_egresos).toFixed(2));

    return { total_ingresos, total_egresos, balance };
}


}

module.exports = PagoService;