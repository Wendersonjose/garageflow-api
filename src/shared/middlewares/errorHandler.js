const AppError = require("../errors/appError");

function errorHandler(error, req, res, next) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      mensagem: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    mensagem: "Erro interno do servidor",
  });
}

module.exports = errorHandler;