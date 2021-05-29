import Router from 'express'
import authMiddleware from "../middleware/auth.middleware.js";
import fileControllers from '../controllers/file.controllers.js'

const router = new Router()

router.post('', authMiddleware, fileControllers.createDir)
router.post('/upload', authMiddleware, fileControllers.uploadFile)
router.post('/avatar', authMiddleware, fileControllers.uploadAvatar)
router.get('', authMiddleware, fileControllers.getFiles)
router.get('/download', authMiddleware, fileControllers.downloadFile)
router.get('/search', authMiddleware, fileControllers.searchFiles)
router.delete('', authMiddleware, fileControllers.deleteFile)
router.delete('/avatar', authMiddleware, fileControllers.deleteAvatar)


export default router