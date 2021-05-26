import jwt from "jsonwebtoken";
import config from "config";

const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const reqToken = req.headers.authorization.split(' ')[1]
        if (!reqToken) {
            return res.status(401).json({message: 'Нет авторизации'})
        }
        const decoded = jwt.verify(reqToken, config.get('jwtSecret'))
        req.user = decoded
        next()
    } catch (e) {
        console.log('Ошибка в authMiddleware: ', e.message)
        return res.status(400).json({message: 'Что-то пошло не так'})
    }
}


export default authMiddleware