/**
 * CONFIGURAÇÃO DO BANCO DE DADOS
 * 
 * Centraliza a configuração de conexão com o banco de dados PostgreSQL.
 * Utiliza pool de conexões para gerenciar múltiplas conexões eficientemente.
 */

// ============================================================================
// IMPORTAÇÕES
// ============================================================================

// Pool do driver pg (node-postgres) para gerenciar conexões com PostgreSQL
const { Pool } = require("pg");

// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// ============================================================================
// INICIALIZAÇÃO DO POOL DE CONEXÕES
// ============================================================================

/**
 * Pool de conexões com o PostgreSQL
 * 
 * Gerencia múltiplas conexões simultâneas de forma eficiente,
 * reutilizando conexões conforme necessário.
 * 
 * Configurações carregadas de variáveis de ambiente:
 */
const pool = new Pool({
  // Endereço do servidor do banco de dados
  host: process.env.DB_HOST,

  // Porta padrão PostgreSQL (normalmente 5432)
  port: process.env.DB_PORT,

  // Nome do banco de dados a ser utilizado
  database: process.env.DB_NAME,

  // Usuário para autenticação no banco de dados
  user: process.env.DB_USER,

  // Senha para autenticação no banco de dados
  password: process.env.DB_PASSWORD,
});

// ============================================================================
// EXPORTAÇÃO
// ============================================================================

/**
 * Exporta o pool configurado para ser utilizado em toda a aplicação
 * Exemplo de uso em repositories:
 *   const result = await pool.query(sql, [values]);
 */
module.exports = pool;