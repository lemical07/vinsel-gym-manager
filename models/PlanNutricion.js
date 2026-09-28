class PlanNutricion {
    #id;
    #cliente_plan_id;
    #nombre;
    #meta_calorica;
    #fecha_inicio;
    #fecha_fin;

    constructor(cliente_plan_id, nombre, meta_calorica, fecha_inicio, fecha_fin) {
        if (!cliente_plan_id || typeof cliente_plan_id !== 'number' || !Number.isInteger(cliente_plan_id) || cliente_plan_id <= 0) {
            throw new Error('❌ El id de la asignación es obligatorio y debe ser un número entero positivo');
        }
        this.#cliente_plan_id = cliente_plan_id;

        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            throw new Error('❌ El nombre del plan de alimentación es obligatorio');
        }
        if (nombre.length > 100) {
            throw new Error('❌ El nombre no puede superar 100 caracteres');
        }
        this.#nombre = nombre;

        if (meta_calorica !== undefined && meta_calorica !== null && meta_calorica !== '') {
            if (typeof meta_calorica !== 'number' || !Number.isInteger(meta_calorica) || meta_calorica <= 0) {
                throw new Error('⚠️ La meta calórica debe ser un número entero positivo');
            }
        }
        this.#meta_calorica = meta_calorica || null;

        if (!fecha_inicio || !(fecha_inicio instanceof Date) || isNaN(fecha_inicio)) {
            throw new Error('❌ La fecha de inicio debe ser una fecha válida');
        }
        this.#fecha_inicio = fecha_inicio;

        if (fecha_fin !== undefined && fecha_fin !== null) {
            if (!(fecha_fin instanceof Date) || isNaN(fecha_fin)) {
                throw new Error('❌ Fecha fin debe ser una fecha válida');
            }
            if (fecha_fin <= this.#fecha_inicio) {
                throw new Error('⚠️ La fecha de fin debe ser posterior a la fecha de inicio');
            }
        }
        this.#fecha_fin = fecha_fin || null;
    }

    asignarId(id) {
        if (this.#id !== undefined) {
            throw new Error('❌ Este plan de alimentación ya tiene un id asignado');
        }
        this.#id = id;
    }

    get id() { return this.#id; }
    get cliente_plan_id() { return this.#cliente_plan_id; }
    get nombre() { return this.#nombre; }
    get meta_calorica() { return this.#meta_calorica; }
    get fecha_inicio() { return this.#fecha_inicio; }
    get fecha_fin() { return this.#fecha_fin; }
}

module.exports = PlanNutricion;