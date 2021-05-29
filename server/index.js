import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import fileUpload from 'express-fileupload'
import authRoutes from './routes/auth.routes.js'
import fileRoutes from './routes/file.routes.js'

const app = express()
const PORT = config.get('portServer')
const mongoUri = config.get('mongoUri')
const filesStatic = config.get('filesStatic')

app.use(express.static(filesStatic))
app.use(express.json({extended: true}))
app.use(fileUpload({}))
app.use('/api/auth', authRoutes)
app.use('/api/files', fileRoutes)

const start = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }
}

start()
