const inquirer = require('inquirer');
const chalk = require('chalk');
const ClienteService = require('../services/ClienteService.js');
const ExportacionService = require('../services/ExportacionService.js');

async function exportarProgreso() {
    try {
        const { busqueda } = await inquirer.prompt([{
            type: 'input',
            name: 'busqueda',
            message: 'Ingrese el ID o nombre del cliente:',
            validate: (valor) => valor.trim() !== '' || 'Ingrese un ID o nombre.',
        }]);

        console.log(chalk.cyan('Buscando cliente...'));

        let cliente;
        if (/^\d+$/.test(busqueda.trim())) {
            cliente = await ClienteService.buscarPorId(Number(busqueda));
        } else {
            const clientes = await ClienteService.buscarPorNombreParcial(busqueda.trim());

            if (clientes.length === 0) {
                throw new Error(`No se encontró el cliente "${busqueda.trim()}".`);
            }

            if (clientes.length === 1) {
                cliente = clientes[0];
            } else {
                const { id } = await inquirer.prompt([{
                    type: 'list',
                    name: 'id',
                    message: 'Seleccione el cliente:',
                    choices: clientes.map((persona) => ({
                        name: `${persona.nombre} ${persona.apellido} (ID ${persona.id})`,
                        value: persona.id,
                    })),
                }]);
                cliente = clientes.find((persona) => persona.id === id);
            }
        }

        console.log(chalk.cyan(`Exportando el progreso de ${cliente.nombre} ${cliente.apellido}...`));
        const archivo = await ExportacionService.exportarProgresoCliente(cliente);
        console.log(chalk.green(`Respaldo guardado en: ${archivo}`));
    } catch (error) {
        console.error(chalk.red(`No se pudo exportar el progreso: ${error.message}`));
    }
}

module.exports = exportarProgreso;
