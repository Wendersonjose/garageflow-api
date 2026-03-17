const swaggerJsdoc = require('swagger-jsdoc');

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API da Oficina',
      version: '1.0.0',
      description: 'Documentação da API do sistema de oficina',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./src/modules/**/*.routes.js'], // Caminhos para os arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;