import bcrypt from 'bcryptjs';
import logger from '../logs/logger.js';
import 'dotenv/config';

export const encriptar = async (texto) => {
    try {
        const saltRounds = +process.env.BCRYPT_SALT_ROUNDS;
        // const salt = await bcrypt.genSalt(saltRounds);
        // const hash = await bcrypt.hash(texto, salt);
        // return hash;
        return await bcrypt.hash(texto, saltRounds);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error encriptando el texto');
    }
};

export const comparar = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error comparando contraseñas');
    }
};

// export const generarToken = (usuario) => {