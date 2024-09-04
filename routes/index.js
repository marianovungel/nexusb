var express = require('express');
var router = express.Router();
var userModel = require('../models/useModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var docModel = require('../models/docModel');

const secret = "nexussecret"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/singUp', async (req, res) => {
  
  let { email, phone, username, userId, avatar} = req.body;
  let emailCon = await userModel.findOne({ email: email});
  let phoneCon = await userModel.findOne({ phone: phone});

  if (emailCon) {
    return res.json({ sucess: false, message: "Email already exist!"})
  } else if (phoneCon) {
    return res.json({ sucess: false, message: "Phone number already exist!"})
  }else{
    let user = await userModel.create({
    username:username,
    name: username,
    email:email,
    userid:userId,
    avatar:avatar,
    littes:"",
    interece:"",
    formacaoSuperior:"",
    formacaomedio:"",
    formacaoGrau:"",
    areaFormacao:"",
    desc:"",
    facebook:"",
    linkedin:"",
    insta:"",
    })
    res.json({ success: true, message: "User created seccessfully!", userId: user._id})
  }
  
});

router.post('/login', async (req, res) => {
  
  let { email, password} = req.body;
  let user = await userModel.findOne({ email: email});
  
  if (user) {
    bcrypt.compare(password, user.password, function(err, result){
      if(result){
        var token = jwt.sign({ email: user.email, userId: user._id }, secret);
        res.json({ success: true, message: "Login seccessfully!", userId: user._id, token: token})
      }else{
        return res.json({ sucess: false, message: "Invalid Password!"})
      }
    })
  }else{
    return res.json({ sucess: false, message: "Invalid Email!"}) 
  }

});

router.post('/createDoc', async (req, res) => {
  let { userId, docName} = req.body;
  let user = userModel.findById(userId)

  if(user){
    let doc = await docModel.create({
      uploadedBy: userId,
      title: docName
    })

    return res.json({ success: true, message: "Documento criado com Sucesso!", docId: doc._id})
  }else{
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }

});

router.post('/uploadDoc', async (req, res) => {
  let { userId, docId, content} = req.body;
  let user = userModel.findById(userId)
  if(user){
    let doc = await docModel.findByIdAndUpdate(docId, {content: content})
    return res.json({ success: true, message: "Documento atualizado com Sucesso!"})
  }else{
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }

});

router.post('/getDoc', async (req, res) => {
  let { userId, docId } = req.body;
  let user = userModel.findById(userId)
  if(user){
    let doc = await docModel.findById(docId)
    if(doc){
      return res.json({ success: true, message: "Documento atualizado com Sucesso!", doc: doc});
    }else{
      return res.json({ sucess: false, message: "Documento Inválido"})
    }
  }else{
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }

});
router.post('/deleteDoc', async (req, res) => {
  let { userId, docId } = req.body;
  let user = userModel.findById(userId)
  if(user){
    let doc = await docModel.findByIdAndDelete(docId)
    return res.json({ success: true, message: "Documento Deletado com Sucesso!"});
  }else{
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }
});

router.post('/getAllDocs', async (req, res) => {
  let { userId } = req.body;
  let user = userModel.findById(userId)
  if(user){
    let docs = await docModel.find({uploadedBy: userId})
    return res.json({ success: true, message: "Documents buscados com Sucesso!", docs: docs});
  }else{
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }
});

router.post('/getSingleUser', async (req, res) => {
  let { userId } = req.body;
  let user = userModel.find({userid: userId})
  if(user){
    return res.json({ success: true, message: "Usuário Encontrado com Sucesso!", user: user});
  }else{
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }
});

module.exports = router;
