const conexion = require('../config/database');
const ClientePlanFactory = require('../factories/PlanClienteFactory.js');
const ContratoFactory = require('../factories/ContratoFactory.js');
const ClientePlanRepository = require('../repositories/ClientePlanRepository.js');
const ContratoRepository = require('../repositories/ContratoRepository.js');

const clientePlanRepository = new ClientePlanRepository();
const contratoRepository = new ContratoRepository();

class AsignacionService {
    static async asignarPlan(datosAsignacion, datosContrato) {
        const connection = await conexion.getConnection();
        try {
            await connection.beginTransaction();

            const clientePlan = ClientePlanFactory.crear(datosAsignacion);
            await clientePlanRepository.crear(clientePlan, connection);

            datosContrato.cliente_plan_id = clientePlan.id;
            const contrato = ContratoFactory.crear(datosContrato);
            await contratoRepository.crear(contrato, connection);

            await connection.commit();
            return { clientePlan, contrato };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = AsignacionService;