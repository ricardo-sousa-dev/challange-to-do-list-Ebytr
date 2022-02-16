const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const server = require('../api/app');
const connectionMock = require('./connectionMock');
const { expect } = chai;


describe('- Testa as todas de criação, leitura, alteração e exclusão de usuários', () => {
  describe('POST /user - Criação de uma novo usuário:', () => {
    let db;

    before(async () => {
      const connection = await connectionMock();

      sinon.stub(MongoClient, 'connect')
        .resolves(connection);

      db = connection.db('ToDoEbytr');
      chai.use(chaiHttp);
    });

    beforeEach(async () => {
      await db.collection('users').deleteMany({});
      await db.collection('tasks').deleteMany({});
    });

    afterEach(async () => {
      await db.collection('users').deleteMany({});
      await db.collection('tasks').deleteMany({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Verifica se é possível cadastrar novo usuário', async () => {

      const newUser = {
        name: "João",
        email: "joaozinho@gmail.com",
        password: "1234"
      }

      const response = await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('userId');
    });

    it('Verifica se não é possível cadastrar novo usuário com email inválido', async () => {

      const newUser = {
        name: "João",
        email: "joao",
        password: "1234"
      }

      const response = await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('Verifica se não é possível cadastrar novo usuário sem o campo nome', async () => {

      const newUser = {
        email: "joao@gmail.com",
        password: "1234"
      }

      const response = await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('Verifica se não é possível cadastrar novo usuário sem o campo e-mail', async () => {

      const newUser = {
        email: "joao@gmail.com",
        password: "1234"
      }

      const response = await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('Verifica se não é possível cadastrar novo usuário sem o campo password', async () => {

      const newUser = {
        name: "João",
        email: "joao@gmail.com",
      }

      const response = await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });
  });
});
describe('- Testa se é possível fazer login', () => {
  describe('POST /login - Login do usuário no sistema:', () => {
    let db;

    before(async () => {
      const connection = await connectionMock();

      sinon.stub(MongoClient, 'connect')
        .resolves(connection);

      db = connection.db('ToDoEbytr');
      chai.use(chaiHttp);
    });

    beforeEach(async () => {
      await db.collection('users').deleteMany({});
    });

    afterEach(async () => {
      await db.collection('users').deleteMany({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Verifica se é possível logar com um usuário existente', async () => {

      const newUser = {
        name: "João",
        email: "joao@gmail.com",
        password: "1234"
      }

      await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      const login = {
        email: "joao@gmail.com",
        password: "1234"
      }

      const response = await chai.request(server)
        .post('/login')
        .send(login)
        .then((response) => response);

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('token');
    });

    it('Verifica se não é possível logar com um usuário inesistente', async () => {

      const login = {
        email: "123@gmail.com",
        password: "1234"
      }

      const response = await chai.request(server)
        .post('/login')
        .send(login)
        .then((response) => response);

      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Incorrect username or password');
    });

    it('Verifica se não é possível logar com a senha incorreta', async () => {

      const newUser = {
        name: "João",
        email: "joao@gmail.com",
        password: "1234"
      }

      await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      const login = {
        email: "joao@gmail.com",
        password: "123"
      }

      const response = await chai.request(server)
        .post('/login')
        .send(login)
        .then((response) => response);

      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Incorrect username or password');
    });

    it('Verifica se não é possível logar sem informar o campo email', async () => {

      const newUser = {
        name: "João",
        email: "joao@gmail.com",
        password: "1234"
      }

      await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      const login = {
        password: "123"
      }

      const response = await chai.request(server)
        .post('/login')
        .send(login)
        .then((response) => response);

      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('All fields must be filled');
    });

    it('Verifica se não é possível logar sem informar o campo password', async () => {

      const newUser = {
        name: "João",
        email: "joao@gmail.com",
        password: "1234"
      }

      await chai.request(server)
        .post('/user')
        .send(newUser)
        .then((response) => response);

      const login = {
        email: "joao@gmail.com",
      }

      const response = await chai.request(server)
        .post('/login')
        .send(login)
        .then((response) => response);

      expect(response).to.have.status(401);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('All fields must be filled');
    });
  });
});