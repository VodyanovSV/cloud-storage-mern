import express from 'express'
import mongoose from 'mongoose'
import config from 'config'

const app = express()
const PORT = config.get('portServer')
const mongoUri = config.get('mongoUri')

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
