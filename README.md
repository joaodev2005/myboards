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

### Tabela: usuarios
| Campo  | Tipo    | Descrição           |
|--------|--------|-------------------|
| id     | INT    | Identificador único do usuário |
| nome   | STRING | Nome do usuário    |
| email  | STRING | E-mail do usuário  |
| senha  | STRING | Senha criptografada do usuário |

### Tabela: cidades
| Campo | Tipo    | Descrição                 |
|-------|--------|---------------------------|
| id    | INT    | Identificador único da cidade |
| nome  | STRING | Nome da cidade            |

### Tabela: pessoas
| Campo    | Tipo    | Descrição                   |
|----------|--------|-----------------------------|
| id       | INT    | Identificador único da pessoa |
| nome     | STRING | Primeiro nome da pessoa     |
| sobrenome| STRING | Sobrenome da pessoa         |
| email    | STRING | E-mail da pessoa            |
| cidadeId | INT    | Referência à tabela `cidades` |

## 🔗 Rotas da API

---

### Cidades

| Método | Rota           | Descrição       | Validação                | Autenticação | Exemplo de body                        |
|--------|----------------|----------------|-------------------------|--------------|----------------------------------------|
| GET    | /cidades       | Lista cidades   | query: page, limit, filter, id | Sim          | —                                      |
| POST   | /cidades       | Cria cidade     | body: { nome }          | Sim          | `{ "nome": "São Paulo" }`              |
| GET    | /cidades/:id   | Detalha cidade  | params: { id }          | Sim          | —                                      |
| PUT    | /cidades/:id   | Atualiza cidade | params + body           | Sim          | `{ "nome": "Rio de Janeiro" }`        |
| DELETE | /cidades/:id   | Remove cidade   | params: { id }          | Sim          | —                                      |

---

### Pessoas

| Método | Rota           | Descrição       | Validação                | Autenticação | Exemplo de body                                                   |
|--------|----------------|----------------|-------------------------|--------------|-------------------------------------------------------------------|
| GET    | /pessoas       | Lista pessoas   | query: page, limit, filter | Sim          | —                                                                 |
| POST   | /pessoas       | Cria pessoa     | body: { nome, sobrenome, email, cidadeId } | Sim | `{ "nome": "João", "sobrenome": "Silva", "email": "joao@email.com", "cidadeId": 1 }` |
| GET    | /pessoas/:id   | Detalha pessoa  | params: { id }          | Sim          | —                                                                 |
| PUT    | /pessoas/:id   | Atualiza pessoa | params + body           | Sim          | `{ "nome": "João", "sobrenome": "Silva", "email": "joao2@email.com", "cidadeId": 2 }` |
| DELETE | /pessoas/:id   | Remove pessoa   | params: { id }          | Sim          | —                                                                 |

---

### Usuários

| Método | Rota       | Descrição         | Validação | Autenticação | Exemplo de body                         |
|--------|------------|-----------------|-----------|--------------|-----------------------------------------|
| POST   | /cadastrar | Cria usuário     | Não       | —            | `{ "nome": "João", "email": "joao@email.com", "senha": "123456" }` |
| POST   | /entrar    | Login do usuário | Não       | —            | `{ "email": "joao@email.com", "senha": "123456" }`                    |


### Cidades

#### GET / cidades
Retorna a lista completa de cidades cadastradas.

**Query Parameters (opcional):**
- `page` (inteiro, default 1) – página da listagem  
- `limit` (inteiro, default 7) – quantidade de registros por página  
- `filter` (string) – filtra pelo nome da cidade  
- `id` (inteiro) – retorna cidade específica  

**Resposta (exemplo):**
```json
[
  { "id": 1, "nome": "São Paulo" },
  { "id": 2, "nome": "Rio de Janeiro" }
]
```

#### POST / cidades
Cria uma nova cidade.
```json
{ "nome": "Belo Horizonte" }
```

**Resposta (exemplo):**
```json
{ "id": 3, "nome": "Belo Horizonte" }
```
#### GET / cidades:id
Retorna os detalhes de uma cidade pelo ID.

**Parâmetros:**
- **id** (inteiro): ID da cidade.

```json
{ "id": 1, "nome": "São Paulo" }
```

#### PUT / cidades/:id
Atualiza uma cidade pelo ID.

**Parâmetros:**
- **id** (inteiro): ID da cidade.

```json
{ "nome": "São Paulo Atualizada" }
```
**Status 204 No Content**

#### DELETE /cidades/:id
Deleta uma cidade pelo ID.

**Parâmetros:**
- **id** (inteiro): ID da cidade.


### pessoas

#### GET / pessoas
Retorna a lista completa de pessoas cadastradas.

**Query Parameters**

- `page` (inteiro, default 1) - página da listagem
- `limit` (inteiro, default 7) - quantidade de registros por página
- `filter` (string) - filtra pelo nome ou sobrenome

```json
[
  { "id": 1, "nome": "João", "sobrenome": "Silva", "email": "joao@email.com", "cidadeId": 1 },
  { "id": 2, "nome": "Maria", "sobrenome": "Souza", "email": "maria@email.com", "cidadeId": 2 }
]
```


#### POST / pessoas
Cria uma nova pessoa.

```json
{
  "nome": "Carlos",
  "sobrenome": "Pereira",
  "email": "carlos@email.com",
  "cidadeId": 1
}
```

**Resposta** (exemplo)

```json
{
  "id": 3,
  "nome": "Carlos",
  "sobrenome": "Pereira",
  "email": "carlos@email.com",
  "cidadeId": 1
}
```

#### GET / pessoas/:id
Retorna os detalhes de uma pessoa pelo ID.

**Parâmetros:**
- **id** (inteiro): ID da pessoa.

```json
{ "id": 1, "nome": "João", "sobrenome": "Silva", "email": "joao@email.com", "cidadeId": 1 }
```
#### PUT / pessoas/:id
Atualiza uma pessoa pelo ID.

**Parâmetros:**
- **id** (inteiro): ID da pessoa.

```json
{
  "nome": "João Atualizado",
  "sobrenome": "Silva",
  "email": "joaoatualizado@email.com",
  "cidadeId": 2
}
```

#### DELETE / pessoas/:id
Deleta uma pessoa pelo ID.

**Parâmetros:**
- **id** (inteiro): ID da pessoa.

### usuarios

#### POST / cadastrar
Cria um novo usuário.

**Corpo da requisição:**

```json
{ "nome": "João", "email": "joao@email.com", "senha": "123456" }
```

**Resposta** (exemplo)

```json
{ "id": 1, "nome": "João", "email": "joao@email.com" }
```

#### POST / entrar
Realiza login do usuário.

**Corpo da requisição:**

```json
{ "email": "joao@email.com", "senha": "123456" }
```

**Resposta** (exemplo)

```json
{ "accessToken": "jwt.token.aqui" }
```

## 📬 Contato

- Desenvolvedor: João Barbosa
- E-mail: joaovictor.dev2005@gmail.com
