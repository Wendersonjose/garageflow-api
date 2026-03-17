const clienteService = require("./cliente.service");

class ClienteController {
  async listar(req, res) {
    const clientes = await clienteService.listar();
    return res.status(200).json(clientes);
  }

  async criar(req, res) {
    const cliente = await clienteService.criar(req.body);
    return res.status(201).json(cliente);
  }
}

module.exports = new ClienteController();