# API GarageFlow

GarageFlow é uma plataforma profissional de gestão de oficinas projetada para ajudar oficinas de reparação automotiva a gerenciar suas operações de forma eficiente.

O sistema centraliza dados de clientes, veículos, ordens de serviço, controle de inventário e registros financeiros em uma única plataforma.

O backend é construído usando Node.js e Express com arquitetura modular e documentado usando Swagger/OpenAPI para simplificar a integração com aplicações web e móveis.

## API da Oficina

Esta é a documentação da API do sistema de oficina, utilizando Swagger para facilitar a compreensão e teste dos endpoints.

## Estrutura do Projeto

```
garageflow-api/
├── doc/
│   ├── swagger.js      # Configuração do Swagger em JavaScript
│   └── swagger.yaml     # Definição OpenAPI em YAML
├── src/
│   ├── app.js          # Configuração principal da aplicação
│   ├── server.js       # Ponto de entrada do servidor
│   └── modules/        # Módulos da aplicação
│       └── cliente/    # Módulo de clientes
├── package.json
└── README.md
```

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse a documentação Swagger em: `http://localhost:3000/api-docs`

## Endpoints Documentados

### Clientes
- `GET /clientes` - Lista todos os clientes
- `POST /clientes` - Cria um novo cliente

## Adicionando Documentação a Novos Endpoints

Para adicionar documentação Swagger a novos endpoints, adicione comentários JSDoc no formato Swagger acima das rotas nos arquivos `.routes.js`.

Exemplo:
```javascript
/**
 * @swagger
 * /endpoint:
 *   method:
 *     summary: Descrição breve
 *     description: Descrição detalhada
 *     responses:
 *       200:
 *         description: Sucesso
 */
router.method('/endpoint', handler);
```

Certifique-se de que o caminho dos arquivos de rotas esteja incluído na configuração `apis` no arquivo `doc/swagger.js`.

## Arquivos de Documentação

- **`doc/swagger.js`**: Contém a configuração do Swagger e gera a especificação OpenAPI
- **`doc/swagger.yaml`**: Versão em YAML da documentação para referência ou uso alternativo