/**
 * SCHEMA DE VALIDAÇÃO - CLIENTE
 * 
 * Define as regras de validação dos dados de entrada.
 * Usando Zod: biblioteca moderna de validação com TypeScript-first.
 * mas funciona perfeitamente em JavaScript puro.
 * 
 * Cada campo tem suas regras indepedentes. 
 * o zod valida tudo de uma vez e acumula todos os erros. 
 */


const { z } = require("zod");

// Esquema de validação para criação de cliente
// -----------------------------------------------------------------------
// Schema de CRIAÇÃO
// Usado no POST /clientes
// -----------------------------------------------------------------------
const criarClienteSchema = z.object({
    //Nome: obrigatório, sem espaços nas bordas, mínimo 3 caracteres
    nome: z
        .string({ required_error: "O campo nome é obrigatório." })
        .trim()
        .min(3, { message: "O nome deve conter pelo menos 3 caracteres." }),

    //CPF: opcional, mas se fornecido deve ser uma string de 11 dígitos
    // .optional() = campo pode não vir no body
    // .nullable() = campo pode ser null
    cpf: z
        .string()
        .trim()
        .length(11, { message: "O CPF deve conter exatamente 11 dígitos." })
        .regex(/^\d+$/, { message: "O CPF deve conter apenas números." })
        .optional()
        .nullable(),

        //Data de nascimento: opcional, mas se fornecida deve estar no formato YYYY-MM-DD
    data_nascimento: z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "A data de nascimento deve estar no formato YY-MM-DD." })
        .optional()
        .nullable(),

        // Telefone: opcional, entre 10 e 11 dígitos numéricos (com DDD)
    telefone: z
        .string()   
        .trim()
        .min(10, { message: "O telefone deve conter pelo menos 10 dígitos." })
        .max(11, { message: "O telefone deve conter no máximo 11 dígitos." })
        .regex(/^\d+$/, { message: "O telefone deve conter apenas números." })
        .optional()
        .nullable(),

        //Cidade: opcional, mas se fornecida deve ser uma string com no mínimo 2 caracteres
    cidade: z
        .string()
        .trim()
        .min(2, { message: "A cidade deve conter pelo menos 2 caracteres." })
        .optional()
        .nullable(),

        //Email: opcional, mas se fornecido deve ser um email válido
    email: z
        .string()   
        .trim()
        .email({ message: "O email deve ser um endereço de email válido." })
        .optional()
        .nullable(),
});

// -----------------------------------------------------------------------
// Schema de ATUALIZAÇÃO
// Usado no PUT /clientes/:id
//
// .partial() transforma todos os campos em opcionais.
// Isso permite atualizar apenas os campos enviados no body,
// sem precisar mandar todos os dados do cliente novamente.
// -----------------------------------------------------------------------

const atualizarClienteSchema = criarClienteSchema.partial().extend({
    // Nome constinua tendo as mesmas regras, mas agora é opcional no PUT;

    nome: z
        .string()
        .trim()
        .min(3, { message: "O nome deve conter pelo menos 3 caracteres." })
        .optional(),

});

module.exports = {
    criarClienteSchema,
    atualizarClienteSchema,
};

