//serve para padronizar os erros da aplicacao, facilitando o tratamento e a manutencao dos erros
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = "AppError";
  }
}

module.exports = AppError;