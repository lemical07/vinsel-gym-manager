const NutricionFactory = require('../factories/NutricionFactory.js');
const NutricionRepository = require('../repositories/NutricionRepository.js');
const ClientePlanRepository = require('../repositories/ClientePlanRepository.js');

const nutricionRepository = new NutricionRepository();
const clientePlanRepository = new ClientePlanRepository();

class NutricionService {
    static async crearPlan(datosCrudos) {
        const asignacion = await clientePlanRepository.buscarPorId(datosCrudos.cliente_plan_id);
        if (!asignacion) {
            throw new Error(`❌ No existe una asignación con id ${datosCrudos.cliente_plan_id}`);
        }
        const plan = NutricionFactory.crearPlan(datosCrudos);
        return nutricionRepository.crearPlan(plan);
    }

    static async registrarAlimento(datosCrudos) {
        const plan = await nutricionRepository.buscarPlanPorId(datosCrudos.plan_nutricion_id);
        if (!plan) {
            throw new Error(`❌ No existe un plan de alimentación con id ${datosCrudos.plan_nutricion_id}`);
        }
        const alimento = NutricionFactory.crearAlimento(datosCrudos);
        return nutricionRepository.crearAlimento(alimento);
    }

    static async reporteSemanal(plan_nutricion_id) {
        const alimentos = await nutricionRepository.listarAlimentosPorPlan(plan_nutricion_id);
        const totalCalorias = alimentos.reduce((suma, a) => suma + a.calorias, 0);
        return { alimentos, totalCalorias };
    }

    static async listarPlanes() {
        return nutricionRepository.listarPlanes();
    }

    static async buscarAlimentoPorId(id) {
        const alimento = await nutricionRepository.buscarAlimentoPorId(id);
        if (!alimento) {
            throw new Error(`❌ No existe un alimento con id ${id}`);
        }
        return alimento;
    }

    static async actualizarAlimento(id, datosCrudos) {
        await this.buscarAlimentoPorId(id);
        const alimento = NutricionFactory.crearAlimento({ ...datosCrudos, plan_nutricion_id: 1 });
        await nutricionRepository.actualizarAlimento(id, alimento);
        return alimento;
    }
}

module.exports = NutricionService;