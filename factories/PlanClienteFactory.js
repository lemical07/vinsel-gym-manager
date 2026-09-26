const ClientePlan = require('../models/ClientePlan.js');

class ClientePlanFactory {
  static crear(datosCrudos) {
    const {
        cliente_id, 
        plan_id, 
        fecha_asignacion, 
        estado
    } = datosCrudos;
    
    return new ClientePlan(
        cliente_id, 
        plan_id, 
        fecha_asignacion, 
        estado
    );
  }
}

module.exports = ClientePlanFactory;