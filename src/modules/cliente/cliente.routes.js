/**
 * ROTAS DO MÓDULO CLIENTE
 * 
 * Define todos os endpoints relacionados a operações
 * com clientes (criar, listar, buscar por ID).
 * Inclui documentação Swagger/OpenAPI para cada endpoint.
 */

const { Router } = require("express");
const clienteController = require("./cliente.controller");
const asyncHandler = require("../../shared/middlewares/asyncHandler");

const router = Router();

// ============================================================================
// ENDPOINT: GET /clientes - Listar todos os clientes
// ============================================================================

/**
 * @swagger
 * /clientes:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Lista todos os clientes
 *     description: Retorna uma lista completa de todos os clientes cadastrados na oficina
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                     description: ID único do cliente
 *                   nome:
 *                     type: string
 *                     example: João Silva
 *                     description: Nome completo do cliente
 *                   cpf:
 *                     type: string
 *                     example: "12345678900"
 *                     description: CPF do cliente
 *                   data_nascimento:
 *                     type: string
 *                     format: date
 *                     example: "1990-05-15"
 *                     description: Data de nascimento
 *                   telefone:
 *                     type: string
 *                     example: "(11) 99999-9999"
 *                     description: Telefone de contato
 *                   cidade:
 *                     type: string
 *                     example: São Paulo
 *                     description: Cidade de residência
 *                   email:
 *                     type: string
 *                     format: email
 *                     example: joao@example.com
 *                     description: Email de contato
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", asyncHandler((req, res) => clienteController.listar(req, res)));

// ============================================================================
// ENDPOINT: GET /clientes/:id - Buscar cliente por ID
// ============================================================================

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Busca um cliente por ID
 *     description: Retorna os dados de um cliente específico baseado no seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado e retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nome:
 *                   type: string
 *                   example: João Silva
 *                 cpf:
 *                   type: string
 *                   example: "12345678900"
 *                 data_nascimento:
 *                   type: string
 *                   format: date
 *                   example: "1990-05-15"
 *                 telefone:
 *                   type: string
 *                   example: "(11) 99999-9999"
 *                 cidade:
 *                   type: string
 *                   example: São Paulo
 *                 email:
 *                   type: string
 *                   example: joao@example.com
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/:id", asyncHandler((req, res) => clienteController.buscarPorId(req, res)));

// ============================================================================
// ENDPOINT: POST /clientes - Criar novo cliente
// ============================================================================

/**
 * @swagger
 * /clientes:
 *   post:
 *     tags:
 *       - Clientes
 *     summary: Cria um novo cliente
 *     description: Cadastra um novo cliente na oficina com seus dados pessoais
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: João Silva
 *                 description: Nome completo do cliente (obrigatório)
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *                 description: CPF do cliente
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-15"
 *                 description: Data de nascimento no formato YYYY-MM-DD
 *               telefone:
 *                 type: string
 *                 example: "(11) 99999-9999"
 *                 description: Telefone de contato
 *               cidade:
 *                 type: string
 *                 example: São Paulo
 *                 description: Cidade de residência
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@example.com
 *                 description: Email de contato
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                   description: ID gerado para o novo cliente
 *                 nome:
 *                   type: string
 *                   example: João Silva
 *                 cpf:
 *                   type: string
 *                   example: "12345678900"
 *                 data_nascimento:
 *                   type: string
 *                   format: date
 *                   example: "1990-05-15"
 *                 telefone:
 *                   type: string
 *                   example: "(11) 99999-9999"
 *                 cidade:
 *                   type: string
 *                   example: São Paulo
 *                 email:
 *                   type: string
 *                   example: joao@example.com
 *       400:
 *         description: Dados inválidos ou campo nome vazio
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/", asyncHandler((req, res) => clienteController.criar(req, res)));

module.exports = router;
