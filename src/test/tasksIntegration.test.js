const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const server = require('../api/app');
const connectionMock = require('./connectionMock');
const { expect } = chai;


describe('- Testa as todas de criação, leitura, alteração e exclusão de tarefas', () => {
  describe('POST /tasks - Criação de uma nova tarefa:', () => {
    let db;

    before(async () => {
      connection = await connectionMock();

      sinon.stub(MongoClient, 'connect')
        .resolves(connection);

      db = connection.db('ToDoEbytr');
      chai.use(chaiHttp);
    });

    beforeEach(async () => {
      await db.collection('tasks').deleteMany({});
    });

    afterEach(async () => {
      await db.collection('tasks').deleteMany({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Verifica se é possível cadastrar nova tarefa', async () => {

      const newTask = {
        task: 'Atualizar meu Linkedin',
        status: 'pendente'
      }

      const response = await chai.request(server)
        .post('/tasks')
        .send(newTask)
        .then((response) => response);

      expect(response).to.have.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('task');
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('_id');
    });

    it('Verifica se é possível cadastrar nova tarefa com status "pronto"', async () => {

      const newTask = {
        task: 'Atualizar foto do Perfil no Linkedin',
        status: 'pronto'
      }

      const response = await chai.request(server)
        .post('/tasks')
        .send(newTask)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });

    it('Verifica se é possível cadastrar uma nova tarefa sem o campo "task', async () => {

      const newTask = {
        status: 'pronto'
      }

      const response = await chai.request(server)
        .post('/tasks')
        .send(newTask)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    })

    it('Verifica se é possível cadastrar uma nova tarefa sem o campo "status"', async () => {

      const newTask = {
        task: 'Atualizar meu Linkedin'
      }

      const response = await chai.request(server)
        .post('/tasks')
        .send(newTask)
        .then((response) => response);

      expect(response).to.have.status(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Invalid entries. Try again.');
    });
  });

  describe('GET /tasks - Leitura e retorno das tarefas cadastradas:', () => {
    let db;

    before(async () => {
      connection = await connectionMock();

      sinon.stub(MongoClient, 'connect')
        .resolves(connection);

      db = connection.db('ToDoEbytr');
      chai.use(chaiHttp);
    });

    beforeEach(async () => {
      await db.collection('tasks').deleteMany({});
    });

    afterEach(async () => {
      await db.collection('tasks').deleteMany({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Verifica se é possível listar todas as tarefas cadastradas:', async () => {

      const task1 = {
        task: 'Atualizar foto do Perfil no Linkedin',
        status: 'em andamento'
      }

      const task2 = {
        task: 'Tirar férias',
        status: 'pendente'
      }

      await chai.request(server)
        .post('/tasks')
        .send(task1)

      await chai.request(server)
        .post('/tasks')
        .send(task2)

      const response = await chai.request(server)
        .get('/tasks')
        .then((response) => response);

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('array');
      expect(response.body).to.have.lengthOf(2);
    });

    // it('Verifica se retorna erro ao tentar listar tarefas quando não há tarefas cadastradas:', async () => {
    //     await db.collection('tasks').deleteMany({});

    //   const response = await chai.request(server)
    //     .get('/tasks')
    //     .then((response) => response);
    //   console.log('>>>>>>>>>>>>> ~ response2', response.body);

    //   expect(response).to.have.status(422);
    //   expect(response.body).to.be.a('object');
    //   expect(response.body).to.have.property('message');
    //   expect(response.message).to.equal('List tasks empty');
    // })
  });

  describe('PUT /tasks/:id - Alteração de uma tarefa:', () => {
    let db;

    before(async () => {
      connection = await connectionMock();

      sinon.stub(MongoClient, 'connect')
        .resolves(connection);

      db = connection.db('ToDoEbytr');
      chai.use(chaiHttp);
    });

    beforeEach(async () => {
      await db.collection('tasks').deleteMany({});
    });

    afterEach(async () => {
      await db.collection('tasks').deleteMany({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Verifica se é possível alterar o status de uma tarefa:', async () => {
      let task = { task: 'Criar artigo no Linkedin', status: 'pendente' };

      const idTask = await chai.request(server)
        .post('/tasks')
        .send(task)
        .then((response) => response.body._id);

      let taskUpdated = { task: 'Criar artigo no Linkedin', status: 'em andamento' };

      const response = await chai.request(server)
        .put(`/tasks/${ idTask }`)
        .send(taskUpdated)
        .then((response) => response);

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('task');
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('_id');
      expect(response.body.task).to.equal(taskUpdated.task);
      expect(response.body.status).to.equal(taskUpdated.status);
      expect(response.body._id).to.equal(idTask);
    });

    it('Verifica se é possível alterar o status de uma tarefa:', async () => {
      let task = { task: 'Criar artigo no Linkedin', status: 'pendente' };

      const idTask = await chai.request(server)
        .post('/tasks')
        .send(task)
        .then((response) => response.body._id);

      let taskUpdated = { task: 'Atualizar perfil no Linkedin', status: 'pendente' };

      const response = await chai.request(server)
        .put(`/tasks/${ idTask }`)
        .send(taskUpdated)
        .then((response) => response);

      expect(response).to.have.status(200);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('task');
      expect(response.body).to.have.property('status');
      expect(response.body).to.have.property('_id');
      expect(response.body.task).to.equal(taskUpdated.task);
      expect(response.body.status).to.equal(taskUpdated.status);
      expect(response.body._id).to.equal(idTask);
    });

  });

  describe('DELETE /tasks/:id - Exclusão de uma tarefa:', () => {
    let db;

    before(async () => {
      connection = await connectionMock();

      sinon.stub(MongoClient, 'connect')
        .resolves(connection);

      db = connection.db('ToDoEbytr');
      chai.use(chaiHttp);
    });

    beforeEach(async () => {
      await db.collection('tasks').deleteMany({});
    });

    afterEach(async () => {
      await db.collection('tasks').deleteMany({});
    });

    after(async () => {
      MongoClient.connect.restore();
    });

    it('Verifica se é possível excluir uma tarefa:', async () => {
      let task = { task: 'Criar artigo no Linkedin', status: 'pendente' };

      const idTask = await chai.request(server)
        .post('/tasks')
        .send(task)
        .then((response) => response.body._id);

      const response = await chai.request(server)
        .delete(`/tasks/${ idTask }`)
        .then((response) => response);

      expect(response).to.have.status(204);
    });

    it('Verifica se não é possível excluir uma tarefa que não existe:', async () => {
      const response = await chai.request(server)
        .delete('/tasks/5e8f8f8f8f8f8f8f8f8f8f')
        .then((response) => response);

      expect(response).to.have.status(422);
      expect(response.body).to.be.a('object');
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.equal('Task not exists');
    });
  });
});