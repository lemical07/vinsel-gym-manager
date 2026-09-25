class PlanesEntrenamiento{
    #id;
    #nombre;
    #duracion_semana;
    #meta_fisica;
    #nivel;
    #precio_base;
    #estado;

    constructor(nombre,duracion_semana,meta_fisica,nivel,precio_base,estado){
        //nombre
        if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
            throw new Error('❌ El nombre es obligatorio y debe ser texto');
        }
        if (nombre.length > 80) {
            throw new Error('❌ El nombre no puede superar 80 caracteres');
        }
        this.#nombre = nombre;

        // duracion_semana
        if (duracion_semana === undefined || duracion_semana === null || duracion_semana === '') {
            throw new Error('❌ La duración en semanas es obligatoria');
        }
        if (typeof duracion_semana !== 'number' || !Number.isInteger(duracion_semana)) {
            throw new Error('❌ La duración en semanas debe ser un número entero');
        }
        if (duracion_semana <= 0) {
            throw new Error('⚠️ La duración en semanas debe ser mayor a 0');
        }
        this.#duracion_semana = duracion_semana;

        // meta_fisica
        if (meta_fisica !== undefined && meta_fisica !== null && meta_fisica !== '') {
            if (typeof meta_fisica !== 'string') {
                throw new Error('❌ La meta física debe ser texto');
            }
            if (meta_fisica.length > 150) {
                throw new Error('❌ La meta física no puede superar 150 caracteres');
            }
        }
        this.#meta_fisica = meta_fisica || null;

        // nivel
        const nivelesValidos = ['principiante', 'intermedio', 'avanzado'];

        if (!nivel || typeof nivel !== 'string' || nivel.trim() === '') {
            throw new Error('❌ El nivel es obligatorio y debe ser texto');
        }
        if (!nivelesValidos.includes(nivel)) {
            throw new Error('❌ El nivel debe ser "principiante", "intermedio" o "avanzado"');
        }
        this.#nivel = nivel;

        // precio_base
        if (precio_base === undefined || precio_base === null || precio_base === '') {
            throw new Error('❌ El precio base es obligatorio');
        }
        if (typeof precio_base !== 'number' || isNaN(precio_base)) {
            throw new Error('❌ El precio base debe ser un número');
        }
        if (precio_base <= 0) {
            throw new Error('⚠️ El precio base debe ser mayor a 0');
        }
        if (precio_base > 99999999.99) {
            throw new Error('⚠️ El precio base excede el máximo permitido');
        }
        this.#precio_base = precio_base;

        //estado
        const estadosValidos = ['activo', 'inactivo'];
        if (estado && !estadosValidos.includes(estado)) {
            throw new Error('❌ El estado debe ser "activo" o "inactivo"');
        }
        this.#estado = estado || 'activo';
    }
    asignarId(id) {
        if (this.#id !== undefined) {
            throw new Error('❌ Este plan ya tiene un id asignado');
        }
        this.#id = id;
    }

    get id(){return this.#id};
    get nombre(){return this.#nombre};
    get duracion_semana(){return this.#duracion_semana};
    get meta_fisica(){return this.#meta_fisica};
    get nivel(){return this.#nivel};
    get precio_base(){return this.#precio_base};
    get estado(){return this.#estado};
}
module.exports = PlanesEntrenamiento;