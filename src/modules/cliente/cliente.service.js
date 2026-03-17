const clienteRepository = require("./cliente.repository");
const AppError = require("../../shared/errors/appError");

class ClienteService {
  async listar() {
    return await clienteRepository.listarTodos();
  }

  async criar(dadosCliente) {
    if (!dadosCliente.nome || !dadosCliente.nome.trim()) {
      throw new Error("O campo nome é obrigatório.");
    }

    return await clienteRepository.criar(dadosCliente);
  }
}

module.exports = new ClienteService();