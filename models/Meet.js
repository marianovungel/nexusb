var mongoose = require("mongoose")

const MeetSchema = new mongoose.Schema({
    gruplink:String,
    link:String,
    membros:Array,
    desc:String,
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Meet", MeetSchema)