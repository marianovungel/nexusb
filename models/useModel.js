var mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userid:String,
    avatar:String,
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
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = mongoose.model("User", userSchema)