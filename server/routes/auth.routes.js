import Router from 'express'
import {check, validationResult} from "express-validator"
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import config from 'config'
import fileServices from "../services/file.services.js";
import File from '../models/File.js'

const router = new Router()

router.post('/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Пароль должен быть больше 6 и меньше 8 символов').isLength({min: 6, max: 8})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: 'Некорректные данные при регистрации',
                    // errors: errors.array()
                })
            }

            const {email, password} = req.body

            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: 'Такой пользователь уже существует'})
            }

            const hashPassword = await bcrypt.hash(password, 12)

            const user = new User({email, password: hashPassword})
            await user.save()

            await fileServices.createDir(new File({name: '', user: user.id}))

            return res.json({message: 'Пользователь зарегистрирован'})
        } catch (e) {
            console.log(e.message)
            return res.status(400).json({message: 'Что-то пошло не так'})
        }

    })

export default router