const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createTaskModel = async (taskData, user) => {
    const db = await connect();
    const { _id } = user;

    const taskInserted = await db.collection('tasks')
        .insertOne({ ...taskData, userId: _id })
        .then((result) => result.ops[0]);

    return taskInserted;
};

const getTasksModel = async () => {
    const db = await connect();

    const tasks = await db.collection('tasks').find().toArray();

    return tasks;
};

const getTaskIdModel = async (id) => {
    // https: //mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#objectid-isvalid
    // https: //mongodb.github.io/node-mongodb-native/2.2/api/ObjectID.html
    if (!ObjectId.isValid(id)) return null;

    const db = await connect();

    const task = await db.collection('tasks').findOne({ _id: ObjectId(id) });

    return task;
};

const updateTaskModel = async (idTask, changesTasks, userId) => {
    const db = await connect();

    const { name, ingredients, preparation } = changesTasks;

    await db.collection('tasks')
        .updateOne({
            _id: ObjectId(idTask),
        }, { $set: { name, ingredients, preparation, userId } });

    const taskUpdated = await db.collection('tasks').findOne({ _id: ObjectId(idTask) });

    return taskUpdated;
};

const deleteTaskModel = async (idTask) => {
    const db = await connect();

    const taskDeleted = await db.collection('tasks').deleteOne({ _id: ObjectId(idTask) });

    return taskDeleted;
};

const insertImageTaskModel = async (idTask, image) => {
    const db = await connect();

    await db.collection('tasks')
        .updateOne({
            _id: ObjectId(idTask),
        }, { $set: { image } });

    const taskUpdated = await db.collection('tasks').findOne({ _id: ObjectId(idTask) });

    return taskUpdated;
};

module.exports = {
    createTaskModel,
    getTasksModel,
    getTaskIdModel,
    updateTaskModel,
    deleteTaskModel,
    insertImageTaskModel,
};

// SQL: Busca todos os autores do banco.
// const getAll = async() => {
//     const [tasks] = await connection.execute(
//         'SELECT id, first_taskName, middle_taskName, last_taskName FROM model_example.tasks;',
//     );
//     return tasks.map(serialize);
// };

// SQL: Busca um autor específico, a partir do seu ID
// const findById = async(id) => {
//     // Repare que substituímos o id por `?` na query.
//     // Depois, ao executá-la, informamos um array com o id para o método `execute`.
//     // O `mysql2` vai realizar de forma segura, a substituição do `?` pelo id informado, isso previne possíveis ataques de sql injection.
//     const query = 'SELECT id, first_taskName, middle_taskName, last_taskName FROM model_example.tasks WHERE id = ?'
//     const [taskData] = await connection.execute(query, [id]);

//     if (taskData.length === 0) return null;

//     // Utilizamos [0] para buscar a primeira linha, que deve ser a única no array de resultados, pois estamos buscando por ID.
//     return serialize(taskData[0]);
// };

// SQL: Cria um novo autor no banco.
// const create = async(taskName,  taskQuantity) => connection.execute(
//
// 'INSERT INTO model_example.tasks (first_taskName, middle_taskName, last_taskName) VALUES (?,?,?)', [taskName, taskQuantity],
// );
