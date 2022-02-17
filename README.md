# Bem-vindos ao Todo List Ebytr - Backend

## Contexto

---

Esse projeto foi desenvolvido para uma vaga de backend na empresa [`Ebytr`](www.betrybe.com).

A proposta era desenvolver uma aplicação backend de uma Lista de Tarefas para a empresa, com as funcionalidades de criação, edição, leitura e exclusão de tarefas por usuário.

Os tipos de dados adotados são:

#### Tarefas

|   Task   |  Status  |  CreatedAt |    id    | 
| :------: | :------: |  :------:  | :------: | 
| `string` | `string` |  `string`  | `string` | 

#### Usuário

|  UserId  |  Email   |  Password  |   Name   |   Role   | 
| :------: | :------: |  :------:  | :------: | :------: | 
| `string` | `string` |  `string`  | `string` | `string` |

---

---

## Como instalar

Pre-requisitos para rodar o projeto: 
- mongoDB
- NPM

Copie o ssh do projeto `git@github.com:ricardo-sousa-dev/challange-to-do-list-Ebytr-backend.git`

* Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

  * `git clone git@github.com:ricardo-sousa-dev/challange-to-do-list-Ebytr-backend.git`
  * `cd challange-to-do-list-Ebytr-backend`
  * `npm install`
  * `npm start`

  A aplicação está configurada para rodar na porta local `3001`. Caso deseje utilizar outra porta utilize o arquivo `.env.example` para trocar para a porta desejada. Após a alteração renomeie o arquivo para `.env`

---

## Modo de utilização

A API possui as seguintes rotas: 
* `/tasks` => Para as funcionalidades relacionadas às tarefas:
  * `/tasks` [`GET`]  Retorna todas as tarefas cadastradas - (acesso com autenticação)
  * `/tasks` [`POST`] Faz o cadastramento de uma nova tarefa - (acesso com autenticação)
  * `/tasks/:id` [`PUT`]  Através do ID, realiza uma alteração em uma tarefa específica
  * `/tasks` [`DELETE`]  Através do ID, exclui uma tarefa
* `/user` [`POST`] Cria um novo usuário
* `/login` [`POST`] Faz login do usuário para acesso ao sistema

---

## Modo de desenvolvimento

---

O projeto foi desenvolvido utilizando `TDD`, inicialmente com testes de integração, e posteriormente será implementado testes unitários.

### Tecnologias

---

Foi utilizado para o desenvolvimento desse projeto o `NodeJS` com `Express` para a criação básica, `Mocha/Chai` para a criação dos teste unitários e de integração.

---

### Banco de dados

O banco escolhido para a aplicação foi `Mongodb`, pela agilidade no desenvolvimento, facilidade de adição de novas informações sem necessitar reestruturar e pela robustes para lidar com grande volume de requisições.

---

## Próximos passos

* Aumentar a cobertura de testes unitários
* Implementação de Token de acesso para edição e exclusão de tarefas
* Implementação de acesso administrador
* Implementação do Swagger para documentação da API

---

## Contatos

<div style="display: flex; align-items: center; justify-content: space-between;">
  <div>
    <h2> Paulo Ricardo Zambelli (Zambs) </h2>
  <div style="display: flex; align-items: center;">
    <img src="./images/linkedIn_logo.jpg" alt="LinkedIn" style="width:20px;"/>  /in/paulo-ricardo-zambelli-taveira 
  </div>
  <br/>
  <div style="display: flex;align-items: center;">
    <img src="./images/github_logo.png" alt="LinkedIn" style="width:20px;"/> https://github.com/pauloricardoz
  </div>
  <br/>
  Email: trybe.przt@gmail.com
  </div>
    <img src="./images/Paulo Ricardo Zambelli Taveira0003.jpg" alt="LinkedIn" style="width:100px;"/> 
  </div>
<br/>

