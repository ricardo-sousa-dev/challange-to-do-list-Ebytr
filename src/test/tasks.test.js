const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { MongoClient } = require('mongodb');
const server = require('../api/app');
const connectionMock = require('./connectionMock');
const { expect } = chai;

describe('POST /tasks', () => {
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
    // expect(response).to.be.a('object');
    // expect(response.body).to.have.property('message');
    // expect(response.message).to.equal('Invalid entries. Try again.');
  });

});
