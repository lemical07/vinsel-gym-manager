class AlimentoRegistro {
    #id;
    #plan_nutricion_id;
    #fecha;
    #nombre_alimento;
    #calorias;
    #peso_kg;

    constructor(plan_nutricion_id, fecha, nombre_alimento, calorias, peso_kg) {
        if (!plan_nutricion_id || typeof plan_nutricion_id !== 'number' || !Number.isInteger(plan_nutricion_id)) {
            throw new Error('❌ El id del plan de alimentación es obligatorio');
        }
        if (plan_nutricion_id <= 0){
            throw new Error('❌ El id debe ser un número entero positivo');
        }

        this.#plan_nutricion_id = plan_nutricion_id;

        if (!fecha || !(fecha instanceof Date) || isNaN(fecha)) {
            throw new Error('❌ La fecha del registro debe ser una fecha válida');
        }
        this.#fecha = fecha;

        if (!nombre_alimento || typeof nombre_alimento !== 'string' || nombre_alimento.trim() === '') {
            throw new Error('❌ El nombre del alimento es obligatorio');
        }
        if (nombre_alimento.length > 120) {
            throw new Error('❌ El nombre del alimento no puede superar 120 caracteres');
        }
        this.#nombre_alimento = nombre_alimento;

        //calorias
        if (calorias === undefined || calorias === null || calorias === '') {
            throw new Error('❌ Las calorías son obligatorias');
        }
        if (typeof calorias !== 'number' || !Number.isInteger(calorias) || calorias <= 0) {
            throw new Error('⚠️ Las calorías deben ser un número entero positivo');
        }
        this.#calorias = calorias;

        //peso kl
        if (peso_kg === undefined || peso_kg === null || peso_kg === '') {
            throw new Error('❌ El peso es obligatorio');
        }
        if (typeof peso_kg !== 'number' || isNaN(peso_kg)) {
            throw new Error('❌ El peso debe ser un número');
        }
        if (peso_kg < 0 || peso_kg > 5) {
            throw new Error('⚠️ El peso debe estar entre 20 y 300 kg');
        }
        this.#peso_kg = peso_kg;
    }

    asignarId(id) {
        if (this.#id !== undefined) {
            throw new Error('❌ Este registro ya tiene un id asignado');
        }
        this.#id = id;
    }

    get id() { return this.#id; }
    get plan_nutricion_id() { return this.#plan_nutricion_id; }
    get fecha() { return this.#fecha; }
    get nombre_alimento() { return this.#nombre_alimento; }
    get calorias() { return this.#calorias; }
    get peso_kg() { return this.#peso_kg; }
}

module.exports = AlimentoRegistro;