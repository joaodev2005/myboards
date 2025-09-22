# My Boards

## Visão Geral
Uma API RESTful para gerenciamento de cidades e usuários, permitindo operações de criação, listagem, atualização e exclusão (CRUD), desenvolvida com Node.js, Express e Knex.

---

## 📂 Tecnologias usadas

- **Node.js**
- **Express**
- **TypeScript**
- **Knex.js**
- **SQLite** (testes)
- **dotenv**
- **bcryptjs**
- **jsonwebtoken (JWT)**
- **zod**
- **http-status-codes**

### 🔧 Ferramentas de Desenvolvimento e Testes
- **ESLint** + **typescript-eslint**
- **Jest** + **Supertest** + **ts-jest**
- **ts-node-dev** e **tsx**

---

## ⚙️ Scripts Disponíveis

- `npm run start` → Inicia a aplicação em modo produção
- `npm run start:dev` → Inicia a aplicação em modo desenvolvimento com reload automático
- `npm run test` →Executa a suíte de testes com Jest
- `npm run knex:migrate` → Executa as migrações pendentes
- `npm run knex:rollback` → Desfaz todas as migrações
- `npm run knex:rollback-all` → Executa as migrações pendentes
- `npm run knex:seed` → Popula o banco de dados com dados iniciais

## Instalação

1. Clone este repositório:

    ```bash
    git clone https://github.com/joaodev2005/myboards
    ```
2. Acesse o diretório do projeto:

    ```bash
    cd myboards
    ```
3. Instale as dependências:

    ```bash
    npm install
    ```
4. Configure as Variáveis de Ambiente
   Crie um arquivo chamado `.env` na raiz do projeto com as seguintes variáveis (preencha os valores conforme sua configuração):

   ```env
    PORT=4000
    NODE_ENV=dev
    JWT_SECRET=your_jwt_secret_key
    ```

   
5. Execute migrações do banco de dados:
   
   ```env
    npm run knex:migrate
    ```
6. Popule dados iniciais (opcional):
     ```env
    npm run knex:seed
    ```
   
8. Inicie o servidor:
  
    ```bash
    npm run start:dev
    ```
    
9. Acesse a aplicação em `http://localhost:4000`.

## 🗄️ Banco de Dados - SQLite

Este projeto utiliza **SQLite** como banco de dados, através do **Knex.js**.

- O arquivo do banco é criado automaticamente na pasta `/database` (ou conforme definido no seu `knexfile`).
- Não é necessário instalar nenhum servidor de banco de dados.
- O SQLite é leve e ideal para ambientes de desenvolvimento e testes.

### 📂 Estrutura do Banco

- `usuarios` → tabela para gerenciamento de usuários  
- `cidades` → tabela para gerenciamento de cidades
- `pessoas` → tabela para gerenciamento de pessoas
