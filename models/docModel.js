var mongoose = require("mongoose")

const docSchema = new mongoose.Schema({
    _id:String,
    data:Object,
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
        default: false
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