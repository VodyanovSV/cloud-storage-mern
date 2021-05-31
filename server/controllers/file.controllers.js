import path from 'path'
import fs from 'fs'
import fileServices from '../services/file.services.js'
import File from '../models/File.js'
import User from '../models/User.js'
import config from 'config'


class FileControllers {
    async createDir(req, res) {
        try {
            const file = new File({
                name: req.body.name,
                type: req.body.type,
                parent: req.body.parent,
                user: req.user.userId,
            })

            const parentFile = await File.findOne({_id: req.body.parent})
            if (!parentFile) {
                file.path = req.body.name
            } else {
                file.path = path.join(parentFile.path, req.body.name)
                parentFile.childs.push(file.id)
                await parentFile.save()
            }

            await file.save()

            const created = await fileServices.createDir(file)

            res.json({
                message: created.message,
                file
            })
        } catch (e) {
            console.log('Ошибка в fileControllers.createDir: ', e.message)
            res.status(400).json({message: 'Что-то пошло не так'})
        }
    }

    
}

export default new FileControllers()