import express from 'express'

const app = express()

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

