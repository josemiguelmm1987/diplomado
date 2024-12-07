import app from './app.js';
import sequelize  from './database/database.js';
import 'dotenv/config';
import logger from './logs/logger.js';

async function main() {
    // await sequelize.sync(); //En modo producción
    await sequelize.sync({ force: false }); //En modo desarrollo
    const port = process.env.PORT;
    app.listen(port);
    console.log('Server is running on port ', port);
    logger.info(`Server is running on port ${port}`);
    logger.error(`Server is running on port ${port}`);
    logger.warn(`Server is running on port ${port}`);
    logger.fatal(`Server is running on port ${port}`);
}

main();