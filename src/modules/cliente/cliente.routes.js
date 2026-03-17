// Rota para listar todos os clientes

const { Router } = require("express");
const clienteController = require("./cliente.controller");
const asyncHandler = require("../../shared/middlewares/asyncHandler");

const router = Router();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     description: Retorna uma lista de todos os clientes cadastrados na oficina
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
 *                     description: ID do cliente
 *                   nome:
 *                     type: string
 *                     description: Nome do cliente
 *                   email:
 *                     type: string
 *                     description: Email do cliente
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/", (req, res) => clienteController.listar(req, res));

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     description: Cadastra um novo cliente na oficina
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do cliente
 *               email:
 *                 type: string
 *                 description: Email do cliente
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
 *                   description: ID do cliente criado
 *                 nome:
 *                   type: string
 *                   description: Nome do cliente
 *                 email:
 *                   type: string
 *                   description: Email do cliente
 *       400:
 *         description: Dados inválidos ou erro na criação
 */
router.post("/", (req, res) => clienteController.criar(req, res));

module.exports = router;
