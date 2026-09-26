class Contratos{
    #id;
    #clientePlan_id;
    #condiciones;
    #duracion_semanas;
    #precio;
    #fecha_inicio;
    #fecha_fin;
    #estado;

    constructor(clientePlan_id, condiciones, duracion_semanas, precio, fecha_inicio, fecha_fin, estado){
        if (!clientePlan_id || typeof clientePlan_id !== 'number' || !Number.isInteger(clientePlan_id)) {
         throw new Error('❌ El id del cliente es obligatorio y debe ser un número entero');
        }
        if (clientePlan_id <= 0) {
            throw new Error('❌ El id del cliente debe ser un número positivo');
        }
        this.#clientePlan_id = clientePlan_id;

        //condiciones:
        if(condiciones !== undefined && condiciones !== null && condiciones !== ''){
            if(typeof condiciones !== 'string' || condiciones.trim() === ''){
                throw new Error('❌ Las condiciones debe de ser en texto.');
            }
        }
        this.#condiciones = condiciones;

        // duracion_semana
        if (duracion_semanas === undefined || duracion_semanas === null || duracion_semanas === '') {
            throw new Error('❌ La duración en semanas es obligatoria');
        }
        if (typeof duracion_semanas !== 'number' || !Number.isInteger(duracion_semanas)) {
            throw new Error('❌ La duración en semanas debe ser un número entero');
        }
        if (duracion_semanas <= 0) {
            throw new Error('⚠️ La duración en semanas debe ser mayor a 0');
        }
        this.#duracion_semanas = duracion_semanas;

        //precio
        if (precio === undefined || precio === null || precio === '') {
            throw new Error('❌ El precio base es obligatorio');
        }
        if (typeof precio !== 'number' || isNaN(precio)) {
            throw new Error('❌ El precio base debe ser un número');
        }
        if (precio <= 0) {
            throw new Error('⚠️ El precio base debe ser mayor a 0');
        }
        if (precio > 99999999.99) {
            throw new Error('⚠️ El precio base excede el máximo permitido');
        }
        this.#precio = precio;

        //fecha inicio
        this.#fecha_inicio = fecha_inicio || new Date();

        //fecha fin
        if (!fecha_fin || !(fecha_fin instanceof Date) || isNaN(fecha_fin)) {
            throw new Error('❌ La fecha de la finalización del contrato debe ser una fecha válida');
        }
        if (fecha_fin <= this.#fecha_inicio) {
            throw new Error('⚠️ La fecha de finalización debe ser posterior a la fecha de inicio');
        }
        this.#fecha_fin = fecha_fin;

        //estado
        const estadosValidos = ['activo', 'cancelado', 'finalizado'];
        if (estado && !estadosValidos.includes(estado)) {
            throw new Error('❌ El estado debe ser "activo", "cancelado" o "finalizado"');
        }   
        this.#estado = estado || 'activo';
    }

    asignarId(id) {
        if (this.#id !== undefined) {
            throw new Error('❌ Este Contrato ya tiene un id asignado');
        }
        this.#id = id;
    }   

    get id(){return this.#id};     
    get clientePlan_id(){return this.#clientePlan_id};
    get condiciones(){return this.#condiciones};
    get duracion_semanas(){return this.#duracion_semanas};
    get precio(){return this.#precio};
    get fecha_inicio(){return this.#fecha_inicio};
    get fecha_fin(){return this.#fecha_fin};
    get estado(){return this.#estado};
}
module.exports = Contratos;