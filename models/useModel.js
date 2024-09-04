var mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userid:String,
    avatar:{
        type:String,
        default: "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
    },
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