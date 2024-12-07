import { Task } from '../models/tasks.js';
import logger from '../logs/logger.js';

async function getTasks(req, res) {
    const { userId } = req.user;
    console.log('userId', userId);
    try {
        const tasks = await Task.findAll({
            attributes: ['id', 'name', 'done'],
            order: [['name', 'ASC']],
            where: { userId }
        });
        res.json(tasks);
    } catch (error) {
        logger.error('Error getTasks' + error);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

async function createTask(req, res) {
    const { userId } = req.user;
    const { name } = req.body;
    try {
        // return res.send('Create Task');
        const task = await Task.create({ name, userId });
        res.json(task);
    } catch (error) {
        logger.error('Error createTask' + error);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

async function getTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
        // return res.send('Get Task');
        const task = await Task.findOne({
            attributes: ['name', 'done'],
            where: { id, userId }
        });
        res.json(task);
    } catch (error) {
        logger.error('Error getTask' + error);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

async function updateTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    const { name } = req.body;
    try {
        // return res.send('Update Task');
        const task = await Task.update({name}, {where: { id, userId}});

        if(task[0] === 0)
            return res.status(404).json({ mesagge: 'Task not found' });
        
        res.json(task);
    } catch (error) {
        logger.error('Error updateTask' + error);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

async function taskDone(req, res){
    const { userId } = req.user;
    const { id } = req.params;
    const { done } = req.body;
    try {
        const task = await Task.update({ done }, { where: { id, userId } });

        if(task[0] === 0)
            return res.status(404).json({ mesagge: 'Task not found' });
        
        res.json(task);
    } catch (error) {
        logger.error('Error taskDone' + error);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

async function deleteTask(req, res) {
    const { userId } = req.user;
    const { id } = req.params;
    try {
        // return res.send('Delete Task');
        const task = await Task.destroy({ where: { id, userId } });

        if(task[0] === 0)
            return res.status(404).json({ mesagge: 'Task not found' });

        res.json(task);
    } catch (err) {
        logger.error('Error finding task' + err);
        return res.status(500).json({ mesagge: 'Server error' });
    }
}

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask
}