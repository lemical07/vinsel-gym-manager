const conexion = require('../config/database');
const SeguimientoFactory = require('../factories/SeguimientoFisicoFactory.js');
const SeguimientoRepository = require('../repositories/SeguimientoRepository.js');
const ClientePlanRepository = require('../repositories/ClientePlanRepository.js');

const seguimientoRepository = new SeguimientoRepository();
const clientePlanRepository = new ClientePlanRepository();

class SeguimientoService {
    static async crear(datosCrudos) {
        const asignacion = await clientePlanRepository.buscarPorId(datosCrudos.cliente_plan_id);
        if (!asignacion) {
            throw new Error(`❌ No existe una asignación con id ${datosCrudos.cliente_plan_id}`);
        }
        const seguimiento = SeguimientoFactory.crear(datosCrudos);
        return seguimientoRepository.crear(seguimiento);
    }

    static async listarPorClientePlan(cliente_plan_id) {
        return seguimientoRepository.listarPorClientePlan(cliente_plan_id);
    }

    static async eliminar(id) {
        const connection = await conexion.getConnection();
        try {
            await connection.beginTransaction();

            const registro = await seguimientoRepository.buscarPorId(id);
            if (!registro) {
                throw new Error(`❌ No existe un registro de seguimiento con id ${id}`);
            }

            const totalRegistros = await seguimientoRepository.contarPorClientePlan(registro.cliente_plan_id, connection);
            if (totalRegistros <= 1) {
                throw new Error('⚠️ No se puede eliminar: es el único registro de seguimiento de este plan, se perdería el historial base');
            }

            await seguimientoRepository.eliminar(id, connection);

            await connection.commit();
            return { mensaje: `Registro ${id} eliminado correctamente` };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = SeguimientoService;