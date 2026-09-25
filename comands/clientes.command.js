const inquirer = require('inquirer');
const ClienteService = require('../services/ClienteService');

async function menuClientes() {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Gestión de Clientes:',
      choices: [
        { name: 'Crear cliente', value: 'crear' },
        { name: 'Listar clientes', value: 'listar' },
        { name: 'Actualizar cliente', value: 'actualizar' },
        { name: 'Eliminar cliente', value: 'eliminar' },
        { name: 'Volver', value: 'volver' },
      ],
    },
  ]);

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

    console.log(`✅ Cliente creado con id ${cliente.id}: ${cliente.nombre} ${cliente.apellido}`);

    } catch (error) {
        console.log(error.message);
  }

    async function listarClientes() {
        try {
            const clientes = await ClienteService.listar();

        if (clientes.length === 0) {
            console.log('⚠️ No hay clientes registrados');
            return;
        }

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
    } catch (error) {
        console.log(error.message);
        }
    }


    async function actualizarCliente() {
        try {
            const { id } = await inquirer.prompt([
                { type: 'input', name: 'id', message: 'ID del cliente a actualizar:' },
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
    }


    async function eliminarCliente() {
        try {
            const { id, confirmar } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'ID del cliente a eliminar:' },
            { type: 'confirm', name: 'confirmar', message: '¿Confirmás la eliminación?', default: false },
        ]);

        if (!confirmar) {
            console.log('⚠️ Eliminación cancelada');
            return;
        }
        await ClienteService.eliminar(Number(id));
        console.log(`✅ Cliente ${id} eliminado correctamente`);
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = menuClientes;