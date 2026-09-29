const inquirer = require('inquirer');
const chalk = require('chalk');
const NutricionService = require('../services/NutricionService.js');
const { formatearFecha } = require('../utils/fecha.js');

function mostrarBanner() {
    console.log(chalk.cyan('═'.repeat(40)));
    console.log(chalk.cyan.bold('     >>>>> GESTIÓN DE NUTRICIÓN <<<<<     '));
    console.log(chalk.cyan('═'.repeat(40)));
}

async function pausar() {
    await inquirer.prompt([{ type: 'input', name: 'continuar', message: '\nPresioná Enter para continuar...' }]);
}

async function menuNutricion() {
    while (true) {
        console.clear();
        mostrarBanner();

        const { opcion } = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '+ Crear', value: 'crear' },
                { name: '≡ Listar', value: 'listar' },
                { name: '✎ Editar alimento', value: 'editar' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        }]);

        if (opcion === 'volver') return;

        switch (opcion) {
            case 'crear':  await menuCrear();  break;
            case 'listar': await menuListar(); break;
            case 'editar': await editarAlimento(); break;
        }
    }
}


async function menuCrear() {
    while (true) {
        console.clear();
        const { opcion } = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '+ Crear plan de alimentación', value: 'plan' },
                { name: '+ Registrar alimento', value: 'alimento' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        }]);

        if (opcion === 'volver') return;

        switch (opcion) {
            case 'plan':     await crearPlan();     break;
            case 'alimento': await registrarAlimento(); break;
        }
    }
}

async function crearPlan() {
    try {
        const datos = await inquirer.prompt([
            { type: 'input', name: 'cliente_plan_id', message: 'Id de la asignación (cliente-plan):' },
            { type: 'input', name: 'nombre', message: 'Nombre del plan de alimentación:' },
            { type: 'input', name: 'meta_calorica', message: 'Meta calórica diaria:' },
            { type: 'input', name: 'fecha_inicio', message: 'Fecha de inicio :' },
            { type: 'input', name: 'fecha_fin', message: 'Fecha de fin :' },
        ]);

        const plan = await NutricionService.crearPlan({
            cliente_plan_id: Number(datos.cliente_plan_id),
            nombre: datos.nombre,
            meta_calorica: datos.meta_calorica ? Number(datos.meta_calorica) : null,
            fecha_inicio: datos.fecha_inicio,
            fecha_fin: datos.fecha_fin || null,
        });
        console.log(chalk.green(`\n✅ Plan de alimentación creado con id ${plan.id}`));
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

async function registrarAlimento() {
    try {
        const datos = await inquirer.prompt([
            { type: 'input', name: 'plan_nutricion_id', message: 'Id del plan de alimentación:' },
            { type: 'input', name: 'fecha', message: 'Fecha:' },
            { type: 'input', name: 'nombre_alimento', message: 'Nombre del alimento:' },
            { type: 'input', name: 'calorias', message: 'Calorías:' },
            { type: 'input', name: 'peso_kg', message: 'Peso en Kg:' },
        ]);

        const alimento = await NutricionService.registrarAlimento({
            plan_nutricion_id: Number(datos.plan_nutricion_id),
            fecha: datos.fecha,
            nombre_alimento: datos.nombre_alimento,
            calorias: Number(datos.calorias),
            peso_kg: Number(datos.peso_kg),
        });
        console.log(chalk.green(`\n✅ Alimento registrado con id ${alimento.id}`));
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

async function menuListar() {
    while (true) {
        console.clear();
        const { opcion } = await inquirer.prompt([{
            type: 'list',
            name: 'opcion',
            message: 'Seleccioná una opción:',
            choices: [
                { name: '≡ Ver planes de alimentación', value: 'planes' },
                { name: '≡ Ver alimentos y reporte de calorías', value: 'reporte' },
                new inquirer.Separator(),
                { name: '⬅️  Volver', value: 'volver' },
            ],
        }]);

        if (opcion === 'volver') return;

        switch (opcion) {
            case 'planes':  await listarPlanes();  break;
            case 'reporte': await reporteSemanal(); break;
        }
    }
}

async function listarPlanes() {
    try {
        const planes = await NutricionService.listarPlanes();

        if (planes.length === 0) {
            console.log(chalk.yellow('⚠️  Aún no hay planes de alimentación registrados'));
        } else {
            console.table(planes.map((p) => ({
                id: p.id,
                cliente_plan_id: p.cliente_plan_id,
                nombre: p.nombre,
                meta_calorica: p.meta_calorica ?? '-',
                fecha_inicio:formatearFecha(p.fecha_inicio),
                fecha_fin: formatearFecha(p.fecha_fin ?? '-'),
            })));
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

async function reporteSemanal() {
    try {
        const { plan_nutricion_id } = await inquirer.prompt([
            { type: 'input', name: 'plan_nutricion_id', message: 'Id del plan de alimentación a consultar:' },
        ]);
        const { alimentos, totalCalorias } = await NutricionService.reporteSemanal(Number(plan_nutricion_id));

        if (alimentos.length === 0) {
            console.log(chalk.yellow('⚠️  Este plan aún no tiene alimentos registrados'));
        } else {
            console.table(alimentos.map((a) => ({ id: a.id, fecha: a.fecha, alimento: a.nombre_alimento, calorias: a.calorias })));
            console.log(chalk.cyan(`\nTotal de calorías registradas: ${totalCalorias}`));
        }
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}


async function editarAlimento() {
    try {
        const { id } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'Id del alimento a editar:' },
        ]);

        const alimento = await NutricionService.buscarAlimentoPorId(Number(id));
        const fechaActual = alimento.fecha instanceof Date
            ? alimento.fecha.toISOString().slice(0, 10)
            : String(alimento.fecha).slice(0, 10);

        const datos = await inquirer.prompt([
            { type: 'input', name: 'fecha', message: 'Fecha:', default: fechaActual },
            { type: 'input', name: 'nombre_alimento', message: 'Nombre del alimento:', default: alimento.nombre_alimento },
            { type: 'input', name: 'calorias', message: 'Calorías:', default: String(alimento.calorias) },
        ]);

        const actualizado = await NutricionService.actualizarAlimento(Number(id), {
            fecha: datos.fecha,
            nombre_alimento: datos.nombre_alimento,
            calorias: Number(datos.calorias),
        });
        console.log(chalk.green(`\n✅ Alimento actualizado correctamente`));
    } catch (error) {
        console.log(chalk.red(error.message));
    }
    await pausar();
}

module.exports = menuNutricion;