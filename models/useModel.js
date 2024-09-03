var mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userid:String,
    name:String,
    email:String,
    phone:String,
    littes:String,
    username:String,
    interece:String,
    formacaoSuperior:String,
    formacaomedio:String,
    formacaoGrau:String,
    areaFormacao:String,
    desc:String,
    facebook:String,
    linkedin:String,
    insta:String,
    isBlocked:{
        type:Boolean,
        default: false
    },
    isAdmin:{
        type:Boolean,
        default: false
    },
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model("User", userSchema)