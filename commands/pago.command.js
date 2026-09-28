const inquirer = require('inquirer');
const chalk = require('chalk');
const PagoService = require('../services/PagoService.js');
const ClienteService = require('../services/ClienteService.js');

function mostrarBanner() {
    console.log(chalk.green('═'.repeat(40)));
    console.log(chalk.green.bold('     >>>>> GESTIÓN DE FINANZAS <<<<<     '));
    console.log(chalk.green('═'.repeat(40)));
}

async function pausar() {
    await inquirer.prompt([{ type: 'input', name: 'continuar', message: '\nPresioná Enter para continuar...' }]);
}

async function menuFinanzas() {
    while (true) {
        console.clear();
        mostrarBanner();

        const { opcion } = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '+ Registrar pago', value: 'registrar' },
                { name: '≡ Listar pagos', value: 'listar' },
                { name: ' Balance', value: 'balance' },
                { name: '✎ Editar pago', value: 'editar' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        }]);

        if (opcion === 'volver') return;

        switch (opcion) {
            case 'registrar': await menuCrearPago(); break;
            case 'listar':    await menuListarPago(); break;
            case 'balance':   await menuBalance();    break;
            case 'editar':    await menuEditarPago(); break;
        }
    }
}


async function menuCrearPago() {
    while (true) {
        console.clear();
        const { opcion } = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '+ Registrar ingreso', value: 'regIn' },
                { name: '+ Registrar egreso', value: 'regEg' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        }]);

        if (opcion === 'volver') return;

        switch (opcion) {
            case 'regIn': await crearPagoIngreso(); break;
            case 'regEg': await crearPagoEgreso();   break;
        }
    }
}

async function crearPagoIngreso() {
    try {
        const datosCrudos = await inquirer.prompt([
            { type: 'input', name: 'contrato_id', message: 'Id del contrato:' },
            { type: 'input', name: 'categoria', message: 'Categoría:' },
            { type: 'input', name: 'monto', message: 'Monto:' },
            { type: 'input', name: 'fecha', message: 'Fecha (YYYY-MM-DD):' },
            { type: 'input', name: 'descripcion', message: 'Descripción:' },
        ]);

        datosCrudos.tipo = 'ingreso';
        datosCrudos.contrato_id = datosCrudos.contrato_id ? Number(datosCrudos.contrato_id) : null;
        datosCrudos.monto = Number(datosCrudos.monto);

        const ingreso = await PagoService.crear(datosCrudos);
        console.log(`\n✅ Ingreso creado con id ${ingreso.id}: $${ingreso.monto}`);
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}

async function crearPagoEgreso() {
    try {
        const datosCrudos = await inquirer.prompt([
            { type: 'input', name: 'categoria', message: 'Categoría:' },
            { type: 'input', name: 'monto', message: 'Monto:' },
            { type: 'input', name: 'fecha', message: 'Fecha (YYYY-MM-DD):' },
            { type: 'input', name: 'descripcion', message: 'Descripción:' },
        ]);

        datosCrudos.tipo = 'egreso';
        datosCrudos.contrato_id = null;
        datosCrudos.monto = Number(datosCrudos.monto);

        const egreso = await PagoService.crear(datosCrudos);
        console.log(`\n✅ Egreso creado con id ${egreso.id}: $${egreso.monto}`);
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}



async function menuListarPago() {
    while (true) {
        console.clear();
        const { opcion } = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '≡ Ver ingresos', value: 'verIn' },
                { name: '≡ Ver egresos', value: 'verEg' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        }]);

        if (opcion === 'volver') return;

        switch (opcion) {
            case 'verIn': await listarPagoIngreso(); break;
            case 'verEg': await listarPagoEgreso();   break;
        }
    }
}

