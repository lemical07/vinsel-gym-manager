const inquirer = require('inquirer');
const chalk = require('chalk');
const SeguimientoService = require('../services/SeguimientoService.js');
const {crearHipervinculo } = require('../utils/consola.js');

function mostrarBanner() {
    console.log(chalk.magenta('═'.repeat(40)));
    console.log(chalk.magenta.bold('>>>>> SEGUIMIENTO FÍSICO DEL CLIENTE <<<<<'));
    console.log(chalk.magenta('═'.repeat(40)));
}

async function pausar() {
    await inquirer.prompt([
        { type: 'input', name: 'continuar', message: '\nPresioná Enter para continuar...' },
    ]);
}

async function menuSeguimiento() {
    console.clear();
    mostrarBanner();

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '+ Registrar Avance Semanal', value: 'crear' },
                { name: '≡ Ver Progreso del Cliente', value: 'listar' },
                { name: 'x Eliminar Registro', value: 'eliminar' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        },
    ]);

    switch (opcion) {
        case 'crear':
            await crearSeguimiento();
            break;
        case 'listar':
            await listarSeguimiento();
            break;
        case 'eliminar':
            await eliminarSeguimiento();
            break;
        case 'volver':
            return;
    }
    await menuSeguimiento();
}

async function crearSeguimiento() {
    try {
        const datos = await inquirer.prompt([
            { type: 'input', name: 'cliente_plan_id', message: 'Id de la asignación (cliente-plan):' },
            { type: 'input', name: 'fecha', message: 'Fecha del registro (YYYY-MM-DD):' },
            { type: 'input', name: 'peso_kg', message: 'Peso (kg):' },
            { type: 'input', name: 'grasa_corporal', message: 'Grasa corporal % (opcional, Enter para omitir):' },
            { type: 'input', name: 'medidas', message: 'Medidas (opcional, ej. "cintura: 80cm"):' },
            { type: 'input', name: 'foto_ruta', message: 'Ruta de la foto (opcional):' },
            { type: 'input', name: 'comentarios', message: 'Comentarios (opcional):' },
        ]);

        const datosConvertidos = {
            cliente_plan_id: Number(datos.cliente_plan_id),
            fecha: datos.fecha,
            peso_kg: Number(datos.peso_kg),
            grasa_corporal: datos.grasa_corporal ? Number(datos.grasa_corporal) : null,
            medidas: datos.medidas || null,
            foto_ruta: datos.foto_ruta || null,
            comentarios: datos.comentarios || null,
        };

        const registro = await SeguimientoService.crear(datosConvertidos);
        console.log(chalk.green(`\n✅ Registro de seguimiento creado con id ${registro.id}`));
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

async function listarSeguimiento() {
    try {
        const { cliente_plan_id } = await inquirer.prompt([
            { type: 'input', name: 'cliente_plan_id', message: 'Id de la asignación (cliente-plan) a consultar:' },
        ]);

        const registros = await SeguimientoService.listarPorClientePlan(Number(cliente_plan_id));

        if (registros.length === 0) {
            console.log(chalk.yellow('⚠️  Esta asignación aún no tiene registros de seguimiento'));
        } else {
            console.table(
                registros.map((r) => ({
                    id_seguimiento_fisico: r.id,
                    fecha: r.fecha,
                    peso_kg: r.peso_kg,
                    grasa_corporal: r.grasa_corporal ?? '-',
                    medidas: r.medidas ?? '-',
                    comentarios: r.comentarios ?? '-',
                })),
            );
            console.log(chalk.cyan('\nEnlace:'));
            registros.forEach((registro) => {
                if (registro.foto_ruta) {
                    console.log(`  ${crearHipervinculo(`📷 Foto del registro ${registro.id}`, registro.foto_ruta)}`);
                }
            });
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

async function eliminarSeguimiento() {
    try {
        const { id, confirmar } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'Id del registro a eliminar:' },
            { type: 'confirm', name: 'confirmar', message: '¿Confirmás la eliminación?', default: false },
        ]);
        if (!confirmar) {
            console.log(chalk.yellow('⚠️  Eliminación cancelada'));
        } else {
            const resultado = await SeguimientoService.eliminar(Number(id));
            console.log(chalk.green(`\n✅ ${resultado.mensaje}`));
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

module.exports = menuSeguimiento;