const inquirer = require('inquirer');
const chalk = require('chalk');
const PlanService = require('../services/PlanService.js');

function mostrarBanner() {
    console.log(chalk.cyan('═'.repeat(40)));
    console.log(chalk.cyan.bold('    >>>>> PLAN DE ENTRENAMIENTO <<<<<    '));
    console.log(chalk.cyan('═'.repeat(40)));
}

async function menuPlanEntrenamiento() {
    console.clear();
    mostrarBanner();

    const { opcion } = await inquirer.prompt([{
        type: 'list',
        name: 'opcion',
        message: 'Seleccioná una opción:',
        choices: [
            { name: '+ Crear Plan de Entrenamiento', value: 'crear' },
            { name: '≡ Listar Plan de Entrenamiento', value: 'listar' },
            { name: '✎ Actualizar Plan de Entrenamiento', value: 'actualizar' },
            { name: 'x Eliminar Plan de Entrenamiento', value: 'eliminar' },
            new inquirer.Separator(),
            { name: '⬅️  Volver', value: 'volver' },
        ],
    },]);

    switch (opcion) {
        case 'crear':
            await crearPlanEntrenamiento();
                break;
        case 'listar':
            await listarPlanEntrenamiento();
            break;
        case 'actualizar':
            await actualizarPlanEntrenamiento();
            break;
        case 'eliminar':
            await eliminarPlanEntrenamiento();
            break;
        case 'volver':
            return;
    }
    await menuPlanEntrenamiento();
}

async function pausar() {
  await inquirer.prompt([{ type: 'input', name: 'continuar', message: '\nPresioná Enter para continuar...' }]);
}


async function crearPlanEntrenamiento() {
    try {
        const datosCrudos = await inquirer.prompt([
            { type: 'input', name: 'nombre', message: 'Nombre:' },
            { type: 'input', name: 'duracion_semanas', message: 'Duración Semanal:' },
            { type: 'input', name: 'meta_fisica', message: 'Meta Física:' },
            { type: 'input', name: 'nivel', message: 'Nivel:' },
            { type: 'input', name: 'precio_base', message: 'Precio Base:' },
        ]);

    const plan = await PlanService.crear(datosCrudos);

    console.log(`\n ✅ Plan de Entrenamiento creado con id ${plan.id}: ${plan.nombre} ${plan.nivel}`);

    } catch (error) {
        console.log(error.message);
  }
  await pausar();
}
async function listarPlanEntrenamiento() {
        try {
            const planes = await PlanService.listar();

        if (planes.length === 0) {
            console.log('⚠️  No se encontraron Planes de Entrenamiento en el registro...');
        }
        else{
            console.clear();
            console.table(
                planes.map((pe) => ({
                    id: pe.id,
                    nombre: pe.nombre,
                    duracion_semanas: pe.duracion_semanas,
                    meta_fisica: pe.meta_fisica,
                    nivel: pe.nivel,
                    precio_base: pe.precio_base,
                    estado: pe.estado,
                })),
            );
        }
    } catch (error) {
        console.log(error.message);
        }
    await pausar();
}

async function actualizarPlanEntrenamiento() {
    try {
        const { id } = await inquirer.prompt([
            { 
                type: 'input', 
                name: 'id', 
                message: 'ID del Plan a actualizar:' },
        ]);
    const datosCrudos = await inquirer.prompt([
        { type: 'input', name: 'nombre', message: 'Nombre:' },
        { type: 'input', name: 'duracion_semanas', message: 'Duración Semanal:' },
        { type: 'input', name: 'meta_fisica', message: 'Meta Física:' },
        { type: 'input', name: 'nivel', message: 'Nivel:' },
        { type: 'input', name: 'precio_base', message: 'Precio Base:' },
    ]);
    const planEntrenamientoActualizado = await PlanService.actualizar(Number(id), datosCrudos);
    console.log(`✅ Plan de Entrenamiento ${planEntrenamientoActualizado.id} actualizado correctamente...`);
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}



async function eliminarPlanEntrenamiento() {
    try {
        const { id, confirmar } = await inquirer.prompt([
            { 
                type: 'input', 
                name: 'id', 
                message: 'ID del Plan a eliminar:' 
            },
            { 
                type: 'confirm', 
                name: 'confirmar', 
                message: '¿Confirmás la eliminación?', 
                default: false 
            },
        ]);
        if (!confirmar) {
            console.log('⚠️  Eliminación cancelada');
        }
        else{
            await PlanService.eliminar(Number(id));
            console.log(`\n✅ Plan con id ${id} eliminado correctamente`);
        }
    } catch (error) {
        console.log(error.message);
    }
    await pausar();
}

module.exports = menuPlanEntrenamiento;