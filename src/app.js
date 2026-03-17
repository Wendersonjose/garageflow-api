// Importa o framework Express, que facilita a criação de servidores web em Node.js
const express = require("express");

// Importa o CORS, que permite o acesso de recursos de outros domínios (Cross-Origin Resource Sharing)
const cors = require("cors");

// Importa a configuração do Swagger
const swaggerSpec = require('../doc/swagger');

// Importa o swagger-ui-express para exibir a documentação
const swaggerUi = require('swagger-ui-express');

// Importa as rotas relacionadas ao cliente, que estão definidas em outro arquivo
const clienteRoutes = require("./modules/cliente/cliente.routes");

// Importa o middleware de tratamento de erros, que é responsável por lidar com erros de forma centralizada
const errorHandler = require("./shared/middlewares/errorHandler");

const app = express();

// Configura o CORS para permitir requisições de qualquer origem
app.use(cors());

// Configura o middleware para parsing do corpo das requisições
app.use(express.json());

// Rota para o Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    return res.json({ message: "Bem-vindo à API da Oficina!" });
});

// Define as rotas da aplicação
app.use("/clientes", clienteRoutes);

module.exports = app;