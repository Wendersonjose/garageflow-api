/**
 * CONTROLADOR DE CLIENTE
 * 
 * Responsável por processar requisições HTTP relacionadas aos clientes.
 * Coordena requisições com o serviço e formata respostas HTTP.
 */

const clienteService = require("./cliente.service");

// ============================================================================
// CLASSE: ClienteController
// ============================================================================

class ClienteController {
  /**
   * Manipula GET /clientes - Lista todos os clientes
   * 
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} res - Objeto de resposta Express
   * @returns {Response} JSON com array de clientes (status 200)
   */
  async listar(req, res) {
    const clientes = await clienteService.listar();
    return res.status(200).json(clientes);
  }

  /**
   * Manipula GET /clientes/:id - Busca cliente por ID
   * 
   * @param {Object} req - Objeto de requisição Express
   * @param {number} req.params.id - ID do cliente a buscar
   * @param {Object} res - Objeto de resposta Express
   * @returns {Response} JSON com dados do cliente (status 200)
   */
  async buscarPorId(req, res) {
    const { id } = req.params;

    const cliente = await clienteService.buscarPorId(id);
    return res.status(200).json(cliente);
  }

  /**
   * Manipula POST /clientes - Cria um novo cliente
   * 
   * @param {Object} req - Objeto de requisição Express
   * @param {Object} req.body - Dados do cliente a ser criado
   * @param {Object} res - Objeto de resposta Express
   * @returns {Response} JSON com cliente criado (status 201)
   */
  async criar(req, res) {
    const cliente = await clienteService.criar(req.body);
    return res.status(201).json(cliente);
  }
}

// Exporta instância única do controlador (padrão Singleton)
module.exports = new ClienteController();