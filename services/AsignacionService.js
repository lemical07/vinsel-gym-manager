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

    static async listar() {
    const asignaciones = await clientePlanRepository.listar();
    const contratos = await contratoRepository.listar();

    return asignaciones.map((asignacion) => {
        const contratoRelacionado = contratos.find(
            (contrato) => contrato.cliente_plan_id === asignacion.id
        );
        return { ...asignacion, contrato: contratoRelacionado };
    });
    }


    static async cancelar(id) {
    const connection = await conexion.getConnection();
    try {
        await connection.beginTransaction();

        const asignacion = await clientePlanRepository.buscarPorId(id);
        if (!asignacion) {
            throw new Error(`❌ No existe una asignación con id ${id}`);
        }

        await connection.query(
            "UPDATE cliente_plan SET estado = 'cancelado' WHERE id = ?",
            [id]
        );

        await connection.query(
            "UPDATE contratos SET estado = 'cancelado' WHERE cliente_plan_id = ?",
            [id]
        );

        await connection.commit();
        return { mensaje: `Asignación ${id} y su contrato fueron cancelados` };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
    }
}

module.exports = AsignacionService;