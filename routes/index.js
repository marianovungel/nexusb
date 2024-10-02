var express = require('express');
var router = express.Router();
var userModel = require('../models/useModel');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var docModel = require('../models/docModel');
var Notify = require('../models/Notification');
var Grup = require('../models/Grup');
const _ = require("underscore")

const secret = "nexussecret"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/singUp', async (req, res) => {
  try{

    let { email,  username, userId, avatar} = req.body;
    const nerUser = new userModel({
      username:username,
      name: username,
      email:email,
      userid:userId,
      avatar:avatar,
    });

    const user = await nerUser.save();
    res.json({ success: true, message: "User created seccessfully!", userId: user._id})
  }catch(err){
      res.status(500).json(err);
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
  try {
    let doc = await docModel.create(req.body)
    return res.json({ success: true, message: "Documento criado com Sucesso!", docId: doc._id})
  } catch (error) {
    return res.json({ sucess: false, message: "Erro Aao criar o Documento"})
  }
});
router.post('/creategrup', async (req, res) => {
  try {
    let grupo = await Grup.create(req.body)
    return res.json({ success: true, message: "Grupo criado com Sucesso!", grupoId: grupo})
  } catch (error) {
    return res.json({ sucess: false, message: "Erro Aao criar o Documento"})
  }
});
router.post('/getGrup', async (req, res) => {
  let { grupId } = req.body;
    let aGrup = await Grup.findById(grupId)
    if(aGrup){
      return res.json({ success: true, message: "Grupo  Encontrado com sucesso!", grupo: aGrup});
    }else{
      return res.json({ sucess: false, message: "Grupo Inválido"})
    }
});
router.post('/mygrups', async (req, res) => {
  try {
    const key = req.body.userId.toString();
    const result = await docModel.aggregate(
      [
        {
          $search: {
            index: "default",
            text: {
              query: key,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ]
    )
    return res.json({ success: true, message: "Success!", users: result});
  } catch (error) {
    return res.json({ sucess: false, message: " Falha"})
  }
});

router.post('/uploadDoc', async (req, res) => {
  try {
    let { userId, docId, content} = req.body;
    if(userId){
      await docModel.findByIdAndUpdate(docId, {content: content})
    }
    return res.json({ success: true, message: "Documento atualizado com Sucesso!"})
    
  } catch (error) {
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }

});

router.post('/getDoc', async (req, res) => {
  let { docId } = req.body;
    let doc = await docModel.findById(docId)
    if(doc){
      return res.json({ success: true, message: "Documento  Get com sucesso!", doc: doc});
    }else{
      return res.json({ sucess: false, message: "Documento Inválido"})
    }
});
router.post('/deleteDoc', async (req, res) => {
  let { userId, docId } = req.body;
  let user = userModel.findOne({userid: userId})
  if(user){
    await docModel.findByIdAndDelete(docId)
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
router.post('/docxs', async (req, res) => {
  let { userId } = req.body;
  let user = userModel.findOne({userid: userId})
  if(user){
    let docs = await docModel.find({private: false})
    let shuffleDocs = _.shuffle(docs);
    return res.json({ success: true, message: "Todos os documentos público", docs: shuffleDocs});
  }else{
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }
});

router.post('/use', async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ userid: userId });
  if(user){
    return res.json({ success: true, message: "Usuário Encontrado com Sucesso!", user: user});
  }else{
    return res.json({ sucess: false, message: "Usuário Inválido"})
  }
});

router.post('/search', async (req, res) => {
  try {
    const result = await userModel.aggregate(
      [
        {
          $search: {
            index: "nexus",
            text: {
              query: req.body.key,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ]
    )
    return res.json({ success: true, message: "Success!", users: result});
  } catch (error) {
    return res.json({ sucess: false, message: " Falha"})
  }
});

router.post('/alldocs', async (req, res) => {
  try {
    const key = req.body.userId.toString();
    const result = await docModel.aggregate(
      [
        {
          $search: {
            index: "nexusdocs",
            text: {
              query: key,
              path: {
                wildcard: "*"
              }
            }
          }
        }
      ]
    )
    return res.json({ success: true, message: "Success!", users: result});
  } catch (error) {
    return res.json({ sucess: false, message: " Falha"})
  }
});
router.post('/colaborar', async (req, res) => {
  try {
    // const {usernotify, userNotificated,  type, link, text, usernotifyName, ArtigoName} = req.body;
    const newNotify = new Notify(req.body)

    const notification = await newNotify.save()
    
    return res.json({ success: true, message: "Success!", notification: notification});
  } catch (error) {
    return res.json({ sucess: false, message: " Falha"})
  }
});
router.post('/noticicadas', async (req, res) => {
  try {
    const { userId } = req.body;

    const allNotify = await Notify.find({userNotificated: userId})

    const allNotifyReverse = allNotify.reverse()
    
    return res.json({ success: true, message: "Success!", notification: allNotifyReverse});
  } catch (error) {
    return res.json({ sucess: false, message: " Falha"})
  }
});
router.post('/reject', async (req, res) => {
  try {
    const { notifyId } = req.body;

    await Notify.findByIdAndDelete(notifyId)
    
    return res.json({ success: true, message: "Solicitação Recusada!"});
  } catch (error) {
    return res.json({ sucess: false, message: " Falha"})
  }
});
router.post('/aceptcolab', async (req, res) => {
  try {
    const { colaborador, docId, notifyId } = req.body;

    const doc = await docModel.findById(docId)

    if(doc){
      var verifyInclud = doc.colab;
      var GetConfirn = verifyInclud.includes(colaborador);

      if(!GetConfirn){
        const inserirUser = await docModel.findByIdAndUpdate(
          docId,
          { $push: { colab: colaborador } }
        )

        await Notify.findByIdAndDelete(notifyId)

        return res.json({ success: true, message: "Solicitação Recusada!", data: inserirUser});
      }
      
      return res.json({ success: true, message: "Colaborador já Adicionado previamente...", data: doc});
    }
    return res.json({ success: true, message: "Dovumento não encontrado.",});
    
  } catch (error) {
    return res.json({ sucess: false, message: error})
  }
});

module.exports = router;
