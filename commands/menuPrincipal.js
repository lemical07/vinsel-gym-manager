const inquirer = require('inquirer');
const chalk = require('chalk');
const menuClientes = require('./clientes.command');
const menuPlanEntrenamiento = require('./planes.command.js');
const menuAsignacion = require('./asignacion.command.js');
const menuSeguimiento = require('./seguimiento.command.js');
const menuFinanzas = require('./pago.command.js');
const menuNutricion = require('./nutricion.command.js');

function mostrarBanner() {
  console.log(chalk.cyan('═'.repeat(40)));
  console.log(chalk.cyan.bold('>>>>>> 🏋️  VINSEL GYM MANAGER  🏋️  <<<<<<'));
  console.log(chalk.cyan('═'.repeat(40)));
}

function despedida() {
  console.log(chalk.greenBright('═'.repeat(40)));
  console.log(chalk.cyan.greenBright('    >>>>>  🏋️  HASTA LUEGO  🏋️  <<<<<    '));
  console.log(chalk.cyan.greenBright('>>>>>> 🏋️  VINSEL GYM MANAGER  🏋️  <<<<<<'));
  console.log(chalk.greenBright('═'.repeat(40)));
}


async function menuPrincipal() {
    console.clear();
    mostrarBanner();
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Seleccione una Opción:',
      pageSize: 15,
      choices: [
        new inquirer.Separator(),
        { name: 'Gestión de Clientes', value: 'clientes' },
        new inquirer.Separator(),
        { name: 'Gestión de Plan de Entrenamiento', value: 'plan' },
        new inquirer.Separator(),
        { name: 'Gestión de Asignación', value: 'asignacion' },
        new inquirer.Separator(),
        { name: 'Gestión de Seguimiento', value: 'seguimiento' },
        new inquirer.Separator(),
        { name: 'Gestión de Finanzas', value: 'finanzas' },
        new inquirer.Separator(),
        { name: 'Gestión de Nutrición', value: 'nutricion' },
        new inquirer.Separator(),
        { name: 'Salir', value: 'salir' },
      ],
    },
  ]);

  switch (opcion) {
    case 'clientes':
      await menuClientes();
      break;
    case 'plan':
      await menuPlanEntrenamiento();
      break;
    case 'asignacion':
      await menuAsignacion();
      break;
    case 'seguimiento':
      await menuSeguimiento();
      break;
    case 'finanzas':
      await menuFinanzas();
      break;
    case 'nutricion':
      await menuNutricion();
      break;
    case 'salir':
      console.clear();
      despedida();
      process.exit(0);
  }
  await menuPrincipal();
}

module.exports = menuPrincipal;