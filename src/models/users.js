import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import { Task } from "./tasks.js";
import { Status } from "../constants/index.js";
import logger from "../logs/logger.js";
import { encriptar } from "../common/bcrypt.js";

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Username cannot be null'
            },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Password cannot be null'
            },
            // len: {
            //     args: [8, 50],
            //     msg: 'Password must be between 8 and 50 characters long'
            // },
            // isAlphanumeric: {
            //     msg: 'Password must contain only alphanumeric characters'
            // },
        },
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'Status must be either active or inactive'
            },
        },
    },
});

User.hasMany(Task);
Task.belongsTo(User);

// User.hasMany(Task, {
//     foreignKey: 'user_Id',
//     sourceKeys: 'id',
// })

// Task.belongsTo(User, {
//     foreignKey: 'user_Id',
//     targetKeys: 'id',
// })

User.beforeCreate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña ' + error.message);
    }
})

User.beforeUpdate(async (user) => {
    try {
        user.password = await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al encriptar la contraseña ' + error.message);
    }    
})