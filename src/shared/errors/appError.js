/**
 * CLASSE DE ERRO PERSONALIZADO
 * 
 * Padroniza todos os erros da aplicação, facilitando o tratamento
 * centralizado e a manutenção. Permite definir mensagens de erro
 * e códigos de status HTTP de forma consistente.
 */

/**
 * Classe AppError - Erro personalizado da aplicação
 * 
 * Herda de Error e adiciona propriedades para melhor tratamento
 * de erros em requisições HTTP.
 */
class AppError extends Error {
  /**
   * Construtor do erro personalizado
   * 
   * @param {string} message - Mensagem descritiva do erro
   * @param {number} statusCode - Código HTTP da resposta (padrão: 400)
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

// Exporta a classe para uso em toda a aplicação
module.exports = AppError;