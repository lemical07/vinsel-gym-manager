class PlanCliente{
    #id;
    #cliente_id;
    #plan_id;
    #fecha_asignacion;
    #estado;

    constructor(cliente_id, plan_id, fecha_asignacion, estado) {
        //cleinte
    if (!cliente_id || typeof cliente_id !== 'number' || !Number.isInteger(cliente_id)) {
        throw new Error('❌ El id del cliente es obligatorio y debe ser un número entero');
    }
    if (cliente_id <= 0) {
        throw new Error('❌ El id del cliente debe ser un número positivo');
    }
    this.#cliente_id = cliente_id;

    //plan
    if (!plan_id || typeof plan_id !== 'number' || !Number.isInteger(plan_id)) {
        throw new Error('❌ El id del pla de entrenamiento es obligatorio y debe ser un número entero');
    }
    if (plan_id <= 0) {
        throw new Error('❌ El id del pla del entrenamiento debe ser un número positivo');
    }
    this.#plan_id = plan_id;

        //asignacion
    this.#fecha_asignacion = fecha_asignacion ||new Date();

    //estado
    const estadosValidos = ['activo', 'renovado', 'cancelado', 'finalizado'];
    if (estado && !estadosValidos.includes(estado)) {
        throw new Error('❌ El estado debe ser "activo", "renovado", "cancelado" o "finalizado"');
    }
    this.#estado = estado || 'activo';
    }

    asignarId(id) {
        if (this.#id !== undefined) {
            throw new Error('❌ Este plan del cliente ya tiene un id asignado');
        }
        this.#id = id;
    }

    get id(){return this.#id};     
    get cliente_id(){return this.#cliente_id};
    get plan_id(){return this.#plan_id};
    get fecha_asignacion(){return this.#fecha_asignacion};
    get estado(){return this.#estado};
}
module.exports = PlanCliente;