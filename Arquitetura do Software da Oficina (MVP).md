Arquitetura do Software da Oficina (MVP)

                         CLIENTE / USUÁRIO
                    (Oficina / Postman / Frontend)
                               │
                               ▼
                        HTTP REQUEST
                     POST /clientes
                     GET  /clientes
                               │
                               ▼
                         EXPRESS API
                        Node.js Server
                         src/server.js
                               │
                               ▼
                           APP.JS
                     Configuração geral
                   (middlewares + rotas)
                               │
         ┌─────────────────────┼─────────────────────┐
         ▼                     ▼                     ▼

   SWAGGER DOCS            MIDDLEWARES            ROTAS
   /api-docs               shared/                modules/
                          middlewares/

         │                     │                     │
         │                     │                     ▼
         │                     │              cliente.routes.js
         │                     │                     │
         │                     ▼                     ▼
         │              asyncHandler.js        CONTROLLER
         │              errorHandler.js     cliente.controller.js
         │                     │                     │
         │                     │                     ▼
         │                     │                SERVICE
         │                     │            cliente.service.js
         │                     │                     │
         │                     │                     ▼
         │                     │               REPOSITORY
         │                     │          cliente.repository.js
         │                     │                     │
         │                     │                     ▼
         │                     │              DATABASE LAYER
         │                     │               database.js
         │                     │                     │
         │                     │                     ▼
         │                     │                POSTGRESQL
         │                     │              tabela: cliente
         │                     │
         ▼                     ▼
   swagger.js            appError.js
   documentação           tratamento de erro