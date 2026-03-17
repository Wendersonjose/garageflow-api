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

  // ============================================================================
  // TRATAMENTO DE ERRO: VIOLAÇÃO DE CONSTRAINT ÚNICA
  // ============================================================================
  // Código PostgreSQL 23505 = violação de constraint de unicidade
  // Ocorre quando tenta-se inserir um valor duplicado em campo UNIQUE
  // Exemplo: CPF ou Email já cadastrado
  if (error.code === "23505") {
    // Mapa de mensagens customizadas por tipo de constraint
    // Cada chave corresponde a uma constraint definida no banco de dados
    const mensagensPorConstraint = {
      // Violação única de CPF - retorna mensagem específica
      cliente_cpf_key: "CPF já cadastrado com esse cpf.",

      // Violação única de Email - retorna mensagem específica
      cliente_email_key: "Email já cadastrado com esse email.",
    };

    // Busca mensagem customizada ou usa mensagem genérica como fallback
    const mensagem =
      mensagensPorConstraint[error.constraint] ||
      "Valor duplicado: registro já existe";

    // Retorna 409 (Conflict) - padrão HTTP para conflito de recurso
    return res.status(409).json({
      mensagem,
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