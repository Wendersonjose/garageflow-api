/**
 * PONTO DE ENTRADA DO SERVIDOR
 * 
 * Arquivo responsável por carregar variáveis de ambiente,
 * verificar conexão com banco de dados e iniciar o servidor HTTP.
 * Este é o arquivo executado quando a aplicação é iniciada.
 */

// ============================================================================
// CONFIGURAÇÃO DE AMBIENTE
// ============================================================================

// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config();

// ============================================================================
// IMPORTAÇÕES
// ============================================================================

// Aplicação Express configurada em app.js
const app = require("./app");

// Pool de conexões com o banco de dados PostgreSQL
const pool = require("./config/database");

// ============================================================================
// CONFIGURAÇÕES
// ============================================================================

/**
 * Porta do servidor
 * Prioridade: variável de ambiente PORT ou porta padrão 3000
 */
const PORT = process.env.PORT || 3000;

// ============================================================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================================================

/**
 * Função assíncrona que inicia o servidor HTTP
 * 
 * Etapas:
 * 1. Testa conexão com o banco de dados
 * 2. Se bem-sucedido, inicia o servidor Express
 * 3. Se falhar, encerra o processo com código de erro
 */
async function startServer() {
  try {
    // Testa a conexão com o banco de dados
    // Executa uma query simples para verificar se a conexão está ativa
    await pool.query("SELECT NOW()");
    console.log("Conexão com o banco de dados estabelecida com sucesso.");

    // Inicia o servidor HTTP
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação disponível em: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    // Se houver erro na conexão com o banco de dados, encerra o processo
    console.error("Erro ao conectar com o banco de dados:", error);
    process.exit(1); // Encerra com código 1 para indicar erro
  }
}

// Executa a função para iniciar o servidor
startServer();
