//ponto de entrada do servidor

require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env
const app = require("./app"); // Importa a aplicação Express configurada em app.js  
const pool = require("./config/database"); // Importa a configuração do pool de conexões com o banco de dados

const PORT = process.env.PORT || 3000; // Define a porta do servidor a partir da variável de ambiente ou usa 3000 como padrão

async function startServer() {
    try {
        // Testa a conexão com o banco de dados antes de iniciar o servidor
        await pool.query("SELECT NOW()"); // Executa uma consulta simples para verificar a conexão    
        console.log("Conexão com o banco de dados estabelecida com sucesso.");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao conectar com o banco de dados:", error);
        process.exit(1); // Encerra o processo com código de erro
    }
} 

startServer(); // Chama a função para iniciar o servidor
