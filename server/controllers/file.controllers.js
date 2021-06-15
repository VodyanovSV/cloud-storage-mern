import path from 'path'
import fs from 'fs'
import fileServices from '../services/file.services.js'
import File from '../models/File.js'
import User from '../models/User.js'
import config from 'config'
import {v4 as uuidv4} from 'uuid'

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

    async uploadFile(req, res) {
        try {

            const file = req.files.file
            const parent = await File.findOne({user: req.user.userId, _id: req.body.parent})

            let pathFS = ''
            if (parent) {
                pathFS = path.join(config.get('filesPath'), req.user.userId, parent.path, file.name)
            } else {
                pathFS = path.join(config.get('filesPath'), req.user.userId, file.name)
            }


            if (fs.existsSync(pathFS)) {
                return res.status(400).json({message: 'This file already exists'})
            }

            const user = await User.findOne({_id: req.user.userId})
            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'Disk have not free space'})
            }
            user.usedSpace += file.size
            await user.save()

            let pathDB = file.name
            if (parent) {
                pathDB = path.join(parent.path, file.name)
            }

            const fileDB = new File({
                name: file.name,
                type: file.name.split('.').pop(),
                size: file.size,
                path: pathDB,
                user: req.user.userId,
                parent: parent?._id
            })
            await fileDB.save()

            await file.mv(pathFS)

            res.json({
                message: 'File saved successfully',
                file: fileDB
            })

        } catch (e) {
            console.log('Ошибка в fileControllers.uploadFile: ', e.message)
            res.status(400).json({message: 'Upload error'})
        }
    }
	
    async uploadAvatar(req, res) {
        try {

            const file = req.files.file
            const user = await User.findById(req.user.userId)

            const fileName = uuidv4() + '.jpg'
            file.mv(path.join(config.get('filesStatic'), fileName))

            user.avatar = fileName
            await user.save()

            res.json(user)

        } catch (e) {
            console.log('Ошибка в fileControllers.uploadAvatar: ', e.message)
            res.status(400).json({message: 'Avatar error'})
        }
    }
    
    async deleteAvatar(req, res) {
        try {
            const user = await User.findById(req.user.userId)
            const fileName = user.avatar
            
            fs.unlinkSync(path.join(config.get('filesStatic'), fileName))

            user.avatar = null
            await user.save()

            res.json(user)

        } catch (e) {
            console.log('Ошибка в fileControllers.deleteAvatar: ', e.message)
            res.status(400).json({message: 'delete avatar error'})
        }
    }
	
    async getFiles(req, res) {
        try {
            const sort = req.query.sort
            let files = []
            switch (sort) {
                case 'type':
                    files = await File.find({user: req.user.userId, parent: req.query.parent}).sort({type: 1})
                    break
                case 'name':
                    files = await File.find({user: req.user.userId, parent: req.query.parent}).sort({name: 1})
                    break
                case 'date':
                    files = await File.find({user: req.user.userId, parent: req.query.parent}).sort({date: 1})
                    break
                default:
                    files = await File.find({user: req.user.userId, parent: req.query.parent})
                    break
            }
            res.json(files)
        } catch (e) {
            console.log('Ошибка в fileControllers.getFiles: ', e.message)
            res.status(400).json({message: 'Что-то пошло не так'})
        }
    }	
	
    async downloadFile(req, res) {
        try {
            const fileDB = await File.findOne({_id: req.query.id, user: req.user.userId})
            const filePath = path.join(config.get('filesPath'), req.user.userId, fileDB.path)
            if (fs.existsSync(filePath)) {
                return res.download(filePath, fileDB.name)
            }

            return res.status(400).json({message: 'Такого файла нет'})

        } catch (e) {
            console.log('Ошибка в fileControllers.downloadFile: ', e.message)
            res.status(400).json({message: 'Что-то пошло не так'})
        }
    }
	
	async deleteFile(req, res) {
        try {
            const file = await File.findOne({user: req.user.userId, _id: req.query.id})
            if (!file) {
                return res.status(400).json({message: 'File not found'})
            }
            fileServices.deleteFile(file)

            await file.remove()
            return res.json({message: 'File was deleted'})
        } catch (e) {
            console.log('Ошибка в fileControllers.deleteFile: ', e.message)
            res.status(400).json({message: 'Что-то пошло не так'})
        }
    }
	
	async searchFiles(req, res) {
        try {
            const search = req.query.search
            let files = await File.find({user: req.user.userId})
            files = files.filter(file => file.name.includes(search))
            res.json(files)
        } catch (e) {
            console.log('Ошибка в fileControllers.searchFiles: ', e.message)
            res.status(400).json({message: 'Что-то пошло не так'})
        }
    }
}

export default new FileControllers()