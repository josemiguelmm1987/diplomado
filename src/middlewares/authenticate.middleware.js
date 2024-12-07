import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    // Obtener el jwt de la cabecera de autentición
    const authHeader = req.headers['authorization'];
    console.log('autHeader', authHeader);
    // Bearer cdskadskaskd
    //['Bearer', 'dsadasdasodiio']
    //[0, 1]
    const token = authHeader && authHeader.split(' ')[1]
    console.log('token', token);

    if(!token) return res.sendStatus(401);

    //verificamos y decodificamos el token
    const secret = process.env.JWT_SECRET;
    console.log('secret llegó: ', secret);
    jwt.verify(token, secret, (err, user) => {
        if(err) {
            console.log('Error! ', err);
            return res.sendStatus(403);
        }

        //si el token es válido, se agrega la información del usuario al request
        console.log('user', user);

        req.user = user;
        next();
    });
}