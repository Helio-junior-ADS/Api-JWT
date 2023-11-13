const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { eAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', eAdmin, async (req,res) => {
  
  return res.json({
    error: false,
    mensagem:"Listar usuários",
    id_usuario_logado: req.userId
  });
});

router.post('/cadastrar', async (req,res) => {
  const password = await bcrypt.hash('123456', 8);

  console.log(password);

  return res.json({
    error: false,
    mensagem:"Cadastrar usuário !!!!",
    password    
  });
})

router.post('/login', async (req,res) => {
  const {body} = req;
  console.log(body);

  if(body.email !== "helio.junior.ads@gmail.com" ){
    return res.status(400).json({
      error: true,
      mensage: 'Erro:: Usuário ou a senha incorreta! E-mail incorreto'
    });
  };

  if(!(await bcrypt.compare(body.password, '$2a$08$R136GK7Wv0hBmGPtZeV1hez1jUvLtATZn9Qz0foZeaoIFrgTamAN6'))){
    return res.status(400).json({
      error: true,
      mensage:"Erro:: Usuário ou a senha incorreta! Senha incorreta'"
    });
  };

  var token = jwt.sign({id: 1}, "963654JWT8WER945TYU9FGHT15975HG3", {
    /* expiresIn: 600 // 10 min */
    /* expiresIn: '7d' // 7 dias */
    expiresIn: 60 // 1 min
  })

  return res.json({
    error: false,
    mensage: "Login realizado com sucesso !!!",
    token
  });
});

module.exports = router;