const inquirer = require('inquirer');
const chalk = require('chalk');
const ClienteService = require('../services/ClienteService.js');

function mostrarBanner() {
    console.log(chalk.green('═'.repeat(40)));
    console.log(chalk.green.bold('     >>>>> GESTIÓN DE CLIENTE <<<<<     '));
    console.log(chalk.green('═'.repeat(40)));
}

async function menuClientes() {
    console.clear();
    mostrarBanner();

    const { opcion } = await inquirer.prompt([{
        type: 'list',
        name: 'opcion',
        message: 'Seleccioná una opción:',
        choices: [
            { name: '+ Crear cliente', value: 'crear' },
            { name: '≡ Listar clientes', value: 'listar' },
            { name: '✎ Actualizar cliente', value: 'actualizar' },
            { name: 'x Eliminar cliente', value: 'eliminar' },
            new inquirer.Separator(),
            { name: '⬅️  Volver', value: 'volver' },
        ],
    },]);

    switch (opcion) {
        case 'crear':
            await crearCliente();
                break;
        case 'listar':
            await listarClientes();
            break;
        case 'actualizar':
            await actualizarCliente();
            break;
        case 'eliminar':
            await eliminarCliente();
            break;
        case 'volver':
            return;
    }
    await menuClientes();
}

async function pausar() {
  await inquirer.prompt([{ type: 'input', name: 'continuar', message: '\nPresioná Enter para continuar...' }]);
}


async function crearCliente() {
    try {
        const datosCrudos = await inquirer.prompt([
            { type: 'input', name: 'nombre', message: 'Nombre:' },
            { type: 'input', name: 'apellido', message: 'Apellido:' },
            { type: 'input', name: 'email', message: 'Email:' },
            { type: 'input', name: 'telefono', message: 'Teléfono (opcional):' },
            { type: 'input', name: 'fecha_nacimiento', message: 'Fecha de nacimiento (YYYY-MM-DD):' },
        ]);

    const cliente = await ClienteService.crear(datosCrudos);

    console.log(`\n ✅ Cliente creado con id ${cliente.id}: ${cliente.nombre} ${cliente.apellido}`);

    } catch (error) {
        console.log(error.message);
  }
  await pausar();
}

async function listarClientes() {
        try {
            const clientes = await ClienteService.listar();

        if (clientes.length === 0) {
            console.log('⚠️  No se encontraron Clientes registrados...');
        }
        else{
            console.table(
                clientes.map((c) => ({
                    id: c.id,
                    nombre: c.nombre,
                    apellido: c.apellido,
                    email: c.email,
                    telefono: c.telefono,
                    estado: c.estado,
                })),
            );
        }
    } catch (error) {
        console.log(error.message);
        }
    await pausar();
}


async function actualizarCliente() {
    try {
        const { id } = await inquirer.prompt([
            { type: 'input', name: 'id', message: '\nID del cliente a actualizar:' },
        ]);
    const datosCrudos = await inquirer.prompt([
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'apellido', message: 'Apellido:' },
        { type: 'input', name: 'email', message: 'Email:' },
        { type: 'input', name: 'telefono', message: 'Teléfono (opcional):' },
        { type: 'input', name: 'fecha_nacimiento', message: 'Fecha de nacimiento (YYYY-MM-DD):' },
    ]);
    const clienteActualizado = await ClienteService.actualizar(Number(id), datosCrudos);
    console.log(`✅ Cliente ${clienteActualizado.id} actualizado correctamente`);
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}


async function eliminarCliente() {
    try {
        const { id, confirmar } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'ID del cliente a eliminar:' },
            { type: 'confirm', name: 'confirmar', message: '¿Confirmás la eliminación?', default: false },
        ]);
        if (!confirmar) {
            console.log('⚠️  Eliminación cancelada');
        }
        else{
            await ClienteService.eliminar(Number(id));
            console.log(`\n✅ Cliente ${id} eliminado correctamente`);
        }
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}

module.exports = menuClientes;