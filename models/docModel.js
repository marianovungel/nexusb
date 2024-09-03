var mongoose = require("mongoose")

const docSchema = new mongoose.Schema({
    title:String,
    resumo:String,
    content:{
        type: String,
        default: ""
    },
    uploadedBy:String,
    colab:Array,
    autorId:String,
    autorName:String,
    autorDesc:String,
    autorPic:String,
    private:{
        type:Boolean,
        default: true
    },
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