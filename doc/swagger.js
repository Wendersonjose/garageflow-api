/**
 * Configuração do Swagger para documentação automática da API
 * Utiliza swagger-jsdoc para gerar documentação OpenAPI 3.0
 * a partir dos comentários dos arquivos de rotas
 */

const swaggerJsdoc = require('swagger-jsdoc');

// ============================================================================
// CONFIGURAÇÃO DO SWAGGER
// ============================================================================

/**
 * Opções de configuração do Swagger
 * Define informações sobre a API, versão, servidores e localização das rotas
 */
const swaggerOptions = {
  // Definição das especificações OpenAPI
  definition: {
    // Versão da especificação OpenAPI utilizada
    openapi: '3.0.0',

    // Informações gerais da API
    info: {
      title: 'API da Oficina',
      version: '1.0.0',
      description: 'Documentação completa da API do sistema de gerenciamento de oficina',
    },

    // Configuração dos servidores da aplicação
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
  },

  // Padrão de busca para arquivos com documentação das rotas
  // Procura por comentários JSDoc em todos os arquivos de rotas dos módulos
  apis: ['./src/modules/**/*.routes.js'],
};

// ============================================================================
// GERAÇÃO DA ESPECIFICAÇÃO SWAGGER
// ============================================================================

/**
 * Cria a especificação Swagger/OpenAPI baseada nas rotas documentadas
 * e nas opções configuradas acima
 */
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Exporta a especificação para ser utilizada pela aplicação
module.exports = swaggerSpec;