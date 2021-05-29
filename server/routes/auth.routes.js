import Router from 'express'
import {check, validationResult} from "express-validator"
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import authMiddleware from "../middleware/auth.middleware.js";
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
		
router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({message: 'Неверный логин или пароль'})
            }

            const isPassValid = await bcrypt.compare(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: 'Неверный логин или пароль'})
            }

            const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '1h'})

            return res.json({
                message: 'Успешная авторизация',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e.message)
            return res.status(400).json({message: 'Что-то пошло не так'})
        }

    })
	
router.get('/auth', authMiddleware,
    async (req, res) => {
        try {

            const user = await User.findOne({_id: req.user.userId})
            if (!user) {
                return res.status(404).json({message: 'Что-то пошло не так'})
            }

            const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), {expiresIn: '1h'})

            return res.json({
                message: 'Успешная авторизация',
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e.message)
            return res.status(400).json({message: 'Что-то пошло не так'})
        }

    })

export default router