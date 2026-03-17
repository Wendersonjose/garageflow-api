/**
 * SERVIÇO DE CLIENTE
 * 
 * Responsável pela lógica de negócio relacionada aos clientes.
 * Executa validações, processamento de dados e coordena
 * as operações entre controller e repository.
 */

const clienteRepository = require("./cliente.repository");
const AppError = require("../../shared/errors/appError");

// ============================================================================
// CLASSE: ClienteService
// ============================================================================

class ClienteService {
  /**
   * Lista todos os clientes cadastrados
   * 
   * @returns {Promise<Array>} Array com todos os clientes ativos
   * @throws {Error} Erro ao buscar clientes no banco de dados
   */
  async listar() {
    return await clienteRepository.listarTodos();
  }

  /**
   * Busca um cliente específico pelo ID
   * 
   * @param {number} id - ID do cliente a ser buscado
   * @returns {Promise<Object>} Objeto com dados do cliente
   * @throws {AppError} Lança erro 404 se cliente não encontrado
   */
  async buscarPorId(id) {
    const cliente = await clienteRepository.buscarPorId(id);

    if (!cliente) {
      throw new AppError("Cliente não encontrado.", 404);
    }
    return cliente;
  }

  /**
   * Cria um novo cliente com validação de dados obrigatórios
   * 
   * @param {Object} dadosCliente - Dados do cliente a ser criado
   * @param {string} dadosCliente.nome - Nome do cliente (obrigatório)
   * @param {string} dadosCliente.cpf - CPF do cliente
   * @param {string} dadosCliente.data_nascimento - Data de nascimento
   * @param {string} dadosCliente.telefone - Telefone do cliente
   * @param {string} dadosCliente.cidade - Cidade do cliente
   * @param {string} dadosCliente.email - Email do cliente
   * @returns {Promise<Object>} Cliente criado com ID gerado
   * @throws {Error} Erro se nome for vazio ou não fornecido
   */
  async criar(dadosCliente) {
    // Validação: nome é obrigatório e não pode ser vazio
    if (!dadosCliente.nome || !dadosCliente.nome.trim()) {
      throw new Error("O campo nome é obrigatório.");
    }

    return await clienteRepository.criar(dadosCliente);
  }
}

// Exporta instância única do serviço (padrão Singleton)
module.exports = new ClienteService();