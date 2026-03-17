/**
 * ARQUIVO PRINCIPAL DA APLICAÇÃO
 * 
 * Configura a aplicação Express com middlewares, rotas e integração
 * com documentação Swagger. Este arquivo contém a lógica central de
 * setup da API sem inicializar o servidor.
 */

// ============================================================================
// IMPORTAÇÕES
// ============================================================================

// Framework Express para criação de servidores web em Node.js
const express = require("express");

// CORS middleware para permitir requisições de outros domínios
const cors = require("cors");

// Configuração e especificação Swagger para documentação
const swaggerSpec = require('../doc/swagger');

// Middleware para servir a UI do Swagger
const swaggerUi = require('swagger-ui-express');

// Rotas do módulo de clientes
const clienteRoutes = require("./modules/cliente/cliente.routes");

// Middleware de tratamento centralizado de erros
const errorHandler = require("./shared/middlewares/errorHandler");

// ============================================================================
// INICIALIZAÇÃO E CONFIGURAÇÃO
// ============================================================================

const app = express();

// CORS: Permite requisições de qualquer origem
app.use(cors());

// Body Parser: Configura parsing automático de JSON
app.use(express.json());

// ============================================================================
// DOCUMENTAÇÃO (SWAGGER/OPENAPI)
// ============================================================================

/**
 * Serve a documentação interativa no endpoint /api-docs
 * Disponível em: http://localhost:3000/api-docs
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================================================
// ROTAS
// ============================================================================

/**
 * Rota raiz - Endpoint de boas-vindas
 * GET / -> Retorna mensagem de boas-vindas
 */
app.get("/", (req, res) => {
  return res.json({ message: "Bem-vindo à API da Oficina!" });
});

/**
 * Rotas de clientes
 * Todos os endpoints de clientes são prefixados com /clientes
 */
app.use("/clientes", clienteRoutes);

// ============================================================================
// MIDDLEWARE DE TRATAMENTO DE ERROS
// ============================================================================

/**
 * Middleware de erro global que processa exceções
 * Deve ser registrado por último para capturar todos os erros
 */
app.use(errorHandler);

// Exporta a aplicação configurada para ser iniciada em server.js
module.exports = app;