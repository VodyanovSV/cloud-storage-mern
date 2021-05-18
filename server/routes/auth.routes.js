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

        } catch (e) {
            console.log(e.message)
            return res.status(400).json({message: 'Что-то пошло не так'})
        }

    })

export default router