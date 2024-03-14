const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    number: String
})

module.exports = mongoose.model('data', userSchema)

