var mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema({
    usersId:Array,
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Chat", ChatSchema)