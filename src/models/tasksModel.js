const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createTaskModel = async (taskData) => {
    const db = await connect();

    const taskInserted = await db.collection('tasks')
        .insertOne( taskData)
        .then((result) => result.insertedId);
    console.log('>>>>>>>>>>>>> ~ taskInserted', taskInserted);

    return {...taskData};
};

const getTasksModel = async () => {
    const db = await connect();

    const tasks = await db.collection('tasks').find().toArray();

    return tasks;
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

module.exports = {
    createTaskModel,
    getTasksModel,
    updateTaskModel,
    deleteTaskModel,
};
