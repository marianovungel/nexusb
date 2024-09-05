var mongoose = require("mongoose")

// 1- Não Foi Aceito
// 2- Foi Aceito
// 1- Solicitação

const NotifySchema = new mongoose.Schema({
    usernotify:String,
    userNotificated:String,
    type:{
        type:Number,
        default: 1
    },
    link:String,
    text:String,
    usernotifyName:String,
    ArtigoName:String,
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Notify", NotifySchema)