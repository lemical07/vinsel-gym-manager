class Pago{
    #id;
    #contrato_id;
    #tipo;
    #categoria;
    #monto;
    #fecha;
    #descripcion;

    constructor(contrato_id, tipo, categoria, monto, fecha, descripcion) {

        //contrato_id
        if (contrato_id !== undefined && contrato_id !== null && contrato_id !== '') {
            if (contrato_id <= 0 || typeof contrato_id !== 'number'|| !Number.isInteger(contrato_id)) {
            throw new Error('❌ ID del contrato debe ser un número positivo');
            }
        }
        this.#contrato_id = contrato_id || null;

    //tipo
        const tiposValidos = ['ingreso', 'egreso'];
        if (!tipo || typeof tipo !== 'string' || tipo.trim() === '') {
            throw new Error('❌ Tipo de pago es obligatorio y debe ser texto');
        }
        if (!tiposValidos.includes(tipo)) {
            throw new Error('❌ Tipo de pago inválido: "Ingreso/Egreso".');
        }
        this.#tipo = tipo;   


    //categoria
    if (!categoria || typeof categoria !== 'string' || categoria.trim() === '') {
        throw new Error('❌ Categoria obligatorio y debe ser texto.');
    }
    if (categoria.length > 80) {
        throw new Error('❌ Categoria no puede superar 80 caracteres');
    }
    this.#categoria = categoria;

    //monto
   if (monto === undefined || monto === null || monto === '') {
        throw new Error('❌ Monto Obligatorio');
    }
    if (typeof monto !== 'number' || isNaN(monto)) {
            throw new Error('❌ Monto debe de ser un número');
    }
    if (monto <= 0) {
        throw new Error('⚠️ Monto base debe ser mayor a 0');
    }
    if (monto >99999999.99) {
        throw new Error('⚠️ Monto base excede el máximo permitido.');
    }
    this.#monto = monto;

        //fecha
        if (!fecha) {
            throw new Error('❌ La fecha debe ser obligatorio');
        }
        if (!(fecha instanceof Date) || isNaN(fecha)) {
            throw new Error('❌ La fecha de pago debe ser una fecha válida');
        }
        this.#fecha = fecha;

    //descripcion
    if (descripcion !== undefined && descripcion !== null && descripcion !== '') {
        if (typeof descripcion !== 'string') {
            throw new Error('❌ Descripción inválido.');
        }
        if (descripcion.length > 200) {
            throw new Error('❌ Descripcion no puede exceder a 200 caracteres.');
        }
    }
    this.#descripcion = descripcion || null;
    }

    asignarId(id) {
        if (this.#id !== undefined) {
            throw new Error('❌ Este pago ya tiene un id asignado.');
        }
        this.#id = id;
    }


    get id(){return this.#id};     
    get contrato_id(){return this.#contrato_id};
    get tipo(){return this.#tipo};
    get categoria(){return this.#categoria};
    get monto(){return this.#monto};
    get fecha(){return this.#fecha};
    get descripcion(){return this.#descripcion};
}
module.exports = Pago;