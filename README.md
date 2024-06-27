# Nest User API

## Descrição

Este projeto é uma API RESTful para gerenciamento de usuários, desenvolvida com NestJS e seguindo os princípios da Arquitetura Hexagonal (Ports and Adapters). A API permite listar, buscar e criar usuários, integrando-se com o serviço ViaCEP para validação e preenchimento de informações de endereço.

## Funcionalidades

- Listar todos os usuários
- Buscar um usuário específico por CPF
- Criar um novo usuário com validação de CEP

## Tecnologias Utilizadas

- NestJS
- TypeScript
- MongoDB (com Mongoose)
- Jest para testes unitários
- Docker e Docker Compose

## Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Docker e Docker Compose (opcional, para rodar o MongoDB)

## Configuração do Ambiente

1. Clone o repositório:
   ```
   git clone https://github.com/italoog/nest-user-api.git
   cd nest-user-api
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
   ```
   MONGODB_URI=mongodb://localhost:27017/nest-user-api
   VIACEP_BASE_URL=https://viacep.com.br/ws
   ```

4. Se estiver usando Docker, inicie o MongoDB:
   ```
   docker-compose up -d
   ```

## Executando a Aplicação

Para iniciar a aplicação em modo de desenvolvimento:

```
npm run start:dev
```

A API estará disponível em `http://localhost:3000`.

## Testes

Para executar os testes unitários:

```
npm run test
```

Para verificar a cobertura de testes:

```
npm run test:cov
```

## Estrutura do Projeto

```
src/
├── domain/
│   ├── entities/
│   ├── ports/
│   └── use-cases/
├── infrastructure/
│   ├── adapters/
│   └── schemas/
├── application/
│   ├── controllers/
│   └── dtos/
├── main.ts
└── app.module.ts
```

## Endpoints da API

- `GET /users`: Lista todos os usuários
- `GET /users/{cpf}`: Busca um usuário pelo CPF
- `POST /users`: Cria um novo usuário

Para mais detalhes sobre os endpoints e payloads, consulte a documentação Swagger disponível em `http://localhost:3000/api` quando a aplicação estiver em execução.

## Contribuindo

Contribuições são bem-vindas! Por favor, siga estas etapas:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## Contato

Italo Gomes - italo.og@outlook.com

Link do Projeto: [https://github.com/italoog/nest-user-api](https://github.com/italoog/nest-user-api)
