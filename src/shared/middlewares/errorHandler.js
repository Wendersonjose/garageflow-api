/**
 * MIDDLEWARE: TRATAMENTO DE ERROS
 * 
 * Middleware global para tratamento centralizado de erros.
 * Captura todas as exceções e formata respostas HTTP apropriadas.
 * Deve ser registrado por último no Express (app.use(errorHandler)).
 */

const AppError = require("../errors/appError");

/**
 * Middleware de tratamento de erros global
 * 
 * @param {Error} error - Objeto de erro capturado
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 * @param {Function} next - Função para passar para o próximo middleware
 * 
 * Comportamento:
 * - Se for AppError: retorna status code e mensagem definidos
 * - Outro erro: retorna 500 e mensagem genérica (log no console)
 */
function errorHandler(error, req, res, next) {
  // Verifica se é um erro personalizado da aplicação
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      mensagem: error.message,
    });
  }

  // Log de erro não tratado (ajuda no debug)
  console.error(error);

  // Responde com erro genérico de servidor
  return res.status(500).json({
    mensagem: "Erro interno do servidor",
  });
}

module.exports = errorHandler;