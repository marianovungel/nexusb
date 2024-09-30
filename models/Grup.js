var mongoose = require("mongoose")

const GrupSchema = new mongoose.Schema({
    name:String,
    membros:Array,
    desc:String,
    adm:String,
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Grup", GrupSchema)