const ClienteFactory = require('../factories/ClienteFactory');
const ClienteRepository = require('../repositories/ClienteRepository');

const clienteRepository = new ClienteRepository();

class ClienteService {
  static async crear(datosCrudos) {
    const clienteExistente = await clienteRepository.buscarPorEmail(datosCrudos.email);

    if (clienteExistente) {
      throw new Error(`❌ Ya existe un cliente registrado con el email "${datosCrudos.email}"`);
    }
    const cliente = ClienteFactory.crear(datosCrudos);
    return clienteRepository.crear(cliente);
  }


  static async listar() {
    return clienteRepository.listar();
  }


  static async buscarPorId(id) {
    const cliente = await clienteRepository.buscarPorId(id);
    if (!cliente) {
      throw new Error(`❌ No existe un cliente con id ${id}`);
    }
    return cliente;
  }


  static async actualizar(id, datosCrudos) {
    await this.buscarPorId(id);

    const clienteConMismoEmail = await clienteRepository.buscarPorEmail(datosCrudos.email);

    if (clienteConMismoEmail && clienteConMismoEmail.id !== id) {
      throw new Error(`❌ Ya existe otro cliente registrado con el email "${datosCrudos.email}"`);
    }
    const clienteActualizado = ClienteFactory.crear(datosCrudos);
    clienteActualizado.asignarId(id);
    await clienteRepository.actualizar(id, clienteActualizado);
    return clienteActualizado;
  }
  static async eliminar(id) {
    await this.buscarPorId(id);
    await clienteRepository.eliminar(id);
  }
}

module.exports = ClienteService;