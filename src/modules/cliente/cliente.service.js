const clienteRepository = require("./cliente.repository");
const AppError = require("../../shared/errors/appError");
// Schema de validação Zod para dados de criação de cliente
// Define as regras de validação (tipos, obrigatoriedade, formatação, etc.)
const { criarClienteSchema } = require("./cliente.schema");

class ClienteService {
  async listar() {
    return await clienteRepository.listarTodos();
  }

  async buscarPorId(id) {
    const cliente = await clienteRepository.buscarPorId(id);

    if (!cliente) {
      throw new AppError("Cliente não encontrado.", 404);
    }
    return cliente;
  }

  async criar(dadosCliente) {
    // ============================================================================
    // VALIDAÇÃO DE DADOS COM ZOD
    // ============================================================================
    // Antes de inserir no banco, valida todos os campos contra o schema
    // 
    // -----------------------------------------------------------------------
    // Validação com Zod
    //
    // .safeParse() tenta validar os dados e NÃO lança exceção se falhar.
    // Retorna um objeto com duas formas possíveis:
    //   { success: true,  data: dadosValidados }
    //   { success: false, error: objetoDeErros }
    //
    // Usamos safeParse (em vez de parse) para controlar o fluxo manualmente
    // e formatar a mensagem de erro do jeito que queremos.
    // -----------------------------------------------------------------------
    const resultado = criarClienteSchema.safeParse(dadosCliente);

    // Verifica se a validação falhou
    if (!resultado.success) {
      // resultado.error.errors é um array com todos os erros encontrados.
      // Ex: [{ message: "O CPF deve conter exatamente 11 dígitos." }, ...]
      //
      // Pegamos apenas as mensagens e juntamos em uma string separada por vírgula.
      const mensagens = resultado.error.errors
        .map((e) => e.message)
        .join(", ");

      // Lançamos AppError com status 400 (dado inválido)
      throw new AppError(mensagens, 400);
    }

    // ============================================================================
    // INSERÇÃO NO BANCO DE DADOS
    // ============================================================================
    // resultado.data contém os dados já validados e limpos pelo Zod
    // (trim aplicado, tipos corretos, etc.)
    // Passa os dados validados para o repositório inserir no banco
    return await clienteRepository.criar(resultado.data);
  }
}

module.exports = new ClienteService();