var mongoose = require("mongoose")

const docSchema = new mongoose.Schema({
    title:String,
    content:{
        type: String,
        default: ""
    },
    uploadedBy:String,
    date:{
        type:Date,
        default: Date.now
    },
    lastUpdate:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Document", docSchema)