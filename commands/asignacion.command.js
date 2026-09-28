const inquirer = require('inquirer');
const chalk = require('chalk');
const AsignacionService = require('../services/AsignacionService.js');

function mostrarBanner() {
    console.log(chalk.cyan('═'.repeat(40)));
    console.log(chalk.cyan.bold('>>>>> GESTIÓN DE PLAN DEL CLIENTE <<<<<'));
    console.log(chalk.cyan('═'.repeat(40)));
}

async function pausar() {
    await inquirer.prompt([
        { type: 'input', name: 'continuar', message: '\nPresioná Enter para continuar...' },
    ]);
}

async function menuAsignacion() {
    console.clear();
    mostrarBanner();

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '+ Crear Asignación de Plan', value: 'crear' },
                { name: '≡ Listar Asignaciones', value: 'listar' },
                { name: 'x Cancelar Plan de Cliente', value: 'cancelar' },
                { name: '↻ Renovar Plan de Cliente', value: 'renovar' },
                { name: '✔ Finalizar Plan de Cliente', value: 'finalizar' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        },
    ]);

    switch (opcion) {
        case 'crear':
            await crearAsignacion();
            break;
        case 'listar':
            await listarAsignacion();
            break;
        case 'cancelar':
            await cancelarPlan();
        case 'renovar':
            await renovarPlan();
        case 'finalizar':
            await finalizarPlan();        
            break;
        case 'volver':
            return;
    }
    await menuAsignacion();
}

async function crearAsignacion() {
    try {
        console.log(chalk.cyan('\n--- Datos de la asignación ---'));
        const datosPlanCliente = await inquirer.prompt([
            { type: 'input', name: 'cliente_id', message: 'Id del Cliente:' },
            { type: 'input', name: 'plan_id', message: 'Id del Plan de Entrenamiento:' },
        ]);

        console.log(chalk.cyan('\n--- A continuación, complete los datos del contrato ---'));
        const datosContrato = await inquirer.prompt([
            { type: 'input', name: 'condiciones', message: 'Condiciones del contrato:' },
            { type: 'input', name: 'duracion_semanas', message: 'Duración en semanas:' },
            { type: 'input', name: 'precio', message: 'Precio del contrato:' },
            { type: 'input', name: 'fecha_inicio', message: 'Fecha de inicio (YYYY-MM-DD):' },
            { type: 'input', name: 'fecha_fin', message: 'Fecha de fin (YYYY-MM-DD):' },
        ]);

        const datosAsignacion = {
            cliente_id: Number(datosPlanCliente.cliente_id),
            plan_id: Number(datosPlanCliente.plan_id),
        };

        const datosContratoConvertidos = {
            condiciones: datosContrato.condiciones,
            duracion_semanas: Number(datosContrato.duracion_semanas),
            precio: Number(datosContrato.precio),
            fecha_inicio: datosContrato.fecha_inicio,
            fecha_fin: datosContrato.fecha_fin,
        };

        const resultado = await AsignacionService.asignarPlan(datosAsignacion, datosContratoConvertidos);

        console.log(chalk.green(`\n✅ Asignación creada con id ${resultado.clientePlan.id}`));
        console.log(chalk.green(`✅ Contrato generado automáticamente con id ${resultado.contrato.id}`));
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

async function listarAsignacion() {
    try {
        const asignaciones = await AsignacionService.listar();

        if (asignaciones.length === 0) {
            console.log(chalk.yellow('⚠️  Aún no se ha registrado ninguna asignación...'));
        } else {
            console.table(
                asignaciones.map((asignacion) => ({
                    id: asignacion.id,
                    cliente_id: asignacion.cliente_id,
                    plan_id: asignacion.plan_id,
                    estado: asignacion.estado,
                    contrato_id: asignacion.contrato ? asignacion.contrato.id : 'sin contrato',
                    precio: asignacion.contrato ? asignacion.contrato.precio : '-',
                })),
            );
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}
async function cancelarPlan() {
    try {
        const { id, confirmar } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'ID de la asignación a cancelar:' },
            { type: 'confirm', name: 'confirmar', message: '¿Confirmás la cancelación?', default: false },
        ]);
        if (!confirmar) {
            console.log(chalk.yellow('⚠️  Cancelación abortada'));
        } else {
            const resultado = await AsignacionService.cancelar(Number(id));
            console.log(chalk.green(`\n✅ ${resultado.mensaje}`));
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}
async function renovarPlan() {
    try {
        const { id } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'ID de la asignación a renovar:' },
        ]);

        console.log(chalk.cyan('\n--- Datos del nuevo contrato ---'));
        const datosContrato = await inquirer.prompt([
            { type: 'input', name: 'condiciones', message: 'Condiciones del nuevo contrato:' },
            { type: 'input', name: 'duracion_semanas', message: 'Duración en semanas:' },
            { type: 'input', name: 'precio', message: 'Precio del nuevo contrato:' },
            { type: 'input', name: 'fecha_inicio', message: 'Fecha de inicio (YYYY-MM-DD):' },
            { type: 'input', name: 'fecha_fin', message: 'Fecha de fin (YYYY-MM-DD):' },
        ]);

        const datosConvertidos = {
            condiciones: datosContrato.condiciones,
            duracion_semanas: Number(datosContrato.duracion_semanas),
            precio: Number(datosContrato.precio),
            fecha_inicio: datosContrato.fecha_inicio,
            fecha_fin: datosContrato.fecha_fin,
        };

        const resultado = await AsignacionService.renovar(Number(id), datosConvertidos);
        console.log(chalk.green(`\n✅ ${resultado.mensaje}, nuevo contrato id ${resultado.contratoNuevo.id}`));
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}
async function finalizarPlan() {
    try {
        const { id, confirmar } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'ID de la asignación a finalizar:' },
            { type: 'confirm', name: 'confirmar', message: '¿Confirmás que el plan llegó a su fin?', default: false },
        ]);
        if (!confirmar) {
            console.log(chalk.yellow('⚠️  Finalización abortada'));
        } else {
            const resultado = await AsignacionService.finalizar(Number(id));
            console.log(chalk.green(`\n✅ ${resultado.mensaje}`));
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

module.exports = menuAsignacion;