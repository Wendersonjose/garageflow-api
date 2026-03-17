/**
 * REPOSITÓRIO DE CLIENTE
 * 
 * Responsável pela comunicação com o banco de dados.
 * Executa queries SQL e retorna dados dos clientes.
 * Camada de acesso a dados do módulo cliente.
 */

const pool = require("../../config/database");

// ============================================================================
// CLASSE: ClienteRepository
// ============================================================================

class ClienteRepository {
  /**
   * Lista todos os clientes não deletados do banco de dados
   * 
   * @async
   * @returns {Promise<Array>} Array com todos os clientes ativos
   * @throws {Error} Erro ao executar query no banco de dados
   */
  async listarTodos() {
    // Query busca clientes não marcados como deletados
    // Ordenados por ID em ordem ascendente
    const query = `
      SELECT *
      FROM cliente
      WHERE deleted_at IS NULL
      ORDER BY id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  /**
   * Busca um cliente específico pelo ID
   * 
   * @async
   * @param {number} id - ID do cliente a buscar
   * @returns {Promise<Object|undefined>} Objeto com dados do cliente ou undefined
   * @throws {Error} Erro ao executar query no banco de dados
   */
  async buscarPorId(id) {
    // Query busca cliente com ID específico que não foi deletado
    const query = `
      SELECT * 
      FROM cliente
      WHERE id = $1
        AND deleted_at IS NULL
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  /**
   * Cria um novo cliente no banco de dados
   * 
   * @async
   * @param {Object} params - Dados do cliente
   * @param {string} params.nome - Nome do cliente
   * @param {string} params.cpf - CPF do cliente
   * @param {string} params.data_nascimento - Data de nascimento (YYYY-MM-DD)
   * @param {string} params.telefone - Telefone de contato
   * @param {string} params.cidade - Cidade de residência
   * @param {string} params.email - Email de contato
   * @returns {Promise<Object>} Cliente criado com ID gerado pelo banco
   * @throws {Error} Erro ao inserir cliente no banco de dados
   */
  async criar({ nome, cpf, data_nascimento, telefone, cidade, email }) {
    // Query insere novo cliente e retorna o registro completo com ID
    const query = `
      INSERT INTO cliente (
        nome,
        cpf,
        data_nascimento,
        telefone,
        cidade,
        email
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    // Array de valores na mesma ordem dos placeholders ($1, $2, ...)
    const values = [nome, cpf, data_nascimento, telefone, cidade, email];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

// Exporta instância única do repositório (padrão Singleton)
module.exports = new ClienteRepository();