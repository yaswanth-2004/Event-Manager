const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    username:String,
    password: String,
    role: String
})

const AdminModel = mongoose.model("Admin", AdminSchema)
module.exports = AdminModel 