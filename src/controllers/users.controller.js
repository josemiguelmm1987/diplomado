import { User } from '../models/users.js';
import { Task } from '../models/tasks.js';
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';

async function getUsers(req, res) {
    try {
        // return res.send('Get Users');
        const users = await User.findAll({
            attributes : ['id', 'username', 'password', 'status'],
            order : [['id', 'DESC']],
            where : {
                status : Status.ACTIVE 
            }
        });
        res.json(users);
    } catch (err) {
        logger.error('Error getUsers' + err);
        res.status(500).json({mesagge: 'Server error' });
    }
}

async function createUser(req, res) {
    try {
        // return res.send('Create User');
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        res.json(user);
    } catch (err) {
        logger.error('Error createUser' + err);
        res.status(500).json({ mesagge: 'Server error' });
    } 
}

async function getUser(req, res) {
    try {
        // return res.send('Get User');
        const user = await User.findByPk(req.params.id, {
            attributes : ['username', 'status']
        });
        if (!user) return res.status(404).json({ mesagge: 'User not found' });
        res.json(user);
    } catch (err) {
        logger.error('Error getUser' + err);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        // return res.send('Update User');
        // const user = await User.findByPk(req.params.id);
        // if (!user) return res.status(404).json({ mesagge: 'User not found' });
        // await user.update(req.body);
        if(!username || !password)
            return res.status(400).json({ mesagge: 'Username or password are required' });

        const user = await User.update(
            { 
                username, 
                password, 
            },
            {
                where: { id },
            });
        res.json(user);
    } catch (err) {
        logger.error('Error updateUser' + err);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

async function activateInactivate(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        // return res.send('Activate/Inactivate User');
        // const { id, status } = req.body;
        // const user = await User.findByPk(id);
        // if (!user) return res.status(404).json({ mesagge: 'User not found' });
        // await user.update({ status });
        if(!status) return res.status(400).json({ mesagge: 'Status are required' });

        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({ mesagge: 'User not found' });
        }

        if(user.status === status)
            return res.status(400).json({ mesagge: 'User is already in the desired status' });

        user.status = status;
        await user.save();
        res.json(user);
    } catch (err) {
        logger.error('Error activateInactivate' + err);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;
    try {
        // return res.send('Delete User');
        // const user = await User.findByPk(req.params.id);
        // if (!user) return res.status(404).json({ mesagge: 'User not found' });
        // await user.destroy();
        const user = await User.findByPk(id);
        if(!user) {
            return res.status(404).json({ mesagge: 'User not found' });
        }
        await user.destroy();
        res.json({mesagge: 'User deleted successfully'}); 
    } catch(err) {
        logger.error('Error deleting user' + err);
        return res.status(500).json({ mesagge: 'Server error' });
    }
}

async function getTasks(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username'],
            include : [{
                model: Task,
                attributes: ['name', 'done'],
                // where : {
                //     done: false
                // }
            }],
            where: { id }
        });
        res.json(user);
    } catch (error) {
        logger.error('Error getTasks' + error);
        res.status(500).json({ mesagge: 'Server error' });
    }
}

export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    activateInactivate,
    deleteUser,
    getTasks
}