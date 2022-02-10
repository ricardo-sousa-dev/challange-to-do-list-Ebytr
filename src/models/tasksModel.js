const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createTaskModel = async (taskData) => {
    const db = await connect();

    const taskInserted = await db.collection('tasks')
        .insertOne(taskData)
        .then((result) => result.insertedId);
    console.log('>>>>>>>>>>>>> ~ taskInserted', taskInserted);

    return { ...taskData };
};

const getTasksModel = async () => {
    const db = await connect();

    const tasks = await db.collection('tasks').find().toArray();

    return tasks;
};

const getTaskIdModel = async (idTask) => {
    // https: //mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html#objectid-isvalid
    // https: //mongodb.github.io/node-mongodb-native/2.2/api/ObjectID.html
    if (!ObjectId.isValid(idTask)) return null;

    const db = await connect();

    const task = await db.collection('tasks').findOne({ _id: ObjectId(idTask) });

    return task;
};

const updateTaskModel = async (idTask, changesTasks) => {
    const db = await connect();

    const { task, status } = changesTasks;

    await db.collection('tasks')
        .updateOne({
            _id: ObjectId(idTask),
        }, { $set: { task, status } });

    const taskUpdated = await db.collection('tasks').findOne({ _id: ObjectId(idTask) });

    return taskUpdated;
};

const deleteTaskModel = async (idTask) => {
    const db = await connect();

    const taskDeleted = await db.collection('tasks').deleteOne({ _id: ObjectId(idTask) });

    return taskDeleted;
};

module.exports = {
    createTaskModel,
    getTasksModel,
    updateTaskModel,
    deleteTaskModel,
    getTaskIdModel
};
