class Cliente{
    #id;
    #nombre;
    #apellido;
    #email;
    #telefono;
    #fecha_nacimiento;
    #fecha_registro;
    #estado;

    constructor(nombre, apellido, email, telefono, fecha_nacimiento, estado) {
    //nombre
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        throw new Error('❌ El nombre es obligatorio y debe ser texto');
    }
    if (nombre.length > 80) {
        throw new Error('❌ El nombre no puede superar 80 caracteres');
    }
    this.#nombre = nombre;



    //apellido
    if (!apellido || typeof apellido !== 'string' || apellido.trim() === '') {
        throw new Error('❌ El apellido es obligatorio y debe ser texto');
    }
    if (apellido.length > 80) {
        throw new Error('❌ El apellido no puede superar 80 caracteres');
    }
    this.#apellido = apellido;


    //correo/email
    if (!email || typeof email !== 'string' || email.trim() === '') {
        throw new Error('❌ El correo es obligatorio');
    }
    if (email.length > 120) {
        throw new Error('❌ El correo no puede superar 120 caracteres');
    }

    const formatoEmailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !formatoEmailValido.test(email)) {
        throw new Error('❌ El email no tiene un formato válido ❌');
    }
    this.#email = email;

    
    //telefono
    if (telefono !== undefined && telefono !== null && telefono !== '') {
        if (typeof telefono !== 'string') {
            throw new Error('❌ Número de Teléfono inválido');
        }
        if (telefono.length > 20) {
            throw new Error('❌ El número telefónico no debe ser mayor a 20 dígitos');
        }
    }
    this.#telefono = telefono || null;


    //nacimiento:
    if (!fecha_nacimiento || !(fecha_nacimiento instanceof Date) || isNaN(fecha_nacimiento)) {
        throw new Error('❌ La fecha de nacimiento debe ser una fecha válida');
    }

    const edadMinima = new Date();
    edadMinima.setFullYear(edadMinima.getFullYear() - 12);
    const edadMaxima = new Date();
    edadMaxima.setFullYear(edadMaxima.getFullYear() - 100);
    if (fecha_nacimiento > edadMinima || fecha_nacimiento < edadMaxima) {
        throw new Error('⚠️ La edad del cliente debe estar entre 12 y 100 años');
    }
    this.#fecha_nacimiento = fecha_nacimiento;

    //estado
    const estadosValidos = ['activo', 'inactivo'];
    if (estado && !estadosValidos.includes(estado)) {
        throw new Error('❌ El estado debe ser "activo" o "inactivo"');
    }
    this.#estado = estado || 'activo';
    }

    asignarId(id) {
        if (this.#id !== undefined) {
            throw new Error('❌ Este cliente ya tiene un id asignado');
        }
        this.#id = id;
    }

    asignarFechaRegistro(fecha) {
        if (this.#fecha_registro !== undefined) {
            throw new Error('❌ Este cliente ya tiene fecha de registro asignada');
        }
        this.#fecha_registro = fecha;
}

    get id(){return this.#id};     
    get nombre(){return this.#nombre};
    get apellido(){return this.#apellido};
    get email(){return this.#email};
    get telefono(){return this.#telefono};
    get fecha_nacimiento(){return this.#fecha_nacimiento};
    get fecha_registro(){return this.#fecha_registro};
    get estado(){return this.#estado};
}