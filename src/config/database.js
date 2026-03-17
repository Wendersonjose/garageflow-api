//centraliza a configuracao do banco de dados, conexao, etc

const { Pool } = require("pg"); // Importa o módulo Pool do pg para gerenciar conexões com o PostgreSQL
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env


// Cria uma instância do Pool com as configurações de conexão do banco de dados
const pool = new Pool({
    host: process.env.DB_HOST, // Endereço do servidor do banco de dados
    port: process.env.DB_PORT, // Porta do banco de dados
    database: process.env.DB_NAME, // Nome do banco de dados
    user: process.env.DB_USER, // Usuário do banco de dados
    password: process.env.DB_PASSWORD // Senha do banco de dados
});

// Exporta o pool para ser usado em outros módulos da aplicação
module.exports = pool;