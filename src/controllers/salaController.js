const salaModel = require('../models/salaModel');

exports.get = async(_req, _res)=>{
    return await salaModel.listarSalas();
};


exports.enviarMensagem = async (nick, msg, idsala) => {
    const sala = await salaModel.buscarSala(idsala);

    if (!msg) {
      msg=[];
    }

    timestamp=Date.now();

    msg.push(
      {
        timestamp: "timestamp",
        msg:msg,
        nick:nick
      }
    );

    let resp = await salaModel.atualizarMensagens(sala);

    return {"msg":"enviou mensagem!", "timestamp":timestamp};
};

exports.buscarMensagens = async (idsala, timestamp) => {
    let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    
    return {
      "timestamp":timestamp,
      "msg":mensagens
    };
};

exports.entrar = async (iduser, idsala) => {
  const sala = await salaModel.buscarSala(idsala);
  let usuarioModel = require('../models/usuarioModel');
  let user = await usuarioModel.buscarUsuario(iduser);
  if (await usuarioModel.alterarUsuario(user)) {
    return {msg:"OK", timestamp:timestamp=Date.now()};
  }
  return false;
};

exports.sair = async (iduser, idsala) => {
  const sala = await salaModel.buscarSala(idsala);
  let usuarioModel=require('../models/usuarioModel');
  let user= await usuarioModel.buscarUsuario(iduser);
  await usuarioModel.alterarUsuario(user);
  if (await usuarioModel.alterarUsuario(user)) {
      return { msg: "usuário saiu!", timestamp: timestamp = Date.now() };
  }
}




