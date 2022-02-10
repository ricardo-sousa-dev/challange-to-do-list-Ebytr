const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const server = require('../api/app');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const connectionMock = require('./connectionMock');

const HOST = process.env.HOST || 'localhost'; // get HOST from .env file
const PORT = process.env.PORT || 3000; // get PORT from .env file
const DB_NAME = process.env.DB_NAME || 'ToDoEbytr'; // get DB_NAME from .env file

describe('POST /tasks', () => {
  let db;

  before(async () => {
    connection = await connectionMock();

    sinon.stub(MongoClient, 'connect')
      .resolves(connection);

    db = connection.db(DB_NAME);
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
      status: 'pendente',
    }

    db.collection('tasks').insertOne(newTask);

    const response = await chai.request(server)
      .post('/tasks')
      .send(newTask)
      .then((response) => response);

    expect(response).to.have.status(201);
    expect(response.body).to.be.a('object');
    expect(response.body).to.have.property('task');
    expect(response.body).to.have.property('status');
  });
});
