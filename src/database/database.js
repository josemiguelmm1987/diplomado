import { Sequelize } from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize(
    process.env.DB_DIPLOMADO, //db name
    process.env.DB_USER, //username
    process.env.DB_PASSWORD, //password
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: console.log,
    }
);

export default sequelize;