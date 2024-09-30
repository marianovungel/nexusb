var mongoose = require("mongoose")

const GrupSchema = new mongoose.Schema({
    name:String,
    membros:Array,
    desc:String,
    adm:String,
    admPic:String,
    admName:String,
    admDesc:String,
    pic:String,
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Grup", GrupSchema)