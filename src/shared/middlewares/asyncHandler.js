/**
 * MIDDLEWARE: ASYNC HANDLER
 * 
 * Wrapper para funções assíncronas em rotas Express.
 * Captura erros em Promise rejeitadas e os passa para o middleware
 * de tratamento de erros (next), evitando try-catch repetitivo.
 */

/**
 * Envolver funções assíncronas para tratamento automático de erros
 * 
 * @param {Function} fn - Função assíncrona (req, res, next) => Promise
 * @returns {Function} Função que captura erros automaticamente
 * 
 * @example
 * // Uso em rotas
 * router.get('/:id', asyncHandler((req, res) => clienteController.buscarPorId(req, res)));
 * 
 * // Sem asyncHandler seria necessário:
 * // router.get('/:id', (req, res, next) => {
 * //   try {
 * //     clienteController.buscarPorId(req, res);
 * //   } catch(error) {
 * //     next(error);
 * //   }
 * // });
 */
function asyncHandler(fn) {
  return function (req, res, next) {
    // Resolve a promise retornada pela função
    // Se rejeitar, passa o erro para o next (errorHandler)
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = asyncHandler;