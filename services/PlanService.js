const PlanFactory = require('../factories/PlanFactory.js');
const PlanRepository = require('../repositories/PlanRepository.js');

const planRepository = new PlanRepository();

class PlanService {
  static async crear(datosCrudos) {
    const planExistente = await planRepository.buscarPorNombre(datosCrudos.nombre);

    if (planExistente) {
      throw new Error(`❌ Ya existe un plan de entrenamiento con ese nombre, "${datosCrudos.nombre}"`);
    }
    const plan = PlanFactory.crear(datosCrudos);
    return planRepository.crear(plan);
  }


  static async listar() {
    return planRepository.listar();
  }


  static async buscarPorId(id) {
    const plan = await planRepository.buscarPorId(id);
    if (!plan) {
      throw new Error(`❌ No existe un Plan de Entrenamiento con ese con id ${id}`);
    }
    return plan;
  }


  static async actualizar(id, datosCrudos) {
    await this.buscarPorId(id);

    const planMismoNombre = await planRepository.buscarPorNombre(datosCrudos.nombre);

    if (planMismoNombre && planMismoNombre.id !== id) {
      throw new Error(`❌ Ya existe otro Plan  registrado el nombre "${datosCrudos.nombre}"`);
    }

    const planActualizado = PlanFactory.crear(datosCrudos);
    planActualizado.asignarId(id);
    await planRepository.actualizar(id, planActualizado);
    return planActualizado;
  }
  static async eliminar(id) {
    await this.buscarPorId(id);
    await planRepository.eliminar(id);
  }
}

module.exports = PlanService;