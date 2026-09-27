class SeguimientoFisico {
    #id;
    #cliente_plan_id;
    #fecha;
    #peso_kg;
    #grasa_corporal;
    #medidas;
    #foto_ruta;
    #comentarios;

    constructor(cliente_plan_id, fecha, peso_kg, grasa_corporal, medidas, foto_ruta, comentarios) {
        //id plan cliente
        if (!cliente_plan_id || typeof cliente_plan_id !== 'number' || !Number.isInteger(cliente_plan_id)) {
            throw new Error('❌ El id de la asignación es obligatorio y debe ser un número entero');
        }
        if (cliente_plan_id <= 0) {
            throw new Error('❌ El id de la asignación debe ser un número positivo');
        }
        this.#cliente_plan_id = cliente_plan_id;

        //fecha
        if (!fecha || !(fecha instanceof Date) || isNaN(fecha)) {
            throw new Error('❌ La fecha del registro debe ser una fecha válida');
        }
        const hoy = new Date();
        if (fecha > hoy) {
            throw new Error('⚠️ La fecha del registro no puede ser futura');
        }
        this.#fecha = fecha;

        //peso kg
        if (peso_kg === undefined || peso_kg === null || peso_kg === '') {
            throw new Error('❌ El peso es obligatorio');
        }
        if (typeof peso_kg !== 'number' || isNaN(peso_kg)) {
            throw new Error('❌ El peso debe ser un número');
        }
        if (peso_kg < 20 || peso_kg > 300) {
            throw new Error('⚠️ El peso debe estar entre 20 y 300 kg');
        }
        this.#peso_kg = peso_kg;

        //grasa corporal (opcional)
        if (grasa_corporal !== undefined && grasa_corporal !== null && grasa_corporal !== '') {
            if (typeof grasa_corporal !== 'number' || isNaN(grasa_corporal)) {
                throw new Error('❌ El porcentaje de grasa corporal debe ser un número');
            }
            if (grasa_corporal < 0 || grasa_corporal > 100) {
                throw new Error('⚠️ El porcentaje de grasa corporal debe estar entre 0 y 100');
            }
        }
        this.#grasa_corporal = grasa_corporal || null;

        //medidas (opcional)
        if (medidas !== undefined && medidas !== null && medidas !== '') {
            if (typeof medidas !== 'string') {
                throw new Error('❌ Las medidas deben ser texto');
            }
        }
        this.#medidas = medidas || null;

        //ruta de la foto (opcional)
        if (foto_ruta !== undefined && foto_ruta !== null && foto_ruta !== '') {
            if (typeof foto_ruta !== 'string' || foto_ruta.length > 255) {
                throw new Error('❌ La ruta de la foto debe ser texto de máximo 255 caracteres');
            }
        }
        this.#foto_ruta = foto_ruta || null;

        //comentarios (opcional)
        if (comentarios !== undefined && comentarios !== null && comentarios !== '') {
            if (typeof comentarios !== 'string') {
                throw new Error('❌ Los comentarios deben ser texto');
            }
        }
        this.#comentarios = comentarios || null;
    }

    asignarId(id) {
        if (this.#id !== undefined) {
            throw new Error('❌ Este registro ya tiene un id asignado');
        }
        this.#id = id;
    }

    get id() { return this.#id; }
    get cliente_plan_id() { return this.#cliente_plan_id; }
    get fecha() { return this.#fecha; }
    get peso_kg() { return this.#peso_kg; }
    get grasa_corporal() { return this.#grasa_corporal; }
    get medidas() { return this.#medidas; }
    get foto_ruta() { return this.#foto_ruta; }
    get comentarios() { return this.#comentarios; }
}

module.exports = SeguimientoFisico;