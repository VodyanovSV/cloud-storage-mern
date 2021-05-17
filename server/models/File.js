import mongoose from 'mongoose'

const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
}

const schema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    accessLink: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    date: {type: String, default: new Date().toLocaleDateString('ru', options)},
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    parent: {type: mongoose.Types.ObjectId, ref: 'File'},
    childs: [{type: mongoose.Types.ObjectId, ref: 'File'}]
})

export default mongoose.model('File', schema)