async function listarPagoIngreso() {
    try {
        const ingresos = await PagoService.listarPorTipo('ingreso');

        if (ingresos.length === 0) {
            console.log('⚠️  No se encontraron ingresos registrados...');
        } else {
            console.table(
                ingresos.map((p) => ({
                    id: p.id,
                    contrato_id: p.contrato_id,
                    categoria: p.categoria,
                    monto: p.monto,
                    fecha: p.fecha instanceof Date
                        ? p.fecha.toISOString().slice(0, 10)
                        : String(p.fecha).slice(0, 10),
                    descripcion: p.descripcion,
                })),
            );
        }
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}

async function listarPagoEgreso() {
    try {
        const egresos = await PagoService.listarPorTipo('egreso');

        if (egresos.length === 0) {
            console.log('⚠️  No se encontraron egresos registrados...');
        } else {
            console.table(
                egresos.map((p) => ({
                    id: p.id,
                    categoria: p.categoria,
                    monto: p.monto,
                    fecha: p.fecha instanceof Date
                        ? p.fecha.toISOString().slice(0, 10)
                        : String(p.fecha).slice(0, 10),
                    descripcion: p.descripcion,
                })),
            );
        }
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}



async function menuBalance() {
    while (true) {
        console.clear();
        const { opcion } = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '✎ Por fecha', value: 'fecha' },
                { name: '✎ Por cliente', value: 'cliente' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        }]);

        if (opcion === 'volver') return;

        switch (opcion) {
            case 'fecha':   await porFecha();  break;
            case 'cliente': await porNombre(); break;
        }
    }
}

async function porFecha() {
    try {
        const { desde, hasta } = await inquirer.prompt([
            { type: 'input', name: 'desde', message: 'Desde (YYYY-MM-DD):' },
            { type: 'input', name: 'hasta', message: 'Hasta (YYYY-MM-DD):' },
        ]);

        const { total_ingresos, total_egresos, balance } = await PagoService.balancePorFechas(desde, hasta);

        console.log(`\nIngresos: ${chalk.green('$' + total_ingresos)}`);
        console.log(`Egresos:  ${chalk.red('$' + total_egresos)}`);
        const colorBalance = balance >= 0 ? chalk.green : chalk.red;
        console.log(`Balance:  ${colorBalance('$' + balance)}`);
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}

async function porNombre() {
    try {
        const { nombre } = await inquirer.prompt([
            { type: 'input', name: 'nombre', message: 'Nombre del cliente:' },
        ]);

        const coincidencias = await ClienteService.buscarPorNombreParcial(nombre);

        if (coincidencias.length === 0) {
            console.log('⚠️  No se encontraron clientes con ese nombre');
        } else {
            let cliente_id;

            if (coincidencias.length === 1) {
                cliente_id = coincidencias[0].id;
            } else {
                const { elegido } = await inquirer.prompt([{
                    type: 'list',
                    name: 'elegido',
                    message: 'Seleccioná el cliente:',
                    choices: coincidencias.map((c) => ({
                        name: `${c.nombre} ${c.apellido}`,
                        value: c.id,
                    })),
                }]);
                cliente_id = elegido;
            }

            const { total_ingresos, total_egresos, balance } = await PagoService.balancePorCliente(cliente_id);

            console.log(`\nIngresos: ${chalk.green('$' + total_ingresos)}`);
            console.log(`Egresos:  ${chalk.red('$' + total_egresos)}`);
            const colorBalance = balance >= 0 ? chalk.green : chalk.red;
            console.log(`Balance:  ${colorBalance('$' + balance)}`);
        }
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}

async function menuEditarPago() {
    while (true) {
        console.clear();
        const { opcion } = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '✎ Editar ingreso', value: 'edIn' },
                { name: '✎ Editar egreso', value: 'edEg' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        }]);

        if (opcion === 'volver') return;

        switch (opcion) {
            case 'edIn': await editarPago('ingreso'); break;
            case 'edEg': await editarPago('egreso');  break;
        }
    }
}

async function editarPago(tipo) {
    try {
        const { id } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'ID del pago a editar:' },
        ]);

        const pago = await PagoService.buscarPorId(Number(id));

        const fechaActual = pago.fecha instanceof Date
            ? pago.fecha.toISOString().slice(0, 10)
            : String(pago.fecha).slice(0, 10);

        const datosCrudos = await inquirer.prompt([
            { type: 'input', name: 'categoria', message: 'Categoría:', default: pago.categoria },
            { type: 'input', name: 'monto', message: 'Monto:', default: String(pago.monto) },
            { type: 'input', name: 'fecha', message: 'Fecha (YYYY-MM-DD):', default: fechaActual },
            { type: 'input', name: 'descripcion', message: 'Descripción:', default: pago.descripcion || '' },
        ]);

        datosCrudos.tipo = tipo;
        datosCrudos.contrato_id = pago.contrato_id;

        const actualizado = await PagoService.actualizar(Number(id), datosCrudos);
        console.log(`\n✅ Pago ${actualizado.id} actualizado correctamente`);
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}

module.exports = menuFinanzas;