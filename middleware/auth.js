const jwt = require("jsonwebtoken");
const { promisify } = require("util");


module.exports = {
  eAdmin: async (req,res,next) => {
    const authHeader = req.headers.authorization;
   /*  console.log(authHeader); */
    if(!authHeader){
      return res.status(400).json({
        error: true,
        mensagem: 'Erro::Necessário realizar o login para acessar a página ! Falta o token A!'
      })
    }
    const [_, token] = authHeader.split(' ')
    console.log("Token: " + token);

    if(!token){
      return res.status(400).json({
        error:true,
        mensagem:'Erro::Necessário realizar o login para acessar a página ! Falta o token B!'
      })
    }

    try{

      const decode = await promisify(jwt.verify)(token, "963654JWT8WER945TYU9FGHT15975HG3");
      req.userId = decode.id;
      return next()

    }catch(err){
      return res.status(400).json({
        error:true,
        mensagem:'Erro::Necessário realizar o login para acessar a página ! Token inválido!'
      })
    }
    
    
  } 

};

