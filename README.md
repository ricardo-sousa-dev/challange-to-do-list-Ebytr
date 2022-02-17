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

Copie o ssh do projeto `git@github.com:pauloricardoz/desafio-auto-trybe-back.git`

* Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

  * `git clone git@github.com:pauloricardoz/desafio-auto-trybe-back.git`
  * `cd desafio-auto-trybe-back`
  * `npm install`
  * `npm start`

  A aplicação está configurada para rodar na porta local 3000. Caso deseje utilizar outra porta utilize o arquivo `.env.example` para trocar para a porta desejada. Após a alteração renomeie o arquivo para `.env`

---

## Modo de utilização

A API consta com 2 rotas: 
* `/` => caso alguém acesse via brower [`GET`]
* `/cars` => Para as demais funcionalidades
  * `/` [`GET`]  Pegar todas os carros cadastrados
  * `/properties` [`POST`] Filtra carros pelas properties passadas no body da requisição
  * `/` [`POST`] Insere um novo carro
  * `/` [`PUT`]  Edita dados de um carro já cadastrado no banco
  * `/` [`DELETE`] Deleta um carro cadastrado no banco

---

## Modo de desenvolvimento

---

O projeto foi desenvolvido utilizando TDD, inicialmente com testes unitários, e posteriormente foi implementado um teste de integração.

### Tecnologias

---

Foi utilizado para o desenvolvimento desse projeto o NodeJS com Express para a criação básica, Mocha/Chai para a criação dos teste unitários e de integração.

---

### Dados

Segue abaixo os atributos de um automóvel utilizados, os tipos de dados de cada um e a forma que foram armazenados no banco:

![cobertura de testes unitários](./pictures/tabela-atributos.png)

### Banco de dados

O banco escolhido para a aplicação foi `Mongodb`, pela agilidade no desenvolvimento, facilidade de adição de novas informações sem necessitar re-estruturar toda a estrutura e pela robustes para lidar com grande volume de requisições.

---

## Cobertura de teste

A atual cobertura de testes é de: 
- `98%` das linhas;

![cobertura de testes unitários](./pictures/test-unit-coverage.png)

---

## Próximos passos

* Implementação do Swagger para documentação da API
* Implementação de Token de acesso
* Deplay no Heroku
* Implementação de transmissão de dados `in real time` através do SocketIO

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

