const fs = require('fs/promises');
const path = require('path');
const ExportacionRepository = require('../repositories/ExportacionRepository.js');
const { crearNombreArchivo, crearProgreso } = require('../utils/progreso.js');

const exportacionRepository = new ExportacionRepository();

class ExportacionService {
    static async exportarProgresoCliente(cliente) {
        if (!cliente || !Number.isInteger(cliente.id) || cliente.id <= 0) {
            throw new Error('Se requiere un cliente válido para exportar su progreso.');
        }

        const datos = await exportacionRepository.obtenerDatosCliente(cliente.id);
        const carpeta = path.resolve(__dirname, '..', 'exports');
        const archivo = path.join(carpeta, crearNombreArchivo(cliente));

        await fs.mkdir(carpeta, { recursive: true });
        await fs.writeFile(archivo, JSON.stringify(crearProgreso(cliente, datos), null, 2), 'utf8');
        return archivo;
    }
}

module.exports = ExportacionService;
