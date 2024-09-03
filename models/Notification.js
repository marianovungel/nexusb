var mongoose = require("mongoose")

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